export type MachineStatus = 'active' | 'under-maintenance' | 'broken' | 'inactive'

export interface Machine {
  id: string
  code: string
  name: string
  brandModel: string
  purchaseDate: string
  status: MachineStatus
  location?: string
  lastMaintenanceDate?: string
  nextMaintenanceDate?: string
}

// Mock machine data
export const mockMachines: Machine[] = [
  {
    id: '1',
    code: 'MCH-2021001',
    name: 'Industrial Sewing Machine JUKI DDL-8700',
    brandModel: 'JUKI DDL-8700',
    purchaseDate: '2021-03-15',
    status: 'active',
    location: 'Production Line A',
    lastMaintenanceDate: '2024-06-15',
    nextMaintenanceDate: '2024-09-15',
  },
  {
    id: '2',
    code: 'MCH-2021002',
    name: 'Overlock Machine SIRUBA 757',
    brandModel: 'SIRUBA 757',
    purchaseDate: '2021-04-20',
    status: 'active',
    location: 'Production Line A',
    lastMaintenanceDate: '2024-07-01',
    nextMaintenanceDate: '2024-10-01',
  },
  {
    id: '3',
    code: 'MCH-2021003',
    name: 'Flatbed Machine BROTHER B-430',
    brandModel: 'BROTHER B-430',
    purchaseDate: '2021-05-10',
    status: 'under-maintenance',
    location: 'Production Line B',
    lastMaintenanceDate: '2024-05-20',
    nextMaintenanceDate: '2024-08-20',
  },
  {
    id: '4',
    code: 'MCH-2022001',
    name: 'Button Hole Machine SINGER 29952',
    brandModel: 'SINGER 29952',
    purchaseDate: '2022-01-15',
    status: 'active',
    location: 'Production Line B',
    lastMaintenanceDate: '2024-06-01',
    nextMaintenanceDate: '2024-09-01',
  },
  {
    id: '5',
    code: 'MCH-2022002',
    name: 'Button Attaching Machine JUKI LBH-1790',
    brandModel: 'JUKI LBH-1790',
    purchaseDate: '2022-02-20',
    status: 'broken',
    location: 'Workshop',
    lastMaintenanceDate: '2024-04-10',
    nextMaintenanceDate: '2024-07-10',
  },
  {
    id: '6',
    code: 'MCH-2022003',
    name: 'Bar Tacking Machine JUKI LK-1900',
    brandModel: 'JUKI LK-1900',
    purchaseDate: '2022-03-25',
    status: 'active',
    location: 'Production Line C',
    lastMaintenanceDate: '2024-07-15',
    nextMaintenanceDate: '2024-10-15',
  },
  {
    id: '7',
    code: 'MCH-2023001',
    name: 'Double Needle Machine PEGASUS W500',
    brandModel: 'PEGASUS W500',
    purchaseDate: '2023-01-10',
    status: 'active',
    location: 'Production Line C',
    lastMaintenanceDate: '2024-06-20',
    nextMaintenanceDate: '2024-09-20',
  },
  {
    id: '8',
    code: 'MCH-2023002',
    name: 'Steam Iron Boiler VEIT V9',
    brandModel: 'VEIT V9',
    purchaseDate: '2023-02-15',
    status: 'inactive',
    location: 'Storage',
    lastMaintenanceDate: '2024-03-15',
    nextMaintenanceDate: '2024-06-15',
  },
  {
    id: '9',
    code: 'MCH-2023003',
    name: 'Fabric Spreading Machine KURIS AEF-600',
    brandModel: 'KURIS AEF-600',
    purchaseDate: '2023-03-20',
    status: 'active',
    location: 'Cutting Room',
    lastMaintenanceDate: '2024-07-01',
    nextMaintenanceDate: '2024-10-01',
  },
  {
    id: '10',
    code: 'MCH-2024001',
    name: 'Automatic Cutting Machine GERBER Paragon',
    brandModel: 'GERBER Paragon LX',
    purchaseDate: '2024-01-25',
    status: 'active',
    location: 'Cutting Room',
    lastMaintenanceDate: '2024-06-30',
    nextMaintenanceDate: '2024-09-30',
  },
  {
    id: '11',
    code: 'MCH-2024002',
    name: 'Heat Transfer Machine HIX NP-600',
    brandModel: 'HIX NP-600',
    purchaseDate: '2024-02-10',
    status: 'under-maintenance',
    location: 'Workshop',
    lastMaintenanceDate: '2024-05-25',
    nextMaintenanceDate: '2024-08-25',
  },
  {
    id: '12',
    code: 'MCH-2024003',
    name: 'Embroidery Machine TAJIMA TMBX-SC1504',
    brandModel: 'TAJIMA TMBX-SC1504',
    purchaseDate: '2024-03-15',
    status: 'active',
    location: 'Embroidery Section',
    lastMaintenanceDate: '2024-07-20',
    nextMaintenanceDate: '2024-10-20',
  },
]

// Helper function to generate machine code
export function generateMachineCode(): string {
  const now = new Date()
  const year = now.getFullYear()

  // Get the last machine code for this year
  const yearPrefix = `MCH-${year}`
  const existingCodes = mockMachines
    .filter(mch => mch.code.startsWith(yearPrefix))
    .map(mch => parseInt(mch.code.split('-')[2]))

  const nextSeq = existingCodes.length > 0
    ? Math.max(...existingCodes) + 1
    : 1

  return `${yearPrefix}${String(nextSeq).padStart(3, '0')}`
}

export const statusOptions: { value: MachineStatus; label: string }[] = [
  { value: 'active', label: 'Active' },
  { value: 'under-maintenance', label: 'Under Maintenance' },
  { value: 'broken', label: 'Broken' },
  { value: 'inactive', label: 'Inactive' },
]

export const getStatusLabel = (status: MachineStatus): string => {
  return statusOptions.find(opt => opt.value === status)?.label || status
}
