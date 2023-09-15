import connectMongoDB from "@/lib/mongodb";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const body = await request.json();

  const { emailAddress, fullName, phoneNumber, is_admin, password } = body;
  await connectMongoDB();

  if (password.length < 6) {
    return NextResponse.json(
      { error: "Password should be 6 characters long" },
      {
        status: 409,
      }
    );
  }
  if (!/^(\d{8})$/.test(phoneNumber)) {
    return NextResponse.json(
      { error: "Invalid phone number, it should be 8 numeric characters" },
      {
        status: 409,
      }
    );
  }

  const userExists = await User.findOne({ emailAddress });
  const userPhoneNumberExists = await User.findOne({ phoneNumber });

  if (userExists) {
    return NextResponse.json(
      { error: "User Already exists" },
      {
        status: 409,
      }
    );
  }
  // if (userPhoneNumberExists) {
  //   return NextResponse.json(
  //     { error: "PHONE NUMBER IS ASSCOCIATED WITH SOMEONE ELSE" },
  //     {
  //       status: 409,
  //     }
  //   );
  // }

  const hashedPassword = await hash(password, 12);

  try {
    await User.create({
      fullName,
      emailAddress,
      phoneNumber,
      is_admin,
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
      {
        success: false,
        message: "An error occurred while registering the user",
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

  try {
    verify(value, secret);

    await connectMongoDB();
    const userList = await User.find();

    return NextResponse.json({ userList });
  } catch (e) {
    return NextResponse.json(
      {
        message: "Something went wrong",
      },
      {
        status: 400,
      }
    );
  }
}

// export async function DELETE(request: NextRequest) {
//   const id = request.nextUrl.searchParams.get("id");
//   await connectMongoDB();
//   await User.findByIdAndDelete(id);
//   return NextResponse.json({ message: "Topic Deleted" }, { status: 200 });
// }

export async function DELETE(request: NextRequest) {
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

  try {
    verify(value, secret);

    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await User.findByIdAndDelete(id);
    return NextResponse.json({ message: "User Deleted" }, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      {
        message: "Something went wrong",
      },
      {
        status: 400,
      }
    );
  }
}
