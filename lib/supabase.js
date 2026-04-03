import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// ── Validación del Entorno ────────────────────────────────────
if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    '\x1b[31m%s\x1b[0m', // Rojo en consola
    'Configuración de Supabase faltante: Asegúrate de definir NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY en tu .env.local'
  );
}

/**
 * Cliente Singleton de Supabase para toda la aplicación.
 * @type {import('@supabase/supabase-js').SupabaseClient}
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);