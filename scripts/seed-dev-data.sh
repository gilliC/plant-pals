#!/usr/bin/env bash
# Seeds local dev data: creates (or promotes) an admin user, then adds a handful
# of sample plants (skipping any whose name already exists) via the running API.
#
# Admin creation is deliberately NOT done by the backend itself: there is no
# "register as admin" API (that would let anyone self-promote — see TASKS.md §1),
# so this script registers a normal user via the public API and then promotes it
# to ADMIN with a direct DB write, which requires local/trusted DB access.
#
# Requires the backend running (cd server && ./gradlew bootRun), `jq`, and `psql`
# access to the dev DB (same credentials as server/src/main/resources/application.properties).
#
# Usage:
#   ./scripts/seed-dev-data.sh
#
# Env overrides:
#   API_BASE           default http://localhost:8080/api
#   ADMIN_NAME          default admin
#   ADMIN_PASSWORD      default admin123
#   PGHOST/PGUSER/PGDATABASE/PGPASSWORD  default to the local dev DB (see below)

set -euo pipefail

API="${API_BASE:-http://localhost:8080/api}"
ADMIN_NAME="${ADMIN_NAME:-admin}"
ADMIN_PASSWORD="${ADMIN_PASSWORD:-admin123}"

export PGHOST="${PGHOST:-localhost}"
export PGUSER="${PGUSER:-plant_pals_user}"
export PGDATABASE="${PGDATABASE:-plant_pals}"
export PGPASSWORD="${PGPASSWORD:-password}"

if ! command -v jq >/dev/null 2>&1; then
    echo "jq is required (brew install jq)" >&2
    exit 1
fi

if ! command -v psql >/dev/null 2>&1; then
    echo "psql is required (brew install postgresql@16)" >&2
    exit 1
fi

echo "Waiting for backend at $API..."
ready=false
for _ in $(seq 1 30); do
    if [ "$(curl -s -o /dev/null -w '%{http_code}' "$API/plants")" = "200" ]; then
        ready=true
        break
    fi
    sleep 2
done

if [ "$ready" != "true" ]; then
    echo "Backend not reachable at $API. Start it with: cd server && ./gradlew bootRun" >&2
    exit 1
fi

echo
echo "== Admin =="
login_status=$(curl -s -o /dev/null -w '%{http_code}' -X POST "$API/auth/login" \
    -H "Content-Type: application/json" \
    -d "{\"name\":\"$ADMIN_NAME\",\"password\":\"$ADMIN_PASSWORD\"}")

if [ "$login_status" = "200" ]; then
    role=$(psql -tAc "SELECT role FROM app_user WHERE name = '$ADMIN_NAME';")
    if [ "$role" = "ADMIN" ]; then
        echo "Admin user '$ADMIN_NAME' already exists and is ADMIN."
    else
        psql -c "UPDATE app_user SET role = 'ADMIN' WHERE name = '$ADMIN_NAME';" >/dev/null
        echo "Promoted existing user '$ADMIN_NAME' to ADMIN."
    fi
else
    register_status=$(curl -s -o /dev/null -w '%{http_code}' -X POST "$API/auth/register" \
        -H "Content-Type: application/json" \
        -d "{\"name\":\"$ADMIN_NAME\",\"password\":\"$ADMIN_PASSWORD\"}")

    if [ "$register_status" != "201" ]; then
        echo "Failed to register '$ADMIN_NAME' (HTTP $register_status)" >&2
        exit 1
    fi

    psql -c "UPDATE app_user SET role = 'ADMIN' WHERE name = '$ADMIN_NAME';" >/dev/null
    echo "Created admin user '$ADMIN_NAME'."
fi

echo
echo "== Plants =="
existing_names=$(curl -s "$API/plants" | jq -r '.[].name')

seed_plant() {
    local name="$1"
    local payload="$2"

    if grep -qxF "$name" <<<"$existing_names"; then
        echo "Skip '$name' (already exists)"
        return
    fi

    local status
    status=$(curl -s -o /dev/null -w '%{http_code}' -X POST "$API/plants" \
        -H "Content-Type: application/json" -d "$payload")

    if [ "$status" = "201" ]; then
        echo "Created '$name'"
    else
        echo "Failed to create '$name' (HTTP $status)" >&2
    fi
}

seed_plant "Monstera Deliciosa" '{
    "name": "Monstera Deliciosa",
    "category": {"name": "Houseplants"},
    "shortDescription": "The iconic split-leaf philodendron cousin",
    "description": "A large, fast-growing tropical vine known for its dramatic fenestrated leaves. Great statement plant for bright rooms.",
    "photoUrl": "https://images.unsplash.com/photo-1614594975525-e45190c55d0b",
    "wateringDifficulty": "MEDIUM",
    "sunlight": "INDIRECT",
    "difficulty": "BEGINNER",
    "similarTo": "Philodendron"
}'

seed_plant "Snake Plant" '{
    "name": "Snake Plant",
    "category": {"name": "Succulents"},
    "shortDescription": "Nearly indestructible, air-purifying favorite",
    "description": "Stiff upright leaves that tolerate neglect, low light, and irregular watering better than almost any houseplant.",
    "photoUrl": "https://images.unsplash.com/photo-1572688484438-313a6e50c333",
    "wateringDifficulty": "LOW",
    "sunlight": "SHADE",
    "difficulty": "BEGINNER",
    "similarTo": "ZZ Plant"
}'

seed_plant "Fiddle Leaf Fig" '{
    "name": "Fiddle Leaf Fig",
    "category": {"name": "Houseplants"},
    "shortDescription": "Big glossy leaves, big personality",
    "description": "A striking indoor tree with large violin-shaped leaves. Sensitive to drafts and inconsistent watering.",
    "photoUrl": "https://images.unsplash.com/photo-1597055181300-e3633a6e4092",
    "wateringDifficulty": "MEDIUM",
    "sunlight": "FULL",
    "difficulty": "ADVANCED",
    "similarTo": "Rubber Plant"
}'

seed_plant "Pothos" '{
    "name": "Pothos",
    "category": {"name": "Vines"},
    "shortDescription": "Fast-growing trailing vine for beginners",
    "description": "One of the easiest houseplants to grow, tolerant of low light and irregular watering, great for hanging baskets.",
    "photoUrl": "https://images.unsplash.com/photo-1600411833196-7c1f6b1eb9b3",
    "wateringDifficulty": "LOW",
    "sunlight": "PARTIAL",
    "difficulty": "BEGINNER",
    "similarTo": "Philodendron"
}'

seed_plant "Basil" '{
    "name": "Basil",
    "category": {"name": "Herbs"},
    "shortDescription": "Fragrant kitchen herb, loves the sun",
    "description": "Fast-growing culinary herb that needs consistent watering and plenty of direct sunlight to thrive.",
    "photoUrl": "https://images.unsplash.com/photo-1618375569909-3c8616cf7733",
    "wateringDifficulty": "HIGH",
    "sunlight": "FULL",
    "difficulty": "INTERMEDIATE",
    "similarTo": "Mint"
}'

echo
echo "Done."
