import connectMongoDB from "@/lib/mongodb";
import Book from "@/models/booking";
import book from "@/models/booking";
import User from "@/models/user";
import { NextResponse } from "next/server";


export async function POST(request: Request, { params }:  { params: { id: string } }) {

    const bookStatus = "PENDING";
    const LStatus = "NOT COLLECTED";
  
    const userId = params.id;
  
    const buyer = await User.findById(userId);
    const {
      laundryStatus,
      bookingStatus,
      customerId,
      pickupDate,
      pickupTime,
      location,
      deliveryDate,
      fullName,
      deliveryTime,
      phoneNumber,
      laundryType,
      LaundryContainer,
      quantity,
    } = await request.json();
    await connectMongoDB();
  
    if (!buyer) {
      return NextResponse.json(
        { error: "Customer not found" },
        {
          status: 409,
        }
      );
    }
  
  try {
    await Book.create({
      customerId : buyer._id,
      pickupDate,
      pickupTime,
      fullName,
      location,
      deliveryDate,
      deliveryTime,
      phoneNumber,
      laundryType,
      LaundryContainer,
      quantity,
      laundryStatus : LStatus,
      bookingStatus: bookStatus,
    });
  
      return NextResponse.json(
        { message: "Booking Created" },
        {
          status: 201,
        }
      );
    } catch (error) {
      console.error("Error booking :", error);
      return NextResponse.json(
        {
          success: false,
          message: "An error occurred while booking",
        },
        {
          status: 500,
        }
      );
    }
  }

export async function PUT(request: Request,{ params }:  { params: { id: string } }){
    const { id } = params;
    const {newTitle : title, newDescription: description} = await request.json();
    await connectMongoDB();
    await book.findByIdAndUpdate(id, {title, description});
    return NextResponse.json({message : "Topic Update"}, {status: 200})

}
export async function GET(request: Request,{ params }:  { params: { id: string } }){
    const { id } = params;
    await connectMongoDB();
    const Bookings = await book.find({_id : id});
    return NextResponse.json({Bookings}, {status: 200})
}
