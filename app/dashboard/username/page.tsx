import { supabaseServer } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function UsernamePage() {
  const supabase = await supabaseServer()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('username')
    .eq('id', user.id)
    .single()

  // username varsa dashboard'a
  if (profile?.username) {
    redirect('/dashboard/links')
  }

  async function saveUsername(formData: FormData) {
    'use server'

    const username = String(formData.get('username')).toLowerCase()

    const supabase = await supabaseServer()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) redirect('/login')

    const { error } = await supabase.from('profiles').insert({
      id: user.id,
      username,
    })

    if (error) {
      throw new Error('Bu username alınmış')
    }

    redirect('/dashboard/links')
  }

  return (
    <div style={{ padding: 32 }}>
      <h1>Username Seç</h1>
      <p>Bu adres public profilin olacak</p>

      <form action={saveUsername} style={{ marginTop: 24 }}>
        <input
          name="username"
          placeholder="kullaniciadi"
          required
          pattern="^[a-z0-9_]+$"
        />
        <button type="submit">Kaydet</button>
      </form>
    </div>
  )
}
