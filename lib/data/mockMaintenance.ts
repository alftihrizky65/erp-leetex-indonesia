export type MaintenanceType = 'routine' | 'deep-clean' | 'part-replacement'
export type MaintenanceStatus = 'pending' | 'in-progress' | 'completed' | 'overdue'

export interface MaintenanceSchedule {
  id: string
  machineId: string
  machineName: string
  machineCode: string
  scheduledDate: string
  type: MaintenanceType
  technician: string
  status: MaintenanceStatus
  notes?: string
  estimatedDuration?: number // in hours
  priority?: 'low' | 'medium' | 'high'
}

export interface MaintenanceLog {
  id: string
  maintenanceId: string
  machineId: string
  machineName: string
  executionDate: string
  actionTaken: string
  replacedParts?: Array<{
    partName: string
    quantity: number
    cost: number
  }>
  cost: number
  technician: string
  technicianNotes: string
  status: MaintenanceStatus
}

// Mock maintenance schedules
export const mockMaintenanceSchedules: MaintenanceSchedule[] = [
  {
    id: '1',
    machineId: '1',
    machineName: 'Industrial Sewing Machine JUKI DDL-8700',
    machineCode: 'MCH-2021001',
    scheduledDate: '2024-08-15',
    type: 'routine',
    technician: 'Ahmad Rahman',
    status: 'pending',
    notes: 'Regular monthly maintenance check',
    estimatedDuration: 2,
    priority: 'medium',
  },
  {
    id: '2',
    machineId: '2',
    machineName: 'Overlock Machine SIRUBA 757',
    machineCode: 'MCH-2021002',
    scheduledDate: '2024-08-10',
    type: 'deep-clean',
    technician: 'Budi Santoso',
    status: 'in-progress',
    notes: 'Complete deep cleaning and lubrication',
    estimatedDuration: 4,
    priority: 'high',
  },
  {
    id: '3',
    machineId: '3',
    machineName: 'Flatbed Machine BROTHER B-430',
    machineCode: 'MCH-2021003',
    scheduledDate: '2024-08-05',
    type: 'part-replacement',
    technician: 'Dewi Lestari',
    status: 'overdue',
    notes: 'Replace needle holder and tension discs',
    estimatedDuration: 3,
    priority: 'high',
  },
  {
    id: '4',
    machineId: '4',
    machineName: 'Button Hole Machine SINGER 29952',
    machineCode: 'MCH-2022001',
    scheduledDate: '2024-08-01',
    type: 'routine',
    technician: 'Eko Prasetyo',
    status: 'completed',
    notes: 'Monthly inspection and cleaning',
    estimatedDuration: 1.5,
    priority: 'low',
  },
  {
    id: '5',
    machineId: '5',
    machineName: 'Button Attaching Machine JUKI LBH-1790',
    machineCode: 'MCH-2022002',
    scheduledDate: '2024-08-12',
    type: 'part-replacement',
    technician: 'Fitri Handayani',
    status: 'pending',
    notes: 'Replace motor and control board',
    estimatedDuration: 5,
    priority: 'high',
  },
  {
    id: '6',
    machineId: '6',
    machineName: 'Bar Tacking Machine JUKI LK-1900',
    machineCode: 'MCH-2022003',
    scheduledDate: '2024-08-20',
    type: 'routine',
    technician: 'Gunawan Wijaya',
    status: 'pending',
    notes: 'Quarterly maintenance check',
    estimatedDuration: 2,
    priority: 'medium',
  },
  {
    id: '7',
    machineId: '7',
    machineName: 'Double Needle Machine PEGASUS W500',
    machineCode: 'MCH-2023001',
    scheduledDate: '2024-08-18',
    type: 'deep-clean',
    technician: 'Ahmad Rahman',
    status: 'pending',
    notes: 'Complete cleaning and oil change',
    estimatedDuration: 4,
    priority: 'medium',
  },
  {
    id: '8',
    machineId: '9',
    machineName: 'Fabric Spreading Machine KURIS AEF-600',
    machineCode: 'MCH-2023003',
    scheduledDate: '2024-08-08',
    type: 'routine',
    technician: 'Budi Santoso',
    status: 'overdue',
    notes: 'Lubrication and alignment check',
    estimatedDuration: 2,
    priority: 'high',
  },
  {
    id: '9',
    machineId: '10',
    machineName: 'Automatic Cutting Machine GERBER Paragon',
    machineCode: 'MCH-2024001',
    scheduledDate: '2024-08-25',
    type: 'routine',
    technician: 'Dewi Lestari',
    status: 'pending',
    notes: 'Blade inspection and system calibration',
    estimatedDuration: 3,
    priority: 'medium',
  },
  {
    id: '10',
    machineId: '11',
    machineName: 'Heat Transfer Machine HIX NP-600',
    machineCode: 'MCH-2024002',
    scheduledDate: '2024-08-14',
    type: 'deep-clean',
    technician: 'Eko Prasetyo',
    status: 'in-progress',
    notes: 'Heating element cleaning and temperature calibration',
    estimatedDuration: 4,
    priority: 'high',
  },
]

