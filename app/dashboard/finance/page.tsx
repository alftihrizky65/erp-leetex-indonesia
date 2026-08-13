'use client'

import React, { useState } from 'react'
import * as Icons from 'lucide-react'

// ─── Cash Flow SVG Chart ────────────────────────────────────────────────────
const cashFlowData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt'],
  inflow:  [1.2, 1.8, 1.6, 2.1, 1.9, 2.2, 2.4, 2.8, 3.0, 3.2],
  outflow: [0.8, 1.0, 1.5, 1.7, 1.8, 1.9, 2.0, 2.1, 1.9, 1.8],
}

const CashFlowChart: React.FC<{ mode: 'Weekly' | 'Monthly' }> = ({ mode }) => {
  const W = 560
  const H = 220
  const padL = 56
  const padR = 16
  const padT = 16
  const padB = 32
  const chartW = W - padL - padR
  const chartH = H - padT - padB

  const allVals = [...cashFlowData.inflow, ...cashFlowData.outflow]
  const maxVal = Math.ceil(Math.max(...allVals) * 10) / 10 + 0.2
  const minVal = 0

  const xStep = chartW / (cashFlowData.labels.length - 1)

  const toX = (i: number) => padL + i * xStep
  const toY = (v: number) => padT + chartH - ((v - minVal) / (maxVal - minVal)) * chartH

  const makePolyline = (data: number[]) =>
    data.map((v, i) => `${toX(i)},${toY(v)}`).join(' ')

  const makeAreaPath = (data: number[]) => {
    const pts = data.map((v, i) => `${toX(i)},${toY(v)}`).join(' L ')
    return `M ${toX(0)},${toY(data[0])} L ${pts} L ${toX(data.length - 1)},${padT + chartH} L ${toX(0)},${padT + chartH} Z`
  }

  // Y-axis ticks
  const yTicks = [0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5]

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
      <defs>
        <linearGradient id="inflowGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2E7D32" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#2E7D32" stopOpacity="0.02" />
        </linearGradient>
      </defs>

      {/* Y-axis grid lines & labels */}
      {yTicks.map((t) => {
        const y = toY(t)
        if (y < padT - 4 || y > padT + chartH + 4) return null
        return (
          <g key={t}>
            <line x1={padL} y1={y} x2={W - padR} y2={y} stroke="#e5e7eb" strokeWidth="1" />
            <text x={padL - 6} y={y + 4} textAnchor="end" fontSize="9" fill="#9ca3af">
              Rp {t}B
            </text>
          </g>
        )
      })}

      {/* Area fill for inflow */}
      <path d={makeAreaPath(cashFlowData.inflow)} fill="url(#inflowGrad)" />

      {/* Inflow line */}
      <polyline
        points={makePolyline(cashFlowData.inflow)}
        fill="none"
        stroke="#2E7D32"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* Outflow dashed line */}
      <polyline
        points={makePolyline(cashFlowData.outflow)}
        fill="none"
        stroke="#ef4444"
        strokeWidth="2"
        strokeDasharray="5,4"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* Inflow dots */}
      {cashFlowData.inflow.map((v, i) => (
        <circle key={i} cx={toX(i)} cy={toY(v)} r="3.5" fill="white" stroke="#2E7D32" strokeWidth="2" />
      ))}

      {/* Outflow dots */}
      {cashFlowData.outflow.map((v, i) => (
        <circle key={i} cx={toX(i)} cy={toY(v)} r="3.5" fill="white" stroke="#ef4444" strokeWidth="2" />
      ))}

      {/* X-axis labels */}
      {cashFlowData.labels.map((lbl, i) => (
        <text key={i} x={toX(i)} y={H - 6} textAnchor="middle" fontSize="10" fill="#9ca3af">
          {lbl}
        </text>
      ))}
    </svg>
  )
}

// ─── Budget Donut Chart ─────────────────────────────────────────────────────
interface DonutSlice {
  label: string
  value: number
  color: string
}

const donutSlices: DonutSlice[] = [
  { label: 'Produksi', value: 45, color: '#1b5e20' },
  { label: 'Logistik', value: 25, color: '#66bb6a' },
  { label: 'HR', value: 20, color: '#43a047' },
  { label: 'Penjualan', value: 10, color: '#a5d6a7' },
]

