<?php
require __DIR__ . '/bootstrap.php';

$path = current_path();
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$services = require __DIR__ . '/content/services.php';
$staticPages = require __DIR__ . '/content/pages.php';

switch (true) {
    case $path === '/':
        $statement = db()->query('SELECT id, name, slug, description, price_cents FROM products WHERE active = 1 ORDER BY created_at DESC LIMIT 3');
        $products = $statement->fetchAll();
        render('home', [
            'products' => $products,
            'services' => $services,
            'title' => 'CreaNode Studio – digital commerce, AI i platformy B2B',
        ]);
        break;

    case $path === '/about':
        render('pages/about');
        break;

    case $path === '/services':
        render('services/index', ['services' => $services]);
        break;

    case preg_match('#^/services/([a-z0-9\-]+)$#', $path, $matches):
        $slug = $matches[1];
        $service = null;
        foreach ($services as $candidate) {
            if ($candidate['slug'] === $slug) {
                $service = $candidate;
                break;
            }
        }

        if (!$service) {
            render('pages/404');
            break;
        }

        render('services/show', ['service' => $service]);
        break;

    case $path === '/blog':
        $statement = db()->query('SELECT slug, title, excerpt, published_at FROM blog_posts ORDER BY published_at DESC');
        $posts = $statement->fetchAll();
        render('blog/index', ['posts' => $posts]);
        break;

    case preg_match('#^/blog/([a-z0-9\-]+)$#', $path, $matches):
        $statement = db()->prepare('SELECT slug, title, body, published_at FROM blog_posts WHERE slug = :slug LIMIT 1');
        $statement->execute(['slug' => $matches[1]]);
        $post = $statement->fetch();

        if (!$post) {
            render('pages/404');
            break;
        }

        render('blog/show', ['post' => $post]);
        break;

    case $path === '/shop':
        $selectedCategory = request('category');
        $categories = db()->query('SELECT id, name, slug FROM categories ORDER BY name ASC')->fetchAll();

        if ($selectedCategory) {
            $statement = db()->prepare('SELECT p.id, p.name, p.slug, p.description, p.price_cents, c.name AS category_name FROM products p LEFT JOIN categories c ON c.id = p.category_id WHERE p.active = 1 AND c.slug = :slug ORDER BY p.created_at DESC');
            $statement->execute(['slug' => $selectedCategory]);
        } else {
            $statement = db()->query('SELECT p.id, p.name, p.slug, p.description, p.price_cents, c.name AS category_name FROM products p LEFT JOIN categories c ON c.id = p.category_id WHERE p.active = 1 ORDER BY p.created_at DESC');
        }

        $products = $statement->fetchAll();
        render('shop/index', [
            'products' => $products,
            'categories' => $categories,
            'selectedCategory' => $selectedCategory,
        ]);
        break;

    case preg_match('#^/shop/([a-z0-9\-]+)$#', $path, $matches):
        $statement = db()->prepare('SELECT p.id, p.name, p.slug, p.description, p.price_cents, p.stock, c.name AS category_name FROM products p LEFT JOIN categories c ON c.id = p.category_id WHERE p.slug = :slug LIMIT 1');
        $statement->execute(['slug' => $matches[1]]);
        $product = $statement->fetch();
        if (!$product) {
            render('pages/404');
            break;
        }
        render('shop/show', ['product' => $product]);
        break;

    case $path === '/contact':
        if ($method === 'POST') {
            $input = [
                'full_name' => trim((string) request('full_name')),
                'email' => trim((string) request('email')),
                'company' => trim((string) request('company')),
                'message' => trim((string) request('message')),
            ];

            if (!verify_csrf((string) request('csrf', ''))) {
                flash('contact_error', 'Sesja wygasła. Spróbuj ponownie.');
                store_old($_POST);
                redirect('/contact');
            }

            $errors = validate($input, [
                'full_name' => ['required'],
                'email' => ['required', 'email'],
                'message' => ['required', ['min', 10]],
            ]);

            if ($errors) {
                store_old($_POST);
                render('pages/contact', ['errors' => $errors]);
                break;
            }

            $statement = db()->prepare('INSERT INTO contact_requests (full_name, email, company, message, created_at) VALUES (:full_name, :email, :company, :message, :created_at)');
            $statement->execute([
                'full_name' => $input['full_name'],
                'email' => $input['email'],
                'company' => $input['company'] ?: null,
                'message' => $input['message'],
                'created_at' => (new DateTimeImmutable())->format('c'),
            ]);

            if (!send_contact_notification($input)) {
                error_log('Nie udało się wysłać powiadomienia e-mail na adres kontaktowy.');
            }

            clear_old();
            flash('contact_success', 'Dziękujemy! Odezwiemy się najpóźniej następnego dnia roboczego.');
            redirect('/contact');
        }

        render('pages/contact');
        break;

    case $path === '/login':
        if ($method === 'POST') {
            if (!verify_csrf((string) request('csrf', ''))) {
                flash('login_error', 'Sesja wygasła. Spróbuj ponownie.');
                store_old($_POST);
                redirect('/login');
            }

            $email = trim((string) request('email'));
            $password = (string) request('password');
            store_old(['email' => $email]);

            if (!authenticate($email, $password)) {
                flash('login_error', 'Nieprawidłowy e-mail lub hasło.');
                redirect('/login');
            }

            clear_old();
            redirect('/dashboard');
        }

        render('auth/login');
        break;

    case $path === '/register':
        if ($method === 'POST') {
            if (!verify_csrf((string) request('csrf', ''))) {
                flash('register_error', 'Sesja wygasła. Spróbuj ponownie.');
                store_old($_POST);
                redirect('/register');
            }

            $input = [
                'name' => trim((string) request('name')),
                'email' => trim((string) request('email')),
                'password' => (string) request('password'),
                'password_confirmation' => (string) request('password_confirmation'),
            ];

            $errors = validate($input, [
                'name' => ['required', ['min', 3]],
                'email' => ['required', 'email'],
                'password' => ['required', ['min', 8]],
            ]);

            if ($input['password'] !== $input['password_confirmation']) {
                $errors['password'][] = 'Hasła muszą być identyczne.';
            }

            if ($errors) {
                store_old($input);
                render('auth/register', ['errors' => $errors]);
                break;
            }

            $result = register_user($input['email'], $input['password'], $input['name']);
            if (!empty($result['error'])) {
                store_old($input);
                flash('register_error', $result['error']);
                render('auth/register', ['errors' => ['email' => [$result['error']]]]);
                break;
            }

            clear_old();
            flash('register_success', 'Konto utworzone. Możesz korzystać z panelu.');
            redirect('/dashboard');
        }

        render('auth/register');
        break;

    case $path === '/logout':
        logout();
        redirect('/');
        break;

    case $path === '/dashboard':
        require_login();
        $user = current_user();
        $statement = db()->prepare('SELECT COUNT(*) as aggregate FROM orders WHERE user_id = :user_id');
        $statement->execute(['user_id' => $user['id']]);
        $stats = ['orders' => (int) $statement->fetchColumn()];
        render('dashboard/index', ['stats' => $stats]);
        break;

    case $path === '/dashboard/orders':
        require_login();
        $user = current_user();
        $statement = db()->prepare('SELECT id, status, total_cents, created_at FROM orders WHERE user_id = :user_id ORDER BY created_at DESC');
        $statement->execute(['user_id' => $user['id']]);
        $orders = $statement->fetchAll();
        render('dashboard/orders', ['orders' => $orders]);
        break;

    case $path === '/dashboard/profile':
        require_login();
        $user = current_user();
        if ($method === 'POST') {
            if (!verify_csrf((string) request('csrf', ''))) {
                flash('profile_success', 'Sesja wygasła. Spróbuj ponownie.');
                redirect('/dashboard/profile');
            }

            $input = [
                'name' => trim((string) request('name')),
            ];

            $errors = validate($input, [
                'name' => ['required', ['min', 3]],
            ]);

            if ($errors) {
                render('dashboard/profile', ['profile' => array_merge($user, $input), 'errors' => $errors]);
                break;
            }

            $statement = db()->prepare('UPDATE users SET name = :name, updated_at = :updated_at WHERE id = :id');
            $statement->execute([
                'name' => $input['name'],
                'updated_at' => (new DateTimeImmutable())->format('c'),
                'id' => $user['id'],
            ]);

            $_SESSION['user_id'] = $user['id'];
            flash('profile_success', 'Dane zostały zaktualizowane.');
            redirect('/dashboard/profile');
        }

        render('dashboard/profile', ['profile' => $user]);
        break;

    default:
        if (isset($staticPages[trim($path, '/')])) {
            $page = $staticPages[trim($path, '/')];
            render('pages/static', ['page' => $page, 'title' => $page['title'] . ' – CreaNode']);
            break;
        }

        render('pages/404');
        break;
}
