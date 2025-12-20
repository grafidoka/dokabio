import { getSupabaseServer } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function UsernamePage() {
  const supabase = await getSupabaseServer()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    redirect('/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('username')
    .eq('id', user.id)
    .single()

  return (
    <div style={{ padding: 40 }}>
      <h1>Username</h1>

      <pre>
        USER ID: {user.id}
        {'\n'}
        USERNAME: {profile?.username ?? 'Yok'}
      </pre>
    </div>
  )
}
