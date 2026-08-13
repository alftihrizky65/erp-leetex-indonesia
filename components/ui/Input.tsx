import React from 'react'

interface InputProps {
  label?: string
  type?: 'text' | 'email' | 'password' | 'number' | 'date'
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  error?: string
  disabled?: boolean
  required?: boolean
  id?: string
  name?: string
  multiline?: boolean
  rows?: number
}

export const Input: React.FC<InputProps> = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  disabled = false,
  required = false,
  id,
  name,
  multiline = false,
  rows = 3,
}) => {
  const inputId = id || name || `input-${Math.random().toString(36).substr(2, 9)}`

  const inputClassName = `
    ${multiline ? 'py-3 resize-y' : 'h-10'} w-full rounded-md border border-gray-300 bg-white px-3 py-2
    text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm
    file:font-medium placeholder:text-gray-500 focus-visible:outline-none
    focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
    disabled:cursor-not-allowed disabled:opacity-50
    dark:border-gray-700 dark:bg-gray-950 dark:ring-offset-gray-950
    dark:placeholder:text-gray-400 dark:focus-visible:ring-blue-400
    transition-colors duration-200
    ${error ? 'border-red-500 focus-visible:ring-red-500' : ''}
  `

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      {multiline ? (
        <textarea
          id={inputId}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          disabled={disabled}
          required={required}
          rows={rows}
          className={inputClassName}
        />
      ) : (
        <input
          id={inputId}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          disabled={disabled}
          required={required}
          className={inputClassName}
        />
      )}
      {error && (
        <p className="text-sm text-red-500 mt-1">{error}</p>
      )}
    </div>
  )
}

export default Input
