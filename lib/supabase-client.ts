/**
 * Supabase Client Singleton
 * Dynamic client creation to avoid build issues
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js'

let supabaseInstance: SupabaseClient | null = null

export function getSupabaseClient(): SupabaseClient | null {
  if (supabaseInstance) {
    return supabaseInstance
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.warn('Supabase environment variables not configured')
    return null
  }

  if (supabaseUrl === '' || supabaseKey === '') {
    console.warn('Supabase environment variables are empty')
    return null
  }

  try {
    supabaseInstance = createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
    console.log('Supabase client created successfully')
    return supabaseInstance
  } catch (error) {
    console.error('Failed to create Supabase client:', error)
    return null
  }
}

export function testConnection(): Promise<boolean> {
  const client = getSupabaseClient()
  if (!client) return Promise.resolve(false)

  // Simple connection test
  return client.from('data_pegawai').select('id').limit(1)
    .then(() => true)
    .catch((error) => {
      console.error('Supabase connection test failed:', error.message)
      return false
    })
}
