import { supabaseServer } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import SortableList from './SortableList'

export const dynamic = 'force-dynamic'

export default async function LinksPage() {
  const supabase = await supabaseServer()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: links } = await supabase
    .from('links')
    .select('id,title,url')
    .eq('user_id', user.id)
    .order('position', { ascending: true })

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
      position: Date.now(),
    })

    redirect('/dashboard/links')
  }

  return (
    <div style={{ padding: 32 }}>
      <h1>Linkler</h1>

      <form action={addLink} style={{ marginBottom: 24 }}>
        <input name="title" placeholder="Başlık" required />
        <input name="url" placeholder="https://" required />
        <button type="submit">Ekle</button>
      </form>

      <SortableList initial={links ?? []} />
    </div>
  )
}
