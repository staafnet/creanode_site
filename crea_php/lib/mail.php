<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception as PHPMailerException;

function mailer_config(): array
{
    return CREANODE_CONFIG['mail'] ?? [];
}

function mailer_send(array $message): bool
{
    $config = mailer_config();
    $driver = strtolower($config['driver'] ?? 'mail');
    $result = false;
    $error = null;

    try {
        switch ($driver) {
            case 'smtp':
                $result = mailer_send_smtp($config, $message);
                break;
            case 'log':
                $result = mailer_store_message($config, $message);
                break;
            case 'mail':
            default:
                $result = mailer_send_mail($config, $message);
                break;
        }
    } catch (Throwable $exception) {
        $result = false;
        $error = $exception->getMessage();
    }

    mailer_log_result($config, $message, $result, $error);
    return $result;
}

function mailer_prepare_subject(string $subject): string
{
    if ($subject === '') {
        return '';
    }

    if (function_exists('mb_encode_mimeheader')) {
        return mb_encode_mimeheader($subject, 'UTF-8');
    }

    return '=?UTF-8?B?' . base64_encode($subject) . '?=';
}

function mailer_send_mail(array $config, array $message): bool
{
    $recipients = mailer_prepare_recipients($message['to'] ?? []);
    if (!$recipients) {
        throw new InvalidArgumentException('Brak poprawnych adresatów.');
    }

    $fromEmail = $config['from_email'] ?? '';
    $fromName = $config['from_name'] ?? '';

    $headers = [
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8',
        'X-Mailer: PHP/' . PHP_VERSION,
    ];

    if ($fromEmail) {
        $headers[] = 'From: ' . mailer_format_address($fromEmail, $fromName);
    }

    $replyTo = $message['reply_to'] ?? null;
    if (is_array($replyTo) && !empty($replyTo['email']) && filter_var($replyTo['email'], FILTER_VALIDATE_EMAIL)) {
        $headers[] = 'Reply-To: ' . mailer_format_address($replyTo['email'], $replyTo['name'] ?? '');
    }

    $envelopeFrom = $config['envelope_from'] ?? $fromEmail;
    if ($envelopeFrom && !filter_var($envelopeFrom, FILTER_VALIDATE_EMAIL)) {
        $envelopeFrom = $fromEmail;
    }

    if ($envelopeFrom) {
        ini_set('sendmail_from', $envelopeFrom);
    }

    $subject = $message['subject'] ?? '';
    $encodedSubject = mailer_prepare_subject($subject);
    $body = $message['body'] ?? '';
    $toHeader = implode(', ', array_column($recipients, 'formatted'));
    $headerString = implode("\r\n", $headers);

    $warning = null;
    $handler = static function ($severity, $message) use (&$warning) {
        $warning = $message;
        return true;
    };

    set_error_handler($handler);

    if ($envelopeFrom) {
        $success = mail($toHeader, $encodedSubject, $body, $headerString, '-f' . $envelopeFrom);
    } else {
        $success = mail($toHeader, $encodedSubject, $body, $headerString);
    }

    restore_error_handler();

    if (!$success) {
        $warning = $warning ?: 'mail() zwrócił false – sprawdź konfigurację sendmail/SMTP na serwerze.';
        throw new RuntimeException($warning);
    }

    return true;
}

