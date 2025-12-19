import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const hasSession =
    req.cookies.get('sb-access-token') ||
    req.cookies.get('sb-refresh-token')

  const isLogin = req.nextUrl.pathname.startsWith('/login')
  const isDashboard = req.nextUrl.pathname.startsWith('/dashboard')

  if (isDashboard && !hasSession) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  if (isLogin && hasSession) {
    return NextResponse.redirect(new URL('/dashboard/links', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/login', '/dashboard/:path*'],
}
