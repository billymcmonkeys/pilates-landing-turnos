import { NextRequest, NextResponse } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";
import type { AvailabilityResponse, TimeSlot } from "@/lib/types";

interface RawDay {
  date: string;
  slots: TimeSlot[];
}

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

function loadDays(): RawDay[] {
  return JSON.parse(
    readFileSync(join(process.cwd(), "mock-data", "slots.json"), "utf-8")
  ) as RawDay[];
}

export async function GET(
  request: NextRequest
): Promise<NextResponse<AvailabilityResponse>> {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");

  if (!date) {
    return NextResponse.json(
      { data: null, error: "Missing required query parameter: date" },
      { status: 400 }
    );
  }

  if (!DATE_REGEX.test(date) || isNaN(new Date(date + "T12:00:00").getTime())) {
    return NextResponse.json(
      { data: null, error: "Invalid date format. Expected YYYY-MM-DD" },
      { status: 400 }
    );
  }

  const dayOfWeek = new Date(date + "T12:00:00").getDay();
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    return NextResponse.json({ data: { date, slots: [] } });
  }

  let days: RawDay[];
  try {
    days = loadDays();
  } catch {
    return NextResponse.json(
      { data: null, error: "Internal server error: could not load availability data" },
      { status: 500 }
    );
  }

  const day = days.find((d) => d.date === date);
  const slots: TimeSlot[] = day?.slots ?? [];

  return NextResponse.json({ data: { date, slots } });
}
