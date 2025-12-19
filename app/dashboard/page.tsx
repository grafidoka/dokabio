import { redirect } from 'next/navigation'
import { createSupabaseServer } from '@/lib/supabase/server'

export default async function DashboardPage() {
  const supabase = await createSupabaseServer()
  const { data } = await supabase.auth.getUser()

  if (!data.user) {
    redirect('/login')
  }

  return <h1>Dashboard</h1>
}