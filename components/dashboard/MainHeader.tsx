'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import * as Icons from 'lucide-react'

// Simple Avatar Component
const Avatar: React.FC<{
  fallback: string
  color?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}> = ({ fallback, color = 'bg-gray-500', size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg'
  }

  return (
    <div className={`${sizeClasses[size]} ${color} rounded-full flex items-center justify-center ${className}`}>
      <span className="font-semibold text-white">{fallback}</span>
    </div>
  )
}

// Mock inbox data
const mockMessages = [
  {
    id: 1,
    sender: 'Budi Santoso',
    fallbackAvatar: 'BS',
    avatarColor: 'bg-blue-500',
    subject: 'Update Produksi - Line 3',
    preview: 'Mohon cek kembali quality control untuk batch...',
    time: '10:30',
    unread: true,
    type: 'notification'
  },
  {
    id: 2,
    sender: 'Siti Rahayu',
    fallbackAvatar: 'SR',
    avatarColor: 'bg-pink-500',
    subject: 'Request Cuti Tahunan',
    preview: 'Saya ingin mengajukan cuti tanggal 25-27 Oktober...',
    time: '09:15',
    unread: true,
    type: 'request'
  },
  {
    id: 3,
    sender: 'Ahmad Fauzi',
    fallbackAvatar: 'AF',
    avatarColor: 'bg-green-500',
    subject: 'Laporan Stok Bahan Baku',
    preview: 'Stok benang warna navy sudah hampir habis...',
    time: '08:45',
    unread: false,
    type: 'report'
  },
  {
    id: 4,
    sender: 'Dewi Lestari',
    fallbackAvatar: 'DL',
    avatarColor: 'bg-purple-500',
    subject: 'Meeting Review Kinerja',
    preview: 'Undangan meeting review kinerja bulanan...',
    time: 'Kemarin',
    unread: false,
    type: 'invitation'
  },
  {
    id: 5,
    sender: 'Rudi Hartono',
    fallbackAvatar: 'RH',
    avatarColor: 'bg-orange-500',
    subject: 'Approval Purchase Order',
    preview: 'PO #2026-091 perlu approval segera...',
    time: 'Kemarin',
    unread: false,
    type: 'approval'
  },
]

// Settings menu items
const settingsMenuItems = [
  { id: 'profile', label: 'Profil', icon: Icons.User, description: 'Kelola profil Anda' },
  { id: 'appearance', label: 'Tampilan', icon: Icons.Palette, description: 'Tema dan preferensi' },
  { id: 'notifications', label: 'Notifikasi', icon: Icons.Bell, description: 'Atur notifikasi' },
  { id: 'security', label: 'Keamanan', icon: Icons.Shield, description: 'Password dan keamanan' },
  { id: 'language', label: 'Bahasa', icon: Icons.Globe, description: 'Pilih bahasa' },
]

