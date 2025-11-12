<?php
$title = 'Sklep CreaNode';
render_page_header(
    'Sklep',
    'Pakiety wdrożeniowe i usługi retainerowe. Każdy produkt możemy rozszerzyć o dedykowane funkcje.',
    [
        ['href' => '/contact', 'label' => 'Zamów demo'],
        ['href' => '/services', 'label' => 'Zobacz usługi', 'variant' => 'secondary'],
    ]
);
?>

<section style="margin-top:1.8rem;">
    <form method="get" action="<?= htmlspecialchars(CREANODE_CONFIG['base_url'] . '/shop') ?>" style="margin-bottom:1.5rem;display:flex;gap:1rem;flex-wrap:wrap;">
        <div>
            <label for="category">Kategoria</label>
            <select id="category" name="category">
                <option value="">Wszystkie</option>
                <?php foreach ($categories as $category): ?>
                    <option value="<?= htmlspecialchars($category['slug']) ?>" <?= $selectedCategory === $category['slug'] ? 'selected' : '' ?>><?= htmlspecialchars($category['name']) ?></option>
                <?php endforeach; ?>
            </select>
        </div>
        <div style="align-self:flex-end;">
            <button class="button secondary" type="submit">Filtruj</button>
        </div>
    </form>
    <div class="cards-grid three">
        <?php foreach ($products as $product): ?>
            <article class="card">
                <h3><?= htmlspecialchars($product['name']) ?></h3>
                <p><?= htmlspecialchars($product['description']) ?></p>
                <p style="margin-top:1rem;font-weight:600;">Cena: <?= format_currency((int) $product['price_cents']) ?></p>
                <?php if ($product['category_name']): ?>
                    <p style="margin-top:0.4rem;color:#9eb6ff;">Kategoria: <?= htmlspecialchars($product['category_name']) ?></p>
                <?php endif; ?>
                <a class="button secondary" href="<?= htmlspecialchars(CREANODE_CONFIG['base_url'] . '/shop/' . $product['slug']) ?>" style="margin-top:1.2rem;">Zobacz</a>
            </article>
        <?php endforeach; ?>
        <?php if (!$products): ?>
            <p>Brak ofert w tej kategorii.</p>
        <?php endif; ?>
    </div>
</section>
