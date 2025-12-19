import { redirect } from 'next/navigation'
import { createSupabaseServer } from '@/lib/supabase/server'

export default async function DashboardPage() {
  const supabase = await createSupabaseServer()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>Dashboard</h1>
      <p>Hoş geldin: {user.email}</p>

      <button
        onClick={() => {
          window.location.href = '/api/auth/logout'
        }}
      >
        Çıkış Yap
      </button>
    </div>
  )
}
