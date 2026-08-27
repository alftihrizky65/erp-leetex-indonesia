import { NextResponse } from 'next/server'
import { getSupabaseClient } from '@/lib/supabase-client'

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const client = getSupabaseClient()
  if (!client) {
    return NextResponse.json({ error: 'Supabase client tidak ditemukan' }, { status: 500 })
  }

  const { data, error } = await client
    .from('shift_karyawan')
    .select('*')
    .eq('shift_id', params.id)
    .single()

  if (error) {
    if (error.code === 'PGRST116') {
      return NextResponse.json({ error: 'Shift tidak ditemukan' }, { status: 404 })
    }
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const client = getSupabaseClient()
  if (!client) {
    return NextResponse.json({ error: 'Supabase client tidak ditemukan' }, { status: 500 })
  }

  const body = await request.json()

  const updateData: any = {}
  if (body.nama_shift !== undefined) updateData.nama_shift = body.nama_shift
  if (body.jam_masuk !== undefined) updateData.jam_masuk = body.jam_masuk
  if (body.jam_pulang !== undefined) updateData.jam_pulang = body.jam_pulang

  if (Object.keys(updateData).length === 0) {
    return NextResponse.json({ error: 'Tidak ada data yang diupdate' }, { status: 400 })
  }

  const { data, error } = await client
    .from('shift_karyawan')
    .update(updateData)
    .eq('shift_id', params.id)
    .select()
    .single()

  if (error) {
    if (error.code === 'PGRST116') {
      return NextResponse.json({ error: 'Shift tidak ditemukan' }, { status: 404 })
    }
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const client = getSupabaseClient()
  if (!client) {
    return NextResponse.json({ error: 'Supabase client tidak ditemukan' }, { status: 500 })
  }

  const { error } = await client
    .from('shift_karyawan')
    .delete()
    .eq('shift_id', params.id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}