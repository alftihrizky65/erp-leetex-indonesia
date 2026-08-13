/**
 * Mock Data for Procurement Module
 */

export interface Supplier {
  id: string
  supplier_name: string
  contact_person: string
  email?: string
  phone: string
  address: string
  total_pos?: number
}

export interface PurchaseOrder {
  id: string
  supplier_id: string
  po_number: string
  po_date: string
  estimated_delivery?: string
  total_amount: number
  status: 'draft' | 'ordered' | 'partially_received' | 'received' | 'cancelled'
  supplier_name?: string
  items_count?: number
}

export interface GoodsReceipt {
  id: string
  purchase_order_id: string
  receipt_number: string
  received_date: string
  received_by: string
  po_number?: string
  supplier_name?: string
  items_count?: number
}

export interface COGS {
  id: string
  product_variant_id: string
  calculation_date: string
  raw_material_cost: number
  labor_cost: number
  overhead_cost: number
  hpp_total: number
  inflation_rate: number
  product_name?: string
  variant_name?: string
}

// Suppliers
export const suppliers: Supplier[] = [
  {
    id: 's1',
    supplier_name: 'PT Texmaco Indonesia',
    contact_person: 'Bambang Sutrisno',
    email: 'bambang@texmaco.co.id',
    phone: '021-1234-5678',
    address: 'Jl. Industri No. 10, Cikarang, Indonesia',
    total_pos: 12
  },
  {
    id: 's2',
    supplier_name: 'CV Benang Jaya',
    contact_person: 'Sri Wahyuni',
    email: 'sri@benangjaya.com',
    phone: '022-8765-4321',
    address: 'Jl. Textil No. 25, Bandung, Indonesia',
    total_pos: 8
  },
  {
    id: 's3',
    supplier_name: 'PT Indo Button',
    contact_person: 'Hendro Lie',
    email: 'hendro@indobutton.co.id',
    phone: '031-5432-1098',
    address: 'Jl. Perak Timur No. 15, Surabaya, Indonesia',
    total_pos: 15
  },
  {
    id: 's4',
    supplier_name: 'Shanghai Fabric Export',
    contact_person: 'Li Wei',
    email: 'liwei@shanghaifabric.cn',
    phone: '+86-21-1234-5678',
    address: 'Nanjing Road 500, Shanghai, China',
    total_pos: 10
  },
  {
    id: 's5',
    supplier_name: 'Thai Textile Supplies',
    contact_person: 'Somchai Wong',
    email: 'somchai@thaitextile.co.th',
    phone: '+66-2-345-6789',
    address: 'Silom Road 200, Bangkok, Thailand',
    total_pos: 6
  },
  {
    id: 's6',
    supplier_name: 'Packaging Bros',
    contact_person: 'Ahmad Fikri',
    email: 'ahmad@packagingbros.co.id',
    phone: '024-7654-3210',
    address: 'Jl. Kemasan No. 5, Semarang, Indonesia',
    total_pos: 20
  },
  {
    id: 's7',
    supplier_name: 'Label King',
    contact_person: 'Dian Pratama',
    email: 'dian@labelking.com',
    phone: '0274-9876-5432',
    address: 'Jl. Sablon No. 12, Yogyakarta, Indonesia',
    total_pos: 9
  },
  {
    id: 's8',
    supplier_name: 'Zip World Indonesia',
    contact_person: 'Rini Marlina',
    email: 'rini@zipworld.co.id',
    phone: '0361-234-567',
    address: 'Jl. Raya Denpasar No. 100, Bali, Indonesia',
    total_pos: 7
  }
]

// Generate purchase orders
const today = new Date()
const currentYear = today.getFullYear()
const currentMonth = today.getMonth()

export const purchaseOrders: PurchaseOrder[] = []
let poCounter = 1

