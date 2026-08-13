'use client'

import { useState } from 'react'
import * as Icons from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

// ─── Maintenance Types ─────────────────────────────────────────────────────
type MaintenanceStatus = 'scheduled' | 'in-progress' | 'completed' | 'cancelled'
type MaintenancePriority = 'low' | 'medium' | 'high' | 'emergency'

interface MaintenanceSchedule {
  id: string
  machineId: string
  machineName: string
  machineCode: string
  type: 'routine' | 'preventive' | 'corrective' | 'emergency'
  scheduledDate: string
  estimatedDuration: number
  technician: string
  status: MaintenanceStatus
  priority: MaintenancePriority
  description: string
  parts?: string[]
  cost?: number
  completedDate?: string
  notes?: string
}

// ─── Maintenance Data ─────────────────────────────────────────────────────
const maintenanceSchedules: MaintenanceSchedule[] = [
  {
    id: 'MNT-2026-001',
    machineId: 'MCH-003',
    machineName: 'Mesin Potong Gerinda',
    machineCode: 'MP-GR-003',
    type: 'corrective',
    scheduledDate: '2026-10-27',
    estimatedDuration: 4,
    technician: 'Ahmad Teknisi A',
    status: 'in-progress',
    priority: 'high',
    description: 'Penggantian bearing dan penyesuaian pisau potong',
    parts: ['Bearing NSK 6205', 'Pisau Potong Spare'],
    cost: 2500000,
  },
  {
    id: 'MNT-2026-002',
    machineId: 'MCH-005',
    machineName: 'Mesin Press Uap',
    machineCode: 'MP-UV-005',
    type: 'emergency',
    scheduledDate: '2026-10-28',
    estimatedDuration: 6,
    technician: 'External Vendor',
    status: 'scheduled',
    priority: 'emergency',
    description: 'Perbaikan sistem pemanas - suhu tidak stabil',
    parts: ['Heating Element', 'Thermostat'],
    cost: 5500000,
  },
  {
    id: 'MNT-2026-003',
    machineId: 'MCH-001',
    machineName: 'Mesin Jahit Brother B-430',
    machineCode: 'MJ-BR-001',
    type: 'routine',
    scheduledDate: '2026-11-15',
    estimatedDuration: 2,
    technician: 'Budi Teknisi B',
    status: 'scheduled',
    priority: 'low',
    description: 'Maintenance berkala - pembersihan dan pelumasan',
    parts: ['Oil', 'Cleaning Kit', 'Needle Set'],
    cost: 500000,
  },
  {
    id: 'MNT-2026-004',
    machineId: 'MCH-002',
    machineName: 'Mesin Obras Juki MO-6716S',
    machineCode: 'MO-JK-002',
    type: 'preventive',
    scheduledDate: '2026-10-20',
    estimatedDuration: 3,
    technician: 'Ahmad Teknisi A',
    status: 'completed',
    priority: 'medium',
    description: 'Pengecekan looper dan pengecekan tension',
    completedDate: '2026-10-20',
    notes: 'Semua check normal, mesin siap digunakan',
    cost: 750000,
  },
  {
    id: 'MNT-2026-005',
    machineId: 'MCH-007',
    machineName: 'Auto Cutter Lectra',
    machineCode: 'AC-LE-007',
    type: 'routine',
    scheduledDate: '2026-11-18',
    estimatedDuration: 4,
    technician: 'External Vendor',
    status: 'scheduled',
    priority: 'medium',
    description: 'Kalibrasi sistem cutting dan update software',
    parts: ['Calibration Tool', 'Software License'],
    cost: 3500000,
  },
  {
    id: 'MNT-2026-006',
    machineId: 'MCH-008',
    machineName: 'Mesin Fusing Juki',
    machineCode: 'MF-JK-008',
    type: 'preventive',
    scheduledDate: '2026-10-15',
    estimatedDuration: 2,
    technician: 'Budi Teknisi B',
    status: 'completed',
    priority: 'low',
    description: 'Pembersihan element fusing dan pengecekan suhu',
    completedDate: '2026-10-15',
    notes: 'Suhu normal pada 180°C',
    cost: 400000,
  },
]

