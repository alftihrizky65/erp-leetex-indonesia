import { NextResponse } from 'next/server'
import { getSupabaseClient } from '@/lib/supabase-client'

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params  // <-- AWAIT params
  const client = getSupabaseClient()
  if (!client) {
    return NextResponse.json({ error: 'Supabase client tidak ditemukan' }, { status: 500 })
  }

  const { data, error } = await client
    .from('supplier')
    .select('*')
    .eq('supplier_id', id) // gunakan id yang sudah di-await
    .single()

  if (error) {
    if (error.code === 'PGRST116') {
      return NextResponse.json({ error: 'Supplier tidak ditemukan' }, { status: 404 })
    }
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const client = getSupabaseClient()
  if (!client) {
    return NextResponse.json({ error: 'Supabase client tidak ditemukan' }, { status: 500 })
  }

  const body = await request.json()

  const updateData: any = {}
  if (body.nama_supplier !== undefined) updateData.nama_supplier = body.nama_supplier
  if (body.alamat !== undefined) updateData.alamat = body.alamat
  if (body.no_hp !== undefined) updateData.no_hp = body.no_hp
  if (body.email !== undefined) updateData.email = body.email
  if (body.npwp !== undefined) updateData.npwp = body.npwp
  if (body.rekening_bank !== undefined) updateData.rekening_bank = body.rekening_bank

  if (Object.keys(updateData).length === 0) {
    return NextResponse.json({ error: 'Tidak ada data yang diupdate' }, { status: 400 })
  }

  const { data, error } = await client
    .from('supplier')
    .update(updateData)
    .eq('supplier_id', i)
    .select()
    .single()

  if (error) {
    if (error.code === 'PGRST116') {
      return NextResponse.json({ error: 'Supplier tidak ditemukan' }, { status: 404 })
    }
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const client = getSupabaseClient()
  if (!client) {
    return NextResponse.json({ error: 'Supabase client tidak ditemukan' }, { status: 500 })
  }

  const { error } = await client
    .from('supplier')
    .delete()
    .eq('supplier_id', id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}