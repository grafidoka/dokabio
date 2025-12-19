import { redirect } from 'next/navigation'
import { createServerClient } from '@/lib/supabase/server'

export default async function DashboardLinksPage() {
  const supabase = createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div style={{ maxWidth: 600, margin: '40px auto' }}>
      <h1>Dashboard</h1>
      <p>Hoş geldin: {user.email}</p>
    </div>
  )
}
