export interface NavItem {
  id: string
  label: string
  icon: string
  path: string
  badge?: number | string
  children?: NavItem[]
}

export const navItems: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: 'layout-dashboard',
    path: '/dashboard'
  },
  {
    id: 'hr',
    label: 'HR & Karyawan',
    icon: 'users',
    path: '/dashboard/hr',
    children: [
      { id: 'employees', label: 'Karyawan', icon: 'user', path: '/hr/employees' },
      { id: 'shifts', label: 'Shift', icon: 'clock', path: '/hr/shifts' },
      { id: 'schedules', label: 'Jadwal', icon: 'calendar', path: '/hr/schedules' },
      { id: 'attendance', label: 'Absensi', icon: 'check-circle', path: '/hr/attendance' }
    ]
  },
  {
    id: 'payroll',
    label: 'Payroll & Gaji',
    icon: 'banknote',
    path: '/dashboard/payroll',
    children: [
      { id: 'payrolls', label: 'Daftar Payroll', icon: 'file-text', path: '/payroll/list' }
    ]
  },
  {
    id: 'finance',
    label: 'Keuangan',
    icon: 'wallet',
    path: '/dashboard/finance',
    children: [
      { id: 'transactions', label: 'Transaksi', icon: 'arrow-right-left', path: '/finance/transactions' },
      { id: 'cash-management', label: 'Kas', icon: 'landmark', path: '/finance/cash-management' },
      { id: 'budget', label: 'Anggaran', icon: 'target', path: '/finance/budget' },
      { id: 'reports', label: 'Laporan', icon: 'file-bar-chart', path: '/finance/reports' }
    ]
  },
  {
    id: 'accounting',
    label: 'Akuntansi',
    icon: 'book-open',
    path: '/dashboard/accounting',
    children: [
      { id: 'journal', label: 'Jurnal', icon: 'file-text', path: '/accounting/journal' },
      { id: 'ledger', label: 'Buku Besar', icon: 'book', path: '/accounting/ledger' },
      { id: 'trial-balance', label: 'Neraca Percobaan', icon: 'scale', path: '/accounting/trial-balance' },
      { id: 'financial-reports', label: 'Laporan Keuangan', icon: 'file-bar-chart', path: '/accounting/reports' }
    ]
  },
  {
    id: 'inventory',
    label: 'Inventaris',
    icon: 'package',
    path: '/dashboard/inventory',
    children: [
      { id: 'products', label: 'Produk', icon: 'box', path: '/inventory/products' },
      { id: 'categories', label: 'Kategori', icon: 'folder-open', path: '/inventory/categories' },
      { id: 'stock', label: 'Stok', icon: 'warehouse', path: '/inventory/stock' }
    ]
  },
  {
    id: 'machines',
    label: 'Mesin',
    icon: 'settings',
    path: '/dashboard/machines',
    children: [
      { id: 'machine-list', label: 'Daftar Mesin', icon: 'cog', path: '/machines/list' },
      { id: 'maintenance', label: 'Maintenance', icon: 'wrench', path: '/machines/maintenance' }
    ]
  },
  {
    id: 'sales',
    label: 'Penjualan',
    icon: 'shopping-cart',
    path: '/dashboard/sales',
    children: [
      { id: 'customers', label: 'Pelanggan', icon: 'users', path: '/sales/customers' },
      { id: 'orders', label: 'Pesanan', icon: 'receipt', path: '/sales/orders' }
    ]
  },
  {
    id: 'procurement',
    label: 'Pembelian',
    icon: 'truck',
    path: '/dashboard/procurement',
    children: [
      { id: 'suppliers', label: 'Supplier', icon: 'building', path: '/procurement/suppliers' },
      { id: 'purchase-orders', label: 'Purchase Order', icon: 'file-text', path: '/procurement/po' }
    ]
  },
  {
    id: 'production',
    label: 'Produksi',
    icon: 'hammer',
    path: '/dashboard/production',
    children: [
      { id: 'work-orders', label: 'Work Order', icon: 'clipboard-list', path: '/production/work-orders' },
      { id: 'bom', label: 'BOM', icon: 'list-tree', path: '/production/bom' },
      { id: 'stages', label: 'Tahapan', icon: 'gantt-chart', path: '/production/stages' }
    ]
  },
  {
    id: 'medis',
    label: 'Medis & K3',
    icon: 'heart-pulse',
    path: '/dashboard/medis',
    children: [
      { id: 'p3k', label: 'P3K', icon: 'briefcase-medical', path: '/medis/p3k' },
      { id: 'keselamatan', label: 'Keselamatan Kerja', icon: 'shield-check', path: '/medis/keselamatan' },
      { id: 'p3e', label: 'P3E', icon: 'hard-hat', path: '/medis/p3e' },
      { id: 'bpjs-kesehatan', label: 'BPJS Kesehatan', icon: 'file-heart', path: '/medis/bpjs-kesehatan' },
      { id: 'bpjs-ketenagakerjaan', label: 'BPJS Ketenagakerjaan', icon: 'shield', path: '/medis/bpjs-ketenagakerjaan' },
      { id: 'asuransi', label: 'Asuransi Karyawan', icon: 'umbrella', path: '/medis/asuransi' }
    ]
  }
]

/**
 * Find a navigation item by its path.
 * Checks both top-level items and nested children.
 */
export const getNavByPath = (path: string): NavItem | null => {
  // Normalize paths to ensure consistent matching
  const normalizedPath = path.startsWith('/') ? path : `/${path}`

  for (const item of navItems) {
    // Check top-level item
    if (item.path === normalizedPath) {
      return item
    }

    // Check children
    if (item.children) {
      for (const child of item.children) {
        if (child.path === normalizedPath) {
          return child
        }
      }
    }
  }

  return null
}

/**
 * Find a navigation item by its ID.
 * Searches both top-level items and nested children.
 */
export const getNavById = (id: string): NavItem | null => {
  for (const item of navItems) {
    if (item.id === id) {
      return item
    }

    if (item.children) {
      for (const child of item.children) {
        if (child.id === id) {
          return child
        }
      }
    }
  }

  return null
}

/**
 * Get all navigation items as a flat array (including children).
 */
export const getFlatNavItems = (): NavItem[] => {
  const items: NavItem[] = []

  for (const item of navItems) {
    items.push(item)
    if (item.children) {
      items.push(...item.children)
    }
  }

  return items
}