function mailer_send_smtp(array $config, array $message): bool
{
    if (!class_exists('PHPMailer\\PHPMailer\\PHPMailer')) {
        throw new RuntimeException('Brak biblioteki phpmailer/phpmailer – uruchom composer install.');
    }

    $smtp = $config['smtp'] ?? [];
    if (empty($smtp['host'])) {
        throw new InvalidArgumentException('Nie skonfigurowano hosta SMTP.');
    }

    $mailer = new PHPMailer(true);
    try {
        $mailer->isSMTP();
        $mailer->CharSet = 'UTF-8';
        $mailer->Host = $smtp['host'];
        $mailer->Port = (int) ($smtp['port'] ?? 587);
        $mailer->SMTPAuth = !empty($smtp['username']);
        if ($mailer->SMTPAuth) {
            $mailer->Username = $smtp['username'];
            $mailer->Password = $smtp['password'] ?? '';
        }

        $encryption = strtolower((string) ($smtp['encryption'] ?? 'tls'));
        if (in_array($encryption, ['tls', 'ssl'], true)) {
            $mailer->SMTPSecure = $encryption;
        }

        if (!empty($smtp['timeout'])) {
            $mailer->Timeout = (int) $smtp['timeout'];
        }

        if (!empty($smtp['auth_mode'])) {
            $mailer->AuthType = $smtp['auth_mode'];
        }

        $fromEmail = $config['from_email'] ?? '';
        $fromName = $config['from_name'] ?? '';
        if (!$fromEmail) {
            throw new InvalidArgumentException('Nie ustawiono adresu nadawcy (mail.from_email).');
        }

        $mailer->setFrom($fromEmail, $fromName);

        $recipients = mailer_prepare_recipients($message['to'] ?? []);
        if (!$recipients) {
            throw new InvalidArgumentException('Brak poprawnych adresatów.');
        }

        foreach ($recipients as $address) {
            $mailer->addAddress($address['email'], $address['name'] ?? '');
        }

        $replyTo = $message['reply_to'] ?? null;
        if (is_array($replyTo) && !empty($replyTo['email']) && filter_var($replyTo['email'], FILTER_VALIDATE_EMAIL)) {
            $mailer->addReplyTo($replyTo['email'], $replyTo['name'] ?? '');
        }

        $mailer->Subject = $message['subject'] ?? '';
        $mailer->Body = $message['body'] ?? '';
        $mailer->AltBody = $message['alt_body'] ?? $mailer->Body;

        return $mailer->send();
    } catch (PHPMailerException $exception) {
        throw new RuntimeException($exception->getMessage(), (int) $exception->getCode(), $exception);
    }
}

function mailer_store_message(array $config, array $message): bool
{
    $logPath = $config['log_path'] ?? null;
    if (!$logPath) {
        return true;
    }

    $directory = dirname($logPath);
    if (!is_dir($directory)) {
        @mkdir($directory, 0775, true);
    }

    $filename = $directory . '/outbox_' . (new DateTimeImmutable())->format('Ymd_His_u') . '.eml';
    $recipients = mailer_prepare_recipients($message['to'] ?? []);
    $content = "Subject: " . ($message['subject'] ?? '') . "\n";
    $content .= "To: " . implode(', ', array_column($recipients, 'formatted')) . "\n\n";
    $content .= $message['body'] ?? '';

    return (bool) file_put_contents($filename, $content);
}

function mailer_prepare_recipients(array $recipients): array
{
    $prepared = [];
    foreach ($recipients as $recipient) {
        if (!is_array($recipient) || empty($recipient['email'])) {
            continue;
        }

        $email = filter_var($recipient['email'], FILTER_VALIDATE_EMAIL);
        if (!$email) {
            continue;
        }

        $name = trim((string) ($recipient['name'] ?? ''));
        $prepared[] = [
            'email' => $email,
            'name' => $name,
            'formatted' => mailer_format_address($email, $name),
        ];
    }

    return $prepared;
}

function mailer_format_address(string $email, string $name = ''): string
{
    $name = trim($name);
    if ($name === '') {
        return $email;
    }

    if (function_exists('mb_encode_mimeheader')) {
        $name = mb_encode_mimeheader($name, 'UTF-8');
    } else {
        $name = '=?UTF-8?B?' . base64_encode($name) . '?=';
    }

    return sprintf('%s <%s>', $name, $email);
}

function mailer_log_result(array $config, array $message, bool $result, ?string $error = null): void
{
    $logPath = $config['log_path'] ?? null;
    if (!$logPath) {
        return;
    }

    $directory = dirname($logPath);
    if (!is_dir($directory)) {
        @mkdir($directory, 0775, true);
    }

    $recipients = mailer_prepare_recipients($message['to'] ?? []);

    $entry = [
        'timestamp' => (new DateTimeImmutable())->format('c'),
        'driver' => $config['driver'] ?? 'mail',
        'to' => array_column($recipients, 'email'),
        'subject' => $message['subject'] ?? '',
        'success' => $result,
    ];

    if (!empty($message['reply_to']['email'])) {
        $entry['reply_to'] = $message['reply_to']['email'];
    }

    if ($error) {
        $entry['error'] = $error;
    }

    if (!$result) {
        $body = $message['body'] ?? '';
        $entry['body'] = function_exists('mb_substr') ? mb_substr($body, 0, 500) : substr($body, 0, 500);
        if (($config['driver'] ?? 'mail') !== 'log') {
            mailer_store_message($config, $message);
        }
    }

    file_put_contents($logPath, json_encode($entry, JSON_UNESCAPED_UNICODE) . PHP_EOL, FILE_APPEND);
}