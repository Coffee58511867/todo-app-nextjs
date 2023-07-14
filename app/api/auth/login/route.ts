import connectMongoDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import {sign} from "jsonwebtoken";
import { serialize } from "cookie";

const MAX_AGE = 60 * 60 * 24 * 30 ; // DAYS

export async function POST(request: Request) {
  const body = await request.json();

  const { username, password } = body;
  await connectMongoDB();

  if(username !== 'admin' || password !== 'admin' ){
    return NextResponse.json({
        message : 'Unauthorized'
    },
    {
        status: 401
    })
  }

  const secret = process.env.JWT_SECRET || ' ';
  const token = sign(
    {
        username,
    },
    secret, {
        expiresIn : MAX_AGE
    }
  );

  const seralized = serialize("OutsideJWT" , token, {
     httpOnly: true,
     secure: process.env.NODE_ENV === "production",
     sameSite: 'strict',
     path: '/'
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
