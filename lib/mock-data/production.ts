/**
 * Mock Data for Production Module
 */

export interface BillOfMaterial {
  id: string
  parent_product_variant_id: string
  component_product_variant_id: string
  quantity_required: number
  parent_name?: string
  component_name?: string
}

export interface ProductionStage {
  id: string
  stage_name: string
  stage_sequence: number
  estimated_duration_minutes: number
}

export interface WorkOrder {
  id: string
  wo_number: string
  product_variant_id: string
  quantity_target: number
  quantity_produced: number
  start_date: string
  end_date?: string
  status: 'draft' | 'released' | 'in_progress' | 'paused' | 'completed' | 'cancelled'
  product_name?: string
  variant_name?: string
  progress?: number
}

// BOMs
export const boms: BillOfMaterial[] = [
  // T-Shirt Basic
  { id: 'bom-1', parent_product_variant_id: 'pv-22', component_product_variant_id: 'pv-1', quantity_required: 1.5, parent_name: 'T-Shirt - Basic', component_name: 'Cotton Fabric - Plain' },
  { id: 'bom-2', parent_product_variant_id: 'pv-22', component_product_variant_id: 'pv-7', quantity_required: 0.2, parent_name: 'T-Shirt - Basic', component_name: 'Polyester Thread - Black' },
  { id: 'bom-3', parent_product_variant_id: 'pv-22', component_product_variant_id: 'pv-10', quantity_required: 3, parent_name: 'T-Shirt - Basic', component_name: 'Metal Button - Silver' },
  { id: 'bom-4', parent_product_variant_id: 'pv-22', component_product_variant_id: 'pv-16', quantity_required: 1, parent_name: 'T-Shirt - Basic', component_name: 'Brand Label - Woven' },
  { id: 'bom-5', parent_product_variant_id: 'pv-22', component_product_variant_id: 'pv-19', quantity_required: 1, parent_name: 'T-Shirt - Basic', component_name: 'Plastic Bag - Small' },

  // Dress Shirt
  { id: 'bom-6', parent_product_variant_id: 'pv-23', component_product_variant_id: 'pv-1', quantity_required: 2.0, parent_name: 'Dress Shirt - Formal', component_name: 'Cotton Fabric - Plain' },
  { id: 'bom-7', parent_product_variant_id: 'pv-23', component_product_variant_id: 'pv-8', quantity_required: 0.3, parent_name: 'Dress Shirt - Formal', component_name: 'Polyester Thread - White' },
  { id: 'bom-8', parent_product_variant_id: 'pv-23', component_product_variant_id: 'pv-11', quantity_required: 7, parent_name: 'Dress Shirt - Formal', component_name: 'Plastic Button - White' },
  { id: 'bom-9', parent_product_variant_id: 'pv-23', component_product_variant_id: 'pv-13', quantity_required: 1, parent_name: 'Dress Shirt - Formal', component_name: 'Metal Zipper - Silver' },

  // Jeans
  { id: 'bom-10', parent_product_variant_id: 'pv-24', component_product_variant_id: 'pv-4', quantity_required: 2.5, parent_name: 'Jeans - Classic Fit', component_name: 'Denim Fabric' },
  { id: 'bom-11', parent_product_variant_id: 'pv-24', component_product_variant_id: 'pv-7', quantity_required: 0.4, parent_name: 'Jeans - Classic Fit', component_name: 'Polyester Thread - Black' },
  { id: 'bom-12', parent_product_variant_id: 'pv-24', component_product_variant_id: 'pv-14', quantity_required: 1, parent_name: 'Jeans - Classic Fit', component_name: 'Nylon Zipper - Black' },
  { id: 'bom-13', parent_product_variant_id: 'pv-24', component_product_variant_id: 'pv-10', quantity_required: 1, parent_name: 'Jeans - Classic Fit', component_name: 'Metal Button - Silver' },

  // Dress Summer
  { id: 'bom-14', parent_product_variant_id: 'pv-25', component_product_variant_id: 'pv-6', quantity_required: 2.2, parent_name: 'Dress - Summer', component_name: 'Rayon Fabric' },
  { id: 'bom-15', parent_product_variant_id: 'pv-25', component_product_variant_id: 'pv-8', quantity_required: 0.25, parent_name: 'Dress - Summer', component_name: 'Polyester Thread - White' },
  { id: 'bom-16', parent_product_variant_id: 'pv-25', component_product_variant_id: 'pv-17', quantity_required: 1, parent_name: 'Dress - Summer', component_name: 'Care Label - Printed' },
]

