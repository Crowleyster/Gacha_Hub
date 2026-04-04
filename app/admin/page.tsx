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

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '9px 12px',
    background: '#1a1a1a', border: '1px solid #2a2a2a',
    borderRadius: '8px', color: '#fff', fontSize: '14px',
    outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit',
  }
  const labelStyle: React.CSSProperties = {
    display: 'block', fontSize: '11px', color: '#666',
    textTransform: 'uppercase', letterSpacing: '.06em',
    marginBottom: '5px', fontWeight: 500,
  }
  const fieldStyle: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: '0' }

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#fff', fontFamily: 'system-ui, sans-serif' }}>
      {/* Header */}
      <div style={{ borderBottom: '1px solid #1a1a1a', padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <p style={{ fontSize: '11px', color: '#444', letterSpacing: '.1em', textTransform: 'uppercase', margin: '0 0 2px' }}>Gacha Hub</p>
          <h1 style={{ fontSize: '18px', fontWeight: 500, margin: 0 }}>Panel de administración</h1>
        </div>
        <form action="/admin/api/logout" method="POST">
          <button type="submit" style={{ background: 'transparent', border: '1px solid #222', borderRadius: '8px', color: '#666', fontSize: '13px', padding: '6px 14px', cursor: 'pointer' }}>
            Salir
          </button>
        </form>
      </div>

      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '1.5rem' }}>
        {/* Tabs */}
        <div style={{ display: 'flex', gap: '2px', marginBottom: '1.5rem', background: '#111', border: '1px solid #1a1a1a', borderRadius: '10px', padding: '4px' }}>
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              style={{
                flex: 1, padding: '8px', fontSize: '14px', fontWeight: 500,
                background: activeTab === t.id ? '#fff' : 'transparent',
                color: activeTab === t.id ? '#000' : '#555',
                border: 'none', borderRadius: '7px', cursor: 'pointer',
                transition: 'all .15s',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Status bar */}
        {status && (
          <div style={{
            padding: '10px 14px', borderRadius: '8px', fontSize: '13px', marginBottom: '1rem',
            background: status.type === 'ok' ? '#0d2b1a' : status.type === 'err' ? '#2b0d0d' : '#1a1a1a',
            color: status.type === 'ok' ? '#4ade80' : status.type === 'err' ? '#f87171' : '#888',
            border: `1px solid ${status.type === 'ok' ? '#1a4a2a' : status.type === 'err' ? '#4a1a1a' : '#2a2a2a'}`,
          }}>
            {status.msg}
          </div>
        )}

        {/* Card */}
        <div style={{ background: '#111', border: '1px solid #1a1a1a', borderRadius: '12px', padding: '1.5rem' }}>

          {/* NEWS */}
          {activeTab === 'news' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div style={fieldStyle}>
                  <label style={labelStyle}>Juego</label>
                  <select value={nGame} onChange={e => setNGame(e.target.value)} style={inputStyle}>
                    {games.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
                  </select>
                </div>
                <div style={fieldStyle}>
                  <label style={labelStyle}>Tipo</label>
                  <select value={nType} onChange={e => setNType(e.target.value)} style={inputStyle}>
                    <option value="official">Oficial</option>
                    <option value="community">Comunidad</option>
                    <option value="update">Actualización</option>
                    <option value="maintenance">Mantenimiento</option>
                  </select>
                </div>
              </div>
              <div style={fieldStyle}>
                <label style={labelStyle}>Título</label>
                <input style={inputStyle} value={nTitle} onChange={e => setNTitle(e.target.value)} placeholder="Título de la noticia" />
              </div>
              <div style={fieldStyle}>
                <label style={labelStyle}>URL de la noticia</label>
                <input style={inputStyle} value={nUrl} onChange={e => setNUrl(e.target.value)} placeholder="https://..." />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div style={fieldStyle}>
                  <label style={labelStyle}>URL de imagen (opcional)</label>
                  <input style={inputStyle} value={nImg} onChange={e => setNImg(e.target.value)} placeholder="https://..." />
                </div>
                <div style={fieldStyle}>
                  <label style={labelStyle}>Fuente</label>
                  <input style={inputStyle} value={nSource} onChange={e => setNSource(e.target.value)} placeholder="Reddit, sitio oficial..." />
                </div>
              </div>
              <div style={fieldStyle}>
                <label style={labelStyle}>Fecha de publicación</label>
                <input type="datetime-local" style={inputStyle} value={nDate} onChange={e => setNDate(e.target.value)} />
              </div>
              <button onClick={submitNews} style={{ padding: '10px 20px', background: '#fff', color: '#000', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 500, cursor: 'pointer', alignSelf: 'flex-start' }}>
                Guardar noticia
              </button>
            </div>
          )}

          {/* EVENTS */}
          {activeTab === 'events' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px' }}>
                <div style={fieldStyle}>
                  <label style={labelStyle}>Juego</label>
                  <select value={eGame} onChange={e => setEGame(e.target.value)} style={inputStyle}>
                    {games.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
                  </select>
                </div>
                <div style={fieldStyle}>
                  <label style={labelStyle}>Tipo</label>
                  <select value={eType} onChange={e => setEType(e.target.value)} style={inputStyle}>
                    <option value="story">Historia</option>
                    <option value="limited">Limitado</option>
                    <option value="collab">Colaboración</option>
                    <option value="login">Login bonus</option>
                    <option value="maintenance">Mantenimiento</option>
                    <option value="other">Otro</option>
                  </select>
                </div>
                <div style={fieldStyle}>
                  <label style={labelStyle}>Categoría</label>
                  <select value={eCategory} onChange={e => setECategory(e.target.value)} style={inputStyle}>
                    <option value="in-game">In-game</option>
                    <option value="community">Comunidad</option>
                    <option value="real-world">Real world</option>
                  </select>
                </div>
              </div>
              <div style={fieldStyle}>
                <label style={labelStyle}>Título</label>
                <input style={inputStyle} value={eTitle} onChange={e => setETitle(e.target.value)} placeholder="Nombre del evento" />
              </div>
              <div style={fieldStyle}>
                <label style={labelStyle}>Descripción (opcional)</label>
                <textarea style={{ ...inputStyle, resize: 'vertical', minHeight: '80px' }} value={eDesc} onChange={e => setEDesc(e.target.value)} placeholder="Descripción breve..." />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div style={fieldStyle}>
                  <label style={labelStyle}>Fecha inicio</label>
                  <input type="datetime-local" style={inputStyle} value={eStart} onChange={e => setEStart(e.target.value)} />
                </div>
                <div style={fieldStyle}>
                  <label style={labelStyle}>Fecha fin</label>
                  <input type="datetime-local" style={inputStyle} value={eEnd} onChange={e => setEEnd(e.target.value)} />
                </div>
              </div>
              <button onClick={submitEvent} style={{ padding: '10px 20px', background: '#fff', color: '#000', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 500, cursor: 'pointer', alignSelf: 'flex-start' }}>
                Guardar evento
              </button>
            </div>
          )}

          {/* CODES */}
          {activeTab === 'codes' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div style={fieldStyle}>
                  <label style={labelStyle}>Juego</label>
                  <select value={cGame} onChange={e => setCGame(e.target.value)} style={inputStyle}>
                    {games.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
                  </select>
                </div>
                <div style={fieldStyle}>
                  <label style={labelStyle}>Código</label>
                  <input style={{ ...inputStyle, fontFamily: 'monospace', textTransform: 'uppercase' }} value={cCode} onChange={e => setCCode(e.target.value)} placeholder="NIKKE2024ABC" />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div style={fieldStyle}>
                  <label style={labelStyle}>Recompensas</label>
                  <input style={inputStyle} value={cRewards} onChange={e => setCRewards(e.target.value)} placeholder="100 gemas, 3 tickets..." />
                </div>
                <div style={fieldStyle}>
                  <label style={labelStyle}>Expira (dejar vacío si no se sabe)</label>
                  <input type="datetime-local" style={inputStyle} value={cExp} onChange={e => setCExp(e.target.value)} />
                </div>
              </div>
              <button onClick={submitCode} style={{ padding: '10px 20px', background: '#fff', color: '#000', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 500, cursor: 'pointer', alignSelf: 'flex-start' }}>
                Guardar código
              </button>
            </div>
          )}

          {/* BANNERS */}
          {activeTab === 'banners' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div style={fieldStyle}>
                  <label style={labelStyle}>Juego</label>
                  <select value={bGame} onChange={e => setBGame(e.target.value)} style={inputStyle}>
                    {games.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
                  </select>
                </div>
                <div style={fieldStyle}>
                  <label style={labelStyle}>Tipo</label>
                  <select value={bType} onChange={e => setBType(e.target.value)} style={inputStyle}>
                    <option value="character">Personaje</option>
                    <option value="weapon">Arma</option>
                    <option value="standard">Estándar</option>
                    <option value="collab">Collab</option>
                  </select>
                </div>
              </div>
              <div style={fieldStyle}>
                <label style={labelStyle}>Título</label>
                <input style={inputStyle} value={bTitle} onChange={e => setBTitle(e.target.value)} placeholder="Nombre del banner" />
              </div>
              <div style={fieldStyle}>
                <label style={labelStyle}>URL imagen (opcional)</label>
                <input style={inputStyle} value={bImg} onChange={e => setBImg(e.target.value)} placeholder="https://..." />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div style={fieldStyle}>
                  <label style={labelStyle}>Fecha inicio</label>
                  <input type="datetime-local" style={inputStyle} value={bStart} onChange={e => setBStart(e.target.value)} />
                </div>
                <div style={fieldStyle}>
                  <label style={labelStyle}>Fecha fin</label>
                  <input type="datetime-local" style={inputStyle} value={bEnd} onChange={e => setBEnd(e.target.value)} />
                </div>
              </div>
              <button onClick={submitBanner} style={{ padding: '10px 20px', background: '#fff', color: '#000', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: 500, cursor: 'pointer', alignSelf: 'flex-start' }}>
                Guardar banner
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
