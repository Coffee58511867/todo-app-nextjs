import connectMongoDB from "@/lib/mongodb";
import topic from "@/models/topic";
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
  await connectMongoDB();
  const topics = await topic.find();
  try {
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
