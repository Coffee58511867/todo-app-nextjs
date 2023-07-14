import connectMongoDB from "@/lib/mongodb";
import topic from "@/models/topic";
import { NextResponse } from "next/server";

export async function PUT(request: Request,{ params }:  { params: { id: string } }){
    const { id } = params;
    const {newTitle : title, newDescription: description} = await request.json();
    await connectMongoDB();
    await topic.findByIdAndUpdate(id, {title, description});
    return NextResponse.json({message : "Topic Update"}, {status: 200})

}
export async function GET(request: Request,{ params }:  { params: { id: string } }){
    const { id } = params;
    await connectMongoDB();
    const Topic = await topic.findOne({_id : id});
    return NextResponse.json({Topic}, {status: 200})
}