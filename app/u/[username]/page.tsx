import { notFound } from 'next/navigation'
import { createSupabaseServer } from '@/lib/supabase/server'

type Link = {
  id: string
  title: string
  url: string
}

function normalizeUrl(url: string) {
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }
  return `https://${url}`
}

export default async function UserPage({
  params,
}: {
  params: { username: string }
}) {
  const supabase = await createSupabaseServer()

  const { data: user } = await supabase
    .from('users')
    .select('id, username')
    .eq('username', params.username)
    .single()

  if (!user) {
    notFound()
  }

  const { data: links } = await supabase
    .from('links')
    .select('id, title, url')
    .eq('user_id', user.id)
    .order('created_at', { ascending: true })

  return (
    <main style={{ padding: 24 }}>
      <h1>@{user.username}</h1>

      <ul>
        {links?.map((link: Link) => (
          <li key={link.id}>
            <a
              href={normalizeUrl(link.url)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.title}
            </a>
          </li>
        ))}
      </ul>
    </main>
  )
}
