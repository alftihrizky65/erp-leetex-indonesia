'use client'

import React, { createContext, useContext, useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface SelectContextValue {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  selectedValue: string
  setSelectedValue: (value: string) => void
  toggleDropdown: () => void
  closeDropdown: () => void
}

const SelectContext = createContext<SelectContextValue | undefined>(undefined)

const useSelect = () => {
  const context = useContext(SelectContext)
  if (!context) {
    throw new Error('Select components must be used within a Select')
  }
  return context
}

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

interface SelectProps {
  children: React.ReactNode
  value?: string
  onValueChange?: (value: string) => void
  defaultValue?: string
  className?: string
}

export const Select: React.FC<SelectProps> = ({
  children,
  value: controlledValue,
  onValueChange,
  defaultValue = '',
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [internalValue, setInternalValue] = useState(defaultValue)
  const selectRef = useRef<HTMLDivElement>(null)

  const isControlled = controlledValue !== undefined
  const selectedValue = isControlled ? controlledValue : internalValue

  const setSelectedValue = (value: string) => {
    if (!isControlled) {
      setInternalValue(value)
    }
    onValueChange?.(value)
  }

  const toggleDropdown = () => setIsOpen(!isOpen)
  const closeDropdown = () => setIsOpen(false)

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        closeDropdown()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  // Close on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeDropdown()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen])

  return (
    <SelectContext.Provider
      value={{ isOpen, setIsOpen, selectedValue, setSelectedValue, toggleDropdown, closeDropdown }}
    >
      <div ref={selectRef} className={cn('relative', className)}>
        {children}
      </div>
    </SelectContext.Provider>
  )
}

interface SelectTriggerProps {
  children: React.ReactNode
  className?: string
  placeholder?: string
}

export const SelectTrigger: React.FC<SelectTriggerProps> = ({
  children,
  className,
  placeholder = 'Select...',
}) => {
  const { selectedValue, toggleDropdown, isOpen } = useSelect()

  return (
    <button
      type="button"
      onClick={toggleDropdown}
      aria-expanded={isOpen}
      className={cn(
        'flex items-center justify-between w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'hover:border-gray-400 transition-colors',
        className
      )}
    >
      <span className={cn(!selectedValue && 'text-gray-500')}>
        {children || (selectedValue ? children : placeholder)}
      </span>
      <svg
        className={cn('w-4 h-4 transition-transform', isOpen && 'rotate-180')}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  )
}

interface SelectValueProps {
  placeholder?: string
  className?: string
}

export const SelectValue: React.FC<SelectValueProps> = ({ placeholder = 'Select...', className }) => {
  const { selectedValue } = useSelect()

  return (
    <span className={cn(!selectedValue && 'text-gray-500', className)}>
      {selectedValue || placeholder}
    </span>
  )
}

interface SelectContentProps {
  children: React.ReactNode
  className?: string
}

export const SelectContent: React.FC<SelectContentProps> = ({ children, className }) => {
  const { isOpen, closeDropdown } = useSelect()

  if (!isOpen) return null

  return (
    <div
      className={cn(
        'absolute z-50 w-full min-w-[8rem] overflow-hidden rounded-md border bg-white shadow-lg',
        'animate-in fade-in-0 zoom-in-95',
        'max-h-60 overflow-y-auto',
        className
      )}
      onClick={(e) => {
        // Prevent closing when clicking on non-item elements
        e.stopPropagation()
      }}
    >
      <div className="p-1">{children}</div>
    </div>
  )
}

interface SelectItemProps {
  value: string
  children: React.ReactNode
  className?: string
  disabled?: boolean
}

export const SelectItem: React.FC<SelectItemProps> = ({
  value,
  children,
  className,
  disabled = false,
}) => {
  const { selectedValue, setSelectedValue, closeDropdown } = useSelect()

  const handleClick = () => {
    if (!disabled) {
      setSelectedValue(value)
      closeDropdown()
    }
  }

  const isSelected = selectedValue === value

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className={cn(
        'relative flex w-full items-center rounded-sm px-2 py-1.5 text-sm outline-none',
        'transition-colors',
        'hover:bg-gray-100 focus-visible:bg-gray-100',
        'disabled:pointer-events-none disabled:opacity-50',
        isSelected && 'bg-blue-50 text-blue-600 hover:bg-blue-100 focus-visible:bg-blue-100',
        className
      )}
    >
      <span className="flex-1 text-left">{children}</span>
      {isSelected && (
        <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      )}
    </button>
  )
}

export default Select
