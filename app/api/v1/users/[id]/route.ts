import connectMongoDB from "@/lib/mongodb";
import book from "@/models/booking";
import { NextResponse } from "next/server";

export async function GET({ params }: { params: { id: string } }) {
  const { id } = params;
  await connectMongoDB();

  try {
    const userBookings = await book.find({ customerId: id });

    return NextResponse.json({ userBookings }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to fetch user bookings" },
      { status: 500 }
    );
  }
}
