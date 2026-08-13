'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { Card } from '@/components/ui/Card'
import { InformationCircleIcon } from '@heroicons/react/24/outline'

export interface ReceiptItem {
  poItemId: string
  description: string
  orderedQty: number
  previouslyReceived: number
  receivedQty: number
  unitPrice: number
  notes?: string
}

export interface GoodsReceiptFormData {
  receiptDate: string
  receivedBy: string
  warehouse: string
  items: ReceiptItem[]
  notes?: string
}

interface GoodsReceiptFormProps {
  poNumber: string
  supplier: string
  items: Array<{
    id: string
    description: string
    quantity: number
    unitPrice: number
    received: number
  }>
  onSubmit: (data: GoodsReceiptFormData) => void
  onCancel: () => void
  isLoading?: boolean
}

const mockWarehouses = [
  { id: 'wh1', name: 'Main Warehouse - Raw Materials' },
  { id: 'wh2', name: 'Main Warehouse - Finished Goods' },
  { id: 'wh3', name: 'Production Floor' },
]

const mockReceivers = [
  { id: 'u1', name: 'John Doe' },
  { id: 'u2', name: 'Jane Smith' },
  { id: 'u3', name: 'Ahmad Wijaya' },
]

export const GoodsReceiptForm: React.FC<GoodsReceiptFormProps> = ({
  poNumber,
  supplier,
  items,
  onSubmit,
  onCancel,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<GoodsReceiptFormData>({
    receiptDate: new Date().toISOString().split('T')[0],
    receivedBy: '',
    warehouse: '',
    items: items.map((item) => ({
      poItemId: item.id,
      description: item.description,
      orderedQty: item.quantity,
      previouslyReceived: item.received,
      receivedQty: 0,
      unitPrice: item.unitPrice,
      notes: '',
    })),
    notes: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const remainingToReceive = (item: ReceiptItem): number => {
    return item.orderedQty - item.previouslyReceived
  }

  const totalReceiptValue = (): number => {
    return formData.items.reduce((sum, item) => {
      return sum + (item.receivedQty * item.unitPrice)
    }, 0)
  }

  const updateItemQty = (poItemId: string, qty: number) => {
    const item = formData.items.find((i) => i.poItemId === poItemId)
    if (!item) return

    const maxQty = remainingToReceive(item)
    const validatedQty = Math.min(Math.max(0, qty), maxQty)

    const updatedItems = formData.items.map((i) =>
      i.poItemId === poItemId ? { ...i, receivedQty: validatedQty } : i
    )

    setFormData({ ...formData, items: updatedItems })
  }

  const updateItemNote = (poItemId: string, note: string) => {
    const updatedItems = formData.items.map((i) =>
      i.poItemId === poItemId ? { ...i, notes: note } : i
    )
    setFormData({ ...formData, items: updatedItems })
  }

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.receiptDate) {
      newErrors.receiptDate = 'Receipt date is required'
    }

    if (!formData.receivedBy) {
      newErrors.receivedBy = 'Receiver is required'
    }

    if (!formData.warehouse) {
      newErrors.warehouse = 'Warehouse is required'
    }

    const hasReceivedItems = formData.items.some((item) => item.receivedQty > 0)
    if (!hasReceivedItems) {
      newErrors.items = 'At least one item must have a received quantity'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      onSubmit(formData)
    }
  }

  const getReceivingStatus = (item: ReceiptItem): 'complete' | 'partial' | 'none' => {
    const totalReceived = item.previouslyReceived + item.receivedQty
    if (totalReceived >= item.orderedQty) return 'complete'
    if (totalReceived > 0) return 'partial'
    return 'none'
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* PO Info */}
      <Card className="p-4 bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800">
        <div className="flex items-start gap-3">
          <InformationCircleIcon className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
          <div className="flex-1">
            <h3 className="font-medium text-blue-900 dark:text-blue-100">Purchase Order: {poNumber}</h3>
            <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">Supplier: {supplier}</p>
          </div>
        </div>
      </Card>

      {/* Receipt Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Receipt Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            value={formData.receiptDate}
            onChange={(e) => setFormData({ ...formData, receiptDate: e.target.value })}
            className="w-full h-10 px-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.receiptDate && (
            <p className="text-sm text-red-500 mt-1">{errors.receiptDate}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Received By <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.receivedBy}
            onChange={(e) => setFormData({ ...formData, receivedBy: e.target.value })}
            className="w-full h-10 px-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select receiver...</option>
            {mockReceivers.map((receiver) => (
              <option key={receiver.id} value={receiver.id}>
                {receiver.name}
              </option>
            ))}
          </select>
          {errors.receivedBy && (
            <p className="text-sm text-red-500 mt-1">{errors.receivedBy}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Warehouse <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.warehouse}
            onChange={(e) => setFormData({ ...formData, warehouse: e.target.value })}
            className="w-full h-10 px-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select warehouse...</option>
            {mockWarehouses.map((wh) => (
              <option key={wh.id} value={wh.id}>
                {wh.name}
              </option>
            ))}
          </select>
          {errors.warehouse && (
            <p className="text-sm text-red-500 mt-1">{errors.warehouse}</p>
          )}
        </div>
      </div>

      {/* Items List */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">
          Items to Receive
        </h3>

        <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                  Item
                </th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase w-24">
                  Ordered
                </th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase w-28">
                  Previously Rcvd
                </th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase w-32">
                  Remaining
                </th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase w-36">
                  Receiving
                </th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase w-32">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {formData.items.map((item, index) => {
                const remaining = remainingToReceive(item)
                const status = getReceivingStatus(item)

                return (
                  <tr key={item.poItemId} className="hover:bg-gray-50 dark:hover:bg-gray-800/30">
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                          {item.description}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          @ {new Intl.NumberFormat('id-ID').format(item.unitPrice)} / unit
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center text-sm text-gray-600 dark:text-gray-400">
                      {item.orderedQty}
                    </td>
                    <td className="px-4 py-3 text-center text-sm text-gray-600 dark:text-gray-400">
                      {item.previouslyReceived}
                    </td>
                    <td className="px-4 py-3 text-center text-sm font-medium text-amber-600 dark:text-amber-400">
                      {remaining}
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="number"
                        min="0"
                        max={remaining}
                        step="1"
                        value={item.receivedQty || ''}
                        onChange={(e) => updateItemQty(item.poItemId, parseFloat(e.target.value) || 0)}
                        placeholder="0"
                        className="w-full h-9 px-3 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-4 py-3 text-center">
                      {status === 'complete' && (
                        <StatusBadge status="Complete" type="success" size="sm" />
                      )}
                      {status === 'partial' && (
                        <StatusBadge status="Partial" type="processing" size="sm" />
                      )}
                      {status === 'none' && (
                        <StatusBadge status="Pending" type="default" size="sm" />
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {errors.items && (
          <p className="text-sm text-red-500 mt-2">{errors.items}</p>
        )}
      </div>

      {/* Item Notes */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Item Notes (Optional)
        </h3>
        <div className="space-y-2">
          {formData.items.map((item) => (
            <div key={item.poItemId} className="flex gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-400 w-48 flex-shrink-0 truncate">
                {item.description}
              </span>
              <input
                type="text"
                value={item.notes || ''}
                onChange={(e) => updateItemNote(item.poItemId, e.target.value)}
                placeholder="Add notes for this item..."
                className="flex-1 h-8 px-3 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Summary */}
      <Card className="p-4 bg-gray-50 dark:bg-gray-800/50">
        <div className="flex justify-between items-center">
          <span className="text-gray-700 dark:text-gray-300">Total Receipt Value:</span>
          <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
            {new Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR',
              minimumFractionDigits: 0,
            }).format(totalReceiptValue())}
          </span>
        </div>
      </Card>

      {/* General Notes */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          General Notes
        </label>
        <textarea
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          rows={3}
          placeholder="General notes about this goods receipt..."
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
          icon={<span className="text-xl">📥</span>}
        >
          Record Receipt
        </Button>
      </div>
    </form>
  )
}

export default GoodsReceiptForm
