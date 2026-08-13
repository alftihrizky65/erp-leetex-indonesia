'use client'

import React from 'react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

export interface CustomerFormData {
  name: string
  company?: string
  email: string
  phone: string
  address: string
}

interface CustomerFormProps {
  onSubmit: (data: CustomerFormData) => void
  onCancel?: () => void
  initialData?: Partial<CustomerFormData>
  loading?: boolean
  title?: string
}

export const CustomerForm: React.FC<CustomerFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
  loading = false,
  title = 'Customer Information',
}) => {
  const [formData, setFormData] = React.useState<CustomerFormData>({
    name: initialData?.name || '',
    company: initialData?.company || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    address: initialData?.address || '',
  })

  const [errors, setErrors] = React.useState<Partial<Record<keyof CustomerFormData, string>>>({})

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof CustomerFormData, string>> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Customer name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required'
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

  const handleChange = (field: keyof CustomerFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <Card title={title} className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Customer Name"
            placeholder="Enter customer name"
            value={formData.name}
            onChange={(value) => handleChange('name', value)}
            error={errors.name}
            required
            name="name"
          />

          <Input
            label="Company Name (Optional)"
            placeholder="Enter company name"
            value={formData.company}
            onChange={(value) => handleChange('company', value)}
            name="company"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Email"
            type="email"
            placeholder="customer@example.com"
            value={formData.email}
            onChange={(value) => handleChange('email', value)}
            error={errors.email}
            required
            name="email"
          />

          <Input
            label="Phone"
            type="tel"
            placeholder="+62 812 3456 7890"
            value={formData.phone}
            onChange={(value) => handleChange('phone', value)}
            error={errors.phone}
            required
            name="phone"
          />
        </div>

        <Input
          label="Address"
          placeholder="Enter complete address"
          value={formData.address}
          onChange={(value) => handleChange('address', value)}
          error={errors.address}
          required
          name="address"
          multiline
        />

        <div className="flex items-center justify-end gap-3 pt-4">
          {onCancel && (
            <Button
              type="button"
              variant="secondary"
              onClick={onCancel}
              disabled={loading}
            >
              Cancel
            </Button>
          )}
          <Button type="submit" loading={loading}>
            {initialData ? 'Update Customer' : 'Add Customer'}
          </Button>
        </div>
      </form>
    </Card>
  )
}

export default CustomerForm
