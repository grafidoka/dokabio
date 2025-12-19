import { redirect } from 'next/navigation'
import { getSupabaseServer } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export default async function DashboardLinksPage() {
  const supabase = await getSupabaseServer()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  return (
    <div style={{ padding: 40 }}>
      <h1>Dashboard</h1>
      <p>{user.email}</p>
      <a href="/logout">Çıkış Yap</a>
    </div>
  )
}
