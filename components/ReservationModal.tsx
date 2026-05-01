"use client";

import { useState } from "react";

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: string;
  selectedTime: string;
  availableBeds: number;
}

interface FormState {
  name: string;
  email: string;
}

type SubmitStatus = "idle" | "loading" | "success" | "error";

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + "T12:00:00");
  return d.toLocaleDateString("es-AR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function ReservationModal({
  isOpen,
  onClose,
  selectedDate,
  selectedTime,
  availableBeds,
}: ReservationModalProps) {
  const [form, setForm] = useState<FormState>({ name: "", email: "" });
  const [fieldErrors, setFieldErrors] = useState<Partial<FormState>>({});
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [serverError, setServerError] = useState<string>("");
  const [bookingId, setBookingId] = useState<string>("");

  if (!isOpen) return null;

  function validate(): boolean {
    const next: Partial<FormState> = {};
    if (!form.name.trim()) next.name = "El nombre es obligatorio.";
    if (!form.email.trim()) {
      next.email = "El email es obligatorio.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "El email no tiene un formato válido.";
    }
    setFieldErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setSubmitStatus("loading");
    setServerError("");

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bedId: `${selectedDate}-${selectedTime}`,
          date: selectedDate,
          time: selectedTime,
          name: form.name.trim(),
          email: form.email.trim(),
        }),
      });
      const data = (await res.json()) as {
        success?: boolean;
        bookingId?: string;
        error?: string;
      };
      if (!res.ok) {
        setServerError(
          data.error ?? "No pudimos confirmar tu reserva. Intentá de nuevo."
        );
        setSubmitStatus("error");
        return;
      }
      setBookingId(data.bookingId ?? "");
      setSubmitStatus("success");
    } catch {
      setServerError(
        "Hubo un problema de conexión. Revisá tu internet y volvé a intentarlo."
      );
      setSubmitStatus("error");
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={submitStatus !== "loading" ? onClose : undefined}
      />

      {/* Panel */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-sage-500 px-6 py-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2
                id="modal-title"
                className="font-serif text-xl font-bold text-white"
              >
                {submitStatus === "success"
                  ? "¡Reserva confirmada!"
                  : "Confirmá tu reserva"}
              </h2>
              {submitStatus !== "success" && (
                <p className="text-sage-100 text-sm mt-1 capitalize">
                  {formatDate(selectedDate)} · {selectedTime} hs
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={submitStatus !== "loading" ? onClose : undefined}
              disabled={submitStatus === "loading"}
              aria-label="Cerrar"
              className="text-white/70 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10 flex-shrink-0 disabled:opacity-40"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-6">
          {/* SUCCESS */}
          {submitStatus === "success" && (
            <div
              data-testid="success-message"
              role="status"
              className="text-center py-2"
            >
              <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-5">
                <svg
                  className="w-8 h-8 text-sage-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <p className="text-stone-600 mb-1 capitalize font-medium">
                {formatDate(selectedDate)}
              </p>
              <p className="text-stone-500 mb-2">
                a las{" "}
                <span className="font-semibold text-stone-700">
                  {selectedTime} hs
                </span>
              </p>
              <p className="text-stone-400 text-sm mb-5">
                Confirmación enviada a{" "}
                <span className="font-medium text-stone-600">{form.email}</span>
              </p>
              {bookingId && (
                <div className="bg-sage-50 border border-sage-200 rounded-xl px-4 py-3 mb-6 text-left">
                  <p className="text-xs text-sage-500 font-semibold uppercase tracking-wide">
                    Código de reserva
                  </p>
                  <p className="font-mono font-bold text-sage-700 mt-0.5 text-lg">
                    {bookingId}
                  </p>
                </div>
              )}
              <button
                type="button"
                onClick={onClose}
                className="btn-primary w-full justify-center"
              >
                Listo, ¡nos vemos!
              </button>
            </div>
          )}

          {/* ERROR */}
          {submitStatus === "error" && (
            <div className="text-center py-2">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-5">
                <svg
                  className="w-8 h-8 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <h3 className="font-serif text-xl font-bold text-stone-800 mb-2">
                Algo salió mal
              </h3>
              <p
                role="alert"
                data-testid="submit-error"
                className="text-stone-500 text-sm mb-6"
              >
                {serverError}
              </p>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setSubmitStatus("idle")}
                  className="flex-1 btn-primary justify-center"
                >
                  Intentar de nuevo
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-6 py-3 border border-stone-200 text-stone-600 font-semibold rounded-full hover:bg-stone-50 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}

          {/* FORM (idle + loading) */}
          {(submitStatus === "idle" || submitStatus === "loading") && (
            <form onSubmit={handleSubmit} noValidate>
              <div className="flex items-center gap-3 mb-5 p-3 bg-sage-50 rounded-xl border border-sage-100">
                <span className="text-2xl" aria-hidden="true">🧘</span>
                <div className="text-sm">
                  <p className="font-semibold text-stone-700">
                    {availableBeds}{" "}
                    {availableBeds === 1
                      ? "lugar disponible"
                      : "lugares disponibles"}
                  </p>
                  <p className="text-stone-400">Clase de 50 minutos</p>
                </div>
              </div>

              <div className="space-y-4 mb-5">
                <div>
                  <label
                    htmlFor="res-name"
                    className="block text-sm font-semibold text-stone-700 mb-1.5"
                  >
                    Nombre completo
                  </label>
                  <input
                    id="res-name"
                    type="text"
                    value={form.name}
                    onChange={(e) => {
                      setForm((f) => ({ ...f, name: e.target.value }));
                      if (fieldErrors.name)
                        setFieldErrors((fe) => ({ ...fe, name: undefined }));
                    }}
                    placeholder="Ej: María González"
                    aria-describedby={
                      fieldErrors.name ? "res-name-error" : undefined
                    }
                    aria-invalid={!!fieldErrors.name}
                    disabled={submitStatus === "loading"}
                    autoComplete="name"
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-sage-400 focus:border-transparent text-stone-800 placeholder:text-stone-300 disabled:opacity-60 transition-colors ${
                      fieldErrors.name
                        ? "border-red-300 bg-red-50"
                        : "border-stone-200"
                    }`}
                  />
                  {fieldErrors.name && (
                    <span
                      id="res-name-error"
                      role="alert"
                      className="mt-1.5 text-xs text-red-600 block"
                    >
                      {fieldErrors.name}
                    </span>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="res-email"
                    className="block text-sm font-semibold text-stone-700 mb-1.5"
                  >
                    Email
                  </label>
                  <input
                    id="res-email"
                    type="email"
                    value={form.email}
                    onChange={(e) => {
                      setForm((f) => ({ ...f, email: e.target.value }));
                      if (fieldErrors.email)
                        setFieldErrors((fe) => ({ ...fe, email: undefined }));
                    }}
                    placeholder="Ej: maria@email.com"
                    aria-describedby={
                      fieldErrors.email ? "res-email-error" : undefined
                    }
                    aria-invalid={!!fieldErrors.email}
                    disabled={submitStatus === "loading"}
                    autoComplete="email"
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-sage-400 focus:border-transparent text-stone-800 placeholder:text-stone-300 disabled:opacity-60 transition-colors ${
                      fieldErrors.email
                        ? "border-red-300 bg-red-50"
                        : "border-stone-200"
                    }`}
                  />
                  {fieldErrors.email && (
                    <span
                      id="res-email-error"
                      role="alert"
                      className="mt-1.5 text-xs text-red-600 block"
                    >
                      {fieldErrors.email}
                    </span>
                  )}
                </div>
              </div>

              <p className="text-xs text-stone-400 mb-5">
                Te enviamos la confirmación a tu email.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  disabled={submitStatus === "loading"}
                  className="flex-1 btn-primary justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitStatus === "loading" ? (
                    <span className="flex items-center gap-2">
                      <svg
                        className="animate-spin w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8z"
                        />
                      </svg>
                      Confirmando...
                    </span>
                  ) : (
                    "Confirmar reserva"
                  )}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  disabled={submitStatus === "loading"}
                  className="flex-1 px-6 py-3 border border-stone-200 text-stone-600 font-semibold rounded-full hover:bg-stone-50 transition-colors disabled:opacity-60"
                >
                  Cancelar
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
