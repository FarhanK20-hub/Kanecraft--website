import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import SampleRequest from "@/models/SampleRequest";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { name, email, company } = body;

    if (!name || !email || !company) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newRequest = await SampleRequest.create({
      name,
      email,
      company,
    });

    return NextResponse.json(newRequest, { status: 201 });
  } catch (error: any) {
    console.error("Error creating sample request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectToDatabase();
    const requests = await SampleRequest.find({}).sort({ createdAt: -1 });
    return NextResponse.json(requests, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching sample requests:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
