import { NextResponse } from 'next/server'
import { getSupabaseClient } from '@/lib/supabase-client'

export async function GET() {
  const client = getSupabaseClient()
  if (!client) {
    return NextResponse.json({ error: 'Supabase client tidak ditemukan' }, { status: 500 })
  }

  const { data, error } = await client
    .from('data_pegawai')
    .select('*')
    .order('pegawai_id', { ascending: true })

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
  if (!body.firstName || !body.lastName || !body.email) {
    return NextResponse.json({ error: 'Nama depan, nama belakang, dan email wajib diisi' }, { status: 400 })
  }

  // Mapping data ke tabel data_pegawai
  const employeeData = {
    nama: `${body.firstName} ${body.lastName}`.trim(),
    email: body.email,
    no_hp: body.phone || null,
    jabatan: body.position || null,
    departemen: body.department || null,
    tanggal_masuk: body.joinDate || null,
    status_karyawan: body.employmentType || null,
    gaji_pokok: body.salary ? String(body.salary) : '0',
    nik: body.employeeId ? Number(body.employeeId) : null, // jika kosong, null
    alamat: [
      body.address,
      body.city,
      body.province,
      body.postalCode
    ].filter(Boolean).join(', ') || null,
  }

  const { data, error } = await client
    .from('data_pegawai')
    .insert(employeeData)
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data, { status: 201 })
}