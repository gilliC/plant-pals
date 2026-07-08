#!/usr/bin/env bash
set -euo pipefail

step() { echo "▶ $*"; }

# Install postgres if missing
if ! command -v psql >/dev/null 2>&1; then
    step "Installing postgresql@16..."
    brew install postgresql@16
    export PATH="$(brew --prefix postgresql@16)/bin:$PATH"
fi

# Start postgres if not running
if ! pg_isready -q 2>/dev/null; then
    step "Starting PostgreSQL..."
    brew services start postgresql@16
    sleep 3
fi

step "Setting up database..."
psql -d postgres -c "CREATE ROLE plant_pals_user LOGIN PASSWORD 'password';" 2>/dev/null || true
psql -d postgres -c "CREATE DATABASE plant_pals OWNER plant_pals_user;" 2>/dev/null || true
psql -d plant_pals -c "GRANT ALL PRIVILEGES ON DATABASE plant_pals TO plant_pals_user;" 2>/dev/null || true
psql -d plant_pals -c "GRANT ALL ON SCHEMA public TO plant_pals_user;" 2>/dev/null || true

if [ ! -d "client/node_modules" ]; then
    step "Installing client dependencies..."
    (cd client && yarn install)
fi

step "Done. Run 'yarn server' and 'yarn client' to start."
