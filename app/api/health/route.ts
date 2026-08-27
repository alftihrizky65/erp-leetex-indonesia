import { NextResponse } from 'next/server'
import { getSupabaseClient } from '@/lib/supabase-client'

export async function GET() {
  const client = getSupabaseClient()

  if (!client) {
    return NextResponse.json({
      status: 'error',
      database: 'not_configured',
      message: 'Supabase client tidak ditemukan',
    }, { status: 500 })
  }

  // Gunakan tabel 'data_pegawai' yang pasti ada di skema Anda
  const { error } = await client.from('data_pegawai').select('count').limit(1)

  if (error) {
    return NextResponse.json({
      status: 'error',
      database: 'disconnected',
      message: error.message,
    }, { status: 500 })
  }

  return NextResponse.json({
    status: 'ok',
    database: 'connected',
    timestamp: new Date().toISOString(),
  })
}