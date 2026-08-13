export interface BOMComponent {
  id: string
  materialId: string
  materialCode: string
  materialName: string
  quantity: number
  unit: string
}

export interface BOM {
  id: string
  code: string
  parentProductId: string
  parentProductCode: string
  parentProductName: string
  components: BOMComponent[]
  totalComponents: number
  version: number
  status: 'draft' | 'active' | 'deprecated'
  lastUpdated: string
  createdAt: string
}

// Mock finished goods (parent products)
export const mockFinishedGoods = [
  { id: 'FG001', code: 'FG-001', name: 'Men\'s Cotton T-Shirt' },
  { id: 'FG002', code: 'FG-002', name: 'Women\'s Blouse' },
  { id: 'FG003', code: 'FG-003', name: 'Polo Shirt' },
  { id: 'FG004', code: 'FG-004', name: 'Long Sleeve Shirt' },
  { id: 'FG005', code: 'FG-005', name: 'Kids T-Shirt' },
]

// Mock raw materials
export const mockRawMaterials = [
  { id: 'RM001', code: 'RM-COT-WHT', name: 'Cotton Fabric White', unit: 'meter' },
  { id: 'RM002', code: 'RM-COT-BLK', name: 'Cotton Fabric Black', unit: 'meter' },
  { id: 'RM003', code: 'RM-COT-BLU', name: 'Cotton Fabric Blue', unit: 'meter' },
  { id: 'RM004', code: 'RM-THR-WHT', name: 'White Thread', unit: 'spool' },
  { id: 'RM005', code: 'RM-THR-BLK', name: 'Black Thread', unit: 'spool' },
  { id: 'RM006', code: 'RM-THR-BLU', name: 'Blue Thread', unit: 'spool' },
  { id: 'RM007', code: 'RM-BTN-RND', name: 'Round Buttons', unit: 'piece' },
  { id: 'RM008', code: 'RM-BTN-SQR', name: 'Square Buttons', unit: 'piece' },
  { id: 'RM009', code: 'RM-LBL-SML', name: 'Small Labels', unit: 'piece' },
  { id: 'RM010', code: 'RM-LBL-LRG', name: 'Large Labels', unit: 'piece' },
  { id: 'RM011', code: 'RM-PKG-PLS', name: 'Plastic Packaging', unit: 'piece' },
  { id: 'RM012', code: 'RM-INT-LIN', name: 'Lining Fabric', unit: 'meter' },
]

