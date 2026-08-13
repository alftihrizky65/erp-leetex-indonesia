'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import * as Icons from 'lucide-react'

export default function AppearanceSettingsPage() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [accentColor, setAccentColor] = useState('green')
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const accentColors = [
    { name: 'Green', value: 'green', color: '#2E7D32' },
    { name: 'Blue', value: 'blue', color: '#1976D2' },
    { name: 'Purple', value: 'purple', color: '#7B1FA2' },
    { name: 'Orange', value: 'orange', color: '#F57C00' },
  ]

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/settings" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
              <Icons.ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Tampilan</h1>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#2E7D32] text-white rounded-lg text-sm font-medium hover:bg-[#1b5e20] transition-colors">
            <Icons.Save className="w-4 h-4" />
            Simpan Perubahan
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        {/* Theme Selection */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
            <h3 className="font-semibold text-gray-900">Tema</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setTheme('light')}
                className={`p-6 rounded-xl border-2 transition-all ${
                  theme === 'light'
                    ? 'border-[#2E7D32] bg-[#e8f5e9]'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <Icons.Sun className="w-6 h-6 text-gray-700" />
                  <span className="font-medium text-gray-900">Terang</span>
                </div>
                <p className="text-sm text-gray-500 text-left">Tema terang untuk penggunaan sehari-hari</p>
                {theme === 'light' && (
                  <div className="flex items-center gap-1 mt-3 text-[#2E7D32]">
                    <Icons.Check className="w-4 h-4" />
                    <span className="text-sm font-medium">Aktif</span>
                  </div>
                )}
              </button>

              <button
                onClick={() => setTheme('dark')}
                className={`p-6 rounded-xl border-2 transition-all ${
                  theme === 'dark'
                    ? 'border-[#2E7D32] bg-[#e8f5e9]'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <Icons.Moon className="w-6 h-6 text-gray-700" />
                  <span className="font-medium text-gray-900">Gelap</span>
                </div>
                <p className="text-sm text-gray-500 text-left">Tema gelap untuk kenyamanan mata</p>
                {theme === 'dark' && (
                  <div className="flex items-center gap-1 mt-3 text-[#2E7D32]">
                    <Icons.Check className="w-4 h-4" />
                    <span className="text-sm font-medium">Aktif</span>
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Accent Color */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
            <h3 className="font-semibold text-gray-900">Warna Aksen</h3>
          </div>
          <div className="p-6">
            <div className="flex items-center gap-4">
              {accentColors.map((color) => (
                <button
                  key={color.value}
                  onClick={() => setAccentColor(color.value)}
                  className={`relative w-16 h-16 rounded-xl border-2 transition-all ${
                    accentColor === color.value
                      ? 'border-gray-900 scale-110'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  style={{ backgroundColor: color.color }}
                >
                  {accentColor === color.value && (
                    <Icons.Check className="w-6 h-6 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                  )}
                </button>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-3">Pilih warna aksen untuk seluruh sistem</p>
          </div>
        </div>

        {/* Font Size */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
            <h3 className="font-semibold text-gray-900">Ukuran Font</h3>
          </div>
          <div className="p-6">
            <div className="flex items-center gap-4">
              {[
                { value: 'small', label: 'Kecil', size: 'text-sm' },
                { value: 'medium', label: 'Sedang', size: 'text-base' },
                { value: 'large', label: 'Besar', size: 'text-lg' },
              ].map((size) => (
                <button
                  key={size.value}
                  onClick={() => setFontSize(size.value as any)}
                  className={`px-6 py-4 rounded-xl border-2 transition-all ${
                    fontSize === size.value
                      ? 'border-[#2E7D32] bg-[#e8f5e9]'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className={size.size}>Aa</span>
                </button>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-3">Ukuran font untuk seluruh teks dalam aplikasi</p>
          </div>
        </div>

        {/* Sidebar Settings */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
            <h3 className="font-semibold text-gray-900">Sidebar</h3>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Collapse Sidebar</p>
                <p className="text-sm text-gray-500">Tampilkan sidebar dalam mode compact</p>
              </div>
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className={`relative w-12 h-7 rounded-full transition-colors ${
                  sidebarCollapsed ? 'bg-[#2E7D32]' : 'bg-gray-300'
                }`}
              >
                <div className={`absolute top-1 ${sidebarCollapsed ? 'left-1' : 'right-1'} w-5 h-5 bg-white rounded-full transition-all shadow`} />
              </button>
            </div>
          </div>
        </div>

        {/* Preview Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h4 className="font-semibold text-gray-900 mb-4">Preview</h4>
          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <p className="text-gray-700">Tampilan akan diperbarui setelah Anda menyimpan perubahan.</p>
          </div>
        </div>
      </main>
    </div>
  )
}
