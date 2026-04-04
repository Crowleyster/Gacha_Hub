'use client'

import { useState, useEffect, useCallback } from 'react'

const SB_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SB_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

function sbHeaders() {
  return {
    'Content-Type': 'application/json',
    apikey: SB_KEY,
    Authorization: `Bearer ${SB_KEY}`,
  }
}

type Game = { id: string; name: string }
type Tab = 'news' | 'events' | 'codes' | 'banners'

const tabs: { id: Tab; label: string }[] = [
  { id: 'news', label: 'Noticias' },
  { id: 'events', label: 'Eventos' },
  { id: 'codes', label: 'Códigos' },
  { id: 'banners', label: 'Banners' },
]

function now() {
  const d = new Date()
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset())
  return d.toISOString().slice(0, 16)
}

function toISO(val: string) {
  return val ? new Date(val).toISOString() : null
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>('news')
  const [games, setGames] = useState<Game[]>([])
  const [status, setStatus] = useState<{ msg: string; type: 'ok' | 'err' | 'loading' } | null>(null)

  // News state
  const [nGame, setNGame] = useState('')
  const [nTitle, setNTitle] = useState('')
  const [nUrl, setNUrl] = useState('')
  const [nImg, setNImg] = useState('')
  const [nType, setNType] = useState('official')
  const [nSource, setNSource] = useState('')
  const [nDate, setNDate] = useState(now())

  // Events state
  const [eGame, setEGame] = useState('')
  const [eTitle, setETitle] = useState('')
  const [eDesc, setEDesc] = useState('')
  const [eType, setEType] = useState('story')
  const [eCategory, setECategory] = useState('in-game')
  const [eStart, setEStart] = useState(now())
  const [eEnd, setEEnd] = useState(now())

  // Codes state
  const [cGame, setCGame] = useState('')
  const [cCode, setCCode] = useState('')
  const [cRewards, setCRewards] = useState('')
  const [cExp, setCExp] = useState('')

  // Banners state
  const [bGame, setBGame] = useState('')
  const [bTitle, setBTitle] = useState('')
  const [bImg, setBImg] = useState('')
  const [bType, setBType] = useState('character')
  const [bStart, setBStart] = useState(now())
  const [bEnd, setBEnd] = useState(now())

  const loadGames = useCallback(async () => {
    const r = await fetch(`${SB_URL}/rest/v1/games?select=id,name&order=name`, { headers: sbHeaders() })
    if (r.ok) {
      const data: Game[] = await r.json()
      setGames(data)
      if (data.length > 0) {
        setNGame(data[0].id)
        setEGame(data[0].id)
        setCGame(data[0].id)
        setBGame(data[0].id)
      }
    }
  }, [])

  useEffect(() => { loadGames() }, [loadGames])

  function showStatus(msg: string, type: 'ok' | 'err' | 'loading') {
    setStatus({ msg, type })
    if (type === 'ok') setTimeout(() => setStatus(null), 3000)
  }

  async function insert(table: string, body: Record<string, unknown>) {
    showStatus('Guardando...', 'loading')
    const r = await fetch(`${SB_URL}/rest/v1/${table}`, {
      method: 'POST',
      headers: { ...sbHeaders(), Prefer: 'return=minimal' },
      body: JSON.stringify(body),
    })
    if (r.status === 201 || r.status === 200) {
      showStatus('Guardado correctamente', 'ok')
      return true
    } else if (r.status === 409) {
      showStatus('Ya existe un registro igual (duplicado)', 'err')
    } else {
      const err = await r.json()
      showStatus(`Error: ${err.message || r.status}`, 'err')
    }
    return false
  }

  async function submitNews() {
    if (!nTitle.trim()) { showStatus('El título es obligatorio', 'err'); return }
    const ok = await insert('news', {
      game_id: nGame, title: nTitle.trim(),
      url: nUrl.trim() || null, image_url: nImg.trim() || null,
      type: nType, source: nSource.trim() || null,
      published_at: toISO(nDate),
    })
    if (ok) { setNTitle(''); setNUrl(''); setNImg(''); setNSource('') }
  }

  async function submitEvent() {
    if (!eTitle.trim()) { showStatus('El título es obligatorio', 'err'); return }
    const ok = await insert('events', {
      game_id: eGame, title: eTitle.trim(),
      description: eDesc.trim() || null,
      type: eType, category: eCategory,
      start_date: toISO(eStart), end_date: toISO(eEnd),
    })
    if (ok) { setETitle(''); setEDesc('') }
  }

  async function submitCode() {
    if (!cCode.trim()) { showStatus('El código es obligatorio', 'err'); return }
    const ok = await insert('codes', {
      game_id: cGame, code: cCode.trim().toUpperCase(),
      rewards: cRewards.trim() || null,
      expires_at: cExp ? toISO(cExp) : null,
      is_active: true,
    })
    if (ok) { setCCode(''); setCRewards(''); setCExp('') }
  }

  async function submitBanner() {
    if (!bTitle.trim()) { showStatus('El título es obligatorio', 'err'); return }
    const ok = await insert('banners', {
      game_id: bGame, title: bTitle.trim(),
      image_url: bImg.trim() || null,
      type: bType,
      start_date: toISO(bStart), end_date: toISO(bEnd),
    })
    if (ok) { setBTitle(''); setBImg('') }
  }

  return (
    <div className="min-h-screen bg-background-default text-text-default-default font-sans pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background-default/80 backdrop-blur-md border-b border-border-default-secondary px-6 py-4 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-default-tertiary mb-0.5">
            Gacha Hub
          </p>
          <h1 className="text-subheading-strong text-text-default-default">
            Panel de administración
          </h1>
        </div>
        <button
          onClick={async () => {
            await fetch('/admin/api/logout', { method: 'POST' })
            window.location.href = '/admin/login'
          }}
          style={{ background: 'transparent', border: '1px solid #222', borderRadius: '8px', color: '#666', fontSize: '13px', padding: '6px 14px', cursor: 'pointer' }}
        >
          Salir
        </button>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-8 space-y-8">
        {/* Tabs Navigation */}
        <nav className="p-1 bg-background-secondary border border-border-default-secondary rounded-2xl shadow-inner-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
            {tabs.map(t => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`
                  px-4 py-2.5 text-body-small-strong rounded-xl transition-all cursor-pointer
                  ${activeTab === t.id
                    ? 'bg-brand-default text-text-brand-on shadow-200'
                    : 'text-text-default-secondary hover:bg-background-tertiary hover:text-text-default-default'
                  }
                `}
              >
                {t.label}
              </button>
            ))}
          </div>
        </nav>

        {/* Status Bar */}
        {status && (
          <div className={`
            px-4 py-3 rounded-2xl text-body-small-strong border flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300
            ${status.type === 'ok' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
              status.type === 'err' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                'bg-background-tertiary text-text-default-secondary border-border-default-default'}
          `}>
            {status.type === 'loading' && <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />}
            {status.msg}
          </div>
        )}

        {/* Main Content Area */}
        <div className="bg-background-secondary border border-border-default-secondary rounded-[32px] p-6 md:p-8 shadow-300">


          {/* NEWS TAB */}
          {activeTab === 'news' && (
            <div className="flex flex-col gap-8 animate-in fade-in duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-body-small-strong text-text-default-secondary ml-1">Juego</label>
                  <select
                    value={nGame}
                    onChange={e => setNGame(e.target.value)}
                    className="w-full h-12 px-4 bg-background-tertiary border border-border-default-default rounded-2xl text-text-default-default text-body-base outline-none focus:border-brand-default transition-all"
                  >
                    {games.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-body-small-strong text-text-default-secondary ml-1">Tipo</label>
                  <select
                    value={nType}
                    onChange={e => setNType(e.target.value)}
                    className="w-full h-12 px-4 bg-background-tertiary border border-border-default-default rounded-2xl text-text-default-default text-body-base outline-none focus:border-brand-default transition-all"
                  >
                    <option value="official">Oficial</option>
                    <option value="community">Comunidad</option>
                    <option value="update">Actualización</option>
                    <option value="maintenance">Mantenimiento</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-body-small-strong text-text-default-secondary ml-1">Título</label>
                <input
                  className="w-full h-12 px-4 bg-background-tertiary border border-border-default-default rounded-2xl text-text-default-default text-body-base outline-none focus:border-brand-default transition-all placeholder:text-text-default-tertiary"
                  value={nTitle}
                  onChange={e => setNTitle(e.target.value)}
                  placeholder="Título de la noticia"
                />
              </div>

              <div className="space-y-2">
                <label className="text-body-small-strong text-text-default-secondary ml-1">URL de la noticia</label>
                <input
                  className="w-full h-12 px-4 bg-background-tertiary border border-border-default-default rounded-2xl text-text-default-default text-body-base outline-none focus:border-brand-default transition-all placeholder:text-text-default-tertiary"
                  value={nUrl}
                  onChange={e => setNUrl(e.target.value)}
                  placeholder="https://..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-body-small-strong text-text-default-secondary ml-1">URL de imagen (opcional)</label>
                  <input
                    className="w-full h-12 px-4 bg-background-tertiary border border-border-default-default rounded-2xl text-text-default-default text-body-base outline-none focus:border-brand-default transition-all placeholder:text-text-default-tertiary"
                    value={nImg}
                    onChange={e => setNImg(e.target.value)}
                    placeholder="https://..."
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-body-small-strong text-text-default-secondary ml-1">Fuente</label>
                  <input
                    className="w-full h-12 px-4 bg-background-tertiary border border-border-default-default rounded-2xl text-text-default-default text-body-base outline-none focus:border-brand-default transition-all placeholder:text-text-default-tertiary"
                    value={nSource}
                    onChange={e => setNSource(e.target.value)}
                    placeholder="Reddit, sitio oficial..."
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-body-small-strong text-text-default-secondary ml-1">Fecha de publicación</label>
                <input
                  type="datetime-local"
                  className="w-full h-12 px-4 bg-background-tertiary border border-border-default-default rounded-2xl text-text-default-default text-body-base outline-none focus:border-brand-default transition-all [color-scheme:dark]"
                  value={nDate}
                  onChange={e => setNDate(e.target.value)}
                />
              </div>

              <button
                onClick={submitNews}
                className="w-full md:w-auto px-8 h-12 bg-brand-default text-text-brand-on rounded-2xl text-body-strong hover:bg-brand-default/90 transition-all shadow-100 active:scale-[0.98] cursor-pointer"
              >
                Guardar noticia
              </button>
            </div>
          )}

          {/* EVENTS TAB */}
          {activeTab === 'events' && (
            <div className="flex flex-col gap-8 animate-in fade-in duration-500">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-body-small-strong text-text-default-secondary ml-1">Juego</label>
                  <select
                    value={eGame}
                    onChange={e => setEGame(e.target.value)}
                    className="w-full h-12 px-4 bg-background-tertiary border border-border-default-default rounded-2xl text-text-default-default text-body-base outline-none focus:border-brand-default transition-all"
                  >
                    {games.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-body-small-strong text-text-default-secondary ml-1">Tipo</label>
                  <select
                    value={eType}
                    onChange={e => setEType(e.target.value)}
                    className="w-full h-12 px-4 bg-background-tertiary border border-border-default-default rounded-2xl text-text-default-default text-body-base outline-none focus:border-brand-default transition-all"
                  >
                    <option value="story">Historia</option>
                    <option value="limited">Limitado</option>
                    <option value="collab">Colaboración</option>
                    <option value="login">Login bonus</option>
                    <option value="maintenance">Mantenimiento</option>
                    <option value="other">Otro</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-body-small-strong text-text-default-secondary ml-1">Categoría</label>
                  <select
                    value={eCategory}
                    onChange={e => setECategory(e.target.value)}
                    className="w-full h-12 px-4 bg-background-tertiary border border-border-default-default rounded-2xl text-text-default-default text-body-base outline-none focus:border-brand-default transition-all"
                  >
                    <option value="in-game">In-game</option>
                    <option value="community">Comunidad</option>
                    <option value="real-world">Real world</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-body-small-strong text-text-default-secondary ml-1">Título</label>
                <input
                  className="w-full h-12 px-4 bg-background-tertiary border border-border-default-default rounded-2xl text-text-default-default text-body-base outline-none focus:border-brand-default transition-all placeholder:text-text-default-tertiary"
                  value={eTitle}
                  onChange={e => setETitle(e.target.value)}
                  placeholder="Nombre del evento"
                />
              </div>

              <div className="space-y-2">
                <label className="text-body-small-strong text-text-default-secondary ml-1">Descripción (opcional)</label>
                <textarea
                  className="w-full px-4 py-3 bg-background-tertiary border border-border-default-default rounded-2xl text-text-default-default text-body-base outline-none focus:border-brand-default transition-all placeholder:text-text-default-tertiary resize-none min-h-[120px]"
                  value={eDesc}
                  onChange={e => setEDesc(e.target.value)}
                  placeholder="Descripción breve..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-body-small-strong text-text-default-secondary ml-1">Fecha inicio</label>
                  <input
                    type="datetime-local"
                    className="w-full h-12 px-4 bg-background-tertiary border border-border-default-default rounded-2xl text-text-default-default text-body-base outline-none focus:border-brand-default transition-all [color-scheme:dark]"
                    value={eStart}
                    onChange={e => setEStart(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-body-small-strong text-text-default-secondary ml-1">Fecha fin</label>
                  <input
                    type="datetime-local"
                    className="w-full h-12 px-4 bg-background-tertiary border border-border-default-default rounded-2xl text-text-default-default text-body-base outline-none focus:border-brand-default transition-all [color-scheme:dark]"
                    value={eEnd}
                    onChange={e => setEEnd(e.target.value)}
                  />
                </div>
              </div>

              <button
                onClick={submitEvent}
                className="w-full md:w-auto px-8 h-12 bg-brand-default text-text-brand-on rounded-2xl text-body-strong hover:bg-brand-default/90 transition-all shadow-100 active:scale-[0.98] cursor-pointer"
              >
                Guardar evento
              </button>
            </div>
          )}

          {/* CODES TAB */}
          {activeTab === 'codes' && (
            <div className="flex flex-col gap-8 animate-in fade-in duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-body-small-strong text-text-default-secondary ml-1">Juego</label>
                  <select
                    value={cGame}
                    onChange={e => setCGame(e.target.value)}
                    className="w-full h-12 px-4 bg-background-tertiary border border-border-default-default rounded-2xl text-text-default-default text-body-base outline-none focus:border-brand-default transition-all"
                  >
                    {games.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-body-small-strong text-text-default-secondary ml-1">Código</label>
                  <input
                    className="w-full h-12 px-4 bg-background-tertiary border border-border-default-default rounded-2xl text-text-default-default text-body-code outline-none focus:border-brand-default transition-all placeholder:text-text-default-tertiary uppercase"
                    value={cCode}
                    onChange={e => setCCode(e.target.value)}
                    placeholder="NIKKE2024ABC"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-body-small-strong text-text-default-secondary ml-1">Recompensas</label>
                  <input
                    className="w-full h-12 px-4 bg-background-tertiary border border-border-default-default rounded-2xl text-text-default-default text-body-base outline-none focus:border-brand-default transition-all placeholder:text-text-default-tertiary"
                    value={cRewards}
                    onChange={e => setCRewards(e.target.value)}
                    placeholder="100 gemas, 3 tickets..."
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-body-small-strong text-text-default-secondary ml-1 relative">
                    Expira
                    <span className="text-[9px] font-normal lowercase ml-2 text-text-default-tertiary">opcional</span>
                  </label>
                  <input
                    type="datetime-local"
                    className="w-full h-12 px-4 bg-background-tertiary border border-border-default-default rounded-2xl text-text-default-default text-body-base outline-none focus:border-brand-default transition-all [color-scheme:dark]"
                    value={cExp}
                    onChange={e => setCExp(e.target.value)}
                  />
                </div>
              </div>

              <button
                onClick={submitCode}
                className="w-full md:w-auto px-8 h-12 bg-brand-default text-text-brand-on rounded-2xl text-body-strong hover:bg-brand-default/90 transition-all shadow-100 active:scale-[0.98] cursor-pointer"
              >
                Guardar código
              </button>
            </div>
          )}

          {/* BANNERS TAB */}
          {activeTab === 'banners' && (
            <div className="flex flex-col gap-8 animate-in fade-in duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-body-small-strong text-text-default-secondary ml-1">Juego</label>
                  <select
                    value={bGame}
                    onChange={e => setBGame(e.target.value)}
                    className="w-full h-12 px-4 bg-background-tertiary border border-border-default-default rounded-2xl text-text-default-default text-body-base outline-none focus:border-brand-default transition-all"
                  >
                    {games.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-body-small-strong text-text-default-secondary ml-1">Tipo</label>
                  <select
                    value={bType}
                    onChange={e => setBType(e.target.value)}
                    className="w-full h-12 px-4 bg-background-tertiary border border-border-default-default rounded-2xl text-text-default-default text-body-base outline-none focus:border-brand-default transition-all"
                  >
                    <option value="character">Personaje</option>
                    <option value="weapon">Arma</option>
                    <option value="standard">Estándar</option>
                    <option value="collab">Collab</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-body-small-strong text-text-default-secondary ml-1">Título</label>
                <input
                  className="w-full h-12 px-4 bg-background-tertiary border border-border-default-default rounded-2xl text-text-default-default text-body-base outline-none focus:border-brand-default transition-all placeholder:text-text-default-tertiary"
                  value={bTitle}
                  onChange={e => setBTitle(e.target.value)}
                  placeholder="Nombre del banner"
                />
              </div>

              <div className="space-y-2">
                <label className="text-body-small-strong text-text-default-secondary ml-1">URL imagen (opcional)</label>
                <input
                  className="w-full h-12 px-4 bg-background-tertiary border border-border-default-default rounded-2xl text-text-default-default text-body-base outline-none focus:border-brand-default transition-all placeholder:text-text-default-tertiary"
                  value={bImg}
                  onChange={e => setBImg(e.target.value)}
                  placeholder="https://..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-body-small-strong text-text-default-secondary ml-1">Fecha inicio</label>
                  <input
                    type="datetime-local"
                    className="w-full h-12 px-4 bg-background-tertiary border border-border-default-default rounded-2xl text-text-default-default text-body-base outline-none focus:border-brand-default transition-all [color-scheme:dark]"
                    value={bStart}
                    onChange={e => setBStart(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-body-small-strong text-text-default-secondary ml-1">Fecha fin</label>
                  <input
                    type="datetime-local"
                    className="w-full h-12 px-4 bg-background-tertiary border border-border-default-default rounded-2xl text-text-default-default text-body-base outline-none focus:border-brand-default transition-all [color-scheme:dark]"
                    value={bEnd}
                    onChange={e => setBEnd(e.target.value)}
                  />
                </div>
              </div>

              <button
                onClick={submitBanner}
                className="w-full md:w-auto px-8 h-12 bg-brand-default text-text-brand-on rounded-2xl text-body-strong hover:bg-brand-default/90 transition-all shadow-100 active:scale-[0.98] cursor-pointer"
              >
                Guardar banner
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

