import { redirect } from 'next/navigation'
import { supabaseServer } from '@/lib/supabase/server'

export default async function DashboardLinksPage() {
  const supabase = await supabaseServer()
  const { data } = await supabase.auth.getUser()

  if (!data.user) {
    redirect('/login')
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>{data.user.email}</p>
    </div>
  )
}
