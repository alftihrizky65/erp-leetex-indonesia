'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import * as Icons from 'lucide-react'

type NotificationToggle = 'email' | 'push' | 'sms' | 'inApp'

export default function NotificationsSettingsPage() {
  const [notifications, setNotifications] = useState({
    purchaseOrders: { email: true, push: true, sms: false, inApp: true },
    workOrders: { email: true, push: true, sms: false, inApp: true },
    inventoryAlerts: { email: true, push: true, sms: true, inApp: true },
    systemUpdates: { email: true, push: false, sms: false, inApp: true },
    mentions: { email: false, push: true, sms: false, inApp: true },
  })

  const toggleNotification = (category: string, type: NotificationToggle) => {
    setNotifications({
      ...notifications,
      [category]: {
        ...notifications[category as keyof typeof notifications],
        [type]: !notifications[category as keyof typeof notifications][type]
      }
    })
  }

  const categories = [
    { id: 'purchaseOrders', label: 'Purchase Order', icon: Icons.ShoppingCart, description: 'Notifikasi untuk PO baru dan update' },
    { id: 'workOrders', label: 'Work Order', icon: Icons.ClipboardList, description: 'Notifikasi untuk order produksi' },
    { id: 'inventoryAlerts', label: 'Alert Inventaris', icon: Icons.Package, description: 'Peringatan stok rendah' },
    { id: 'systemUpdates', label: 'Update Sistem', icon: Icons.Settings, description: 'Maintenance dan update sistem' },
    { id: 'mentions', label: 'Mention', icon: Icons.AtSign, description: 'Ketika seseorang mention Anda' },
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
            <h1 className="text-2xl font-bold text-gray-900">Notifikasi</h1>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#2E7D32] text-white rounded-lg text-sm font-medium hover:bg-[#1b5e20] transition-colors">
            <Icons.Save className="w-4 h-4" />
            Simpan Perubahan
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Quick Actions */}
        <div className="flex items-center gap-3 mb-8">
          <button className="px-4 py-2 bg-[#2E7D32] text-white rounded-lg text-sm font-medium hover:bg-[#1b5e20]">
            Aktifkan Semua
          </button>
          <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
            Nonaktifkan Semua
          </button>
        </div>

        {/* Notification Categories */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-5 px-6 py-3 bg-gray-50 border-b border-gray-200 text-sm font-semibold text-gray-500">
            <div className="col-span-1">Kategori</div>
            <div className="text-center">Email</div>
            <div className="text-center">Push</div>
            <div className="text-center">SMS</div>
            <div className="text-center">In-App</div>
          </div>

          {/* Notification Rows */}
          {categories.map((category) => {
            const Icon = category.icon
            const categoryNotif = notifications[category.id as keyof typeof notifications]

            return (
              <div key={category.id} className="grid grid-cols-5 px-6 py-4 border-b border-gray-100 items-center hover:bg-gray-50">
                <div className="col-span-1">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#f8f9fa] flex items-center justify-center">
                      <Icon className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{category.label}</p>
                      <p className="text-xs text-gray-500">{category.description}</p>
                    </div>
                  </div>
                </div>

                {(['email', 'push', 'sms', 'inApp'] as NotificationToggle[]).map((type) => (
                  <div key={type} className="text-center">
                    <button
                      onClick={() => toggleNotification(category.id, type)}
                      className={`relative w-12 h-7 rounded-full transition-colors ${
                        categoryNotif[type] ? 'bg-[#2E7D32]' : 'bg-gray-300'
                      }`}
                    >
                      <div className={`absolute top-1 ${categoryNotif[type] ? 'left-1' : 'right-1'} w-5 h-5 bg-white rounded-full transition-all shadow`} />
                    </button>
                  </div>
                ))}
              </div>
            )
          })}
        </div>

        {/* Notification Summary */}
        <div className="mt-8 bg-white rounded-xl border border-gray-200 p-6">
          <h4 className="font-semibold text-gray-900 mb-4">Ringkasan Notifikasi</h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-[#e8f5e9] flex items-center justify-center mx-auto mb-2">
                <Icons.Mail className="w-6 h-6 text-[#2E7D32]" />
              </div>
              <p className="text-2xl font-bold text-gray-900">4/5</p>
              <p className="text-sm text-gray-500">Email Aktif</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-[#e8f5e9] flex items-center justify-center mx-auto mb-2">
                <Icons.Smartphone className="w-6 h-6 text-[#2E7D32]" />
              </div>
              <p className="text-2xl font-bold text-gray-900">4/5</p>
              <p className="text-sm text-gray-500">Push Aktif</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-2">
                <Icons.MessageSquare className="w-6 h-6 text-gray-400" />
              </div>
              <p className="text-2xl font-bold text-gray-900">1/5</p>
              <p className="text-sm text-gray-500">SMS Aktif</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-[#e8f5e9] flex items-center justify-center mx-auto mb-2">
                <Icons.Bell className="w-6 h-6 text-[#2E7D32]" />
              </div>
              <p className="text-2xl font-bold text-gray-900">5/5</p>
              <p className="text-sm text-gray-500">In-App Aktif</p>
            </div>
          </div>
        </div>

        {/* Quiet Hours */}
        <div className="mt-6 bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Icons.Moon className="w-5 h-5 text-gray-600" />
              <div>
                <h4 className="font-semibold text-gray-900">Jam Khusus (Quiet Hours)</h4>
                <p className="text-sm text-gray-500">Nonaktifkan notifikasi di luar jam kerja</p>
              </div>
            </div>
            <button
              className={`relative w-12 h-7 rounded-full transition-colors bg-gray-300`}
            >
              <div className="absolute top-1 right-1 w-5 h-5 bg-white rounded-full shadow" />
            </button>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>22:00</span>
            <div className="flex-1 h-2 bg-gray-200 rounded-full relative">
              <div className="absolute left-1/3 right-1/3 h-full bg-[#2E7D32] rounded-full" />
            </div>
            <span>08:00</span>
          </div>
        </div>
      </main>
    </div>
  )
}
