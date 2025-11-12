<?php
$title = 'Usługi CreaNode';
render_page_header(
    'Usługi i pakiety',
    'Od warsztatów discovery, przez design system, po pełne wdrożenia headless commerce.',
    [
        ['href' => '/contact', 'label' => 'Zarezerwuj konsultację'],
        ['href' => '/case-studies', 'label' => 'Zobacz efekty', 'variant' => 'secondary'],
    ]
);
?>
<div class="cards-grid" style="margin-top:2.4rem;">
    <?php foreach ($services as $service): ?>
        <article class="card">
            <h3><?= htmlspecialchars($service['name']) ?></h3>
            <p><?= htmlspecialchars($service['excerpt']) ?></p>
            <ul class="list-check" style="margin-top:1rem;">
                <?php foreach (array_slice($service['body'], 0, 3) as $bullet): ?>
                    <li><?= htmlspecialchars($bullet) ?></li>
                <?php endforeach; ?>
            </ul>
            <div style="display:flex;justify-content:space-between;align-items:center;margin-top:1.4rem;">
                <span style="font-weight:600;font-size:1.1rem;">od <?= format_currency((int) $service['price_cents']) ?></span>
                <a class="button secondary" href="<?= htmlspecialchars(CREANODE_CONFIG['base_url'] . '/services/' . $service['slug']) ?>">Szczegóły</a>
            </div>
        </article>
    <?php endforeach; ?>
</div>
