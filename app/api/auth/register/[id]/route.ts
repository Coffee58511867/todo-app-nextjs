import connectMongoDB from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function PUT(request: Request,{ params }:  { params: { id: string } }){
    const { id } = params;
    const {newFullName : fullName} = await request.json();
    await connectMongoDB();
    await User.findByIdAndUpdate(id, {fullName});
    return NextResponse.json({message : "User Profile Update"}, {status: 200})

}
export async function GET(request: Request,{ params }:  { params: { id: string } }){
    const { id } = params;
    await connectMongoDB();
    const user = await User.findOne({_id : id});
    return NextResponse.json({user}, {status: 200})
}