'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { Table } from '@/components/ui/Table'
import { Dropdown, DropdownTrigger, DropdownContent, DropdownItem, DropdownSeparator } from '@/components/ui/Dropdown'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { ShiftForm, ShiftFormData } from './components/ShiftForm'

// Mock data - in production this would come from PowerSync/Supabase
const initialShifts: ShiftFormData[] = [
  { id: '1', name: 'Morning Shift', startTime: '08:00', endTime: '16:00', isNightShift: false },
  { id: '2', name: 'Afternoon Shift', startTime: '14:00', endTime: '22:00', isNightShift: false },
  { id: '3', name: 'Night Shift', startTime: '22:00', endTime: '06:00', isNightShift: true },
  { id: '4', name: 'Graveyard Shift', startTime: '00:00', endTime: '08:00', isNightShift: true },
]

export default function ShiftsPage() {
  const [shifts, setShifts] = useState<ShiftFormData[]>(initialShifts)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingShift, setEditingShift] = useState<ShiftFormData | undefined>()
  const [isLoading, setIsLoading] = useState(false)

  const handleOpenAddModal = () => {
    setEditingShift(undefined)
    setIsModalOpen(true)
  }

  const handleOpenEditModal = (shift: ShiftFormData) => {
    setEditingShift(shift)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingShift(undefined)
  }

  const handleSubmit = async (data: ShiftFormData) => {
    setIsLoading(true)
    // Simulate API call - in production this would save to Supabase via PowerSync
    await new Promise((resolve) => setTimeout(resolve, 500))

    if (editingShift?.id) {
      // Update existing shift
      setShifts((prev) =>
        prev.map((shift) =>
          shift.id === editingShift.id ? { ...data, id: shift.id } : shift
        )
      )
    } else {
      // Add new shift
      const newShift: ShiftFormData = {
        ...data,
        id: Date.now().toString(),
      }
      setShifts((prev) => [...prev, newShift])
    }

    setIsLoading(false)
    handleCloseModal()
  }

  const handleDelete = async (shiftId: string) => {
    if (!confirm('Are you sure you want to delete this shift?')) return

    setIsLoading(true)
    // Simulate API call - in production this would delete from Supabase via PowerSync
    await new Promise((resolve) => setTimeout(resolve, 500))

    setShifts((prev) => prev.filter((shift) => shift.id !== shiftId))
    setIsLoading(false)
  }

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':')
    const hour = parseInt(hours)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const formattedHour = hour % 12 || 12
    return `${formattedHour}:${minutes} ${ampm}`
  }

  const columns = [
    {
      key: 'name',
      label: 'Shift Name',
      render: (value: string, row: ShiftFormData) => (
        <div className="flex items-center gap-2">
          <span className="font-medium">{value}</span>
          {row.isNightShift && (
            <span className="flex items-center gap-1 text-xs text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 px-2 py-0.5 rounded-full">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
              Night
            </span>
          )}
        </div>
      ),
    },
    {
      key: 'startTime',
      label: 'Start Time',
      render: (value: string) => formatTime(value),
      className: 'text-gray-600',
    },
    {
      key: 'endTime',
      label: 'End Time',
      render: (value: string) => formatTime(value),
      className: 'text-gray-600',
    },
    {
      key: 'hours',
      label: 'Duration',
      render: (_: string, row: ShiftFormData) => {
        const start = new Date(`2000-01-01T${row.startTime}`)
        const end = new Date(`2000-01-01T${row.endTime}`)
        // Handle overnight shifts (end time is earlier than start time)
        const durationMs = end < start ? (end.getTime() + 24 * 60 * 60 * 1000) - start.getTime() : end.getTime() - start.getTime()
        const hours = Math.round(durationMs / (60 * 60 * 1000))
        return `${hours}h`
      },
      className: 'text-gray-600',
    },
    {
      key: 'status',
      label: 'Status',
      render: () => <StatusBadge status="active" size="sm" />,
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_: string, row: ShiftFormData) => (
        <Dropdown>
          <DropdownTrigger asChild>
            <button className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </button>
          </DropdownTrigger>
          <DropdownContent align="right">
            <DropdownItem
              onClick={() => handleOpenEditModal(row)}
              icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              }
            >
              Edit
            </DropdownItem>
            <DropdownSeparator />
            <DropdownItem
              onClick={() => handleDelete(row.id!)}
              variant="danger"
              icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              }
            >
              Delete
            </DropdownItem>
          </DropdownContent>
        </Dropdown>
      ),
      className: 'text-right',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Shifts</h1>
          <p className="text-sm text-gray-500 mt-1">Manage work shift schedules</p>
        </div>
        <Button onClick={handleOpenAddModal} icon={
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        }>
          Add Shift
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Shifts</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{shifts.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
              <svg className="w-5 h-5 text-orange-600 dark:text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">Day Shifts</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{shifts.filter(s => !s.isNightShift).length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
              <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">Night Shifts</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{shifts.filter(s => s.isNightShift).length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <Table
        columns={columns}
        data={shifts}
        loading={isLoading}
        searchable
        emptyMessage="No shifts found. Add your first shift to get started."
      />

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingShift?.id ? 'Edit Shift' : 'Add New Shift'}
        size="sm"
      >
        <ShiftForm
          initialData={editingShift}
          onSubmit={handleSubmit}
          onCancel={handleCloseModal}
          isLoading={isLoading}
        />
      </Modal>
    </div>
  )
}
