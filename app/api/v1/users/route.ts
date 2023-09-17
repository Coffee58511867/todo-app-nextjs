import connectMongoDB from "@/lib/mongodb";
import Book from "@/models/booking";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";



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


