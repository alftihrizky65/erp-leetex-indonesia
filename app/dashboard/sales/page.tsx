'use client'

import React, { useState } from 'react'
import * as Icons from 'lucide-react'

// ─── KPI Cards Data ───────────────────────────────────────────────────────
const kpiCards = [
  {
    icon: <Icons.ShoppingCart className="w-5 h-5 text-[#2E7D32]" />,
    label: 'TOTAL PENJUALAN (YTD)',
    value: 'Rp 4.280.500.000',
    trend: '+12,5%',
    trendUp: true,
    bgColor: '#e8f5e9',
  },
  {
    icon: <Icons.ShoppingBag className="w-5 h-5 text-[#1976D2]" />,
    label: 'PESANAN AKTIF',
    value: '142',
    trend: null,
    trendUp: true,
    bgColor: '#e3f2fd',
  },
  {
    icon: <Icons.TrendingUp className="w-5 h-5 text-[#C62828]" />,
    label: 'NILAI PIPELINE',
    value: 'Rp 1.150.000.000',
    trend: null,
    trendUp: true,
    bgColor: '#ffebee',
  },
  {
    icon: <Icons.Target className="w-5 h-5 text-[#2E7D32]" />,
    label: 'TINGKAT KONVERSI',
    value: '28,4%',
    trend: '+2,1%',
    trendUp: true,
    bgColor: '#e8f5e9',
  },
]

// ─── Recent Sales Orders Data ───────────────────────────────────────────────
const recentOrders = [
  { id: '#ORD-2026-001', customer: 'IndoTextile Corp', date: '12 Okt 2026', amount: 'Rp 45.200.000', status: 'Dikirim' },
  { id: '#ORD-2026-002', customer: 'Global Apparel Ltd', date: '14 Okt 2026', amount: 'Rp 12.800.000', status: 'Diproses' },
  { id: '#ORD-2026-003', customer: 'Bali Boutique', date: '15 Okt 2026', amount: 'Rp 8.450.000', status: 'Tertunda' },
  { id: '#ORD-2026-004', customer: 'Jakarta Fabrics Co', date: '16 Okt 2026', amount: 'Rp 21.000.000', status: 'Diproses' },
  { id: '#ORD-2026-005', customer: 'Sumatra Silk Traders', date: '18 Okt 2026', amount: 'Rp 56.700.000', status: 'Dibatalkan' },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Dikirim':
      return 'bg-[#4caf50] text-white'
    case 'Diproses':
      return 'bg-[#2196f3] text-white'
    case 'Tertunda':
      return 'bg-[#ffc107] text-white'
    case 'Dibatalkan':
      return 'bg-[#f44336] text-white'
    default:
      return 'bg-gray-200 text-gray-700'
  }
}

// ─── Top Customers Data ─────────────────────────────────────────────────────
const topCustomers = [
  { code: 'IC', name: 'IndoTextile Corp', value: 'Rp 1,2M', percentage: 100 },
  { code: 'GA', name: 'Global Apparel Ltd', value: 'Rp 850Jt', percentage: 70 },
  { code: 'BB', name: 'Bali Boutique', value: 'Rp 420Jt', percentage: 35 },
]

// ─── Sales Pipeline Data ─────────────────────────────────────────────────────
const salesPipeline = [
  { stage: 'Prospek Berkualitas', value: 'Rp 240Jt', opportunities: 3, percentage: 26 },
  { stage: 'Proposal Dikirim', value: 'Rp 910Jt', opportunities: 4, percentage: 100 },
  { stage: 'Negosiasi', value: 'Rp 400Jt', opportunities: 4, percentage: 44 },
]

// ─── KPI Card Component ─────────────────────────────────────────────────────
const KPICard: React.FC<{
  icon: React.ReactNode
  label: string
  value: string
  trend?: string | null
  trendUp?: boolean
  bgColor: string
}> = ({ icon, label, value, trend, trendUp, bgColor }) => (
  <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
    <div className="flex items-center justify-between mb-3">
      <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: bgColor }}>
        {icon}
      </div>
      {trend && (
        <span className={`text-xs font-semibold ${trendUp ? 'text-green-600' : 'text-red-500'}`}>
          {trend}
        </span>
      )}
    </div>
    <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1">{label}</p>
    <p className="text-2xl font-bold text-gray-900">{value}</p>
  </div>
)

