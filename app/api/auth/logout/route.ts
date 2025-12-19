import { NextResponse } from 'next/server'
import { createSupabaseServer } from '@/lib/supabase/server'

export async function POST() {
  const supabase = await createSupabaseServer()
  await supabase.auth.signOut()

  return NextResponse.redirect(
    new URL('/login', process.env.NEXT_PUBLIC_SITE_URL),
    { status: 302 }
  )
}

// 🔥 BU YOKSA 500/505 GÖRÜRSÜN
export async function GET() {
  return NextResponse.redirect(
    new URL('/login', process.env.NEXT_PUBLIC_SITE_URL),
    { status: 302 }
  )
}