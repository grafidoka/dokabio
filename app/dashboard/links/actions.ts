'use server'

import { supabaseServer } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function saveOrder(idsInOrder: string[]) {
  const supabase = await supabaseServer()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  // sırayı batch güncelle
  const updates = idsInOrder.map((id, index) => ({
    id,
    position: index,
    user_id: user.id,
  }))

  // upsert ile güvenli güncelleme
  await supabase.from('links').upsert(updates, {
    onConflict: 'id',
  })
}
