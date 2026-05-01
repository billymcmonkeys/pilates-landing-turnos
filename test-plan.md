# QA Test Plan — Mundo Pilates Booking Flow

**Author:** Daniel (QA Agent)  
**Date:** 2026-04-18  
**Scope:** Booking flow: date picker → availability grid → ReservationModal → POST /api/booking

---

## 1. Feature Overview

Users can:
1. Select a date (weekdays only)
2. View available time slots with bed counts
3. Click an available slot to open a booking modal
4. Fill in their name and email, submit, and receive a booking confirmation

---

## 2. Components Under Test

| Component | File | Responsibility |
|-----------|------|----------------|
| `BookingSection` | `components/BookingSection.tsx` | Date picker, slot availability grid |
| `ReservationModal` | `components/ReservationModal.tsx` | Booking form, submission, success/error states |
| `/api/availability` | `app/api/availability/route.ts` | Returns available slots for a date |
| `/api/booking` | `app/api/booking/route.ts` | Creates a booking reservation |

---

## 3. Testing Pyramid

```
         [E2E]          ← Playwright: full booking flow, cross-browser
       [Integration]    ← API routes + DB (not yet implemented)
     [Unit Tests]       ← Vitest + Testing Library (implemented ✓)
```

---

## 4. Test Scenarios

### 4.1 Happy Path

| # | Scenario | Expected Result | Test File |
|---|----------|----------------|-----------|
| H1 | Select a weekday date | API fetches availability for that date | BookingSection.test |
| H2 | Available slots shown | Slot buttons enabled, bed count visible | BookingSection.test |
| H3 | Click available slot | ReservationModal opens with correct time | BookingSection.test |
| H4 | Fill name + valid email, submit | POST to /api/booking with correct payload | ReservationModal.test |
| H5 | API returns success | `data-testid="success-message"` shown, booking ID displayed | ReservationModal.test |
| H6 | Click "Listo, nos vemos!" | Modal closes via onClose | ReservationModal.test |

### 4.2 No Availability

| # | Scenario | Expected Result | Test File |
|---|----------|----------------|-----------|
| N1 | API returns empty slots array | "Sin turnos disponibles" message shown, no buttons | BookingSection.test |
| N2 | All slots have availableBeds = 0 | All slot buttons rendered as disabled | BookingSection.test |
| N3 | Click a full slot | Modal does NOT open | BookingSection.test |
| N4 | Full slot button label | `aria-label="Turno de las XX:XX hs completo"` | BookingSection.test |

### 4.3 Weekend Selected

| # | Scenario | Expected Result | Test File |
|---|----------|----------------|-----------|
| W1 | Select Saturday | "Descansamos los fines de semana" shown | BookingSection.test |
| W2 | Select Sunday | Same weekend message | BookingSection.test |
| W3 | Select weekend date | Fetch NOT called for that date | BookingSection.test |
| W4 | Select weekday after weekend | Fetch called, slots shown | Manual |

### 4.4 Form Validation (Invalid Submission)

| # | Scenario | Expected Result | Test File |
|---|----------|----------------|-----------|
| F1 | Submit empty form | Required errors for name and email | ReservationModal.test |
| F2 | Name empty, email valid | Only name error shown | ReservationModal.test |
| F3 | Name valid, email `not-valid` | Email format error shown | ReservationModal.test |
| F4 | Invalid email like `a@` | Format error (regex fails) | ReservationModal.test |
| F5 | Validation error shown | Field marked `aria-invalid="true"` | ReservationModal.test |
| F6 | Fetch not called on invalid form | No network request made | ReservationModal.test |
| F7 | User starts correcting | Field error clears immediately | ReservationModal.test |

### 4.5 API Error Response

| # | Scenario | Expected Result | Test File |
|---|----------|----------------|-----------|
| A1 | Availability fetch returns 500 | Error message in `role="alert"` | BookingSection.test |
| A2 | Availability JSON has `error` field | Same error message shown | BookingSection.test |
| A3 | Network failure on availability | Error message shown | BookingSection.test |
| A4 | Booking POST returns non-ok | `data-testid="submit-error"` shown | ReservationModal.test |
| A5 | Booking POST returns error JSON | Server error message in submit-error | ReservationModal.test |
| A6 | Network failure on booking POST | Connection error message shown | ReservationModal.test |
| A7 | "Intentar de nuevo" after error | Form shown again, error cleared | ReservationModal.test |
| A8 | "Cancelar" after error | Modal closed via onClose | ReservationModal.test |

