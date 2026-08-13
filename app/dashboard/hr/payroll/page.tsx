'use client'

import React, { useState } from 'react'
import * as Icons from 'lucide-react'
import Link from 'next/link'

// ─── Payroll Data ─────────────────────────────────────────────────────
const payrollData = [
  {
    id: 'PAY-2026-10',
    period: 'Oktober 2026',
    payDate: '2026-10-25',
    status: 'paid',
    totalEmployees: 1235,
    totalAmount: 'Rp 4.850.000.000',
    processedBy: 'HR System',
    processedAt: '2026-10-25 10:30',
  },
  {
    id: 'PAY-2026-09',
    period: 'September 2026',
    payDate: '2026-09-25',
    status: 'paid',
    totalEmployees: 1230,
    totalAmount: 'Rp 4.820.000.000',
    processedBy: 'HR System',
    processedAt: '2026-09-25 10:15',
  },
  {
    id: 'PAY-2026-08',
    period: 'Agustus 2026',
    payDate: '2026-08-25',
    status: 'paid',
    totalEmployees: 1228,
    totalAmount: 'Rp 4.795.000.000',
    processedBy: 'HR System',
    processedAt: '2026-08-25 10:00',
  },
]

// ─── Employee Pay Detail Data ─────────────────────────────────────────────────────
const employeePayDetails = [
  {
    employeeId: 'EMP-2026-001',
    name: 'Siti Aminah',
    department: 'Produksi',
    position: 'Operator Jahit',
    basicSalary: 5500000,
    overtime: 750000,
    bonus: 500000,
    allowances: 1200000,
    deductions: 850000,
    netSalary: 7100000,
    bankName: 'BCA',
    bankAccount: '1234567890',
  },
  {
    employeeId: 'EMP-2026-002',
    name: 'Budi Santoso',
    department: 'Logistik',
    position: 'Koordinator Logistik',
    basicSalary: 7000000,
    overtime: 500000,
    bonus: 750000,
    allowances: 1500000,
    deductions: 1200000,
    netSalary: 8550000,
    bankName: 'Mandiri',
    bankAccount: '0987654321',
  },
  {
    employeeId: 'EMP-2026-003',
    name: 'Ratna Sari',
    department: 'Admin & HR',
    position: 'Staff Admin',
    basicSalary: 6000000,
    overtime: 0,
    bonus: 400000,
    allowances: 1000000,
    deductions: 750000,
    netSalary: 6650000,
    bankName: 'BNI',
    bankAccount: '1122334455',
  },
]