suppliers.forEach((supplier) => {
  const numPOs = 1 + Math.floor(Math.random() * 3)
  for (let i = 0; i < numPOs; i++) {
    const day = 1 + Math.floor(Math.random() * today.getDate())
    const poDate = new Date(currentYear, currentMonth, day)
    const poNumber = `PO-${currentYear}${String(currentMonth + 1).padStart(2, '0')}-${String(poCounter).padStart(4, '0')}`

    const statusOptions: PurchaseOrder['status'][] = ['draft', 'ordered', 'ordered', 'partially_received', 'received', 'cancelled']
    const status = statusOptions[Math.floor(Math.random() * statusOptions.length)]

    const totalAmount = 1000000 + Math.floor(Math.random() * 15000000) // 1M - 16M IDR

    purchaseOrders.push({
      id: `po-${poCounter}`,
      supplier_id: supplier.id,
      po_number: poNumber,
      po_date: poDate.toISOString().split('T')[0],
      estimated_delivery: new Date(currentYear, currentMonth, day + 14).toISOString().split('T')[0],
      total_amount: totalAmount,
      status,
      supplier_name: supplier.supplier_name,
      items_count: 2 + Math.floor(Math.random() * 8)
    })
    poCounter++
  }
})

// Sort by date
purchaseOrders.sort((a, b) => new Date(b.po_date).getTime() - new Date(a.po_date).getTime())

// Generate goods receipts
export const goodsReceipts: GoodsReceipt[] = []
let receiptCounter = 1

purchaseOrders.filter(po => po.status === 'received' || po.status === 'partially_received').forEach((po) => {
  const day = 5 + Math.floor(Math.random() * 10)
  const receiptDate = new Date(currentYear, currentMonth, day)
  const receiptNumber = `RC-${currentYear}${String(currentMonth + 1).padStart(2, '0')}-${String(receiptCounter).padStart(4, '0')}`

  goodsReceipts.push({
    id: `gr-${receiptCounter}`,
    purchase_order_id: po.id,
    receipt_number: receiptNumber,
    received_date: receiptDate.toISOString().split('T')[0],
    received_by: 'Dewi Lestari',
    po_number: po.po_number,
    supplier_name: po.supplier_name,
    items_count: po.items_count
  })
  receiptCounter++
})

// Generate COGS records
export const cogsRecords: COGS[] = []
const productVariants = [
  { name: 'T-Shirt - Basic', variants: ['XS', 'S', 'M', 'L', 'XL'] },
  { name: 'Dress Shirt - Formal', variants: ['S', 'M', 'L', 'XL'] },
  { name: 'Jeans - Classic Fit', variants: ['28', '30', '32', '34', '36'] }
]

let cogsCounter = 1
for (let monthOffset = -6; monthOffset <= 0; monthOffset++) {
  const targetMonth = new Date(today.getFullYear(), today.getMonth() + monthOffset, 1)
  const monthStr = `${targetMonth.getFullYear()}-${String(targetMonth.getMonth() + 1).padStart(2, '0')}`

  productVariants.forEach((product) => {
    product.variants.forEach((variant) => {
      const rawCost = 25000 + Math.floor(Math.random() * 50000)
      const laborCost = 15000 + Math.floor(Math.random() * 25000)
      const overheadCost = 10000 + Math.floor(Math.random() * 15000)
      const hppTotal = rawCost + laborCost + overheadCost

      // Calculate inflation rate (just mock calculation)
      const prevHpp = hppTotal * (0.95 + Math.random() * 0.1)
      const inflationRate = ((hppTotal - prevHpp) / prevHpp) * 100

      cogsRecords.push({
        id: `cogs-${cogsCounter++}`,
        product_variant_id: `pv-${cogsCounter}`,
        calculation_date: monthStr,
        raw_material_cost: rawCost,
        labor_cost: laborCost,
        overhead_cost: overheadCost,
        hpp_total: hppTotal,
        inflation_rate: Math.round(inflationRate * 100) / 100,
        product_name: product.name,
        variant_name: variant
      })
    })
  })
}

export const getProcurementStats = () => {
  const currentMonthPOs = purchaseOrders.filter(po => {
    const poDate = new Date(po.po_date)
    return poDate.getMonth() === currentMonth && poDate.getFullYear() === currentYear
  })

  const pendingPOs = currentMonthPOs.filter(po => po.status === 'ordered' || po.status === 'partially_received')
  const pendingAmount = pendingPOs.reduce((sum, po) => sum + po.total_amount, 0)

  const receivedPOs = currentMonthPOs.filter(po => po.status === 'received').length

  return {
    totalPOs: currentMonthPOs.length,
    pendingPOs: pendingPOs.length,
    receivedPOs,
    pendingAmount,
    totalSuppliers: suppliers.length
  }
}
