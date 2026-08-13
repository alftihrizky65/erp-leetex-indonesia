'use client'

import React, { useState } from 'react'
import * as Icons from 'lucide-react'

// ─── Journal Entries Trend Chart ────────────────────────────────────────────
const journalData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt'],
  debits:  [2.1, 1.8, 2.4, 1.9, 2.2, 2.6, 2.3, 2.8, 3.1, 2.9],
  credits: [2.0, 1.9, 2.3, 2.0, 2.1, 2.5, 2.4, 2.7, 3.0, 2.8],
}

const JournalTrendChart: React.FC = () => {
  const W = 560
  const H = 220
  const padL = 56
  const padR = 16
  const padT = 16
  const padB = 32
  const chartW = W - padL - padR
  const chartH = H - padT - padB

  const allVals = [...journalData.debits, ...journalData.credits]
  const maxVal = Math.ceil(Math.max(...allVals) * 10) / 10 + 0.5
  const minVal = 0

  const xStep = chartW / (journalData.labels.length - 1)

  const toX = (i: number) => padL + i * xStep
  const toY = (v: number) => padT + chartH - ((v - minVal) / (maxVal - minVal)) * chartH

  const makePolyline = (data: number[]) =>
    data.map((v, i) => `${toX(i)},${toY(v)}`).join(' ')

  const makeAreaPath = (data: number[]) => {
    const pts = data.map((v, i) => `${toX(i)},${toY(v)}`).join(' L ')
    return `M ${toX(0)},${toY(data[0])} L ${pts} L ${toX(data.length - 1)},${padT + chartH} L ${toX(0)},${padT + chartH} Z`
  }

  const yTicks = [0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5]

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
      <defs>
        <linearGradient id="debitGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2E7D32" stopOpacity="0.15" />
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
              {t}K
            </text>
          </g>
        )
      })}

      {/* Area fill for debits */}
      <path d={makeAreaPath(journalData.debits)} fill="url(#debitGrad)" />

      {/* Debit line */}
      <polyline
        points={makePolyline(journalData.debits)}
        fill="none"
        stroke="#2E7D32"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* Credit dashed line */}
      <polyline
        points={makePolyline(journalData.credits)}
        fill="none"
        stroke="#1976d2"
        strokeWidth="2"
        strokeDasharray="5,4"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* Debit dots */}
      {journalData.debits.map((v, i) => (
        <circle key={`d${i}`} cx={toX(i)} cy={toY(v)} r="3.5" fill="white" stroke="#2E7D32" strokeWidth="2" />
      ))}

      {/* Credit dots */}
      {journalData.credits.map((v, i) => (
        <circle key={`c${i}`} cx={toX(i)} cy={toY(v)} r="3.5" fill="white" stroke="#1976d2" strokeWidth="2" />
      ))}

      {/* X-axis labels */}
      {journalData.labels.map((lbl, i) => (
        <text key={i} x={toX(i)} y={H - 6} textAnchor="middle" fontSize="10" fill="#9ca3af">
          {lbl}
        </text>
      ))}
    </svg>
  )
}

// ─── Account Type Distribution Chart ───────────────────────────────────────────
interface AccountSlice {
  label: string
  value: number
  color: string
}

const accountSlices: AccountSlice[] = [
  { label: 'Aset', value: 35, color: '#1b5e20' },
  { label: 'Kewajiban', value: 25, color: '#66bb6a' },
  { label: 'Ekuitas', value: 20, color: '#43a047' },
  { label: 'Pendapatan', value: 12, color: '#a5d6a7' },
  { label: 'Biaya', value: 8, color: '#c8e6c9' },
]

