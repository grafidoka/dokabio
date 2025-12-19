import { NextResponse } from 'next/server'
import { createSupabaseServer } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')

  if (!code) {
    return NextResponse.redirect(
      new URL('/login', process.env.NEXT_PUBLIC_SITE_URL)
    )
  }

  const supabase = await createSupabaseServer()
  await supabase.auth.exchangeCodeForSession(code)

  return NextResponse.redirect(
    new URL('/dashboard', process.env.NEXT_PUBLIC_SITE_URL)
  )
}
