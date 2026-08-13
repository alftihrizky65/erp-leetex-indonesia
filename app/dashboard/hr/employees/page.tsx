'use client'

import React, { useState } from 'react'
import * as Icons from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

// ─── Employee Data ───────────────────────────────────────────────────────
const employees = [
  {
    id: 1,
    name: 'Siti Aminah',
    employeeId: 'EMP-2026-001',
    avatar: 'SA',
    department: 'Produksi',
    position: 'Operator Jahit',
    email: 'siti.aminaah@leetex.co.id',
    phone: '0812-3456-7890',
    joinDate: '2020-03-15',
    status: 'Hadir',
    statusColor: '#22c55e',
    kpi: { productivity: 95, quality: 98, attendance: 100 },
  },
  {
    id: 2,
    name: 'Budi Santoso',
    employeeId: 'EMP-2026-002',
    avatar: 'BS',
    department: 'Logistik',
    position: 'Koordinator Logistik',
    email: 'budi.santoso@leetex.co.id',
    phone: '0812-3456-7891',
    joinDate: '2019-07-20',
    status: 'Cuti',
    statusColor: '#f59e0b',
    kpi: { productivity: 88, quality: 92, attendance: 85 },
  },
  {
    id: 3,
    name: 'Ratna Sari',
    employeeId: 'EMP-2026-003',
    avatar: 'RS',
    department: 'Admin & HR',
    position: 'Staff Admin',
    email: 'ratna.sari@leetex.co.id',
    phone: '0812-3456-7892',
    joinDate: '2021-01-10',
    status: 'Hadir',
    statusColor: '#22c55e',
    kpi: { productivity: 92, quality: 95, attendance: 98 },
  },
  {
    id: 4,
    name: 'Hendra Wijaya',
    employeeId: 'EMP-2026-004',
    avatar: 'HW',
    department: 'Quality Control',
    position: 'Inspector QC',
    email: 'hendra.wijaya@leetex.co.id',
    phone: '0812-3456-7893',
    joinDate: '2018-09-05',
    status: 'Keluar',
    statusColor: '#9ca3af',
    kpi: { productivity: 90, quality: 96, attendance: 95 },
  },
  {
    id: 5,
    name: 'Dewi Lestari',
    employeeId: 'EMP-2026-005',
    avatar: 'DL',
    department: 'Produksi',
    position: 'Operator Potong',
    email: 'dewi.lestari@leetex.co.id',
    phone: '0812-3456-7894',
    joinDate: '2022-02-14',
    status: 'Hadir',
    statusColor: '#22c55e',
    kpi: { productivity: 94, quality: 97, attendance: 99 },
  },
  {
    id: 6,
    name: 'Agus Pratama',
    employeeId: 'EMP-2026-006',
    avatar: 'AP',
    department: 'Produksi',
    position: 'Operator Obras',
    email: 'agus.pratama@leetex.co.id',
    phone: '0812-3456-7895',
    joinDate: '2021-06-18',
    status: 'Hadir',
    statusColor: '#22c55e',
    kpi: { productivity: 91, quality: 93, attendance: 96 },
  },
]

// ─── KPI Card Component ─────────────────────────────────────────────────────
const KPICard: React.FC<{
  productivity: number
  quality: number
  attendance: number
}> = ({ productivity, quality, attendance }) => {
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-50'
    if (score >= 75) return 'text-yellow-600 bg-yellow-50'
    return 'text-red-600 bg-red-50'
  }

  return (
    <div className="grid grid-cols-3 gap-2 text-xs">
      <div className={`px-2 py-1 rounded ${getScoreColor(productivity)}`}>
        <div className="text-gray-500 text-[10px]">Produktivitas</div>
        <div className="font-bold">{productivity}%</div>
      </div>
      <div className={`px-2 py-1 rounded ${getScoreColor(quality)}`}>
        <div className="text-gray-500 text-[10px]">Kualitas</div>
        <div className="font-bold">{quality}%</div>
      </div>
      <div className={`px-2 py-1 rounded ${getScoreColor(attendance)}`}>
        <div className="text-gray-500 text-[10px]">Kehadiran</div>
        <div className="font-bold">{attendance}%</div>
      </div>
    </div>
  )
}

