import { supabaseServer } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function LinksPage() {
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
    .order('position')

  async function addLink(formData: FormData) {
    'use server'

    const title = String(formData.get('title'))
    const url = String(formData.get('url'))

    const supabase = await supabaseServer()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      throw new Error('NO USER')
    }

    await supabase.from('links').insert({
      user_id: user.id,
      title,
      url,
    })

    redirect('/dashboard/links')
  }

  return (
    <div>
      <h1>Linkler</h1>

      <form action={addLink}>
        <input name="title" placeholder="Başlık" />
        <input name="url" placeholder="URL" />
        <button type="submit">Ekle</button>
      </form>

      <ul>
        {links?.map((l) => (
          <li key={l.id}>
            {l.title} — {l.url}
          </li>
        ))}
      </ul>
    </div>
  )
}
