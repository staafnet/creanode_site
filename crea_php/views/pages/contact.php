<?php
$title = 'Kontakt – CreaNode';
$success = flash('contact_success');
$error = flash('contact_error');
$errors = $errors ?? [];

render_page_header(
    'Porozmawiajmy o projekcie',
    'Wypełnij formularz – odpowiemy w ciągu jednego dnia roboczego. Możesz też napisać na ' . contact_email() . '.',
    [
        ['href' => 'mailto:' . contact_email(), 'label' => contact_email()],
        ['href' => 'tel:+48600000900', 'label' => '+48 600 000 900', 'variant' => 'secondary'],
    ]
);
?>

<section class="grid-two" style="margin-top:2.2rem;align-items:flex-start;">
    <div class="card">
        <h3>Formularz kontaktowy</h3>
        <?php if ($success): ?>
            <div class="alert success"><?= htmlspecialchars($success) ?></div>
        <?php endif; ?>
        <?php if ($error): ?>
            <div class="alert error"><?= htmlspecialchars($error) ?></div>
        <?php endif; ?>
        <form method="post" action="<?= htmlspecialchars(CREANODE_CONFIG['base_url'] . '/contact') ?>">
            <input type="hidden" name="csrf" value="<?= htmlspecialchars(csrf_token()) ?>">
            <div style="margin-bottom:1rem;">
                <label for="full_name">Imię i nazwisko</label>
                <input type="text" id="full_name" name="full_name" value="<?= htmlspecialchars(old('full_name')) ?>">
                <?php if (!empty($errors['full_name'])): ?>
                    <div class="alert error" style="margin-top:0.5rem;"><?= htmlspecialchars($errors['full_name'][0]) ?></div>
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
                <label for="company">Firma (opcjonalnie)</label>
                <input type="text" id="company" name="company" value="<?= htmlspecialchars(old('company')) ?>">
            </div>
            <div style="margin-bottom:1.4rem;">
                <label for="message">Opisz projekt</label>
                <textarea id="message" name="message"><?= htmlspecialchars(old('message')) ?></textarea>
                <?php if (!empty($errors['message'])): ?>
                    <div class="alert error" style="margin-top:0.5rem;"><?= htmlspecialchars($errors['message'][0]) ?></div>
                <?php endif; ?>
            </div>
            <button class="button" type="submit">Wyślij wiadomość</button>
        </form>
    </div>
    <div class="card">
        <h3>Dane kontaktowe</h3>
    <p><strong>E-mail:</strong> <?= htmlspecialchars(contact_email()) ?></p>
        <p><strong>Telefon:</strong> +48 600 000 900</p>
        <p><strong>Adres:</strong> ul. Przemysłowa 12, 00-950 Warszawa</p>
        <p style="margin-top:1.2rem;">Na życzenie podpisujemy NDA przed startem rozmów. Prowadzimy warsztaty online lub onsite w siedzibie klienta.</p>
    </div>
</section>
<?php clear_old(); ?>
