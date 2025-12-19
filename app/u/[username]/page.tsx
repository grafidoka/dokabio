import { notFound } from 'next/navigation'
import { createSupabaseServer } from '@/lib/supabase/server'

type Props = {
  params: Promise<{ username: string }>
}

export default async function PublicProfile({ params }: Props) {
  const { username } = await params
  const supabase = await createSupabaseServer()

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('username', username)
    .single()

  if (!data || error) {
    notFound()
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>@{data.username}</h1>
      <p>{data.bio}</p>
    </div>
  )
}