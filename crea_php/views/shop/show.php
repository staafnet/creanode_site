<?php
$title = $product['name'] . ' – Sklep CreaNode';
?>
<section>
    <a href="<?= htmlspecialchars(CREANODE_CONFIG['base_url'] . '/shop') ?>" style="display:inline-flex;gap:0.4rem;align-items:center;margin-bottom:1rem;">&larr; Wróć do sklepu</a>
</section>
<?php
$subtitle = !empty($product['category_name'])
    ? 'Kategoria: ' . $product['category_name']
    : '';

render_page_header(
    $product['name'],
    $subtitle,
    [
        ['href' => '/contact', 'label' => 'Zapytaj o ofertę'],
    ]
);
?>
<section class="grid-two" style="margin-top:2.4rem;">
    <article class="card">
        <h3>Opis</h3>
        <p><?= htmlspecialchars($product['description']) ?></p>
        <p style="margin-top:1.2rem;font-weight:600;">Cena: <?= format_currency((int) $product['price_cents']) ?></p>
        <p style="margin-top:0.4rem;">Dostępność: <?= (int) $product['stock'] > 0 ? 'w magazynie' : 'na zamówienie' ?></p>
    </article>
    <article class="card">
        <h3>Co zawiera pakiet</h3>
        <ul class="list-check">
            <li>Warsztaty kickoff z zespołem projektowym.</li>
            <li>Projekty UX/UI w oparciu o design system CreaNode.</li>
            <li>Development oraz konfiguracja środowisk.</li>
            <li>Szkolenie zespołu i dokumentacja wdrożeniowa.</li>
        </ul>
        <a class="button" href="<?= htmlspecialchars(CREANODE_CONFIG['base_url'] . '/contact') ?>" style="margin-top:1.5rem;display:inline-flex;">Zapytaj o termin</a>
    </article>
</section>
