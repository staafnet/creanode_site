# CreaNode – wersja PHP + SQLite

Ta wersja aplikacji została przygotowana specjalnie pod hosting współdzielony OVH. Nie wymaga Node.js ani npm – korzysta z PHP 8 i bazy SQLite.

## Struktura

- `index.php` – router całej aplikacji
- `config.php` – podstawowa konfiguracja (ścieżki, nazwa bazy, base URL – domyślnie strona działa z katalogu głównego)
- `storage/creanode.sqlite` – plik bazy (tworzy się automatycznie przy pierwszym uruchomieniu)
- `schema.sql` – schemat bazy danych
- `content/` – statyczne dane (usługi, treści marketingowe, seed)
- `views/`, `templates/` – warstwa prezentacji
- `public/` – zasoby statyczne (CSS, JS, grafiki)

## Uruchomienie lokalne

```bash
cd crea_php
php -S localhost:8000 router.php
```

Pierwsze uruchomienie utworzy plik bazy w katalogu `storage/`. Jeśli chcesz zacząć od zera, usuń `storage/creanode.sqlite` przed ponownym startem.

## Wymagania

- PHP ≥ 8.0 z włączonymi rozszerzeniami `pdo_sqlite` / `sqlite3`
- Moduł Apache `mod_rewrite`
- (opcjonalnie) Composer – wymagany do konfiguracji SMTP (biblioteka `phpmailer/phpmailer`)

## Instalacja na hostingu OVH

1. **Skopiuj katalog `crea_php/`** do głównego katalogu hostingu (`/home/<login>/`).
2. Upewnij się, że pliki mają prawa zapisu dla PHP w katalogu `storage/` (np. `chmod 775 storage`).
3. W panelu FTP/SSH ustaw wersję PHP 8.x w trybie produkcyjnym.
4. Domyślnie strona działa pod `https://twojadomena.pl/` (root). Jeśli chcesz osadzić ją w podkatalogu, ustaw w `config.php` `base_url` na np. `/crea_php` i zaktualizuj `RewriteBase` w `.htaccess`.
5. Podczas pierwszego wejścia na stronę aplikacja utworzy plik `storage/creanode.sqlite` i zasili go przykładowymi danymi (konto admina `contact@creanode.com` / `Admin123!`).

## Logowanie

- Login: `contact@creanode.com`
- Hasło: `Admin123!`
Po zalogowaniu uzyskasz dostęp do prostego panelu (zamówienia, profil).

## Kopie zapasowe bazy

Możesz regularnie pobierać plik `storage/creanode.sqlite` (np. raz dziennie przez cron lub ręcznie). To jedyne źródło danych – zabezpiecz je przed dostępem publicznym.

## Wysyłka e-maili

Formularz kontaktowy korzysta z warstwy `lib/mail.php`. Domyślnie używany jest natywny `mail()` PHP, co wymaga poprawnie skonfigurowanego agenta pocztowego na serwerze (np. `sendmail`, `postfix`, `msmtp`). Jeśli hosting nie dostarcza takiej usługi, przełącz się na SMTP:

1. (opcjonalnie lokalnie) skopiuj `.env.example` do `.env` i uzupełnij wartości – plik zostanie wczytany automatycznie przy starcie aplikacji.

	```bash
	cp .env.example .env
	```

2. Zainstaluj zależności SMTP:

	```bash
	composer install
	```

3. Ustaw zmienne środowiskowe (w `.env`, `.user.ini` lub panelu hostingu):

	```ini
	CREANODE_MAIL_DRIVER="smtp"
	CREANODE_SMTP_HOST="smtp.your-provider.com"
	CREANODE_SMTP_PORT="587"
	CREANODE_SMTP_USER="login"
	CREANODE_SMTP_PASS="haslo"
	CREANODE_SMTP_ENCRYPTION="tls"  ; akceptowane: tls / ssl / none
	CREANODE_MAIL_FROM="contact@creanode.com"
	CREANODE_MAIL_FROM_NAME="CreaNode Studio"
	CREANODE_MAIL_ENVELOPE="contact@creanode.com"
	```

4. (Opcjonalnie) Użyj skryptu `scripts/test-mail.php`, aby wysłać wiadomość testową i szybciej sprawdzić konfigurację:

	```bash
	php scripts/test-mail.php you@example.com
	```

Wszystkie próby wysyłki – zarówno udane, jak i z błędami transportu – trafiają do `storage/logs/mail.log`. Przy ustawieniu `CREANODE_MAIL_DRIVER=log` dodatkowo powstają pliki `.eml` w tym katalogu – możesz je otworzyć w kliencie poczty i wysłać ręcznie.

Jeżeli wysyłka natywnym `mail()` zakończy się ostrzeżeniem systemowym (np. brak transportu), komunikat zostanie zapisany w logu razem z treścią wiadomości.

Powodzenia przy wdrożeniu! Jeśli zmienisz domenę lub katalog, pamiętaj o aktualizacji `config.php` i `.htaccess`.
