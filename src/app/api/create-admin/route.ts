import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function GET() {
  try {
    await connectDB();

    const adminUsername = process.env.ADMIN_USERNAME || 'admin';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@ukmmadani.com';

    // Check if admin already exists
    const existingAdmin = await User.findOne({ username: adminUsername });
    
    if (existingAdmin) {
      return NextResponse.json({
        success: false,
        message: 'Admin user already exists'
      });
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(adminPassword, saltRounds);

    // Create admin user
    const adminUser = new User({
      username: adminUsername,
      password: hashedPassword,
      email: adminEmail,
      nama_lengkap: 'Administrator',
      role: 'super_admin',
      status: 'aktif',
      login_count: 0
    });

    await adminUser.save();

    return NextResponse.json({
      success: true,
      message: 'Admin user created successfully!',
      admin: {
        username: adminUsername,
        email: adminEmail,
        nama_lengkap: 'Administrator',
        role: 'super_admin'
      }
    });

  } catch (error: unknown) {
    console.error('Create admin error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    return NextResponse.json({
      success: false,
      error: errorMessage,
      message: 'Failed to create admin user'
    }, { status: 500 });
  }
}