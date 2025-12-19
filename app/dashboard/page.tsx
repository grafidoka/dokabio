import { redirect } from 'next/navigation'
import { supabaseServer } from '@/lib/supabase/server'

export default async function DashboardPage() {
  const supabase = await supabaseServer()
  const { data } = await supabase.auth.getUser()

  if (!data.user) redirect('/login')

  return (
    <pre style={{ color: '#0f0' }}>
      {JSON.stringify(data.user, null, 2)}
    </pre>
  )
}