// Mock BOM data
export const mockBOMs: BOM[] = [
  {
    id: '1',
    code: 'BOM-202401-0001',
    parentProductId: 'FG001',
    parentProductCode: 'FG-001',
    parentProductName: 'Men\'s Cotton T-Shirt',
    components: [
      {
        id: 'c1',
        materialId: 'RM001',
        materialCode: 'RM-COT-WHT',
        materialName: 'Cotton Fabric White',
        quantity: 1.5,
        unit: 'meter',
      },
      {
        id: 'c2',
        materialId: 'RM004',
        materialCode: 'RM-THR-WHT',
        materialName: 'White Thread',
        quantity: 1,
        unit: 'spool',
      },
      {
        id: 'c3',
        materialId: 'RM009',
        materialCode: 'RM-LBL-SML',
        materialName: 'Small Labels',
        quantity: 1,
        unit: 'piece',
      },
      {
        id: 'c4',
        materialId: 'RM011',
        materialCode: 'RM-PKG-PLS',
        materialName: 'Plastic Packaging',
        quantity: 1,
        unit: 'piece',
      },
    ],
    totalComponents: 4,
    version: 1,
    status: 'active',
    lastUpdated: '2024-01-20',
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    code: 'BOM-202402-0002',
    parentProductId: 'FG002',
    parentProductCode: 'FG-002',
    parentProductName: 'Women\'s Blouse',
    components: [
      {
        id: 'c5',
        materialId: 'RM002',
        materialCode: 'RM-COT-BLK',
        materialName: 'Cotton Fabric Black',
        quantity: 2.0,
        unit: 'meter',
      },
      {
        id: 'c6',
        materialId: 'RM005',
        materialCode: 'RM-THR-BLK',
        materialName: 'Black Thread',
        quantity: 2,
        unit: 'spool',
      },
      {
        id: 'c7',
        materialId: 'RM007',
        materialCode: 'RM-BTN-RND',
        materialName: 'Round Buttons',
        quantity: 5,
        unit: 'piece',
      },
      {
        id: 'c8',
        materialId: 'RM009',
        materialCode: 'RM-LBL-SML',
        materialName: 'Small Labels',
        quantity: 1,
        unit: 'piece',
      },
      {
        id: 'c9',
        materialId: 'RM012',
        materialCode: 'RM-INT-LIN',
        materialName: 'Lining Fabric',
        quantity: 1.5,
        unit: 'meter',
      },
    ],
    totalComponents: 5,
    version: 2,
    status: 'active',
    lastUpdated: '2024-02-18',
    createdAt: '2024-02-10',
  },
  {
    id: '3',
    code: 'BOM-202403-0003',
    parentProductId: 'FG003',
    parentProductCode: 'FG-003',
    parentProductName: 'Polo Shirt',
    components: [
      {
        id: 'c10',
        materialId: 'RM003',
        materialCode: 'RM-COT-BLU',
        materialName: 'Cotton Fabric Blue',
        quantity: 1.8,
        unit: 'meter',
      },
      {
        id: 'c11',
        materialId: 'RM006',
        materialCode: 'RM-THR-BLU',
        materialName: 'Blue Thread',
        quantity: 1,
        unit: 'spool',
      },
      {
        id: 'c12',
        materialId: 'RM008',
        materialCode: 'RM-BTN-SQR',
        materialName: 'Square Buttons',
        quantity: 3,
        unit: 'piece',
      },
      {
        id: 'c13',
        materialId: 'RM009',
        materialCode: 'RM-LBL-SML',
        materialName: 'Small Labels',
        quantity: 1,
        unit: 'piece',
      },
    ],
    totalComponents: 4,
    version: 1,
    status: 'active',
    lastUpdated: '2024-03-15',
    createdAt: '2024-03-08',
  },
  {
    id: '4',
    code: 'BOM-202404-0004',
    parentProductId: 'FG004',
    parentProductCode: 'FG-004',
    parentProductName: 'Long Sleeve Shirt',
    components: [
      {
        id: 'c14',
        materialId: 'RM001',
        materialCode: 'RM-COT-WHT',
        materialName: 'Cotton Fabric White',
        quantity: 2.5,
        unit: 'meter',
      },
      {
        id: 'c15',
        materialId: 'RM004',
        materialCode: 'RM-THR-WHT',
        materialName: 'White Thread',
        quantity: 2,
        unit: 'spool',
      },
      {
        id: 'c16',
        materialId: 'RM007',
        materialCode: 'RM-BTN-RND',
        materialName: 'Round Buttons',
        quantity: 7,
        unit: 'piece',
      },
      {
        id: 'c17',
        materialId: 'RM010',
        materialCode: 'RM-LBL-LRG',
        materialName: 'Large Labels',
        quantity: 1,
        unit: 'piece',
      },
      {
        id: 'c18',
        materialId: 'RM012',
        materialCode: 'RM-INT-LIN',
        materialName: 'Lining Fabric',
        quantity: 2.0,
        unit: 'meter',
      },
    ],
    totalComponents: 5,
    version: 1,
    status: 'draft',
    lastUpdated: '2024-04-10',
    createdAt: '2024-04-05',
  },
  {
    id: '5',
    code: 'BOM-202405-0005',
    parentProductId: 'FG005',
    parentProductCode: 'FG-005',
    parentProductName: 'Kids T-Shirt',
    components: [
      {
        id: 'c19',
        materialId: 'RM003',
        materialCode: 'RM-COT-BLU',
        materialName: 'Cotton Fabric Blue',
        quantity: 0.8,
        unit: 'meter',
      },
      {
        id: 'c20',
        materialId: 'RM006',
        materialCode: 'RM-THR-BLU',
        materialName: 'Blue Thread',
        quantity: 1,
        unit: 'spool',
      },
      {
        id: 'c21',
        materialId: 'RM009',
        materialCode: 'RM-LBL-SML',
        materialName: 'Small Labels',
        quantity: 1,
        unit: 'piece',
      },
    ],
    totalComponents: 3,
    version: 1,
    status: 'active',
    lastUpdated: '2024-05-12',
    createdAt: '2024-05-08',
  },
]

// Helper function to generate BOM code
export function generateBOMCode(): string {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')

  const monthPrefix = `BOM-${year}${month}`
  const existingCodes = mockBOMs
    .filter(bom => bom.code.startsWith(monthPrefix))
    .map(bom => parseInt(bom.code.split('-')[2]))

  const nextSeq = existingCodes.length > 0
    ? Math.max(...existingCodes) + 1
    : 1

  return `${monthPrefix}-${String(nextSeq).padStart(4, '0')}`
}
