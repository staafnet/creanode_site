<?php
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$path = __DIR__ . $uri;

if (php_sapi_name() === 'cli-server' && $uri !== '/' && file_exists($path) && !is_dir($path)) {
    return false;
}

require __DIR__ . '/index.php';
