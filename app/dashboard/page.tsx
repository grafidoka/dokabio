import { redirect } from 'next/navigation'
import { supabaseServer } from '@/lib/supabase/server'

export default async function DashboardPage() {
  const supabase = await supabaseServer()
  const { data } = await supabase.auth.getUser()

  if (!data.user) {
    redirect('/login')
  }

  redirect('/dashboard/links')
}
