<?php
$title = 'Rejestracja';
$error = flash('register_error');
$success = flash('register_success');
$errors = $errors ?? [];
render_page_header(
    'Załóż konto',
    'Stwórz dostęp do panelu klienta i sklepu.',
    [
        ['href' => '/login', 'label' => 'Mam już konto'],
        ['href' => '/contact', 'label' => 'Potrzebuję pomocy', 'variant' => 'secondary'],
    ]
);
?>
<section class="card" style="margin-top:2.4rem;">
    <?php if ($success): ?>
        <div class="alert success"><?= htmlspecialchars($success) ?></div>
    <?php endif; ?>
    <?php if ($error): ?>
        <div class="alert error"><?= htmlspecialchars($error) ?></div>
    <?php endif; ?>
    <form method="post" action="<?= htmlspecialchars(CREANODE_CONFIG['base_url'] . '/register') ?>">
        <input type="hidden" name="csrf" value="<?= htmlspecialchars(csrf_token()) ?>">
        <div style="margin-bottom:1rem;">
            <label for="name">Imię i nazwisko</label>
            <input type="text" id="name" name="name" value="<?= htmlspecialchars(old('name')) ?>">
            <?php if (!empty($errors['name'])): ?>
                <div class="alert error" style="margin-top:0.5rem;"><?= htmlspecialchars($errors['name'][0]) ?></div>
            <?php endif; ?>
        </div>
        <div style="margin-bottom:1rem;">
            <label for="email">E-mail</label>
            <input type="email" id="email" name="email" value="<?= htmlspecialchars(old('email')) ?>">
            <?php if (!empty($errors['email'])): ?>
                <div class="alert error" style="margin-top:0.5rem;"><?= htmlspecialchars($errors['email'][0]) ?></div>
            <?php endif; ?>
        </div>
        <div style="margin-bottom:1rem;">
            <label for="password">Hasło</label>
            <input type="password" id="password" name="password">
            <?php if (!empty($errors['password'])): ?>
                <div class="alert error" style="margin-top:0.5rem;"><?= htmlspecialchars($errors['password'][0]) ?></div>
            <?php endif; ?>
        </div>
        <div style="margin-bottom:1.5rem;">
            <label for="password_confirmation">Powtórz hasło</label>
            <input type="password" id="password_confirmation" name="password_confirmation">
        </div>
        <button class="button" type="submit">Załóż konto</button>
    </form>
</section>
<?php clear_old(); ?>
