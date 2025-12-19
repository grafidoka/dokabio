import { NextResponse } from 'next/server'
import { supabaseServer } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')

  if (!code) {
    return NextResponse.redirect(`${origin}/login`)
  }

  const supabase = await supabaseServer() // 🔴 await EKLENDİ
  await supabase.auth.exchangeCodeForSession(code)

  return NextResponse.redirect(`${origin}/dashboard`)
}
