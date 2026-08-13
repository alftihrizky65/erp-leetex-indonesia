'use client'

import React, { useState } from 'react'
import * as Icons from 'lucide-react'
import Link from 'next/link'

// ─── Leave Requests Data ─────────────────────────────────────────────────────
const leaveRequests = [
  {
    id: 1,
    employeeId: 'EMP-2026-002',
    employeeName: 'Budi Santoso',
    avatar: 'BS',
    department: 'Logistik',
    leaveType: 'Cuti Tahunan',
    startDate: '2026-10-24',
    endDate: '2026-10-26',
    days: 3,
    reason: 'Acara keluarga',
    status: 'pending',
    appliedDate: '2026-10-20',
  },
  {
    id: 2,
    employeeId: 'EMP-2026-007',
    employeeName: 'Dewi Anggraini',
    avatar: 'DA',
    department: 'Produksi',
    leaveType: 'Cuti Sakit',
    startDate: '2026-10-22',
    endDate: '2026-10-23',
    days: 2,
    reason: 'Sakit demam',
    status: 'approved',
    appliedDate: '2026-10-21',
  },
  {
    id: 3,
    employeeId: 'EMP-2026-008',
    employeeName: 'Rudi Hartono',
    avatar: 'RH',
    department: 'Quality Control',
    leaveType: 'Cuti Melahirkan',
    startDate: '2026-11-01',
    endDate: '2026-12-30',
    days: 60,
    reason: 'Cuti melahirkan',
    status: 'pending',
    appliedDate: '2026-10-15',
  },
  {
    id: 4,
    employeeId: 'EMP-2026-009',
    employeeName: 'Sari Wulandari',
    avatar: 'SW',
    department: 'Admin & HR',
    leaveType: 'Izin',
    startDate: '2026-10-28',
    endDate: '2026-10-28',
    days: 1,
    reason: 'Keperluan pribadi',
    status: 'rejected',
    appliedDate: '2026-10-25',
    notes: 'Jadwal penting, tidak dapat disetujui',
  },
]

// ─── Leave Types ─────────────────────────────────────────────────────
const leaveTypes = [
  { id: 'annual', name: 'Cuti Tahunan', maxDays: 12, description: 'Cuti tahunan yang diberikan perusahaan' },
  { id: 'sick', name: 'Cuti Sakit', maxDays: 14, description: 'Cuti karena sakit dengan surat dokter' },
  { id: 'maternity', name: 'Cuti Melahirkan', maxDays: 90, description: 'Cuti melahirkan untuk karyawan wanita' },
  { id: 'paternity', name: 'Cuti Suami/Istri Melahirkan', maxDays: 3, description: 'Cuti saat istri melahirkan' },
  { id: 'personal', name: 'Izin', maxDays: 3, description: 'Izin untuk keperluan pribadi' },
  { id: 'marriage', name: 'Cuti Menikah', maxDays: 3, description: 'Cuti untuk menikah' },
  { id: 'family', name: 'Cuti Keluarga', maxDays: 3, description: 'Cuti untuk keperluan keluarga' },
]

