import { NextResponse } from 'next/server'
import { getSupabaseClient } from '@/lib/supabase-client'

export async function GET() {
  const client = getSupabaseClient()
  if (!client) {
    return NextResponse.json({ error: 'Supabase client tidak ditemukan' }, { status: 500 })
  }

  const { data, error } = await client
    .from('supplier')
    .select('*')
    .order('supplier_id', { ascending: true })

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

  // Validasi minimal
  if (!body.nama_supplier) {
    return NextResponse.json({ error: 'nama_supplier wajib diisi' }, { status: 400 })
  }

  const { data, error } = await client
    .from('supplier')
    .insert({
      nama_supplier: body.nama_supplier,
      alamat: body.alamat || null,
      no_hp: body.no_hp || null,
      email: body.email || null,
      npwp: body.npwp || null,
      rekening_bank: body.rekening_bank || null,
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data, { status: 201 })
}