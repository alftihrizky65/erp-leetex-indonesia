export interface Supplier {
  id: string
  code: string
  name: string
  contactPerson: string
  email: string
  phone: string
  address: string
  totalPOs: number
  status: 'active' | 'inactive'
  createdAt: string
}

// Mock supplier data
export const mockSuppliers: Supplier[] = [
  {
    id: '1',
    code: 'SUP-202401-0001',
    name: 'PT Tekstil Maju Jaya',
    contactPerson: 'Bambang Sutrisno',
    email: 'bambang@tekstilmajujaya.co.id',
    phone: '+62 21 5555 1234',
    address: 'Jl. Industri No. 45, Cikarang, Jawa Barat',
    totalPOs: 15,
    status: 'active',
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    code: 'SUP-202402-0002',
    name: 'CV Benang Berkah',
    contactPerson: 'Sri Wahyuni',
    email: 'sri@benangberkah.com',
    phone: '+62 22 4567 8901',
    address: 'Jl. Textile No. 12, Bandung, Jawa Barat',
    totalPOs: 8,
    status: 'active',
    createdAt: '2024-02-20',
  },
  {
    id: '3',
    code: 'SUP-202403-0003',
    name: 'PT Garment Supplies Indonesia',
    contactPerson: 'Robert Wijaya',
    email: 'robert@garmentsupplies.id',
    phone: '+62 31 3456 7890',
    address: 'Jl. Raya Surabaya No. 78, Surabaya, Jawa Timur',
    totalPOs: 22,
    status: 'active',
    createdAt: '2024-03-10',
  },
  {
    id: '4',
    code: 'SUP-202404-0004',
    name: 'UD Bahan Kain Sejahtera',
    contactPerson: 'Hendra Kusuma',
    email: 'hendra@bahankain.com',
    phone: '+62 24 2345 6789',
    address: 'Jl. Solo No. 56, Solo, Jawa Tengah',
    totalPOs: 12,
    status: 'active',
    createdAt: '2024-04-05',
  },
  {
    id: '5',
    code: 'SUP-202405-0005',
    name: 'PT Tekstil Global Nusantara',
    contactPerson: 'Dian Permata',
    email: 'dian@tekstilglobal.co.id',
    phone: '+62 274 3456 7890',
    address: 'Jl. Magelang No. 34, Yogyakarta',
    totalPOs: 5,
    status: 'active',
    createdAt: '2024-05-12',
  },
  {
    id: '6',
    code: 'SUP-202406-0006',
    name: 'CV Kreatif Tekstil',
    contactPerson: 'Agus Prasetyo',
    email: 'agus@kreatiftekstil.com',
    phone: '+62 61 4567 8901',
    address: 'Jl. Gatot Subroto No. 90, Medan, Sumatera Utara',
    totalPOs: 18,
    status: 'active',
    createdAt: '2024-06-18',
  },
  {
    id: '7',
    code: 'SUP-202407-0007',
    name: 'PT Indotex Supplies',
    contactPerson: 'Maya Sari',
    email: 'maya@indotex.co.id',
    phone: '+62 511 2345 6789',
    address: 'Jl. Pemuda No. 23, Banjarmasin, Kalimantan Selatan',
    totalPOs: 9,
    status: 'inactive',
    createdAt: '2024-07-22',
  },
  {
    id: '8',
    code: 'SUP-202408-0008',
    name: 'UD Material Prima',
    contactPerson: 'Doni Handoko',
    email: 'doni@materialprima.com',
    phone: '+62 711 3456 7890',
    address: 'Jl. Sudirman No. 67, Palembang, Sumatera Selatan',
    totalPOs: 14,
    status: 'active',
    createdAt: '2024-08-01',
  },
]

// Helper function to generate supplier code
export function generateSupplierCode(): string {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')

  // Get the last supplier code for this month
  const monthPrefix = `SUP-${year}${month}`
  const existingCodes = mockSuppliers
    .filter(sup => sup.code.startsWith(monthPrefix))
    .map(sup => parseInt(sup.code.split('-')[2]))

  const nextSeq = existingCodes.length > 0
    ? Math.max(...existingCodes) + 1
    : 1

  return `${monthPrefix}-${String(nextSeq).padStart(4, '0')}`
}
