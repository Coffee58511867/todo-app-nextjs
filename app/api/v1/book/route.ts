import connectMongoDB from "@/lib/mongodb";
import Book from "@/models/booking";
import User from "@/models/user";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: Request, { params }:  { params: { id: string } }) {

  const bookStatus = "PENDING";
  const LStatus = "NOT COLLECTED";

  const userId = params.id;

  const buyer = await User.findById(userId);
  const {
    laundryStatus,
    bookingStatus,
    customerId,
    pickupDate,
    pickupTime,
    location,
    deliveryDate,
    fullName,
    deliveryTime,
    phoneNumber,
    laundryType,
    LaundryContainer,
    quantity,
  } = await request.json();
  await connectMongoDB();

  if (!buyer) {
    return NextResponse.json(
      { error: "Customer not found" },
      {
        status: 409,
      }
    );
  }

try {
  await Book.create({
    customerId : buyer._id,
    pickupDate,
    pickupTime,
    fullName,
    location,
    deliveryDate,
    deliveryTime,
    phoneNumber,
    laundryType,
    LaundryContainer,
    quantity,
    laundryStatus : LStatus,
    bookingStatus: bookStatus,
  });

    return NextResponse.json(
      { message: "Booking Created" },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Error booking :", error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while booking",
      },
      {
        status: 500,
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
    const bookings = await Book.find();

    return NextResponse.json({ bookings });
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