const AccountDistributionChart: React.FC = () => {
  const cx = 90, cy = 90, R = 68, r = 44
  let cumAngle = -Math.PI / 2

  const toRad = (pct: number) => (pct / 100) * 2 * Math.PI

  const slicePaths = accountSlices.map((s) => {
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
      <text x={cx} y={cy - 7} textAnchor="middle" fontSize="9" fill="#6b7280">Total Akun</text>
      <text x={cx} y={cy + 8} textAnchor="middle" fontSize="13" fontWeight="700" fill="#111827">248</text>
    </svg>
  )
}

// ─── Recent Journal Entries Data ───────────────────────────────────────────────
const journalEntries = [
  { date: '24 Okt 2023', no: 'JV-2023-0892', account: 'Kas', description: 'Pembayaran Pelanggan', debit: 'Rp 450M', credit: '-', status: 'Posted' },
  { date: '23 Okt 2023', no: 'JV-2023-0891', account: 'Perlengkapan', description: 'Pembelian Bahan Baku', debit: 'Rp 120M', credit: '-', status: 'Posted' },
  { date: '22 Okt 2023', no: 'JV-2023-0890', account: 'Hutang Usaha', description: 'Pembayaran Supplier', debit: '-', credit: 'Rp 280M', status: 'Posted' },
  { date: '20 Okt 2023', no: 'JV-2023-0889', account: 'Beban Gaji', description: 'Penggajian Karyawan', debit: 'Rp 1.2B', credit: '-', status: 'Draft' },
]

// ─── Accounting Page ─────────────────────────────────────────────────────────
export default function AccountingPage() {
  const statCards = [
    {
      icon: <Icons.BookOpen className="w-5 h-5 text-[#2E7D32]" />,
      badge: 'Bulan Ini',
      badgeUp: true,
      label: 'TOTAL JURNAL',
      value: '1,248',
    },
    {
      icon: <Icons.CheckCircle className="w-5 h-5 text-[#2E7D32]" />,
      badge: '+12.5%',
      badgeUp: true,
      label: 'POSTED',
      value: '1,185',
    },
    {
      icon: <Icons.Clock className="w-5 h-5 text-[#2E7D32]" />,
      badge: 'Pending',
      badgeUp: false,
      label: 'DRAFT',
      value: '63',
    },
    {
      icon: <Icons.FileText className="w-5 h-5 text-[#2E7D32]" />,
      badge: '',
      badgeUp: true,
      label: 'TOTAL AKUN',
      value: '248',
    },
  ]

  return (
    <div className="space-y-6">

      {/* ── Page Header ── */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Akuntansi</h1>
          <p className="text-sm text-gray-500 mt-0.5">Ringkasan aktivitas pembukuan dan status jurnal.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors">
            <Icons.Filter className="w-4 h-4" />
            Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#2E7D32] text-white rounded-lg text-sm font-medium hover:bg-[#1b5e20] transition-colors">
            <Icons.Plus className="w-4 h-4" />
            Jurnal Baru
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
                <span className={`text-xs font-medium flex items-center gap-0.5 ${
                  card.badgeUp || card.badge === 'Bulan Ini' ? 'text-green-600' : 'text-amber-600'
                }`}>
                  {card.badge === 'Pending' ? (
                    <Icons.Clock className="w-3 h-3" />
                  ) : card.badgeUp ? (
                    <Icons.TrendingUp className="w-3 h-3" />
                  ) : null}
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

        {/* Journal Entries Trend */}
        <div className="xl:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-gray-900 text-sm">Tren Jurnal</h2>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-xs text-gray-500">
                <span className="w-3 h-3 rounded-full border-2 border-[#2E7D32] bg-white inline-block" />
                Debit
              </span>
              <span className="flex items-center gap-1 text-xs text-gray-500">
                <span className="w-3 h-3 rounded-full border-2 border-blue-600 bg-white inline-block" />
                Kredit
              </span>
            </div>
          </div>
          <div className="h-[220px]">
            <JournalTrendChart />
          </div>
        </div>

        {/* Account Distribution */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-gray-900 text-sm">Distribusi Akun</h2>
            <Icons.MoreVertical className="w-4 h-4 text-gray-400" />
          </div>
          <div className="h-[180px] flex items-center justify-center">
            <AccountDistributionChart />
          </div>
          {/* Legend */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 mt-2">
            {accountSlices.map((s) => (
              <div key={s.label} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: s.color }} />
                <span className="text-xs text-gray-600">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Journal Entries Table & Summary ── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">

        {/* Balance Summary */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <h2 className="font-semibold text-gray-900 text-sm mb-4">Ringkasan Saldo</h2>

          {/* Debit Balance */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs text-gray-500">Total Debit</p>
              <p className="text-lg font-bold text-gray-900">Rp 24.8B</p>
            </div>
            <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
              <div className="h-full bg-[#2E7D32] rounded-full" style={{ width: '100%' }} />
            </div>
          </div>

          {/* Credit Balance */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs text-gray-500">Total Kredit</p>
              <p className="text-lg font-bold text-gray-900">Rp 24.8B</p>
            </div>
            <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
              <div className="h-full bg-blue-600 rounded-full" style={{ width: '100%' }} />
            </div>
          </div>

          {/* Balance Status */}
          <div className="pt-3 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-500">Status</p>
              <span className="text-[11px] font-semibold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Seimbang</span>
            </div>
          </div>
        </div>

        {/* Recent Journal Entries */}
        <div className="xl:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900 text-sm">Jurnal Terbaru</h2>
            <button className="text-xs text-[#2E7D32] font-medium hover:underline flex items-center gap-1">
              Lihat Semua <Icons.ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider pb-2 pr-4">Tanggal</th>
                  <th className="text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider pb-2 pr-4">No. Jurnal</th>
                  <th className="text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider pb-2 pr-4">Akun</th>
                  <th className="text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider pb-2 pr-4">Deskripsi</th>
                  <th className="text-right text-[11px] font-semibold text-gray-400 uppercase tracking-wider pb-2 pr-4">Debit</th>
                  <th className="text-right text-[11px] font-semibold text-gray-400 uppercase tracking-wider pb-2 pr-4">Kredit</th>
                  <th className="text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider pb-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {journalEntries.map((entry, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 pr-4 text-gray-500 text-xs whitespace-nowrap">{entry.date}</td>
                    <td className="py-3 pr-4 text-gray-900 font-medium text-xs whitespace-nowrap">{entry.no}</td>
                    <td className="py-3 pr-4 text-gray-500 text-xs whitespace-nowrap">{entry.account}</td>
                    <td className="py-3 pr-4 text-gray-900 text-xs">{entry.description}</td>
                    <td className={`py-3 pr-4 text-xs text-right font-medium whitespace-nowrap ${entry.debit !== '-' ? 'text-gray-800' : 'text-gray-400'}`}>
                      {entry.debit}
                    </td>
                    <td className={`py-3 pr-4 text-xs text-right font-medium whitespace-nowrap ${entry.credit !== '-' ? 'text-blue-600' : 'text-gray-400'}`}>
                      {entry.credit}
                    </td>
                    <td className="py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold ${
                        entry.status === 'Posted'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}>
                        {entry.status === 'Posted' ? 'Posted' : 'Draft'}
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
