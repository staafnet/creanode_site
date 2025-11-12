<?php
return [
    'app_name' => 'CreaNode Studio',
    'base_url' => '',
    'db_path' => __DIR__ . '/storage/creanode.sqlite',
    'session_name' => 'creanode_session',
    'contact_email' => 'contact@creanode.com',
    'admin_email' => 'contact@creanode.com',
    'password_cost' => 12,
    'mail' => [
        'driver' => getenv('CREANODE_MAIL_DRIVER') ?: 'mail',
        'from_email' => getenv('CREANODE_MAIL_FROM') ?: 'contact@creanode.com',
        'from_name' => getenv('CREANODE_MAIL_FROM_NAME') ?: 'CreaNode Studio',
        'envelope_from' => getenv('CREANODE_MAIL_ENVELOPE') ?: 'contact@creanode.com',
        'log_path' => getenv('CREANODE_MAIL_LOG') ?: __DIR__ . '/storage/logs/mail.log',
        'smtp' => [
            'host' => getenv('CREANODE_SMTP_HOST') ?: '',
            'port' => (int) (getenv('CREANODE_SMTP_PORT') ?: 587),
            'username' => getenv('CREANODE_SMTP_USER') ?: '',
            'password' => getenv('CREANODE_SMTP_PASS') ?: '',
            'encryption' => getenv('CREANODE_SMTP_ENCRYPTION') ?: 'tls',
            'timeout' => (int) (getenv('CREANODE_SMTP_TIMEOUT') ?: 10),
            'auth_mode' => getenv('CREANODE_SMTP_AUTH_MODE') ?: '',
        ],
    ],
];
