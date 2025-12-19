import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  // 🔑 BU SATIR ÇOK ÖNEMLİ
  await supabase.auth.getSession()

  return response
}

export const config = {
  matcher: [
    /*
     * Auth callback ve static'leri HARİÇ tut
     */
    '/((?!_next/static|_next/image|favicon.ico|auth/callback).*)',
  ],
}