// Mock maintenance logs
export const mockMaintenanceLogs: MaintenanceLog[] = [
  {
    id: '1',
    maintenanceId: '4',
    machineId: '4',
    machineName: 'Button Hole Machine SINGER 29952',
    executionDate: '2024-08-01T10:30:00',
    actionTaken: 'Routine inspection completed. Machine is in good working condition.',
    replacedParts: [
      {
        partName: 'Needle Set',
        quantity: 1,
        cost: 150000,
      },
      {
        partName: 'Oil (1L)',
        quantity: 1,
        cost: 75000,
      },
    ],
    cost: 225000,
    technician: 'Eko Prasetyo',
    technicianNotes: 'All systems functioning properly. Next maintenance scheduled for September.',
    status: 'completed',
  },
  {
    id: '2',
    maintenanceId: 'prev-1',
    machineId: '1',
    machineName: 'Industrial Sewing Machine JUKI DDL-8700',
    executionDate: '2024-07-15T14:00:00',
    actionTaken: 'Routine maintenance with belt replacement.',
    replacedParts: [
      {
        partName: 'Timing Belt',
        quantity: 1,
        cost: 350000,
      },
      {
        partName: 'Needle Plate',
        quantity: 1,
        cost: 200000,
      },
      {
        partName: 'Feed Dog',
        quantity: 1,
        cost: 180000,
      },
    ],
    cost: 730000,
    technician: 'Ahmad Rahman',
    technicianNotes: 'Belt replacement completed. Machine running smoothly.',
    status: 'completed',
  },
  {
    id: '3',
    maintenanceId: 'prev-2',
    machineId: '2',
    machineName: 'Overlock Machine SIRUBA 757',
    executionDate: '2024-07-01T09:00:00',
    actionTaken: 'Deep cleaning and lower knife replacement.',
    replacedParts: [
      {
        partName: 'Lower Knife',
        quantity: 1,
        cost: 450000,
      },
      {
        partName: 'Upper Knife',
        quantity: 1,
        cost: 450000,
      },
      {
        partName: 'Cleaning Kit',
        quantity: 1,
        cost: 100000,
      },
    ],
    cost: 1000000,
    technician: 'Budi Santoso',
    technicianNotes: 'Knives replaced and calibrated. Stitch quality improved.',
    status: 'completed',
  },
  {
    id: '4',
    maintenanceId: 'prev-3',
    machineId: '3',
    machineName: 'Flatbed Machine BROTHER B-430',
    executionDate: '2024-06-20T13:30:00',
    actionTaken: 'Tension unit replacement and bobbin case cleaning.',
    replacedParts: [
      {
        partName: 'Tension Unit',
        quantity: 1,
        cost: 550000,
      },
      {
        partName: 'Bobbin Case',
        quantity: 2,
        cost: 150000,
      },
    ],
    cost: 850000,
    technician: 'Dewi Lestari',
    technicianNotes: 'Tension issues resolved. Test stitches are consistent.',
    status: 'completed',
  },
  {
    id: '5',
    maintenanceId: 'prev-4',
    machineId: '6',
    machineName: 'Bar Tacking Machine JUKI LK-1900',
    executionDate: '2024-06-10T11:00:00',
    actionTaken: 'Routine maintenance with thread guide replacement.',
    replacedParts: [
      {
        partName: 'Thread Guide Set',
        quantity: 1,
        cost: 200000,
      },
      {
        partName: 'Oil (500ml)',
        quantity: 2,
        cost: 120000,
      },
    ],
    cost: 320000,
    technician: 'Gunawan Wijaya',
    technicianNotes: 'Thread tension adjusted properly. No issues found.',
    status: 'completed',
  },
  {
    id: '6',
    maintenanceId: 'prev-5',
    machineId: '9',
    machineName: 'Fabric Spreading Machine KURIS AEF-600',
    executionDate: '2024-05-25T15:00:00',
    actionTaken: 'Roller replacement and spreader calibration.',
    replacedParts: [
      {
        partName: 'Spreader Roller',
        quantity: 2,
        cost: 1200000,
      },
      {
        partName: 'Guide Rail',
        quantity: 1,
        cost: 800000,
      },
    ],
    cost: 2000000,
    technician: 'Budi Santoso',
    technicianNotes: 'Major replacement completed. Spreading accuracy verified.',
    status: 'completed',
  },
]

// Helper functions
export const maintenanceTypeOptions: { value: MaintenanceType; label: string; color: string }[] = [
  { value: 'routine', label: 'Routine', color: 'blue' },
  { value: 'deep-clean', label: 'Deep Clean', color: 'purple' },
  { value: 'part-replacement', label: 'Part Replacement', color: 'orange' },
]

export const maintenanceStatusOptions: { value: MaintenanceStatus; label: string; color: string }[] = [
  { value: 'pending', label: 'Pending', color: 'yellow' },
  { value: 'in-progress', label: 'In Progress', color: 'blue' },
  { value: 'completed', label: 'Completed', color: 'green' },
  { value: 'overdue', label: 'Overdue', color: 'red' },
]

export const getMaintenanceTypeLabel = (type: MaintenanceType): string => {
  return maintenanceTypeOptions.find(opt => opt.value === type)?.label || type
}

export const getMaintenanceStatusLabel = (status: MaintenanceStatus): string => {
  return maintenanceStatusOptions.find(opt => opt.value === status)?.label || status
}

export const getTechnicians = (): string[] => {
  return ['Ahmad Rahman', 'Budi Santoso', 'Dewi Lestari', 'Eko Prasetyo', 'Fitri Handayani', 'Gunawan Wijaya']
}

// Function to check if maintenance is overdue
export const isMaintenanceOverdue = (scheduledDate: string, status: MaintenanceStatus): boolean => {
  if (status === 'completed') return false
  const today = new Date()
  const scheduled = new Date(scheduledDate)
  return scheduled < today && status !== 'completed'
}
