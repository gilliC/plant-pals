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

## Admin access
On first backend startup, an admin user is seeded automatically (no-op if an admin already exists). Sign in with:
- name: `admin`
- password: `admin123`

Override via `APP_ADMIN_NAME` / `APP_ADMIN_PASSWORD` env vars — required for anything beyond local dev, since these are public defaults.

## Seeding test data
With the backend running, populate a handful of sample plants (skips any that already exist, safe to re-run):
```
./scripts/seed-dev-data.sh
```
Requires `jq`.
