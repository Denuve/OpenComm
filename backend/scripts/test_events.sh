#!/bin/bash

API_URL="http://localhost:5000/api"
TIMESTAMP=$(date +%s)
EMAIL="admin_${TIMESTAMP}@test.com"
PASSWORD="ParolaSecreta123!"

echo "🚀 1. Înregistrare Admin ($EMAIL)..."

REGISTER_RES=$(curl -s -X POST "$API_URL/auth/register" \
  -H "Content-Type: application/json" \
  -d "{
    \"email\": \"$EMAIL\",
    \"password\": \"$PASSWORD\",
    \"name\": \"Admin Test\",
    \"age\": 28,
    \"gender\": \"male\",
    \"role\": \"admin\"
  }")

TOKEN=$(node -e "try { const r=JSON.parse(process.argv[1]); console.log(r.data?.token || r.token || r.accessToken || ''); } catch(e){}" "$REGISTER_RES")
HOST_ID=$(node -e "try { const r=JSON.parse(process.argv[1]); console.log(r.data?.user?.id || r.user?.id || r.data?.id || ''); } catch(e){}" "$REGISTER_RES")

if [ -z "$TOKEN" ]; then
  echo "🔑 2. Încercare Autentificare (Login)..."
  LOGIN_RES=$(curl -s -X POST "$API_URL/auth/login" \
    -H "Content-Type: application/json" \
    -d "{ \"email\": \"$EMAIL\", \"password\": \"$PASSWORD\" }")
  
  TOKEN=$(node -e "try { const r=JSON.parse(process.argv[1]); console.log(r.data?.token || r.token || r.accessToken || ''); } catch(e){}" "$LOGIN_RES")
  HOST_ID=$(node -e "try { const r=JSON.parse(process.argv[1]); console.log(r.data?.user?.id || r.user?.id || r.data?.id || ''); } catch(e){}" "$LOGIN_RES")
fi

if [ -z "$TOKEN" ]; then
  echo "❌ Eroare: Nu s-a obținut token-ul de acces."
  exit 1
fi

echo "✅ Auth OK | Host ID: $HOST_ID"
echo "--------------------------------------------------"
echo "🚀 3. Creare eveniment nou..."

EVENT_RES=$(curl -s -X POST "$API_URL/events" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d "{
    \"hostId\": \"$HOST_ID\",
    \"host_id\": \"$HOST_ID\",
    \"venueId\": null,
    \"title\": \"Seară de Board Games\",
    \"description\": \"Jocuri de societate în grup mic.\",
    \"maxParticipants\": 6,
    \"max_participants\": 6,
    \"currentParticipantsCount\": 3,
    \"targetGender\": \"mixed\",
    \"target_gender\": \"mixed\",
    \"minAge\": 18,
    \"min_age\": 18,
    \"eventType\": \"casual\",
    \"event_type\": \"casual\",
    \"status\": \"published\",
    \"eventDate\": \"2026-09-15T18:00:00.000Z\"
  }")

echo "🎉 Răspuns Server Eveniment:"
echo "$EVENT_RES" | node -e "
  const fs = require('fs');
  try {
    const json = JSON.parse(fs.readFileSync(0, 'utf-8'));
    console.log(JSON.stringify(json, null, 2));
  } catch(e) {
    console.log(process.argv[1]);
  }
"