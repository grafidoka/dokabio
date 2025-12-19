import { supabaseServer } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function DashboardLinksPage() {
  const supabase = await supabaseServer()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  async function addLink(formData: FormData) {
    'use server'

    const title = formData.get('title') as string
    const url = formData.get('url') as string

    const supabase = await supabaseServer()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) redirect('/login')

    const { error } = await supabase.from('links').insert({
      title,
      url,
      user_id: user.id,
      position: Date.now(),
      is_active: true,
    })

    if (error) {
      console.error('INSERT ERROR:', error)
      throw new Error(error.message)
    }

    redirect('/dashboard/links')
  }

  const { data: links } = await supabase
    .from('links')
    .select('*')
    .eq('user_id', user.id)
    .order('position')

  return (
    <div style={{ padding: 40 }}>
      <h1>Linkler</h1>

      <form action={addLink} style={{ display: 'flex', gap: 8 }}>
        <input name="title" placeholder="Başlık" required />
        <input name="url" placeholder="URL" required />
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
