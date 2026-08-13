'use client'

import React from 'react'
import * as Icons from 'lucide-react'
import Link from 'next/link'

const payrollModules = [
  { id: 'payrolls', title: 'Daftar Payroll', icon: Icons.FileText, path: '/dashboard/payroll/list', count: 'Agu 2026' },
]

export default function PayrollPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Payroll & Gaji</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Penggajian bulanan dan tunjangan karyawan</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {payrollModules.map((mod) => (
          <Link key={mod.id} href={mod.path}>
            <div className="group bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 hover:shadow-lg hover:-translate-y-1 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                  <mod.icon className="w-6 h-6 text-emerald-600" />
                </div>
                <Icons.ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-emerald-600 transition-colors" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white">{mod.title}</h3>
              <p className="text-sm text-gray-500 mt-1">{mod.count}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
