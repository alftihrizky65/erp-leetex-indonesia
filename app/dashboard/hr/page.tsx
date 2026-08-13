'use client'

import React, { useState } from 'react'
import * as Icons from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

// ─── KPI Cards Data ───────────────────────────────────────────────────────
const kpiCards = [
  {
    icon: <Icons.Users className="w-6 h-6" />,
    label: 'TOTAL KARYAWAN',
    value: '1,240',
    description: '+12% dari kuartal lalu',
    descriptionColor: 'text-[#22c55e]',
    bgColor: '#dcfce7',
    iconColor: '#22c55e',
  },
  {
    icon: <Icons.UserCheck className="w-6 h-6" />,
    label: 'HADIR HARI INI',
    value: '98%',
    description: 'Di atas benchmark',
    descriptionColor: 'text-[#22c55e]',
    bgColor: '#dcfce7',
    iconColor: '#22c55e',
  },
  {
    icon: <Icons.CalendarCheck className="w-6 h-6" />,
    label: 'PERMINTAAN CUTI',
    value: '12',
    description: 'Menunggu review',
    descriptionColor: 'text-[#f59e0b]',
    bgColor: '#fef3c7',
    iconColor: '#f59e0b',
  },
  {
    icon: <Icons.DollarSign className="w-6 h-6" />,
    label: 'PAYROLL BULANAN',
    value: 'Rp 450M',
    description: 'Pembayaran berikut dalam 4 hari',
    descriptionColor: 'text-gray-500',
    bgColor: '#f3f4f6',
    iconColor: '#6b7280',
  },
]

// ─── Attendance Trend Data ───────────────────────────────────────────────
const attendanceData = [
  { day: 'Sen', present: 92, absent: 8 },
  { day: 'Sel', present: 95, absent: 5 },
  { day: 'Rab', present: 88, absent: 12 },
  { day: 'Kam', present: 96, absent: 4 },
  { day: 'Jum', present: 94, absent: 6 },
  { day: 'Sab', present: 60, absent: 40 },
  { day: 'Min', present: 45, absent: 55 },
]

// ─── Department Distribution Data ───────────────────────────────────────────────
const departments = [
  { name: 'Produksi', count: 850, color: '#22c55e' },
  { name: 'Quality Control', count: 210, color: '#86efac' },
  { name: 'Logistik', count: 115, color: '#bbf7d0' },
  { name: 'Admin & HR', count: 65, color: '#dcfce7' },
]

// ─── Employee Activity Data ───────────────────────────────────────────────
const employees = [
  {
    id: 1,
    name: 'Siti Aminah',
    avatar: 'SA',
    department: 'Produksi (Garis A)',
    position: 'Operator Jahit',
    status: 'Hadir',
    statusColor: '#22c55e',
    lastAction: '07:58',
    kpi: { productivity: 95, quality: 98, attendance: 100 },
  },
  {
    id: 2,
    name: 'Budi Santoso',
    avatar: 'BS',
    department: 'Logistik',
    position: 'Koordinator Logistik',
    status: 'Cuti',
    statusColor: '#f59e0b',
    lastAction: '24 Okt 2026',
    kpi: { productivity: 88, quality: 92, attendance: 85 },
  },
  {
    id: 3,
    name: 'Ratna Sari',
    avatar: 'RS',
    department: 'Admin',
    position: 'Staff Admin',
    status: 'Hadir',
    statusColor: '#22c55e',
    lastAction: '08:15',
    kpi: { productivity: 92, quality: 95, attendance: 98 },
  },
  {
    id: 4,
    name: 'Hendra Wijaya',
    avatar: 'HW',
    department: 'Quality Control',
    position: 'Inspector QC',
    status: 'Keluar',
    statusColor: '#9ca3af',
    lastAction: '16:30 (26 Okt)',
    kpi: { productivity: 90, quality: 96, attendance: 95 },
  },
]

