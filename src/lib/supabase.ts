import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Server-side client with service_role key — bypasses RLS
// Used in API routes where we need full access (extract, upload, audit)
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseAnonKey

export const supabase = createClient(supabaseUrl, supabaseServiceKey)

// Client-side client with anon key — respects RLS policies
export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey)

/**
 * Creates a Supabase client with the user's Clerk token.
 * This allows RLS policies to identify the user via auth.jwt()
 */
export const createClerkSupabaseClient = (clerkToken: string) => {
  return createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: {
        Authorization: `Bearer ${clerkToken}`,
      },
    },
  })
}
