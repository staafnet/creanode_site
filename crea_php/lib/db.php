<?php
function db(): PDO
{
    static $connection = null;
    if ($connection instanceof PDO) {
        return $connection;
    }

    $config = CREANODE_CONFIG;
    $path = $config['db_path'];
    $shouldInitialise = !file_exists($path);

    if (!is_dir(dirname($path))) {
        mkdir(dirname($path), 0775, true);
    }

    $connection = new PDO('sqlite:' . $path);
    $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $connection->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

    if ($shouldInitialise) {
        runMigrations($connection);
        seedDatabase($connection);
    }

    return $connection;
}

function runMigrations(PDO $pdo): void
{
    $schemaFile = __DIR__ . '/../schema.sql';
    if (!file_exists($schemaFile)) {
        throw new RuntimeException('Missing schema definition file.');
    }

    $statements = array_filter(array_map('trim', explode(";\n", file_get_contents($schemaFile))));
    $pdo->beginTransaction();
    try {
        foreach ($statements as $sql) {
            if ($sql === '') {
                continue;
            }
            $pdo->exec($sql);
        }
        $pdo->commit();
    } catch (Throwable $exception) {
        $pdo->rollBack();
        throw $exception;
    }
}

function seedDatabase(PDO $pdo): void
{
    $seedFile = __DIR__ . '/../content/seed.php';
    if (!file_exists($seedFile)) {
        return;
    }

    $seedData = require $seedFile;

    $pdo->beginTransaction();
    try {
        foreach ($seedData['users'] ?? [] as $user) {
            $statement = $pdo->prepare('INSERT INTO users (email, name, password_hash, role, created_at, updated_at) VALUES (:email, :name, :password_hash, :role, :created_at, :updated_at)');
            $statement->execute($user);
        }

        $categoryIds = [];
        foreach ($seedData['categories'] ?? [] as $category) {
            $statement = $pdo->prepare('INSERT INTO categories (name, slug, description, created_at, updated_at) VALUES (:name, :slug, :description, :created_at, :updated_at)');
            $statement->execute([
                'name' => $category['name'],
                'slug' => $category['slug'],
                'description' => $category['description'],
                'created_at' => $category['created_at'],
                'updated_at' => $category['updated_at'],
            ]);
            $categoryIds[$category['slug']] = (int) $pdo->lastInsertId();
        }

        foreach ($seedData['products'] ?? [] as $product) {
            $categoryId = null;
            if (!empty($product['category_slug']) && isset($categoryIds[$product['category_slug']])) {
                $categoryId = $categoryIds[$product['category_slug']];
            }

            $statement = $pdo->prepare('INSERT INTO products (category_id, name, slug, description, price_cents, stock, active, seo_title, seo_description, created_at, updated_at) VALUES (:category_id, :name, :slug, :description, :price_cents, :stock, :active, :seo_title, :seo_description, :created_at, :updated_at)');
            $statement->execute([
                'category_id' => $categoryId,
                'name' => $product['name'],
                'slug' => $product['slug'],
                'description' => $product['description'],
                'price_cents' => $product['price_cents'],
                'stock' => $product['stock'],
                'active' => $product['active'],
                'seo_title' => $product['seo_title'],
                'seo_description' => $product['seo_description'],
                'created_at' => $product['created_at'],
                'updated_at' => $product['updated_at'],
            ]);

            $productId = (int) $pdo->lastInsertId();
            foreach ($product['images'] ?? [] as $image) {
                $imageStatement = $pdo->prepare('INSERT INTO product_images (product_id, url, alt_text, sort_order) VALUES (:product_id, :url, :alt_text, :sort_order)');
                $imageStatement->execute([
                    'product_id' => $productId,
                    'url' => $image['url'],
                    'alt_text' => $image['alt_text'],
                    'sort_order' => $image['sort_order'],
                ]);
            }
        }

        foreach ($seedData['blog_posts'] ?? [] as $post) {
            $statement = $pdo->prepare('INSERT INTO blog_posts (slug, title, excerpt, body, published_at, created_at, updated_at) VALUES (:slug, :title, :excerpt, :body, :published_at, :created_at, :updated_at)');
            $statement->execute($post);
        }

        $pdo->commit();
    } catch (Throwable $exception) {
        $pdo->rollBack();
        throw $exception;
    }
}