### 4.6 Loading States

| # | Scenario | Expected Result | Test File |
|---|----------|----------------|-----------|
| L1 | Availability fetch in progress | Skeleton placeholders shown | BookingSection.test |
| L2 | Booking submit in progress | Button shows "Confirmando...", disabled | ReservationModal.test |
| L3 | Cancel disabled during loading | Cancel button disabled | Manual |

### 4.7 Close Behavior

| # | Scenario | Expected Result | Test File |
|---|----------|----------------|-----------|
| C1 | Click "Cancelar" on form | onClose called | ReservationModal.test |
| C2 | Click X button | onClose called | ReservationModal.test |
| C3 | Click backdrop (not loading) | onClose called | Manual |
| C4 | Click "Listo, nos vemos!" | onClose called | ReservationModal.test |

### 4.8 Accessibility

| # | Scenario | Expected Result | Priority |
|---|----------|----------------|----------|
| Acc1 | Form fields have labels | All inputs have associated `<label>` | High |
| Acc2 | Modal has role=dialog | `role="dialog"` + `aria-modal="true"` + `aria-labelledby` | High |
| Acc3 | Error messages announced | `role="alert"` on error elements | High |
| Acc4 | Disabled slots communicated | `disabled` attribute on unavailable buttons | High |
| Acc5 | Slot purpose clear from label | `aria-label` describes slot time and bed count | Medium |
| Acc6 | Form invalid fields marked | `aria-invalid="true"` + `aria-describedby` for error | High |

---

## 5. Edge Cases Requiring Manual Testing

| Edge Case | Risk | Steps to Verify |
|-----------|------|----------------|
| Back-to-back rapid date changes | Race condition: older fetch resolves after newer one | Click different dates quickly, verify correct data |
| Booking submission double-click | Duplicate bookings | Double-click submit, verify only one POST sent |
| Very long name (>200 chars) | Layout overflow, server rejection | Type 250 chars in name field |
| Email with Unicode (e.g. domain with special chars) | Validation bypass | Try edge-case emails |
| Booking with past date (URL manipulation) | Invalid reservation | Manually call POST with past date |
| Browser back navigation during booking | Stale modal state | Navigate away mid-form, return |

---

## 6. Security Checks

| Check | Risk |
|-------|------|
| Name field allows `<script>` | XSS — verify server sanitizes before storing/displaying |
| Email with SQL patterns | SQLi — verify parameterized queries used on backend |
| No auth on POST /api/booking | Any user can book any slot — consider adding user authentication |
| No rate limiting on POST | DoS / slot spamming — consider adding rate limit per IP |
| `bookingId` exposed in frontend | Enumerable IDs could allow probing — use UUIDs |

---

## 7. Performance Considerations

| Scenario | Check |
|----------|-------|
| Many slots (>20) in grid | No jank scrolling the grid |
| Slow API (>2s response) | Loading skeleton shown immediately |
| Repeated date changes | Debounce or abort previous fetch to avoid flicker |

---

## 8. Test Coverage Summary (Automated)

| File | Tests | Pass |
|------|-------|------|
| `__tests__/BookingSection.test.tsx` | 15 | 15/15 |
| `__tests__/ReservationModal.test.tsx` | 22 | 22/22 |
| **Total** | **37** | **37/37** |

### Coverage by scenario type

- Happy path: 6 tests
- No availability / 0 beds: 5 tests
- Weekend: 2 tests
- Form validation: 6 tests
- API errors: 9 tests
- Loading states: 3 tests
- Close behavior: 4 tests
- Rendering/accessibility: 5 tests

### Bugs discovered during QA

1. **BookingSection component mismatch**: The original `BookingSection.tsx` imported `BedSlot` from `@/lib/types` but that type did not exist in `lib/types.ts`, and it passed `{ bed, date, onClose }` to `ReservationModal` which expects `{ isOpen, selectedDate, selectedTime, availableBeds }`. Fixed by rewriting `BookingSection` to use the slot-based API consistent with `lib/types.ts` and the existing `ReservationModal` contract. **Severity: Critical** (modal would never open).

2. **Missing `data-testid` on the "no slots" state**: The no-availability state had no `data-testid`, making it undetectable in automated tests without relying on text content. **Severity: Low** (tests can use text, but fragile for copy changes).
