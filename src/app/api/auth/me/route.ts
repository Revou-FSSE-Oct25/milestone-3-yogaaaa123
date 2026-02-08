import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token');
    const userInfo = cookieStore.get('user-info');

    if (!token) {
      return NextResponse.json({ isAuthenticated: false, user: null });
    }

    let user = null;
    if (userInfo) {
      try {
        user = JSON.parse(userInfo.value);
      } catch {
        // Invalid user info cookie
      }
    }

    return NextResponse.json({
      isAuthenticated: true,
      user,
    });
  } catch (error) {
    console.error('Check auth error:', error);
    return NextResponse.json(
      { isAuthenticated: false, user: null },
      { status: 500 }
    );
  }
}
