<?php
$title = 'Profil użytkownika';
$success = flash('profile_success');
$errors = $errors ?? [];
?>
<section>
    <a href="<?= htmlspecialchars(CREANODE_CONFIG['base_url'] . '/dashboard') ?>" style="display:inline-flex;gap:0.4rem;align-items:center;margin-bottom:1rem;">&larr; Panel</a>
</section>
<?php
render_page_header(
    'Profil',
    'Aktualizuj dane kontaktowe.',
    [
        ['href' => '/logout', 'label' => 'Wyloguj'],
    ]
);
?>
<section class="card" style="margin-top:2.2rem;">
    <?php if ($success): ?>
        <div class="alert success"><?= htmlspecialchars($success) ?></div>
    <?php endif; ?>
    <form method="post" action="<?= htmlspecialchars(CREANODE_CONFIG['base_url'] . '/dashboard/profile') ?>">
        <input type="hidden" name="csrf" value="<?= htmlspecialchars(csrf_token()) ?>">
        <div style="margin-bottom:1rem;">
            <label for="name">Imię i nazwisko</label>
            <input type="text" id="name" name="name" value="<?= htmlspecialchars($profile['name'] ?? '') ?>">
            <?php if (!empty($errors['name'])): ?>
                <div class="alert error" style="margin-top:0.5rem;"><?= htmlspecialchars($errors['name'][0]) ?></div>
            <?php endif; ?>
        </div>
        <div style="margin-bottom:1rem;">
            <label for="email">E-mail</label>
            <input type="email" id="email" name="email" value="<?= htmlspecialchars($profile['email'] ?? '') ?>" readonly>
        </div>
        <button class="button" type="submit">Zapisz zmiany</button>
    </form>
</section>
