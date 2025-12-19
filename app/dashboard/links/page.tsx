import { redirect } from 'next/navigation'
import { getSupabaseServer } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export default async function DashboardLinksPage() {
  const supabase = await getSupabaseServer()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    redirect('/login')
  }

  return (
    <main style={{ padding: 40 }}>
      <h1>Dashboard</h1>
      <p>{user.email}</p>
    </main>
  )
}
