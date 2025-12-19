// app/dashboard/page.tsx
import { createSupabaseServer } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const supabase = await createSupabaseServer()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div style={{ padding: 32 }}>
      <h1>Dashboard</h1>

      <pre
        style={{
          marginTop: 20,
          padding: 16,
          background: '#111',
          color: '#0f0',
          fontSize: 12,
        }}
      >
        {JSON.stringify(user, null, 2)}
      </pre>
    </div>
  )
}
