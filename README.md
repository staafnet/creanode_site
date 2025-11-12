## CreaNode Studio Platform

Full-stack storefront and client portal built on **Next.js 16**, **Tailwind CSS v4**, **Prisma**, and **SQLite**.  
Features include:

- Marketing pages (hero, services, blog, contact) with Polish copy tailored for the agency.
- Product catalogue and detailed offer pages backed by Prisma models.
- Authentication (register, login, logout) using server actions + JWT cookies.
- Contact form persisting leads in the SQLite database.
- API endpoints (`/api/products`, `/api/products/[slug]`) for external integrations.

---

## Requirements

- **Node.js ≥ 20.9** (tested with `v22.21.1` via `nvm`).
- **pnpm ≥ 8** (the project uses pnpm workspaces; enable via `corepack enable pnpm`).
- SQLite is included with Prisma, no separate server is required.

---

## Local Setup

1. **Install dependencies**
   ```bash
   pnpm install
   ```

2. **Environment variables**  
   Copy `.env` and adjust as needed:
   ```env
   DATABASE_URL="file:./prisma/dev.db"
   AUTH_SECRET="replace-with-strong-secret" # dowolny, unikalny klucz JWT (min. 32 znaki)
   NEXTAUTH_URL="http://localhost:3000"
   ```

3. **Generate the Prisma client**
   ```bash
   pnpm prisma:generate
   ```

4. **Apply database migrations**
   ```bash
   pnpm exec prisma migrate deploy
   ```
   > Jeśli polecenie zwróci błąd „Schema engine error”, sprawdź czy korzystasz z Node ≥ 20 oraz czy zależności (`@prisma/engines`) zostały dozwolone w `package.json`.

   Alternatywnie można ręcznie zainicjalizować bazę SQLite:
   ```bash
   sqlite3 prisma/dev.db < prisma/migrations/20251106204555_init/migration.sql
   sqlite3 prisma/dev.db < prisma/migrations/20251106220000_contact_requests/migration.sql
   ```

5. **Zasil dane startowe**
   ```bash
   pnpm db:seed
   ```
   Tworzy użytkownika administratora (`contact@creanode.com` / `Admin123!`) oraz przykładowe produkty.

6. **Uruchom tryb developerski**
   ```bash
   pnpm dev
   ```
   Aplikacja będzie dostępna pod `http://localhost:3000`.

---

## Dostępne skrypty

| Komenda                 | Opis                                                   |
| ----------------------- | ------------------------------------------------------ |
| `pnpm dev`              | Tryb deweloperski                                      |
| `pnpm build`            | Budowa produkcyjna Next.js                             |
| `pnpm start`            | Uruchomienie produkcyjnego builda (`.next`)           |
| `pnpm lint`             | ESLint                                                 |
| `pnpm prisma:generate`  | Generowanie klienta Prisma                             |
| `pnpm prisma:migrate`   | `prisma migrate deploy` (do wdrożeń)                   |
| `pnpm db:seed`          | Zasilenie bazy przykładowymi danymi                    |

---

## Struktura bazy danych

- `User`, `CartItem`, `Order`, `OrderItem` – podstawy sklepu i panelu klienta.
- `Product`, `Category`, `ProductImage` – katalog ofert.
- `PasswordResetToken` – podstawa do przyszłego resetu haseł.
- `ContactRequest` – wpisy z formularza kontaktowego.

Modele i migracje znajdują się w katalogu `prisma/`.

---

## Deployment na OVH

### Opcja 1: Hosting Performance (Node.js)
1. W panelu OVH włącz środowisko Node.js i wybierz wersję 20 lub nowszą.
2. Połącz się przez SSH i zainstaluj pnpm (np. przez `corepack enable pnpm` lub `curl`).
3. Sklonuj repozytorium:
   ```bash
   git clone <repo> app && cd app
   pnpm install --prod
   pnpm prisma:generate
   pnpm exec prisma migrate deploy
   pnpm db:seed    # opcjonalnie na środowisku testowym
   pnpm build
   pnpm start      # lub skonfiguruj PM2 / systemd / screen
   ```
4. Upewnij się, że plik `prisma/dev.db` znajduje się poza katalogiem `public`, najlepiej w katalogu projektu (`~/app/prisma/dev.db`).
5. Skonfiguruj reverse proxy (np. `apache`/`nginx`) na porcie docelowym aplikacji Next.js.

### Opcja 2: VPS / Public Cloud
1. Zainstaluj Node.js ≥ 20 (polecane `nvm` + `node 22`).
2. Zainstaluj `pnpm`, `git`, `sqlite3`.
3. Postępuj jak w opcji 1, ale uruchom produkcję np. przez `pm2`:
   ```bash
   pnpm install --prod
   pnpm prisma:migrate
   pnpm build
   pm2 start "pnpm start" --name creanode
   pm2 save
   ```
4. Skonfiguruj HTTPS (certbot/OVH SSL Gateway) i reverse proxy.

### Cron na kopie zapasowe SQLite
Dodaj zadanie cron (np. raz dziennie):
```cron
0 2 * * * cd /path/to/app && sqlite3 prisma/dev.db ".backup 'backups/$(date +\%F).db'"
```
Przechowuj kopie w katalogu poza repozytorium i rotuj wg potrzeb.

---

## Ważne uwagi wdrożeniowe

- `AUTH_SECRET` musi być identyczny na wszystkich instancjach – zmiana unieważnia sesje.
- Wersja Node.js < 20 spowoduje błąd Next.js i Prisma.
- Pamiętaj o ustawieniu praw dostępu do pliku `prisma/dev.db` (600) oraz katalogu `prisma/`.
- Do backupów wysyłaj plik SQLite w bezpieczne miejsce (S3, OVH Cloud Archive).
- Jeżeli w przyszłości baza ma być współdzielona przez kilka instancji, rozważ migrację na PostgreSQL/MySQL (OVH Cloud Databases).

---

## Kolejne kroki

- Dodać panel administracyjny do zarządzania produktami i zamówieniami.
- Zaimplementować koszyk (server actions + `CartItem`), płatności (np. Stripe) i fakturowanie.
- Dodać obsługę resetu haseł (`PasswordResetToken` już w schemacie).
- Opcjonalnie przenieść blog do CMS (np. Sanity/Contentful) lub MDX.

W razie pytań dotyczących wdrożenia na OVH – patrz sekcja powyżej lub napisz do zespołu devops. Powodzenia!
