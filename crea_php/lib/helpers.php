<?php
function is_post(): bool
{
    return ($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'POST';
}

function request(string $key, $default = null)
{
    return $_POST[$key] ?? $_GET[$key] ?? $default;
}

function csrf_token(): string
{
    if (empty($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(16));
    }

    return $_SESSION['csrf_token'];
}

function verify_csrf(string $token): bool
{
    return isset($_SESSION['csrf_token']) && hash_equals($_SESSION['csrf_token'], $token);
}

function flash(string $key, ?string $message = null)
{
    if ($message === null) {
        if (!isset($_SESSION['flash'][$key])) {
            return null;
        }
        $value = $_SESSION['flash'][$key];
        unset($_SESSION['flash'][$key]);
        return $value;
    }

    $_SESSION['flash'][$key] = $message;
    return null;
}

function old(string $key, $default = '')
{
    return $_SESSION['old'][$key] ?? $default;
}

function store_old(array $data): void
{
    $_SESSION['old'] = $data;
}

function clear_old(): void
{
    unset($_SESSION['old']);
}

function render_page_header(string $title, string $subtitle = '', array $actions = []): void
{
    $data = [
        'title' => $title,
        'subtitle' => $subtitle,
        'actions' => $actions,
    ];

    extract($data, EXTR_SKIP);
    require __DIR__ . '/../templates/partials/page-header.php';
}

function contact_email(): string
{
    return CREANODE_CONFIG['contact_email'] ?? CREANODE_CONFIG['admin_email'] ?? 'contact@creanode.com';
}

function format_mail_subject(string $subject): string
{
    if (function_exists('mb_encode_mimeheader')) {
        return mb_encode_mimeheader($subject, 'UTF-8');
    }

    return '=?UTF-8?B?' . base64_encode($subject) . '?=';
}

function send_contact_notification(array $payload): bool
{
    $to = contact_email();
    if (!$to) {
        return false;
    }

    $subject = 'Nowa wiadomość z formularza kontaktowego';
    $lines = [
        'Otrzymano nową wiadomość z formularza kontaktowego CreaNode.',
        '',
        'Imię i nazwisko: ' . ($payload['full_name'] ?? '—'),
        'E-mail: ' . ($payload['email'] ?? '—'),
        'Firma: ' . (($payload['company'] ?? '') !== '' ? $payload['company'] : '—'),
        '',
        'Wiadomość:',
        trim((string) ($payload['message'] ?? '')),
        '',
        'Wysłane: ' . (new DateTimeImmutable())->format('Y-m-d H:i:s'),
    ];

    if (!empty($_SERVER['REMOTE_ADDR'])) {
        $lines[] = 'Adres IP: ' . $_SERVER['REMOTE_ADDR'];
    }

    $body = implode("\n", $lines);

    $message = [
        'to' => [
            ['email' => $to, 'name' => CREANODE_CONFIG['app_name'] ?? 'CreaNode Studio'],
        ],
    'subject' => $subject,
        'body' => $body,
    ];

    if (!empty($payload['email']) && filter_var($payload['email'], FILTER_VALIDATE_EMAIL)) {
        $message['reply_to'] = [
            'email' => $payload['email'],
            'name' => $payload['full_name'] ?: $payload['email'],
        ];
    }

    return mailer_send($message);
}
