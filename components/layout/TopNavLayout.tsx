'use client'

import React from 'react'
import { TopNav } from './TopNav'

/**
 * TopNavLayout - Layout wrapper for pages using top navigation
 * This replaces DashboardLayout for pages that need the top nav design
 * No sidebar, fullscreen layout
 */

interface TopNavLayoutProps {
  children: React.ReactNode
}

export const TopNavLayout: React.FC<TopNavLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <TopNav />
      <main className="flex-1 p-6 lg:p-8">
        {children}
      </main>
      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white px-6 py-4 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <p>
            PT Leetex Garment Indonesia | © 2024 Enterprise Financial Suite
          </p>
          <div className="flex items-center gap-4">
            <a
              href="/privacy"
              className="hover:text-gray-700 transition-colors"
            >
              Kebijakan Privasi
            </a>
            <a
              href="/terms"
              className="hover:text-gray-700 transition-colors"
            >
              Ketentuan Layanan
            </a>
            <a
              href="/audit"
              className="hover:text-gray-700 transition-colors"
            >
              Log Audit
            </a>
            <a
              href="/support"
              className="hover:text-gray-700 transition-colors"
            >
              Dukungan
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default TopNavLayout
