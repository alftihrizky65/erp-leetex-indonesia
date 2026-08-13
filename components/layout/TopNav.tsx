'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import * as Icons from 'lucide-react'

/**
 * TopNav - Top navigation bar matching the design exactly
 *
 * Features:
 * - Logo and company name on the left
 * - Navigation buttons in the center
 * - Search bar and icons on the right
 */

export const TopNav: React.FC = () => {
  const pathname = usePathname()
  const [searchQuery, setSearchQuery] = useState('')

  const navItems = [
    { label: 'Kembali ke Beranda', href: '/', variant: 'primary' as const },
    { label: 'Dashboard', href: '/dashboard', variant: 'default' as const },
    { label: 'Buku Besar', href: '/dashboard/finance/ledger', variant: 'default' as const },
    { label: 'Laporan', href: '/dashboard/finance/reports', variant: 'default' as const },
    { label: 'Arus Kas', href: '/dashboard/finance/cashflow', variant: 'default' as const },
  ]

  return (
    <nav className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6 shadow-sm">
      {/* Left: Logo + Company Name */}
      <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
        {/* Logo from public/img */}
        <div className="relative h-10 w-10 flex-shrink-0">
          <Image
            src="/img/images-removebg-preview.png"
            alt="Logo Leetex"
            fill
            className="object-contain"
            sizes="40px"
          />
        </div>
        {/* Company Name - GREEN like in main dashboard */}
        <div className="flex flex-col">
          <span className="text-base font-bold text-[#2E7D32] leading-tight">
            PT Leetex Garment Indonesia
          </span>
        </div>
      </Link>

      {/* Center: Navigation Buttons */}
      <div className="flex items-center gap-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)

          if (item.variant === 'primary') {
            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  'rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200',
                  'bg-[#2E7D32] text-white hover:bg-[#1b5e20]'
                )}
              >
                {item.label}
              </Link>
            )
          }

          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                'rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200',
                isActive
                  ? 'text-[#2E7D32] bg-green-50'
                  : 'text-gray-700 hover:bg-gray-100'
              )}
            >
              {item.label}
            </Link>
          )
        })}
      </div>

      {/* Right: Search + Icons */}
      <div className="flex items-center gap-3">
        {/* Search Bar */}
        <div className="relative">
          <Icons.Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari..."
            className={cn(
              'h-9 w-64 rounded-lg border border-gray-300 bg-gray-50',
              'pl-10 pr-4 text-sm text-gray-800',
              'placeholder:text-gray-400',
              'focus:border-[#2E7D32] focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/20',
              'transition-all duration-200'
            )}
          />
        </div>

        {/* Divider */}
        <div className="h-6 w-px bg-gray-300" />

        {/* Bell Icon - Notifications */}
        <button
          type="button"
          className={cn(
            'relative flex h-9 w-9 items-center justify-center rounded-lg',
            'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
            'transition-all duration-200'
          )}
          aria-label="Notifikasi"
        >
          <Icons.Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
        </button>

        {/* Gear Icon - Settings */}
        <button
          type="button"
          className={cn(
            'flex h-9 w-9 items-center justify-center rounded-lg',
            'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
            'transition-all duration-200'
          )}
          aria-label="Pengaturan"
        >
          <Icons.Settings className="h-5 w-5" />
        </button>

        {/* User Avatar */}
        <button
          type="button"
          className={cn(
            'flex h-9 w-9 items-center justify-center rounded-full',
            'bg-gray-200 overflow-hidden',
            'hover:ring-2 hover:ring-[#2E7D32]',
            'transition-all duration-200'
          )}
          aria-label="Menu pengguna"
        >
          <Icons.User className="h-5 w-5 text-gray-600" />
        </button>
      </div>
    </nav>
  )
}

export default TopNav
