import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ReservationModal from "../components/ReservationModal";

// ---------------------------------------------------------------------------
// Helpers — real prop signature: { isOpen, onClose, selectedDate, selectedTime, availableBeds }
// ---------------------------------------------------------------------------

const BASE_PROPS = {
  isOpen: true,
  selectedDate: "2026-05-05",   // Monday
  selectedTime: "09:00",
  availableBeds: 5,
};

function renderModal(overrides: Partial<typeof BASE_PROPS & { onClose: () => void }> = {}) {
  const onClose = overrides.onClose ?? vi.fn();
  const props = { ...BASE_PROPS, onClose, ...overrides };
  render(<ReservationModal {...props} />);
  return { onClose };
}

function mockBookingFetch(ok: boolean, body?: object) {
  const defaultBody = ok
    ? { success: true, bookingId: "booking-abc123" }
    : { error: "No pudimos confirmar tu reserva. Intentá de nuevo." };
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({
      ok,
      json: () => Promise.resolve(body ?? defaultBody),
    })
  );
}

async function fillAndSubmit(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/nombre completo/i), "Ana García");
  await user.type(screen.getByLabelText(/email/i), "ana@example.com");
  await user.click(screen.getByRole("button", { name: /confirmar reserva/i }));
}

beforeEach(() => {
  vi.restoreAllMocks();
});

// ---------------------------------------------------------------------------
// Rendering
// ---------------------------------------------------------------------------

describe("ReservationModal — rendering", () => {
  it("renders form fields and buttons when isOpen=true", () => {
    renderModal();
    expect(screen.getByLabelText(/nombre completo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /confirmar reserva/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /cancelar/i })).toBeInTheDocument();
  });

  it("renders nothing (null) when isOpen=false", () => {
    renderModal({ isOpen: false });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/nombre completo/i)).not.toBeInTheDocument();
  });

  it("shows the selected date and time in the modal subtitle", () => {
    renderModal();
    expect(screen.getByText(/09:00 hs/i)).toBeInTheDocument();
  });

  it("shows available beds count", () => {
    renderModal({ availableBeds: 3 });
    expect(screen.getByText(/3 lugares disponibles/i)).toBeInTheDocument();
  });

  it("has role=dialog and aria-modal=true", () => {
    renderModal();
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
  });
});

// ---------------------------------------------------------------------------
// Happy path — successful submission
// ---------------------------------------------------------------------------

describe("ReservationModal — successful submission", () => {
  it("submits form and shows success state on mock POST success", async () => {
    mockBookingFetch(true);
    const user = userEvent.setup();
    renderModal();

    await fillAndSubmit(user);

    await waitFor(() =>
      expect(screen.getByTestId("success-message")).toBeInTheDocument()
    );
  });

  it("POSTs to /api/booking with correct payload", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ success: true, bookingId: "booking-123" }),
    });
    vi.stubGlobal("fetch", fetchMock);
    const user = userEvent.setup();
    renderModal();

    await fillAndSubmit(user);

    await waitFor(() => expect(fetchMock).toHaveBeenCalledOnce());
    const [url, options] = fetchMock.mock.calls[0];
    expect(url).toBe("/api/booking");
    expect(options.method).toBe("POST");
    const body = JSON.parse(options.body);
    expect(body).toMatchObject({
      date: "2026-05-05",
      name: "Ana García",
      email: "ana@example.com",
    });
  });

  it("disables submit button and shows 'Confirmando...' while loading", async () => {
    let resolveBooking!: (v: unknown) => void;
    vi.stubGlobal(
      "fetch",
      vi.fn().mockReturnValue(
        new Promise((resolve) => {
          resolveBooking = resolve;
        })
      )
    );
    const user = userEvent.setup();
    renderModal();

    await fillAndSubmit(user);

    const btn = screen.getByRole("button", { name: /confirmando/i });
    expect(btn).toBeDisabled();

    resolveBooking({ ok: true, json: () => Promise.resolve({ success: true, bookingId: "x" }) });
    await waitFor(() => expect(screen.getByTestId("success-message")).toBeInTheDocument());
  });

  it("displays the booking ID in the success screen", async () => {
    mockBookingFetch(true, { success: true, bookingId: "PILATESO-2026" });
    const user = userEvent.setup();
    renderModal();

    await fillAndSubmit(user);

    await waitFor(() => expect(screen.getByText("PILATESO-2026")).toBeInTheDocument());
  });
});

// ---------------------------------------------------------------------------
// Edge case: invalid form submission
// ---------------------------------------------------------------------------

