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
    md: 'w-14 h-14 text-lg',
    lg: 'w-16 h-16 text-xl'
  }

  return (
    <div className={`${sizeClasses[size]} ${color} rounded-full flex items-center justify-center ${className}`}>
      <span className="font-semibold text-white">{fallback}</span>
    </div>
  )
}

// All conversations data with proper info
const allConversations = [
  {
    id: 1,
    name: 'Budi Santoso',
    fallbackAvatar: 'BS',
    avatarColor: 'bg-blue-500',
    lastMessage: 'Baik, saya akan segera cek dan update',
    time: '10:30',
    unread: 2,
    online: true,
    type: 'chat',
    position: 'Supervisor Produksi',
    department: 'Produksi'
  },
  {
    id: 2,
    name: 'Siti Rahayu',
    fallbackAvatar: 'SR',
    avatarColor: 'bg-pink-500',
    lastMessage: 'Terima kasih atas approval-nya',
    time: '09:15',
    unread: 0,
    online: true,
    type: 'chat',
    position: 'Staff HR',
    department: 'HR'
  },
  {
    id: 3,
    name: 'Ahmad Fauzi',
    fallbackAvatar: 'AF',
    avatarColor: 'bg-green-500',
    lastMessage: 'Sudah saya kirim via email tadi pagi',
    time: '08:45',
    unread: 0,
    online: false,
    type: 'chat',
    position: 'Manajer Gudang',
    department: 'Inventaris'
  },
  {
    id: 4,
    name: 'Dewi Lestari',
    fallbackAvatar: 'DL',
    avatarColor: 'bg-purple-500',
    lastMessage: 'Ok, nanti saya lanjutkan',
    time: 'Kemarin',
    unread: 0,
    online: false,
    type: 'chat',
    position: 'Staff Keuangan',
    department: 'Keuangan'
  },
  {
    id: 5,
    name: 'Rudi Hartono',
    fallbackAvatar: 'RH',
    avatarColor: 'bg-orange-500',
    lastMessage: 'Mohon segera diproses ya',
    time: 'Kemarin',
    unread: 1,
    online: true,
    type: 'chat',
    position: 'Manajer Pembelian',
    department: 'Pembelian'
  },
  {
    id: 6,
    name: 'System',
    fallbackAvatar: 'SYS',
    avatarColor: 'bg-gray-500',
    lastMessage: 'Backup database berhasil',
    time: 'Kemarin',
    unread: 0,
    online: false,
    type: 'system',
    position: 'System',
    department: 'IT'
  },
  {
    id: 7,
    name: 'HR Department',
    fallbackAvatar: 'HR',
    avatarColor: 'bg-teal-500',
    lastMessage: 'Jadwal training bulan depan',
    time: '2 hari lalu',
    unread: 0,
    online: false,
    type: 'group',
    position: 'Group Chat',
    department: 'HR'
  },
]

