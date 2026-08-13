'use client'

import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/Button'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { Input } from '@/components/ui/Input'
import { Card } from '@/components/ui/Card'
import { Dropdown, DropdownTrigger, DropdownContent, DropdownItem, DropdownSeparator } from '@/components/ui/Dropdown'
import { PlusIcon, MagnifyingGlassIcon, FunnelIcon, EllipsisHorizontalIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { PurchaseOrderForm, PurchaseOrderFormData } from '../components/PurchaseOrderForm'
import { GoodsReceiptForm } from '../components/GoodsReceiptForm'

type POStatus = 'draft' | 'ordered' | 'partially-received' | 'received' | 'cancelled'

interface PurchaseOrder {
  id: string
  poNumber: string
  supplier: string
  poDate: string
  estimatedDelivery: string
  totalAmount: number
  status: POStatus
  items: Array<{
    id: string
    description: string
    quantity: number
    unitPrice: number
    received: number
  }>
}

const mockPOs: PurchaseOrder[] = [
  {
    id: '1',
    poNumber: 'PO-2024-001',
    supplier: 'PT. Textile Supplies Indonesia',
    poDate: '2024-01-15',
    estimatedDelivery: '2024-02-15',
    totalAmount: 45000000,
    status: 'received',
    items: [
      { id: '1', description: 'Cotton Fabric Roll', quantity: 100, unitPrice: 350000, received: 100 },
      { id: '2', description: 'Thread Spools', quantity: 500, unitPrice: 20000, received: 500 },
    ],
  },
  {
    id: '2',
    poNumber: 'PO-2024-002',
    supplier: 'CV. Garment Accessories',
    poDate: '2024-01-20',
    estimatedDelivery: '2024-02-20',
    totalAmount: 28000000,
    status: 'ordered',
    items: [
      { id: '3', description: 'Zippers', quantity: 2000, unitPrice: 10000, received: 0 },
      { id: '4', description: 'Buttons', quantity: 5000, unitPrice: 3600, received: 0 },
    ],
  },
  {
    id: '3',
    poNumber: 'PO-2024-003',
    supplier: 'PT. Dye Chemicals Corp',
    poDate: '2024-01-25',
    estimatedDelivery: '2024-02-25',
    totalAmount: 18500000,
    status: 'partially-received',
    items: [
      { id: '5', description: 'Reactive Dye Blue', quantity: 50, unitPrice: 250000, received: 30 },
      { id: '6', description: 'Fixing Agent', quantity: 100, unitPrice: 60000, received: 50 },
    ],
  },
  {
    id: '4',
    poNumber: 'PO-2024-004',
    supplier: 'PT. Textile Supplies Indonesia',
    poDate: '2024-02-01',
    estimatedDelivery: '2024-03-01',
    totalAmount: 52000000,
    status: 'draft',
    items: [
      { id: '7', description: 'Polyester Fabric', quantity: 150, unitPrice: 320000, received: 0 },
      { id: '8', description: 'Lining Fabric', quantity: 100, unitPrice: 80000, received: 0 },
    ],
  },
  {
    id: '5',
    poNumber: 'PO-2024-005',
    supplier: 'CV. Garment Accessories',
    poDate: '2024-02-05',
    estimatedDelivery: '2024-03-05',
    totalAmount: 12000000,
    status: 'cancelled',
    items: [
      { id: '9', description: 'Labels', quantity: 10000, unitPrice: 1200, received: 0 },
    ],
  },
]

const statusConfig: Record<POStatus, { label: string; type: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'processing' }> = {
  'draft': { label: 'Draft', type: 'default' },
  'ordered': { label: 'Ordered', type: 'info' },
  'partially-received': { label: 'Partially Received', type: 'processing' },
  'received': { label: 'Received', type: 'success' },
  'cancelled': { label: 'Cancelled', type: 'danger' },
}

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

export default function PurchaseOrdersPage() {
  const [pos, setPos] = useState<PurchaseOrder[]>(mockPOs)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState<POStatus | 'all'>('all')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showReceiptModal, setShowReceiptModal] = useState(false)
  const [selectedPO, setSelectedPO] = useState<PurchaseOrder | null>(null)
  const [showFilters, setShowFilters] = useState(false)

  // Calculate summary cards
  const summary = useMemo(() => {
    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()

    const totalPOs = pos.length
    const pendingPOs = pos.filter(po => po.status === 'ordered' || po.status === 'partially-received')
    const pendingAmount = pendingPOs.reduce((sum, po) => sum + po.totalAmount, 0)

    const receivedThisMonth = pos
      .filter(po => {
        const poDate = new Date(po.poDate)
        return po.status === 'received' && poDate.getMonth() === currentMonth && poDate.getFullYear() === currentYear
      })
      .reduce((sum, po) => sum + po.totalAmount, 0)

    return { totalPOs, pendingAmount, receivedThisMonth }
  }, [pos])

  // Filter POs
  const filteredPOs = useMemo(() => {
    return pos.filter(po => {
      const matchesSearch = searchTerm === '' ||
        po.poNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        po.supplier.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = selectedStatus === 'all' || po.status === selectedStatus

      const matchesDateRange = (!dateFrom || po.poDate >= dateFrom) && (!dateTo || po.poDate <= dateTo)

      return matchesSearch && matchesStatus && matchesDateRange
    })
  }, [pos, searchTerm, selectedStatus, dateFrom, dateTo])

  const handleCreatePO = () => {
    setSelectedPO(null)
    setShowCreateModal(true)
  }

  const handleViewPO = (po: PurchaseOrder) => {
    setSelectedPO(po)
    // TODO: Show PO details
  }

  const handleEditPO = (po: PurchaseOrder) => {
    setSelectedPO(po)
    setShowCreateModal(true)
  }

  const handleDeletePO = (po: PurchaseOrder) => {
    if (confirm(`Are you sure you want to delete ${po.poNumber}?`)) {
      setPos(pos.filter(p => p.id !== po.id))
    }
  }

  const handleRecordReceipt = (po: PurchaseOrder) => {
    setSelectedPO(po)
    setShowReceiptModal(true)
  }

  const handleUpdateStatus = (po: PurchaseOrder, newStatus: POStatus) => {
    setPos(pos.map(p => p.id === po.id ? { ...p, status: newStatus } : p))
  }

  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    ...Object.entries(statusConfig).map(([value, { label }]) => ({ value, label }))
  ]

  const canEdit = (po: PurchaseOrder) => po.status !== 'cancelled' && po.status !== 'received'
  const canRecordReceipt = (po: PurchaseOrder) => po.status !== 'draft' && po.status !== 'cancelled' && po.status !== 'received'
  const canMarkDraft = (po: PurchaseOrder) => po.status !== 'draft' && po.status !== 'cancelled' && po.status !== 'received'
  const canMarkOrdered = (po: PurchaseOrder) => po.status === 'draft'
  const canMarkReceived = (po: PurchaseOrder) => po.status === 'ordered' || po.status === 'partially-received'
  const canMarkCancelled = (po: PurchaseOrder) => po.status !== 'cancelled' && po.status !== 'received'

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Purchase Orders</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Manage supplier purchase orders</p>
        </div>
        <Button onClick={handleCreatePO} icon={<PlusIcon className="w-5 h-5" />}>
          Create PO
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total POs</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1">{summary.totalPOs}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📋</span>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Pending Amount</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1">{formatCurrency(summary.pendingAmount)}</p>
            </div>
            <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/20 rounded-lg flex items-center justify-center">
              <span className="text-2xl">⏳</span>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Received This Month</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mt-1">{formatCurrency(summary.receivedThisMonth)}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
              <span className="text-2xl">✅</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by PO number or supplier..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 h-10 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Filter Toggle */}
          <Button
            variant="ghost"
            size="sm"
            icon={<FunnelIcon className="w-5 h-5" />}
            onClick={() => setShowFilters(!showFilters)}
          >
            Filters
          </Button>
        </div>

        {/* Expandable Filters */}
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value as POStatus | 'all')}
                className="w-full h-10 px-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">From Date</label>
              <Input
                type="date"
                value={dateFrom}
                onChange={setDateFrom}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">To Date</label>
              <Input
                type="date"
                value={dateTo}
                onChange={setDateTo}
              />
            </div>
          </div>
        )}
      </Card>

      {/* PO List */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  PO Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Supplier
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  PO Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Est. Delivery
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Total Amount
                </th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredPOs.map((po) => (
                <tr key={po.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-medium text-gray-900 dark:text-gray-100">{po.poNumber}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700 dark:text-gray-300">
                    {po.supplier}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600 dark:text-gray-400">
                    {formatDate(po.poDate)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600 dark:text-gray-400">
                    {formatDate(po.estimatedDelivery)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right font-medium text-gray-900 dark:text-gray-100">
                    {formatCurrency(po.totalAmount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <StatusBadge
                      status={statusConfig[po.status].label}
                      type={statusConfig[po.status].type}
                      size="sm"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <Dropdown align="right">
                      <DropdownTrigger asChild>
                        <button className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                          <EllipsisHorizontalIcon className="w-5 h-5 text-gray-500" />
                        </button>
                      </DropdownTrigger>
                      <DropdownContent align="right">
                        <DropdownItem onClick={() => handleViewPO(po)}>
                          View Details
                        </DropdownItem>
                        <DropdownItem onClick={() => handleEditPO(po)} disabled={!canEdit(po)}>
                          Edit
                        </DropdownItem>
                        <DropdownItem onClick={() => handleRecordReceipt(po)} disabled={!canRecordReceipt(po)}>
                          Record Receipt
                        </DropdownItem>
                        <DropdownSeparator />
                        {canMarkDraft(po) && (
                          <DropdownItem onClick={() => handleUpdateStatus(po, 'draft')}>
                            Mark as Draft
                          </DropdownItem>
                        )}
                        {canMarkOrdered(po) && (
                          <DropdownItem onClick={() => handleUpdateStatus(po, 'ordered')}>
                            Mark as Ordered
                          </DropdownItem>
                        )}
                        {canMarkReceived(po) && (
                          <DropdownItem onClick={() => handleUpdateStatus(po, 'received')}>
                            Mark as Received
                          </DropdownItem>
                        )}
                        {canMarkCancelled(po) && (
                          <DropdownItem onClick={() => handleUpdateStatus(po, 'cancelled')}>
                            Mark as Cancelled
                          </DropdownItem>
                        )}
                        <DropdownSeparator />
                        <DropdownItem onClick={() => handleDeletePO(po)} variant="danger">
                          Delete
                        </DropdownItem>
                      </DropdownContent>
                    </Dropdown>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredPOs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">No purchase orders found</p>
            </div>
          )}
        </div>
      </Card>

      {/* Create/Edit PO Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white dark:bg-gray-900 p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                {selectedPO ? 'Edit Purchase Order' : 'Create Purchase Order'}
              </h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <XMarkIcon className="w-6 h-6 text-gray-500" />
              </button>
            </div>
            <div className="p-6">
              <PurchaseOrderForm
                initialData={selectedPO ? {
                  supplierId: selectedPO.id,
                  poDate: selectedPO.poDate,
                  estimatedDelivery: selectedPO.estimatedDelivery,
                  status: selectedPO.status,
                  items: selectedPO.items.map(item => ({
                    id: item.id,
                    description: item.description,
                    quantity: item.quantity,
                    unitPrice: item.unitPrice,
                    total: item.quantity * item.unitPrice,
                  })),
                } : undefined}
                onSubmit={(data) => {
                  // Handle form submission
                  console.log('PO data:', data)
                  setShowCreateModal(false)
                }}
                onCancel={() => setShowCreateModal(false)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Goods Receipt Modal */}
      {showReceiptModal && selectedPO && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white dark:bg-gray-900 p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Record Goods Receipt - {selectedPO.poNumber}
              </h2>
              <button
                onClick={() => setShowReceiptModal(false)}
                className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <XMarkIcon className="w-6 h-6 text-gray-500" />
              </button>
            </div>
            <div className="p-6">
              <GoodsReceiptForm
                poNumber={selectedPO.poNumber}
                supplier={selectedPO.supplier}
                items={selectedPO.items}
                onSubmit={(data) => {
                  console.log('Goods receipt data:', data)
                  setShowReceiptModal(false)
                }}
                onCancel={() => setShowReceiptModal(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
