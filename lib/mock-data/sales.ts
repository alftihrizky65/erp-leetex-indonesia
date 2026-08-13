/**
 * Mock Data for Sales Module
 */

export interface Customer {
  id: string
  customer_name: string
  company_name?: string
  email?: string
  phone: string
  address: string
  total_orders: number
}

export interface SalesOrder {
  id: string
  customer_id: string
  order_number: string
  order_date: string
  total_amount: number
  status: 'draft' | 'pending' | 'processing' | 'shipped' | 'completed' | 'cancelled'
  customer_name?: string
  items_count?: number
}

export interface SalesOrderDetail {
  id: string
  sales_order_id: string
  product_variant_id: string
  quantity: number
  unit_price: number
  subtotal: number
  product_name?: string
  variant_name?: string
}

// Customers
export const customers: Customer[] = [
  {
    id: 'c1',
    customer_name: 'John Smith',
    company_name: 'Fashion Retail USA',
    email: 'john@fashionretail.com',
    phone: '+1-234-567-8900',
    address: '123 Fashion Ave, New York, USA',
    total_orders: 12
  },
  {
    id: 'c2',
    customer_name: 'Maria Garcia',
    company_name: 'Moda Europa SL',
    email: 'maria@modaeuropa.es',
    phone: '+34-123-456-789',
    address: 'Calle de la Moda 45, Madrid, Spain',
    total_orders: 8
  },
  {
    id: 'c3',
    customer_name: 'Yuki Tanaka',
    company_name: 'Tokyo Fashion Co.',
    email: 'yuki@tokyofashion.jp',
    phone: '+81-90-1234-5678',
    address: 'Shibuya 1-2-3, Tokyo, Japan',
    total_orders: 15
  },
  {
    id: 'c4',
    customer_name: 'Ahmed Hassan',
    company_name: 'Gulf Trading LLC',
    email: 'ahmed@gulftrading.ae',
    phone: '+971-50-123-4567',
    address: 'Dubai Mall Office, Dubai, UAE',
    total_orders: 6
  },
  {
    id: 'c5',
    customer_name: 'Sarah Johnson',
    company_name: 'Style Australia Pty',
    email: 'sarah@styleaustralia.com.au',
    phone: '+61-2-9876-5432',
    address: '100 George St, Sydney, Australia',
    total_orders: 10
  },
  {
    id: 'c6',
    customer_name: 'Chen Wei',
    company_name: 'Shanghai Textile Inc.',
    email: 'chen@shanghaitextile.cn',
    phone: '+86-138-0000-0000',
    address: 'Nanjing Road 123, Shanghai, China',
    total_orders: 20
  },
  {
    id: 'c7',
    customer_name: 'Hans Mueller',
    company_name: 'Berlin Fashion GmbH',
    email: 'hans@berlin-fashion.de',
    phone: '+49-30-1234567',
    address: 'Kurfürstendamm 100, Berlin, Germany',
    total_orders: 9
  },
  {
    id: 'c8',
    customer_name: 'Priya Sharma',
    company_name: 'Mumbai Exports Ltd',
    email: 'priya@mumbaiexports.in',
    phone: '+91-98765-43210',
    address: 'Appolo Bunder, Mumbai, India',
    total_orders: 14
  },
  {
    id: 'c9',
    customer_name: 'Jean Dupont',
    company_name: 'Paris Mode SA',
    email: 'jean@parismode.fr',
    phone: '+33-1-42-86-87-88',
    address: 'Champs-Élysées 75, Paris, France',
    total_orders: 11
  },
  {
    id: 'c10',
    customer_name: 'Roberto Silva',
    company_name: 'São Paulo Textiles',
    email: 'roberto@sp textiles.br',
    phone: '+55-11-99999-9999',
    address: 'Av. Paulista 1000, São Paulo, Brazil',
    total_orders: 7
  },
  {
    id: 'c11',
    customer_name: 'Local Customer - Batik Indonesia',
    company_name: 'Batik Indonesia',
    email: 'info@batikindonesia.co.id',
    phone: '021-1234-5678',
    address: 'Jl. Thamrin No. 1, Jakarta, Indonesia',
    total_orders: 25
  },
  {
    id: 'c12',
    customer_name: 'Siti Nurhaliza',
    company_name: 'Malaysian Garments',
    email: 'siti@malaysiangerments.com.my',
    phone: '+60-3-1234-5678',
    address: 'KLCC Tower, Kuala Lumpur, Malaysia',
    total_orders: 5
  },
  {
    id: 'c13',
    customer_name: 'David Kim',
    company_name: 'Seoul Fashion Inc.',
    email: 'david@seoul fashion.kr',
    phone: '+82-2-1234-5678',
    address: 'Gangnam-gu, Seoul, South Korea',
    total_orders: 13
  },
  {
    id: 'c14',
    customer_name: 'Anna Kowalski',
    company_name: 'Warsaw Textile',
    email: 'anna@warsawtextile.pl',
    phone: '+48-22-123-45-67',
    address: 'Nowy Świat 50, Warsaw, Poland',
    total_orders: 4
  },
  {
    id: 'c15',
    customer_name: 'Local Retail - Toko Baju',
    company_name: 'Toko Baju Baru',
    email: 'tokobajubaru@gmail.com',
    phone: '022-8765-4321',
    address: 'Jl. Cihampelas No. 50, Bandung, Indonesia',
    total_orders: 18
  }
]