// Messages for each conversation
const conversationMessages: Record<number, any[]> = {
  1: [ // Budi Santoso - Produksi
    {
      id: 1,
      senderId: 'them',
      sender: 'Budi Santoso',
      fallbackAvatar: 'BS',
      avatarColor: 'bg-blue-500',
      content: 'Halo, saya ingin konfirmasi mengenai produksi batch #2456',
      timestamp: '09:30',
      status: 'read'
    },
    {
      id: 2,
      senderId: 'me',
      sender: 'Anda',
      fallbackAvatar: 'A',
      avatarColor: 'bg-green-700',
      content: 'Baik, ada yang bisa saya bantu mengenai batch tersebut?',
      timestamp: '09:32',
      status: 'read'
    },
    {
      id: 3,
      senderId: 'them',
      sender: 'Budi Santoso',
      fallbackAvatar: 'BS',
      avatarColor: 'bg-blue-500',
      content: 'Quality control menemukan beberapa defect pada Jahitan sisi bawah. Rate defect sekitar 3%',
      timestamp: '09:35',
      status: 'read'
    },
    {
      id: 4,
      senderId: 'me',
      sender: 'Anda',
      fallbackAvatar: 'A',
      avatarColor: 'bg-green-700',
      content: '3%? Itu di atas standar kita yang 2%. Apa penyebabnya sudah diketahui?',
      timestamp: '09:37',
      status: 'read'
    },
  ],
  2: [ // Siti Rahayu - HR
    {
      id: 1,
      senderId: 'them',
      sender: 'Siti Rahayu',
      fallbackAvatar: 'SR',
      avatarColor: 'bg-pink-500',
      content: 'Halo, saya ingin mengajukan cuti tahunan tanggal 25-27 Oktober',
      timestamp: '08:00',
      status: 'read'
    },
    {
      id: 2,
      senderId: 'me',
      sender: 'Anda',
      fallbackAvatar: 'A',
      avatarColor: 'bg-green-700',
      content: 'Baik Siti, saya akan cek jatah cuti kamu dulu',
      timestamp: '08:05',
      status: 'read'
    },
  ],
  3: [ // Ahmad Fauzi - Inventaris
    {
      id: 1,
      senderId: 'them',
      sender: 'Ahmad Fauzi',
      fallbackAvatar: 'AF',
      avatarColor: 'bg-green-500',
      content: 'Stok benang warna navy sudah hampir habis, tinggal 5 roll',
      timestamp: '07:30',
      status: 'read'
    },
    {
      id: 2,
      senderId: 'me',
      sender: 'Anda',
      fallbackAvatar: 'A',
      avatarColor: 'bg-green-700',
      content: 'Siap, saya buatkan PO baru untuk benang navy',
      timestamp: '07:35',
      status: 'delivered'
    },
  ],
  4: [ // Dewi Lestari - Keuangan
    {
      id: 1,
      senderId: 'them',
      sender: 'Dewi Lestari',
      fallbackAvatar: 'DL',
      avatarColor: 'bg-purple-500',
      content: 'Laporan keuangan bulan September sudah ready',
      timestamp: '10:00',
      status: 'read'
    },
  ],
  5: [ // Rudi Hartono - Pembelian
    {
      id: 1,
      senderId: 'them',
      sender: 'Rudi Hartono',
      fallbackAvatar: 'RH',
      avatarColor: 'bg-orange-500',
      content: 'PO #2026-091 perlu approval segera, deadline hari ini',
      timestamp: '09:00',
      status: 'read'
    },
  ],
}

export default function InboxPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState<'all' | 'unread' | 'chat' | 'system'>('all')

  const filteredConversations = allConversations.filter((conv) => {
    const matchesSearch = conv.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterType === 'all' || conv.type === filterType || (filterType === 'unread' && conv.unread > 0)
    return matchesSearch && matchesFilter
  })

  return (
    <div className="h-screen flex flex-col bg-[#f8f9fa]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
              <Icons.ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Inbox</h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
              <Icons.Search className="w-4 h-4" />
              Cari
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#2E7D32] text-white rounded-lg text-sm font-medium hover:bg-[#1b5e20]">
              <Icons.Plus className="w-4 h-4" />
              Pesan Baru
            </button>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="flex items-center gap-4 mt-4">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari percakapan..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/20 focus:border-[#2E7D32]"
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1">
            {[
              { value: 'all', label: 'Semua' },
              { value: 'unread', label: 'Belum Dibaca' },
              { value: 'chat', label: 'Chat' },
              { value: 'system', label: 'System' },
            ].map((filter) => (
              <button
                key={filter.value}
                onClick={() => setFilterType(filter.value as any)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filterType === filter.value
                    ? 'bg-[#2E7D32] text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Conversations List */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-6 py-4">
          {filteredConversations.length === 0 ? (
            <div className="text-center py-12">
              <Icons.Inbox className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada percakapan ditemukan</h3>
              <p className="text-gray-500">Coba kata kunci pencarian lain atau filter berbeda</p>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
              {filteredConversations.map((conversation) => (
                <Link
                  key={conversation.id}
                  href={`/inbox/${conversation.id}`}
                  className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors"
                >
                  {/* Avatar */}
                  <div className="relative">
                    <Avatar
                      fallback={conversation.fallbackAvatar}
                      color={conversation.avatarColor}
                      size="md"
                    />
                    {conversation.online && (
                      <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900">{conversation.name}</h3>
                        {conversation.type === 'system' && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600">
                            System
                          </span>
                        )}
                        {conversation.type === 'group' && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-teal-100 text-teal-700">
                            Group
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-gray-500">{conversation.time}</span>
                    </div>
                    <p className={`text-sm truncate ${conversation.unread > 0 ? 'font-medium text-gray-900' : 'text-gray-500'}`}>
                      {conversation.lastMessage}
                    </p>
                  </div>

                  {/* Unread Badge */}
                  {conversation.unread > 0 && (
                    <div className="flex items-center justify-center w-6 h-6 bg-[#2E7D32] text-white text-xs font-medium rounded-full">
                      {conversation.unread}
                    </div>
                  )}

                  {/* Chevron */}
                  <Icons.ChevronRight className="w-5 h-5 text-gray-400" />
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

// Export for use in detail page
export { allConversations, conversationMessages }
