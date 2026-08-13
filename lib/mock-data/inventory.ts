/**
 * Mock Data for Inventory Module
 */

export interface ProductCategory {
  id: string
  category_name: string
  description?: string
}

export interface Product {
  id: string
  category_id: string
  sku: string
  product_name: string
  unit_of_measure: string
  description?: string
  category_name?: string
}

export interface ProductVariant {
  id: string
  product_id: string
  variant_sku: string
  variant_name: string
  additional_price: number
  product_name?: string
  stock_status?: 'in-stock' | 'low-stock' | 'out-of-stock'
}

export interface PhysicalStock {
  id: string
  product_variant_id: string
  warehouse_location: string
  quantity: number
  last_checked_at: string
  variant_name?: string
}

export interface DigitalStock {
  id: string
  product_variant_id: string
  quantity_available: number
  quantity_allocated: number
  quantity_incoming: number
  variant_name?: string
}

// Categories
export const productCategories: ProductCategory[] = [
  { id: 'cat1', category_name: 'Fabric', description: 'Various types of fabric for garment production' },
  { id: 'cat2', category_name: 'Thread', description: 'Sewing threads in different colors' },
  { id: 'cat3', category_name: 'Buttons', description: 'Buttons in various sizes and materials' },
  { id: 'cat4', category_name: 'Zippers', description: 'Zippers for clothing' },
  { id: 'cat5', category_name: 'Labels & Tags', description: 'Brand labels, care labels, price tags' },
  { id: 'cat6', category_name: 'Packaging', description: 'Packaging materials for finished goods' },
  { id: 'cat7', category_name: 'Finished Goods', description: 'Completed garment products' },
  { id: 'cat8', category_name: 'Spare Parts', description: 'Machine spare parts and accessories' }
]

