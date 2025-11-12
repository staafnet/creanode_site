<?php
$title = 'Blog CreaNode';
render_page_header(
    'Blog',
    'Strategia digital, commerce i automatyzacje. Krótkie, konkretne artykuły od zespołu CreaNode.',
    [
        ['href' => '/news', 'label' => 'Aktualności'],
        ['href' => '/contact', 'label' => 'Porozmawiajmy', 'variant' => 'secondary'],
    ]
);
?>
<div class="cards-grid" style="margin-top:2.2rem;">
    <?php foreach ($posts as $post): ?>
        <article class="card">
            <span class="badge"><?= htmlspecialchars(date('d.m.Y', strtotime($post['published_at']))) ?></span>
            <h3><?= htmlspecialchars($post['title']) ?></h3>
            <p><?= htmlspecialchars($post['excerpt']) ?></p>
            <a class="button secondary" href="<?= htmlspecialchars(CREANODE_CONFIG['base_url'] . '/blog/' . $post['slug']) ?>" style="margin-top:1.2rem;">Czytaj</a>
        </article>
    <?php endforeach; ?>
    <?php if (!$posts): ?>
        <p>Brak wpisów na blogu.</p>
    <?php endif; ?>
</div>
