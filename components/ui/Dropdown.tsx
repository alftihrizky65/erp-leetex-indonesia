'use client'

import React, { createContext, useContext, useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface DropdownContextValue {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  toggleDropdown: () => void
  closeDropdown: () => void
}

const DropdownContext = createContext<DropdownContextValue | undefined>(undefined)

const useDropdown = () => {
  const context = useContext(DropdownContext)
  if (!context) {
    throw new Error('Dropdown components must be used within a Dropdown')
  }
  return context
}

interface DropdownProps {
  children: React.ReactNode
  align?: 'left' | 'right'
  className?: string
}

export const Dropdown: React.FC<DropdownProps> = ({
  children,
  align = 'left',
  className
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const toggleDropdown = () => setIsOpen(!isOpen)
  const closeDropdown = () => setIsOpen(false)

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
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
    <DropdownContext.Provider value={{ isOpen, setIsOpen, toggleDropdown, closeDropdown }}>
      <div ref={dropdownRef} className={cn('relative', className)}>
        {children}
      </div>
    </DropdownContext.Provider>
  )
}

interface DropdownTriggerProps {
  children: React.ReactNode
  className?: string
  asChild?: boolean
}

export const DropdownTrigger: React.FC<DropdownTriggerProps> = ({
  children,
  className,
  asChild = false
}) => {
  const { toggleDropdown, isOpen } = useDropdown()

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      onClick: toggleDropdown,
      'aria-expanded': isOpen,
      'aria-haspopup': 'true'
    } as React.HTMLAttributes<HTMLElement>)
  }

  return (
    <button
      type="button"
      onClick={toggleDropdown}
      aria-expanded={isOpen}
      aria-haspopup="true"
      className={cn(
        'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        'disabled:pointer-events-none disabled:opacity-50',
        className
      )}
    >
      {children}
    </button>
  )
}

interface DropdownContentProps {
  children: React.ReactNode
  className?: string
  align?: 'left' | 'right'
}

export const DropdownContent: React.FC<DropdownContentProps> = ({
  children,
  className,
  align = 'left'
}) => {
  const { isOpen, closeDropdown } = useDropdown()

  if (!isOpen) return null

  return (
    <div
      className={cn(
        'absolute z-50 min-w-[8rem] overflow-hidden rounded-md border bg-background p-1 text-foreground shadow-md',
        'animate-in fade-in-0 zoom-in-95',
        align === 'left' ? 'left-0' : 'right-0',
        'top-full mt-2',
        className
      )}
      onClick={closeDropdown}
    >
      {children}
    </div>
  )
}

interface DropdownItemProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  disabled?: boolean
  icon?: React.ReactNode
  variant?: 'default' | 'danger'
}

export const DropdownItem: React.FC<DropdownItemProps> = ({
  children,
  onClick,
  className,
  disabled = false,
  icon,
  variant = 'default'
}) => {
  const { closeDropdown } = useDropdown()

  const handleClick = () => {
    if (!disabled) {
      onClick?.()
      closeDropdown()
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className={cn(
        'relative flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none',
        'transition-colors',
        'hover:bg-accent hover:text-accent-foreground',
        'focus-visible:bg-accent focus-visible:text-accent-foreground',
        'disabled:pointer-events-none disabled:opacity-50',
        variant === 'danger' && 'text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/30',
        className
      )}
    >
      {icon && <span className="h-4 w-4">{icon}</span>}
      {children}
    </button>
  )
}

interface DropdownSeparatorProps {
  className?: string
}

export const DropdownSeparator: React.FC<DropdownSeparatorProps> = ({ className }) => {
  return (
    <div className={cn('h-px my-1 bg-border', className)} />
  )
}

export default Dropdown
