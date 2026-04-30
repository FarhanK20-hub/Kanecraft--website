import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import AdminConfig from "@/models/AdminConfig";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    
    const body = await req.json();
    const { currentPassword, newPassword } = body;

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: "Both current and new passwords are required" },
        { status: 400 }
      );
    }

    // Verify current password
    let validPassword = process.env.ADMIN_PASSWORD;
    const existingConfig = await AdminConfig.findOne();
    
    if (existingConfig && existingConfig.adminPassword) {
      validPassword = existingConfig.adminPassword;
    }

    if (currentPassword !== validPassword) {
      return NextResponse.json(
        { error: "Incorrect current password" },
        { status: 401 }
      );
    }

    // Update password in DB
    if (existingConfig) {
      existingConfig.adminPassword = newPassword;
      await existingConfig.save();
    } else {
      await AdminConfig.create({ adminPassword: newPassword });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error("Error updating admin config:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