// ─── Leave Page ─────────────────────────────────────────────────────
export default function LeavePage() {
  const [activeTab, setActiveTab] = useState<'requests' | 'balance' | 'calendar'>('requests')
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all')
  const [showNewLeaveModal, setShowNewLeaveModal] = useState(false)

  const filteredRequests = leaveRequests.filter(req => {
    if (filterStatus === 'all') return true
    return req.status === filterStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-700'
      case 'rejected':
        return 'bg-red-100 text-red-700'
      case 'pending':
        return 'bg-yellow-100 text-yellow-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'approved': return 'Disetujui'
      case 'rejected': return 'Ditolak'
      case 'pending': return 'Menunggu'
      default: return status
    }
  }

  const handleApprove = (id: number) => {
    console.log('Approving leave:', id)
    alert('Permintaan cuti disetujui!')
  }

  const handleReject = (id: number) => {
    const notes = prompt('Alasan penolakan:')
    if (notes) {
      console.log('Rejecting leave:', id, 'Reason:', notes)
      alert('Permintaan cuti ditolak!')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/dashboard/hr" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Icons.ArrowLeft className="w-5 h-5 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Kelola Cuti</h1>
                <p className="text-sm text-gray-500">Kelola permintaan cuti dan jatah cuti karyawan</p>
              </div>
            </div>

            <button
              onClick={() => setShowNewLeaveModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-[#22c55e] text-white rounded-lg text-sm font-medium hover:bg-[#16a34a] transition-colors"
            >
              <Icons.Plus className="w-4 h-4" />
              Ajukan Cuti
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-6">

        {/* Tabs */}
        <div className="bg-white rounded-xl border border-gray-200 mb-6">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('requests')}
              className={`px-6 py-3 text-sm font-medium transition-colors ${
                activeTab === 'requests'
                  ? 'text-[#22c55e] border-b-2 border-[#22c55e]'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Permintaan Cuti
            </button>
            <button
              onClick={() => setActiveTab('balance')}
              className={`px-6 py-3 text-sm font-medium transition-colors ${
                activeTab === 'balance'
                  ? 'text-[#22c55e] border-b-2 border-[#22c55e]'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Saldo Cuti
            </button>
            <button
              onClick={() => setActiveTab('calendar')}
              className={`px-6 py-3 text-sm font-medium transition-colors ${
                activeTab === 'calendar'
                  ? 'text-[#22c55e] border-b-2 border-[#22c55e]'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Kalender
            </button>
          </div>

          {/* Requests Tab */}
          {activeTab === 'requests' && (
            <div className="p-6">
              {/* Filter */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Filter:</span>
                  {(['all', 'pending', 'approved', 'rejected'] as const).map((status) => (
                    <button
                      key={status}
                      onClick={() => setFilterStatus(status)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        filterStatus === status
                          ? 'bg-[#22c55e] text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {status === 'all' && 'Semua'}
                      {status === 'pending' && 'Menunggu'}
                      {status === 'approved' && 'Disetujui'}
                      {status === 'rejected' && 'Ditolak'}
                    </button>
                  ))}
                </div>

                <div className="text-sm text-gray-500">
                  {filteredRequests.length} permintaan
                </div>
              </div>

              {/* Leave Requests List */}
              <div className="space-y-4">
                {filteredRequests.map((request) => (
                  <div key={request.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-sm transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-[#22c55e] flex items-center justify-center text-white font-semibold">
                          {request.avatar}
                        </div>

                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-gray-900">{request.employeeName}</h3>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                              {getStatusLabel(request.status)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500">{request.employeeId} • {request.department}</p>
                          <div className="flex items-center gap-4 mt-2 text-sm">
                            <div className="flex items-center gap-1 text-gray-600">
                              <Icons.Calendar className="w-4 h-4" />
                              <span>{request.startDate} s/d {request.endDate}</span>
                            </div>
                            <div className="flex items-center gap-1 text-gray-600">
                              <Icons.Clock className="w-4 h-4" />
                              <span>{request.days} hari</span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mt-2">
                            <span className="font-medium">Jenis:</span> {request.leaveType}
                          </p>
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Alasan:</span> {request.reason}
                          </p>
                          {request.notes && (
                            <p className="text-sm text-red-600 mt-1">
                              <span className="font-medium">Catatan:</span> {request.notes}
                            </p>
                          )}
                          <p className="text-xs text-gray-400 mt-2">
                            Diajukan: {new Date(request.appliedDate).toLocaleDateString('id-ID')}
                          </p>
                        </div>
                      </div>

                      {request.status === 'pending' && (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleReject(request.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Tolak"
                          >
                            <Icons.X className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleApprove(request.id)}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Setujui"
                          >
                            <Icons.Check className="w-5 h-5" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Balance Tab */}
          {activeTab === 'balance' && (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {leaveTypes.map((type) => (
                  <div key={type.id} className="border border-gray-200 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{type.name}</h3>
                      <span className="text-xs text-gray-500">{type.maxDays} hari</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{type.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Tersedia:</span>
                      <span className="font-semibold text-[#22c55e]">{type.maxDays} hari</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Calendar Tab */}
          {activeTab === 'calendar' && (
            <div className="p-6">
              <div className="bg-gray-50 rounded-xl p-8 text-center">
                <Icons.Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Kalender Cuti</h3>
                <p className="text-sm text-gray-500">Fitur kalender cuti akan segera tersedia</p>
              </div>
            </div>
          )}
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">Menunggu</span>
              <Icons.Clock className="w-5 h-5 text-yellow-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {leaveRequests.filter(r => r.status === 'pending').length}
            </p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">Disetujui Bulan Ini</span>
              <Icons.CheckCircle className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {leaveRequests.filter(r => r.status === 'approved').length}
            </p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">Ditolak Bulan Ini</span>
              <Icons.XCircle className="w-5 h-5 text-red-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {leaveRequests.filter(r => r.status === 'rejected').length}
            </p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">Total Hari Cuti</span>
              <Icons.Calendar className="w-5 h-5 text-blue-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {leaveRequests.reduce((sum, r) => sum + r.days, 0)}
            </p>
          </div>
        </div>

      </main>

      {/* New Leave Modal */}
      {showNewLeaveModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Ajukan Cuti Baru</h2>
              <button
                onClick={() => setShowNewLeaveModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Icons.X className="w-5 h-5" />
              </button>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Karyawan</label>
                <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22c55e]/20 focus:border-[#22c55e]">
                  <option value="">Pilih karyawan</option>
                  <option value="1">Budi Santoso</option>
                  <option value="2">Siti Aminah</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Jenis Cuti</label>
                <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22c55e]/20 focus:border-[#22c55e]">
                  {leaveTypes.map((type) => (
                    <option key={type.id} value={type.id}>{type.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Mulai</label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22c55e]/20 focus:border-[#22c55e]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Selesai</label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22c55e]/20 focus:border-[#22c55e]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Alasan</label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22c55e]/20 focus:border-[#22c55e]"
                  placeholder="Jelaskan alasan cuti..."
                />
              </div>

              <div className="flex items-center gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowNewLeaveModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-[#22c55e] text-white rounded-lg text-sm font-medium hover:bg-[#16a34a] transition-colors"
                >
                  Ajukan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  )
}
