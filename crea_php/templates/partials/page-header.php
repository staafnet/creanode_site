<?php
$actions = $actions ?? [];
?>
<section class="page-header">
    <div>
        <h1 class="section-title"><?= htmlspecialchars($title) ?></h1>
        <?php if ($subtitle !== ''): ?>
            <p class="section-subtitle"><?= htmlspecialchars($subtitle) ?></p>
        <?php endif; ?>
    </div>
    <?php if (!empty($actions)): ?>
        <div class="page-header__actions">
            <?php foreach ($actions as $action): ?>
                <?php
                    $variant = $action['variant'] ?? 'primary';
                    $classes = $variant === 'secondary' ? 'button secondary' : 'button';
                    $href = $action['href'] ?? '#';
                    $isExternal = preg_match('#^(?:https?:|mailto:)#i', $href) === 1;
                    $url = $isExternal ? $href : (CREANODE_CONFIG['base_url'] . $href);
                ?>
                <a class="<?= $classes ?>" href="<?= htmlspecialchars($url) ?>">
                    <?= htmlspecialchars($action['label'] ?? 'Dowiedz się więcej') ?>
                </a>
            <?php endforeach; ?>
        </div>
    <?php endif; ?>
</section>
