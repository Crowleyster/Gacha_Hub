import { NextResponse } from 'next/server'

export async function POST() {
  const response = NextResponse.redirect(new URL('/admin/login', 'http://localhost'))
  response.cookies.set('admin_session', '', { maxAge: 0, path: '/' })
  response.headers.set('Location', '/admin/login')
  return response
}