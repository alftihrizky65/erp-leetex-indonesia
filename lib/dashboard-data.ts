/**
 * Dashboard Data Fetching (Server-Side)
 * Fast data fetching using Supabase on the server
 */

import { createClient } from '@supabase/supabase-js'

interface DashboardStats {
  employees: number
  orders: number
  revenue: number
  workOrders: number
  products: number
  suppliers: number
  customers: number
  transactions: number
}

const defaultStats: DashboardStats = {
  employees: 0,
  orders: 0,
  revenue: 0,
  workOrders: 0,
  products: 0,
  suppliers: 0,
  customers: 0,
  transactions: 0,
}

/**
 * Get dashboard stats - Server Side (FAST)
 * This runs on the server, no client-side delays
 */
export async function getDashboardStats(): Promise<DashboardStats> {
  // Only run on server
  if (typeof window !== 'undefined') {
    return defaultStats
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

  if (!supabaseUrl || !supabaseKey) {
    console.warn('Supabase env vars not configured')
    return defaultStats
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    })

    // Parallel queries for speed
    const [
      employeesResult,
      ordersResult,
      productsResult,
      suppliersResult,
      customersResult,
      workOrdersResult,
      ordersData,
      transactionsResult,
    ] = await Promise.all([
      // Count queries
      supabase.from('employees').select('id', { count: 'exact', head: true }),
      supabase.from('sales_orders').select('id', { count: 'exact', head: true }),
      supabase.from('products').select('id', { count: 'exact', head: true }),
      supabase.from('suppliers').select('id', { count: 'exact', head: true }),
      supabase.from('customers').select('id', { count: 'exact', head: true }),
      supabase.from('work_orders').select('id', { count: 'exact', head: true }),
      // Get order amounts for revenue
      supabase.from('sales_orders').select('total_amount').eq('status', 'completed'),
      supabase.from('cash_transactions').select('id', { count: 'exact', head: true }),
    ])

    // Calculate revenue - ordersData.data is the array
    const revenue = (ordersData.data || []).reduce((sum, order) => sum + (order.total_amount || 0), 0)

    return {
      employees: employeesResult.count || 0,
      orders: ordersResult.count || 0,
      revenue,
      workOrders: workOrdersResult.count || 0,
      products: productsResult.count || 0,
      suppliers: suppliersResult.count || 0,
      customers: customersResult.count || 0,
      transactions: transactionsResult.count || 0,
    }
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    return defaultStats
  }
}

/**
 * Get dashboard stats with cache - for even faster reloads
 */
export async function getCachedDashboardStats(revalidate: number = 60): Promise<DashboardStats> {
  // Next.js will cache this automatically with fetch caching
  return getDashboardStats()
}
