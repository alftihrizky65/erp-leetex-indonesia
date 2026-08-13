'use client'

import React, { useState } from 'react'
import * as Icons from 'lucide-react'
import Link from 'next/link'

// ─── Attendance Data ─────────────────────────────────────────────────────
const attendanceData = [
  {
    id: 1,
    employeeId: 'EMP-2026-001',
    name: 'Siti Aminah',
    avatar: 'SA',
    department: 'Produksi',
    date: '2026-10-27',
    clockIn: '07:58',
    clockOut: '17:05',
    breakStart: '12:00',
    breakEnd: '13:00',
    totalHours: '8.1',
    status: 'hadir',
    late: false,
    earlyLeave: false,
  },
  {
    id: 2,
    employeeId: 'EMP-2026-003',
    name: 'Ratna Sari',
    avatar: 'RS',
    department: 'Admin & HR',
    date: '2026-10-27',
    clockIn: '08:15',
    clockOut: '17:00',
    breakStart: '12:00',
    breakEnd: '13:00',
    totalHours: '7.8',
    status: 'hadir',
    late: true,
    earlyLeave: false,
  },
  {
    id: 3,
    employeeId: 'EMP-2026-005',
    name: 'Dewi Lestari',
    avatar: 'DL',
    department: 'Produksi',
    date: '2026-10-27',
    clockIn: '07:45',
    clockOut: '17:10',
    breakStart: '12:00',
    breakEnd: '13:00',
    totalHours: '8.4',
    status: 'hadir',
    late: false,
    earlyLeave: false,
  },
  {
    id: 4,
    employeeId: 'EMP-2026-002',
    name: 'Budi Santoso',
    avatar: 'BS',
    department: 'Logistik',
    date: '2026-10-27',
    clockIn: null,
    clockOut: null,
    breakStart: null,
    breakEnd: null,
    totalHours: '0',
    status: 'cuti',
    late: false,
    earlyLeave: false,
  },
  {
    id: 5,
    employeeId: 'EMP-2026-006',
    name: 'Agus Pratama',
    avatar: 'AP',
    department: 'Produksi',
    date: '2026-10-27',
    clockIn: null,
    clockOut: null,
    breakStart: null,
    breakEnd: null,
    totalHours: '0',
    status: 'absent',
    late: false,
    earlyLeave: false,
  },
]

// ─── Attendance Stats ─────────────────────────────────────────────────────
const attendanceStats = [
  { label: 'Hadir', value: 3, color: 'bg-green-500', textColor: 'text-green-600' },
  { label: 'Terlambat', value: 1, color: 'bg-yellow-500', textColor: 'text-yellow-600' },
  { label: 'Cuti', value: 1, color: 'bg-blue-500', textColor: 'text-blue-600' },
  { label: 'Tidak Hadir', value: 1, color: 'bg-red-500', textColor: 'text-red-600' },
]

