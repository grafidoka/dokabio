'use server'

import { supabaseServer } from '@/lib/supabase/server'

export async function addLinkAction(formData: FormData) {
  const title = formData.get('title') as string
  const url = formData.get('url') as string

  if (!title || !url) {
    throw new Error('Eksik alan')
  }

  const supabase = await supabaseServer()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Auth yok')
  }

  const { error } = await supabase.from('links').insert({
    user_id: user.id,
    title,
    url,
    position: Date.now(),
    is_active: true,
  })

  if (error) {
    console.error(error)
    throw new Error(error.message)
  }
}
