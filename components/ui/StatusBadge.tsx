import React from 'react';
import { cn } from '@/lib/utils';

type StatusType = 'default' | 'success' | 'warning' | 'danger' | 'info' | 'processing';
type StatusSize = 'sm' | 'md';

interface StatusBadgeProps {
  status: string;
  type?: StatusType;
  size?: StatusSize;
  className?: string;
}

/**
 * StatusBadge - A reusable badge component for displaying status indicators
 *
 * @param status - The status text to display (e.g., "pending", "active", "completed")
 * @param type - Predefined type that determines color (optional, auto-detected from status if not provided)
 * @param size - Size variant: 'sm' (small) or 'md' (medium, default)
 * @param className - Additional CSS classes
 */
export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  type,
  size = 'md',
  className,
}) => {
  // Auto-detect type from status string if not explicitly provided
  const detectedType = type || getTypeFromStatus(status);

  const badgeClasses = cn(
    'inline-flex items-center justify-center font-medium rounded-full',
    'capitalize border',
    sizeClasses[size],
    typeClasses[detectedType],
    className
  );

  const showDot = detectedType === 'processing' || detectedType === 'success' || detectedType === 'warning';

  return (
    <span className={badgeClasses}>
      {showDot && (
        <span
          className={cn(
            'mr-1.5 rounded-full',
            size === 'sm' ? 'w-1.5 h-1.5' : 'w-2 h-2',
            dotClasses[detectedType]
          )}
        />
      )}
      {status}
    </span>
  );
};

// Size classes
const sizeClasses: Record<StatusSize, string> = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-sm',
};

// Type-based color classes
const typeClasses: Record<StatusType, string> = {
  default: 'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700',
  success: 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800',
  warning: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800',
  danger: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800',
  info: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800',
  processing: 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-900/20 dark:text-indigo-400 dark:border-indigo-800',
};

// Dot indicator classes for animated/solid states
const dotClasses: Record<StatusType, string> = {
  default: 'bg-gray-500',
  success: 'bg-green-500',
  warning: 'bg-amber-500',
  danger: 'bg-red-500',
  info: 'bg-blue-500',
  processing: 'bg-indigo-500 animate-pulse',
};

/**
 * Auto-detect badge type from common status strings
 */
function getTypeFromStatus(status: string): StatusType {
  const normalizedStatus = status.toLowerCase().replace(/[-_\s]/g, '');

  const typeMap: Record<string, StatusType> = {
    // Success states
    completed: 'success',
    complete: 'success',
    finished: 'success',
    done: 'success',
    success: 'success',
    successful: 'success',
    delivered: 'success',
    paid: 'success',
    approved: 'success',
    active: 'success',
    published: 'success',
    resolved: 'success',

    // Processing states
    processing: 'processing',
    inprogress: 'processing',
    in_progress: 'processing',
    pending: 'processing',
    awaiting: 'processing',
    queued: 'processing',
    scheduled: 'processing',
    reviewing: 'processing',
    underreview: 'processing',

    // Warning states
    draft: 'warning',
    partial: 'warning',
    overdue: 'warning',
    expiring: 'warning',
    onhold: 'warning',
    hold: 'warning',
    suspended: 'warning',
    flagged: 'warning',

    // Danger states
    cancelled: 'danger',
    canceled: 'danger',
    cancelled: 'danger',
    failed: 'danger',
    failure: 'danger',
    error: 'danger',
    rejected: 'danger',
    declined: 'danger',
    inactive: 'danger',
    expired: 'danger',
    blocked: 'danger',
    terminated: 'danger',
    lost: 'danger',

    // Info states
    new: 'info',
    created: 'info',
    open: 'info',
    pendingapproval: 'info',
    pending_approval: 'info',
    submitted: 'info',
    sent: 'info',
  };

  return typeMap[normalizedStatus] || 'default';
}
