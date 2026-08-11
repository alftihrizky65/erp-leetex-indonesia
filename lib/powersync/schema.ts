/**
 * PowerSync Schema Configuration
 *
 * This defines the local SQLite schema that will sync with Supabase PostgreSQL.
 * The schema must match your Supabase tables and Sync Rules.
 *
 * Available column types: text, integer, real
 */

import { Column, Table } from '@powersync/node'

// ERP Database Tables
export const users = new Table({
  id: Column.text({ primary: true }),
  email: Column.text(),
  name: Column.text(),
  role: Column.text(),
  created_at: Column.text(),
  updated_at: Column.text(),
})

export const employees = new Table({
  id: Column.text({ primary: true }),
  user_id: Column.text(),
  employee_code: Column.text(),
  full_name: Column.text(),
  department: Column.text(),
  position: Column.text(),
  hire_date: Column.text(),
  status: Column.text(),
  created_at: Column.text(),
  updated_at: Column.text(),
})

export const inventory = new Table({
  id: Column.text({ primary: true }),
  item_code: Column.text(),
  name: Column.text(),
  category: Column.text(),
  quantity: Column.integer(),
  unit: Column.text(),
  location: Column.text(),
  created_at: Column.text(),
  updated_at: Column.text(),
})

export const production = new Table({
  id: Column.text({ primary: true }),
  order_id: Column.text(),
  product_id: Column.text(),
  quantity: Column.integer(),
  status: Column.text(),
  start_date: Column.text(),
  end_date: Column.text(),
  created_at: Column.text(),
  updated_at: Column.text(),
})

export const sales = new Table({
  id: Column.text({ primary: true }),
  customer_id: Column.text(),
  order_date: Column.text(),
  total_amount: Column.real(),
  status: Column.text(),
  created_at: Column.text(),
  updated_at: Column.text(),
})

export const machines = new Table({
  id: Column.text({ primary: true }),
  machine_code: Column.text(),
  name: Column.text(),
  status: Column.text(),
  maintenance_date: Column.text(),
  created_at: Column.text(),
  updated_at: Column.text(),
})

export const payroll = new Table({
  id: Column.text({ primary: true }),
  employee_id: Column.text(),
  period: Column.text(),
  basic_salary: Column.real(),
  allowances: Column.real(),
  deductions: Column.real(),
  net_salary: Column.real(),
  status: Column.text(),
  created_at: Column.text(),
  updated_at: Column.text(),
})

export const procurement = new Table({
  id: Column.text({ primary: true }),
  supplier_id: Column.text(),
  item_id: Column.text(),
  quantity: Column.integer(),
  unit_price: Column.real(),
  total_price: Column.real(),
  order_date: Column.text(),
  status: Column.text(),
  created_at: Column.text(),
  updated_at: Column.text(),
})

export const finance = new Table({
  id: Column.text({ primary: true }),
  transaction_type: Column.text(),
  category: Column.text(),
  amount: Column.real(),
  description: Column.text(),
  transaction_date: Column.text(),
  created_at: Column.text(),
  updated_at: Column.text(),
})

// Export the complete schema
export const AppSchema = {
  users,
  employees,
  inventory,
  production,
  sales,
  machines,
  payroll,
  procurement,
  finance,
}
