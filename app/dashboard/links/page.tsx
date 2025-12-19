import { redirect } from 'next/navigation'
import { supabaseServer } from '@/lib/supabase/server'

export default async function LinksPage() {
  const supabase = await supabaseServer()
  const { data } = await supabase.auth.getUser()

  if (!data.user) {
    redirect('/login')
  }

  return (
    <main style={{ padding: 40 }}>
      <h1>Dashboard / Links</h1>
      <p>{data.user.email}</p>
    </main>
  )
}