// ─── Employees Page ─────────────────────────────────────────────────────
export default function EmployeesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [departmentFilter, setDepartmentFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch = emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         emp.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         emp.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDepartment = departmentFilter === 'all' || emp.department === departmentFilter
    const matchesStatus = statusFilter === 'all' || emp.status === statusFilter
    return matchesSearch && matchesDepartment && matchesStatus
  })

  const departments = ['all', ...Array.from(new Set(employees.map(e => e.department)))]

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
                <h1 className="text-xl font-bold text-gray-900">Kelola Karyawan</h1>
                <p className="text-sm text-gray-500">Daftar semua karyawan perusahaan</p>
              </div>
            </div>

            <Link
              href="/dashboard/hr/employees/new"
              className="flex items-center gap-2 px-4 py-2 bg-[#22c55e] text-white rounded-lg text-sm font-medium hover:bg-[#16a34a] transition-colors"
            >
              <Icons.UserPlus className="w-4 h-4" />
              Tambah Karyawan
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-6">

        {/* Filters */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            {/* Search */}
            <div className="relative flex-1 min-w-[200px]">
              <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari karyawan..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#22c55e]/20 focus:border-[#22c55e]"
              />
            </div>

            {/* Department Filter */}
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#22c55e]/20 focus:border-[#22c55e]"
            >
              <option value="all">Semua Departemen</option>
              {departments.filter(d => d !== 'all').map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#22c55e]/20 focus:border-[#22c55e]"
            >
              <option value="all">Semua Status</option>
              <option value="Hadir">Hadir</option>
              <option value="Cuti">Cuti</option>
              <option value="Keluar">Keluar</option>
            </select>

            {/* Stats */}
            <div className="ml-auto text-sm text-gray-500">
              Total: <span className="font-semibold text-gray-900">{filteredEmployees.length}</span> karyawan
            </div>
          </div>
        </div>

        {/* Employee Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEmployees.map((emp) => (
            <div key={emp.id} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#22c55e] flex items-center justify-center text-white font-semibold">
                    {emp.avatar}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{emp.name}</h3>
                    <p className="text-xs text-gray-500">{emp.employeeId}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: emp.statusColor }} />
                  <span className="text-xs text-gray-600">{emp.status}</span>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Icons.Building className="w-4 h-4 text-gray-400" />
                  <span>{emp.department}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Icons.Briefcase className="w-4 h-4 text-gray-400" />
                  <span>{emp.position}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Icons.Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-xs">{emp.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Icons.Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-xs">Bergabung: {new Date(emp.joinDate).toLocaleDateString('id-ID')}</span>
                </div>
              </div>

              {/* KPI Section */}
              <div className="mb-4">
                <p className="text-xs font-semibold text-gray-500 mb-2">KPI INDIVIDU</p>
                <KPICard
                  productivity={emp.kpi.productivity}
                  quality={emp.kpi.quality}
                  attendance={emp.kpi.attendance}
                />
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                <Link
                  href={`/dashboard/hr/employees/${emp.id}`}
                  className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Icons.Eye className="w-4 h-4" />
                  Detail
                </Link>
                <Link
                  href={`/dashboard/hr/employees/${emp.id}/edit`}
                  className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm text-white bg-[#22c55e] rounded-lg hover:bg-[#16a34a] transition-colors"
                >
                  <Icons.Pencil className="w-4 h-4" />
                  Edit
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredEmployees.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <Icons.Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Tidak ada karyawan ditemukan</h3>
            <p className="text-sm text-gray-500 mb-4">Coba sesuaikan filter atau pencarian Anda</p>
            <Link
              href="/dashboard/hr/employees/new"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#22c55e] text-white rounded-lg text-sm font-medium hover:bg-[#16a34a] transition-colors"
            >
              <Icons.UserPlus className="w-4 h-4" />
              Tambah Karyawan Baru
            </Link>
          </div>
        )}

      </main>

    </div>
  )
}