// Generate sales orders for current month
const today = new Date()
const currentYear = today.getFullYear()
const currentMonth = today.getMonth()

export const salesOrders: SalesOrder[] = []
let orderCounter = 1

customers.forEach((customer) => {
  const numOrders = 1 + Math.floor(Math.random() * 4)
  for (let i = 0; i < numOrders; i++) {
    const day = 1 + Math.floor(Math.random() * today.getDate())
    const orderDate = new Date(currentYear, currentMonth, day)
    const orderNumber = `SO-${currentYear}${String(currentMonth + 1).padStart(2, '0')}-${String(orderCounter).padStart(4, '0')}`

    const statusOptions: SalesOrder['status'][] = ['pending', 'processing', 'shipped', 'completed', 'completed', 'completed', 'cancelled']
    const status = statusOptions[Math.floor(Math.random() * statusOptions.length)]

    const totalAmount = 1000 + Math.floor(Math.random() * 24000)

    salesOrders.push({
      id: `so-${orderCounter}`,
      customer_id: customer.id,
      order_number: orderNumber,
      order_date: orderDate.toISOString().split('T')[0],
      total_amount: totalAmount,
      status,
      customer_name: customer.customer_name,
      items_count: 1 + Math.floor(Math.random() * 5)
    })
    orderCounter++
  }
})

// Sort by date descending
salesOrders.sort((a, b) => new Date(b.order_date).getTime() - new Date(a.order_date).getTime())

// Sales order details (mock)
export const salesOrderDetails: SalesOrderDetail[] = []

// Statistics helpers
export const getSalesStats = () => {
  const currentMonthOrders = salesOrders.filter(so => {
    const soDate = new Date(so.order_date)
    return soDate.getMonth() === currentMonth && soDate.getFullYear() === currentYear
  })

  const pendingAmount = currentMonthOrders
    .filter(so => so.status === 'pending' || so.status === 'processing')
    .reduce((sum, so) => sum + so.total_amount, 0)

  const completedAmount = currentMonthOrders
    .filter(so => so.status === 'completed')
    .reduce((sum, so) => sum + so.total_amount, 0)

  return {
    totalOrders: currentMonthOrders.length,
    pendingOrders: currentMonthOrders.filter(so => so.status === 'pending' || so.status === 'processing').length,
    completedOrders: currentMonthOrders.filter(so => so.status === 'completed').length,
    pendingAmount,
    completedAmount,
    totalCustomers: customers.length
  }
}
