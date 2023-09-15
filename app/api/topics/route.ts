import connectMongoDB from "@/lib/mongodb";
import topic from "@/models/topic";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: Request) {
  const { title, description } = await request.json();
  await connectMongoDB();
  await topic.create({ title, description });
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
    const topics = await topic.find();

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
  await topic.findByIdAndDelete(id);
  return NextResponse.json({ message: "Topic Deleted" }, { status: 200 });
}
