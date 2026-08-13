/**
 * Mock Data Index
 * Central export for all mock data modules
 */

// HR Module
export * from './hr'

// Payroll Module
export * from './payroll'

// Finance Module
export * from './finance'

// Inventory Module
export * from './inventory'

// Machines Module
export * from './machines'

// Sales Module
export * from './sales'

// Procurement Module
export * from './procurement'

// Production Module
export * from './production'

/**
 * Get mock data by module name
 */
export const getMockData = (module: string) => {
  switch (module.toLowerCase()) {
    case 'hr':
    case 'employees':
    case 'attendance':
    case 'shifts':
    case 'schedules':
      return import('./hr')
    case 'payroll':
      return import('./payroll')
    case 'finance':
    case 'transactions':
      return import('./finance')
    case 'inventory':
    case 'products':
    case 'stock':
      return import('./inventory')
    case 'machines':
    case 'maintenance':
      return import('./machines')
    case 'sales':
    case 'customers':
    case 'orders':
      return import('./sales')
    case 'procurement':
    case 'suppliers':
    case 'purchase':
      return import('./procurement')
    case 'production':
    case 'workorders':
    case 'bom':
      return import('./production')
    default:
      throw new Error(`Unknown module: ${module}`)
  }
}

/**
 * Get all dashboard statistics
 */
import { getEmployeeStats, getAttendanceStats } from './hr'
import { getPayrollStats } from './payroll'
import { getFinanceStats } from './finance'
import { getInventoryStats } from './inventory'
import { getMachineStats } from './machines'
import { getSalesStats } from './sales'
import { getProcurementStats } from './procurement'
import { getProductionStats } from './production'

export const getDashboardStats = () => {
  const today = new Date().toISOString().split('T')[0]

  const employeeStats = getEmployeeStats()
  const attendanceStats = getAttendanceStats(today)
  const payrollStats = getPayrollStats()
  const financeStats = getFinanceStats()
  const inventoryStats = getInventoryStats()
  const machineStats = getMachineStats()
  const salesStats = getSalesStats()
  const procurementStats = getProcurementStats()
  const productionStats = getProductionStats()

  return {
    hr: {
      totalEmployees: employeeStats.total,
      attendanceToday: attendanceStats
    },
    payroll: {
      pendingPayroll: payrollStats.pendingCount
    },
    finance: {
      totalIncome: financeStats.totalIncome,
      totalExpense: financeStats.totalExpense,
      balance: financeStats.balance,
      incomeTrend: financeStats.incomeTrend
    },
    inventory: {
      lowStockItems: inventoryStats.lowStockItems,
      outOfStockItems: inventoryStats.outOfStockItems
    },
    machines: {
      underMaintenance: machineStats.underMaintenance,
      active: machineStats.active
    },
    sales: {
      pendingOrders: salesStats.pendingOrders,
      completedThisMonth: salesStats.completedOrders
    },
    procurement: {
      pendingPOs: procurementStats.pendingPOs,
      receivedThisMonth: procurementStats.receivedPOs
    },
    production: {
      activeWOs: productionStats.activeWOs,
      completedThisMonth: productionStats.completedWOs
    }
  }
}
