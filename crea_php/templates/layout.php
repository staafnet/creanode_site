<?php
ob_start();
require $viewPath;
$content = ob_get_clean();
$user = current_user();
$base = CREANODE_CONFIG['base_url'] ?? '';
?>
<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><?= htmlspecialchars($title) ?></title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="<?= htmlspecialchars($base . '/public/css/app.css') ?>">
</head>
<body class="<?= htmlspecialchars($bodyClass) ?>">
    <?php require __DIR__ . '/partials/header.php'; ?>
    <main class="container">
        <?= $content ?>
    </main>
    <?php require __DIR__ . '/partials/footer.php'; ?>
    <script src="<?= htmlspecialchars($base . '/public/js/app.js') ?>" defer></script>
</body>
</html>
