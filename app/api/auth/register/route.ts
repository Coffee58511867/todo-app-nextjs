import connectMongoDB from "@/lib/mongodb";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcryptjs"

export async function POST(request: Request) {
  const body = await request.json();

  const { emailAddress, fullName, password } = body;
  await connectMongoDB();

  const userExists = await User.findOne({ emailAddress });

  if (userExists) {
    return NextResponse.json(
      { error: "User Already exists" },
      {
        status: 409,
      }
    );
  } else {
    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password should be 6 characters long" },
        {
          status: 409,
        }
      );
    }
  }

  const hashedPassword = await hash(password, 12)

  await User.create({
    fullName,
    emailAddress,
    password : hashedPassword,
  });

  try {
    return NextResponse.json(
      { success: true, 
        message: "User registered",
    },
      {
        status: 201,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "User not Created", error },
      {
        status: 400,
      }
    );
  }
}

export async function GET() {
  await connectMongoDB();
  const userList = await User.find();
  try {
    return NextResponse.json({ userList });
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
  await User.findByIdAndDelete(id);
  return NextResponse.json({ message: "Topic Deleted" }, { status: 200 });
}
