'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/admin/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })

    if (res.ok) {
      router.push('/admin')
    } else {
      setError('Contraseña incorrecta.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-dvh flex items-center justify-center bg-background-default p-6">
      <div className="w-full max-w-sm bg-background-secondary border border-border-default-default rounded-[32px] p-8 shadow-400">
        <div className="mb-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-default-tertiary mb-1">
            Gacha Hub
          </p>
          <h1 className="text-subheading-strong text-text-default-default">
            Panel de administración
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-body-small-strong text-text-default-secondary ml-1">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoFocus
              required
              placeholder="••••••••"
              className="w-full h-12 px-4 bg-background-tertiary border border-border-default-default rounded-2xl text-text-default-default text-body-base focus:border-brand-default focus:ring-1 focus:ring-brand-default outline-none transition-all placeholder:text-text-default-tertiary"
            />
          </div>

          {error && (
            <p className="text-body-small font-medium text-red-400 ml-1">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-brand-default hover:bg-brand-default/90 text-text-brand-on rounded-2xl text-body-strong transition-all shadow-100 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
          >
            {loading ? 'Verificando...' : 'Ingresar'}
          </button>
        </form>
      </div>
    </div>
  )
}
