import { NextResponse } from 'next/server';

export async function POST() {
  console.log('Logout API called');
  
  const response = NextResponse.json({
    success: true,
    message: 'Logged out successfully'
  });

  // Clear the admin token cookie with multiple path attempts
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict' as const,
    maxAge: 0 // Expire immediately
  };

  // Clear cookie for different paths
  response.cookies.set('admin-token', '', {
    ...cookieOptions,
    path: '/admin'
  });
  
  response.cookies.set('admin-token', '', {
    ...cookieOptions,
    path: '/'
  });

  // Add cache control headers
  response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
  response.headers.set('Pragma', 'no-cache');
  response.headers.set('Expires', '0');

  return response;
}