export function MainHeader() {
  const router = useRouter()
  const [inboxOpen, setInboxOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const unreadCount = mockMessages.filter(m => m.unread).length

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 relative">
              <img
                src="/img/images-removebg-preview.png"
                alt="Leetex Logo"
                className="object-contain w-full h-full"
              />
            </div>
            <span className="hidden sm:block text-base font-semibold text-green-700">
              PT Leetex Garment Indonesia
            </span>
          </Link>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Status Indicator */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-full">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs text-green-700">Online</span>
            </div>

            {/* Inbox Button */}
            <div className="relative">
              <button
                onClick={() => {
                  setInboxOpen(!inboxOpen)
                  setSettingsOpen(false)
                  setProfileOpen(false)
                }}
                className="relative flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Inbox"
              >
                <Icons.Inbox className="w-5 h-5 text-gray-600" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 bg-red-500 text-white text-xs font-medium rounded-full">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Inbox Dropdown Panel */}
              {inboxOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setInboxOpen(false)} />
                  <div className="absolute right-0 top-12 w-96 bg-white rounded-xl border border-gray-200 shadow-2xl z-50 max-h-[500px] flex flex-col">
                    <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">Inbox</h3>
                        <p className="text-xs text-gray-500">{unreadCount} pesan belum dibaca</p>
                      </div>
                      <Link href="/inbox" onClick={() => setInboxOpen(false)} className="text-xs text-[#2E7D32] font-medium hover:underline flex items-center gap-1">
                        Lihat Semua <Icons.ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                      {mockMessages.map((message) => (
                        <div
                          key={message.id}
                          className="flex items-start gap-3 p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                          onClick={() => {
                            setInboxOpen(false)
                            router.push(`/inbox/${message.id}`)
                          }}
                        >
                          <Avatar fallback={message.fallbackAvatar} color={message.avatarColor} size="sm" />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <p className="text-sm font-medium text-gray-900 truncate">{message.sender}</p>
                              <span className="text-xs text-gray-500">{message.time}</span>
                            </div>
                            <p className="text-sm font-medium text-gray-800 truncate">{message.subject}</p>
                            <p className="text-xs text-gray-500 truncate">{message.preview}</p>
                          </div>
                          {message.unread && <div className="w-2 h-2 rounded-full bg-[#2E7D32] shrink-0 mt-2" />}
                        </div>
                      ))}
                    </div>
                    <div className="p-3 border-t border-gray-200 bg-gray-50 rounded-b-xl">
                      <Link href="/inbox" onClick={() => setInboxOpen(false)} className="flex items-center justify-center gap-2 w-full py-2 text-sm text-gray-700 hover:bg-gray-200 rounded-lg transition-colors">
                        <Icons.Inbox className="w-4 h-4" />
                        Buka Inbox Lengkap
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Settings Button */}
            <div className="relative">
              <button
                onClick={() => {
                  setSettingsOpen(!settingsOpen)
                  setInboxOpen(false)
                  setProfileOpen(false)
                }}
                className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Settings"
              >
                <Icons.Settings className="w-5 h-5 text-gray-600" />
              </button>

              {/* Settings Dropdown Panel */}
              {settingsOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setSettingsOpen(false)} />
                  <div className="absolute right-0 top-12 w-80 bg-white rounded-xl border border-gray-200 shadow-2xl z-50">
                    <div className="p-4 border-b border-gray-200">
                      <h3 className="font-semibold text-gray-900">Pengaturan</h3>
                      <p className="text-xs text-gray-500">Kelola preferensi sistem</p>
                    </div>
                    <div className="p-2">
                      {settingsMenuItems.map((item) => {
                        const Icon = item.icon
                        return (
                          <Link
                            key={item.id}
                            href={`/settings/${item.id}`}
                            onClick={() => setSettingsOpen(false)}
                            className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                          >
                            <div className="w-10 h-10 rounded-lg bg-[#f8f9fa] flex items-center justify-center">
                              <Icon className="w-5 h-5 text-gray-600" />
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900">{item.label}</p>
                              <p className="text-xs text-gray-500">{item.description}</p>
                            </div>
                            <Icons.ChevronRight className="w-4 h-4 text-gray-400" />
                          </Link>
                        )
                      })}
                    </div>
                    <div className="p-2 border-t border-gray-100">
                      <Link href="/settings" onClick={() => setSettingsOpen(false)} className="flex items-center justify-center gap-2 p-3 text-sm text-[#2E7D32] font-medium hover:bg-gray-50 rounded-lg transition-colors">
                        <Icons.Cog className="w-4 h-4" />
                        Lihat Semua Pengaturan
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Profile Menu */}
            <div className="relative">
              <button
                onClick={() => {
                  setProfileOpen(!profileOpen)
                  setInboxOpen(false)
                  setSettingsOpen(false)
                }}
                className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-[#2E7D32] flex items-center justify-center">
                  <span className="text-sm font-medium text-white">A</span>
                </div>
                <Icons.ChevronDown className="w-4 h-4 text-gray-400" />
              </button>

              {/* Profile Dropdown */}
              {profileOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
                  <div className="absolute right-0 top-12 w-72 bg-white rounded-xl border border-gray-200 shadow-2xl z-50">
                    <div className="p-4 border-b border-gray-200">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-[#2E7D32] flex items-center justify-center">
                          <span className="text-lg font-semibold text-white">A</span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">Admin User</p>
                          <p className="text-xs text-gray-500">admin@leetex.co.id</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-2">
                      <Link href="/settings/profile" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                        <Icons.User className="w-5 h-5 text-gray-600" />
                        <span className="text-sm text-gray-700">Profil</span>
                      </Link>
                      <Link href="/settings/appearance" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                        <Icons.Palette className="w-5 h-5 text-gray-600" />
                        <span className="text-sm text-gray-700">Tampilan</span>
                      </Link>
                      <Link href="/settings/security" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                        <Icons.Shield className="w-5 h-5 text-gray-600" />
                        <span className="text-sm text-gray-700">Keamanan</span>
                      </Link>
                    </div>
                    <div className="p-2 border-t border-gray-100">
                      <button
                        onClick={() => {
                          setProfileOpen(false)
                          console.log('Logging out...')
                        }}
                        className="flex items-center gap-3 p-3 w-full text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Icons.LogOut className="w-5 h-5" />
                        <span className="text-sm font-medium">Keluar</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
