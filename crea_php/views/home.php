<?php
$title = 'CreaNode Studio – digital commerce i platformy produktowe';
?>
<section class="hero">
    <div>
        <span class="badge">Digital partnership</span>
        <h1>Tworzymy platformy, które napędzają wzrost Twojej organizacji.</h1>
        <p>Łączymy discovery, design system oraz development w jednym zespole. Dostarczamy headless commerce, portale klienta i automatyzacje procesów w tempie sprintów.</p>
        <div style="display:flex;gap:1rem;flex-wrap:wrap;margin-top:1.5rem;">
            <a class="button" href="<?= htmlspecialchars(CREANODE_CONFIG['base_url'] . '/contact') ?>">Umów konsultację</a>
            <a class="button secondary" href="<?= htmlspecialchars(CREANODE_CONFIG['base_url'] . '/case-studies') ?>">Zobacz case studies</a>
        </div>
    </div>
    <div>
        <div class="card" style="margin-bottom:1.5rem;">
            <h3>Proces CreaNode</h3>
            <ul class="list-check">
                <li>Discovery sprint i analityka danych</li>
                <li>Projekt komponentowy i design system</li>
                <li>Development iteracyjny z QA end-to-end</li>
                <li>Wdrożenie, monitoring i wzrost</li>
            </ul>
        </div>
        <div class="card">
            <h3>W liczbach</h3>
            <p>+38% średni wzrost konwersji po wdrożeniach commerce.</p>
            <p>12 tygodni – tyle trwa u nas typowy projekt MVP.</p>
            <p>24/5 – dostępność Service Desk w pakiecie CreaCare.</p>
        </div>
    </div>
</section>

<section style="padding:2rem 0 0;">
    <h2 class="section-title">Pakiety usług</h2>
    <p class="section-subtitle">Dopasuj zakres do potrzeb: discovery sprint, design system lub pełne wdrożenie commerce.</p>
    <div class="cards-grid three" style="margin-top:1.8rem;">
        <?php foreach ($services as $service): ?>
            <article class="card">
                <h3><?= htmlspecialchars($service['name']) ?></h3>
                <p><?= htmlspecialchars($service['excerpt']) ?></p>
                <p style="font-weight:600;margin-top:0.8rem;"><?= format_currency($service['price_cents']) ?></p>
                <a class="button secondary" href="<?= htmlspecialchars(CREANODE_CONFIG['base_url'] . '/services/' . $service['slug']) ?>" style="margin-top:1.1rem;display:inline-flex;">Poznaj szczegóły</a>
            </article>
        <?php endforeach; ?>
    </div>
</section>

<section style="padding:3rem 0 0;">
    <h2 class="section-title">Wybrane produkty z katalogu</h2>
    <p class="section-subtitle">Zobacz gotowe pakiety wdrożeniowe. Możemy je rozszerzyć o dedykowane moduły.</p>
    <div class="cards-grid three" style="margin-top:1.8rem;">
        <?php foreach ($products as $product): ?>
            <article class="card">
                <span class="badge">Oferta</span>
                <h3><?= htmlspecialchars($product['name']) ?></h3>
                <p><?= htmlspecialchars($product['description']) ?></p>
                <div style="margin-top:1.2rem;display:flex;align-items:center;justify-content:space-between;gap:0.5rem;">
                    <span style="font-weight:600;font-size:1.1rem;"><?= format_currency((int) $product['price_cents']) ?></span>
                    <a class="button secondary" href="<?= htmlspecialchars(CREANODE_CONFIG['base_url'] . '/shop/' . $product['slug']) ?>">Szczegóły</a>
                </div>
            </article>
        <?php endforeach; ?>
        <?php if (!$products): ?>
            <p>Brak produktów w katalogu.</p>
        <?php endif; ?>
    </div>
</section>

<section style="padding:3.5rem 0 0;" class="grid-two">
    <div class="card">
        <h3>Model współpracy</h3>
        <ul class="list-check">
            <li>Transparentny backlog i raport velocity co sprint.</li>
            <li>Stały skład zespołu + godziny rezerwowe na incydenty.</li>
            <li>Monitoring uptime, alerting i kopie zapasowe SQLite.</li>
            <li>Warsztaty roadmapy i eksperymenty growth co kwartał.</li>
        </ul>
    </div>
    <div class="card">
        <h3>Rekomendacje klientów</h3>
        <p>„CreaNode dostarczyło pełne wdrożenie headless commerce z ERP w zaledwie 12 tygodni. Zespół prowadził kompleksowe discovery, design i development.”</p>
        <p style="margin-top:1rem;font-weight:600;">Marta Lewandowska, COO NovaWear Collective</p>
    </div>
</section>
