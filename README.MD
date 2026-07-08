# Plant Pals

A plant adoption platform — browse available plants, request to adopt one, and get notified when a plant you're waiting for becomes available.

## Tech stack

| Layer | Technology |
|---|---|
| Frontend | Next.js, TypeScript, Tailwind CSS, shadcn/ui |
| Backend | Spring Boot 4, Java 21 |
| Database | PostgreSQL |
| Auth | JWT (custom Spring Security filter) |
| Messaging | ActiveMQ (embedded broker) + Spring JMS |
| Email | Spring Mail (JavaMailSender) |

## Prerequisites

- Java 21
- Node.js + yarn
- **Mac:** Homebrew
- **Windows:** [PostgreSQL 16](https://www.postgresql.org/download/windows/) installed and added to PATH

## Setup

**Mac** — run once on a fresh machine:
```bash
yarn setup
```
Installs PostgreSQL via Homebrew if needed, creates the database and user, and installs client dependencies.

**Windows** — install PostgreSQL 16 manually first, then open Git Bash and run:
```bash
yarn setup
```

Then in separate terminals:
```bash
yarn server        # http://localhost:8080
yarn client        # http://localhost:3000
```


### Dev credentials
- **admin** / `admin123` (ADMIN role)
- **demo** / `demo123` (regular user, has sample requests)

### Email (dev)
To catch outbound notification emails locally, start MailHog (`brew install mailhog`) in a separate terminal:
```bash
mailhog
```
Inbox UI: http://localhost:8025. For production, update `spring.mail.*` in `application.properties` with real SMTP credentials.

## Testing notifications

1. Start MailHog: `mailhog`
2. Register a user with an email address:
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name": "testuser", "password": "password123", "email": "test@example.com"}'
```
3. Subscribe that user to a plant name (use the `id` returned above):
```bash
curl -X POST http://localhost:8080/api/subscriptions \
  -H "Content-Type: application/json" \
  -d '{"userId": 1, "plantName": "Monstera"}'
```
4. Add a plant with that name via the admin UI (or seed script).
5. Open **http://localhost:8025** — the notification email should be there.

Subscriptions are single-use and are deleted automatically after the email is sent.

## Troubleshooting

**`psql: command not found` after setup**
PostgreSQL was installed but isn't on your PATH. Add it:
```bash
export PATH="$(brew --prefix postgresql@16)/bin:$PATH"
```
Add this line to your `~/.zshrc` to make it permanent.

**Port 8080 or 3000 already in use**
```bash
lsof -ti:8080,3000 | xargs kill -9
```

**`yarn server` fails to connect to the database**
Make sure PostgreSQL is running:
```bash
brew services start postgresql@16
```
If the database or user is missing, re-run `yarn setup`.

**Backend starts but seed data is missing**
`yarn server` runs with the seed profile and is idempotent — it skips data that already exists. If the DB was wiped, just restart `yarn server` and it will re-seed.

**`yarn client` errors on startup**
If `client/node_modules` is missing or corrupted:
```bash
cd client && yarn install
```

**Windows: `psql` not found after setup**
Add PostgreSQL to your PATH permanently via System Properties → Environment Variables, adding `C:\Program Files\PostgreSQL\16\bin`.

## Out of scope
kept some things out of scope to make the project light and easy to check.
- Mobile view mode
- Translation / i18n
- Light mode
- Direct image upload (URL-based only)
