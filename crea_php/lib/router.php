<?php
function current_path(): string
{
    $uri = $_SERVER['REQUEST_URI'] ?? '/';
    $uri = strtok($uri, '?');
    if ($uri === false) {
        $uri = '/';
    }
    $base = CREANODE_CONFIG['base_url'] ?? '';
    if ($base && str_starts_with($uri, $base)) {
        $uri = substr($uri, strlen($base));
        if ($uri === false) {
            $uri = '/';
        }
    }
    return rtrim($uri, '/') ?: '/';
}

function redirect(string $to): void
{
    if (str_starts_with($to, '/')) {
        $to = rtrim(CREANODE_CONFIG['base_url'] ?? '', '/') . $to;
    }
    header('Location: ' . $to);
    exit();
}

function render(string $view, array $data = []): void
{
    $viewPath = __DIR__ . '/../views/' . $view . '.php';
    if (!file_exists($viewPath)) {
        http_response_code(404);
        $viewPath = __DIR__ . '/../views/pages/404.php';
    }

    if (!array_key_exists('user', $data)) {
        $data['user'] = current_user();
    }

    extract($data, EXTR_SKIP);
    $title = $data['title'] ?? 'CreaNode Studio';
    $bodyClass = $data['bodyClass'] ?? '';

    require __DIR__ . '/../templates/layout.php';
}

function asset(string $path): string
{
    $base = rtrim(CREANODE_CONFIG['base_url'] ?? '', '/');
    $prefix = $base === '' ? '' : $base;
    return $prefix . '/public' . $path;
}

function format_currency(int $cents): string
{
    return number_format($cents / 100, 2, ',', ' ') . ' zł';
}
