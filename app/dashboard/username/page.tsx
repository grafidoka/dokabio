import { redirect } from 'next/navigation'
import { createServerClient } from '@/lib/supabase/server'

export default async function DashboardUsernamePage() {
  const supabase = createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div style={{ maxWidth: 600, margin: '40px auto' }}>
      <h1>Kullanıcı Sayfası</h1>
      <p>Giriş yapan kullanıcı: {user.email}</p>
    </div>
  )
}