// ─── Payroll Page ─────────────────────────────────────────────────────
export default function PayrollPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'payslips' | 'settings'>('overview')
  const [selectedMonth, setSelectedMonth] = useState('2026-10')

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const calculateTotal = () => {
    return employeePayDetails.reduce((sum, emp) => sum + emp.netSalary, 0)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-700'
      case 'processing':
        return 'bg-yellow-100 text-yellow-700'
      case 'pending':
        return 'bg-gray-100 text-gray-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'paid': return 'Sudah Dibayar'
      case 'processing': return 'Sedang Diproses'
      case 'pending': return 'Menunggu'
      default: return status
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
                <h1 className="text-xl font-bold text-gray-900">Payroll & Gaji</h1>
                <p className="text-sm text-gray-500">Kelola penggajian dan slip gaji karyawan</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#22c55e]/20 focus:border-[#22c55e]"
              >
                <option value="2026-10">Oktober 2026</option>
                <option value="2026-09">September 2026</option>
                <option value="2026-08">Agustus 2026</option>
              </select>
              <button className="flex items-center gap-2 px-4 py-2 bg-[#22c55e] text-white rounded-lg text-sm font-medium hover:bg-[#16a34a] transition-colors">
                <Icons.FileText className="w-4 h-4" />
                Buat Payroll
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-6">

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">Total Payroll Bulan Ini</span>
              <Icons.DollarSign className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(calculateTotal())}</p>
            <p className="text-xs text-gray-500 mt-1">{employeePayDetails.length} karyawan</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">Rata-rata Gaji</span>
              <Icons.TrendingUp className="w-5 h-5 text-blue-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {formatCurrency(calculateTotal() / employeePayDetails.length)}
            </p>
            <p className="text-xs text-gray-500 mt-1">per karyawan</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">Lembur Bulan Ini</span>
              <Icons.Clock className="w-5 h-5 text-purple-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {formatCurrency(employeePayDetails.reduce((sum, emp) => sum + emp.overtime, 0))}
            </p>
            <p className="text-xs text-gray-500 mt-1">total lembur</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">Potongan</span>
              <Icons.MinusCircle className="w-5 h-5 text-red-500" />
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {formatCurrency(employeePayDetails.reduce((sum, emp) => sum + emp.deductions, 0))}
            </p>
            <p className="text-xs text-gray-500 mt-1">total potongan</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-3 text-sm font-medium transition-colors ${
                activeTab === 'overview'
                  ? 'text-[#22c55e] border-b-2 border-[#22c55e]'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Ringkasan Payroll
            </button>
            <button
              onClick={() => setActiveTab('payslips')}
              className={`px-6 py-3 text-sm font-medium transition-colors ${
                activeTab === 'payslips'
                  ? 'text-[#22c55e] border-b-2 border-[#22c55e]'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Slip Gaji Karyawan
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-6 py-3 text-sm font-medium transition-colors ${
                activeTab === 'settings'
                  ? 'text-[#22c55e] border-b-2 border-[#22c55e]'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Pengaturan
            </button>
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Riwayat Payroll</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        ID
                      </th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Periode
                      </th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Tanggal Bayar
                      </th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Karyawan
                      </th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Total
                      </th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {payrollData.map((payroll) => (
                      <tr key={payroll.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">{payroll.id}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{payroll.period}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{new Date(payroll.payDate).toLocaleDateString('id-ID')}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{payroll.totalEmployees}</td>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900">{payroll.totalAmount}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusBadge(payroll.status)}`}>
                            {getStatusLabel(payroll.status)}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <button className="text-sm text-[#22c55e] hover:underline">Lihat Detail</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Payslips Tab */}
          {activeTab === 'payslips' && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Slip Gaji Karyawan - {selectedMonth}</h3>
                <button className="flex items-center gap-2 px-4 py-2 bg-[#86efac] text-gray-900 rounded-lg text-sm font-medium hover:bg-[#4ade80] transition-colors">
                  <Icons.Download className="w-4 h-4" />
                  Download Semua
                </button>
              </div>

              <div className="space-y-4">
                {employeePayDetails.map((emp) => (
                  <div key={emp.employeeId} className="border border-gray-200 rounded-xl p-5 hover:shadow-sm transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-[#22c55e] flex items-center justify-center text-white font-semibold">
                          {emp.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{emp.name}</h4>
                          <p className="text-sm text-gray-500">{emp.employeeId} • {emp.department}</p>
                          <p className="text-sm text-gray-500">{emp.position}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-[#22c55e]">{formatCurrency(emp.netSalary)}</p>
                        <p className="text-xs text-gray-500">Gaji Bersih</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="bg-green-50 rounded-lg p-3">
                        <p className="text-xs text-gray-500">Gaji Pokok</p>
                        <p className="font-semibold text-gray-900">{formatCurrency(emp.basicSalary)}</p>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-3">
                        <p className="text-xs text-gray-500">Lembur</p>
                        <p className="font-semibold text-gray-900">{formatCurrency(emp.overtime)}</p>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-3">
                        <p className="text-xs text-gray-500">Tunjangan</p>
                        <p className="font-semibold text-gray-900">{formatCurrency(emp.allowances)}</p>
                      </div>
                      <div className="bg-yellow-50 rounded-lg p-3">
                        <p className="text-xs text-gray-500">Bonus</p>
                        <p className="font-semibold text-gray-900">{formatCurrency(emp.bonus)}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="text-sm text-gray-500">
                        <span className="font-medium text-gray-700">Bank:</span> {emp.bankName} • {emp.bankAccount}
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1">
                          <Icons.Eye className="w-4 h-4" />
                          Lihat Detail
                        </button>
                        <button className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1">
                          <Icons.Download className="w-4 h-4" />
                          Download PDF
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Pengaturan Payroll</h3>

              <div className="space-y-6">
                {/* Pay Schedule */}
                <div className="border border-gray-200 rounded-xl p-5">
                  <h4 className="font-medium text-gray-900 mb-3">Jadwal Pembayaran</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Tanggal Pembayaran Gaji</label>
                      <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22c55e]/20 focus:border-[#22c55e]">
                        <option value="25">Tanggal 25</option>
                        <option value="1">Tanggal 1</option>
                        <option value="15">Tanggal 15</option>
                        <option value="end">Akhir Bulan</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Potongan Tepat Waktu</label>
                      <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22c55e]/20 focus:border-[#22c55e]">
                        <option value="5">Tanggal 5</option>
                        <option value="10">Tanggal 10</option>
                        <option value="15">Tanggal 15</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Tax & Deductions */}
                <div className="border border-gray-200 rounded-xl p-5">
                  <h4 className="font-medium text-gray-900 mb-3">Pajak & Potongan</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">PPh 21</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">5% Progressive</span>
                        <input type="checkbox" defaultChecked className="w-4 h-4 text-[#22c55e] rounded" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">BPJS Kesehatan</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">2%</span>
                        <input type="checkbox" defaultChecked className="w-4 h-4 text-[#22c55e] rounded" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">BPJS Ketenagakerjaan</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">2%</span>
                        <input type="checkbox" defaultChecked className="w-4 h-4 text-[#22c55e] rounded" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Overtime Settings */}
                <div className="border border-gray-200 rounded-xl p-5">
                  <h4 className="font-medium text-gray-900 mb-3">Pengaturan Lembur</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Tarif Lembur Weekday</label>
                      <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22c55e]/20 focus:border-[#22c55e]">
                        <option value="1.5">1.5x</option>
                        <option value="2">2x</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Tarif Lembur Weekend</label>
                      <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22c55e]/20 focus:border-[#22c55e]">
                        <option value="2">2x</option>
                        <option value="3">3x</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Tarif Lembur Hari Libur</label>
                      <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#22c55e]/20 focus:border-[#22c55e]">
                        <option value="2">2x</option>
                        <option value="3">3x</option>
                        <option value="4">4x</option>
                      </select>
                    </div>
                  </div>
                </div>

                <button className="px-6 py-2 bg-[#22c55e] text-white rounded-lg text-sm font-medium hover:bg-[#16a34a] transition-colors">
                  Simpan Pengaturan
                </button>
              </div>
            </div>
          )}
        </div>

      </main>

    </div>
  )
}
