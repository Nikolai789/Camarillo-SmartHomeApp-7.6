# Smart home backend

This folder contains the Node.js, Express, and SQLite REST API used by the Expo app.

## Run it

```powershell
cd backend
npm install
Copy-Item .env.example .env
npm run dev
```

The API listens on `http://localhost:3000` by default. SQLite creates `data/smarthome.sqlite` on first start.

For the Expo app, create a root `.env` file with `EXPO_PUBLIC_API_URL`. Use
`http://localhost:3000/api` for a simulator or web, and replace `localhost` with
your development machine's LAN IP when using a physical device.

## Endpoints

- `GET /api/health`
- `GET /api/devices`
- `PATCH /api/devices/:id` with `{ "status": true }`
- `GET /api/sensor-readings?deviceId=1&limit=50`
- `POST /api/sensor-readings` with `{ "temperature": 28, "humidity": 65, "light": 720, "deviceId": 1 }`

The `humidity` spelling is used consistently in the API; it corrects the requested table field typo `humididty`.
