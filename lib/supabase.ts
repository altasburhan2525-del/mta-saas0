export type DatabaseMode = 'memory' | 'supabase';

export function getDatabaseMode(): DatabaseMode {
  return process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY ? 'supabase' : 'memory';
}

export function getSupabaseEnvStatus() {
  return {
    mode: getDatabaseMode(),
    hasUrl: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL),
    hasServiceKey: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY)
  };
}
