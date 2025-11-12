<?php
http_response_code(404);
$title = 'Nie znaleziono strony';
?>
<section>
    <h1 class="section-title">Strona niedostępna</h1>
    <p>Nie znaleziono żądanego adresu. Wróć na <a href="<?= htmlspecialchars(CREANODE_CONFIG['base_url'] . '/') ?>">stronę główną</a>.</p>
</section>