// Products
export const products: Product[] = [
  // Fabric
  { id: 'p1', category_id: 'cat1', sku: 'FAB-COT-001', product_name: 'Cotton Fabric - Plain', unit_of_measure: 'meter', category_name: 'Fabric' },
  { id: 'p2', category_id: 'cat1', sku: 'FAB-COT-002', product_name: 'Cotton Fabric - Printed', unit_of_measure: 'meter', category_name: 'Fabric' },
  { id: 'p3', category_id: 'cat1', sku: 'FAB-POL-001', product_name: 'Polyester Fabric', unit_of_measure: 'meter', category_name: 'Fabric' },
  { id: 'p4', category_id: 'cat1', sku: 'FAB-DEN-001', product_name: 'Denim Fabric', unit_of_measure: 'meter', category_name: 'Fabric' },
  { id: 'p5', category_id: 'cat1', sku: 'FAB-LIN-001', product_name: 'Linen Fabric', unit_of_measure: 'meter', category_name: 'Fabric' },
  { id: 'p6', category_id: 'cat1', sku: 'FAB-RAY-001', product_name: 'Rayon Fabric', unit_of_measure: 'meter', category_name: 'Fabric' },

  // Thread
  { id: 'p7', category_id: 'cat2', sku: 'THR-POL-001', product_name: 'Polyester Thread - Black', unit_of_measure: 'roll', category_name: 'Thread' },
  { id: 'p8', category_id: 'cat2', sku: 'THR-POL-002', product_name: 'Polyester Thread - White', unit_of_measure: 'roll', category_name: 'Thread' },
  { id: 'p9', category_id: 'cat2', sku: 'THR-COT-001', product_name: 'Cotton Thread - Assorted Colors', unit_of_measure: 'roll', category_name: 'Thread' },

  // Buttons
  { id: 'p10', category_id: 'cat3', sku: 'BTN-MET-001', product_name: 'Metal Button - Silver', unit_of_measure: 'pcs', category_name: 'Buttons' },
  { id: 'p11', category_id: 'cat3', sku: 'BTN-PLA-001', product_name: 'Plastic Button - White', unit_of_measure: 'pcs', category_name: 'Buttons' },
  { id: 'p12', category_id: 'cat3', sku: 'BTN-WOD-001', product_name: 'Wooden Button - Natural', unit_of_measure: 'pcs', category_name: 'Buttons' },

  // Zippers
  { id: 'p13', category_id: 'cat4', sku: 'ZIP-MET-001', product_name: 'Metal Zipper - Silver', unit_of_measure: 'pcs', category_name: 'Zippers' },
  { id: 'p14', category_id: 'cat4', sku: 'ZIP-NYL-001', product_name: 'Nylon Zipper - Black', unit_of_measure: 'pcs', category_name: 'Zippers' },
  { id: 'p15', category_id: 'cat4', sku: 'ZIP-NYL-002', product_name: 'Nylon Zipper - Blue', unit_of_measure: 'pcs', category_name: 'Zippers' },

  // Labels
  { id: 'p16', category_id: 'cat5', sku: 'LAB-BRN-001', product_name: 'Brand Label - Woven', unit_of_measure: 'pcs', category_name: 'Labels & Tags' },
  { id: 'p17', category_id: 'cat5', sku: 'LAB-CAR-001', product_name: 'Care Label - Printed', unit_of_measure: 'pcs', category_name: 'Labels & Tags' },
  { id: 'p18', category_id: 'cat5', sku: 'TAG-PRI-001', product_name: 'Price Tag - Blank', unit_of_measure: 'pcs', category_name: 'Labels & Tags' },

  // Packaging
  { id: 'p19', category_id: 'cat6', sku: 'PKG-PLA-001', product_name: 'Plastic Bag - Small', unit_of_measure: 'pcs', category_name: 'Packaging' },
  { id: 'p20', category_id: 'cat6', sku: 'PKG-PLA-002', product_name: 'Plastic Bag - Large', unit_of_measure: 'pcs', category_name: 'Packaging' },
  { id: 'p21', category_id: 'cat6', sku: 'PKG-BOX-001', product_name: 'Cardboard Box - Medium', unit_of_measure: 'pcs', category_name: 'Packaging' },

  // Finished Goods
  { id: 'p22', category_id: 'cat7', sku: 'FG-TSH-001', product_name: 'T-Shirt - Basic', unit_of_measure: 'pcs', category_name: 'Finished Goods' },
  { id: 'p23', category_id: 'cat7', sku: 'FG-SHT-001', product_name: 'Dress Shirt - Formal', unit_of_measure: 'pcs', category_name: 'Finished Goods' },
  { id: 'p24', category_id: 'cat7', sku: 'FG-JEA-001', product_name: 'Jeans - Classic Fit', unit_of_measure: 'pcs', category_name: 'Finished Goods' },
  { id: 'p25', category_id: 'cat7', sku: 'FG-DRE-001', product_name: 'Dress - Summer', unit_of_measure: 'pcs', category_name: 'Finished Goods' },
  { id: 'p26', category_id: 'cat7', sku: 'FG-JAC-001', product_name: 'Jacket - Denim', unit_of_measure: 'pcs', category_name: 'Finished Goods' },
  { id: 'p27', category_id: 'cat7', sku: 'FG-BLA-001', product_name: 'Blouse - Casual', unit_of_measure: 'pcs', category_name: 'Finished Goods' },
  { id: 'p28', category_id: 'cat7', sku: 'FG-SKP-001', product_name: 'Skirt - A-Line', unit_of_measure: 'pcs', category_name: 'Finished Goods' },
  { id: 'p29', category_id: 'cat7', sku: 'FG-HOD-001', product_name: 'Hoodie - Pullover', unit_of_measure: 'pcs', category_name: 'Finished Goods' },
  { id: 'p30', category_id: 'cat7', sku: 'FG-POL-001', product_name: 'Polo Shirt', unit_of_measure: 'pcs', category_name: 'Finished Goods' },

  // Spare Parts
  { id: 'p31', category_id: 'cat8', sku: 'SPT-NDL-001', product_name: 'Sewing Machine Needle', unit_of_measure: 'pcs', category_name: 'Spare Parts' },
  { id: 'p32', category_id: 'cat8', sku: 'SPT-BOB-001', product_name: 'Bobbin Case', unit_of_measure: 'pcs', category_name: 'Spare Parts' },
  { id: 'p33', category_id: 'cat8', sku: 'SPT-LGT-001', product_name: 'Machine Light Bulb', unit_of_measure: 'pcs', category_name: 'Spare Parts' },
  { id: 'p34', category_id: 'cat8', sku: 'SPT-BLT-001', product_name: 'Replacement Belt', unit_of_measure: 'pcs', category_name: 'Spare Parts' },
  { id: 'p35', category_id: 'cat8', sku: 'SPT-OIL-001', product_name: 'Machine Oil - Lubricant', unit_of_measure: 'liter', category_name: 'Spare Parts' }
]

