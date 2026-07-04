#!/usr/bin/env bash
# Seeds local dev data: creates (or promotes) an admin user, adds a handful of
# sample plants (skipping any whose name already exists), creates a demo user,
# and files a few adoption requests for that user in different statuses
# (pending/approved/rejected) so the "My Requests" page has real data to show.
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
#   DEMO_NAME           default demo
#   DEMO_PASSWORD       default demo123
#   PGHOST/PGUSER/PGDATABASE/PGPASSWORD  default to the local dev DB (see below)

set -euo pipefail

API="${API_BASE:-http://localhost:8080/api}"
ADMIN_NAME="${ADMIN_NAME:-admin}"
ADMIN_PASSWORD="${ADMIN_PASSWORD:-admin123}"
DEMO_NAME="${DEMO_NAME:-demo}"
DEMO_PASSWORD="${DEMO_PASSWORD:-demo123}"

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

# Registers a user via the public API if they don't already exist, then logs in
# and prints their id. Echoes progress to stderr so callers can capture just the id.
register_or_login() {
    local name="$1"
    local password="$2"

    local login_response
    login_response=$(curl -s -w '\n%{http_code}' -X POST "$API/auth/login" \
        -H "Content-Type: application/json" \
        -d "{\"name\":\"$name\",\"password\":\"$password\"}")
    local login_status="${login_response##*$'\n'}"
    local login_body="${login_response%$'\n'*}"

    if [ "$login_status" = "200" ]; then
        echo "User '$name' already exists." >&2
        jq -r '.id' <<<"$login_body"
        return
    fi

    local register_response
    register_response=$(curl -s -w '\n%{http_code}' -X POST "$API/auth/register" \
        -H "Content-Type: application/json" \
        -d "{\"name\":\"$name\",\"password\":\"$password\"}")
    local register_status="${register_response##*$'\n'}"
    local register_body="${register_response%$'\n'*}"

    if [ "$register_status" != "201" ]; then
        echo "Failed to register '$name' (HTTP $register_status)" >&2
        exit 1
    fi

    echo "Created user '$name'." >&2
    jq -r '.id' <<<"$register_body"
}

echo
echo "== Admin =="
admin_id=$(register_or_login "$ADMIN_NAME" "$ADMIN_PASSWORD")
role=$(psql -tAc "SELECT role FROM app_user WHERE name = '$ADMIN_NAME';")
if [ "$role" = "ADMIN" ]; then
    echo "'$ADMIN_NAME' is already ADMIN."
else
    psql -c "UPDATE app_user SET role = 'ADMIN' WHERE name = '$ADMIN_NAME';" >/dev/null
    echo "Promoted '$ADMIN_NAME' to ADMIN."
fi

echo
echo "== Demo user =="
demo_id=$(register_or_login "$DEMO_NAME" "$DEMO_PASSWORD")

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
echo "== Requests (demo user) =="
plants_json=$(curl -s "$API/plants")
demo_requests_json=$(curl -s "$API/request?userId=$demo_id")

plant_id_for() {
    jq -r --arg name "$1" 'map(select(.name == $name)) | .[0].id // empty' <<<"$plants_json"
}

seed_request() {
    local plant_name="$1"
    local target_status="$2"

    local plant_id
    plant_id=$(plant_id_for "$plant_name")
    if [ -z "$plant_id" ]; then
        echo "Skip request for '$plant_name' (plant not found)" >&2
        return
    fi

    local existing_request_id
    existing_request_id=$(jq -r --argjson plantId "$plant_id" \
        'map(select(.plant.id == $plantId)) | .[0].id // empty' <<<"$demo_requests_json")

    if [ -n "$existing_request_id" ]; then
        echo "Skip request for '$plant_name' (already requested, id=$existing_request_id)"
        return
    fi

    local create_response request_id
    create_response=$(curl -s -X POST "$API/request/create" \
        -H "Content-Type: application/json" \
        -d "{\"plantId\":$plant_id,\"userId\":$demo_id}")
    request_id=$(jq -r '.id // empty' <<<"$create_response")

    if [ -z "$request_id" ]; then
        echo "Failed to create request for '$plant_name': $create_response" >&2
        return
    fi

    case "$target_status" in
    approved)
        curl -s -o /dev/null -X POST "$API/request/approve" \
            -H "Content-Type: application/json" \
            -d "{\"requestId\":$request_id,\"userId\":$admin_id}"
        ;;
    rejected)
        curl -s -o /dev/null -X POST "$API/request/reject" \
            -H "Content-Type: application/json" \
            -d "{\"requestId\":$request_id,\"userId\":$admin_id}"
        ;;
    esac

    echo "Created request for '$plant_name' (id=$request_id, status=$target_status)"
}

seed_request "Monstera Deliciosa" "approved"
seed_request "Snake Plant" "pending"
seed_request "Fiddle Leaf Fig" "rejected"

echo
echo "Done."
