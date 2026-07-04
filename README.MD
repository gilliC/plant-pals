# TO DO:
1. create a real readme.
2. can we use record? 
3. move hardcoded urls to consts

# Notes to the tester:
1. `client/src/components/ui` is code by shad/cn that is being added automatically when adding a new component.

# Things I skipped to keep this project scoped:
1. Mobile View
2. Translation
3. Light Mode
4. Uploading the plant image directly here.

# how to start

## Prerequisites
- Java 21
- Node.js + yarn
- PostgreSQL (Homebrew: `brew install postgresql@16`)

## Database
Start Postgres and create the database/user (only needed once):
```
brew services start postgresql@16
createdb plant_pals
psql -d plant_pals -c "CREATE ROLE plant_pals_user LOGIN PASSWORD 'password';"
psql -d plant_pals -c "GRANT ALL PRIVILEGES ON DATABASE plant_pals TO plant_pals_user;"
psql -d plant_pals -c "GRANT ALL ON SCHEMA public TO plant_pals_user;"
```
Credentials/URL are configured in `server/src/main/resources/application.properties`.

## Backend
```
cd server
./gradlew bootRun
```
Runs on http://localhost:8080

## Frontend
```
cd client
yarn install
yarn dev
```
Runs on http://localhost:3000

## Seeding dev data
With the backend running, seed an admin user and a handful of sample plants (safe to re-run — skips whatever already exists):
```
./scripts/seed-dev-data.sh
```
Requires `jq` and `psql`. Sign in with:
- name: `admin`
- password: `admin123`

Override via `ADMIN_NAME` / `ADMIN_PASSWORD` env vars. There's no "register as admin" API by design (see TASKS.md §1) — the script registers a normal user via the public API, then promotes it to `ADMIN` with a direct DB write, which is why it needs `psql` access to the dev DB.