describe("ReservationModal — form validation", () => {
  it("shows required errors when submitting empty form", async () => {
    const user = userEvent.setup();
    renderModal();

    await user.click(screen.getByRole("button", { name: /confirmar reserva/i }));

    expect(screen.getByText(/el nombre es obligatorio/i)).toBeInTheDocument();
    expect(screen.getByText(/el email es obligatorio/i)).toBeInTheDocument();
  });

  it("shows format error when email is invalid", async () => {
    const user = userEvent.setup();
    renderModal();

    await user.type(screen.getByLabelText(/nombre completo/i), "Ana García");
    await user.type(screen.getByLabelText(/email/i), "not-valid");
    await user.click(screen.getByRole("button", { name: /confirmar reserva/i }));

    expect(screen.getByText(/formato válido/i)).toBeInTheDocument();
  });

  it("does not call fetch when form is invalid", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const user = userEvent.setup();
    renderModal();

    await user.click(screen.getByRole("button", { name: /confirmar reserva/i }));

    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("marks invalid name field with aria-invalid", async () => {
    const user = userEvent.setup();
    renderModal();

    await user.click(screen.getByRole("button", { name: /confirmar reserva/i }));

    expect(screen.getByLabelText(/nombre completo/i)).toHaveAttribute("aria-invalid", "true");
  });

  it("marks invalid email field with aria-invalid", async () => {
    const user = userEvent.setup();
    renderModal();

    await user.type(screen.getByLabelText(/nombre completo/i), "Ana");
    await user.type(screen.getByLabelText(/email/i), "bad-email");
    await user.click(screen.getByRole("button", { name: /confirmar reserva/i }));

    expect(screen.getByLabelText(/email/i)).toHaveAttribute("aria-invalid", "true");
  });

  it("clears field error when user starts correcting the input", async () => {
    const user = userEvent.setup();
    renderModal();

    await user.click(screen.getByRole("button", { name: /confirmar reserva/i }));
    expect(screen.getByText(/el nombre es obligatorio/i)).toBeInTheDocument();

    await user.type(screen.getByLabelText(/nombre completo/i), "A");
    expect(screen.queryByText(/el nombre es obligatorio/i)).not.toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// Edge case: API error response
// ---------------------------------------------------------------------------

describe("ReservationModal — API error", () => {
  it("shows error state when POST returns non-ok status", async () => {
    mockBookingFetch(false);
    const user = userEvent.setup();
    renderModal();

    await fillAndSubmit(user);

    await waitFor(() =>
      expect(screen.getByTestId("submit-error")).toBeInTheDocument()
    );
  });

  it("shows server error message in submit-error element", async () => {
    mockBookingFetch(false, { error: "Horario ya no disponible." });
    const user = userEvent.setup();
    renderModal();

    await fillAndSubmit(user);

    await waitFor(() =>
      expect(screen.getByTestId("submit-error")).toHaveTextContent("Horario ya no disponible.")
    );
  });

  it("shows network error message when fetch throws", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("Network error")));
    const user = userEvent.setup();
    renderModal();

    await fillAndSubmit(user);

    await waitFor(() =>
      expect(screen.getByTestId("submit-error")).toBeInTheDocument()
    );
    expect(screen.getByTestId("submit-error")).toHaveTextContent(/problema de conexión/i);
  });

  it("'Intentar de nuevo' button restores the form after error", async () => {
    mockBookingFetch(false);
    const user = userEvent.setup();
    renderModal();

    await fillAndSubmit(user);
    await waitFor(() => expect(screen.getByTestId("submit-error")).toBeInTheDocument());

    await user.click(screen.getByRole("button", { name: /intentar de nuevo/i }));

    expect(screen.getByLabelText(/nombre completo/i)).toBeInTheDocument();
    expect(screen.queryByTestId("submit-error")).not.toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// Close behavior
// ---------------------------------------------------------------------------

describe("ReservationModal — close behavior", () => {
  it("calls onClose when Cancel button is clicked", async () => {
    const { onClose } = renderModal();
    const user = userEvent.setup();

    await user.click(screen.getByRole("button", { name: /cancelar/i }));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("calls onClose when close (X) button is clicked", async () => {
    const { onClose } = renderModal();
    const user = userEvent.setup();

    await user.click(screen.getByRole("button", { name: /cerrar/i }));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("calls onClose when 'Listo, ¡nos vemos!' is clicked after success", async () => {
    mockBookingFetch(true);
    const { onClose } = renderModal();
    const user = userEvent.setup();

    await fillAndSubmit(user);
    await waitFor(() => expect(screen.getByTestId("success-message")).toBeInTheDocument());

    await user.click(screen.getByRole("button", { name: /listo/i }));
    expect(onClose).toHaveBeenCalledOnce();
  });
});
