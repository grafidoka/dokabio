// app/dashboard/links/page.tsx
import { supabaseServer } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function DashboardLinksPage() {
  const supabase = await supabaseServer()

  // 🔐 Auth kontrolü
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // 📥 Linkleri çek
  const { data: links } = await supabase
    .from('links')
    .select('*')
    .order('position', { ascending: true })

  // ➕ Server Action
  async function addLink(formData: FormData) {
    'use server'

    const title = formData.get('title') as string
    const url = formData.get('url') as string

    const supabase = await supabaseServer()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return

    const { error } = await supabase.from('links').insert({
      user_id: user.id,
      title,
      url,
      position: Date.now(),
      is_active: true,
    })

    if (error) {
      console.error('INSERT ERROR:', error)
      throw error
    }
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Linkler</h1>

      <form action={addLink} style={{ display: 'flex', gap: 8 }}>
        <input name="title" placeholder="Başlık" required />
        <input name="url" placeholder="https://..." required />
        <button type="submit">Ekle</button>
      </form>

      <ul style={{ marginTop: 20 }}>
        {links?.map((link) => (
          <li key={link.id}>
            {link.title} — {link.url}
          </li>
        ))}
      </ul>
    </div>
  )
}
