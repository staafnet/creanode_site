<?php
$now = (new DateTimeImmutable())->format('c');

return [
    'users' => [
        [
            'email' => CREANODE_CONFIG['admin_email'],
            'name' => 'Store Admin',
            'password_hash' => password_hash('Admin123!', PASSWORD_BCRYPT, ['cost' => CREANODE_CONFIG['password_cost']]),
            'role' => 'admin',
            'created_at' => $now,
            'updated_at' => $now,
        ],
    ],
    'categories' => [
        [
            'name' => 'Web Development',
            'slug' => 'web-development',
            'description' => 'Custom websites, applications, and integrations dopasowane do Twojej organizacji.',
            'created_at' => $now,
            'updated_at' => $now,
        ],
        [
            'name' => 'Branding',
            'slug' => 'branding',
            'description' => 'Strategia marki, identyfikacja wizualna i key visuals do wszystkich kanałów.',
            'created_at' => $now,
            'updated_at' => $now,
        ],
        [
            'name' => 'E-commerce',
            'slug' => 'ecommerce',
            'description' => 'Headless commerce, płatności i integracje ERP w jednym sprintowym procesie.',
            'created_at' => $now,
            'updated_at' => $now,
        ],
    ],
    'products' => [
        [
            'category_slug' => 'web-development',
            'name' => 'Starter Website Package',
            'slug' => 'starter-website-package',
            'description' => 'Discovery workshop, design system i CMS zorientowany na konwersję. SEO + analityka w pakiecie.',
            'price_cents' => 49900,
            'stock' => 5,
            'active' => 1,
            'seo_title' => 'Starter Website Package',
            'seo_description' => 'Kompletny pakiet wdrożeniowy strony firmowej w 4 tygodnie.',
            'created_at' => $now,
            'updated_at' => $now,
            'images' => [
                ['url' => '/assets/images/starter-website.svg', 'alt_text' => 'Responsywna makieta strony', 'sort_order' => 0],
            ],
        ],
        [
            'category_slug' => 'branding',
            'name' => 'Brand Refresh Intensive',
            'slug' => 'brand-refresh-intensive',
            'description' => 'Dwutygodniowy sprint brandingowy: pozycjonowanie, księga znaku, assety launchowe.',
            'price_cents' => 28900,
            'stock' => 10,
            'active' => 1,
            'seo_title' => 'Brand Refresh Intensive',
            'seo_description' => 'Przebudowa brandu z warsztatami i materiałami wdrożeniowymi.',
            'created_at' => $now,
            'updated_at' => $now,
            'images' => [
                ['url' => '/assets/images/brand-refresh.svg', 'alt_text' => 'Materiały brandowe', 'sort_order' => 0],
            ],
        ],
        [
            'category_slug' => 'ecommerce',
            'name' => 'Commerce Plus Build',
            'slug' => 'commerce-plus-build',
            'description' => 'Platforma e-commerce z portalem klienta, automatyzacją fulfillmentu i raportami sprzedażowymi.',
            'price_cents' => 89900,
            'stock' => 3,
            'active' => 1,
            'seo_title' => 'Commerce Plus Build',
            'seo_description' => 'Pełna platforma e-commerce z integracją ERP.',
            'created_at' => $now,
            'updated_at' => $now,
            'images' => [
                ['url' => '/assets/images/commerce-plus.svg', 'alt_text' => 'Dashboard sprzedaży', 'sort_order' => 0],
            ],
        ],
    ],
    'blog_posts' => [
        [
            'slug' => 'strategia-digital-produkt-na-2025',
            'title' => 'Strategia digital: jak zbudować roadmapę produktu na 2025',
            'excerpt' => 'Sprawdzony framework do planowania backlogu i KPI w zespołach produktowych.',
            'body' => '<p>Zmiany na rynku wymagają od zespołów productowych bardziej adaptacyjnego podejścia do planowania. W tym artykule dzielimy się strukturą, której używamy podczas warsztatów discovery.</p><p>1. Zdefiniuj north star metric i mierniki wspierające.</p><p>2. Dobierz inicjatywy produktowe mapowane na customer journey.</p><p>3. Ustal rytm przeglądów – kwartalne roadmap review i sprinty 2-tygodniowe.</p><p>4. Wdrażaj eksperymenty growth w oparciu o dane z analityki.</p>',
            'published_at' => $now,
            'created_at' => $now,
            'updated_at' => $now,
        ],
        [
            'slug' => 'commerce-headless-case-study',
            'title' => 'Case study: headless commerce z ERP w 12 tygodni',
            'excerpt' => 'Jak połączyliśmy Next.js, headless CMS oraz system ERP dla retail fashion.',
            'body' => '<p>Projekt obejmował integrację katalogu PIM, bramki płatności oraz modułu fulfilmentu. Zespół CreaNode dostarczył MVP w 12 tygodni, a pełne wdrożenie w 16 tygodni.</p><p>Kluczowe wnioski: sprawny discovery sprint, komponentowy design system oraz ciągły monitoring wskaźników konwersji.</p>',
            'published_at' => $now,
            'created_at' => $now,
            'updated_at' => $now,
        ],
    ],
];