// ─── Attendance Page ─────────────────────────────────────────────────────
export default function AttendancePage() {
  const [selectedDate, setSelectedDate] = useState('2026-10-27')
  const [viewMode, setViewMode] = useState<'list' | 'summary'>('list')

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'hadir':
        return 'bg-green-100 text-green-700'
      case 'cuti':
        return 'bg-blue-100 text-blue-700'
      case 'absent':
        return 'bg-red-100 text-red-700'
      case 'late':
        return 'bg-yellow-100 text-yellow-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusLabel = (status: string, late: boolean) => {
    if (status === 'hadir' && late) return 'Terlambat'
    if (status === 'hadir') return 'Hadir'
    if (status === 'cuti') return 'Cuti'
    if (status === 'absent') return 'Tidak Hadir'
    return status
  }

  const getFilteredData = () => {
    return attendanceData.filter(record => record.date === selectedDate)
  }

  const calculateTotalHours = () => {
    return attendanceData
      .filter(r => r.status === 'hadir')
      .reduce((sum, r) => sum + parseFloat(r.totalHours), 0)
      .toFixed(1)
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
                <h1 className="text-xl font-bold text-gray-900">Absensi Karyawan</h1>
                <p className="text-sm text-gray-500">Pantau kehadiran dan jam kerja karyawan</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#22c55e]/20 focus:border-[#22c55e]"
              />
              <button className="flex items-center gap-2 px-4 py-2 bg-[#22c55e] text-white rounded-lg text-sm font-medium hover:bg-[#16a34a] transition-colors">
                <Icons.Download className="w-4 h-4" />
                Ekspor
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-6">

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {attendanceStats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className={`text-2xl font-bold ${stat.textColor}`}>{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-full ${stat.color} bg-opacity-10 flex items-center justify-center`}>
                  <Icons.Users className={`w-6 h-6 ${stat.textColor}`} />
                </div>
              </div>
            </div>
          ))}

          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Jam Kerja</p>
                <p className="text-2xl font-bold text-gray-900">{calculateTotalHours()}h</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                <Icons.Clock className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* View Toggle */}
        <div className="bg-white rounded-xl border border-gray-200 mb-6">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setViewMode('list')}
              className={`px-6 py-3 text-sm font-medium transition-colors ${
                viewMode === 'list'
                  ? 'text-[#22c55e] border-b-2 border-[#22c55e]'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Daftar Absensi
            </button>
            <button
              onClick={() => setViewMode('summary')}
              className={`px-6 py-3 text-sm font-medium transition-colors ${
                viewMode === 'summary'
                  ? 'text-[#22c55e] border-b-2 border-[#22c55e]'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Ringkasan Bulanan
            </button>
          </div>

          {/* List View */}
          {viewMode === 'list' && (
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Karyawan
                      </th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Departemen
                      </th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Jam Masuk
                      </th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Jam Keluar
                      </th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Istirahat
                      </th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Total Jam
                      </th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {getFilteredData().map((record) => (
                      <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#22c55e] flex items-center justify-center text-white font-semibold">
                              {record.avatar}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{record.name}</p>
                              <p className="text-xs text-gray-500">{record.employeeId}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">{record.department}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1">
                            {record.clockIn ? (
                              <>
                                <Icons.Clock className="w-4 h-4 text-gray-400" />
                                <span className="text-sm text-gray-700">{record.clockIn}</span>
                                {record.late && (
                                  <span className="text-xs text-yellow-600 ml-1">Terlambat</span>
                                )}
                              </>
                            ) : (
                              <span className="text-sm text-gray-400">-</span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1">
                            {record.clockOut ? (
                              <>
                                <Icons.Clock className="w-4 h-4 text-gray-400" />
                                <span className="text-sm text-gray-700">{record.clockOut}</span>
                              </>
                            ) : (
                              <span className="text-sm text-gray-400">-</span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {record.breakStart && record.breakEnd ? (
                            `${record.breakStart} - ${record.breakEnd}`
                          ) : (
                            '-'
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-sm font-semibold text-gray-900">{record.totalHours}h</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusBadge(record.status)}`}>
                            {getStatusLabel(record.status, record.late)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Summary View */}
          {viewMode === 'summary' && (
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Monthly Overview */}
                <div className="border border-gray-200 rounded-xl p-5">
                  <h3 className="font-semibold text-gray-900 mb-4">Ringkasan Bulan Ini</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Total Hari Kerja</span>
                      <span className="font-semibold text-gray-900">22 hari</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Rata-rata Kehadiran</span>
                      <span className="font-semibold text-green-600">94.5%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Total Terlambat</span>
                      <span className="font-semibold text-yellow-600">12 kasus</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Total Cuti</span>
                      <span className="font-semibold text-blue-600">8 hari</span>
                    </div>
                  </div>
                </div>

                {/* Department Breakdown */}
                <div className="border border-gray-200 rounded-xl p-5">
                  <h3 className="font-semibold text-gray-900 mb-4">Kehadiran per Departemen</h3>
                  <div className="space-y-4">
                    {[
                      { dept: 'Produksi', present: 92, total: 100 },
                      { dept: 'Quality Control', present: 45, total: 50 },
                      { dept: 'Logistik', present: 28, total: 30 },
                      { dept: 'Admin & HR', present: 18, total: 20 },
                    ].map((item) => (
                      <div key={item.dept}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-gray-700">{item.dept}</span>
                          <span className="text-sm text-gray-500">{item.present}/{item.total}</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2">
                          <div
                            className="h-2 rounded-full bg-[#22c55e]"
                            style={{ width: `${(item.present / item.total) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Aksi Cepat</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <Icons.UserCheck className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-left">
                <p className="font-medium text-gray-900">Catat Kehadiran Manual</p>
                <p className="text-xs text-gray-500">Untuk karyawan yang lupa scan</p>
              </div>
            </button>

            <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Icons.FileEdit className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-left">
                <p className="font-medium text-gray-900">Koreksi Absensi</p>
                <p className="text-xs text-gray-500">Perbaiki data absensi salah</p>
              </div>
            </button>

            <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                <Icons.Send className="w-5 h-5 text-purple-600" />
              </div>
              <div className="text-left">
                <p className="font-medium text-gray-900">Kirim Pengingat</p>
                <p className="text-xs text-gray-500">Notifikasi karyawan belum hadir</p>
              </div>
            </button>
          </div>
        </div>

      </main>

    </div>
  )
}
