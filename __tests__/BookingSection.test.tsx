import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BookingSection from "../components/BookingSection";

// ---------------------------------------------------------------------------
// API format: GET /api/availability?date=...
// Response: { data: { date: string; slots: TimeSlot[] } | null, error?: string }
// ---------------------------------------------------------------------------

interface TimeSlot {
  time: string;
  totalBeds: number;
  availableBeds: number;
}

function makeApiResponse(slots: TimeSlot[], error?: string) {
  if (error) return { data: null, error };
  return { data: { date: "2026-04-21", slots } };
}

const SLOTS_MIXED: TimeSlot[] = [
  { time: "08:00", totalBeds: 8, availableBeds: 6 },
  { time: "09:00", totalBeds: 8, availableBeds: 2 },
  { time: "10:00", totalBeds: 8, availableBeds: 0 },
];

const SLOTS_ALL_FULL: TimeSlot[] = [
  { time: "08:00", totalBeds: 8, availableBeds: 0 },
  { time: "09:00", totalBeds: 8, availableBeds: 0 },
];

function mockFetch(responseBody: unknown, ok = true) {
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({
      ok,
      json: () => Promise.resolve(responseBody),
    })
  );
}

// Switch the date input to a weekday (Tuesday) so the component fetches,
// avoiding fragility when tests run on weekends.
function selectWeekday() {
  const dateInput = screen.getByLabelText(/fecha de reserva/i);
  fireEvent.change(dateInput, { target: { value: "2026-04-21" } }); // Tuesday
  return dateInput;
}

// Wait for a slot button with the given time to appear.
async function waitForSlot(time: string) {
  return waitFor(() =>
    expect(
      screen.getByRole("button", { name: new RegExp(time, "i") })
    ).toBeInTheDocument()
  );
}

beforeEach(() => {
  vi.restoreAllMocks();
});

// ---------------------------------------------------------------------------
// Happy path
// ---------------------------------------------------------------------------

