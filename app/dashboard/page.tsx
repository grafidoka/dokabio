import { supabaseServer } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const supabase = await supabaseServer()
  const { data } = await supabase.auth.getUser()

  if (!data.user) {
    redirect('/login')
  }

  return (
    <pre style={{ color: 'lime', padding: 40 }}>
      {JSON.stringify(data.user, null, 2)}
    </pre>
  )
}