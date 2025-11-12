<?php
$envFile = __DIR__ . '/.env';
if (is_file($envFile)) {
    (static function (string $path): void {
        $lines = @file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        if (!$lines) {
            return;
        }

        foreach ($lines as $line) {
            $line = trim($line);
            if ($line === '' || str_starts_with($line, '#') || str_starts_with($line, ';')) {
                continue;
            }

            $delimiterPosition = strpos($line, '=');
            if ($delimiterPosition === false) {
                continue;
            }

            $key = trim(substr($line, 0, $delimiterPosition));
            $value = trim(substr($line, $delimiterPosition + 1));

            if ($value !== '' && ($value[0] === '"' || $value[0] === "'")) {
                $quote = $value[0];
                $closing = strpos($value, $quote, 1);
                if ($closing !== false) {
                    $value = substr($value, 1, $closing - 1);
                } else {
                    $value = substr($value, 1);
                }
            } else {
                $commentPosition = strpos($value, '#');
                if ($commentPosition !== false) {
                    $value = substr($value, 0, $commentPosition);
                }
                $value = trim($value);
            }

            if ($key === '') {
                continue;
            }

            putenv($key . '=' . $value);
            $_ENV[$key] = $value;
            if (!isset($_SERVER[$key])) {
                $_SERVER[$key] = $value;
            }
        }
    })($envFile);
}

$autoload = __DIR__ . '/vendor/autoload.php';
if (file_exists($autoload)) {
    require $autoload;
}

$configuration = require __DIR__ . '/config.php';
if (!defined('CREANODE_CONFIG')) {
    define('CREANODE_CONFIG', $configuration);
}
unset($configuration);

date_default_timezone_set('Europe/Warsaw');
error_reporting(E_ALL);
ini_set('display_errors', '1');

session_name(CREANODE_CONFIG['session_name']);
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

require __DIR__ . '/lib/db.php';
require __DIR__ . '/lib/auth.php';
require __DIR__ . '/lib/router.php';
require __DIR__ . '/lib/mail.php';
require __DIR__ . '/lib/helpers.php';
require __DIR__ . '/lib/validation.php';
