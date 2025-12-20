import { redirect } from 'next/navigation'
import { supabaseServer } from '@/lib/supabase/server'
import { addLinkAction } from './actions'

export const dynamic = 'force-dynamic'

export default async function LinksPage() {
  const supabase = await supabaseServer()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: links } = await supabase
    .from('links')
    .select('*')
    .eq('user_id', user.id)
    .order('position')

  return (
    <div style={{ padding: 40 }}>
      <h1>Linkler</h1>

      <form action={addLinkAction}>
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
