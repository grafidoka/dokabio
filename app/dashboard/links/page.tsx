import { supabaseServer } from '@/lib/supabase/server'
import { addLink } from './actions'

export const dynamic = 'force-dynamic'

export default async function LinksPage() {
  const supabase = await supabaseServer()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return <div>Yetkisiz</div>
  }

  const { data: links } = await supabase
    .from('links')
    .select('*')
    .eq('user_id', user.id)
    .order('id', { ascending: true })

  return (
    <div style={{ padding: 24 }}>
      <h1>Linkler</h1>

      {/* EKLEME FORMU */}
      <form action={addLink} style={{ marginBottom: 20 }}>
        <input
          name="title"
          placeholder="Başlık"
          required
          style={{ marginRight: 8 }}
        />
        <input
          name="url"
          placeholder="https://"
          required
          style={{ marginRight: 8 }}
        />
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