// ─── Status & Priority Helpers ─────────────────────────────────────────────────────
const getStatusConfig = (status: MaintenanceStatus) => {
  switch (status) {
    case 'scheduled':
      return { label: 'Terjadwal', bgColor: 'bg-blue-100', textColor: 'text-blue-700', dotColor: '#3b82f6' }
    case 'in-progress':
      return { label: 'Sedang Diproses', bgColor: 'bg-yellow-100', textColor: 'text-yellow-700', dotColor: '#f59e0b' }
    case 'completed':
      return { label: 'Selesai', bgColor: 'bg-green-100', textColor: 'text-green-700', dotColor: '#22c55e' }
    case 'cancelled':
      return { label: 'Dibatalkan', bgColor: 'bg-red-100', textColor: 'text-red-700', dotColor: '#ef4444' }
    default:
      return { label: 'Unknown', bgColor: 'bg-gray-100', textColor: 'text-gray-700', dotColor: '#9ca3af' }
  }
}

const getPriorityConfig = (priority: MaintenancePriority) => {
  switch (priority) {
    case 'emergency':
      return { label: 'Darurat', bgColor: 'bg-red-500', textColor: 'text-white' }
    case 'high':
      return { label: 'Tinggi', bgColor: 'bg-orange-500', textColor: 'text-white' }
    case 'medium':
      return { label: 'Sedang', bgColor: 'bg-yellow-500', textColor: 'text-white' }
    case 'low':
      return { label: 'Rendah', bgColor: 'bg-green-500', textColor: 'text-white' }
    default:
      return { label: 'Unknown', bgColor: 'bg-gray-500', textColor: 'text-white' }
  }
}

const getTypeLabel = (type: string) => {
  switch (type) {
    case 'routine': return 'Routine'
    case 'preventive': return 'Preventif'
    case 'corrective': return 'Korektif'
    case 'emergency': return 'Darurat'
    default: return type
  }
}

