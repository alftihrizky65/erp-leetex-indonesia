'use client'

import React, { useState } from 'react'
import * as Icons from 'lucide-react'
import { StatusBadge } from '@/components/ui/StatusBadge'

// ─── Medical Incidents Stacked Area Chart ─────────────────────────────────────────────
const incidentsData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
  minor: [2, 3, 1, 4, 2, 3, 5, 4, 3, 6, 4, 5],
  moderate: [1, 2, 1, 2, 1, 1, 2, 3, 2, 2, 3, 2],
  serious: [0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0],
}

const IncidentsChart: React.FC = () => {
  const W = 680
  const H = 260
  const padL = 60
  const padR = 16
  const padT = 16
  const padB = 40
  const chartW = W - padL - padR
  const chartH = H - padT - padB

  const maxVal = 10

  const xStep = chartW / (incidentsData.labels.length - 1)

  const toX = (i: number) => padL + i * xStep
  const toY = (v: number) => padT + chartH - (v / maxVal) * chartH

  // Stacked area paths
  const makeStackedAreaPath = (data1: number[], data2: number[], data3: number[]) => {
    const pointsTop = []
    const pointsBottom = []

    // Top line (cumulative: minor + moderate + serious)
    for (let i = 0; i < data1.length; i++) {
      const total = data1[i] + data2[i] + data3[i]
      pointsTop.push(`${toX(i)},${toY(total)}`)
    }

    // Bottom line (going backwards for the stacked effect)
    for (let i = data1.length - 1; i >= 0; i--) {
      pointsBottom.push(`${toX(i)},${toY(data1[i] + data2[i])}`)
    }

    return `M ${pointsTop.join(' L ')} L ${pointsBottom.join(' L ')} Z`
  }

  const makeModeratePath = (data1: number[], data2: number[]) => {
    const pointsTop = []
    const pointsBottom = []

    for (let i = 0; i < data1.length; i++) {
      pointsTop.push(`${toX(i)},${toY(data1[i] + data2[i])}`)
    }

    for (let i = data1.length - 1; i >= 0; i--) {
      pointsBottom.push(`${toX(i)},${toY(data1[i])}`)
    }

    return `M ${pointsTop.join(' L ')} L ${pointsBottom.join(' L ')} Z`
  }

  const makeMinorPath = (data1: number[]) => {
    const points = data1.map((v, i) => `${toX(i)},${toY(v)}`).join(' L ')
    const baseline = data1.map((_, i) => `${toX(i)},${toY(0)}`).join(' L ')
    return `M ${points} L ${baseline} Z`
  }

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
      {/* Minor incidents - Light green */}
      <path d={makeMinorPath(incidentsData.minor)} fill="#C8E6C9" />
      {/* Moderate incidents - Medium green */}
      <path d={makeModeratePath(incidentsData.minor, incidentsData.moderate)} fill="#4CAF50" />
      {/* Serious incidents - Dark green (for better visibility, still using green theme) */}
      <path d={makeStackedAreaPath(incidentsData.minor, incidentsData.moderate, incidentsData.serious)} fill="#2E7D32" />

      {/* Grid lines */}
      {[2, 4, 6, 8, 10].map((t) => {
        const y = toY(t)
        return (
          <g key={t}>
            <line x1={padL} y1={y} x2={W - padR} y2={y} stroke="#e8f5e9" strokeWidth="1" />
            <text x={padL - 8} y={y + 3} textAnchor="end" fontSize="10" fill="#898781">
              {t}
            </text>
          </g>
        )
      })}

      {/* Baseline */}
      <line x1={padL} y1={padT + chartH} x2={W - padR} y2={padT + chartH} stroke="#c3c2b7" strokeWidth="2" />

      {/* X-axis labels */}
      {incidentsData.labels.map((lbl, i) => (
        <text key={i} x={toX(i)} y={H - 10} textAnchor="middle" fontSize="10" fill="#898781">
          {lbl}
        </text>
      ))}
    </svg>
  )
}

