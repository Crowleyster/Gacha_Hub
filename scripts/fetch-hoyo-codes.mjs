/**
 * fetch-hoyo-codes.mjs
 * Fetches active redemption codes for Genshin Impact, Honkai Star Rail
 * and Zenless Zone Zero from the hoyoverse-api fan API, then upserts
 * them into the Supabase `codes` table.
 *
 * API source: https://github.com/torikushiii/hoyoverse-api
 * Base URL:   https://hoyo.torikushi.me
 *
 * Runs via GitHub Actions every 6 hours.
 */

const API_BASE = 'https://hoyo.torikushi.me'
const SB_URL   = process.env.SUPABASE_URL
const SB_KEY   = process.env.SUPABASE_KEY

// Maps game slug used by the API → game_id used in your Supabase `games` table
const GAMES = [
  { apiSlug: 'genshin',  gameId: 'genshin-impact'   },
  { apiSlug: 'starrail', gameId: 'honkai-star-rail'  },
  { apiSlug: 'zzz',      gameId: 'zenless-zone-zero' },
]

if (!SB_URL || !SB_KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_KEY env vars')
  process.exit(1)
}

// ─── Supabase helpers ─────────────────────────────────────────────────────────

function sbHeaders() {
  return {
    'Content-Type':  'application/json',
    'apikey':        SB_KEY,
    'Authorization': `Bearer ${SB_KEY}`,
  }
}

/**
 * Inserts an array of codes for one game.
 * Uses ON CONFLICT DO NOTHING via the `Prefer: resolution=ignore-duplicates`
 * header — safe to run multiple times without creating duplicates.
 */
async function upsertCodes(gameId, codes) {
  if (codes.length === 0) return { inserted: 0 }

  const rows = codes.map(c => ({
    game_id:   gameId,
    code:      c.code.toUpperCase(),
    rewards:   Array.isArray(c.rewards) ? c.rewards.join(', ') : c.rewards ?? null,
    is_active: true,
    // expires_at is left null — the API doesn't provide expiry dates
  }))

  const res = await fetch(`${SB_URL}/rest/v1/codes`, {
    method:  'POST',
    headers: {
      ...sbHeaders(),
      // This tells PostgREST to silently ignore rows that violate the
      // UNIQUE(game_id, code) constraint we added to the table
      'Prefer': 'return=representation,resolution=ignore-duplicates',
    },
    body: JSON.stringify(rows),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Supabase insert failed for ${gameId}: ${res.status} — ${err}`)
  }

  const inserted = await res.json()
  return { inserted: inserted.length }
}

/**
 * Marks codes that are no longer active in the API as is_active = false.
 * Fetches all codes for a game from Supabase and compares against the
 * list of currently-active codes from the API.
 */
async function deactivateExpiredCodes(gameId, activeCodes) {
  const activeSet = new Set(activeCodes.map(c => c.code.toUpperCase()))

  // Get all codes currently marked active in Supabase for this game
  const res = await fetch(
    `${SB_URL}/rest/v1/codes?game_id=eq.${gameId}&is_active=eq.true&select=id,code`,
    { headers: sbHeaders() }
  )

  if (!res.ok) return

  const existing = await res.json()
  const toDeactivate = existing.filter(row => !activeSet.has(row.code))

  if (toDeactivate.length === 0) return

  const ids = toDeactivate.map(r => r.id)

  await fetch(`${SB_URL}/rest/v1/codes?id=in.(${ids.join(',')})`, {
    method:  'PATCH',
    headers: sbHeaders(),
    body:    JSON.stringify({ is_active: false }),
  })

  console.log(`  ↳ Deactivated ${toDeactivate.length} expired code(s)`)
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`\n🔄 Starting HoYoverse code ingestion — ${new Date().toISOString()}\n`)

  for (const { apiSlug, gameId } of GAMES) {
    console.log(`▶ ${gameId}`)

    try {
      const res = await fetch(`${API_BASE}/mihoyo/${apiSlug}/codes`)

      if (!res.ok) {
        console.warn(`  ⚠ API returned ${res.status} for ${apiSlug}, skipping`)
        continue
      }

      const data = await res.json()
      const activeCodes = data.active ?? []

      console.log(`  Found ${activeCodes.length} active code(s) from API`)

      const { inserted } = await upsertCodes(gameId, activeCodes)
      console.log(`  ✓ Inserted ${inserted} new code(s) into Supabase`)

      await deactivateExpiredCodes(gameId, activeCodes)

    } catch (err) {
      // Don't let one game failure stop the others
      console.error(`  ✗ Error processing ${gameId}:`, err.message)
    }
  }

  console.log('\n✅ Done\n')
}

main()
