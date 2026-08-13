'use client'

import { usePathname } from 'next/navigation'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { TopNavLayout } from '@/components/layout/TopNavLayout'

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  // Use TopNavLayout for finance, accounting, inventory, sales, procurement, production, and medis routes (no sidebar)
  if (pathname?.startsWith('/dashboard/finance') || pathname?.startsWith('/dashboard/accounting') || pathname?.startsWith('/dashboard/inventory') || pathname?.startsWith('/dashboard/sales') || pathname?.startsWith('/dashboard/procurement') || pathname?.startsWith('/dashboard/production') || pathname?.startsWith('/dashboard/medis')) {
    return <TopNavLayout>{children}</TopNavLayout>
  }

  // HR main page uses its own layout with custom header (no TopNav)
  if (pathname === '/dashboard/hr') {
    return <div className="min-h-screen">{children}</div>
  }

  // Machines page uses its own layout without sidebar (full-screen)
  if (pathname?.startsWith('/dashboard/machines')) {
    return <div className="min-h-screen">{children}</div>
  }

  // Use DashboardLayout for other routes (with sidebar)
  return <DashboardLayout>{children}</DashboardLayout>
}