// ─── Horizontal Bar Component ───────────────────────────────────────────────
const HorizontalBar: React.FC<{
  label: string
  sublabel?: string
  value: string
  percentage: number
  color?: string
}> = ({ label, sublabel, value, percentage, color = '#2E7D32' }) => (
  <div className="flex items-center gap-3 mb-3 last:mb-0">
    <div className="flex-1">
      <p className="text-sm font-medium text-gray-900 mb-1">{label}</p>
      <div className="w-full bg-gray-100 rounded-full h-2">
        <div
          className="h-2 rounded-full"
          style={{
            width: `${percentage}%`,
            backgroundColor: color,
          }}
        />
      </div>
      {sublabel && (
        <p className="text-xs text-gray-500 mt-1">{sublabel}</p>
      )}
    </div>
    <p className="text-sm font-semibold text-gray-900 whitespace-nowrap">{value}</p>
  </div>
)

// ─── Sales Page ─────────────────────────────────────────────────────────────
export default function SalesPage() {
  const [timeFilter, setTimeFilter] = useState('12m')

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard Penjualan</h1>
            <p className="text-sm text-gray-500 mt-1">Lacak kinerja penjualan dan metrik penjualan Anda</p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/20 focus:border-[#2E7D32]"
            >
              <option value="12m">12 Bulan Terakhir</option>
              <option value="30d">30 Hari Terakhir</option>
              <option value="90d">90 Hari Terakhir</option>
              <option value="ytd">Year to Date</option>
            </select>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#28a745] text-white rounded-lg text-sm font-medium hover:bg-[#218838] transition-colors">
              <Icons.Download className="w-4 h-4" />
              Ekspor Laporan
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 space-y-6">

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpiCards.map((card, index) => (
            <KPICard key={index} {...card} />
          ))}
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* Recent Sales Orders - Left (3/5) */}
          <div className="lg:col-span-3 bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="p-5 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-gray-900">Pesanan Penjualan Terbaru</h2>
                <button className="text-sm text-[#2E7D32] font-medium hover:underline">
                  Lihat Semua
                </button>
              </div>
            </div>
            <div className="p-5">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider py-2 px-2">ID Pesanan</th>
                      <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider py-2 px-2">Pelanggan</th>
                      <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider py-2 px-2">Tanggal Pesanan</th>
                      <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider py-2 px-2">Jumlah</th>
                      <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider py-2 px-2">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                        <td className="py-3 px-2 text-sm font-medium text-gray-900">{order.id}</td>
                        <td className="py-3 px-2 text-sm text-gray-700">{order.customer}</td>
                        <td className="py-3 px-2 text-sm text-gray-500">{order.date}</td>
                        <td className="py-3 px-2 text-sm text-gray-900 text-right font-medium">{order.amount}</td>
                        <td className="py-3 px-2">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Column (2/5) - Top Customers & Sales Pipeline */}
          <div className="lg:col-span-2 space-y-6">

            {/* Top Customers */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
              <h2 className="font-semibold text-gray-900 mb-4">Pelanggan Teratas</h2>
              {topCustomers.map((customer) => (
                <HorizontalBar
                  key={customer.code}
                  label={`${customer.code} - ${customer.name}`}
                  value={customer.value}
                  percentage={customer.percentage}
                />
              ))}
            </div>

            {/* Sales Pipeline */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
              <h2 className="font-semibold text-gray-900 mb-4">Pipeline Penjualan</h2>
              {salesPipeline.map((stage) => (
                <HorizontalBar
                  key={stage.stage}
                  label={stage.stage}
                  sublabel={`${stage.opportunities} ${stage.opportunities === 1 ? 'Peluang' : 'Peluang'}`}
                  value={stage.value}
                  percentage={stage.percentage}
                />
              ))}
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 pt-6 mt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-gray-900">PT Leetex Garment Indonesia</p>
              <p className="text-xs text-gray-500">© 2026 TextileERP Solutions. Hak Cipta Dilindungi.</p>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <a href="#" className="hover:text-gray-900 transition-colors">Kebijakan Privasi</a>
              <a href="#" className="hover:text-gray-900 transition-colors">Ketentuan Layanan</a>
              <a href="#" className="hover:text-gray-900 transition-colors">Dukungan</a>
              <a href="#" className="hover:text-gray-900 transition-colors">Dokumentasi</a>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