// ─── Attendance Trend Chart Component ─────────────────────────────────────
const AttendanceTrendChart: React.FC = () => {
  const maxValue = 100
  const chartHeight = 180
  const chartWidth = 500
  const padding = { top: 20, right: 20, bottom: 30, left: 40 }
  const innerWidth = chartWidth - padding.left - padding.right
  const innerHeight = chartHeight - padding.top - padding.bottom

  const barWidth = innerWidth / attendanceData.length / 3
  const gap = barWidth

  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-[180px]">
      {/* Grid lines */}
      {[0, 25, 50, 75, 100].map((value) => {
        const y = padding.top + innerHeight - (value / maxValue) * innerHeight
        return (
          <g key={value}>
            <line
              x1={padding.left}
              y1={y}
              x2={chartWidth - padding.right}
              y2={y}
              stroke="#e5e7eb"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
            <text
              x={padding.left - 10}
              y={y + 4}
              textAnchor="end"
              fontSize="11"
              fill="#9ca3af"
            >
              {value}%
            </text>
          </g>
        )
      })}

      {/* Bars */}
      {attendanceData.map((data, index) => {
        const x = padding.left + index * (barWidth * 2 + gap) + barWidth / 2
        const presentHeight = (data.present / maxValue) * innerHeight
        const absentHeight = (data.absent / maxValue) * innerHeight

        return (
          <g key={data.day}>
            {/* Present bar */}
            <rect
              x={x}
              y={padding.top + innerHeight - presentHeight}
              width={barWidth}
              height={presentHeight}
              fill="#22c55e"
              rx="2"
            />
            {/* Day label */}
            <text
              x={x + barWidth / 2}
              y={chartHeight - 5}
              textAnchor="middle"
              fontSize="11"
              fill="#6b7280"
            >
              {data.day}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

// ─── HR Page ─────────────────────────────────────────────────────────────
export default function HRPage() {
  const [timeRange, setTimeRange] = useState('20 Okt 2026 - 27 Okt 2026')
  const [showKPI, setShowKPI] = useState(false)

  return (
    <div className="min-h-screen bg-white">

      {/* Top Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo & Branding */}
            <div className="flex items-center gap-3">
              <Image
                src="/img/images-removebg-preview.png"
                alt="Leetex Logo"
                width={36}
                height={36}
                className="object-contain"
              />
              <h1 className="text-xl font-bold text-[#22c55e]">PT Leetex Garment Indonesia</h1>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
              >
                <Icons.ArrowLeft className="w-4 h-4" />
                Kembali ke Dashboard
              </Link>

              <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Icons.Bell className="w-5 h-5 text-gray-600" />
              </button>

              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Icons.Settings className="w-5 h-5 text-gray-600" />
              </button>

              <div className="w-9 h-9 rounded-full bg-[#22c55e] flex items-center justify-center text-white font-semibold text-sm">
                AD
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-6">

        {/* Page Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Ringkasan Beranda</h2>
          <p className="text-sm text-gray-500">Pemantauan kinerja dan kehadiran personil secara real-time.</p>
        </div>

        {/* Action Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard/hr/employees/new"
              className="flex items-center gap-2 px-4 py-2 bg-[#22c55e] text-white rounded-lg text-sm font-medium hover:bg-[#16a34a] transition-colors"
            >
              <Icons.UserPlus className="w-4 h-4" />
              Tambah Karyawan Baru
            </Link>
            <Link
              href="/dashboard/hr/payroll"
              className="flex items-center gap-2 px-4 py-2 bg-[#86efac] text-gray-900 rounded-lg text-sm font-medium hover:bg-[#4ade80] transition-colors"
            >
              <Icons.FileText className="w-4 h-4" />
              Buat Payroll
            </Link>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg">
            <Icons.Calendar className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">{timeRange}</span>
            <Icons.ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {kpiCards.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: card.bgColor }}
                >
                  <div style={{ color: card.iconColor }}>{card.icon}</div>
                </div>
              </div>
              <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1">
                {card.label}
              </p>
              <p className="text-2xl font-bold text-gray-900 mb-1">{card.value}</p>
              <p className={`text-xs ${card.descriptionColor}`}>{card.description}</p>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

          {/* Attendance Trend */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="p-5 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Tren Kehadiran</h3>
                <div className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-lg">
                  <span className="text-sm text-gray-600">7 Hari Terakhir</span>
                  <Icons.ChevronDown className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>
            <div className="p-5">
              <div className="h-[180px]">
                <AttendanceTrendChart />
              </div>
            </div>
          </div>

          {/* Department Distribution */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
            <h3 className="font-semibold text-gray-900 mb-4">Distribusi Departemen</h3>

            <div className="space-y-4">
              {departments.map((dept) => {
                const maxCount = Math.max(...departments.map(d => d.count))
                const percentage = (dept.count / maxCount) * 100

                return (
                  <div key={dept.name}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">{dept.name}</span>
                      <span className="text-sm font-bold" style={{ color: dept.color }}>
                        {dept.count} Karyawan
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div
                        className="h-2 rounded-full transition-all"
                        style={{
                          width: `${percentage}%`,
                          backgroundColor: dept.color,
                        }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>

            <Link
              href="/dashboard/hr/employees"
              className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-[#22c55e] hover:underline"
            >
              Lihat Bagan Organisasi Detail <Icons.ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>

        {/* Employee Activity Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm mb-6">
          <div className="p-5 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Aktivitas Karyawan Terbaru</h3>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Cari aktivitas..."
                    className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#22c55e]/20 focus:border-[#22c55e] w-64"
                  />
                </div>
                <button className="px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                  Filter
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#f0fdf4] border-b border-gray-200">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Nama
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Departemen
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Jabatan
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    KPI
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Waktu Aksi Terakhir
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {employees.map((emp) => (
                  <tr key={emp.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#22c55e] flex items-center justify-center text-white text-xs font-semibold">
                          {emp.avatar}
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-900">{emp.name}</span>
                          <Link
                            href={`/dashboard/hr/employees/${emp.id}`}
                            className="block text-xs text-[#22c55e] hover:underline"
                          >
                            Lihat Profil
                          </Link>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{emp.department}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{emp.position}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: emp.statusColor }}
                        />
                        <span className="text-sm text-gray-700">{emp.status}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-medium" style={{
                          color: emp.kpi.productivity >= 90 ? '#22c55e' : emp.kpi.productivity >= 75 ? '#f59e0b' : '#ef4444'
                        }}>
                          {emp.kpi.productivity}%
                        </span>
                        <button
                          onClick={() => setShowKPI(showKPI === emp.id ? null : emp.id)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <Icons.BarChart className="w-4 h-4" />
                        </button>
                      </div>
                      {showKPI === emp.id && (
                        <div className="mt-2 text-xs space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500">Produktivitas:</span>
                            <span className={`font-medium ${emp.kpi.productivity >= 90 ? 'text-green-600' : emp.kpi.productivity >= 75 ? 'text-yellow-600' : 'text-red-600'}`}>
                              {emp.kpi.productivity}%
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500">Kualitas:</span>
                            <span className={`font-medium ${emp.kpi.quality >= 90 ? 'text-green-600' : emp.kpi.quality >= 75 ? 'text-yellow-600' : 'text-red-600'}`}>
                              {emp.kpi.quality}%
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500">Kehadiran:</span>
                            <span className={`font-medium ${emp.kpi.attendance >= 90 ? 'text-green-600' : emp.kpi.attendance >= 75 ? 'text-yellow-600' : 'text-red-600'}`}>
                              {emp.kpi.attendance}%
                            </span>
                          </div>
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">{emp.lastAction}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <Link
                          href={`/dashboard/hr/employees/${emp.id}/edit`}
                          className="p-1 hover:bg-gray-100 rounded"
                          title="Edit"
                        >
                          <Icons.Pencil className="w-4 h-4 text-gray-400" />
                        </Link>
                        <button className="p-1 hover:bg-gray-100 rounded" title="More">
                          <Icons.MoreVertical className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
            <p className="text-sm text-gray-500">Menampilkan 4 dari 1,240 karyawan</p>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-400 cursor-not-allowed" disabled>
                Sebelumnya
              </button>
              <Link
                href="/dashboard/hr/employees"
                className="px-3 py-1.5 bg-[#22c55e] text-white rounded-lg text-sm hover:bg-[#16a34a] transition-colors"
              >
                Lihat Semua
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/dashboard/hr/employees"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
          >
            Kelola Karyawan
          </Link>
          <Link
            href="/dashboard/hr/leave"
            className="px-4 py-2 bg-[#22c55e] text-white rounded-lg text-sm font-medium hover:bg-[#16a34a] transition-colors"
          >
            Kelola Cuti
          </Link>
          <Link
            href="/dashboard/hr/attendance"
            className="flex items-center gap-2 px-4 py-2 bg-[#86efac] text-gray-900 rounded-lg text-sm font-medium hover:bg-[#4ade80] transition-colors"
          >
            <Icons.UserCheck className="w-4 h-4" />
            Absensi
          </Link>
          <Link
            href="/dashboard/hr/schedules"
            className="flex items-center gap-2 px-4 py-2 bg-[#bbf7d0] text-gray-900 rounded-lg text-sm font-medium hover:bg-[#86efac] transition-colors"
          >
            <Icons.Calendar className="w-4 h-4" />
            Jadwal Shift
          </Link>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
            <Icons.Download className="w-4 h-4" />
            Ekspor Laporan
          </button>
        </div>

      </main>

    </div>
  )
}
