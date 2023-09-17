// api/v1/book/[userId].ts
import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "@/lib/mongodb";
import Booking from "@/models/booking";

export async function GET(request: Request, { params }: { params: { userId: string } })  {
  const { userId } = params;
  await connectMongoDB();

  try {
    // Find all bookings for the specified user ID
    const bookings = await Booking.find({ customerId: userId });

    return NextResponse.json({ bookings }, { status: 200 });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while fetching bookings",
      },
      {
        status: 500,
      }
    );
  }
}