describe("BookingSection — happy path", () => {
  it("renders available beds correctly from mocked API response", async () => {
    mockFetch(makeApiResponse(SLOTS_MIXED));
    render(<BookingSection />);
    selectWeekday();

    await waitForSlot("08:00");

    // 08:00 and 09:00 are available → enabled buttons
    expect(
      screen.getByRole("button", { name: /Reservar turno de las 08:00/i })
    ).toBeEnabled();
    expect(
      screen.getByRole("button", { name: /Reservar turno de las 09:00/i })
    ).toBeEnabled();

    // 10:00 is full → disabled
    const fullSlot = screen.getByRole("button", { name: /Turno de las 10:00 hs completo/i });
    expect(fullSlot).toBeDisabled();
  });

  it("calls /api/availability with the selected weekday date", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(makeApiResponse(SLOTS_MIXED)),
    });
    vi.stubGlobal("fetch", fetchMock);

    render(<BookingSection />);
    selectWeekday();

    await waitFor(() =>
      expect(fetchMock).toHaveBeenCalledWith(
        expect.stringContaining("/api/availability?date=2026-04-21")
      )
    );
  });

  it("opens ReservationModal when an available slot is clicked", async () => {
    mockFetch(makeApiResponse(SLOTS_MIXED));
    const user = userEvent.setup();
    render(<BookingSection />);
    selectWeekday();

    await waitForSlot("08:00");
    await user.click(
      screen.getByRole("button", { name: /Reservar turno de las 08:00/i })
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("ReservationModal shows the correct time after clicking a slot", async () => {
    mockFetch(makeApiResponse(SLOTS_MIXED));
    const user = userEvent.setup();
    render(<BookingSection />);
    selectWeekday();

    await waitForSlot("09:00");
    await user.click(
      screen.getByRole("button", { name: /Reservar turno de las 09:00/i })
    );

    expect(screen.getByText(/09:00 hs/i)).toBeInTheDocument();
  });

  it("does not open ReservationModal when a disabled slot is clicked", async () => {
    mockFetch(makeApiResponse(SLOTS_MIXED));
    render(<BookingSection />);
    selectWeekday();

    await waitFor(() =>
      expect(
        screen.getByRole("button", { name: /Turno de las 10:00 hs completo/i })
      ).toBeDisabled()
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// Edge case: no availability for selected date (empty slots array)
// ---------------------------------------------------------------------------

describe("BookingSection — no availability for date", () => {
  it("shows 'Sin turnos disponibles' when API returns empty slots array", async () => {
    mockFetch(makeApiResponse([]));
    render(<BookingSection />);
    selectWeekday();

    await waitFor(() =>
      expect(screen.getByText(/sin turnos disponibles/i)).toBeInTheDocument()
    );
  });

  it("does not render slot buttons when slots is empty", async () => {
    mockFetch(makeApiResponse([]));
    render(<BookingSection />);
    selectWeekday();

    await waitFor(() =>
      expect(screen.getByText(/sin turnos disponibles/i)).toBeInTheDocument()
    );
    expect(
      screen.queryByRole("button", { name: /reservar turno/i })
    ).not.toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// Edge case: booking when 0 beds left (all slots full)
// ---------------------------------------------------------------------------

describe("BookingSection — 0 beds left on all slots", () => {
  it("renders all slot buttons as disabled when availableBeds is 0 for every slot", async () => {
    mockFetch(makeApiResponse(SLOTS_ALL_FULL));
    render(<BookingSection />);
    selectWeekday();

    await waitFor(() =>
      expect(
        screen.getByRole("button", { name: /Turno de las 08:00 hs completo/i })
      ).toBeDisabled()
    );
    expect(
      screen.getByRole("button", { name: /Turno de las 09:00 hs completo/i })
    ).toBeDisabled();
  });

  it("shows 'Sin lugares' badge text for each full slot", async () => {
    mockFetch(makeApiResponse(SLOTS_ALL_FULL));
    render(<BookingSection />);
    selectWeekday();

    await waitFor(() => {
      const badges = screen.queryAllByText("Sin lugares");
      expect(badges.length).toBe(2);
    });
  });

  it("clicking a full slot does not open ReservationModal", async () => {
    mockFetch(makeApiResponse(SLOTS_ALL_FULL));
    const user = userEvent.setup();
    render(<BookingSection />);
    selectWeekday();

    await waitFor(() =>
      expect(
        screen.getByRole("button", { name: /Turno de las 08:00 hs completo/i })
      ).toBeDisabled()
    );
    await user.click(
      screen.getByRole("button", { name: /Turno de las 08:00 hs completo/i })
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// Edge case: weekend selected
// ---------------------------------------------------------------------------

describe("BookingSection — weekend selected", () => {
  it("shows weekend message when Saturday is selected", () => {
    mockFetch(makeApiResponse(SLOTS_MIXED));
    render(<BookingSection />);

    const dateInput = screen.getByLabelText(/fecha de reserva/i);
    fireEvent.change(dateInput, { target: { value: "2026-04-19" } }); // Saturday

    expect(
      screen.getByText(/descansamos los fines de semana/i)
    ).toBeInTheDocument();
  });

  it("does not fetch availability for a weekend date", () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    render(<BookingSection />);

    const dateInput = screen.getByLabelText(/fecha de reserva/i);
    fireEvent.change(dateInput, { target: { value: "2026-04-19" } }); // Saturday

    expect(fetchMock).not.toHaveBeenCalledWith(
      expect.stringContaining("2026-04-19")
    );
  });
});

// ---------------------------------------------------------------------------
// Edge case: API error response
// ---------------------------------------------------------------------------

describe("BookingSection — API error", () => {
  it("shows error message when availability fetch returns non-ok status", async () => {
    mockFetch({}, false);
    render(<BookingSection />);
    selectWeekday();

    await waitFor(() =>
      expect(screen.getByRole("alert")).toBeInTheDocument()
    );
    expect(screen.getByRole("alert")).toHaveTextContent(
      /no pudimos cargar la disponibilidad/i
    );
  });

  it("shows error when API returns error field in JSON body", async () => {
    mockFetch(makeApiResponse([], "Invalid date"));
    render(<BookingSection />);
    selectWeekday();

    await waitFor(() =>
      expect(screen.getByRole("alert")).toBeInTheDocument()
    );
  });

  it("shows error message when fetch throws (network error)", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("Network error")));
    render(<BookingSection />);
    selectWeekday();

    await waitFor(() =>
      expect(screen.getByRole("alert")).toBeInTheDocument()
    );
  });
});
