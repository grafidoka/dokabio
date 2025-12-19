import { redirect } from 'next/navigation'
import { createSupabaseServerClient } from '@/lib/supabase/server'

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient()

  // 1️⃣ Session kontrolü
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect('/login')
  }

  const user = session.user

  // 2️⃣ Profili dene oku
  let { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .maybeSingle()

  // 3️⃣ Yoksa oluştur
  if (!profile) {
    await supabase.from('profiles').insert({
      id: user.id,
      username: user.email!.split('@')[0],
    })

    // 4️⃣ Tekrar oku (KESİN)
    const result = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    profile = result.data
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>Dashboard</h1>

      <p>Giriş başarılı 🎉</p>
      <p>Email: {user.email}</p>

      <hr style={{ margin: '24px 0' }} />

      <h2>Profil</h2>
      <p>
        <strong>Username:</strong> {profile.username}
      </p>
    </main>
  )
}
