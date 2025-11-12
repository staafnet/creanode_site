<?php
$title = $page['title'] ?? 'CreaNode';

render_page_header(
    $page['title'] ?? '',
    $page['lead'] ?? '',
    $page['cta'] ?? []
);
?>
<section style="margin-top:2rem;" class="cards-grid">
    <?php foreach ($page['items'] as $item): ?>
        <article class="card">
            <?php if (is_array($item)): ?>
                <h3><?= htmlspecialchars($item['title']) ?></h3>
                <p><?= htmlspecialchars($item['summary']) ?></p>
                <?php if (!empty($item['link'])): ?>
                    <a class="button secondary" style="margin-top:1rem;display:inline-flex;" href="<?= htmlspecialchars(CREANODE_CONFIG['base_url'] . $item['link']['href']) ?>">
                        <?= htmlspecialchars($item['link']['label']) ?>
                    </a>
                <?php endif; ?>
            <?php else: ?>
                <p><?= $item ?></p>
            <?php endif; ?>
        </article>
    <?php endforeach; ?>
</section>
