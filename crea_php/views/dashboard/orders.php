<?php
$title = 'Twoje zamówienia';
?>
<section>
    <a href="<?= htmlspecialchars(CREANODE_CONFIG['base_url'] . '/dashboard') ?>" style="display:inline-flex;gap:0.4rem;align-items:center;margin-bottom:1rem;">&larr; Panel</a>
</section>
<?php
render_page_header(
    'Zamówienia',
    'Historia projektów i retainerów.',
    [
        ['href' => '/shop', 'label' => 'Dodaj nowe zamówienie'],
    ]
);
?>
<section class="card" style="margin-top:2.2rem;">
    <?php if (!$orders): ?>
        <p>Nie masz jeszcze zamówień. Przeglądaj <a href="<?= htmlspecialchars(CREANODE_CONFIG['base_url'] . '/shop') ?>">ofertę sklepu</a>.</p>
    <?php else: ?>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Status</th>
                    <th>Wartość</th>
                    <th>Data</th>
                </tr>
            </thead>
            <tbody>
            <?php foreach ($orders as $order): ?>
                <tr>
                    <td>#<?= htmlspecialchars($order['id']) ?></td>
                    <td><?= htmlspecialchars(ucfirst($order['status'])) ?></td>
                    <td><?= format_currency((int) $order['total_cents']) ?></td>
                    <td><?= htmlspecialchars(date('d.m.Y', strtotime($order['created_at']))) ?></td>
                </tr>
            <?php endforeach; ?>
            </tbody>
        </table>
    <?php endif; ?>
</section>
