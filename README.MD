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
- PostgreSQL (`brew install postgresql@16`)
- MailHog for local email testing (`brew install mailhog`)

## Setup

### Database
Start Postgres and create the database/user (only needed once):
```bash
brew services start postgresql@16
createdb plant_pals
psql -d plant_pals -c "CREATE ROLE plant_pals_user LOGIN PASSWORD 'password';"
psql -d plant_pals -c "GRANT ALL PRIVILEGES ON DATABASE plant_pals TO plant_pals_user;"
psql -d plant_pals -c "GRANT ALL ON SCHEMA public TO plant_pals_user;"
```
Credentials are configured in `server/src/main/resources/application.properties`.

### Backend
```bash
cd server
./gradlew bootRun
```
Runs on http://localhost:8080. Hibernate creates/updates all tables automatically on startup (`ddl-auto=update`).

### Frontend
```bash
cd client
yarn install
yarn dev
```
Runs on http://localhost:3000

### Email (dev)
Start MailHog to catch outbound notification emails locally:
```bash
mailhog
```
Inbox UI available at http://localhost:8025. No emails actually leave the machine.
For production, update the `spring.mail.*` properties in `application.properties` with real SMTP credentials.

## Seeding dev data
With the backend running:
```bash
./scripts/seed-dev-data.sh
```
Requires `jq` and `psql`. Creates an admin user and sample plants. Safe to re-run — skips whatever already exists.

Sign in with:
- name: `admin`
- password: `admin123`

Admin accounts can't be registered via the API by design — the script registers a normal user then promotes it via a direct DB write, which is why it needs `psql`.

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

## Out of scope
- Mobile view
- Translation / i18n
- Light mode
- Direct image upload (URL-based only)