const BudgetDonut: React.FC = () => {
  const cx = 90, cy = 90, R = 68, r = 44
  let cumAngle = -Math.PI / 2

  const toRad = (pct: number) => (pct / 100) * 2 * Math.PI

  const slicePaths = donutSlices.map((s) => {
    const angle = toRad(s.value)
    const x1 = cx + R * Math.cos(cumAngle)
    const y1 = cy + R * Math.sin(cumAngle)
    const x2 = cx + R * Math.cos(cumAngle + angle)
    const y2 = cy + R * Math.sin(cumAngle + angle)
    const ix1 = cx + r * Math.cos(cumAngle)
    const iy1 = cy + r * Math.sin(cumAngle)
    const ix2 = cx + r * Math.cos(cumAngle + angle)
    const iy2 = cy + r * Math.sin(cumAngle + angle)
    const large = angle > Math.PI ? 1 : 0
    const d = [
      `M ${x1} ${y1}`,
      `A ${R} ${R} 0 ${large} 1 ${x2} ${y2}`,
      `L ${ix2} ${iy2}`,
      `A ${r} ${r} 0 ${large} 0 ${ix1} ${iy1}`,
      'Z',
    ].join(' ')
    cumAngle += angle
    return { ...s, d }
  })

  return (
    <svg viewBox="0 0 180 180" className="w-full h-full">
      {slicePaths.map((s) => (
        <path key={s.label} d={s.d} fill={s.color} stroke="white" strokeWidth="1.5" />
      ))}
      <text x={cx} y={cy - 7} textAnchor="middle" fontSize="9" fill="#6b7280">Total Anggaran</text>
      <text x={cx} y={cy + 8} textAnchor="middle" fontSize="13" fontWeight="700" fill="#111827">Rp 4.2B</text>
    </svg>
  )
}

// ─── GL Transactions Data ───────────────────────────────────────────────────
const glTransactions = [
  { date: '24 Okt 2023', description: 'Supplier Bahan Baku – Tekstil', category: 'HPP',         amount: '– Rp 450M', status: 'Selesai' },
  { date: '23 Okt 2023', description: 'Pembayaran Pesanan B2B – Klien A',     category: 'Pendapatan',      amount: '+ Rp 820M', status: 'Selesai' },
  { date: '22 Okt 2023', description: 'Invoice Mitra Logistik',         category: 'Biaya Operasional', amount: '– Rp 120M', status: 'Tertunda' },
  { date: '20 Okt 2023', description: 'Penggajian Bulanan',                   category: 'Payroll',      amount: '– Rp 1.2B', status: 'Selesai' },
]

