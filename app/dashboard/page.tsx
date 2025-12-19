import { redirect } from 'next/navigation'
import { createSupabaseServer } from '@/lib/supabase/server'

export default async function DashboardPage() {
  const supabase = await createSupabaseServer()
  const { data } = await supabase.auth.getUser()

  if (!data.user) {
    redirect('/login')
  }

  return (
    <div style={{ padding: 40, color: 'white' }}>
      <h1>Dashboard</h1>

      <p>
        Giriş yapan kullanıcı:
        <br />
        <strong>{data.user.email}</strong>
      </p>

      <form action="/api/auth/logout" method="post">
        <button type="submit">Çıkış Yap</button>
      </form>
    </div>
  )
}
