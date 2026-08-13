'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import * as Icons from 'lucide-react'

const settingsSections = [
  {
    title: 'Akun',
    items: [
      { id: 'profile', label: 'Profil', icon: Icons.User, description: 'Nama, email, dan informasi kontak' },
      { id: 'security', label: 'Keamanan', icon: Icons.Shield, description: 'Password dan autentikasi' },
    ]
  },
  {
    title: 'Preferensi',
    items: [
      { id: 'appearance', label: 'Tampilan', icon: Icons.Palette, description: 'Tema, warna, dan layout' },
      { id: 'notifications', label: 'Notifikasi', icon: Icons.Bell, description: 'Email, push, dan notifikasi in-app' },
      { id: 'language', label: 'Bahasa', icon: Icons.Globe, description: 'Bahasa dan regional' },
    ]
  },
  {
    title: 'Workspace',
    items: [
      { id: 'integrations', label: 'Integrasi', icon: Icons.Plug, description: 'Koneksi ke layanan eksternal' },
      { id: 'audit', label: 'Log Audit', icon: Icons.FileText, description: 'Riwayat aktivitas sistem' },
    ]
  },
]

export default function SettingsPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredSections = settingsSections.map(section => ({
    ...section,
    items: section.items.filter(item =>
      item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(section => section.items.length > 0)

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
              <Icons.ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Pengaturan</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Search */}
        <div className="mb-8">
          <div className="relative">
            <Icons.Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari pengaturan..."
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/20 focus:border-[#2E7D32]"
            />
          </div>
        </div>

        {/* Settings Sections */}
        <div className="space-y-6">
          {filteredSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                <h2 className="font-semibold text-gray-900">{section.title}</h2>
              </div>
              <div className="divide-y divide-gray-100">
                {section.items.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.id}
                      href={`/settings/${item.id}`}
                      className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-[#f8f9fa] flex items-center justify-center group-hover:bg-[#e8f5e9] transition-colors">
                        <Icon className="w-6 h-6 text-gray-600 group-hover:text-[#2E7D32] transition-colors" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{item.label}</h3>
                        <p className="text-sm text-gray-500">{item.description}</p>
                      </div>
                      <Icons.ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#2E7D32] transition-colors" />
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Settings Cards */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-[#e8f5e9] flex items-center justify-center">
                <Icons.Moon className="w-5 h-5 text-[#2E7D32]" />
              </div>
              <h3 className="font-semibold text-gray-900">Mode Gelap</h3>
            </div>
            <p className="text-sm text-gray-500 mb-3">Aktifkan tema gelap untuk kenyamanan mata</p>
            <button className="w-full py-2 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors">
              Aktifkan
            </button>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-[#e8f5e9] flex items-center justify-center">
                <Icons.Bell className="w-5 h-5 text-[#2E7D32]" />
              </div>
              <h3 className="font-semibold text-gray-900">Notifikasi</h3>
            </div>
            <p className="text-sm text-gray-500 mb-3">Kelola notifikasi email dan push</p>
            <Link href="/settings/notifications" className="w-full py-2 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors text-center block">
              Atur
            </Link>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-[#e8f5e9] flex items-center justify-center">
                <Icons.Download className="w-5 h-5 text-[#2E7D32]" />
              </div>
              <h3 className="font-semibold text-gray-900">Export Data</h3>
            </div>
            <p className="text-sm text-gray-500 mb-3">Download data dalam berbagai format</p>
            <button className="w-full py-2 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors">
              Export
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white mt-12">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-3">
              <div className="relative h-8 w-8">
                <img
                  src="/img/images-removebg-preview.png"
                  alt="Logo Leetex"
                  className="object-contain w-full h-full"
                />
              </div>
              <p>© {new Date().getFullYear()} PT Leetex Garment Indonesia</p>
            </div>
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1.5">
                <Icons.Wifi className="w-4 h-4" />
                Online
              </span>
              <span className="flex items-center gap-1.5">
                <Icons.Database className="w-4 h-4" />
                Database Connected
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
