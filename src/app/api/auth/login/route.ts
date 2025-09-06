import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'ukm-madani-secret-key';
const MAX_ATTEMPTS = 5;
const LOCKOUT_TIME = 15 * 60 * 1000; // 15 minutes

// In-memory rate limiting (in production, use Redis or database)
const loginAttempts: { [key: string]: { count: number; lastAttempt: number } } = {};

function getRealIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const real = request.headers.get('x-real-ip');
  const cloudflare = request.headers.get('cf-connecting-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  if (real) {
    return real.trim();
  }
  
  if (cloudflare) {
    return cloudflare.trim();
  }
  
  // NextRequest doesn't have .ip property, return fallback
  return 'unknown';
}

function isLockedOut(ip: string): boolean {
  const attempts = loginAttempts[ip];
  if (!attempts) return false;
  
  const now = Date.now();
  if (now - attempts.lastAttempt > LOCKOUT_TIME) {
    // Reset attempts after lockout period
    delete loginAttempts[ip];
    return false;
  }
  
  return attempts.count >= MAX_ATTEMPTS;
}

function recordFailedAttempt(ip: string): void {
  const now = Date.now();
  
  if (!loginAttempts[ip]) {
    loginAttempts[ip] = { count: 1, lastAttempt: now };
  } else {
    loginAttempts[ip].count++;
    loginAttempts[ip].lastAttempt = now;
  }
}

function clearFailedAttempts(ip: string): void {
  delete loginAttempts[ip];
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const { username, password } = await request.json();
    const userIP = getRealIP(request);

    // Input validation
    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: 'Username dan password harus diisi.' },
        { status: 400 }
      );
    }

    // Check if IP is locked out
    if (isLockedOut(userIP)) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Terlalu banyak percobaan login gagal. Akun dikunci selama 15 menit.' 
        },
        { status: 429 }
      );
    }

    // Sanitize username (only allow alphanumeric, underscore, dash)
    const sanitizedUsername = username.replace(/[^a-zA-Z0-9_-]/g, '');
    
    if (sanitizedUsername !== username) {
      recordFailedAttempt(userIP);
      return NextResponse.json(
        { success: false, message: 'Username tidak valid.' },
        { status: 400 }
      );
    }

    // Find user in database
    const user = await User.findOne({ 
      username: sanitizedUsername,
      status: 'aktif' 
    }).select('+password');

    if (!user) {
      recordFailedAttempt(userIP);
      
      // Add delay to slow down brute force attacks
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return NextResponse.json(
        { success: false, message: 'Username atau password salah!' },
        { status: 401 }
      );
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    
    if (!isValidPassword) {
      recordFailedAttempt(userIP);
      
      // Add delay to slow down brute force attacks
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return NextResponse.json(
        { success: false, message: 'Username atau password salah!' },
        { status: 401 }
      );
    }

    // Clear failed attempts on successful login
    clearFailedAttempts(userIP);

    // Update last login
    await User.findByIdAndUpdate(user._id, {
      last_login: new Date(),
      $inc: { login_count: 1 }
    });

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user._id, 
        username: user.username,
        nama: user.nama_lengkap,
        email: user.email 
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Create response with secure cookie
    const response = NextResponse.json({
      success: true,
      message: 'Login berhasil!',
      user: {
        id: user._id,
        username: user.username,
        nama: user.nama_lengkap,
        email: user.email,
        last_login: user.last_login
      }
    });

    // Set secure HTTP-only cookie
    response.cookies.set('admin-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      path: '/' // Change from '/admin' to '/' untuk akses global
    });

    console.log('Login successful for user:', user.username);
    return response;

  } catch (error: unknown) {
    console.error('Login error:', error);
    
    return NextResponse.json(
      { success: false, message: 'Terjadi kesalahan server. Silakan coba lagi.' },
      { status: 500 }
    );
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json(
    { success: false, message: 'Method not allowed' },
    { status: 405 }
  );
}