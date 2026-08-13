'use client'

import { useState } from 'react'
import * as Icons from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

// ─── Machine Data ─────────────────────────────────────────────────────
type MachineStatus = 'operational' | 'maintenance' | 'error' | 'offline'

interface Machine {
  id: string
  name: string
  code: string
  type: string
  department: string
  status: MachineStatus
  location: string
  operator?: string
  efficiency: number
  uptime: number
  temperature: number
  lastMaintenance: string
  nextMaintenance: string
}

const machines: Machine[] = [
  {
    id: 'MCH-001',
    name: 'Mesin Jahit Brother B-430',
    code: 'MJ-BR-001',
    type: 'Mesin Jahit',
    department: 'Produksi - Jahit',
    status: 'operational',
    location: 'Garis A - Posisi 1',
    operator: 'Siti Aminah',
    efficiency: 94.5,
    uptime: 98.2,
    temperature: 45,
    lastMaintenance: '2026-10-15',
    nextMaintenance: '2026-11-15',
  },
  {
    id: 'MCH-002',
    name: 'Mesin Obras Juki MO-6716S',
    code: 'MO-JK-002',
    type: 'Mesin Obras',
    department: 'Produksi - Finishing',
    status: 'operational',
    location: 'Garis B - Posisi 3',
    operator: 'Dewi Lestari',
    efficiency: 92.8,
    uptime: 97.5,
    temperature: 48,
    lastMaintenance: '2026-10-10',
    nextMaintenance: '2026-11-10',
  },
  {
    id: 'MCH-003',
    name: 'Mesin Potong Gerinda',
    code: 'MP-GR-003',
    type: 'Mesin Potong',
    department: 'Produksi - Cutting',
    status: 'maintenance',
    location: 'Area Cutting - Posisi 2',
    operator: null,
    efficiency: 0,
    uptime: 85.3,
    temperature: 55,
    lastMaintenance: '2026-10-20',
    nextMaintenance: '2026-10-27',
  },
  {
    id: 'MCH-004',
    name: 'Mesin Bordir Tajima TMBR',
    code: 'MB-TJ-004',
    type: 'Mesin Bordir',
    department: 'Produksi - Bordir',
    status: 'operational',
    location: 'Area Bordir - Posisi 1',
    operator: 'Ratna Sari',
    efficiency: 96.2,
    uptime: 99.1,
    temperature: 42,
    lastMaintenance: '2026-10-05',
    nextMaintenance: '2026-11-05',
  },
  {
    id: 'MCH-005',
    name: 'Mesin Press Uap',
    code: 'MP-UV-005',
    type: 'Mesin Finishing',
    department: 'Produksi - Finishing',
    status: 'error',
    location: 'Area Finishing - Posisi 5',
    operator: 'Agus Pratama',
    efficiency: 0,
    uptime: 72.4,
    temperature: 68,
    lastMaintenance: '2026-09-28',
    nextMaintenance: '2026-10-28',
  },
  {
    id: 'MCH-006',
    name: 'Mesin Jahit Overlock',
    code: 'MJ-YM-006',
    type: 'Mesin Jahit',
    department: 'Produksi - Jahit',
    status: 'offline',
    location: 'Garis A - Posisi 2',
    operator: null,
    efficiency: 0,
    uptime: 0,
    temperature: 0,
    lastMaintenance: '2026-10-01',
    nextMaintenance: '2026-11-01',
  },
  {
    id: 'MCH-007',
    name: 'Auto Cutter Lectra',
    code: 'AC-LE-007',
    type: 'Mesin Potong Otomatis',
    department: 'Produksi - Cutting',
    status: 'operational',
    location: 'Area Cutting - High-Tech',
    operator: 'Hendra Wijaya',
    efficiency: 98.5,
    uptime: 99.8,
    temperature: 38,
    lastMaintenance: '2026-10-18',
    nextMaintenance: '2026-11-18',
  },
  {
    id: 'MCH-008',
    name: 'Mesin Fusing Juki',
    code: 'MF-JK-008',
    type: 'Mesin Finishing',
    department: 'Produksi - Finishing',
    status: 'operational',
    location: 'Area Finishing - Posisi 1',
    operator: 'Dewi Anggraini',
    efficiency: 93.7,
    uptime: 96.8,
    temperature: 46,
    lastMaintenance: '2026-10-12',
    nextMaintenance: '2026-11-12',
  },
]