// ─── Finance Page ───────────────────────────────────────────────────────────
export default function FinancePage() {
  const [chartMode, setChartMode] = useState<'Weekly' | 'Monthly'>('Monthly')

  const statCards = [
    {
      icon: <Icons.LineChart className="w-5 h-5 text-[#2E7D32]" />,
      badge: '+8.2% YTD',
      badgeUp: true,
      label: 'TOTAL PENDAPATAN',
      value: 'Rp 12.4B',
    },
    {
      icon: <Icons.FileText className="w-5 h-5 text-[#2E7D32]" />,
      badge: '-2.4%',
      badgeUp: false,
      label: 'BIAYA OPERASIONAL',
      value: 'Rp 4.1B',
    },
    {
      icon: <Icons.PieChart className="w-5 h-5 text-[#2E7D32]" />,
      badge: '+1.5%',
      badgeUp: true,
      label: 'MARGIN LABA BERSIH',
      value: '33.1%',
    },
    {
      icon: <Icons.DollarSign className="w-5 h-5 text-[#2E7D32]" />,
      badge: '',
      badgeUp: true,
      label: 'KAS TERSEDIA',
      value: 'Rp 5.8B',
    },
  ]

  return (
    <div className="space-y-6">

      {/* ── Page Header ── */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Keuangan</h1>
          <p className="text-sm text-gray-500 mt-0.5">Ringkasan real-time kinerja keuangan dan metrik utama.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors">
            <Icons.Download className="w-4 h-4" />
            Ekspor PDF
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#2E7D32] text-white rounded-lg text-sm font-medium hover:bg-[#1b5e20] transition-colors">
            <Icons.Plus className="w-4 h-4" />
            Catatan Baru
          </button>
        </div>
      </div>

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <div key={card.label} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center">
                {card.icon}
              </div>
              {card.badge ? (
                <span className={`text-xs font-medium flex items-center gap-0.5 ${card.badgeUp ? 'text-green-600' : 'text-red-500'}`}>
                  {card.badgeUp
                    ? <Icons.TrendingUp className="w-3 h-3" />
                    : <Icons.TrendingDown className="w-3 h-3" />
                  }
                  {card.badge}
                </span>
              ) : null}
            </div>
            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">{card.label}</p>
            <p className="text-2xl font-bold text-gray-900">{card.value}</p>
          </div>
        ))}
      </div>

      {/* ── Charts Row ── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">

        {/* Cash Flow Analysis */}
        <div className="xl:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-gray-900 text-sm">Analisis Arus Kas</h2>
            <div className="flex items-center gap-2">
              {/* Legend */}
              <div className="flex items-center gap-3 mr-3">
                <span className="flex items-center gap-1 text-xs text-gray-500">
                  <span className="w-3 h-3 rounded-full border-2 border-[#2E7D32] bg-white inline-block" />
                  Pemasukan
                </span>
                <span className="flex items-center gap-1 text-xs text-gray-500">
                  <span className="w-3 h-3 rounded-full border-2 border-red-400 bg-white inline-block" />
                  Pengeluaran
                </span>
              </div>
              {/* Toggle */}
              <div className="flex rounded-lg overflow-hidden border border-gray-200 text-xs">
                {(['Weekly', 'Monthly'] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setChartMode(m)}
                    className={`px-3 py-1 transition-colors ${chartMode === m ? 'bg-[#2E7D32] text-white font-medium' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                  >
                    {m === 'Weekly' ? 'Mingguan' : 'Bulanan'}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="h-[220px]">
            <CashFlowChart mode={chartMode} />
          </div>
        </div>

        {/* Budget Allocation */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-gray-900 text-sm">Alokasi Anggaran</h2>
            <Icons.MoreVertical className="w-4 h-4 text-gray-400" />
          </div>
          <div className="h-[180px] flex items-center justify-center">
            <BudgetDonut />
          </div>
          {/* Legend */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 mt-2">
            {donutSlices.map((s) => (
              <div key={s.label} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: s.color }} />
                <span className="text-xs text-gray-600">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom Row ── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">

        {/* AP / AR Summary */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <h2 className="font-semibold text-gray-900 text-sm mb-4">Ringkasan Piutang / Hutang</h2>

          {/* Accounts Receivable */}
          <div className="mb-5">
            <p className="text-xs text-gray-500 mb-1">Piutang Usaha</p>
            <div className="flex items-center justify-between mb-1">
              <p className="text-lg font-bold text-gray-900">Rp 2.1B</p>
              <span className="text-[11px] font-semibold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Sehat</span>
            </div>
            <div className="h-2 rounded-full bg-gray-100 overflow-hidden mb-1">
              <div className="h-full bg-[#2E7D32] rounded-full" style={{ width: '75%' }} />
            </div>
            <div className="flex justify-between text-[11px] text-gray-400">
              <span>0–30 Hari: 75%</span>
              <span>30+ Hari: 25%</span>
            </div>
          </div>

          {/* Accounts Payable */}
          <div>
            <p className="text-xs text-gray-500 mb-1">Hutang Usaha</p>
            <div className="flex items-center justify-between mb-1">
              <p className="text-lg font-bold text-gray-900">Rp 1.4B</p>
              <span className="text-[11px] font-semibold bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">Perlu Perhatian</span>
            </div>
            <div className="h-2 rounded-full bg-gray-100 overflow-hidden mb-1">
              <div className="h-full bg-yellow-400 rounded-full" style={{ width: '60%' }} />
            </div>
            <div className="flex justify-between text-[11px] text-gray-400">
              <span>Current: 60%</span>
              <span>Jatuh Tempo: 40%</span>
            </div>
          </div>
        </div>

        {/* Recent GL Transactions */}
        <div className="xl:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900 text-sm">Transaksi GL Terbaru</h2>
            <button className="text-xs text-[#2E7D32] font-medium hover:underline flex items-center gap-1">
              Lihat Semua <Icons.ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider pb-2 pr-4">Tanggal</th>
                  <th className="text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider pb-2 pr-4">Deskripsi</th>
                  <th className="text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider pb-2 pr-4">Kategori</th>
                  <th className="text-right text-[11px] font-semibold text-gray-400 uppercase tracking-wider pb-2 pr-4">Jumlah</th>
                  <th className="text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider pb-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {glTransactions.map((tx, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 pr-4 text-gray-500 text-xs whitespace-nowrap">{tx.date}</td>
                    <td className="py-3 pr-4 text-gray-900 font-medium text-xs">{tx.description}</td>
                    <td className="py-3 pr-4 text-gray-500 text-xs whitespace-nowrap">{tx.category}</td>
                    <td className={`py-3 pr-4 text-xs text-right font-medium whitespace-nowrap ${tx.amount.startsWith('+') ? 'text-green-600' : 'text-gray-800'}`}>
                      {tx.amount}
                    </td>
                    <td className="py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold ${
                        tx.status === 'Selesai'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  )
}
