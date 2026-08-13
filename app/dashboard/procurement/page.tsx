'use client'

import React, { useState } from 'react'
import * as Icons from 'lucide-react'
import { StatusBadge } from '@/components/ui/StatusBadge'

// ─── Purchase Trend Line Chart ───────────────────────────────────────────────────
const purchaseTrendData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
  purchaseAmount: [850, 920, 780, 1050, 980, 1120, 1250, 1180, 1340, 1420, 1380, 1550], // In millions
  orderCount: [42, 45, 38, 52, 48, 56, 62, 58, 68, 72, 70, 78],
}

const PurchaseTrendChart: React.FC<{ mode: 'amount' | 'count' }> = ({ mode }) => {
  const W = 680
  const H = 240
  const padL = 60
  const padR = 16
  const padT = 16
  const padB = 40
  const chartW = W - padL - padR
  const chartH = H - padT - padB

  const data = mode === 'amount' ? purchaseTrendData.purchaseAmount : purchaseTrendData.orderCount
  const maxVal = Math.ceil(Math.max(...data) * 1.1 / 100) * 100
  const minVal = 0

  const xStep = chartW / (purchaseTrendData.labels.length - 1)

  const toX = (i: number) => padL + i * xStep
  const toY = (v: number) => padT + chartH - ((v - minVal) / (maxVal - minVal)) * chartH

  const makePolyline = (data: number[]) =>
    data.map((v, i) => `${toX(i)},${toY(v)}`).join(' ')

  const makeAreaPath = (data: number[]) => {
    const pts = data.map((v, i) => `${toX(i)},${toY(v)}`).join(' L ')
    return `M ${toX(0)},${toY(data[0])} L ${pts} L ${toX(data.length - 1)},${padT + chartH} L ${toX(0)},${padT + chartH} Z`
  }

  // Y-axis ticks - 5 ticks
  const yTicks = [0, maxVal * 0.25, maxVal * 0.5, maxVal * 0.75, maxVal].map(v => Math.round(v))

  // Green gradient (matching brand theme)
  const gradientStart = '#e8f5e9'  // light green
  const gradientEnd = '#2E7D32'    // brand green

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
      <defs>
        <linearGradient id="purchaseTrendGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={gradientStart} stopOpacity="0.25" />
          <stop offset="100%" stopColor={gradientEnd} stopOpacity="0.02" />
        </linearGradient>
      </defs>

      {/* Y-axis grid lines & labels */}
      {yTicks.map((t, idx) => {
        const y = toY(t)
        if (idx === 0) return null // Skip bottom line (handled by baseline)
        return (
          <g key={t}>
            <line x1={padL} y1={y} x2={W - padR} y2={y} stroke="#e1e0d9" strokeWidth="1" />
            <text x={padL - 8} y={y + 3} textAnchor="end" fontSize="10" fill="#898781">
              {mode === 'amount' ? `Rp ${(t / 1000).toFixed(1)}M` : t}
            </text>
          </g>
        )
      })}

      {/* Baseline */}
      <line x1={padL} y1={padT + chartH} x2={W - padR} y2={padT + chartH} stroke="#c3c2b7" strokeWidth="2" />

      {/* Area fill */}
      <path d={makeAreaPath(data)} fill="url(#purchaseTrendGrad)" />

      {/* Line */}
      <polyline
        points={makePolyline(data)}
        fill="none"
        stroke={gradientEnd}
        strokeWidth="2.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* Data points */}
      {data.map((v, i) => (
        <circle key={i} cx={toX(i)} cy={toY(v)} r="4" fill="white" stroke={gradientEnd} strokeWidth="2" />
      ))}

      {/* X-axis labels */}
      {purchaseTrendData.labels.map((lbl, i) => (
        <text key={i} x={toX(i)} y={H - 10} textAnchor="middle" fontSize="10" fill="#898781">
          {lbl}
        </text>
      ))}
    </svg>
  )
}

// ─── Supplier Category Donut Chart ───────────────────────────────────────────────
interface DonutSlice {
  label: string
  value: number
  // Using green shades only - matching brand theme
  color: string
}

