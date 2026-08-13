'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { navItems, type NavItem } from '@/lib/navigation'
import * as Icons from 'lucide-react'
import { cn } from '@/lib/utils'
import Image from 'next/image'

// Icon component mapping
const Icon = ({ name, className }: { name: string; className?: string }) => {
  const LucideIcon = (Icons as Record<string, React.ComponentType<{ className?: string }>>)[
    name
  ]
  return LucideIcon ? <LucideIcon className={className} /> : null
}

// Navigation Item Component
interface NavItemProps {
  item: NavItem
  pathname: string
  isExpanded?: boolean
  isCollapsed?: boolean
  onChildClick?: () => void
}

const NavigationItem = ({ item, pathname, isExpanded = false, onChildClick, isCollapsed = false }: NavItemProps) => {
  const [isExpandedLocal, setIsExpandedLocal] = useState(false)
  const isActive = pathname === item.path || pathname.startsWith(`${item.path}/`)
  const hasChildren = item.children && item.children.length > 0
  const isChildItem = isExpanded && !hasChildren

  // Auto-expand if any child is active
  useEffect(() => {
    if (hasChildren && item.children?.some((child) => pathname === child.path)) {
      setIsExpandedLocal(true)
    }
  }, [pathname, hasChildren, item.children])

  const handleClick = (e: React.MouseEvent) => {
    if (hasChildren) {
      e.preventDefault()
      setIsExpandedLocal(!isExpandedLocal)
    }
    if (onChildClick) {
      onChildClick()
    }
  }

  return (
    <li>
      <Link
        href={hasChildren ? '#' : item.path}
        onClick={handleClick}
        className={cn(
          'group flex items-center gap-2 text-sm font-medium transition-all duration-150',
          'hover:bg-white/10',
          isActive
            ? 'bg-white/15 text-white rounded-lg'
            : 'text-white/80 hover:text-white rounded-lg',
          // Responsive padding
          isCollapsed ? 'justify-center px-2 py-2' : 'px-3 py-2',
          // Child item styling
          isChildItem && 'rounded-md px-2 py-1.5 text-xs',
          isExpanded && !isActive && !isCollapsed && !isChildItem && 'pl-5'
        )}
        title={isCollapsed ? item.label : undefined}
      >
        <Icon
          name={item.icon}
          className={cn(
            'h-4 w-4 flex-shrink-0 transition-transform duration-150',
            isActive ? 'text-white' : 'text-white/60 group-hover:text-white',
            hasChildren && 'group-hover:scale-110'
          )}
        />
        {!isCollapsed && (
          <>
            <span className="flex-1 truncate">{item.label}</span>
            {item.badge && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-white/20 px-1.5 text-xs font-medium text-white">
                {item.badge}
              </span>
            )}
            {hasChildren && (
              <Icons.ChevronRight
                className={cn(
                  'h-3 w-3 flex-shrink-0 transition-transform duration-200 text-white/50',
                  isExpandedLocal ? 'rotate-90' : ''
                )}
              />
            )}
          </>
        )}
      </Link>

      {hasChildren && isExpandedLocal && (
        <ul className="ml-5 mt-1 space-y-0.5 border-l border-white/10 pl-2">
          {item.children!.map((child) => (
            <NavigationItem
              key={child.id}
              item={child}
              pathname={pathname}
              isExpanded
              onChildClick={onChildClick}
            />
          ))}
        </ul>
      )}
    </li>
  )
}

// User Profile Section
const UserProfile = ({ onMobileClose, isCollapsed }: { onMobileClose?: () => void; isCollapsed?: boolean }) => {
  return (
    <div className={cn(
      'border-t border-white/10 bg-[#0f3320] p-3',
      isCollapsed && 'flex justify-center'
    )}>
      <Link
        href="/profile"
        onClick={onMobileClose}
        className={cn(
          'group flex items-center gap-2 rounded-lg p-2 transition-all duration-150 hover:bg-white/10',
          isCollapsed && 'justify-center'
        )}
        title={isCollapsed ? 'Admin User' : undefined}
      >
        <div className="relative h-8 w-8 flex-shrink-0 overflow-hidden rounded-full bg-white/20">
          <div className="absolute inset-0 flex items-center justify-center">
            <Icons.User className="h-4 w-4 text-white" />
          </div>
        </div>
        {!isCollapsed && (
          <>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-white truncate">Admin</p>
              <p className="text-[10px] text-white/60 truncate">admin@leetex.co.id</p>
            </div>
            <Icons.Settings className="h-3 w-3 flex-shrink-0 text-white/50 group-hover:text-white transition-colors" />
          </>
        )}
      </Link>
    </div>
  )
}

// Main Sidebar Component
interface SidebarProps {
  isOpen?: boolean
  isCollapsed?: boolean
  onMobileClose?: () => void
}

export const Sidebar = ({ isOpen = true, isCollapsed = false, onMobileClose }: SidebarProps) => {
  const pathname = usePathname()

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 flex h-full flex-col bg-[#1a472a] transition-all duration-300 ease-in-out shadow-xl',
        isOpen ? 'translate-x-0' : '-translate-x-full',
        // Collapse transition
        isCollapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Brand/Logo Area */}
      <div className={cn(
        'flex h-16 items-center gap-3 border-b border-white/10 bg-[#0f3320]',
        isCollapsed ? 'justify-center px-3' : 'px-4'
      )}>
        <div className="relative flex-shrink-0">
          <Image
            src="/img/images-removebg-preview.png"
            alt="Leetex Logo"
            width={isCollapsed ? 28 : 32}
            height={isCollapsed ? 28 : 32}
            className={cn(
              'object-contain',
              isCollapsed ? 'h-7 w-7' : 'h-8 w-8'
            )}
          />
        </div>
        {!isCollapsed && (
          <div className="flex flex-col">
            <h1 className="text-sm font-semibold text-white tracking-tight leading-tight">PT Leetex Garment</h1>
            <p className="text-[10px] text-white/70">Indonesia</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-4 scrollbar-thin scrollbar-thumb-green-800 scrollbar-track-green-950">
        <ul className={cn(
          'space-y-1',
          isCollapsed && 'flex flex-col items-center'
        )}>
          {navItems.map((item) => (
            <NavigationItem
              key={item.id}
              item={item}
              pathname={pathname}
              isCollapsed={isCollapsed}
              onChildClick={onMobileClose}
            />
          ))}
        </ul>
      </nav>

      {/* User Profile Section */}
      <UserProfile onMobileClose={onMobileClose} isCollapsed={isCollapsed} />
    </aside>
  )
}

// Mobile Overlay
interface MobileOverlayProps {
  isOpen: boolean
  onClose: () => void
}

export const MobileOverlay = ({ isOpen, onClose }: MobileOverlayProps) => {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden"
          onClick={onClose}
        />
      )}
    </>
  )
}
