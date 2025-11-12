<?php
$title = 'Panel klienta';
$displayName = $user['name'] ?: $user['email'];
render_page_header(
    'Witaj ' . $displayName,
    'Tutaj znajdziesz status projektów, zamówienia i dane konta.',
    [
        ['href' => '/dashboard/orders', 'label' => 'Twoje zamówienia'],
        ['href' => '/dashboard/profile', 'label' => 'Edytuj profil', 'variant' => 'secondary'],
    ]
);
?>
<section class="cards-grid" style="margin-top:2.2rem;">
    <article class="card">
        <h3>Twoje zamówienia</h3>
        <p><?= (int) $stats['orders'] ?> zamówień w toku.</p>
        <a class="button secondary" href="<?= htmlspecialchars(CREANODE_CONFIG['base_url'] . '/dashboard/orders') ?>">Przejdź do zamówień</a>
    </article>
    <article class="card">
        <h3>Kontakt z zespołem</h3>
        <p>Masz pytania? Napisz na <a href="mailto:<?= htmlspecialchars(contact_email()) ?>"><?= htmlspecialchars(contact_email()) ?></a>.</p>
    </article>
</section>
