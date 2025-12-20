import { NextResponse } from 'next/server'
import { getSupabaseServer } from '@/lib/supabase/server'

export async function POST(req: Request) {
  const supabase = await getSupabaseServer()
  const { username } = await req.json()

  if (!username || username.length < 3) {
    return NextResponse.json(
      { error: 'Geçersiz kullanıcı adı' },
      { status: 400 }
    )
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json(
      { error: 'Yetkisiz' },
      { status: 401 }
    )
  }

  const { error } = await supabase
    .from('profiles')
    .update({ username })
    .eq('id', user.id)

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }

  return NextResponse.json({ success: true })
}
