import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'ukm-madani-secret-key';

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('admin-token')?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: 'No token provided' },
        { status: 401 }
      );
    }

    // Verify JWT token
    const decoded = jwt.verify(token, JWT_SECRET) as any;

    return NextResponse.json({
      success: true,
      user: {
        id: decoded.userId,
        username: decoded.username,
        nama: decoded.nama,
        email: decoded.email
      }
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Invalid token' },
      { status: 401 }
    );
  }
}