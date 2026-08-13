'use client'

import React, { useState } from 'react'
import * as Icons from 'lucide-react'
import { StatusBadge } from '@/components/ui/StatusBadge'

// ─── Production Output Bar Chart ─────────────────────────────────────────────────
const productionData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
  target: [45000, 48000, 46000, 50000, 52000, 55000, 58000, 60000, 62000, 65000, 68000, 70000],
  actual: [42000, 46500, 44500, 48500, 51000, 53000, 56000, 58500, 61000, 63500, 66000, 68500],
}

const ProductionBarChart: React.FC = () => {
  const W = 720
  const H = 280
  const padL = 65
  const padR = 16
  const padT = 16
  const padB = 45
  const chartW = W - padL - padR
  const chartH = H - padT - padB

  const allVals = [...productionData.target, ...productionData.actual]
  const maxVal = Math.ceil(Math.max(...allVals) / 10000) * 10000

  const barWidth = (chartW / productionData.labels.length) * 0.35
  const gapWidth = (chartW / productionData.labels.length) * 0.15

  const toY = (v: number) => padT + chartH - (v / maxVal) * chartH

  const formatValue = (v: number) => `${(v / 1000).toFixed(0)}k`

  // Y-axis ticks
  const yTicks = [0, maxVal * 0.25, maxVal * 0.5, maxVal * 0.75, maxVal].map(v => Math.round(v))

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
      {/* Y-axis grid lines */}
      {yTicks.map((t, idx) => {
        const y = toY(t)
        if (idx === 0) return null
        return (
          <g key={t}>
            <line x1={padL} y1={y} x2={W - padR} y2={y} stroke="#e8f5e9" strokeWidth="1" />
            <text x={padL - 8} y={y + 3} textAnchor="end" fontSize="10" fill="#898781">
              {formatValue(t)}
            </text>
          </g>
        )
      })}

      {/* Baseline */}
      <line x1={padL} y1={padT + chartH} x2={W - padR} y2={padT + chartH} stroke="#c3c2b7" strokeWidth="2" />

      {/* Bars - Grouped by month */}
      {productionData.labels.map((label, i) => {
        const x = padL + i * (chartW / productionData.labels.length) + (chartW / productionData.labels.length / 2)
        const targetH = toY(productionData.target[i])
        const actualH = toY(productionData.actual[i])

        return (
          <g key={label}>
            {/* Target Bar - Light Green */}
            <rect
              x={x - barWidth - gapWidth / 2}
              y={targetH}
              width={barWidth}
              height={padT + chartH - targetH}
              fill="#C8E6C9"
              rx="2"
            />
            {/* Actual Bar - Dark Green */}
            <rect
              x={x + gapWidth / 2}
              y={actualH}
              width={barWidth}
              height={padT + chartH - actualH}
              fill="#2E7D32"
              rx="2"
            />
            {/* X-axis label */}
            <text x={x} y={H - 10} textAnchor="middle" fontSize="10" fill="#898781">
              {label}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

// ─── Work Order Status Chart ──────────────────────────────────────────────────────
const workOrderStatus = [
  { label: 'Selesai', value: 89, color: '#2E7D32' },
  { label: 'Diproses', value: 45, color: '#4CAF50' },
  { label: 'Tertunda', value: 12, color: '#FFC107' },
  { label: 'Pending', value: 10, color: '#81C784' },
]

const WorkOrderStatusChart: React.FC = () => {
  const W = 340
  const H = 200
  const padL = 80
  const padR = 60
  const padT = 16
  const padB = 16
  const chartW = W - padL - padR
  const chartH = H - padT - padB

  const maxVal = Math.max(...workOrderStatus.map(s => s.value))
  const barHeight = (chartH / workOrderStatus.length) * 0.6
  const gap = (chartH / workOrderStatus.length) * 0.4

  const toX = (v: number) => (v / maxVal) * chartW

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
      {workOrderStatus.map((item, i) => {
        const y = padT + i * (barHeight + gap) + gap / 2
        const barW = toX(item.value)

        return (
          <g key={item.label}>
            {/* Background bar */}
            <rect x={padL} y={y} width={chartW} height={barHeight} fill="#f5f5f5" rx="3" />
            {/* Value bar */}
            <rect x={padL} y={y} width={barW} height={barHeight} fill={item.color} rx="3" />
            {/* Label */}
            <text x={padL - 10} y={y + barHeight / 2 + 4} textAnchor="end" fontSize="11" fill="#52514e">
              {item.label}
            </text>
            {/* Value */}
            <text x={padL + barW + 8} y={y + barHeight / 2 + 4} textAnchor="start" fontSize="11" fontWeight="600" fill="#0b0b0b">
              {item.value}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

// ─── Production Line Efficiency Chart ────────────────────────────────────────────
const lineEfficiency = [
  { line: 'Line 1', efficiency: 94, target: 92 },
  { line: 'Line 2', efficiency: 88, efficiency2: 91, target: 92 },
  { line: 'Line 3', efficiency: 96, target: 92 },
  { line: 'Line 4', efficiency: 82, efficiency2: 86, target: 92 },
  { line: 'Line 5', efficiency: 90, target: 92 },
]

const LineEfficiencyChart: React.FC = () => {
  const W = 100
  const maxW = 100
  const gap = 12

  return (
    <div className="space-y-3">
      {lineEfficiency.map((item) => (
        <div key={item.line} className="flex items-center gap-3">
          <div className="w-16 text-xs font-medium text-gray-700 shrink-0">{item.line}</div>
          <div className="flex-1 relative h-6">
            {/* Target marker */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-gray-300"
              style={{ left: `${item.target}%` }}
            />
            {/* Efficiency bar */}
            <div
              className="h-full rounded-l-full transition-all duration-500"
              style={{
                width: `${item.efficiency}%`,
                backgroundColor: item.efficiency >= item.target ? '#2E7D32' : '#FFC107',
              }}
            />
            {/* Value label */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-900">
              {item.efficiency}%
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── Recent Work Orders Data ─────────────────────────────────────────────────────
const recentWorkOrders = [
  {
    id: '#WO-2026-156',
    product: 'Kemeja Formal - Navy XL',
    quantity: 2500,
    startDate: '15 Okt 2026',
    endDate: '22 Okt 2026',
    progress: 85,
    status: 'inprogress',
    statusLabel: 'Diproses',
    line: 'Line 3',
  },
  {
    id: '#WO-2026-155',
    product: 'Kaos Polos - Hitam M',
    quantity: 5000,
    startDate: '12 Okt 2026',
    endDate: '20 Okt 2026',
    progress: 100,
    status: 'completed',
    statusLabel: 'Selesai',
    line: 'Line 1',
  },
  {
    id: '#WO-2026-154',
    product: 'Celana Chino - Khaki 32',
    quantity: 1800,
    startDate: '14 Okt 2026',
    endDate: '21 Okt 2026',
    progress: 62,
    status: 'inprogress',
    statusLabel: 'Diproses',
    line: 'Line 2',
  },
  {
    id: '#WO-2026-153',
    product: 'Jaket Bomber - Merah L',
    quantity: 1200,
    startDate: '10 Okt 2026',
    endDate: '18 Okt 2026',
    progress: 100,
    status: 'completed',
    statusLabel: 'Selesai',
    line: 'Line 5',
  },
  {
    id: '#WO-2026-152',
    product: 'Dress Musim Panas - Pink S',
    quantity: 800,
    startDate: '16 Okt 2026',
    endDate: '24 Okt 2026',
    progress: 35,
    status: 'inprogress',
    statusLabel: 'Diproses',
    line: 'Line 4',
  },
]

// ─── Production Issues Data ────────────────────────────────────────────────────────
const productionIssues = [
  { issue: 'Keterlambatan Bahan Baku', count: 3, severity: 'high' },
  { issue: 'Mesin Down', count: 1, severity: 'critical' },
  { issue: 'Kualitas Standar', count: 5, severity: 'medium' },
  { issue: 'Kekurangan Operator', count: 2, severity: 'medium' },
]

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'critical': return 'bg-red-100 text-red-700 border-red-200'
    case 'high': return 'bg-orange-100 text-orange-700 border-orange-200'
    case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200'
    default: return 'bg-gray-100 text-gray-700 border-gray-200'
  }
}

// ─── KPI Cards Data ───────────────────────────────────────────────────────────────
const kpiCards = [
  {
    icon: <Icons.Activity className="w-5 h-5 text-[#2E7D32]" />,
    label: 'TOTAL OUTPUT (YTD)',
    value: '585.000 PCS',
    trend: '+12.5%',
    trendUp: true,
  },
  {
    icon: <Icons.Target className="w-5 h-5 text-[#2E7D32]" />,
    label: 'EFFICIENCY RATE',
    value: '89.2%',
    trend: '+2.1%',
    trendUp: true,
  },
  {
    icon: <Icons.ClipboardList className="w-5 h-5 text-[#2E7D32]" />,
    label: 'ACTIVE ORDERS',
    value: '45',
    trend: '-3',
    trendUp: true,
  },
  {
    icon: <Icons.AlertTriangle className="w-5 h-5 text-[#2E7D32]" />,
    label: 'DEFECT RATE',
    value: '2.1%',
    trend: '-0.3%',
    trendUp: true,
  },
]

// ─── Production Page ───────────────────────────────────────────────────────────────
export default function ProductionPage() {
  const [timeFilter, setTimeFilter] = useState('12m')

  return (
    <div className="space-y-6">
      {/* ── Page Header ── */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Produksi</h1>
          <p className="text-sm text-gray-500 mt-1">Monitor produksi, work order, dan efisiensi lini secara real-time</p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/20 focus:border-[#2E7D32]"
          >
            <option value="12m">12 Bulan Terakhir</option>
            <option value="30d">30 Hari Terakhir</option>
            <option value="90d">90 Hari Terakhir</option>
            <option value="ytd">Year to Date</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#2E7D32] text-white rounded-lg text-sm font-medium hover:bg-[#1b5e20] transition-colors">
            <Icons.Plus className="w-4 h-4" />
            Work Order Baru
          </button>
        </div>
      </div>

      {/* ── KPI Stat Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((card, index) => (
          <div key={index} className="bg-[#f8f9fa] rounded-xl border border-gray-200 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center border border-gray-200 bg-white">
                {card.icon}
              </div>
              {card.trend && (
                <span className={`text-xs font-semibold flex items-center gap-1 ${card.trendUp ? 'text-green-600' : 'text-red-500'}`}>
                  {card.trendUp ? (
                    <Icons.TrendingUp className="w-3 h-3" />
                  ) : (
                    <Icons.TrendingDown className="w-3 h-3" />
                  )}
                  {card.trend}
                </span>
              )}
            </div>
            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">{card.label}</p>
            <p className="text-2xl font-bold text-gray-900">{card.value}</p>
          </div>
        ))}
      </div>

      {/* ── Production Output Chart ── */}
      <div className="bg-[#f8f9fa] rounded-xl border border-gray-200 shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-semibold text-gray-900 text-sm">Output Produksi</h2>
            <p className="text-xs text-gray-500 mt-1">Target vs Actual (dalam pcs)</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs">
              <span className="w-3 h-3 rounded bg-[#2E7D32] inline-block" />
              <span className="text-gray-600">Actual</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="w-3 h-3 rounded bg-[#C8E6C9] inline-block" />
              <span className="text-gray-600">Target</span>
            </div>
          </div>
        </div>
        <div className="h-[280px]">
          <ProductionBarChart />
        </div>
      </div>

      {/* ── Middle Row: Work Order Status & Line Efficiency ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Work Order Status */}
        <div className="bg-[#f8f9fa] rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900 text-sm">Status Work Order</h2>
            <Icons.MoreVertical className="w-4 h-4 text-gray-400" />
          </div>
          <div className="h-[200px]">
            <WorkOrderStatusChart />
          </div>
        </div>

        {/* Line Efficiency */}
        <div className="bg-[#f8f9fa] rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900 text-sm">Efisiensi Lini Produksi</h2>
            <Icons.Zap className="w-4 h-4 text-gray-400" />
          </div>
          <LineEfficiencyChart />
        </div>
      </div>

      {/* ── Bottom Row: Work Orders & Issues ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Recent Work Orders */}
        <div className="lg:col-span-2 bg-[#f8f9fa] rounded-xl border border-gray-200 shadow-sm">
          <div className="p-5 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-gray-900 text-sm">Work Order Aktif</h2>
              <button className="text-xs text-[#2E7D32] font-medium hover:underline flex items-center gap-1">
                Lihat Semua <Icons.ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider py-3 px-5">WO ID</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider py-3 px-5">Produk</th>
                  <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider py-3 px-5">Qty</th>
                  <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wider py-3 px-5">Progress</th>
                  <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wider py-3 px-5">Line</th>
                  <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wider py-3 px-5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentWorkOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-5 font-medium text-gray-900 text-xs">{order.id}</td>
                    <td className="py-3 px-5 text-gray-700 text-xs">{order.product}</td>
                    <td className="py-3 px-5 text-right text-gray-900 text-xs font-medium">{order.quantity.toLocaleString()}</td>
                    <td className="py-3 px-5">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden max-w-[80px]">
                          <div
                            className={`h-full rounded-full ${
                              order.progress >= 100 ? 'bg-[#2E7D32]' : 'bg-[#4CAF50]'
                            }`}
                            style={{ width: `${order.progress}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-600">{order.progress}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-5 text-center">
                      <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700">
                        {order.line}
                      </span>
                    </td>
                    <td className="py-3 px-5 text-center">
                      <StatusBadge status={order.statusLabel} type={order.status === 'completed' ? 'success' : 'processing'} size="sm" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Production Issues */}
        <div className="bg-[#f8f9fa] rounded-xl border border-gray-200 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900 text-sm">Isu Produksi</h2>
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
              11 Aktif
            </span>
          </div>
          <div className="space-y-3">
            {productionIssues.map((issue, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                <div className="flex-1">
                  <p className="text-xs font-medium text-gray-900">{issue.issue}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{issue.count} work order terdampak</p>
                </div>
                <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium border ${getSeverityColor(issue.severity)}`}>
                  {issue.severity}
                </span>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 flex items-center justify-center gap-2 py-2 border border-gray-200 rounded-lg text-xs text-gray-700 hover:bg-gray-50 transition-colors">
            <Icons.Eye className="w-4 h-4" />
            Lihat Semua Isu
          </button>
        </div>
      </div>

      {/* ── Footer ── */}
      <div className="border-t border-gray-200 pt-6 mt-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative h-8 w-8">
              <img
                src="/img/images-removebg-preview.png"
                alt="Logo Leetex"
                className="object-contain w-full h-full"
              />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">PT Leetex Garment Indonesia</p>
              <p className="text-xs text-gray-500">© 2026 TextileERP Solutions. Hak Cipta Dilindungi.</p>
            </div>
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
  )
}
