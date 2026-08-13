'use client'

import React, { useState, useMemo } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Table, Column } from '@/components/ui/Table'
import {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  DropdownSeparator,
} from '@/components/ui/Dropdown'
import { CustomerForm, CustomerFormData } from '../components/CustomerForm'

// Mock customer data
const mockCustomers = [
  {
    id: '1',
    name: 'John Doe',
    company: 'ABC Fashion Ltd',
    email: 'john@abcfashion.com',
    phone: '+62 812 3456 7890',
    address: 'Jl. Sudirman No. 123, Jakarta',
    total_orders: 15,
    created_at: '2024-01-15',
    updated_at: '2024-08-10',
  },
  {
    id: '2',
    name: 'Jane Smith',
    company: 'XYZ Garments',
    email: 'jane@xyzgarments.com',
    phone: '+62 813 4567 8901',
    address: 'Jl. Thamrin No. 456, Jakarta',
    total_orders: 23,
    created_at: '2024-02-20',
    updated_at: '2024-08-11',
  },
  {
    id: '3',
    name: 'Bob Johnson',
    company: '',
    email: 'bob.johnson@email.com',
    phone: '+62 814 5678 9012',
    address: 'Jl. Gatot Subroto No. 789, Jakarta',
    total_orders: 7,
    created_at: '2024-03-10',
    updated_at: '2024-08-05',
  },
  {
    id: '4',
    name: 'Alice Williams',
    company: 'Fashion Export Inc',
    email: 'alice@fashionexport.com',
    phone: '+62 815 6789 0123',
    address: 'Jl. Asia Afrika No. 321, Jakarta',
    total_orders: 42,
    created_at: '2024-01-05',
    updated_at: '2024-08-12',
  },
  {
    id: '5',
    name: 'Charlie Brown',
    company: 'Textile Solutions',
    email: 'charlie@textilesolutions.com',
    phone: '+62 816 7890 1234',
    address: 'Jl. HR Rasuna Said No. 654, Jakarta',
    total_orders: 19,
    created_at: '2024-04-15',
    updated_at: '2024-08-09',
  },
]

type Customer = (typeof mockCustomers)[number]

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers)
  const [searchQuery, setSearchQuery] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null)
  const [loading, setLoading] = useState(false)

  // Filter customers based on search
  const filteredCustomers = useMemo(() => {
    if (!searchQuery.trim()) return customers

    const query = searchQuery.toLowerCase()
    return customers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(query) ||
        customer.company.toLowerCase().includes(query)
    )
  }, [customers, searchQuery])

  // Calculate summary
  const totalCustomers = customers.length
  const totalOrders = customers.reduce((sum, c) => sum + c.total_orders, 0)

  const handleAddCustomer = async (data: CustomerFormData) => {
    setLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const newCustomer: Customer = {
      id: String(customers.length + 1),
      ...data,
      total_orders: 0,
      created_at: new Date().toISOString().split('T')[0],
      updated_at: new Date().toISOString().split('T')[0],
    }

    setCustomers((prev) => [...prev, newCustomer])
    setShowAddForm(false)
    setLoading(false)
  }

  const handleEditCustomer = async (data: CustomerFormData) => {
    if (!editingCustomer) return

    setLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setCustomers((prev) =>
      prev.map((c) =>
        c.id === editingCustomer.id
          ? { ...c, ...data, updated_at: new Date().toISOString().split('T')[0] }
          : c
      )
    )
    setEditingCustomer(null)
    setLoading(false)
  }

  const handleDeleteCustomer = async (customer: Customer) => {
    if (!confirm(`Are you sure you want to delete ${customer.name}?`)) return

    setLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    setCustomers((prev) => prev.filter((c) => c.id !== customer.id))
    setLoading(false)
  }

  const handleViewOrders = (customer: Customer) => {
    alert(`Viewing orders for ${customer.name} (Feature coming soon)`)
  }

  // Define table columns
  const columns: Column<Customer>[] = [
    {
      key: 'name',
      label: 'Customer Name',
      sortable: true,
    },
    {
      key: 'company',
      label: 'Company',
      sortable: true,
      render: (value) => (
        <span className={value ? 'text-gray-900' : 'text-gray-400 italic'}>
          {value || 'N/A'}
        </span>
      ),
    },
    {
      key: 'email',
      label: 'Email',
      sortable: true,
    },
    {
      key: 'phone',
      label: 'Phone',
      sortable: true,
    },
    {
      key: 'total_orders',
      label: 'Total Orders',
      sortable: true,
      render: (value) => (
        <span className="font-medium text-gray-900">{value}</span>
      ),
    },
    {
      key: 'actions',
      label: '',
      className: 'text-right',
      render: (_value, row) => (
        <div className="flex justify-end">
          <Dropdown>
            <DropdownTrigger asChild>
              <button
                className="p-2 hover:bg-gray-100 rounded-md transition-colors"
                aria-label="Actions"
              >
                <svg
                  className="w-5 h-5 text-gray-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                </svg>
              </button>
            </DropdownTrigger>
            <DropdownContent align="right">
              <DropdownItem
                onClick={() => handleViewOrders(row)}
                icon={
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                }
              >
                View Orders
              </DropdownItem>
              <DropdownItem
                onClick={() => setEditingCustomer(row)}
                icon={
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                }
              >
                Edit
              </DropdownItem>
              <DropdownSeparator />
              <DropdownItem
                onClick={() => handleDeleteCustomer(row)}
                variant="danger"
                icon={
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                }
              >
                Delete
              </DropdownItem>
            </DropdownContent>
          </Dropdown>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Customers</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage customer information and order history
          </p>
        </div>
        <Button onClick={() => setShowAddForm(true)} icon>
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add Customer
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card noPadding>
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Customers</p>
                <p className="text-3xl font-semibold text-gray-900 mt-2">
                  {totalCustomers}
                </p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </Card>
        <Card noPadding>
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Orders</p>
                <p className="text-3xl font-semibold text-gray-900 mt-2">
                  {totalOrders}
                </p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Add/Edit Customer Form */}
      {(showAddForm || editingCustomer) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CustomerForm
              title={editingCustomer ? 'Edit Customer' : 'Add New Customer'}
              initialData={editingCustomer || undefined}
              onSubmit={editingCustomer ? handleEditCustomer : handleAddCustomer}
              onCancel={() => {
                setShowAddForm(false)
                setEditingCustomer(null)
              }}
              loading={loading}
            />
          </div>
        </div>
      )}

      {/* Customers Table */}
      <Card>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by name or company..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-md px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <Table
          columns={columns}
          data={filteredCustomers}
          loading={loading}
          emptyMessage="No customers found"
        />

        {searchQuery && filteredCustomers.length > 0 && (
          <p className="text-sm text-gray-500 mt-4">
            {filteredCustomers.length} {filteredCustomers.length === 1 ? 'result' : 'results'} found
          </p>
        )}
      </Card>
    </div>
  )
}
