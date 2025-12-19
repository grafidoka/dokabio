import { redirect } from 'next/navigation'

export default function AuthCallbackPage() {
  // API route cookie’yi zaten set ediyor
  redirect('/dashboard')
}
