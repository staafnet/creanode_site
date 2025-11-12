<?php
$path = current_path();
$navItems = [
    [
        'href' => '/services',
        'label' => 'Usługi',
        'panel' => [
            'columns' => [
                [
                    'title' => 'Aplikacje i API',
                    'description' => 'Backendy Node.js, REST/GraphQL, auth, kolejki, monitoring, panele admina.',
                    'href' => '/services#aplikacje-api',
                ],
                [
                    'title' => 'Embedded / IoT',
                    'description' => 'C/C++, ESP32, STM32, bezpieczeństwo, OTA, integracje z chmurą.',
                    'href' => '/services#embedded-iot',
                ],
                [
                    'title' => 'Audyty i optymalizacja',
                    'description' => 'Architektura, wydajność, koszty, skalowanie i reliability Twojego systemu.',
                    'href' => '/services#audyty',
                ],
            ],
            'actions' => [
                ['href' => '/services', 'label' => 'Zobacz wszystkie usługi', 'variant' => 'ghost'],
                ['href' => '/contact', 'label' => 'Skontaktuj się', 'variant' => 'primary'],
            ],
        ],
    ],
    [
        'href' => '/shop',
        'label' => 'Sklep',
        'panel' => [
            'columns' => [
                [
                    'title' => 'Produkty cyfrowe',
                    'description' => 'Motywy, komponenty UI, startery projektów i gotowe moduły integracyjne.',
                    'href' => '/shop#produkty-cyfrowe',
                ],
                [
                    'title' => 'Szkolenia i warsztaty',
                    'description' => 'Warsztaty z Next.js, AI, product discovery oraz prowadzenie zespołów dev.',
                    'href' => '/ai/warsztaty',
                ],
                [
                    'title' => 'Pakiety wsparcia',
                    'description' => 'Pakiety SLA, utrzymanie, reagowanie 24/7 i abonamenty na rozwój produktu.',
                    'href' => '/shop#pakiety-wsparcia',
                ],
            ],
            'actions' => [
                ['href' => '/shop', 'label' => 'Przeglądaj katalog', 'variant' => 'ghost'],
                ['href' => '/contact', 'label' => 'Złóż zamówienie', 'variant' => 'primary'],
            ],
        ],
    ],
    [
        'href' => '/case-studies',
        'label' => 'Case studies',
        'panel' => [
            'columns' => [
                [
                    'title' => 'Skalowanie SaaS',
                    'description' => 'Wdrożenie multi-tenant, billing usage-based i monitoring w czasie rzeczywistym.',
                    'href' => '/case-studies#saas',
                ],
                [
                    'title' => 'Platformy e-commerce',
                    'description' => 'Migracje headless, integracje ERP/CRM, marketplace wielosprzedawców.',
                    'href' => '/case-studies#ecommerce',
                ],
                [
                    'title' => 'AI w praktyce',
                    'description' => 'Agentowe workflowy, personalizacja treści i automatyzacja procesów sprzedaży.',
                    'href' => '/case-studies#ai',
                ],
            ],
            'actions' => [
                ['href' => '/case-studies', 'label' => 'Zobacz case studies', 'variant' => 'ghost'],
                ['href' => '/contact', 'label' => 'Porozmawiajmy o projekcie', 'variant' => 'primary'],
            ],
        ],
    ],
    [
        'href' => '/ai',
        'label' => 'AI',
        'panel' => [
            'columns' => [
                [
                    'title' => 'Strategia AI',
                    'description' => 'Audyt procesów, roadmapa AI, quick wins i mierzalne KPI transformacji.',
                    'href' => '/ai#strategia',
                ],
                [
                    'title' => 'Modele i agentowe systemy',
                    'description' => 'Fine-tuning, vector search, orkiestracja agentów i integracja z bazami wiedzy.',
                    'href' => '/ai#modele',
                ],
                [
                    'title' => 'Automatyzacja zespołów',
                    'description' => 'Co-piloty dla sprzedaży, supportu i marketingu z pełną obsługą zgodności.',
                    'href' => '/ai#automatyzacja',
                ],
            ],
            'actions' => [
                ['href' => '/ai', 'label' => 'Oferta AI', 'variant' => 'ghost'],
                ['href' => '/contact', 'label' => 'Umów konsultację', 'variant' => 'primary'],
            ],
        ],
    ],
    [
        'href' => '/rozrywka',
        'label' => 'Rozrywka',
        'panel' => [
            'columns' => [
                [
                    'title' => 'Produkcja multimediów',
                    'description' => 'Interaktywne doświadczenia, streaming live, platformy eventowe i VR.',
                    'href' => '/rozrywka/multimedia',
                ],
                [
                    'title' => 'Gry i gamifikacja',
                    'description' => 'Prototypy gier, kampanie gamifikacyjne, leaderboardy i turnieje społeczności.',
                    'href' => '/rozrywka#gry',
                ],
                [
                    'title' => 'Partnerstwa i transmisje',
                    'description' => 'Obsługa techniczna wydarzeń, integracje płatności PPV i sponsoring digital.',
                    'href' => '/rozrywka#partnerstwa',
                ],
            ],
            'actions' => [
                ['href' => '/rozrywka/multimedia', 'label' => 'Zobacz projekty', 'variant' => 'ghost'],
                ['href' => '/contact', 'label' => 'Zarezerwuj produkcję', 'variant' => 'primary'],
            ],
        ],
    ],
    [
        'href' => '/blog',
        'label' => 'Blog',
        'panel' => [
            'columns' => [
                [
                    'title' => 'Najnowsze artykuły',
                    'description' => 'Analizy trendów technologicznych, AI w biznesie i praktyczne tutoriale.',
                    'href' => '/blog',
                ],
                [
                    'title' => 'Dla product ownerów',
                    'description' => 'Go-to-market, discovery, roadmapy i komunikacja z zespołami dev.',
                    'href' => '/blog?category=product',
                ],
                [
                    'title' => 'Dla inżynierów',
                    'description' => 'Architektura event-driven, jakość kodu, CI/CD oraz security w praktyce.',
                    'href' => '/blog?category=engineering',
                ],
            ],
            'actions' => [
                ['href' => '/blog', 'label' => 'Czytaj blog', 'variant' => 'ghost'],
                ['href' => '/contact', 'label' => 'Zaproponuj temat', 'variant' => 'primary'],
            ],
        ],
    ],
    [
        'href' => '/about',
        'label' => 'O nas',
        'panel' => [
            'columns' => [
                [
                    'title' => 'Zespół ekspertów',
                    'description' => 'Product design, engineering, data science i delivery w jednym miejscu.',
                    'href' => '/about#team',
                ],
                [
                    'title' => 'Proces współpracy',
                    'description' => 'Discovery, warsztaty, sprinty delivery, sukces i utrzymanie w cyklu.',
                    'href' => '/about#process',
                ],
                [
                    'title' => 'Wartości i kultura',
                    'description' => 'Transparentność, outcome over output, partnerstwo i proaktywna komunikacja.',
                    'href' => '/about#values',
                ],
            ],
            'actions' => [
                ['href' => '/about', 'label' => 'Poznaj zespół', 'variant' => 'ghost'],
                ['href' => '/contact', 'label' => 'Umów spotkanie', 'variant' => 'primary'],
            ],
        ],
    ],
    [
        'href' => '/news',
        'label' => 'Aktualności',
        'panel' => [
            'columns' => [
                [
                    'title' => 'Nowe wdrożenia',
                    'description' => 'Premiery produktów, release notes i case’y z ostatnich tygodni.',
                    'href' => '/news#releases',
                ],
                [
                    'title' => 'Wydarzenia i meetupy',
                    'description' => 'Webinary, konferencje, warsztaty oraz spotkania społeczności.',
                    'href' => '/news#events',
                ],
                [
                    'title' => 'Media i nagrody',
                    'description' => 'Publikacje prasowe, wyróżnienia branżowe oraz rekomendacje partnerów.',
                    'href' => '/news#press',
                ],
            ],
            'actions' => [
                ['href' => '/news', 'label' => 'Przeglądaj aktualności', 'variant' => 'ghost'],
                ['href' => '/contact', 'label' => 'Napisz do PR', 'variant' => 'primary'],
            ],
        ],
    ],
    [
        'href' => '/contact',
        'label' => 'Kontakt',
        'panel' => [
            'columns' => [
                [
                    'title' => 'Skontaktuj się',
                    'description' => 'Napisz na ' . contact_email() . ' lub zadzwoń +48 600 100 200 (pon-pt 9:00-17:00).',
                    'href' => '/contact#kontakt',
                ],
                [
                    'title' => 'Spotkajmy się',
                    'description' => 'Warszawa / Kraków, możliwość spotkań online i warsztatów discovery.',
                    'href' => '/contact#spotkanie',
                ],
                [
                    'title' => 'Dołącz do zespołu',
                    'description' => 'Rekrutacja ciągła dla inżynierów, designerów i konsultantów AI.',
                    'href' => '/contact#kariera',
                ],
            ],
            'actions' => [
                ['href' => '/contact', 'label' => 'Formularz kontaktowy', 'variant' => 'ghost'],
                ['href' => '/contact', 'label' => 'Umów demo', 'variant' => 'primary'],
            ],
        ],
    ],
];
?>
<header class="site-header">
    <div class="inner">
        <a class="logo" href="<?= htmlspecialchars(CREANODE_CONFIG['base_url'] . '/') ?>">
            <span class="logo-mark">CN</span>
            <span class="logo-text">
                <span>CreaNode</span>
                <span>Digital Studio</span>
            </span>
        </a>
        <nav class="primary-nav">
            <?php foreach ($navItems as $item): ?>
                <?php
                    $isActive = $path === $item['href'];
                    $navLinkClasses = 'nav-link' . ($isActive ? ' is-active' : '');
                ?>
                <div class="nav-item<?= $isActive ? ' is-active' : '' ?>">
                    <a href="<?= htmlspecialchars(CREANODE_CONFIG['base_url'] . $item['href']) ?>" class="<?= htmlspecialchars($navLinkClasses) ?>">
                        <span class="nav-link__inner">
                            <?= htmlspecialchars($item['label']) ?>
                        </span>
                    </a>
                    <?php if (!empty($item['panel'])): ?>
                        <div class="mega-panel">
                            <div class="mega-panel__grid">
                                <?php foreach ($item['panel']['columns'] as $column): ?>
                                    <?php
                                        $columnHref = $column['href'] ?? $item['href'];
                                    ?>
                                    <a href="<?= htmlspecialchars(CREANODE_CONFIG['base_url'] . $columnHref) ?>" class="mega-panel__column">
                                        <span class="mega-panel__heading"><?= htmlspecialchars($column['title']) ?></span>
                                        <span class="mega-panel__text"><?= htmlspecialchars($column['description']) ?></span>
                                    </a>
                                <?php endforeach; ?>
                            </div>
                            <?php if (!empty($item['panel']['actions'])): ?>
                                <div class="mega-panel__actions">
                                    <?php foreach ($item['panel']['actions'] as $action): ?>
                                        <?php
                                            $actionClasses = 'button';
                                            if (($action['variant'] ?? '') === 'ghost') {
                                                $actionClasses .= ' ghost';
                                            } elseif (($action['variant'] ?? '') === 'secondary') {
                                                $actionClasses .= ' secondary';
                                            }
                                        ?>
                                        <a href="<?= htmlspecialchars(CREANODE_CONFIG['base_url'] . $action['href']) ?>" class="<?= htmlspecialchars($actionClasses) ?>">
                                            <?= htmlspecialchars($action['label']) ?>
                                        </a>
                                    <?php endforeach; ?>
                                </div>
                            <?php endif; ?>
                        </div>
                    <?php endif; ?>
                </div>
            <?php endforeach; ?>
        </nav>
        <div class="auth-links">
            <?php if ($user): ?>
                <a href="<?= htmlspecialchars(CREANODE_CONFIG['base_url'] . '/dashboard') ?>" class="button secondary" style="margin-right: 0.6rem;">Profil</a>
                <a href="<?= htmlspecialchars(CREANODE_CONFIG['base_url'] . '/logout') ?>" class="button ghost">Wyloguj</a>
            <?php else: ?>
                <a href="<?= htmlspecialchars(CREANODE_CONFIG['base_url'] . '/login') ?>" class="button secondary" style="margin-right: 0.6rem;">Zaloguj</a>
                <a href="<?= htmlspecialchars(CREANODE_CONFIG['base_url'] . '/register') ?>" class="button">Rejestracja</a>
            <?php endif; ?>
        </div>
        <button class="mobile-toggle" type="button" data-toggle="mobile-nav">
            Menu
        </button>
    </div>
    <nav class="mobile-nav" data-mobile-nav>
        <?php foreach ($navItems as $item): ?>
            <a href="<?= htmlspecialchars(CREANODE_CONFIG['base_url'] . $item['href']) ?>" class="<?= $path === $item['href'] ? 'is-active' : '' ?>">
                <?= htmlspecialchars($item['label']) ?>
            </a>
        <?php endforeach; ?>
        <?php if ($user): ?>
            <a href="<?= htmlspecialchars(CREANODE_CONFIG['base_url'] . '/dashboard') ?>">Panel</a>
            <a href="<?= htmlspecialchars(CREANODE_CONFIG['base_url'] . '/logout') ?>">Wyloguj</a>
        <?php else: ?>
            <a href="<?= htmlspecialchars(CREANODE_CONFIG['base_url'] . '/login') ?>">Zaloguj</a>
            <a href="<?= htmlspecialchars(CREANODE_CONFIG['base_url'] . '/register') ?>">Rejestracja</a>
        <?php endif; ?>
    </nav>
</header>
