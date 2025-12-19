import { supabaseServer } from '@/lib/supabase/server'

export default async function DashboardUsernamePage() {
  const supabase = await supabaseServer()

  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (!user) {
    return <p>Yetkisiz</p>
  }

  return (
    <div>
      <h1>Kullanıcı Adı</h1>
      <p>{user.user_metadata.username}</p>
    </div>
  )
}
