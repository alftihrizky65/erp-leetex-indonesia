import { NextResponse } from 'next/server'
import { getSupabaseClient } from '@/lib/supabase-client'

export async function GET() {
  const client = getSupabaseClient()
  if (!client) {
    return NextResponse.json({ error: 'Supabase client tidak ditemukan' }, { status: 500 })
  }

  const { data, error } = await client
    .from('shift_karyawan')
    .select('*')
    .order('shift_id', { ascending: true })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

export async function POST(request: Request) {
  const client = getSupabaseClient()
  if (!client) {
    return NextResponse.json({ error: 'Supabase client tidak ditemukan' }, { status: 500 })
  }

  const body = await request.json()

  // Validasi
  if (!body.nama_shift) {
    return NextResponse.json({ error: 'nama_shift wajib diisi' }, { status: 400 })
  }

  const { data, error } = await client
    .from('shift_karyawan')
    .insert({
      nama_shift: body.nama_shift,
      jam_masuk: body.jam_masuk || null,
      jam_pulang: body.jam_pulang || null,
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data, { status: 201 })
}