const supplierCategories: DonutSlice[] = [
  { label: 'Bahan Baku Tekstil', value: 42, color: '#2E7D32' },    // brand green - darkest
  { label: 'Aksesoris & Kancing', value: 24, color: '#4CAF50' },    // medium green
  { label: 'Benang & Lainnya', value: 18, color: '#81C784' },      // light green
  { label: 'Kemasan & Label', value: 16, color: '#C8E6C9' },       // very light green
]

const SupplierCategoryDonut: React.FC = () => {
  const cx = 100, cy = 100, R = 78, r = 50
  let cumAngle = -Math.PI / 2

  const toRad = (pct: number) => (pct / 100) * 2 * Math.PI

  const slicePaths = supplierCategories.map((s) => {
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
    <svg viewBox="0 0 200 200" className="w-full h-full">
      {slicePaths.map((s) => (
        <path key={s.label} d={s.d} fill={s.color} stroke="white" strokeWidth="2" />
      ))}
      {/* Center text */}
      <text x={cx} y={cy - 5} textAnchor="middle" fontSize="9" fill="#898781">Total Supplier</text>
      <text x={cx} y={cy + 12} textAnchor="middle" fontSize="16" fontWeight="700" fill="#0b0b0b">24</text>
    </svg>
  )
}

// ─── Top Suppliers Horizontal Bar Chart ────────────────────────────────────────────
const topSuppliers = [
  { name: 'PT Tekstil Maju Jaya', value: 2450, percentage: 100 },
  { name: 'CV Benang Berkah', value: 1820, percentage: 74 },
  { name: 'UD Aksesoris Garment', value: 1450, percentage: 59 },
  { name: 'PT Kemasan Indonesia', value: 1180, percentage: 48 },
  { name: 'CV Label Pro', value: 920, percentage: 38 },
]

const TopSuppliersChart: React.FC = () => {
  const barHeight = 28
  const gap = 12
  const maxBarWidth = 280

  // Sequential green ramp for magnitude - matching brand theme
  const getBarColor = (percentage: number) => {
    // Using green shades: darker = higher value
    if (percentage >= 80) return '#1b5e20'  // dark green
    if (percentage >= 60) return '#2E7D32'  // brand green
    if (percentage >= 40) return '#4CAF50'  // medium green
    return '#81C784'  // light green
  }

  return (
    <div className="space-y-3">
      {topSuppliers.map((supplier, index) => (
        <div key={index} className="flex items-center gap-3">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs font-medium text-gray-900 truncate max-w-[140px]">{supplier.name}</p>
              <p className="text-xs font-semibold text-gray-700">{supplier.value}jt</p>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${supplier.percentage}%`,
                  backgroundColor: getBarColor(supplier.percentage),
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── Recent Purchase Orders Data ─────────────────────────────────────────────────
const recentPurchaseOrders = [
  {
    id: '#PO-2026-089',
    supplier: 'PT Tekstil Maju Jaya',
    date: '18 Okt 2026',
    amount: 'Rp 245.000.000',
    status: 'pending_approval',
    statusLabel: 'Menunggu Approval',
    items: 12,
    expectedDelivery: '25 Okt 2026',
  },
  {
    id: '#PO-2026-088',
    supplier: 'CV Benang Berkah',
    date: '16 Okt 2026',
    amount: 'Rp 182.000.000',
    status: 'approved',
    statusLabel: 'Disetujui',
    items: 8,
    expectedDelivery: '28 Okt 2026',
  },
  {
    id: '#PO-2026-087',
    supplier: 'UD Aksesoris Garment',
    date: '15 Okt 2026',
    amount: 'Rp 95.500.000',
    status: 'processing',
    statusLabel: 'Diproses',
    items: 15,
    expectedDelivery: '22 Okt 2026',
  },
  {
    id: '#PO-2026-086',
    supplier: 'PT Kemasan Indonesia',
    date: '14 Okt 2026',
    amount: 'Rp 68.000.000',
    status: 'delivered',
    statusLabel: 'Diterima Sebagian',
    items: 6,
    expectedDelivery: '20 Okt 2026',
  },
  {
    id: '#PO-2026-085',
    supplier: 'CV Label Pro',
    date: '12 Okt 2026',
    amount: 'Rp 45.200.000',
    status: 'completed',
    statusLabel: 'Selesai',
    items: 4,
    expectedDelivery: '18 Okt 2026',
  },
]

// ─── Goods Receipts Summary Data ────────────────────────────────────────────────────
const goodsReceiptsData = [
  { period: 'Minggu Ini', received: 8, pending: 3, onTime: 85 },
  { period: 'Bulan Ini', received: 42, pending: 12, onTime: 78 },
  { period: 'Kuartal Ini', received: 128, pending: 35, onTime: 82 },
]

// ─── KPI Cards Data ───────────────────────────────────────────────────────────────
const kpiCards = [
  {
    icon: <Icons.LineChart className="w-5 h-5 text-[#2E7D32]" />,
    label: 'TOTAL PEMBELIAN (YTD)',
    value: 'Rp 12.450.000.000',
    trend: '+15.2%',
    trendUp: true,
    bgColor: '#ffffff',
  },
  {
    icon: <Icons.FileText className="w-5 h-5 text-[#2E7D32]" />,
    label: 'PO TERTUNDA',
    value: '18',
    trend: '-4',
    trendUp: true,
    bgColor: '#ffffff',
  },
  {
    icon: <Icons.Building className="w-5 h-5 text-[#2E7D32]" />,
    label: 'TOTAL SUPPLIER',
    value: '24',
    trend: '+3',
    trendUp: true,
    bgColor: '#ffffff',
  },
  {
    icon: <Icons.Clock className="w-5 h-5 text-[#2E7D32]" />,
    label: 'RATA-RATA LEAD TIME',
    value: '12 Hari',
    trend: '-1.5 Hari',
    trendUp: true,
    bgColor: '#ffffff',
  },
]

// ─── Procurement Page ────────────────────────────────────────────────────────────
export default function ProcurementPage() {
  const [trendMode, setTrendMode] = useState<'amount' | 'count'>('amount')
  const [timeFilter, setTimeFilter] = useState('12m')

  return (
    <div className="space-y-6">
      {/* ── Page Header ── */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Pembelian</h1>
          <p className="text-sm text-gray-500 mt-1">Ringkasan aktivitas pembelian, supplier, dan purchase order</p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/20 focus:border-[#2E7D32] bg-white border-gray-300 text-gray-700"
          >
            <option value="12m">12 Bulan Terakhir</option>
            <option value="30d">30 Hari Terakhir</option>
            <option value="90d">90 Hari Terakhir</option>
            <option value="ytd">Year to Date</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#2E7D32] text-white rounded-lg text-sm font-medium hover:bg-[#1b5e20] transition-colors">
            <Icons.Plus className="w-4 h-4" />
            PO Baru
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

      {/* ── Charts Row ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Purchase Trend Chart */}
        <div className="lg:col-span-2 bg-[#f8f9fa] rounded-xl border border-gray-200 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900 text-sm">Tren Pembelian</h2>
            <div className="flex items-center gap-3">
              {/* Legend */}
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1.5 text-xs text-gray-500">
                  <span className="w-3 h-3 rounded-full bg-[#2E7D32] inline-block" />
                  {trendMode === 'amount' ? 'Nilai Pembelian' : 'Jumlah PO'}
                </span>
              </div>
              {/* Toggle */}
              <div className="flex rounded-lg overflow-hidden border border-gray-200 border-gray-200 text-xs">
                {(['amount', 'count'] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setTrendMode(m)}
                    className={`px-3 py-1.5 transition-colors ${
                      trendMode === m
                        ? 'bg-[#2E7D32] text-white font-medium'
                        : 'bg-white bg-white text-gray-600 hover:bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    {m === 'amount' ? 'Nilai' : 'Jumlah'}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="h-[240px]">
            <PurchaseTrendChart mode={trendMode} />
          </div>
        </div>

        {/* Supplier Categories */}
        <div className="bg-[#f8f9fa] rounded-xl border border-gray-200 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900 text-sm">Kategori Supplier</h2>
            <Icons.MoreVertical className="w-4 h-4 text-gray-400" />
          </div>
          <div className="h-[200px] flex items-center justify-center">
            <SupplierCategoryDonut />
          </div>
          {/* Legend */}
          <div className="grid grid-cols-2 gap-2 mt-3">
            {supplierCategories.map((cat) => (
              <div key={cat.label} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: cat.color }} />
                <span className="text-xs text-gray-600">{cat.label}</span>
                <span className="text-xs font-medium text-gray-900 ml-auto">{cat.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Middle Row ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Top Suppliers */}
        <div className="bg-[#f8f9fa] rounded-xl border border-gray-200 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900 text-sm">Supplier Teratas (Berdasarkan Nilai)</h2>
            <button className="text-xs text-[#2E7D32] font-medium hover:underline flex items-center gap-1">
              Lihat Semua <Icons.ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <TopSuppliersChart />
        </div>

        {/* Goods Receipts Summary */}
        <div className="bg-[#f8f9fa] rounded-xl border border-gray-200 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900 text-sm">Ringkasan Penerimaan Barang</h2>
            <Icons.Package className="w-4 h-4 text-gray-400" />
          </div>
          <div className="space-y-4">
            {goodsReceiptsData.map((item, index) => (
              <div key={index} className="flex items-center justify-between pb-3 border-b border-gray-100 border-gray-200 last:border-0 last:pb-0">
                <div>
                  <p className="text-sm font-medium text-gray-900">{item.period}</p>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-xs text-gray-500">
                      <span className="text-green-600 font-medium">{item.received} diterima</span>
                      {' '}/ {item.pending} pending
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">{item.onTime}%</p>
                  <p className="text-xs text-gray-500">On-Time</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Recent Purchase Orders Table ── */}
      <div className="bg-[#f8f9fa] rounded-xl border border-gray-200 shadow-sm">
        <div className="p-5 border-b border-gray-100 border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">Purchase Order Terbaru</h2>
            <button className="text-xs text-[#2E7D32] font-medium hover:underline flex items-center gap-1">
              Lihat Semua <Icons.ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 border-gray-200 bg-gray-50 bg-gray-50">
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider py-3 px-5">No. PO</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider py-3 px-5">Supplier</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider py-3 px-5">Tanggal</th>
                <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider py-3 px-5">Nilai</th>
                <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wider py-3 px-5">Item</th>
                <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider py-3 px-5">Est. Pengiriman</th>
                <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wider py-3 px-5">Status</th>
                <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wider py-3 px-5">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 divide-gray-100">
              {recentPurchaseOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 hover:bg-gray-100 transition-colors">
                  <td className="py-3 px-5">
                    <span className="font-medium text-gray-900 text-xs">{order.id}</span>
                  </td>
                  <td className="py-3 px-5">
                    <span className="text-gray-700 text-xs">{order.supplier}</span>
                  </td>
                  <td className="py-3 px-5">
                    <span className="text-gray-500 text-xs">{order.date}</span>
                  </td>
                  <td className="py-3 px-5 text-right">
                    <span className="font-semibold text-gray-900 text-xs">{order.amount}</span>
                  </td>
                  <td className="py-3 px-5 text-center">
                    <span className="text-gray-600 text-xs">{order.items}</span>
                  </td>
                  <td className="py-3 px-5">
                    <span className="text-gray-500 text-xs">{order.expectedDelivery}</span>
                  </td>
                  <td className="py-3 px-5 text-center">
                    <StatusBadge status={order.statusLabel} type={order.status === 'pending_approval' ? 'warning' : order.status === 'approved' || order.status === 'completed' ? 'success' : order.status === 'processing' ? 'processing' : 'info'} size="sm" />
                  </td>
                  <td className="py-3 px-5 text-center">
                    <button className="text-[#2E7D32] hover:text-[#1b5e20] hover:text-[#1b5e20] transition-colors">
                      <Icons.Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
            <a href="#" className="hover:text-gray-900 hover:text-gray-900 transition-colors">Kebijakan Privasi</a>
            <a href="#" className="hover:text-gray-900 hover:text-gray-900 transition-colors">Ketentuan Layanan</a>
            <a href="#" className="hover:text-gray-900 hover:text-gray-900 transition-colors">Dukungan</a>
            <a href="#" className="hover:text-gray-900 hover:text-gray-900 transition-colors">Dokumentasi</a>
          </div>
        </div>
      </div>

    </div>
  )
}
