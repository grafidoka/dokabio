import { notFound } from 'next/navigation'
import { supabaseServer } from '@/lib/supabase/server'

export default async function PublicProfilePage({ params }: any) {
  const supabase = await supabaseServer()

  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('username', params.username)
    .single()

  if (!data) notFound()

  return (
    <div>
      <h1>@{data.username}</h1>
    </div>
  )
}
