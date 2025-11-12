<?php
$title = $post['title'] . ' – Blog CreaNode';
?>
<section>
    <a href="<?= htmlspecialchars(CREANODE_CONFIG['base_url'] . '/blog') ?>" style="display:inline-flex;gap:0.4rem;align-items:center;margin-bottom:1rem;">&larr; Powrót do bloga</a>
</section>
<?php
render_page_header(
    $post['title'],
    'Opublikowano ' . htmlspecialchars(date('d.m.Y', strtotime($post['published_at'])))
);
?>
<section class="card" style="margin-top:2rem;">
    <?= $post['body'] ?>
</section>
