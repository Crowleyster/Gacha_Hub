/**
 * fetch-hoyo-codes.mjs
 * Fetches active redemption codes for Genshin Impact, Honkai Star Rail
 * and Zenless Zone Zero from the hoyoverse-api fan API, then upserts
 * them into the Supabase `codes` table.
 */

const API_BASE = 'https://hoyo.torikushi.me'
const SB_URL   = process.env.SUPABASE_URL
const SB_KEY   = process.env.SUPABASE_KEY

const GAMES = [
  { apiSlug: 'genshin',  gameId: 'genshin-impact'   },
  { apiSlug: 'starrail', gameId: 'honkai-star-rail'  },
  { apiSlug: 'zzz',      gameId: 'zenless-zone-zero' },
]

if (!SB_URL || !SB_KEY) {
  console.error('Faltan SUPABASE_URL o SUPABASE_KEY')
  process.exit(1)
}

console.log(`SUPABASE_URL: ${SB_URL}`)
console.log(`SUPABASE_KEY: ${SB_KEY.slice(0, 12)}...`)

function sbHeaders() {
  return {
    'Content-Type':  'application/json',
    'apikey':        SB_KEY,
    'Authorization': `Bearer ${SB_KEY}`,
  }
}

async function getExistingGameIds() {
  const res = await fetch(`${SB_URL}/rest/v1/games?select=id`, { headers: sbHeaders() })
  if (!res.ok) { console.error(`No se pudo consultar games: ${res.status}`); return [] }
  const rows = await res.json()
  return rows.map(r => r.id)
}

async function upsertCodes(gameId, codes) {
  if (codes.length === 0) return { inserted: 0 }

  const rows = codes.map(c => ({
    game_id:   gameId,
    code:      c.code.toUpperCase(),
    rewards:   Array.isArray(c.rewards) ? c.rewards.join(', ') : (c.rewards ?? null),
    is_active: true,
  }))

  console.log(`  Payload:`, JSON.stringify(rows))

  const res = await fetch(`${SB_URL}/rest/v1/codes`, {
    method:  'POST',
    headers: { ...sbHeaders(), 'Prefer': 'return=representation,resolution=ignore-duplicates' },
    body:    JSON.stringify(rows),
  })

  const text = await res.text()
  console.log(`  Supabase response (${res.status}):`, text.slice(0, 500))

  if (!res.ok) throw new Error(`Insert failed: ${res.status} — ${text}`)

  let arr = []; try { arr = JSON.parse(text) } catch {}
  return { inserted: arr.length }
}

async function deactivateExpiredCodes(gameId, activeCodes) {
  const activeSet = new Set(activeCodes.map(c => c.code.toUpperCase()))
  const res = await fetch(`${SB_URL}/rest/v1/codes?game_id=eq.${gameId}&is_active=eq.true&select=id,code`, { headers: sbHeaders() })
  if (!res.ok) return
  const existing = await res.json()
  const toDeactivate = existing.filter(r => !activeSet.has(r.code))
  if (!toDeactivate.length) return
  const ids = toDeactivate.map(r => r.id)
  await fetch(`${SB_URL}/rest/v1/codes?id=in.(${ids.join(',')})`, {
    method: 'PATCH', headers: sbHeaders(), body: JSON.stringify({ is_active: false })
  })
  console.log(`  Desactivados ${toDeactivate.length} codigo(s)`)
}

async function main() {
  console.log(`\nIniciando ingesta — ${new Date().toISOString()}\n`)

  const existingIds = await getExistingGameIds()
  console.log(`game_ids en Supabase: [${existingIds.join(', ')}]\n`)

  for (const { apiSlug, gameId } of GAMES) {
    console.log(`▶ ${gameId}`)

    if (!existingIds.includes(gameId)) {
      console.warn(`  SKIP: "${gameId}" no existe en games. IDs disponibles: ${existingIds.join(', ')}`)
      continue
    }

    try {
      const apiUrl = `${API_BASE}/mihoyo/${apiSlug}/codes`
      console.log(`  GET ${apiUrl}`)
      const res = await fetch(apiUrl)
      console.log(`  API status: ${res.status}`)

      if (!res.ok) { console.warn(`  API error, saltando`); continue }

      const data = await res.json()
      console.log(`  API response:`, JSON.stringify(data).slice(0, 500))

      const activeCodes = data.active ?? []
      console.log(`  Codigos activos: ${activeCodes.length}`)

      const { inserted } = await upsertCodes(gameId, activeCodes)
      console.log(`  Insertados: ${inserted}`)
      await deactivateExpiredCodes(gameId, activeCodes)
    } catch (err) {
      console.error(`  ERROR en ${gameId}:`, err.message)
    }
    console.log()
  }

  console.log('Listo\n')
}

main()
