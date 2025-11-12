<?php
function current_user(): ?array
{
    if (!isset($_SESSION['user_id'])) {
        return null;
    }

    static $cached = null;
    if ($cached !== null) {
        return $cached;
    }

    $statement = db()->prepare('SELECT id, email, name, role, created_at FROM users WHERE id = :id LIMIT 1');
    $statement->execute(['id' => $_SESSION['user_id']]);
    $cached = $statement->fetch();

    if (!$cached) {
        unset($_SESSION['user_id']);
        return null;
    }

    return $cached;
}

function require_login(): void
{
    if (!current_user()) {
        header('Location: /login');
        exit();
    }
}

function authenticate(string $email, string $password): bool
{
    $statement = db()->prepare('SELECT id, password_hash FROM users WHERE email = :email LIMIT 1');
    $statement->execute(['email' => $email]);
    $user = $statement->fetch();

    if (!$user) {
        return false;
    }

    if (!password_verify($password, $user['password_hash'])) {
        return false;
    }

    $_SESSION['user_id'] = $user['id'];
    return true;
}

function register_user(string $email, string $password, string $name = ''): array
{
    $pdo = db();
    $exists = $pdo->prepare('SELECT id FROM users WHERE email = :email LIMIT 1');
    $exists->execute(['email' => $email]);
    if ($exists->fetch()) {
        return ['error' => 'Użytkownik o podanym adresie już istnieje.'];
    }

    $now = (new DateTimeImmutable())->format('c');
    $statement = $pdo->prepare('INSERT INTO users (email, name, password_hash, role, created_at, updated_at) VALUES (:email, :name, :password_hash, :role, :created_at, :updated_at)');
    $statement->execute([
        'email' => $email,
        'name' => $name,
        'password_hash' => password_hash($password, PASSWORD_BCRYPT, ['cost' => CREANODE_CONFIG['password_cost']]),
        'role' => 'customer',
        'created_at' => $now,
        'updated_at' => $now,
    ]);

    $_SESSION['user_id'] = (int) $pdo->lastInsertId();

    return ['success' => true];
}

function logout(): void
{
    $_SESSION = [];
    if (ini_get('session.use_cookies')) {
        $params = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000, $params['path'], $params['domain'], $params['secure'], $params['httponly']);
    }
    session_destroy();
}

function is_admin(): bool
{
    $user = current_user();
    return $user && $user['role'] === 'admin';
}
