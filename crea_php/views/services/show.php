<?php
$title = $service['name'] . ' – CreaNode';
?>
<section>
    <a href="<?= htmlspecialchars(CREANODE_CONFIG['base_url'] . '/services') ?>" style="display:inline-flex;gap:0.4rem;align-items:center;margin-bottom:1rem;">&larr; Wszystkie usługi</a>
</section>
<?php
render_page_header(
    $service['name'],
    $service['excerpt'],
    [
        ['href' => '/contact', 'label' => $service['cta']],
    ]
);
?>
<section class="cards-grid" style="margin-top:2.2rem;">
    <article class="card">
        <h3>Zakres prac</h3>
        <ul class="list-check">
            <?php foreach ($service['body'] as $bullet): ?>
                <li><?= htmlspecialchars($bullet) ?></li>
            <?php endforeach; ?>
        </ul>
    </article>
    <article class="card">
        <h3>Inwestycja</h3>
        <p>Pakiet startuje od <?= format_currency((int) $service['price_cents']) ?> netto.</p>
        <p style="margin-top:1rem;">W cenie otrzymujesz dokumentację, design system, backlog sprintów oraz wsparcie wdrożeniowe.</p>
        <a class="button" href="<?= htmlspecialchars(CREANODE_CONFIG['base_url'] . '/contact') ?>" style="margin-top:1.5rem;display:inline-flex;">
            <?= htmlspecialchars($service['cta']) ?>
        </a>
    </article>
</section>
