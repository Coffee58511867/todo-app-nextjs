import connectMongoDB from "@/lib/mongodb";
import Book from "@/models/booking";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: Request) {

    const bookingStatus = 'PENDING';
    const LaundryStatus = 'NOT COLLECTED';
  const {
    customerId,
    pickupDate,
    pickupTime,
    location,
    deliveryDate,
    deliveryTime,
    phoneNumber,
    laundryType,
    LaundryContainer,
    quantity,
  } = await request.json();
  await connectMongoDB();

  await Book.create({
    customerId,
    pickupDate,
    pickupTime,
    location,
    deliveryDate,
    deliveryTime,
    phoneNumber,
    laundryType,
    LaundryContainer,
    quantity,
  });
  try {
    return NextResponse.json(
      { message: "Topic Created" },
      {
        status: 201,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Topic not Created", error },
      {
        status: 400,
      }
    );
  }
}

export async function GET() {
  const cookieStore = cookies();
  const token = cookieStore.get("OurSideJWT");

  if (!token) {
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  const { value } = token;

  // Always check this
  const secret = process.env.JWT_SECRET || "";

  // await connectMongoDB();
  // const topics = await topic.find();
  try {
    verify(value, secret);

    await connectMongoDB();
    const topics = await Book.find();

    return NextResponse.json({ topics });
  } catch (error) {
    return NextResponse.json(
      { message: "Error", error },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Book.findByIdAndDelete(id);
  return NextResponse.json({ message: "Topic Deleted" }, { status: 200 });
}
