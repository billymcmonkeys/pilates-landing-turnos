"use client";

import { useState, useEffect } from "react";
import ReservationModal from "./ReservationModal";

interface TimeSlot {
  time: string;
  totalBeds: number;
  availableBeds: number;
}

export default function BookingSection() {
  const today = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const [slots, setSlots] = useState<TimeSlot[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [activeSlot, setActiveSlot] = useState<TimeSlot | null>(null);

  const selectedDay = selectedDate ? new Date(selectedDate + "T12:00:00") : null;
  const isWeekend = selectedDay
    ? selectedDay.getDay() === 0 || selectedDay.getDay() === 6
    : false;

  useEffect(() => {
    if (!selectedDate || isWeekend) return;
    setLoading(true);
    setFetchError(null);
    setSlots(null);

    fetch(`/api/availability?date=${selectedDate}`)
      .then((res) => {
        if (!res.ok) throw new Error("fetch failed");
        return res.json();
      })
      .then((json: { data: { date: string; slots: TimeSlot[] } | null; error?: string }) => {
        if (json.error || !json.data) throw new Error(json.error ?? "no data");
        setSlots(json.data.slots);
      })
      .catch(() =>
        setFetchError(
          "No pudimos cargar la disponibilidad. Revisá tu conexión y volvé a intentarlo."
        )
      )
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate]);

  function getBedLabel(slot: TimeSlot): string {
    if (slot.availableBeds === 0) return "Sin lugares";
    if (slot.availableBeds === 1) return "1 lugar";
    return `${slot.availableBeds} lugares`;
  }

  function getSlotColor(slot: TimeSlot): string {
    const ratio = slot.availableBeds / slot.totalBeds;
    if (slot.availableBeds === 0)
      return "bg-stone-100 border-stone-200 text-stone-400 cursor-not-allowed";
    if (ratio <= 0.25) return "bg-red-50 border-red-200 text-red-700 hover:bg-red-100";
    if (ratio <= 0.5) return "bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100";
    return "bg-sage-50 border-sage-200 text-sage-700 hover:bg-sage-100";
  }

  function getBedBadgeColor(slot: TimeSlot): string {
    if (slot.availableBeds === 0) return "bg-stone-200 text-stone-500";
    const ratio = slot.availableBeds / slot.totalBeds;
    if (ratio <= 0.25) return "bg-red-100 text-red-600";
    if (ratio <= 0.5) return "bg-amber-100 text-amber-600";
    return "bg-sage-100 text-sage-600";
  }

  return (
    <section id="turnos" className="py-24 bg-cream">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-sage-500 font-semibold text-sm tracking-widest uppercase">
            Turnos
          </span>
          <h2 className="section-title mt-3 mb-4">Reservá tu lugar</h2>
          <p className="section-subtitle max-w-xl mx-auto">
            Clases de lunes a viernes. Máximo 6 camillas por turno. Elegí la
            fecha y el horario que mejor se adapte a tu rutina.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-sage-100 p-6 mb-8">
          <label
            htmlFor="booking-date"
            className="block text-sm font-semibold text-stone-700 mb-3"
          >
            Seleccioná una fecha
          </label>
          <input
            id="booking-date"
            type="date"
            value={selectedDate}
            min={today}
            onChange={(e) => setSelectedDate(e.target.value)}
            aria-label="Fecha de reserva"
            className="w-full sm:w-auto px-4 py-3 border border-stone-200 rounded-xl text-stone-700 focus:outline-none focus:ring-2 focus:ring-sage-400 focus:border-transparent font-medium cursor-pointer"
          />
          {selectedDay && (
            <p className="mt-2 text-sm text-stone-400 capitalize">
              {selectedDay.toLocaleDateString("es-AR", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          )}
        </div>

        {isWeekend ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-sage-100 shadow-sm">
            <p className="font-serif text-xl font-bold text-stone-700 mb-2">
              Descansamos los fines de semana
            </p>
            <p className="text-stone-500 text-sm">
              Las clases son de lunes a viernes. Elegí otro día.
            </p>
          </div>
        ) : loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-28 bg-stone-100 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : fetchError ? (
          <p role="alert" className="text-center text-red-600 py-12 font-medium">
            {fetchError}
          </p>
        ) : slots !== null && slots.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-sage-100 shadow-sm">
            <p className="font-serif text-xl font-bold text-stone-700 mb-2">
              Sin turnos disponibles
            </p>
            <p className="text-stone-500 text-sm">
              No hay clases programadas para esta fecha. Probá con otro día.
            </p>
          </div>
        ) : slots !== null ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {slots.map((slot) => {
              const available = slot.availableBeds > 0;
              return (
                <button
                  key={slot.time}
                  onClick={() => available && setActiveSlot(slot)}
                  disabled={!available}
                  aria-label={
                    available
                      ? `Reservar turno de las ${slot.time} hs — ${getBedLabel(slot)}`
                      : `Turno de las ${slot.time} hs completo`
                  }
                  className={`group relative flex flex-col items-start p-5 rounded-2xl border-2 transition-all duration-200 text-left ${getSlotColor(slot)}`}
                >
                  <span className="text-2xl font-bold font-serif mb-1">
                    {slot.time}
                    <span className="text-sm font-sans font-normal ml-1 opacity-70">hs</span>
                  </span>
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded-full mt-auto ${getBedBadgeColor(slot)}`}
                  >
                    {getBedLabel(slot)}
                  </span>
                  {available && (
                    <span className="absolute top-3 right-3 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                      Reservar &rarr;
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ) : null}
      </div>

      {activeSlot && (
        <ReservationModal
          isOpen
          selectedDate={selectedDate}
          selectedTime={activeSlot.time}
          availableBeds={activeSlot.availableBeds}
          onClose={() => setActiveSlot(null)}
        />
      )}
    </section>
  );
}