// Production Stages
export const productionStages: ProductionStage[] = [
  { id: 'ps-1', stage_name: 'Cutting', stage_sequence: 1, estimated_duration_minutes: 45 },
  { id: 'ps-2', stage_name: 'Sewing', stage_sequence: 2, estimated_duration_minutes: 120 },
  { id: 'ps-3', stage_name: 'Assembly', stage_sequence: 3, estimated_duration_minutes: 60 },
  { id: 'ps-4', stage_name: 'Finishing', stage_sequence: 4, estimated_duration_minutes: 30 },
  { id: 'ps-5', stage_name: 'Quality Check', stage_sequence: 5, estimated_duration_minutes: 20 },
  { id: 'ps-6', stage_name: 'Packaging', stage_sequence: 6, estimated_duration_minutes: 15 }
]

// Generate Work Orders
const today = new Date()
const currentYear = today.getFullYear()
const currentMonth = today.getMonth()

export const workOrders: WorkOrder[] = []
let woCounter = 1

const products = [
  { id: 'pv-22', name: 'T-Shirt - Basic', variants: ['XS', 'S', 'M', 'L', 'XL'] },
  { id: 'pv-23', name: 'Dress Shirt - Formal', variants: ['S', 'M', 'L', 'XL'] },
  { id: 'pv-24', name: 'Jeans - Classic Fit', variants: ['28', '30', '32', '34', '36'] },
  { id: 'pv-25', name: 'Dress - Summer', variants: ['S', 'M', 'L'] },
  { id: 'pv-26', name: 'Jacket - Denim', variants: ['S', 'M', 'L', 'XL'] }
]

// Generate WOs for current month
for (let i = 0; i < 20; i++) {
  const product = products[Math.floor(Math.random() * products.length)]
  const variant = product.variants[Math.floor(Math.random() * product.variants.length)]

  const day = 1 + Math.floor(Math.random() * today.getDate())
  const startDate = new Date(currentYear, currentMonth, day)
  const woNumber = `WO-${currentYear}${String(currentMonth + 1).padStart(2, '0')}-${String(woCounter).padStart(4, '0')}`

  const quantityTarget = 50 + Math.floor(Math.random() * 450)
  const statusOptions: WorkOrder['status'][] = ['draft', 'released', 'in_progress', 'in_progress', 'paused', 'completed', 'completed', 'cancelled']
  const status = statusOptions[Math.floor(Math.random() * statusOptions.length)]

  let quantityProduced = 0
  let progress = 0

  if (status === 'completed') {
    quantityProduced = quantityTarget
    progress = 100
  } else if (status === 'in_progress' || status === 'paused') {
    progress = 20 + Math.floor(Math.random() * 60)
    quantityProduced = Math.floor((progress / 100) * quantityTarget)
  }

  const endDate = status === 'completed' || status === 'paused'
    ? new Date(currentYear, currentMonth, day + Math.floor(Math.random() * 7)).toISOString().split('T')[0]
    : undefined

  workOrders.push({
    id: `wo-${woCounter}`,
    wo_number: woNumber,
    product_variant_id: product.id,
    quantity_target: quantityTarget,
    quantity_produced: quantityProduced,
    start_date: startDate.toISOString().split('T')[0],
    end_date: endDate,
    status,
    product_name: product.name,
    variant_name: variant,
    progress
  })
  woCounter++
}

// Sort by date
workOrders.sort((a, b) => new Date(b.start_date).getTime() - new Date(a.start_date).getTime())

export const getProductionStats = () => {
  const currentMonthWOs = workOrders.filter(wo => {
    const woDate = new Date(wo.start_date)
    return woDate.getMonth() === currentMonth && woDate.getFullYear() === currentYear
  })

  const activeWOs = currentMonthWOs.filter(wo => wo.status === 'released' || wo.status === 'in_progress').length
  const completedWOs = currentMonthWOs.filter(wo => wo.status === 'completed').length

  const totalTarget = currentMonthWOs.reduce((sum, wo) => sum + wo.quantity_target, 0)
  const totalProduced = currentMonthWOs.reduce((sum, wo) => sum + wo.quantity_produced, 0)

  return {
    totalWOs: currentMonthWOs.length,
    activeWOs,
    completedWOs,
    totalTarget,
    totalProduced,
    productionRate: totalTarget > 0 ? Math.round((totalProduced / totalTarget) * 100) : 0
  }
}
