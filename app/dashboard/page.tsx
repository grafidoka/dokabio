import { redirect } from 'next/navigation'
import { supabaseServer } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export default async function DashboardUsernamePage() {
  const supabase = await supabaseServer()
  const { data } = await supabase.auth.getUser()

  if (!data.user) {
    redirect('/login')
  }

  return (
    <div>
      <h1>Username Page</h1>
      <p>{data.user.email}</p>
    </div>
  )
}
