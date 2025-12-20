'use server'

import { supabaseServer } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function addLink(formData: FormData) {
  const title = formData.get('title') as string
  const url = formData.get('url') as string

  if (!title || !url) {
    throw new Error('Title ve URL zorunlu')
  }

  const supabase = await supabaseServer()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    throw new Error('User not authenticated')
  }

  const { error } = await supabase.from('links').insert({
    title,
    url,
    user_id: user.id,
    is_active: true,
  })

  if (error) {
    console.error('INSERT ERROR:', error)
    throw new Error(error.message)
  }

  revalidatePath('/dashboard/links')
}
