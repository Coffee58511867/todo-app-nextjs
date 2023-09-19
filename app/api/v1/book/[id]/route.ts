import connectMongoDB from "@/lib/mongodb";
import book from "@/models/booking";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { newName: fullName, newPhone: phoneNumber, newLocation : location } = await request.json();
  await connectMongoDB();
  await book.findByIdAndUpdate(id, { fullName, phoneNumber, location });
  return NextResponse.json({ message: "Booking Update" }, { status: 200 });
}

export async function GET(request: Request,{ params }:  { params: { id: string } }){
    const { id } = params;
    await connectMongoDB();
    const Bookings = await book.findById({_id : id});
    return NextResponse.json({Bookings}, {status: 200})
}
export async function DELETE(request: Request, { params }:  { params: { id: string } } ) {
  const { id } = params;
  await connectMongoDB();
  await book.findByIdAndDelete(id);
  return NextResponse.json({ message: "Booking Deleted" }, { status: 200 });
}


