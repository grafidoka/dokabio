'use server'

import { supabaseServer } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function addLinkAction(formData: FormData) {
  const title = String(formData.get('title'))
  const url = String(formData.get('url'))

  if (!title || !url) return

  const supabase = await supabaseServer()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  await supabase.from('links').insert({
    title,
    url,
    user_id: user.id,
    position: Date.now(),
  })

  redirect('/dashboard/links')
}
