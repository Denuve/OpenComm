#!/bin/bash

echo "=== 1. Autentificare Host ==="
TOKEN_HOST=$(curl -s -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test.user@example.com","password":"Password123!"}' \
  | grep -o '"token":"[^"]*' | cut -d'"' -f4)

echo "Token Host: $TOKEN_HOST"

echo -e "\n=== 2. Creare Eveniment Nou ==="
EVENT_RESPONSE=$(curl -s -X POST http://localhost:5000/api/events \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN_HOST" \
  -d '{
    "title": "Test Automatizat Join Leave",
    "maxParticipants": 3,
    "targetGender": "mixed",
    "minAge": 18,
    "eventType": "casual"
  }')

EVENT_ID=$(echo $EVENT_RESPONSE | grep -o '"id":"[^"]*' | cut -d'"' -f4)
echo "ID Eveniment: $EVENT_ID"

echo -e "\n=== 3. Înregistrare și Autentificare Utilizator 2 ==="
# Am adăugat câmpul "gender": "male"
REGISTER_RES=$(curl -s -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"second.user@example.com","password":"Password123!","name":"Mihai","gender":"male"}')
echo "Răspuns Înregistrare User 2: $REGISTER_RES"

LOGIN_RES=$(curl -s -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"second.user@example.com","password":"Password123!"}')

TOKEN_USER2=$(echo $LOGIN_RES | grep -o '"token":"[^"]*' | cut -d'"' -f4)
echo "Token User 2: $TOKEN_USER2"

echo -e "\n=== 4. Test JOIN (Utilizatorul 2 intră în eveniment) ==="
curl -s -X POST http://localhost:5000/api/events/$EVENT_ID/join \
  -H "Authorization: Bearer $TOKEN_USER2"

echo -e "\n\n=== 5. Test Înscriere Duplicată (Trebuie să returneze eroare 400) ==="
curl -s -X POST http://localhost:5000/api/events/$EVENT_ID/join \
  -H "Authorization: Bearer $TOKEN_USER2"

echo -e "\n\n=== 6. Test LEAVE Host (Trebuie să fie blocat cu eroare 400) ==="
curl -s -X POST http://localhost:5000/api/events/$EVENT_ID/leave \
  -H "Authorization: Bearer $TOKEN_HOST"

echo -e "\n\n=== 7. Test LEAVE Utilizator 2 (Părăsire cu succes) ==="
curl -s -X POST http://localhost:5000/api/events/$EVENT_ID/leave \
  -H "Authorization: Bearer $TOKEN_USER2"

echo -e "\n\n=== Testare Finalizată ==="