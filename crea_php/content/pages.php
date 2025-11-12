<?php
return [
    'case-studies' => [
        'title' => 'Case studies',
        'lead' => 'Wdrożenia, które dowożą wartość – od commerce po platformy B2B.',
        'items' => [
            [
                'title' => 'NovaWear Collective',
                'summary' => 'Headless commerce + ERP w 12 tygodni. Wzrost konwersji o 38% i automatyzacja fulfilmentu.',
                'link' => [
                    'href' => '/contact',
                    'label' => 'Umów konsultację',
                ],
            ],
            [
                'title' => 'FinWave Banking',
                'summary' => 'Portal klienta B2B dla banku. Integracje z systemami core i audyt bezpieczeństwa.',
                'link' => [
                    'href' => '/contact',
                    'label' => 'Porozmawiajmy o projekcie',
                ],
            ],
            [
                'title' => 'HelioTech',
                'summary' => 'Platforma serwisowa dla producenta IoT. Dashboard KPI, integracje z CRM i moduł ticketów.',
                'link' => [
                    'href' => '/contact',
                    'label' => 'Zobacz plan wdrożenia',
                ],
            ],
        ],
        'cta' => [
            [
                'href' => '/contact',
                'label' => 'Skontaktuj się z zespołem',
            ],
            [
                'href' => '/services',
                'label' => 'Poznaj nasz proces',
                'variant' => 'secondary',
            ],
        ],
    ],
    'ai' => [
        'title' => 'AI & automatyzacje',
        'lead' => 'Budujemy rozwiązania AI, które skracają procesy, a nie tylko generują hype.',
        'items' => [
            'Warsztaty ideacyjne – identyfikujemy zadania do automatyzacji i mierzymy ROI.',
            'Prototypy agentów (OpenAI, Anthropic) osadzonych w twoich systemach.',
            'Wdrożenia MLOps: monitoring modeli, retraining i bezpieczeństwo danych.',
            'Automatyzacja procesów wsparcia i sprzedaży z wykorzystaniem workflow.',
        ],
        'cta' => [
            [
                'href' => '/ai/warsztaty',
                'label' => 'Warsztaty AI Discovery',
            ],
            [
                'href' => '/contact',
                'label' => 'Zapytaj o wdrożenie AI',
                'variant' => 'secondary',
            ],
        ],
    ],
    'ai/warsztaty' => [
        'title' => 'Warsztaty AI Discovery',
        'lead' => 'Dwudniowy bootcamp z zespołem biznes + tech, który kończy się backlogiem eksperymentów AI.',
        'items' => [
            'Analiza procesów end-to-end i identyfikacja punktów tarcia.',
            'Mapa danych i ocena jakości źródeł (CRM, ERP, dokumenty).',
            'Prototypowanie promptów i agentów na Twoim stacku.',
            'Plan wdrożenia + governance (compliance, ochrona danych).',
        ],
        'cta' => [
            [
                'href' => '/contact',
                'label' => 'Rezerwuj termin warsztatów',
            ],
        ],
    ],
    'privacy' => [
        'title' => 'Polityka prywatności',
        'lead' => 'Wersja skrócona. W razie pytań napisz na ' . contact_email() . '.',
        'items' => [
            'Administratorem danych jest CreaNode Studio sp. z o.o.',
            'Przetwarzamy dane na potrzeby kontaktu, ofert i analytics.',
            'Masz prawo wglądu, poprawy, usunięcia i sprzeciwu.',
            'Dane przechowujemy w bezpiecznej infrastrukturze OVH i szyfrujemy w spoczynku.',
        ],
        'cta' => [
            [
                'href' => 'mailto:' . contact_email(),
                'label' => 'Kontakt w sprawie danych',
            ],
        ],
    ],
    'terms' => [
        'title' => 'Regulamin',
        'lead' => 'Zasady współpracy i świadczenia usług CreaNode Studio.',
        'items' => [
            'Zlecenia realizujemy na podstawie zaakceptowanej oferty lub zamówienia.',
            'Rozliczamy się w modelu fixed scope lub retainer (CreaCare).',
            'Umowy zawierają SLA oraz postanowienia o poufności.',
            'Spory rozstrzygamy polubownie, a w razie potrzeby przez sąd właściwy dla siedziby CreaNode.',
        ],
        'cta' => [
            [
                'href' => '/contact',
                'label' => 'Zapytaj o warunki współpracy',
            ],
        ],
    ],
    'news' => [
        'title' => 'Aktualności',
        'lead' => 'Wieści z zespołu – eventy, nagrody i publikacje.',
        'items' => [
            'CreaNode otrzymało wyróżnienie w konkursie Digital Excellence 2025.',
            'Dołączamy do programu partnerskiego OVHcloud, by przyspieszyć wdrożenia.',
            'Nowy raport „Customer Experience Trends” dostępny do pobrania.',
        ],
        'cta' => [
            [
                'href' => '/contact',
                'label' => 'Umów spotkanie medialne',
            ],
            [
                'href' => '/blog',
                'label' => 'Czytaj nasze artykuły',
                'variant' => 'secondary',
            ],
        ],
    ],
    'sitemap' => [
        'title' => 'Mapa strony',
        'lead' => 'Pełna lista dostępnych sekcji witryny.',
        'items' => [
            '<a href="/">Strona główna</a>',
            '<a href="/services">Usługi</a>',
            '<a href="/shop">Sklep</a>',
            '<a href="/blog">Blog</a>',
            '<a href="/contact">Kontakt</a>',
            '<a href="/dashboard">Panel klienta</a>',
        ],
        'cta' => [
            [
                'href' => '/contact',
                'label' => 'Zgłoś niedziałający link',
                'variant' => 'secondary',
            ],
        ],
    ],
];
