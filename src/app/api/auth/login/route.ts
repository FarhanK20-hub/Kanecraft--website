import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import AdminConfig from '@/models/AdminConfig';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    
    await connectToDatabase();
    let correctPassword = process.env.ADMIN_PASSWORD;
    
    // Check if a password is set in the database
    const config = await AdminConfig.findOne();
    if (config && config.adminPassword) {
      correctPassword = config.adminPassword;
    }

    if (!correctPassword) {
      console.error("No admin password is set in DB or .env.local");
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    if (password === correctPassword) {
      const response = NextResponse.json({ success: true });
      
      // Set HTTP-only cookie
      response.cookies.set({
        name: 'admin-token',
        value: 'authenticated', // In a real app, this should be a JWT or signed session ID
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 1 week
      });
      
      return response;
    } else {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
