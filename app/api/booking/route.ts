import { NextRequest, NextResponse } from "next/server";
import type { BookingRequest, BookingResponse } from "@/lib/types";

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest): Promise<NextResponse<BookingResponse>> {
  let body: BookingRequest;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { data: null, error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const { time, date, name, email } = body;

  if (!date || !name || !email) {
    return NextResponse.json(
      { data: null, error: "Missing required fields: date, name, email" },
      { status: 400 }
    );
  }

  if (!DATE_REGEX.test(date) || isNaN(new Date(date + "T12:00:00").getTime())) {
    return NextResponse.json(
      { data: null, error: "Invalid date format. Expected YYYY-MM-DD" },
      { status: 422 }
    );
  }

  if (typeof name !== "string" || name.trim().length < 2) {
    return NextResponse.json(
      { data: null, error: "name must be at least 2 characters" },
      { status: 422 }
    );
  }

  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json(
      { data: null, error: "Invalid email format" },
      { status: 422 }
    );
  }

  const bookingId = `booking-${date}-${time ?? "notime"}-${Date.now()}`;
  return NextResponse.json({ data: { success: true, bookingId } }, { status: 201 });
}
