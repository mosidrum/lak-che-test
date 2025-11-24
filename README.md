# auto_fi

## Seam Sandbox Integration

1. Generate a Seam API key from the Seam Console and add it to your `.env` file:

```
SEAM_API_KEY=your_workspace_api_key
SEAM_BASE_URL=https://connect.getseam.com # optional override for testing
```

2. Start the API (`npm run dev`) and hit the Seam endpoints (all are protected with JWT):

| Method | Endpoint | Description | Request body |
| ------ | -------- | ----------- | ------------ |
| `GET` | `/api/v1/seam/devices` | Lists every Seam device linked to the workspace | – |
| `GET` | `/api/v1/seam/access-codes?deviceId=<id>` | Lists access codes (optionally filtered by `deviceId`) | – |
| `POST` | `/api/v1/seam/access-codes` | Creates a new access code on the provided device | `{ "deviceId": "uuid", "name": "Jane", "code": "123456", "startsAt": "2025-05-01T10:00:00Z", "endsAt": "2025-05-02T10:00:00Z" }` (only `deviceId` is required) |
| `GET` | `/api/v1/seam/access-codes/:accessCodeId` | Retrieves the latest state of a single access code | – |

All responses follow the pattern:

```
{
  "message": "Seam devices retrieved successfully",
  "data": { "devices": [...] }
}
```

The endpoints proxy the Seam SDK, so you can test your integration logic without owning hardware—just inspect the responses the SDK returns from your sandbox workspace. When you later connect real devices in Seam, these endpoints will act on the physical locks automatically ([Seam overview](https://www.seam.co/)). 
