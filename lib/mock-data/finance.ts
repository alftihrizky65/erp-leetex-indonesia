/**
 * Mock Data for Finance Module
 */

export interface CashTransaction {
  id: string
  transaction_type: 'income' | 'expense'
  category: string
  amount: number
  transaction_date: string
  description: string
  reference_code?: string
}

const categories = {
  income: ['Sales', 'Service Fee', 'Interest Income', 'Other Income'],
  expense: ['Operational', 'Salary', 'Utility', 'Maintenance', 'Purchase', 'Marketing', 'Tax', 'Other Expense']
}

const today = new Date()
const currentYear = today.getFullYear()
const currentMonth = today.getMonth()

export const cashTransactions: CashTransaction[] = []
let transactionCounter = 1

// Generate income transactions
for (let i = 0; i < 15; i++) {
  const day = 1 + Math.floor(Math.random() * today.getDate())
  const date = new Date(currentYear, currentMonth, day)
  const category = categories.income[Math.floor(Math.random() * categories.income.length)]
  const amount = 5000 + Math.floor(Math.random() * 45000)

  cashTransactions.push({
    id: `txn-${transactionCounter++}`,
    transaction_type: 'income',
    category,
    amount,
    transaction_date: date.toISOString().split('T')[0],
    description: `${category} from ${category === 'Sales' ? 'product delivery' : 'monthly service'}`,
    reference_code: `SO-${currentYear}${String(currentMonth + 1).padStart(2, '0')}-${String(i + 1).padStart(4, '0')}`
  })
}

// Generate expense transactions
for (let i = 0; i < 25; i++) {
  const day = 1 + Math.floor(Math.random() * today.getDate())
  const date = new Date(currentYear, currentMonth, day)
  const category = categories.expense[Math.floor(Math.random() * categories.expense.length)]
  const amount = 500 + Math.floor(Math.random() * 15000)

  cashTransactions.push({
    id: `txn-${transactionCounter++}`,
    transaction_type: 'expense',
    category,
    amount,
    transaction_date: date.toISOString().split('T')[0],
    description: `Monthly ${category.toLowerCase()} payment`,
    reference_code: category === 'Purchase' ? `PO-${currentYear}${String(currentMonth + 1).padStart(2, '0')}-${String(i + 1).padStart(4, '0')}` : undefined
  })
}

// Sort by date
cashTransactions.sort((a, b) => new Date(b.transaction_date).getTime() - new Date(a.transaction_date).getTime())

// Statistics helpers
export const getFinanceStats = () => {
  const currentMonthTransactions = cashTransactions.filter(t => {
    const tDate = new Date(t.transaction_date)
    return tDate.getMonth() === currentMonth && tDate.getFullYear() === currentYear
  })

  const totalIncome = currentMonthTransactions
    .filter(t => t.transaction_type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)

  const totalExpense = currentMonthTransactions
    .filter(t => t.transaction_type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)

  const balance = totalIncome - totalExpense

  // Calculate trend (vs previous month)
  const prevMonthTransactions = cashTransactions.filter(t => {
    const tDate = new Date(t.transaction_date)
    return tDate.getMonth() === currentMonth - 1 && tDate.getFullYear() === currentYear
  })

  const prevIncome = prevMonthTransactions
    .filter(t => t.transaction_type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)

  const prevExpense = prevMonthTransactions
    .filter(t => t.transaction_type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)

  const incomeTrend = prevIncome > 0 ? ((totalIncome - prevIncome) / prevIncome) * 100 : 0
  const expenseTrend = prevExpense > 0 ? ((totalExpense - prevExpense) / prevExpense) * 100 : 0

  return {
    totalIncome,
    totalExpense,
    balance,
    incomeTrend: Math.round(incomeTrend * 10) / 10,
    expenseTrend: Math.round(expenseTrend * 10) / 10,
    transactionCount: currentMonthTransactions.length
  }
}

// Category breakdown for charts
export const getCategoryBreakdown = () => {
  const breakdown: Record<string, number> = {}

  cashTransactions.forEach(t => {
    if (t.transaction_type === 'expense') {
      breakdown[t.category] = (breakdown[t.category] || 0) + t.amount
    }
  })

  return Object.entries(breakdown).map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount)
}
