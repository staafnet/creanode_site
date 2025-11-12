<?php
/**
 * Quick CLI helper to verify that the mail transport is configured properly.
 */
require __DIR__ . '/../bootstrap.php';

$recipient = $argv[1] ?? null;
if (!$recipient) {
    fwrite(STDERR, "Usage: php scripts/test-mail.php recipient@example.com\n");
    exit(1);
}

$message = sprintf(
    "Test message sent at %s\nThis verifies that the CreaNode SMTP configuration works.",
    (new DateTimeImmutable('now', new DateTimeZone('UTC')))->format(DateTimeInterface::ATOM)
);

try {
    $result = mailer_send([
        'to' => [['email' => $recipient]],
        'subject' => 'CreaNode test message',
        'body' => $message,
    ]);

    if (!$result) {
        fwrite(STDERR, "✗ Wysyłka nie powiodła się – sprawdź storage/logs/mail.log.\n");
        exit(1);
    }
} catch (Throwable $exception) {
    fwrite(STDERR, "✗ Sending failed: " . $exception->getMessage() . "\n");
    exit(1);
}

echo "✓ Test message queued successfully. Check the inbox and storage/logs/mail.log for details.\n";
