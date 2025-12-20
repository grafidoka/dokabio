import { NextResponse } from 'next/server'
import { getSupabaseServer } from '@/lib/supabase/server'

export async function POST(req: Request) {
  const supabase = await getSupabaseServer()
  const { username } = await req.json()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { error } = await supabase
    .from('profiles')
    .update({ username })
    .eq('id', user.id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json({ success: true })
}
