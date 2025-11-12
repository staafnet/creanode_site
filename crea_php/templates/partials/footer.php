<?php
$year = (new DateTimeImmutable())->format('Y');
?>
<footer class="site-footer">
    <div class="inner">
        <div>&copy; <?= htmlspecialchars($year) ?> CreaNode Studio. Wszystkie prawa zastrzeżone.</div>
        <nav class="footer-nav">
            <a href="<?= htmlspecialchars(CREANODE_CONFIG['base_url'] . '/privacy') ?>">Polityka prywatności</a>
            <a href="<?= htmlspecialchars(CREANODE_CONFIG['base_url'] . '/terms') ?>">Regulamin</a>
            <a href="<?= htmlspecialchars(CREANODE_CONFIG['base_url'] . '/sitemap') ?>">Mapa strony</a>
            <a href="mailto:<?= htmlspecialchars(contact_email()) ?>"><?= htmlspecialchars(contact_email()) ?></a>
        </nav>
    </div>
</footer>
