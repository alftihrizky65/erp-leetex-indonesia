'use client'

import React, { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import * as Icons from 'lucide-react'
import {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  DropdownSeparator
} from '@/components/ui/Dropdown'

// Icon component mapping
const Icon = ({ name, className }: { name: string; className?: string }) => {
  const LucideIcon = (Icons as Record<string, React.ComponentType<{ className?: string }>>)[name]
  return LucideIcon ? <LucideIcon className={className} /> : null
}

interface BreadcrumbItem {
  label: string
  path?: string
}

interface HeaderProps {
  onMobileMenuToggle?: () => void
  isMobileMenuOpen?: boolean
}

export const Header: React.FC<HeaderProps> = ({
  onMobileMenuToggle,
  isMobileMenuOpen = false
}) => {
  const pathname = usePathname()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [notificationCount, setNotificationCount] = useState(0)
  const [messageCount, setMessageCount] = useState(0)
  const [currentPage, setCurrentPage] = useState('Dashboard')
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([
    { label: 'Home', path: '/' }
  ])

  // Update page title and breadcrumbs based on current route
  useEffect(() => {
    const pathSegments = pathname.split('/').filter(Boolean)

    if (pathSegments.length === 0) {
      setCurrentPage('Dashboard')
      setBreadcrumbs([{ label: 'Home', path: '/' }])
      return
    }

    // Build breadcrumbs from path segments
    const newBreadcrumbs: BreadcrumbItem[] = [{ label: 'Home', path: '/' }]

    // Map common routes to readable labels
    const routeLabels: Record<string, string> = {
      dashboard: 'Dashboard',
      hr: 'HR & Employees',
      employees: 'Employees',
      shifts: 'Shifts',
      schedules: 'Schedules',
      attendance: 'Attendance',
      payroll: 'Payroll',
      payrolls: 'Payrolls',
      payslips: 'Payslips',
      finance: 'Finance',
      transactions: 'Transactions',
      cashflow: 'Cash Flow',
      inventory: 'Inventory',
      products: 'Products',
      categories: 'Categories',
      stock: 'Stock',
      machines: 'Machines',
      maintenance: 'Maintenance',
      sales: 'Sales',
      customers: 'Customers',
      orders: 'Sales Orders',
      procurement: 'Procurement',
      suppliers: 'Suppliers',
      po: 'Purchase Orders',
      receipts: 'Goods Receipts',
      production: 'Production',
      'work-orders': 'Work Orders',
      bom: 'Bill of Materials',
      stages: 'Production Stages',
      profile: 'Profile',
      settings: 'Settings'
    }

    let currentPath = ''
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`
      const label = routeLabels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1)
      newBreadcrumbs.push({ label, path: currentPath })
    })

    setBreadcrumbs(newBreadcrumbs)
    setCurrentPage(newBreadcrumbs[newBreadcrumbs.length - 1].label)
  }, [pathname])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Implement global search logic here
      console.log('Searching for:', searchQuery)
      // For now, just navigate to a search results page
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  const handleNotificationClick = () => {
    // Mark notifications as read
    setNotificationCount(0)
    // Navigate to notifications page
    router.push('/notifications')
  }

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-gray-200 bg-white px-4 sm:px-6 lg:px-8">
      {/* Left Section: Mobile Toggle & Breadcrumbs */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {/* Mobile Menu Toggle */}
        <button
          type="button"
          onClick={onMobileMenuToggle}
          className={cn(
            'lg:hidden inline-flex items-center justify-center rounded-lg p-2',
            'text-gray-700 hover:text-gray-900',
            'hover:bg-gray-100 transition-all duration-150',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400'
          )}
          aria-label="Toggle menu"
        >
          <Icons.Menu className="h-5 w-5" />
        </button>

        {/* Breadcrumbs */}
        <nav className="hidden sm:flex items-center gap-1.5 text-sm">
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={crumb.path}>
              {index > 0 && (
                <Icons.ChevronRight className="h-4 w-4 text-muted-foreground/50" />
              )}
              {index === breadcrumbs.length - 1 ? (
                <span className="font-medium text-foreground truncate max-w-[150px] sm:max-w-[200px]">
                  {crumb.label}
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => crumb.path && router.push(crumb.path)}
                  className={cn(
                    'text-muted-foreground hover:text-foreground transition-colors',
                    'truncate max-w-[100px] sm:max-w-[150px]'
                  )}
                >
                  {crumb.label}
                </button>
              )}
            </React.Fragment>
          ))}
        </nav>

        {/* Current Page Title - Mobile Only */}
        <h1 className="sm:hidden text-base font-semibold text-foreground truncate">
          {currentPage}
        </h1>
      </div>

      {/* Center Section: Page Title (Desktop) & Search */}
      <div className="flex items-center gap-4 flex-1 justify-center">
        {/* Page Title - Desktop */}
        <h2 className="hidden sm:block text-lg font-semibold text-foreground">
          {currentPage}
        </h2>
      </div>

      {/* Right Section: Search, Notifications, User Menu */}
      <div className="flex items-center gap-2 sm:gap-3 flex-1 justify-end">
        {/* Search Bar */}
        <div className="relative hidden sm:block">
          {isSearchOpen ? (
            <form onSubmit={handleSearch} className="relative flex items-center">
              <Icons.Search className="absolute left-3 h-4 w-4 text-gray-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari..."
                className={cn(
                  'h-8 w-56 rounded-lg border border-gray-300 bg-white pl-9 pr-7 py-1.5',
                  'text-sm',
                  'placeholder:text-gray-400',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400',
                  'transition-all duration-150'
                )}
                autoFocus
              />
              <button
                type="button"
                onClick={() => {
                  setIsSearchOpen(false)
                  setSearchQuery('')
                }}
                className="absolute right-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Icons.X className="h-3.5 w-3.5" />
              </button>
            </form>
          ) : (
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className={cn(
                'inline-flex items-center gap-2 rounded-lg px-3 py-1.5',
                'text-sm text-gray-600',
                'bg-gray-100 hover:bg-gray-200',
                'transition-all duration-150',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400'
              )}
            >
              <Icons.Search className="h-4 w-4" />
              <span className="hidden md:inline">Cari</span>
              <kbd className="hidden md:inline-flex items-center gap-1 rounded border border-gray-300 bg-white px-1.5 py-0.5 text-[10px] font-medium text-gray-600">
                ⌘K
              </kbd>
            </button>
          )}
        </div>

        {/* Mobile Search Button */}
        <button
          type="button"
          onClick={() => setIsSearchOpen(!isSearchOpen)}
          className={cn(
            'sm:hidden inline-flex items-center justify-center rounded-lg p-2',
            'text-gray-700 hover:text-gray-900',
            'hover:bg-gray-100 transition-all duration-150',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400'
          )}
          aria-label="Search"
        >
          <Icons.Search className="h-5 w-5" />
        </button>

        {/* Messages */}
        <button
          type="button"
          onClick={() => router.push('/messages')}
          className={cn(
            'relative inline-flex items-center justify-center rounded-lg p-2',
            'text-gray-700 hover:text-gray-900',
            'hover:bg-gray-100 transition-all duration-150',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400'
          )}
          aria-label="Messages"
        >
          <Icons.MessageSquare className="h-5 w-5" />
          {messageCount > 0 && (
            <span className={cn(
              'absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center',
              'rounded-full bg-[#1a472a] text-white',
              'text-[10px] font-medium'
            )}>
              {messageCount > 9 ? '9+' : messageCount}
            </span>
          )}
        </button>

        {/* Notifications */}
        <button
          type="button"
          onClick={handleNotificationClick}
          className={cn(
            'relative inline-flex items-center justify-center rounded-lg p-2',
            'text-gray-700 hover:text-gray-900',
            'hover:bg-gray-100 transition-all duration-150',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400'
          )}
          aria-label="Notifications"
        >
          <Icons.Bell className="h-5 w-5" />
          {notificationCount > 0 && (
            <span className={cn(
              'absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center',
              'rounded-full bg-red-500 text-white',
              'text-[10px] font-medium'
            )}>
              {notificationCount > 9 ? '9+' : notificationCount}
            </span>
          )}
        </button>

        {/* User Dropdown Menu */}
        <Dropdown align="right">
          <DropdownTrigger asChild>
            <button
              type="button"
              className={cn(
                'relative inline-flex items-center justify-center gap-2 rounded-lg px-2 py-1.5',
                'text-gray-700 hover:text-gray-900',
                'hover:bg-gray-100 transition-all duration-150',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400'
              )}
              aria-label="User menu"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1a472a]">
                <Icons.User className="h-4 w-4 text-white" />
              </div>
              <div className="hidden md:flex flex-col items-start">
                <span className="text-xs font-medium text-gray-900">Admin</span>
              </div>
            </button>
          </DropdownTrigger>
          <DropdownContent className="w-48">
            <div className="px-3 py-2 border-b border-gray-100">
              <p className="text-sm font-medium text-gray-900">Admin User</p>
              <p className="text-xs text-gray-500 truncate">admin@leetex.co.id</p>
            </div>
            <DropdownItem
              icon={<Icons.User className="h-4 w-4" />}
              onClick={() => router.push('/profile')}
            >
              Profil
            </DropdownItem>
            <DropdownItem
              icon={<Icons.Settings className="h-4 w-4" />}
              onClick={() => router.push('/settings')}
            >
              Pengaturan
            </DropdownItem>
            <DropdownSeparator />
            <DropdownItem
              icon={<Icons.LogOut className="h-4 w-4" />}
              onClick={() => {
                console.log('Logging out...')
                router.push('/login')
              }}
            >
              Keluar
            </DropdownItem>
          </DropdownContent>
        </Dropdown>
      </div>

      {/* Mobile Search Overlay */}
      {isSearchOpen && (
        <div className="sm:hidden fixed inset-0 z-50 bg-white/95 backdrop-blur-sm">
          <div className="flex h-14 items-center gap-3 border-b border-gray-200 px-4">
            <button
              type="button"
              onClick={() => setIsSearchOpen(false)}
              className="inline-flex items-center justify-center rounded-lg p-2 text-gray-700 hover:text-gray-900"
            >
              <Icons.ArrowLeft className="h-5 w-5" />
            </button>
            <form onSubmit={handleSearch} className="flex-1 relative flex items-center">
              <Icons.Search className="absolute left-3 h-4 w-4 text-gray-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari..."
                className={cn(
                  'h-9 w-full rounded-lg border border-gray-300 bg-white pl-9 pr-4 py-2',
                  'text-sm',
                  'placeholder:text-gray-400',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400'
                )}
                autoFocus
              />
            </form>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
