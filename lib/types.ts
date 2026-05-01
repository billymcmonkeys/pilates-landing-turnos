export interface TimeSlot {
  time: string;
  totalBeds: number;
  availableBeds: number;
}

export interface DaySlots {
  date: string;
  slots: TimeSlot[];
}

export interface AvailabilityResponse {
  data: { date: string; slots: TimeSlot[] } | null;
  error?: string;
}

export interface BookingRequest {
  date: string;
  time: string;
  name: string;
  email: string;
}

export interface BookingResponse {
  data: { success: true; bookingId: string } | null;
  error?: string;
}
