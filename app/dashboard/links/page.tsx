import { redirect } from 'next/navigation'
import { supabaseServer } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export default async function LinksPage() {
  // 🔑 MUTLAKA await
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
    .order('position')

  async function addLink(formData: FormData) {
    'use server'

    const title = formData.get('title') as string
    const url = formData.get('url') as string

    if (!title || !url) return

    const supabase = await supabaseServer()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      redirect('/login')
    }

    const { error } = await supabase.from('links').insert({
      user_id: user.id,
      title,
      url,
      position: Date.now(),
      is_active: true,
    })

    if (error) {
      console.error('INSERT ERROR:', error)
      throw new Error(error.message)
    }

    redirect('/dashboard/links')
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Linkler</h1>

      <form action={addLink}>
        <input name="title" placeholder="Başlık" />
        <input name="url" placeholder="URL" />
        <button type="submit">Ekle</button>
      </form>

      <ul>
        {links?.map((link) => (
          <li key={link.id}>
            {link.title} — {link.url}
          </li>
        ))}
      </ul>
    </div>
  )
}
