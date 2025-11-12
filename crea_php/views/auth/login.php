<?php
$title = 'Logowanie';
$error = flash('login_error');
render_page_header(
    'Zaloguj się',
    'Dostęp do panelu klienta i projektów.',
    [
        ['href' => '/register', 'label' => 'Załóż konto'],
        ['href' => '/contact', 'label' => 'Skontaktuj się', 'variant' => 'secondary'],
    ]
);
?>
<section class="grid-two" style="margin-top:2.4rem;">
    <div class="card">
        <?php if ($error): ?>
            <div class="alert error"><?= htmlspecialchars($error) ?></div>
        <?php endif; ?>
        <form method="post" action="<?= htmlspecialchars(CREANODE_CONFIG['base_url'] . '/login') ?>">
            <input type="hidden" name="csrf" value="<?= htmlspecialchars(csrf_token()) ?>">
            <div style="margin-bottom:1rem;">
                <label for="email">E-mail</label>
                <input type="email" id="email" name="email" value="<?= htmlspecialchars(old('email')) ?>">
            </div>
            <div style="margin-bottom:1.4rem;">
                <label for="password">Hasło</label>
                <input type="password" id="password" name="password">
            </div>
            <button class="button" type="submit">Zaloguj</button>
        </form>
    </div>
    <div class="card">
        <h3>Nie masz konta?</h3>
        <p>Załóż konto, aby śledzić status projektów i zamówień.</p>
        <a class="button secondary" href="<?= htmlspecialchars(CREANODE_CONFIG['base_url'] . '/register') ?>" style="margin-top:1.2rem;display:inline-flex;">Rejestracja</a>
    </div>
</section>
<?php clear_old(); ?>
