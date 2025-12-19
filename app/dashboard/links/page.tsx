import { supabaseServer } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function LinksPage() {
  // 🔴 MUTLAKA await
  const supabase = await supabaseServer()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: links } = await supabase
    .from('links')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  async function addLink(formData: FormData) {
    'use server'

    const title = String(formData.get('title'))
    const url = String(formData.get('url'))

    const supabase = await supabaseServer()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) redirect('/login')

    await supabase.from('links').insert({
      title,
      url,
      user_id: user.id,
    })

    redirect('/dashboard/links')
  }

  async function deleteLink(id: string) {
    'use server'

    const supabase = await supabaseServer()

    await supabase.from('links').delete().eq('id', id)

    redirect('/dashboard/links')
  }

  return (
    <div style={{ padding: 32 }}>
      <h1>Dashboard / Links</h1>
      <p>Giriş başarılı 🎉</p>

      <form action={addLink} style={{ marginTop: 24 }}>
        <input
          name="title"
          placeholder="Başlık"
          required
          style={{ display: 'block', marginBottom: 8 }}
        />
        <input
          name="url"
          placeholder="https://"
          required
          style={{ display: 'block', marginBottom: 8 }}
        />
        <button type="submit">Link Ekle</button>
      </form>

      <ul style={{ marginTop: 32 }}>
        {links?.map((link) => (
          <li key={link.id} style={{ marginBottom: 8 }}>
            <a href={link.url} target="_blank">
              {link.title}
            </a>{' '}
            <form
              action={deleteLink.bind(null, link.id)}
              style={{ display: 'inline' }}
            >
              <button type="submit">Sil</button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  )
}
