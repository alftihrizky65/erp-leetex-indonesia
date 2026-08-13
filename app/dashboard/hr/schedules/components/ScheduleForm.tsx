'use client'

import React from 'react'
import { Input } from '@/components/ui/Input'

export interface ScheduleFormData {
  id?: string
  employeeId: string
  employeeName?: string
  date: string
  shiftId: string
  shiftName?: string
  notes?: string
  status?: 'scheduled' | 'completed' | 'absent' | 'late'
}

interface ScheduleFormProps {
  initialData?: ScheduleFormData
  employees: Array<{ id: string; name: string; department?: string }>
  shifts: Array<{ id: string; name: string; startTime: string; endTime: string }>
  onSubmit: (data: ScheduleFormData) => void
  onCancel: () => void
  isLoading?: boolean
  mode?: 'single' | 'bulk'
}

export function ScheduleForm({
  initialData,
  employees,
  shifts,
  onSubmit,
  onCancel,
  isLoading = false,
  mode = 'single'
}: ScheduleFormProps) {
  const [formData, setFormData] = React.useState<ScheduleFormData>(
    initialData || {
      employeeId: '',
      date: '',
      shiftId: '',
      notes: '',
      status: 'scheduled'
    }
  )
  const [errors, setErrors] = React.useState<Partial<Record<keyof ScheduleFormData, string>>>({})

  // Bulk assignment fields
  const [bulkStartDate, setBulkStartDate] = React.useState('')
  const [bulkEndDate, setBulkEndDate] = React.useState('')
  const [bulkSelectedEmployees, setBulkSelectedEmployees] = React.useState<string[]>([])
  const [bulkErrors, setBulkErrors] = React.useState<{
    startDate?: string
    endDate?: string
    employees?: string
  }>({})

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof ScheduleFormData, string>> = {}

    if (!formData.employeeId) {
      newErrors.employeeId = 'Employee is required'
    }
    if (!formData.date) {
      newErrors.date = 'Date is required'
    }
    if (!formData.shiftId) {
      newErrors.shiftId = 'Shift is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateBulkForm = (): boolean => {
    const newErrors: typeof bulkErrors = {}

    if (!bulkStartDate) {
      newErrors.startDate = 'Start date is required'
    }
    if (!bulkEndDate) {
      newErrors.endDate = 'End date is required'
    }
    if (bulkSelectedEmployees.length === 0) {
      newErrors.employees = 'At least one employee must be selected'
    }
    if (bulkStartDate && bulkEndDate && new Date(bulkStartDate) > new Date(bulkEndDate)) {
      newErrors.startDate = 'Start date must be before end date'
    }

    setBulkErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (mode === 'bulk') {
      if (validateBulkForm()) {
        // Generate individual schedule entries for each employee and date
        const schedules: ScheduleFormData[] = []
        const start = new Date(bulkStartDate)
        const end = new Date(bulkEndDate)

        for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
          bulkSelectedEmployees.forEach(empId => {
            const employee = employees.find(e => e.id === empId)
            const shift = shifts.find(s => s.id === formData.shiftId)
            schedules.push({
              employeeId: empId,
              employeeName: employee?.name,
              date: date.toISOString().split('T')[0],
              shiftId: formData.shiftId,
              shiftName: shift?.name,
              notes: formData.notes,
              status: 'scheduled'
            })
          })
        }

        // Submit the first one (or modify to handle array)
        if (schedules.length > 0) {
          onSubmit({ ...schedules[0], _bulk: schedules })
        }
      }
    } else {
      if (validateForm()) {
        const employee = employees.find(e => e.id === formData.employeeId)
        const shift = shifts.find(s => s.id === formData.shiftId)
        onSubmit({
          ...formData,
          employeeName: employee?.name,
          shiftName: shift?.name
        })
      }
    }
  }

  const handleChange = (field: keyof ScheduleFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const toggleEmployeeSelection = (employeeId: string) => {
    setBulkSelectedEmployees(prev =>
      prev.includes(employeeId)
        ? prev.filter(id => id !== employeeId)
        : [...prev, employeeId]
    )
    if (bulkErrors.employees) {
      setBulkErrors(prev => ({ ...prev, employees: undefined }))
    }
  }

  const selectAllEmployees = () => {
    setBulkSelectedEmployees(employees.map(e => e.id))
    if (bulkErrors.employees) {
      setBulkErrors(prev => ({ ...prev, employees: undefined }))
    }
  }

  const clearEmployeeSelection = () => {
    setBulkSelectedEmployees([])
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Employee Selection - Different for single vs bulk */}
      {mode === 'single' ? (
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Employee <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.employeeId}
            onChange={(e) => handleChange('employeeId', e.target.value)}
            disabled={isLoading}
            className={`
              w-full px-3 py-2 text-sm border rounded-md
              focus:outline-none focus:ring-2 focus:ring-blue-500
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-colors duration-200
              ${errors.employeeId ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'}
            `}
          >
            <option value="">Select employee...</option>
            {employees.map(emp => (
              <option key={emp.id} value={emp.id}>
                {emp.name}{emp.department ? ` - ${emp.department}` : ''}
              </option>
            ))}
          </select>
          {errors.employeeId && <p className="text-sm text-red-500">{errors.employeeId}</p>}
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Select Employees <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={selectAllEmployees}
                disabled={isLoading}
                className="text-xs text-blue-600 hover:text-blue-700 disabled:opacity-50"
              >
                Select All
              </button>
              <button
                type="button"
                onClick={clearEmployeeSelection}
                disabled={isLoading}
                className="text-xs text-red-600 hover:text-red-700 disabled:opacity-50"
              >
                Clear
              </button>
            </div>
          </div>

          <div className="max-h-48 overflow-y-auto border border-gray-300 rounded-md p-2">
            {employees.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">No employees available</p>
            ) : (
              <div className="space-y-1">
                {employees.map(emp => (
                  <label
                    key={emp.id}
                    className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={bulkSelectedEmployees.includes(emp.id)}
                      onChange={() => toggleEmployeeSelection(emp.id)}
                      disabled={isLoading}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{emp.name}</span>
                    {emp.department && (
                      <span className="text-xs text-gray-500">({emp.department})</span>
                    )}
                  </label>
                ))}
              </div>
            )}
          </div>
          {bulkErrors.employees && <p className="text-sm text-red-500">{bulkErrors.employees}</p>}
          {bulkSelectedEmployees.length > 0 && (
            <p className="text-xs text-gray-600">{bulkSelectedEmployees.length} employee(s) selected</p>
          )}
        </div>
      )}

      {/* Date Selection */}
      {mode === 'single' ? (
        <Input
          label="Date"
          type="date"
          value={formData.date}
          onChange={(value) => handleChange('date', value)}
          error={errors.date}
          required
          disabled={isLoading}
        />
      ) : (
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Start Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={bulkStartDate}
              onChange={(e) => setBulkStartDate(e.target.value)}
              disabled={isLoading}
              className={`
                w-full px-3 py-2 text-sm border rounded-md
                focus:outline-none focus:ring-2 focus:ring-blue-500
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-colors duration-200
                ${bulkErrors.startDate ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'}
              `}
            />
            {bulkErrors.startDate && <p className="text-sm text-red-500">{bulkErrors.startDate}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              End Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={bulkEndDate}
              onChange={(e) => setBulkEndDate(e.target.value)}
              disabled={isLoading}
              className={`
                w-full px-3 py-2 text-sm border rounded-md
                focus:outline-none focus:ring-2 focus:ring-blue-500
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-colors duration-200
                ${bulkErrors.endDate ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'}
              `}
            />
            {bulkErrors.endDate && <p className="text-sm text-red-500">{bulkErrors.endDate}</p>}
          </div>
        </div>
      )}

      {/* Shift Selection */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Shift <span className="text-red-500">*</span>
        </label>
        <select
          value={formData.shiftId}
          onChange={(e) => handleChange('shiftId', e.target.value)}
          disabled={isLoading}
          className={`
            w-full px-3 py-2 text-sm border rounded-md
            focus:outline-none focus:ring-2 focus:ring-blue-500
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-colors duration-200
            ${errors.shiftId ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'}
          `}
        >
          <option value="">Select shift...</option>
          {shifts.map(shift => (
            <option key={shift.id} value={shift.id}>
              {shift.name} ({shift.startTime} - {shift.endTime})
            </option>
          ))}
        </select>
        {errors.shiftId && <p className="text-sm text-red-500">{errors.shiftId}</p>}
      </div>

      {/* Notes */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Notes
        </label>
        <textarea
          value={formData.notes || ''}
          onChange={(e) => handleChange('notes', e.target.value)}
          disabled={isLoading}
          rows={3}
          placeholder="Optional notes or special instructions..."
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed resize-none"
        />
      </div>

      {/* Bulk Preview */}
      {mode === 'bulk' && bulkSelectedEmployees.length > 0 && bulkStartDate && bulkEndDate && formData.shiftId && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md p-3">
          <p className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-1">
            Bulk Assignment Preview
          </p>
          <p className="text-sm text-blue-700 dark:text-blue-300">
            {bulkSelectedEmployees.length} employee(s) ×{' '}
            {Math.ceil((new Date(bulkEndDate).getTime() - new Date(bulkStartDate).getTime()) / (1000 * 60 * 60 * 24)) + 1} day(s) ={' '}
            <span className="font-semibold">
              {bulkSelectedEmployees.length * (Math.ceil((new Date(bulkEndDate).getTime() - new Date(bulkStartDate).getTime()) / (1000 * 60 * 60 * 24)) + 1)}
            </span>{' '}
            schedule(s) to be created
          </p>
        </div>
      )}

      {/* Form Actions */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'Saving...' : mode === 'bulk' ? 'Create Schedules' : initialData?.id ? 'Update Schedule' : 'Assign Schedule'}
        </button>
      </div>
    </form>
  )
}
