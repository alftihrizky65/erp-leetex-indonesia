'use client'

import React, { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import * as Icons from 'lucide-react'
import { Sidebar, MobileOverlay } from './Sidebar'
import { Header } from './Header'

/**
 * DashboardLayout - Main layout wrapper for all dashboard pages
 *
 * Features:
 * - Responsive sidebar (fixed on desktop, slide-out on mobile)
 * - Sticky header with breadcrumbs and navigation
 * - Content area with proper padding
 * - Mobile menu overlay
 * - State persistence across route changes
 */

interface DashboardLayoutProps {
  children: React.ReactNode
}

/**
 * Breakpoint for switching between mobile and desktop sidebar behavior
 */
const DESKTOP_BREAKPOINT = 1024

/**
 * Local storage key for sidebar state persistence
 */
const SIDEBAR_STATE_KEY = 'leetex-erp-sidebar-collapsed'

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // Load sidebar collapsed state from localStorage on mount
  useEffect(() => {
    setIsMounted(true)
    const savedState = localStorage.getItem(SIDEBAR_STATE_KEY)
    if (savedState !== null) {
      setIsSidebarCollapsed(savedState === 'true')
    }
  }, [])

  // Save sidebar collapsed state to localStorage when it changes
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem(SIDEBAR_STATE_KEY, isSidebarCollapsed.toString())
    }
  }, [isSidebarCollapsed, isMounted])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  // Close mobile menu when switching to desktop breakpoint
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= DESKTOP_BREAKPOINT && isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isMobileMenuOpen])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  const toggleSidebarCollapse = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  // Don't render until mounted to prevent hydration mismatch
  if (!isMounted) {
    return (
      <div className="flex h-screen">
        <div className="flex-1 flex flex-col">
          <div className="h-16 border-b border-border animate-pulse bg-muted/20" />
          <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
            <div className="animate-pulse bg-muted/20 h-64 rounded-lg" />
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Mobile Overlay */}
      <MobileOverlay isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      {/* Mobile Sidebar */}
      <div className="lg:hidden fixed inset-0 z-40 pointer-events-none">
        <Sidebar
          isOpen={isMobileMenuOpen}
          onMobileClose={() => setIsMobileMenuOpen(false)}
        />
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar
          isOpen={true}
          isCollapsed={isSidebarCollapsed}
          onMobileClose={undefined}
        />
      </div>

      {/* Main Content Area */}
      <div
        className={cn(
          'flex-1 flex flex-col min-w-0 transition-all duration-300',
          'lg:ml-64' // Default sidebar width
        )}
      >
        {/* Header */}
        <Header
          onMobileMenuToggle={toggleMobileMenu}
          isMobileMenuOpen={isMobileMenuOpen}
        />

        {/* Page Content */}
        <main
          className={cn(
            'flex-1 overflow-auto',
            // Proper padding for content area
            'p-6 sm:p-8 lg:p-8',
            // Prevent layout shift during transitions
            'transition-all duration-300'
          )}
        >
          {children}
        </main>

        {/* Footer (Optional - can be expanded) */}
        <footer className="border-t border-gray-200 bg-white px-6 py-3 sm:px-8 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
            <p>
              &copy; {new Date().getFullYear()} PT Leetex Garment Indonesia
            </p>
            <div className="flex items-center gap-4">
              <a
                href="/help"
                className="hover:text-gray-700 transition-colors"
              >
                Bantuan
              </a>
              <a
                href="/privacy"
                className="hover:text-gray-700 transition-colors"
              >
                Privasi
              </a>
              <a
                href="/terms"
                className="hover:text-gray-700 transition-colors"
              >
                Ketentuan
              </a>
            </div>
          </div>
        </footer>
      </div>

      {/* Sidebar Collapse Toggle (Desktop) */}
      <button
        type="button"
        onClick={toggleSidebarCollapse}
        className={cn(
          'hidden lg:flex fixed bottom-6 z-50',
          // Position based on sidebar state
          isSidebarCollapsed ? 'left-20' : 'left-60',
          'items-center justify-center',
          'h-7 w-7 rounded-full bg-[#1a472a] text-white',
          'shadow-md',
          'hover:bg-[#2d5a3d] hover:scale-105',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2',
          'transition-all duration-200'
        )}
        aria-label={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        <Icons.ChevronRight
          className={cn(
            'h-3.5 w-3.5 transition-transform duration-200',
            !isSidebarCollapsed && 'rotate-180'
          )}
        />
      </button>
    </div>
  )
}

export default DashboardLayout
