import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // ❗ Bu path'ler middleware tarafından ASLA engellenmez
  const publicPaths = [
    '/login',
    '/auth',
    '/auth/callback',
    '/api',
    '/'
  ]

  if (publicPaths.some((path) => request.nextUrl.pathname.startsWith(path))) {
    return response
  }

  // ❗ SADECE dashboard korumalı
  if (!request.nextUrl.pathname.startsWith('/dashboard')) {
    return response
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookies) {
          cookies.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  const { data } = await supabase.auth.getUser()

  if (!data.user) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return response
}

export const config = {
  matcher: ['/dashboard/:path*'],
}