// ─── Maintenance Page ─────────────────────────────────────────────────────
export default function MaintenancePage() {
  const [statusFilter, setStatusFilter] = useState<'all' | MaintenanceStatus>('all')
  const [priorityFilter, setPriorityFilter] = useState<'all' | MaintenancePriority>('all')
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('list')
  const [showNewScheduleModal, setShowNewScheduleModal] = useState(false)

  const filteredSchedules = maintenanceSchedules.filter(schedule => {
    const matchesStatus = statusFilter === 'all' || schedule.status === statusFilter
    const matchesPriority = priorityFilter === 'all' || schedule.priority === priorityFilter
    return matchesStatus && matchesPriority
  })

  const upcomingCount = maintenanceSchedules.filter(s => s.status === 'scheduled').length
  const inProgressCount = maintenanceSchedules.filter(s => s.status === 'in-progress').length
  const completedThisMonth = maintenanceSchedules.filter(s => {
    if (s.status !== 'completed' || !s.completedDate) return false
    const completedDate = new Date(s.completedDate)
    const now = new Date()
    return completedDate.getMonth() === now.getMonth() && completedDate.getFullYear() === now.getFullYear()
  }).length
  const totalCost = maintenanceSchedules
    .filter(s => s.status === 'completed' && s.cost)
    .reduce((sum, s) => sum + (s.cost || 0), 0)

  return (
    <div className="min-h-screen bg-[#f8f9fa]">

      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left: Logo & Back */}
            <div className="flex items-center gap-4">
              <Link href="/dashboard/machines" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Icons.ArrowLeft className="w-5 h-5 text-gray-600" />
              </Link>
              <div className="flex items-center gap-3">
                <Image
                  src="/img/images-removebg-preview.png"
                  alt="Leetex Logo"
                  width={36}
                  height={36}
                  className="object-contain"
                />
                <div>
                  <h1 className="text-xl font-bold text-[#22c55e]">PT Leetex Garment Indonesia</h1>
                  <p className="text-xs text-gray-500">Jadwal Maintenance Mesin</p>
                </div>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowNewScheduleModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-[#22c55e] text-white rounded-lg text-sm font-medium hover:bg-[#16a34a] transition-colors"
              >
                <Icons.Plus className="w-4 h-4" />
                Jadwal Baru
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-6">

        {/* Page Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Jadwal Maintenance</h2>
          <p className="text-sm text-gray-500">Kelola jadwal perawatan mesin garment</p>
        </div>

        {/* KPI Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-500">Akan Datang</span>
              <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                <Icons.Calendar className="w-4 h-4 text-blue-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{upcomingCount}</p>
            <p className="text-xs text-gray-500">terjadwal</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-500">Sedang Diproses</span>
              <div className="w-8 h-8 rounded-lg bg-yellow-100 flex items-center justify-center">
                <Icons.Wrench className="w-4 h-4 text-yellow-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{inProgressCount}</p>
            <p className="text-xs text-gray-500">dalam pengerjaan</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-500">Selesai Bulan Ini</span>
              <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                <Icons.CheckCircle className="w-4 h-4 text-green-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{completedThisMonth}</p>
            <p className="text-xs text-gray-500">pekerjaan selesai</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-500">Total Biaya Bulan Ini</span>
              <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                <Icons.DollarSign className="w-4 h-4 text-purple-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(totalCost)}
            </p>
            <p className="text-xs text-gray-500">pengeluaran</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-500">Rata-rata Durasi</span>
              <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
                <Icons.Clock className="w-4 h-4 text-orange-600" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {(maintenanceSchedules.reduce((sum, s) => sum + s.estimatedDuration, 0) / maintenanceSchedules.length).toFixed(1)}h
            </p>
            <p className="text-xs text-gray-500">per pekerjaan</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Status:</span>
              {(['all', 'scheduled', 'in-progress', 'completed'] as const).map((status) => {
                const config = status !== 'all' ? getStatusConfig(status as MaintenanceStatus) : null
                return (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status as typeof statusFilter)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      statusFilter === status
                        ? 'bg-[#22c55e] text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {status === 'all' && 'Semua'}
                    {status === 'scheduled' && 'Terjadwal'}
                    {status === 'in-progress' && 'Diproses'}
                    {status === 'completed' && 'Selesai'}
                  </button>
                )
              })}
            </div>

            {/* Priority Filter */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Prioritas:</span>
              {(['all', 'emergency', 'high', 'medium', 'low'] as const).map((priority) => {
                const config = priority !== 'all' ? getPriorityConfig(priority as MaintenancePriority) : null
                return (
                  <button
                    key={priority}
                    onClick={() => setPriorityFilter(priority as typeof priorityFilter)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      priorityFilter === priority
                        ? 'bg-[#22c55e] text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {priority === 'all' && 'Semua'}
                    {priority === 'emergency' && 'Darurat'}
                    {priority === 'high' && 'Tinggi'}
                    {priority === 'medium' && 'Sedang'}
                    {priority === 'low' && 'Rendah'}
                  </button>
                )
              })}
            </div>

            {/* View Toggle */}
            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden ml-auto">
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 text-sm ${viewMode === 'list' ? 'bg-[#22c55e] text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
              >
                <Icons.List className="w-4 h-4 mr-1" />
                Daftar
              </button>
              <button
                onClick={() => setViewMode('calendar')}
                className={`px-4 py-2 text-sm ${viewMode === 'calendar' ? 'bg-[#22c55e] text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
              >
                <Icons.Calendar className="w-4 h-4 mr-1" />
                Kalender
              </button>
            </div>

            {/* Results Count */}
            <div className="text-sm text-gray-500">
              <span className="font-semibold text-gray-900">{filteredSchedules.length}</span> jadwal
            </div>
          </div>
        </div>

        {/* Maintenance List */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {viewMode === 'list' ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Mesin
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Tipe
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Tanggal
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Durasi
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Teknisi
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Prioritas
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Biaya
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredSchedules.map((schedule) => {
                    const statusConfig = getStatusConfig(schedule.status)
                    const priorityConfig = getPriorityConfig(schedule.priority)

                    return (
                      <tr key={schedule.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">{schedule.id}</td>
                        <td className="px-4 py-3">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{schedule.machineName}</p>
                            <p className="text-xs text-gray-500">{schedule.machineCode}</p>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-700">
                            {getTypeLabel(schedule.type)}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {new Date(schedule.scheduledDate).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">{schedule.estimatedDuration} jam</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{schedule.technician}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${priorityConfig.bgColor} ${priorityConfig.textColor}`}>
                            {priorityConfig.label}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${statusConfig.bgColor} ${statusConfig.textColor}`}>
                            {statusConfig.label}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {schedule.cost ? new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(schedule.cost) : '-'}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1">
                            <button className="p-1.5 hover:bg-gray-100 rounded text-gray-600 hover:text-gray-900" title="Detail">
                              <Icons.Eye className="w-4 h-4" />
                            </button>
                            {schedule.status === 'scheduled' && (
                              <button className="p-1.5 hover:bg-green-100 rounded text-green-600 hover:text-green-900" title="Mulai">
                                <Icons.Play className="w-4 h-4" />
                              </button>
                            )}
                            {schedule.status === 'in-progress' && (
                              <button className="p-1.5 hover:bg-blue-100 rounded text-blue-600 hover:text-blue-900" title="Selesaikan">
                                <Icons.Check className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-6">
              <div className="grid grid-cols-7 gap-2">
                {['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'].map((day) => (
                  <div key={day} className="text-center p-2 bg-gray-50 rounded">
                    <p className="text-xs font-semibold text-gray-600 mb-2">{day}</p>
                    <div className="space-y-1">
                      {maintenanceSchedules.slice(0, 2).map((schedule) => (
                        <div
                          key={schedule.id}
                          className={`text-xs p-1 rounded ${
                            schedule.priority === 'emergency' ? 'bg-red-500 text-white' :
                            schedule.priority === 'high' ? 'bg-orange-500 text-white' :
                            'bg-green-500 text-white'
                          }`}
                        >
                          {schedule.machineCode}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded bg-red-500" />
                  <span>Darurat</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded bg-orange-500" />
                  <span>Tinggi</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded bg-green-500" />
                  <span>Rutin</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Empty State */}
        {filteredSchedules.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <Icons.Wrench className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Tidak ada jadwal maintenance</h3>
            <p className="text-sm text-gray-500 mb-4">Tidak ada jadwal yang cocok dengan filter yang dipilih</p>
          </div>
        )}

        {/* Quick Stats */}
        <div className="mt-6 bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-900 mb-4">Ringkasan Maintenance</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Maintenance Selesai Bulan Ini</span>
                <Icons.CheckCircle className="w-5 h-5 text-green-500" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{completedThisMonth}</p>
              <p className="text-xs text-gray-500">pekerjaan selesai</p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Total Biaya Maintenance</span>
                <Icons.DollarSign className="w-5 h-5 text-purple-500" />
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(totalCost)}
              </p>
              <p className="text-xs text-gray-500">bulan ini</p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Rata-rata Biaya per Pekerjaan</span>
                <Icons.TrendingUp className="w-5 h-5 text-blue-500" />
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {completedThisMonth > 0 ? new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(totalCost / completedThisMonth) : '-'}
              </p>
              <p className="text-xs text-gray-500">per pekerjaan</p>
            </div>
          </div>
        </div>

      </main>

      {/* New Schedule Modal */}
      {showNewScheduleModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Jadwalkan Maintenance Baru</h2>
              <button
                onClick={() => setShowNewScheduleModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Icons.X className="w-5 h-5" />
              </button>
            </div>

            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mesin *</label>
                  <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22c55e]/20 focus:border-[#22c55e]">
                    <option value="">Pilih mesin</option>
                    <option value="MCH-001">Mesin Jahit Brother B-430</option>
                    <option value="MCH-002">Mesin Obras Juki MO-6716S</option>
                    <option value="MCH-003">Mesin Potong Gerinda</option>
                    <option value="MCH-005">Mesin Press Uap</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tipe Maintenance *</label>
                  <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22c55e]/20 focus:border-[#22c55e]">
                    <option value="routine">Routine</option>
                    <option value="preventive">Preventive</option>
                    <option value="corrective">Corrective</option>
                    <option value="emergency">Emergency</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Jadwal *</label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22c55e]/20 focus:border-[#22c55e]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Estimasi Durasi (jam) *</label>
                  <input
                    type="number"
                    min="1"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22c55e]/20 focus:border-[#22c55e]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Teknisi *</label>
                <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22c55e]/20 focus:border-[#22c55e]">
                  <option value="">Pilih teknisi</option>
                  <option value="tech-1">Ahmad Teknisi A</option>
                  <option value="tech-2">Budi Teknisi B</option>
                  <option value="external">External Vendor</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Prioritas *</label>
                <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22c55e]/20 focus:border-[#22c55e]">
                  <option value="low">Rendah</option>
                  <option value="medium">Sedang</option>
                  <option value="high">Tinggi</option>
                  <option value="emergency">Darurat</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi Pekerjaan *</label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22c55e]/20 focus:border-[#22c55e]"
                  placeholder="Jelaskan pekerjaan maintenance yang akan dilakukan..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Spare Parts (opsional)</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22c55e]/20 focus:border-[#22c55e]"
                  placeholder=" Pisau, Bearing, Oil (pisahkan dengan koma)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Estimasi Biaya (opsional)</label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22c55e]/20 focus:border-[#22c55e]"
                  placeholder="Contoh: 500000"
                />
              </div>

              <div className="flex items-center gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowNewScheduleModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-[#22c55e] text-white rounded-lg text-sm font-medium hover:bg-[#16a34a] transition-colors"
                >
                  Buat Jadwal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  )
}
