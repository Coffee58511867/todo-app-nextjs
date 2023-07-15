import connectMongoDB from "@/lib/mongodb";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcryptjs"

export async function POST(request: Request) {
  const body = await request.json();

  const { emailAddress, fullName, password } = body;
  await connectMongoDB();

  if (password.length < 6) {
    return NextResponse.json(
      { error: "Password should be 6 characters long" },
      {
        status: 409,
      }
    );
  }

  const userExists = await User.findOne({ emailAddress });

  if (userExists) {
    return NextResponse.json(
      { error: "User Already exists" },
      {
        status: 409,
      }
    );
  }

  const hashedPassword = await hash(password, 12);
  
  try {
    await User.create({
      fullName,
      emailAddress,
      password: hashedPassword,
    });

    return NextResponse.json(
      { success: true, message: "User registered" },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { success: false, message: "An error occurred while registering the user" },
      {
        status: 500,
      }
    );
  }
}

export async function GET() {
  await connectMongoDB();

  try {
    const userList = await User.find();
    return NextResponse.json({ userList });
  } catch (error) {
    console.error("Error fetching user list:", error);
    return NextResponse.json(
      { message: "Error fetching user list", error },
      {
        status: 400,
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
