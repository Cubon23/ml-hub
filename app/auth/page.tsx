'use client'
import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

// v1.0.1 - Final ML-HUB UI Update
export default function AuthPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClientComponentClient()

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
      router.push('/') // Redirect to home after success
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-[#0a0b10]">
      {/* Background Grid Decoration */}
      <div className="absolute inset-0 z-0 opacity-20" 
           style={{ backgroundImage: 'linear-gradient(#14161f 1px, transparent 1px), linear-gradient(90deg, #14161f 1px, transparent 1px)', 
                    backgroundSize: '40px 40px' }}></div>

      <div className="relative z-10 w-full max-w-md p-8 rounded-2xl bg-[#14161f]/80 backdrop-blur-xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#00e676]/10 border border-[#00e676]/20 mb-4">
            <svg className="w-8 h-8 text-[#00e676]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold tracking-tighter text-white">ML-HUB</h1>
          <p className="text-xs text-gray-500 mt-1 uppercase tracking-widest">Authentication Terminal v1.0</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Access Email</label>
            <input 
              required
              type="email" 
              className="tech-input"
              placeholder="user@ccis.ua.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Secure Password</label>
            <input 
              required
              type="password" 
              className="tech-input"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button 
            disabled={loading}
            type="submit"
            className="btn-cyber w-full mt-4 py-4 disabled:opacity-50"
          >
            {loading ? 'Authorizing...' : 'Authorize Access'}
          </button>
        </form>

        <div className="mt-10 flex items-center justify-between opacity-30 text-[9px] font-mono text-gray-400">
          <span>University of Antique</span>
          <span className="h-px w-8 bg-gray-700"></span>
          <span>CCIS Lab 04</span>
        </div>
      </div>
    </div>
  )
}