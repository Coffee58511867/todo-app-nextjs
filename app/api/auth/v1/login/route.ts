import connectMongoDB from "@/lib/mongodb";
import User from "@/models/user";
import { sign } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { compare } from 'bcryptjs'

const MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export async function POST(request: Request) {
  const body = await request.json();

  const { emailAddress, password } = body;
  await connectMongoDB();

  const userExists = await User.findOne({ emailAddress });

  if (!userExists) {
    return NextResponse.json(
      { error: "User does not exist, please register" },
      {
        status: 409,
      }
    );
  }

  const isPasswordValid = await compare(password, userExists.password);

  if (isPasswordValid) {
    const secret = process.env.JWT_SECRET || " ";
    const token = sign(
      {
        emailAddress: userExists.emailAddress,
      },
      secret,
      {
        expiresIn: MAX_AGE,
      }
    );

    return NextResponse.json(
      { success: true, message: "User logged in successfully", token },
      {
        status: 200,
      }
    );
  } else {
    return NextResponse.json(
      { error: "Invalid credentials" },
      {
        status: 401,
      }
    );
  }
}
