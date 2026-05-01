# Mundo Pilates — API Contract

Mock booking API. No persistence — all responses are derived from `mock-data/slots.json`.

---

## GET /api/availability

Returns available time slots for a specific date.

### Query Parameters

| Parameter | Type   | Required | Description           |
|-----------|--------|----------|-----------------------|
| `date`    | string | Yes      | Date in `YYYY-MM-DD` format |

### Responses

#### 200 OK — Date found
```json
{
  "data": {
    "date": "2026-04-18",
    "slots": [
      { "time": "08:00", "totalBeds": 6, "availableBeds": 4 },
      { "time": "09:30", "totalBeds": 6, "availableBeds": 0 }
    ]
  }
}
```

#### 200 OK — Date not in mock data (no classes)
```json
{
  "data": {
    "date": "2026-04-30",
    "slots": []
  }
}
```

#### 400 Bad Request — Missing or malformed date
```json
{ "data": null, "error": "Missing required query parameter: date" }
{ "data": null, "error": "Invalid date format. Expected YYYY-MM-DD" }
```

#### 500 Internal Server Error — Could not load mock data
```json
{ "data": null, "error": "Internal server error: could not load availability data" }
```

---

## POST /api/booking

Creates a mock booking reservation. Does not persist data.

### Request Body (JSON)

| Field   | Type    | Required | Constraints                    |
|---------|---------|----------|--------------------------------|
| `date`  | string  | Yes      | `YYYY-MM-DD`                   |
| `time`  | string  | Yes      | `HH:MM` (24-hour)              |
| `beds`  | number  | Yes      | Positive integer               |
| `name`  | string  | Yes      | Minimum 2 characters           |
| `email` | string  | Yes      | Valid email format             |

#### Example Request
```json
{
  "date": "2026-04-18",
  "time": "09:30",
  "beds": 2,
  "name": "Ana García",
  "email": "ana@example.com"
}
```

### Responses

#### 201 Created — Booking accepted
```json
{
  "data": {
    "success": true,
    "bookingId": "booking-2026-04-18-0930-1713399600000"
  }
}
```

#### 400 Bad Request — Missing fields or invalid JSON
```json
{ "data": null, "error": "Missing required fields: date, time, beds, name, email" }
{ "data": null, "error": "Invalid JSON body" }
```

#### 404 Not Found — Date or time slot not in mock data
```json
{ "data": null, "error": "No availability found for date 2026-04-30" }
{ "data": null, "error": "No slot found at 07:00 on 2026-04-18" }
```

#### 409 Conflict — Not enough beds available
```json
{ "data": null, "error": "Not enough beds available. Requested: 5, available: 2" }
```

#### 422 Unprocessable Entity — Validation error
```json
{ "data": null, "error": "Invalid date format. Expected YYYY-MM-DD" }
{ "data": null, "error": "beds must be a positive integer" }
{ "data": null, "error": "Invalid email format" }
```

---

## TypeScript Types

Defined in `lib/types.ts`:

```ts
interface TimeSlot {
  time: string;        // "HH:MM"
  totalBeds: number;
  availableBeds: number;
}

interface DaySlots {
  date: string;        // "YYYY-MM-DD"
  slots: TimeSlot[];
}

interface AvailabilityResponse {
  data: { date: string; slots: TimeSlot[] } | null;
  error?: string;
}

interface BookingRequest {
  date: string;
  time: string;
  beds: number;
  name: string;
  email: string;
}

interface BookingResponse {
  data: { success: true; bookingId: string } | null;
  error?: string;
}
```

---

## Mock Data

`mock-data/slots.json` contains 8 days of pilates bed availability.
Each day has 3–6 time slots with `totalBeds: 6` and varying `availableBeds`.