// ─── P3K Inventory Status Card Component ────────────────────────────────────────────
const p3kItems = [
  { name: 'Perban', stock: 45, minStock: 20, unit: 'roll' },
  { name: 'Kapas Alcohol', stock: 12, minStock: 15, unit: 'botol' },
  { name: 'Handuk Kasa', stock: 28, minStock: 25, unit: 'pcs' },
  { name: 'Sarung Tangan Lateks', stock: 50, minStock: 30, unit: 'pasang' },
  { name: 'Obat Antiseptik', stock: 8, minStock: 10, unit: 'botol' },
]

const P3KInventoryCard: React.FC = () => (
  <div className="space-y-3">
    {p3kItems.map((item) => {
      const percentage = (item.stock / item.minStock) * 100
      const isLow = item.stock < item.minStock

      return (
        <div key={item.name} className="flex items-center gap-3">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs font-medium text-gray-900">{item.name}</p>
              <p className={`text-xs font-semibold ${isLow ? 'text-red-600' : 'text-gray-700'}`}>
                {item.stock} {item.unit}
              </p>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${isLow ? 'bg-red-500' : 'bg-[#2E7D32]'}`}
                style={{ width: `${Math.min(percentage, 100)}%` }}
              />
            </div>
          </div>
        </div>
      )
    })}
  </div>
)

// ─── Safety Score Gauge ──────────────────────────────────────────────────────────────
const SafetyGauge: React.FC = () => {
  const W = 200
  const H = 100
  const cx = W / 2
  const cy = H - 15
  const R = 70

  const score = 92
  const maxScore = 100
  const angle = (score / maxScore) * 180 - 90

  const toRad = (deg: number) => (deg * Math.PI) / 180

  const endX = cx + R * Math.cos(toRad(angle))
  const endY = cy + R * Math.sin(toRad(angle))

  // Background arc (180 degrees)
  const bgArc = `M ${cx - R} ${cy} A ${R} ${R} 0 0 1 ${cx + R} ${cy}`

  // Score arc
  const scoreAngle = angle + 90
  const scoreEndX = cx + R * Math.cos(toRad(180 - scoreAngle))
  const scoreEndY = cy - R + R * Math.sin(toRad(scoreAngle))

  const scoreArc = `M ${cx - R} ${cy} A ${R} ${R} 0 ${scoreAngle > 90 ? 1 : 0} 1 ${scoreEndX} ${scoreEndY}`

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
      {/* Background arc */}
      <path d={bgArc} fill="none" stroke="#e8f5e9" strokeWidth="16" strokeLinecap="round" />

      {/* Score arc */}
      <path d={scoreArc} fill="none" stroke="#2E7D32" strokeWidth="16" strokeLinecap="round" />

      {/* Score text */}
      <text x={cx} y={cy - 25} textAnchor="middle" fontSize="28" fontWeight="700" fill="#2E7D32">
        {score}
      </text>
      <text x={cx} y={cy - 8} textAnchor="middle" fontSize="10" fill="#898781">
        Safety Score
      </text>

      {/* Labels */}
      <text x={cx - R - 10} y={cy + 5} textAnchor="end" fontSize="8" fill="#898781">0</text>
      <text x={cx + R + 10} y={cy + 5} textAnchor="start" fontSize="8" fill="#898781">100</text>
    </svg>
  )
}

// ─── BPJS Coverage Donut Chart ────────────────────────────────────────────────────────
const bpjsData = {
  kesehatan: { covered: 142, total: 150, percentage: 95 },
  ketenagakerjaan: { covered: 138, total: 150, percentage: 92 },
}

const BPJSDonut: React.FC<{ type: 'kesehatan' | 'ketenagakerjaan' }> = ({ type }) => {
  const cx = 80
  const cy = 80
  const R = 60
  const r = 42

  const data = bpjsData[type]
  const coveredAngle = (data.covered / data.total) * 2 * Math.PI

  const startAngle = -Math.PI / 2
  const endAngle = startAngle + coveredAngle

  const x1 = cx + R * Math.cos(startAngle)
  const y1 = cy + R * Math.sin(startAngle)
  const x2 = cx + R * Math.cos(endAngle)
  const y2 = cy + R * Math.sin(endAngle)

  const ix1 = cx + r * Math.cos(startAngle)
  const iy1 = cy + r * Math.sin(startAngle)
  const ix2 = cx + r * Math.cos(endAngle)
  const iy2 = cy + r * Math.sin(endAngle)

  const largeArc = coveredAngle > Math.PI ? 1 : 0

  const arcPath = [
    `M ${x1} ${y1}`,
    `A ${R} ${R} 0 ${largeArc} 1 ${x2} ${y2}`,
    `L ${ix2} ${iy2}`,
    `A ${r} ${r} 0 ${largeArc} 0 ${ix1} ${iy1}`,
    'Z',
  ].join(' ')

  const bgPath = [
    `M ${cx + R} ${cy}`,
    `A ${R} ${R} 0 1 0 ${cx - R} ${cy}`,
    `L ${cx - r} ${cy}`,
    `A ${r} ${r} 0 1 1 ${cx + r} ${cy}`,
    'Z',
  ].join(' ')

  return (
    <svg viewBox={`0 0 160 160`} className="w-full h-full">
      {/* Background (uncovered) */}
      <path d={bgPath} fill="#e8f5e9" />
      {/* Covered portion */}
      <path d={arcPath} fill="#2E7D32" />
      {/* Center text */}
      <text x={cx} y={cy - 5} textAnchor="middle" fontSize="9" fill="#898781">
        {type === 'kesehatan' ? 'BPJS Kes.' : 'BPJS Kerja'}
      </text>
      <text x={cx} y={cy + 10} textAnchor="middle" fontSize="14" fontWeight="700" fill="#2E7D32">
        {data.percentage}%
      </text>
      <text x={cx} y={cy + 22} textAnchor="middle" fontSize="8" fill="#898781">
        {data.covered}/{data.total}
      </text>
    </svg>
  )
}

// ─── Insurance Coverage Summary ───────────────────────────────────────────────────────
const insuranceData = [
  { company: 'Prudential', type: 'Kesehatan', covered: 45, total: 50 },
  { company: 'Allianz', type: 'Kecelakaan', covered: 38, total: 50 },
  { company: 'Astra Buana', type: 'Jiwa', covered: 42, total: 50 },
  { company: 'Manulife', type: 'Kesehatan+', covered: 25, total: 50 },
]

// ─── Recent Medical Records Data ─────────────────────────────────────────────────────
const medicalRecords = [
  {
    id: '#MED-2026-042',
    employee: 'Ahmad Fauzi',
    date: '18 Okt 2026',
    type: 'P3K',
    diagnosis: 'Luka ringan pada jari tangan',
    action: 'Perban & antiseptik',
    status: 'completed',
    statusLabel: 'Selesai',
  },
  {
    id: '#MED-2026-041',
    employee: 'Siti Rahayu',
    date: '17 Okt 2026',
    type: 'P3E',
    diagnosis: 'Keluhan nyeri punggung',
    action: 'Referral ke dokter spesialis',
    status: 'inprogress',
    statusLabel: 'Diproses',
  },
  {
    id: '#MED-2026-040',
    employee: 'Budi Santoso',
    date: '16 Okt 2026',
    type: 'K3',
    diagnosis: 'Dehidrasi ringan',
    action: 'Istirahat & cairan',
    status: 'completed',
    statusLabel: 'Selesai',
  },
  {
    id: '#MED-2026-039',
    employee: 'Dewi Lestari',
    date: '15 Okt 2026',
    type: 'P3K',
    diagnosis: 'Luka bakar ringan',
    action: 'Salep & perban',
    status: 'completed',
    statusLabel: 'Selesai',
  },
  {
    id: '#MED-2026-038',
    employee: 'Rudi Hartono',
    date: '14 Okt 2026',
    type: 'P3E',
    diagnosis: 'Check-up berkala',
    action: 'Pemeriksaan lengkap',
    status: 'inprogress',
    statusLabel: 'Diproses',
  },
]

// ─── Upcoming Medical Checkups ───────────────────────────────────────────────────────
const upcomingCheckups = [
  { date: '20 Okt 2026', type: 'Medical Checkup Tahunan', employees: 25 },
  { date: '25 Okt 2026', type: 'Vaksinasi Flu', employees: 50 },
  { date: '02 Nov 2026', type: 'Pemeriksaan Mata', employees: 30 },
]

// ─── KPI Cards Data ───────────────────────────────────────────────────────────────
const kpiCards = [
  {
    icon: <Icons.HeartPulse className="w-5 h-5 text-[#2E7D32]" />,
    label: 'TOTAL KUNJUNGAN (YTD)',
    value: '1,245',
    trend: '+8.3%',
    trendUp: true,
  },
  {
    icon: <Icons.ShieldCheck className="w-5 h-5 text-[#2E7D32]" />,
    label: 'SAFETY SCORE',
    value: '92',
    trend: '+2.5',
    trendUp: true,
  },
  {
    icon: <Icons.FileCheck className="w-5 h-5 text-[#2E7D32]" />,
    label: 'BPJS PARTICIPATION',
    value: '93.5%',
    trend: '+1.2%',
    trendUp: true,
  },
  {
    icon: <Icons.Umbrella className="w-5 h-5 text-[#2E7D32]" />,
    label: 'ASURANSI COVERAGE',
    value: '83%',
    trend: '+5%',
    trendUp: true,
  },
]

// ─── Medis Page ───────────────────────────────────────────────────────────────────
export default function MedisPage() {
  const [timeFilter, setTimeFilter] = useState('12m')

  return (
    <div className="space-y-6">
      {/* ── Page Header ── */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Medis & K3</h1>
          <p className="text-sm text-gray-500 mt-1">Kesehatan karyawan, keselamatan kerja, P3E, BPJS, dan asuransi</p>
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
            Rekam Medis Baru
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

      {/* ── Top Row: Safety Score & P3K Inventory ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Safety Score */}
        <div className="bg-[#f8f9fa] rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-semibold text-gray-900 text-sm">Safety Score</h2>
              <p className="text-xs text-gray-500 mt-1">Berdasarkan insiden & pelatihan K3</p>
            </div>
            <Icons.Shield className="w-5 h-5 text-[#2E7D32]" />
          </div>
          <div className="h-[100px]">
            <SafetyGauge />
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-200">
            <div className="text-center">
              <p className="text-lg font-bold text-[#2E7D32]">45</p>
              <p className="text-xs text-gray-500">Hari Tanpa LKA</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-gray-900">3</p>
              <p className="text-xs text-gray-500">Insiden Bulan Ini</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-gray-900">98%</p>
              <p className="text-xs text-gray-500">Kepatuhan APD</p>
            </div>
          </div>
        </div>

        {/* P3K Inventory */}
        <div className="bg-[#f8f9fa] rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-semibold text-gray-900 text-sm">Status P3K</h2>
              <p className="text-xs text-gray-500 mt-1">Inventory & stok tersedia</p>
            </div>
            <Icons.BriefcaseMedical className="w-5 h-5 text-[#2E7D32]" />
          </div>
          <div className="h-[220px] overflow-y-auto">
            <P3KInventoryCard />
          </div>
        </div>
      </div>

      {/* ── Medical Incidents Chart ── */}
      <div className="bg-[#f8f9fa] rounded-xl border border-gray-200 shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-semibold text-gray-900 text-sm">Insiden Medis</h2>
            <p className="text-xs text-gray-500 mt-1">Tren insiden berdasarkan tingkat keparahan</p>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-[#2E7D32] inline-block" />
              <span className="text-gray-600">Serius</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-[#4CAF50] inline-block" />
              <span className="text-gray-600">Sedang</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-[#C8E6C9] inline-block" />
              <span className="text-gray-600">Ringan</span>
            </div>
          </div>
        </div>
        <div className="h-[260px]">
          <IncidentsChart />
        </div>
      </div>

      {/* ── BPJS Coverage Row ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* BPJS Kesehatan */}
        <div className="bg-[#f8f9fa] rounded-xl border border-gray-200 shadow-sm p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-gray-900 text-sm">BPJS Kesehatan</h2>
            <Icons.FileHeart className="w-4 h-4 text-[#2E7D32]" />
          </div>
          <div className="h-[160px]">
            <BPJSDonut type="kesehatan" />
          </div>
          <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-gray-200 text-center">
            <div>
              <p className="text-xs text-gray-500">Aktif</p>
              <p className="text-sm font-semibold text-gray-900">142</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Pending</p>
              <p className="text-sm font-semibold text-gray-900">8</p>
            </div>
          </div>
        </div>

        {/* BPJS Ketenagakerjaan */}
        <div className="bg-[#f8f9fa] rounded-xl border border-gray-200 shadow-sm p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-gray-900 text-sm">BPJS Ketenagakerjaan</h2>
            <Icons.Shield className="w-4 h-4 text-[#2E7D32]" />
          </div>
          <div className="h-[160px]">
            <BPJSDonut type="ketenagakerjaan" />
          </div>
          <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-gray-200 text-center">
            <div>
              <p className="text-xs text-gray-500">Aktif</p>
              <p className="text-sm font-semibold text-gray-900">138</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Pending</p>
              <p className="text-sm font-semibold text-gray-900">12</p>
            </div>
          </div>
        </div>

        {/* Insurance Coverage */}
        <div className="bg-[#f8f9fa] rounded-xl border border-gray-200 shadow-sm p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-gray-900 text-sm">Asuransi Karyawan</h2>
            <Icons.Umbrella className="w-4 h-4 text-[#2E7D32]" />
          </div>
          <div className="space-y-3">
            {insuranceData.map((ins, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-900">{ins.company}</p>
                  <p className="text-xs text-gray-500">{ins.type}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">{ins.covered}/{ins.total}</p>
                  <p className="text-xs text-gray-500">{Math.round((ins.covered / ins.total) * 100)}%</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 flex items-center justify-center gap-2 py-2 border border-gray-200 rounded-lg text-xs text-gray-700 hover:bg-gray-50 transition-colors">
            <Icons.Eye className="w-4 h-4" />
            Detail Asuransi
          </button>
        </div>
      </div>

      {/* ── Bottom Row: Medical Records & Upcoming ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Recent Medical Records */}
        <div className="lg:col-span-2 bg-[#f8f9fa] rounded-xl border border-gray-200 shadow-sm">
          <div className="p-5 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-gray-900 text-sm">Rekam Medis Terbaru</h2>
              <button className="text-xs text-[#2E7D32] font-medium hover:underline flex items-center gap-1">
                Lihat Semua <Icons.ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider py-3 px-5">ID</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider py-3 px-5">Karyawan</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider py-3 px-5">Tanggal</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider py-3 px-5">Tipe</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider py-3 px-5">Diagnosis</th>
                  <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wider py-3 px-5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {medicalRecords.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-5 font-medium text-gray-900 text-xs">{record.id}</td>
                    <td className="py-3 px-5 text-gray-700 text-xs">{record.employee}</td>
                    <td className="py-3 px-5 text-gray-500 text-xs">{record.date}</td>
                    <td className="py-3 px-5">
                      <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700">
                        {record.type}
                      </span>
                    </td>
                    <td className="py-3 px-5 text-gray-600 text-xs">{record.diagnosis}</td>
                    <td className="py-3 px-5 text-center">
                      <StatusBadge status={record.statusLabel} type={record.status === 'completed' ? 'success' : 'processing'} size="sm" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Upcoming Checkups */}
        <div className="bg-[#f8f9fa] rounded-xl border border-gray-200 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900 text-sm">Jadwal Medis</h2>
            <Icons.Calendar className="w-4 h-4 text-gray-400" />
          </div>
          <div className="space-y-3">
            {upcomingCheckups.map((checkup, index) => (
              <div key={index} className="p-3 bg-white rounded-lg border border-gray-200">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs font-medium text-gray-900">{checkup.date}</p>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-[#2E7D32] text-white">
                    {checkup.employees} orang
                  </span>
                </div>
                <p className="text-xs text-gray-600">{checkup.type}</p>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 flex items-center justify-center gap-2 py-2 border border-gray-200 rounded-lg text-xs text-gray-700 hover:bg-gray-50 transition-colors">
            <Icons.Plus className="w-4 h-4" />
            Tambah Jadwal
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
