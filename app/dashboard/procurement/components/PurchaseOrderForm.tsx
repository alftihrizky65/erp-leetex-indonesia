'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { XMarkIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline'

export interface POItem {
  id: string
  description: string
  quantity: number
  unitPrice: number
  total: number
}

export interface PurchaseOrderFormData {
  supplierId: string
  poDate: string
  estimatedDelivery: string
  status: 'draft' | 'ordered' | 'partially-received' | 'received' | 'cancelled'
  items: POItem[]
  notes?: string
}

interface Supplier {
  id: string
  name: string
}

const mockSuppliers: Supplier[] = [
  { id: '1', name: 'PT. Textile Supplies Indonesia' },
  { id: '2', name: 'CV. Garment Accessories' },
  { id: '3', name: 'PT. Dye Chemicals Corp' },
  { id: '4', name: 'UD. Thread Master' },
  { id: '5', name: 'PT. Fabric World' },
]

interface PurchaseOrderFormProps {
  initialData?: PurchaseOrderFormData
  onSubmit: (data: PurchaseOrderFormData) => void
  onCancel: () => void
  isLoading?: boolean
}

export const PurchaseOrderForm: React.FC<PurchaseOrderFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<PurchaseOrderFormData>({
    supplierId: initialData?.supplierId || '',
    poDate: initialData?.poDate || new Date().toISOString().split('T')[0],
    estimatedDelivery: initialData?.estimatedDelivery || '',
    status: initialData?.status || 'draft',
    items: initialData?.items || [
      { id: '1', description: '', quantity: 0, unitPrice: 0, total: 0 },
    ],
    notes: initialData?.notes || '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const calculateTotal = (): number => {
    return formData.items.reduce((sum, item) => sum + item.total, 0)
  }

  const updateItem = (id: string, field: keyof POItem, value: string | number) => {
    const updatedItems = formData.items.map((item) => {
      if (item.id === id) {
        const updated = { ...item, [field]: value }
        if (field === 'quantity' || field === 'unitPrice') {
          updated.total = updated.quantity * updated.unitPrice
        }
        return updated
      }
      return item
    })
    setFormData({ ...formData, items: updatedItems })
  }

  const addItem = () => {
    const newItem: POItem = {
      id: Date.now().toString(),
      description: '',
      quantity: 0,
      unitPrice: 0,
      total: 0,
    }
    setFormData({ ...formData, items: [...formData.items, newItem] })
  }

  const removeItem = (id: string) => {
    if (formData.items.length > 1) {
      setFormData({
        ...formData,
        items: formData.items.filter((item) => item.id !== id),
      })
    }
  }

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.supplierId) {
      newErrors.supplierId = 'Supplier is required'
    }

    if (!formData.poDate) {
      newErrors.poDate = 'PO date is required'
    }

    if (!formData.estimatedDelivery) {
      newErrors.estimatedDelivery = 'Estimated delivery date is required'
    }

    formData.items.forEach((item, index) => {
      if (!item.description) {
        newErrors[`item-${index}-description`] = 'Description is required'
      }
      if (item.quantity <= 0) {
        newErrors[`item-${index}-quantity`] = 'Quantity must be greater than 0'
      }
      if (item.unitPrice <= 0) {
        newErrors[`item-${index}-unitPrice`] = 'Unit price must be greater than 0'
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      onSubmit(formData)
    }
  }

  const getItemError = (itemId: string, field: string) => {
    const index = formData.items.findIndex((item) => item.id === itemId)
    return errors[`item-${index}-${field}`]
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Supplier Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Supplier <span className="text-red-500">*</span>
        </label>
        <select
          value={formData.supplierId}
          onChange={(e) => setFormData({ ...formData, supplierId: e.target.value })}
          className="w-full h-10 px-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select a supplier...</option>
          {mockSuppliers.map((supplier) => (
            <option key={supplier.id} value={supplier.id}>
              {supplier.name}
            </option>
          ))}
        </select>
        {errors.supplierId && (
          <p className="text-sm text-red-500 mt-1">{errors.supplierId}</p>
        )}
      </div>

      {/* Dates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Input
            label="PO Date"
            type="date"
            value={formData.poDate}
            onChange={(value) => setFormData({ ...formData, poDate: value })}
            error={errors.poDate}
            required
          />
        </div>

        <div>
          <Input
            label="Estimated Delivery Date"
            type="date"
            value={formData.estimatedDelivery}
            onChange={(value) => setFormData({ ...formData, estimatedDelivery: value })}
            error={errors.estimatedDelivery}
            required
          />
        </div>
      </div>

      {/* Status */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Status
        </label>
        <select
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
          className="w-full h-10 px-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="draft">Draft</option>
          <option value="ordered">Ordered</option>
          <option value="partially-received">Partially Received</option>
          <option value="received">Received</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Order Details Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
            Order Details
          </h3>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            icon={<PlusIcon className="w-4 h-4" />}
            onClick={addItem}
          >
            Add Item
          </Button>
        </div>

        <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                  Description
                </th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase w-32">
                  Quantity
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase w-40">
                  Unit Price (IDR)
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase w-40">
                  Total (IDR)
                </th>
                <th className="px-4 py-3 w-12"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {formData.items.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/30">
                  <td className="px-4 py-3">
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                      placeholder="Item description..."
                      className="w-full h-9 px-3 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {getItemError(item.id, 'description') && (
                      <p className="text-xs text-red-500 mt-1">{getItemError(item.id, 'description')}</p>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      min="0"
                      step="1"
                      value={item.quantity || ''}
                      onChange={(e) => updateItem(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                      className="w-full h-9 px-3 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {getItemError(item.id, 'quantity') && (
                      <p className="text-xs text-red-500 mt-1 text-center">{getItemError(item.id, 'quantity')}</p>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      min="0"
                      step="1000"
                      value={item.unitPrice || ''}
                      onChange={(e) => updateItem(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                      className="w-full h-9 px-3 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm text-right focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {getItemError(item.id, 'unitPrice') && (
                      <p className="text-xs text-red-500 mt-1">{getItemError(item.id, 'unitPrice')}</p>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-9 px-3 flex items-center justify-end text-sm font-medium text-gray-900 dark:text-gray-100">
                      {new Intl.NumberFormat('id-ID').format(item.total)}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      disabled={formData.items.length === 1}
                      className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-400 hover:text-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
              <tr>
                <td colSpan={3} className="px-4 py-3 text-right font-semibold text-gray-700 dark:text-gray-300">
                  Grand Total:
                </td>
                <td className="px-4 py-3 text-right font-bold text-lg text-gray-900 dark:text-gray-100">
                  {new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: 'IDR',
                    minimumFractionDigits: 0,
                  }).format(calculateTotal())}
                </td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Notes */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Notes
        </label>
        <textarea
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          rows={3}
          placeholder="Additional notes or instructions..."
          className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          loading={isLoading}
        >
          {initialData ? 'Update PO' : 'Create PO'}
        </Button>
      </div>
    </form>
  )
}

export default PurchaseOrderForm
