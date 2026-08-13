import * as Icons from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { DashboardClient } from '@/components/dashboard/DashboardClient'
import { getDashboardStats } from '@/lib/dashboard-data'
import { MainHeader } from '@/components/dashboard/MainHeader'

// Module data based on database structure
const modules = [
  { id: 'hr', title: 'HR & Karyawan', icon: Icons.Users, color: 'from-blue-500 to-blue-600', path: '/dashboard/hr' },
  { id: 'payroll', title: 'Payroll', icon: Icons.Banknote, color: 'from-emerald-500 to-emerald-600', path: '/dashboard/payroll' },
  { id: 'finance', title: 'Keuangan', icon: Icons.Wallet, color: 'from-green-500 to-green-600', path: '/dashboard/finance' },
  { id: 'accounting', title: 'Akuntansi', icon: Icons.BookOpen, color: 'from-teal-500 to-teal-600', path: '/dashboard/accounting' },
  { id: 'inventory', title: 'Inventaris', icon: Icons.Package, color: 'from-amber-500 to-amber-600', path: '/dashboard/inventory' },
  { id: 'machines', title: 'Mesin', icon: Icons.Settings, color: 'from-slate-500 to-slate-600', path: '/dashboard/machines' },
  { id: 'sales', title: 'Penjualan', icon: Icons.ShoppingCart, color: 'from-purple-500 to-purple-600', path: '/dashboard/sales' },
  { id: 'procurement', title: 'Pembelian', icon: Icons.Truck, color: 'from-orange-500 to-orange-600', path: '/dashboard/procurement' },
  { id: 'production', title: 'Produksi', icon: Icons.Hammer, color: 'from-red-500 to-red-600', path: '/dashboard/production' },
  { id: 'medis', title: 'Medis & K3', icon: Icons.HeartPulse, color: 'from-rose-500 to-rose-600', path: '/dashboard/medis' }
]

// Server Component - fetches data on server for fast initial load
export default async function Home() {
  // Fetch data server-side (fast, no client-side hydration delay)
  const stats = await getDashboardStats()

  return (
    <div className="min-h-screen bg-white">
      {/* Header with Inbox */}
      <MainHeader />

      {/* Main Content - Server rendered with data */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <div className="flex items-center gap-2 mt-2">
            <p className="text-gray-500">Sistem ERP PT Leetex Garment Indonesia</p>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Live
            </span>
          </div>
        </div>

        {/* Quick Stats - Server rendered */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            label="Karyawan"
            value={stats.employees}
            change="Aktif"
            color="blue"
            icon={Icons.Users}
          />
          <StatCard
            label="Pesanan"
            value={stats.orders}
            change="+12%"
            color="purple"
            icon={Icons.ShoppingCart}
          />
          <StatCard
            label="Revenue"
            value={`Rp ${Math.round(stats.revenue / 1000000)}M`}
            change="+8%"
            color="green"
            icon={Icons.DollarSign}
          />
          <StatCard
            label="Work Order"
            value={stats.workOrders}
            change="Aktif"
            color="amber"
            icon={Icons.Hammer}
          />
        </div>

        {/* Module Grid */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Modul Sistem</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
            {modules.map((module) => (
              <ModuleCard key={module.id} module={module} stats={stats} />
            ))}
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
          <div className="bg-gradient-to-br from-green-700 to-green-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Sistem Online</h3>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-300 animate-pulse" />
                <span className="text-sm text-green-100">Aktif</span>
              </div>
            </div>
            <p className="text-green-100 text-sm mb-4">
              Semua sistem berjalan normal. Database terkoneksi.
            </p>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1.5">
                <Icons.Wifi className="w-4 h-4" />
                <span>Connected</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Icons.Database className="w-4 h-4" />
                <span>Database</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Statistik Bulan Ini</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Transaksi</p>
                <p className="font-bold text-gray-900 text-lg">{stats.transactions}</p>
              </div>
              <div>
                <p className="text-gray-500">Produk</p>
                <p className="font-bold text-gray-900 text-lg">{stats.products}</p>
              </div>
              <div>
                <p className="text-gray-500">Supplier</p>
                <p className="font-bold text-gray-900 text-lg">{stats.suppliers}</p>
              </div>
              <div>
                <p className="text-gray-500">Customer</p>
                <p className="font-bold text-gray-900 text-lg">{stats.customers}</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} PT Leetex Garment Indonesia</p>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <Icons.Wifi className="w-4 h-4" />
                Online
              </span>
              <span className="flex items-center gap-1.5">
                <Icons.Database className="w-4 h-4" />
                Database
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Server Component - Stat Card
function StatCard({
  label,
  value,
  change,
  color,
  icon: Icon,
}: {
  label: string
  value: number | string
  change: string
  color: 'blue' | 'purple' | 'green' | 'amber'
  icon: React.ComponentType<{ className?: string }>
}) {
  const colorMap = {
    blue: { light: 'bg-blue-50', text: 'text-blue-600' },
    purple: { light: 'bg-purple-50', text: 'text-purple-600' },
    green: { light: 'bg-green-50', text: 'text-green-600' },
    amber: { light: 'bg-amber-50', text: 'text-amber-600' },
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg hover:border-green-200 transition-all">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-14 h-14 rounded-2xl ${colorMap[color].light} flex items-center justify-center`}>
          <Icon className={`w-7 h-7 ${colorMap[color].text}`} />
        </div>
        <div className="text-xs font-medium bg-green-100 text-green-700 px-2.5 py-1 rounded-full">
          {change}
        </div>
      </div>
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
    </div>
  )
}

// Server Component - Module Card
function ModuleCard({
  module,
  stats,
}: {
  module: { id: string; title: string; icon: React.ComponentType<{ className?: string }>; color: string; path: string }
  stats: { employees: number; orders: number; workOrders: number }
}) {
  const Icon = module.icon

  return (
    <Link
      href={module.path}
      className="group bg-white rounded-xl border border-gray-200 p-5 hover:shadow-xl hover:-translate-y-2 transition-all"
    >
      <div className="flex items-center justify-between mb-3">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${module.color} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <Icons.ArrowUpRight className="w-5 h-5 text-gray-300 group-hover:text-green-700 group-hover:translate-x-1 transition-all" />
      </div>
      <h3 className="font-semibold text-gray-900 text-sm mb-1">{module.title}</h3>
      <p className="text-xs text-gray-400">
        {module.id === 'hr' && stats.employees > 0 && `${stats.employees} pegawai`}
        {module.id === 'sales' && stats.orders > 0 && `${stats.orders} order`}
        {module.id === 'production' && stats.workOrders > 0 && `${stats.workOrders} aktif`}
        {module.id === 'accounting' && '1,248 jurnal'}
        {module.id === 'medis' && 'P3K, K3, BPJS, Asuransi'}
      </p>
    </Link>
  )
}
