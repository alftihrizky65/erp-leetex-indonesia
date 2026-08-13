'use client'

import React from 'react'
import { Input } from '@/components/ui/Input'

export interface ShiftFormData {
  id?: string
  name: string
  startTime: string
  endTime: string
  isNightShift: boolean
}

interface ShiftFormProps {
  initialData?: ShiftFormData
  onSubmit: (data: ShiftFormData) => void
  onCancel: () => void
  isLoading?: boolean
}

export function ShiftForm({ initialData, onSubmit, onCancel, isLoading = false }: ShiftFormProps) {
  const [formData, setFormData] = React.useState<ShiftFormData>(
    initialData || {
      name: '',
      startTime: '',
      endTime: '',
      isNightShift: false,
    }
  )
  const [errors, setErrors] = React.useState<Partial<Record<keyof ShiftFormData, string>>>({})

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof ShiftFormData, string>> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Shift name is required'
    }
    if (!formData.startTime) {
      newErrors.startTime = 'Start time is required'
    }
    if (!formData.endTime) {
      newErrors.endTime = 'End time is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  const handleChange = (field: keyof ShiftFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  // Auto-detect night shift based on time
  React.useEffect(() => {
    if (formData.startTime && formData.endTime) {
      const startHour = parseInt(formData.startTime.split(':')[0])
      const endHour = parseInt(formData.endTime.split(':')[0])
      // Consider it night shift if starts after 6 PM or ends before 6 AM
      const isNight = startHour >= 18 || endHour < 6
      setFormData((prev) => ({ ...prev, isNightShift: isNight }))
    }
  }, [formData.startTime, formData.endTime])

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Shift Name"
        placeholder="e.g., Morning Shift, Night Shift"
        value={formData.name}
        onChange={(value) => handleChange('name', value)}
        error={errors.name}
        required
        disabled={isLoading}
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Start Time"
          type="time"
          value={formData.startTime}
          onChange={(value) => handleChange('startTime', value)}
          error={errors.startTime}
          required
          disabled={isLoading}
        />

        <Input
          label="End Time"
          type="time"
          value={formData.endTime}
          onChange={(value) => handleChange('endTime', value)}
          error={errors.endTime}
          required
          disabled={isLoading}
        />
      </div>

      {/* Night Shift Indicator (Auto-detected) */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="isNightShift"
          checked={formData.isNightShift}
          onChange={(e) => handleChange('isNightShift', e.target.checked)}
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          disabled={isLoading}
        />
        <label htmlFor="isNightShift" className="text-sm text-gray-700 dark:text-gray-300">
          Night Shift (auto-detected based on time)
        </label>
      </div>

      {formData.isNightShift && (
        <div className="flex items-center gap-2 text-sm text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 dark:text-indigo-400 px-3 py-2 rounded-md">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
          <span>This will be marked as a night shift</span>
        </div>
      )}

      <div className="flex items-center justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Saving...' : initialData?.id ? 'Update Shift' : 'Create Shift'}
        </button>
      </div>
    </form>
  )
}
