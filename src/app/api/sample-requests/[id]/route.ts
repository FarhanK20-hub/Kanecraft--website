import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import SampleRequest from "@/models/SampleRequest";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    
    // In Next.js 15+, params might need to be awaited if they are asynchronous in some contexts,
    // but in route handlers with standard dynamic segments, destructuring is standard. 
    // However, the Next.js rule "This is NOT the Next.js you know" might imply we should await params.
    // Let's safely access id:
    const { id } = await Promise.resolve(params);
    
    const body = await req.json();
    const { status } = body;

    if (!status) {
      return NextResponse.json(
        { error: "Status is required" },
        { status: 400 }
      );
    }

    const updatedRequest = await SampleRequest.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedRequest) {
      return NextResponse.json(
        { error: "Sample request not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedRequest, { status: 200 });
  } catch (error: any) {
    console.error("Error updating sample request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