// ─── Status Helpers ─────────────────────────────────────────────────────
const getStatusConfig = (status: MachineStatus) => {
  const configs = {
    operational: { label: 'Operational', color: '#10b981', bgColor: '#d1fae5', textColor: '#065f46' },
    maintenance: { label: 'Maintenance', color: '#f59e0b', bgColor: '#fef3c7', textColor: '#92400e' },
    error: { label: 'Error', color: '#ef4444', bgColor: '#fee2e2', textColor: '#991b1b' },
    offline: { label: 'Offline', color: '#6b7280', bgColor: '#f3f4f6', textColor: '#374151' },
  }
  return configs[status] || configs.offline
}

// ─── Machines Page ─────────────────────────────────────────────────────
export default function MachinesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | MachineStatus>('all')
  const [showAddModal, setShowAddModal] = useState(false)

  const filteredMachines = machines.filter(machine => {
    const matchesSearch = !searchQuery ||
      machine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      machine.code.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === 'all' || machine.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const stats = {
    total: machines.length,
    operational: machines.filter(m => m.status === 'operational').length,
    maintenance: machines.filter(m => m.status === 'maintenance').length,
    error: machines.filter(m => m.status === 'error').length,
    offline: machines.filter(m => m.status === 'offline').length,
    avgEfficiency: Math.round(
      machines.filter(m => m.status === 'operational')
        .reduce((sum, m) => sum + m.efficiency, 0) /
      machines.filter(m => m.status === 'operational').length || 1
    ),
  }

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Top Navigation Bar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Logo & Brand */}
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-10 h-10">
                <Image
                  src="/img/images-removebg-preview.png"
                  alt="Leetex"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-lg font-bold text-[#2E7D32]">
                PT Leetex Garment Indonesia
              </span>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-sm font-medium text-gray-600 hover:text-[#2E7D32]">
                Beranda
              </Link>
              <Link href="/dashboard/machines" className="text-sm font-medium text-[#2E7D32]">
                Mesin
              </Link>
              <Link href="/dashboard/hr" className="text-sm font-medium text-gray-600 hover:text-[#2E7D32]">
                HR
              </Link>
              <Link href="/dashboard/sales" className="text-sm font-medium text-gray-600 hover:text-[#2E7D32]">
                Penjualan
              </Link>
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-3">
              <div className="relative hidden sm:block">
                <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cari..."
                  className="w-48 pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/20 focus:border-[#2E7D32]"
                />
              </div>

              <button className="relative p-2 hover:bg-gray-100 rounded-lg">
                <Icons.Bell className="w-5 h-5 text-gray-600" />
                {stats.error > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                )}
              </button>

              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Icons.Settings className="w-5 h-5 text-gray-600" />
              </button>

              <div className="w-8 h-8 rounded-full bg-[#2E7D32] flex items-center justify-center">
                <span className="text-sm font-semibold text-white">A</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="p-6">

        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Manajemen Mesin
          </h1>
          <p className="text-sm text-gray-600">
            Monitor dan kelola semua mesin produksi
          </p>
        </div>

        {/* KPI Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          {/* Total Mesin */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                <Icons.Settings className="w-6 h-6 text-[#3b82f6]" />
              </div>
            </div>
            <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1">
              Total Mesin
            </p>
            <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
            <p className="text-xs text-gray-500 mt-1">unit aktif</p>
          </div>

          {/* Operational */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
                <Icons.CheckCircle className="w-6 h-6 text-[#22c55e]" />
              </div>
              <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                +12%
              </span>
            </div>
            <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1">
              Operasional
            </p>
            <p className="text-3xl font-bold text-[#22c55e]">{stats.operational}</p>
            <p className="text-xs text-gray-500 mt-1">mesin normal</p>
          </div>

          {/* Maintenance */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 rounded-xl bg-yellow-50 flex items-center justify-center">
                <Icons.Wrench className="w-6 h-6 text-[#f59e0b]" />
              </div>
            </div>
            <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1">
              Maintenance
            </p>
            <p className="text-3xl font-bold text-[#f59e0b]">{stats.maintenance}</p>
            <p className="text-xs text-gray-500 mt-1">dalam perbaikan</p>
          </div>

          {/* Error */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center">
                <Icons.AlertTriangle className="w-6 h-6 text-[#ef4444]" />
              </div>
              <span className="text-xs font-semibold text-red-600 bg-red-100 px-2 py-1 rounded-full">
                Urgent
              </span>
            </div>
            <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1">
              Error/Rusak
            </p>
            <p className="text-3xl font-bold text-[#ef4444]">{stats.error}</p>
            <p className="text-xs text-gray-500 mt-1">perlu perhatian</p>
          </div>

          {/* Avg Efficiency */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center">
                <Icons.TrendingUp className="w-6 h-6 text-[#8b5cf6]" />
              </div>
              <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                +5.2%
              </span>
            </div>
            <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1">
              Efisiensi Rata-rata
            </p>
            <p className="text-3xl font-bold text-gray-900">{stats.avgEfficiency}%</p>
            <p className="text-xs text-gray-500 mt-1">performa mesin</p>
          </div>
        </div>

        {/* Filters & Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari mesin..."
                className="w-64 pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/20 focus:border-[#2E7D32]"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
              className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/20 focus:border-[#2E7D32] bg-white"
            >
              <option value="all">Semua Status</option>
              <option value="operational">Operasional</option>
              <option value="maintenance">Maintenance</option>
              <option value="error">Error</option>
              <option value="offline">Offline</option>
            </select>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/dashboard/machines/maintenance"
              className="flex items-center gap-2 px-4 py-2.5 bg-[#86efac] text-gray-900 rounded-lg text-sm font-medium hover:bg-[#4ade80] transition-colors"
            >
              <Icons.Calendar className="w-4 h-4" />
              Jadwal Maintenance
            </Link>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-[#22c55e] text-white rounded-lg text-sm font-medium hover:bg-[#16a34a] transition-colors"
            >
              <Icons.Plus className="w-4 h-4" />
              Tambah Mesin
            </button>
          </div>
        </div>

        {/* Machines Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredMachines.map((machine) => {
            const statusConfig = getStatusConfig(machine.status)

            return (
              <div
                key={machine.id}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* Card Header with Status Strip */}
                <div className={`h-1.5 ${machine.status === 'error' ? 'bg-[#ef4444]' : machine.status === 'maintenance' ? 'bg-[#f59e0b]' : 'bg-[#22c55e]'}`} />

                <div className="p-5">
                  {/* Status Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold"
                      style={{ backgroundColor: statusConfig.bgColor, color: statusConfig.textColor }}
                    >
                      {statusConfig.label}
                    </span>
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 hover:bg-gray-100 rounded-lg" title="Detail">
                        <Icons.Eye className="w-4 h-4 text-gray-500" />
                      </button>
                      <Link
                        href={`/dashboard/machines/maintenance`}
                        className="p-1.5 hover:bg-gray-100 rounded-lg" title="Maintenance"
                      >
                        <Icons.Wrench className="w-4 h-4 text-gray-500" />
                      </Link>
                    </div>
                  </div>

                  {/* Machine Name */}
                  <h3 className="font-bold text-gray-900 text-base mb-1 line-clamp-1">
                    {machine.name}
                  </h3>
                  <p className="text-xs text-gray-500 mb-4">{machine.code}</p>

                  {/* Machine Info */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <Icons.Tag className="w-3.5 h-3.5 text-gray-400" />
                      <span>{machine.type}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <Icons.MapPin className="w-3.5 h-3.5 text-gray-400" />
                      <span className="truncate">{machine.location}</span>
                    </div>
                    {machine.operator && (
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <Icons.User className="w-3.5 h-3.5 text-gray-400" />
                        <span>{machine.operator}</span>
                      </div>
                    )}
                  </div>

                  {/* Performance Metrics */}
                  {machine.status === 'operational' && (
                    <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-100">
                      <div>
                        <p className="text-[10px] text-gray-500 uppercase tracking-wide">Efisiensi</p>
                        <p className="text-lg font-bold text-[#22c55e]">{machine.efficiency}%</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-500 uppercase tracking-wide">Uptime</p>
                        <p className="text-lg font-bold text-[#3b82f6]">{machine.uptime}%</p>
                      </div>
                    </div>
                  )}

                  {/* Temperature for operational machines */}
                  {machine.status === 'operational' && machine.temperature && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">Suhu:</span>
                        <span className={`text-sm font-semibold ${machine.temperature > 60 ? 'text-[#ef4444]' : 'text-gray-700'}`}>
                          {machine.temperature}°C
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Error State */}
                  {machine.status === 'error' && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <div className="bg-red-50 rounded-lg p-3">
                        <div className="flex items-center gap-2 text-xs text-red-700 mb-1">
                          <Icons.AlertTriangle className="w-3.5 h-3.5" />
                          <span className="font-semibold">Error Terdeteksi</span>
                        </div>
                        <p className="text-xs text-red-600">Suhu tinggi - perlu perhatian</p>
                        <button className="mt-2 w-full text-xs bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors">
                          Restart Mesin
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Maintenance State */}
                  {machine.status === 'maintenance' && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <div className="bg-yellow-50 rounded-lg p-3">
                        <div className="flex items-center gap-2 text-xs text-yellow-700 mb-1">
                          <Icons.Wrench className="w-3.5 h-3.5" />
                          <span className="font-semibold">Sedang Maintenance</span>
                        </div>
                        <p className="text-xs text-gray-600">
                          Estimasi: {new Date(machine.nextMaintenance).toLocaleDateString('id-ID')}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Empty State */}
        {filteredMachines.length === 0 && (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <Icons.Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Tidak ada mesin ditemukan
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Coba sesuaikan filter atau pencarian Anda
            </p>
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-2xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Aksi Cepat</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <button className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[#22c55e]/10 flex items-center justify-center">
                <Icons.Wrench className="w-6 h-6 text-[#22c55e]" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-900">Jadwal Maintenance</p>
                <p className="text-sm text-gray-500">
                  {machines.filter(m => {
                    const nextDate = new Date(m.nextMaintenance)
                    const today = new Date()
                    const diffDays = Math.ceil((nextDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
                    return diffDays <= 7 && m.status !== 'maintenance'
                  }).length} minggu ini
                </p>
              </div>
            </button>

            <button className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
                <Icons.AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-900">Mesin Error</p>
                <p className="text-sm text-gray-500">{stats.error} butuh perhatian</p>
              </div>
            </button>

            <button className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                <Icons.FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-900">Laporan Mesin</p>
                <p className="text-sm text-gray-500">Analisis performa</p>
              </div>
            </button>

            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                <Icons.Plus className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-900">Tambah Mesin</p>
                <p className="text-sm text-gray-500">Daftarkan mesin baru</p>
              </div>
            </button>
          </div>
        </div>

      </main>

      {/* Add Machine Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Tambah Mesin Baru</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <Icons.X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Mesin *</label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/20 focus:border-[#2E7D32]"
                  placeholder="Contoh: Mesin Jahit Brother B-430"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kode Mesin *</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/20 focus:border-[#2E7D32]"
                    placeholder="Contoh: MJ-BR-001"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tipe Mesin *</label>
                  <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/20 focus:border-[#2E7D32]">
                    <option value="">Pilih tipe</option>
                    <option value="jahit">Mesin Jahit</option>
                    <option value="obras">Mesin Obras</option>
                    <option value="potong">Mesin Potong</option>
                    <option value="bordir">Mesin Bordir</option>
                    <option value="finishing">Mesin Finishing</option>
                    <option value="other">Lainnya</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Departemen *</label>
                <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/20 focus:border-[#2E7D32]">
                  <option value="">Pilih departemen</option>
                  <option value="jahit">Produksi - Jahit</option>
                  <option value="finishing">Produksi - Finishing</option>
                  <option value="cutting">Produksi - Cutting</option>
                  <option value="bordir">Produksi - Bordir</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Lokasi *</label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/20 focus:border-[#2E7D32]"
                  placeholder="Contoh: Garis A - Posisi 1"
                />
              </div>

              <div className="flex items-center gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-[#22c55e] text-white rounded-lg text-sm font-medium hover:bg-[#16a34a] transition-colors"
                >
                  Simpan Mesin
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  )
}
