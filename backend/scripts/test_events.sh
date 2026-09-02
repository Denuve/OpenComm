#!/bin/bash

API_URL="http://localhost:5000/api"
ADMIN_EMAIL="admin@test.com"
ADMIN_PASSWORD="ParolaSecreta123!" # Parola setată la înregistrarea contului

echo "🔑 1. Autentificare Admin ($ADMIN_EMAIL)..."

LOGIN_RES=$(curl -s -X POST "$API_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d "{
    \"email\": \"$ADMIN_EMAIL\",
    \"password\": \"$ADMIN_PASSWORD\"
  }")

TOKEN=$(node -e "try { const r=JSON.parse(process.argv[1]); console.log(r.data?.token || r.token || r.accessToken || ''); } catch(e){}" "$LOGIN_RES")
HOST_ID=$(node -e "try { const r=JSON.parse(process.argv[1]); console.log(r.data?.user?.id || r.user?.id || r.data?.id || ''); } catch(e){}" "$LOGIN_RES")

if [ -z "$TOKEN" ]; then
  echo "❌ Eroare la autentificare! Verifică dacă e-mailul $ADMIN_EMAIL există în DB și parola este corectă."
  echo "Răspuns server: $LOGIN_RES"
  exit 1
fi

echo "✅ Autentificat cu succes! Host ID: $HOST_ID"
echo "--------------------------------------------------"
echo "🚀 2. Creare eveniment nou..."

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
    \"currentParticipantsCount\": 1,
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