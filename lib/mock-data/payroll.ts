export type PayrollStatus = 'draft' | 'paid' | 'cancelled'

export interface Payroll {
  id: string
  employeeId: string
  employeeName: string
  period: string // Format: YYYY-MM
  basicSalary: number
  allowances: number
  deductions: number
  netSalary: number
  status: PayrollStatus
  createdAt: string
  updatedAt: string
}

// Mock employee data (simplified)
const mockEmployees = [
  { id: 'EMP001', name: 'Ahmad Suryadi' },
  { id: 'EMP002', name: 'Siti Rahayu' },
  { id: 'EMP003', name: 'Budi Pratama' },
  { id: 'EMP004', name: 'Dewi Lestari' },
  { id: 'EMP005', name: 'Eko Kurniawan' },
  { id: 'EMP006', name: 'Fani Wijaya' },
  { id: 'EMP007', name: 'Gunawan Santoso' },
  { id: 'EMP008', name: 'Hartono Tan' },
]

// Generate payroll data for the last 6 months
const generatePayrolls = (): Payroll[] => {
  const payrolls: Payroll[] = []
  const now = new Date()
  const statuses: PayrollStatus[] = ['draft', 'paid', 'paid', 'paid', 'cancelled']

  for (let i = 0; i < 6; i++) {
    const year = now.getFullYear()
    const month = now.getMonth() - i
    const periodDate = new Date(year, month, 1)
    const period = `${periodDate.getFullYear()}-${String(periodDate.getMonth() + 1).padStart(2, '0')}`

    // Generate payrolls for each employee in this period
    mockEmployees.forEach((employee) => {
      const basicSalary = Math.floor(Math.random() * 3000000) + 4000000 // 4-7 million
      const allowances = Math.floor(Math.random() * 2000000) + 500000 // 500k-2.5 million
      const deductions = Math.floor(Math.random() * 500000) + 100000 // 100k-600k
      const netSalary = basicSalary + allowances - deductions

      // Skip some entries to make it realistic
      if (Math.random() > 0.7) return

      const status = statuses[Math.floor(Math.random() * statuses.length)]
      const createdAt = new Date(periodDate.getFullYear(), periodDate.getMonth(), Math.floor(Math.random() * 28) + 1).toISOString()

      payrolls.push({
        id: `PAY-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        employeeId: employee.id,
        employeeName: employee.name,
        period,
        basicSalary,
        allowances,
        deductions,
        netSalary,
        status,
        createdAt,
        updatedAt: createdAt,
      })
    })
  }

  // Sort by period descending, then by employee name
  return payrolls.sort((a, b) => {
    const periodCompare = b.period.localeCompare(a.period)
    if (periodCompare !== 0) return periodCompare
    return a.employeeName.localeCompare(b.employeeName)
  })
}

export const mockPayrolls = generatePayrolls()

// Helper function to get payroll by ID
export const getPayrollById = (id: string): Payroll | undefined => {
  return mockPayrolls.find((p) => p.id === id)
}

// Helper function to get payrolls by employee
export const getPayrollsByEmployee = (employeeId: string): Payroll[] => {
  return mockPayrolls.filter((p) => p.employeeId === employeeId)
}

// Helper function to get payrolls by period
export const getPayrollsByPeriod = (period: string): Payroll[] => {
  return mockPayrolls.filter((p) => p.period === period)
}

// Helper function to get unique periods
export const getPeriods = (): string[] => {
  const periods = new Set(mockPayrolls.map((p) => p.period))
  return Array.from(periods).sort().reverse()
}

// Helper to calculate total for a period
export const calculatePeriodTotal = (period: string): number => {
  const payrolls = getPayrollsByPeriod(period)
  return payrolls.reduce((sum, p) => sum + p.netSalary, 0)
}

// Stats helper
export const getPayrollStats = () => {
  const currentPeriod = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}`
  const pendingPayrolls = mockPayrolls.filter(p => p.period === currentPeriod && p.status === 'draft')

  return {
    pendingCount: pendingPayrolls.length,
    totalPaidThisMonth: mockPayrolls
      .filter(p => p.period === currentPeriod && p.status === 'paid')
      .reduce((sum, p) => sum + p.netSalary, 0)
  }
}