// Product variants
export const productVariants: ProductVariant[] = []
let variantCounter = 1

products.forEach((product) => {
  const numVariants = product.category_id === 'cat7' ? 5 : 2 // More variants for finished goods
  for (let i = 0; i < numVariants; i++) {
    const variantName = product.category_id === 'cat7'
      ? ['XS', 'S', 'M', 'L', 'XL'][i]
      : product.category_id === 'cat1'
      ? ['White', 'Black', 'Blue', 'Red', 'Beige'][i % 5]
      : ['Standard', 'Premium'][i]

    const variantSku = `${product.sku}-${variantName}`.replace(/\s+/g, '-').toUpperCase()

    const quantity = Math.floor(Math.random() * 500)
    let stockStatus: ProductVariant['stock_status'] = 'in-stock'
    if (quantity === 0) stockStatus = 'out-of-stock'
    else if (quantity < 50) stockStatus = 'low-stock'

    productVariants.push({
      id: `pv-${variantCounter}`,
      product_id: product.id,
      variant_sku: variantSku,
      variant_name: variantName,
      additional_price: 0,
      product_name: product.product_name,
      stock_status: stockStatus
    })
    variantCounter++
  }
})

// Physical stocks
export const physicalStocks: PhysicalStock[] = []
productVariants.forEach((variant, idx) => {
  const quantity = variant.stock_status === 'out-of-stock' ? 0 : variant.stock_status === 'low-stock' ? 25 + Math.floor(Math.random() * 25) : 50 + Math.floor(Math.random() * 450)
  physicalStocks.push({
    id: `ps-${idx + 1}`,
    product_variant_id: variant.id,
    warehouse_location: `A-${(idx % 5) + 1}-${(idx % 10) + 1}`,
    quantity,
    last_checked_at: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    variant_name: `${variant.product_name} - ${variant.variant_name}`
  })
})

// Digital stocks
export const digitalStocks: DigitalStock[] = []
productVariants.forEach((variant, idx) => {
  const physical = physicalStocks[idx].quantity
  const allocated = Math.floor(Math.random() * (physical * 0.3))
  const incoming = Math.floor(Math.random() * 200)
  digitalStocks.push({
    id: `ds-${idx + 1}`,
    product_variant_id: variant.id,
    quantity_available: physical - allocated,
    quantity_allocated: allocated,
    quantity_incoming: incoming,
    variant_name: `${variant.product_name} - ${variant.variant_name}`
  })
})

// Statistics helpers
export const getInventoryStats = () => {
  const lowStock = productVariants.filter(v => v.stock_status === 'low-stock').length
  const outOfStock = productVariants.filter(v => v.stock_status === 'out-of-stock').length
  const totalPhysicalStock = physicalStocks.reduce((sum, ps) => sum + ps.quantity, 0)
  const totalAvailable = digitalStocks.reduce((sum, ds) => sum + ds.quantity_available, 0)
  const totalAllocated = digitalStocks.reduce((sum, ds) => sum + ds.quantity_allocated, 0)
  const totalIncoming = digitalStocks.reduce((sum, ds) => sum + ds.quantity_incoming, 0)

  return {
    totalProducts: products.length,
    totalVariants: productVariants.length,
    totalCategories: productCategories.length,
    lowStockItems: lowStock,
    outOfStockItems: outOfStock,
    totalPhysicalStock,
    totalAvailable,
    totalAllocated,
    totalIncoming
  }
}
