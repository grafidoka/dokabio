import { getSupabaseServer } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import UsernameForm from './UsernameForm'

export default async function UsernamePage() {
  const supabase = await getSupabaseServer()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('username')
    .eq('id', user.id)
    .single()

  if (profile?.username) {
    redirect('/dashboard/links')
  }

  return <UsernameForm />
}
