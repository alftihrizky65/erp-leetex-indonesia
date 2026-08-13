export type EmployeeStatus = 'permanent' | 'contract' | 'intern'
export type Department = 'Production' | 'Sales' | 'Finance' | 'HR' | 'Procurement' | 'Inventory' | 'Machines'
export type Position = 'Manager' | 'Supervisor' | 'Staff' | 'Operator' | 'Assistant' | 'Specialist'

export interface Employee {
  id: string
  code: string
  fullName: string
  phone: string
  address: string
  department: Department
  position: Position
  joinDate: string
  status: EmployeeStatus
  avatar?: string
}

// Mock employee data
export const mockEmployees: Employee[] = [
  {
    id: '1',
    code: 'EMP-202401-0001',
    fullName: 'Ahmad Suryadi',
    phone: '081234567890',
    address: 'Jl. Merdeka No. 10, Jakarta',
    department: 'Production',
    position: 'Manager',
    joinDate: '2020-01-15',
    status: 'permanent',
  },
  {
    id: '2',
    code: 'EMP-202402-0002',
    fullName: 'Siti Rahayu',
    phone: '081234567891',
    address: 'Jl. Sudirman No. 25, Bandung',
    department: 'HR',
    position: 'Supervisor',
    joinDate: '2020-03-20',
    status: 'permanent',
  },
  {
    id: '3',
    code: 'EMP-202403-0003',
    fullName: 'Budi Santoso',
    phone: '081234567892',
    address: 'Jl. Gatot Subroto No. 15, Surabaya',
    department: 'Sales',
    position: 'Staff',
    joinDate: '2021-06-10',
    status: 'permanent',
  },
  {
    id: '4',
    code: 'EMP-202404-0004',
    fullName: 'Dewi Lestari',
    phone: '081234567893',
    address: 'Jl. Ahmad Yani No. 30, Semarang',
    department: 'Finance',
    position: 'Specialist',
    joinDate: '2021-08-05',
    status: 'contract',
  },
  {
    id: '5',
    code: 'EMP-202501-0005',
    fullName: 'Rizky Pratama',
    phone: '081234567894',
    address: 'Jl. Diponegoro No. 45, Yogyakarta',
    department: 'Production',
    position: 'Operator',
    joinDate: '2022-02-15',
    status: 'permanent',
  },
  {
    id: '6',
    code: 'EMP-202502-0006',
    fullName: 'Putri Wijaya',
    phone: '081234567895',
    address: 'Jl. Pemuda No. 20, Malang',
    department: 'Procurement',
    position: 'Staff',
    joinDate: '2022-05-10',
    status: 'contract',
  },
  {
    id: '7',
    code: 'EMP-202503-0007',
    fullName: 'Agus Setiawan',
    phone: '081234567896',
    address: 'Jl. Veteran No. 35, Medan',
    department: 'Machines',
    position: 'Supervisor',
    joinDate: '2022-07-20',
    status: 'permanent',
  },
  {
    id: '8',
    code: 'EMP-202601-0008',
    fullName: 'Rina Kusuma',
    phone: '081234567897',
    address: 'Jl. Slamet Riyadi No. 50, Solo',
    department: 'Inventory',
    position: 'Assistant',
    joinDate: '2023-01-15',
    status: 'intern',
  },
  {
    id: '9',
    code: 'EMP-202602-0009',
    fullName: 'Doni Prasetyo',
    phone: '081234567898',
    address: 'Jl. Urip Sumoharjo No. 40, Makassar',
    department: 'Production',
    position: 'Operator',
    joinDate: '2023-04-10',
    status: 'permanent',
  },
  {
    id: '10',
    code: 'EMP-202603-0010',
    fullName: 'Maya Sari',
    phone: '081234567899',
    address: 'Jl. Panglima Sudirman No. 60, Palembang',
    department: 'HR',
    position: 'Staff',
    joinDate: '2023-06-25',
    status: 'contract',
  },
  {
    id: '11',
    code: 'EMP-202604-0011',
    fullName: 'Feri Handoko',
    phone: '081234567900',
    address: 'Jl. Hayam Wuruk No. 70, Denpasar',
    department: 'Sales',
    position: 'Staff',
    joinDate: '2023-09-15',
    status: 'permanent',
  },
  {
    id: '12',
    code: 'EMP-202605-0012',
    fullName: 'Linda Permata',
    phone: '081234567901',
    address: 'Jl. Gajah Mada No. 80, Samarinda',
    department: 'Finance',
    position: 'Assistant',
    joinDate: '2024-01-20',
    status: 'intern',
  },
]

// Helper function to generate employee code
export function generateEmployeeCode(): string {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')

  // Get the last employee code for this month
  const monthPrefix = `EMP-${year}${month}`
  const existingCodes = mockEmployees
    .filter(emp => emp.code.startsWith(monthPrefix))
    .map(emp => parseInt(emp.code.split('-')[2]))

  const nextSeq = existingCodes.length > 0
    ? Math.max(...existingCodes) + 1
    : 1

  return `${monthPrefix}-${String(nextSeq).padStart(4, '0')`}
}

export const departments: Department[] = [
  'Production',
  'Sales',
  'Finance',
  'HR',
  'Procurement',
  'Inventory',
  'Machines',
]

export const positions: Position[] = [
  'Manager',
  'Supervisor',
  'Staff',
  'Operator',
  'Assistant',
  'Specialist',
]

export const statusOptions: EmployeeStatus[] = ['permanent', 'contract', 'intern']
