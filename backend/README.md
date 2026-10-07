# REST API

The backend is separated into four simple layers:

- `repositories/` contains SQLite queries.
- `services/` contains application rules.
- `controllers/` validates HTTP input and creates responses.
- `server/` creates the Express app and starts it.

Start the database and API with two commands:

```bash
npm run db:init
npm run api
```

The API runs at `http://localhost:3000`.

## Endpoints

- `GET /api/health`
- `GET /api/devices`
- `PATCH /api/devices/:id/status` with `{ "status": true }`
- `GET /api/sensor-readings/latest`
- `POST /api/sensor-readings` with `temperature`, `humidity`, `lightLevel`, and optional `deviceId`

The Expo client uses `EXPO_PUBLIC_API_URL` when it is set. For example:

```bash
EXPO_PUBLIC_API_URL=http://192.168.1.10:3000/api
```

Use the computer's LAN address when testing from a physical phone. `localhost` refers to the phone itself in that case.
