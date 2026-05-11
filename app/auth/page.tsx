'use client'
import { useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { useRouter } from 'next/navigation'

export default function AuthPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  // Use optional chaining or defaults to prevent build-time null errors
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''

  const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      alert(error.message)
    } else {
      router.push('/')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#0a0b10]">
      <div className="relative z-10 w-full max-w-md p-8 rounded-2xl bg-[#14161f]/80 border border-white/10">
        <h1 className="text-3xl font-bold text-center text-white mb-8">ML-HUB</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input 
            type="email" 
            className="w-full bg-[#0a0b10] border border-white/10 p-3 rounded text-white" 
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)} 
          />
          <input 
            type="password" 
            className="w-full bg-[#0a0b10] border border-white/10 p-3 rounded text-white" 
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)} 
          />
          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3 border border-[#00e676] text-[#00e676] hover:bg-[#00e676] hover:text-black transition-all"
          >
            {loading ? 'Authorizing...' : 'Authorize Access'}
          </button>
        </form>
      </div>
    </div>
  )
}