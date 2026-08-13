/**
 * Mock Data for Machines Module
 */

export interface Machine {
  id: string
  machine_code: string
  machine_name: string
  brand_model: string
  purchase_date: string
  status: 'active' | 'under_maintenance' | 'broken' | 'broken'
}

export interface MaintenanceSchedule {
  id: string
  machine_id: string
  scheduled_date: string
  maintenance_type: 'routine' | 'deep_clean' | 'part_replacement'
  assigned_technician: string
  status: 'pending' | 'in_progress' | 'completed' | 'overdue'
  machine_name?: string
}

export interface MaintenanceLog {
  id: string
  schedule_id?: string
  machine_id: string
  execution_date: string
  action_taken: string
  replaced_parts?: string
  cost: number
  technician_notes: string
  machine_name?: string
}

// Machines
export const machines: Machine[] = [
  {
    id: 'm1',
    machine_code: 'SM-JUKI-001',
    machine_name: 'Single Needle Lock Stitch',
    brand_model: 'Juki DDL-8700',
    purchase_date: '2020-03-15',
    status: 'active'
  },
  {
    id: 'm2',
    machine_code: 'SM-JUKI-002',
    machine_name: 'Single Needle Lock Stitch',
    brand_model: 'Juki DDL-8700',
    purchase_date: '2020-03-15',
    status: 'active'
  },
  {
    id: 'm3',
    machine_code: 'SM-BROT-001',
    machine_name: 'Single Needle Computerized',
    brand_model: 'Brother B-430',
    purchase_date: '2021-06-10',
    status: 'active'
  },
  {
    id: 'm4',
    machine_code: 'OV-JUKI-001',
    machine_name: 'Overlock Machine 4-Thread',
    brand_model: 'Juki MO-6716S',
    purchase_date: '2019-11-20',
    status: 'active'
  },
  {
    id: 'm5',
    machine_code: 'OV-JUKI-002',
    machine_name: 'Overlock Machine 5-Thread',
    brand_model: 'Juki MO-6900',
    purchase_date: '2020-01-15',
    status: 'under_maintenance'
  },
  {
    id: 'm6',
    machine_code: 'FL-JUKI-001',
    machine_name: 'Flat Lock Machine',
    brand_model: 'Juki MF-7920',
    purchase_date: '2021-02-28',
    status: 'active'
  },
  {
    id: 'm7',
    machine_code: 'BT-JUKI-001',
    machine_name: 'Button Hole Machine',
    brand_model: 'Juki LBH-1790',
    purchase_date: '2020-08-10',
    status: 'active'
  },
  {
    id: 'm8',
    machine_code: 'BA-JUKI-001',
    machine_name: 'Button Attaching Machine',
    brand_model: 'Juki AMB-2890',
    purchase_date: '2020-08-15',
    status: 'active'
  },
  {
    id: 'm9',
    machine_code: 'BR-JUKI-001',
    machine_name: 'Bar Tacking Machine',
    brand_model: 'Juki LK-1900',
    purchase_date: '2021-04-05',
    status: 'active'
  },
  {
    id: 'm10',
    machine_code: 'CT-GERS-001',
    machine_name: 'Fabric Cutting Machine',
    brand_model: 'Gerber GTxL',
    purchase_date: '2019-05-20',
    status: 'active'
  },
  {
    id: 'm11',
    machine_code: 'CT-EAST-001',
    machine_name: 'Straight Knife Cutting Machine',
    brand_model: 'Eastman 627X',
    purchase_date: '2020-07-12',
    status: 'active'
  },
  {
    id: 'm12',
    machine_code: 'CT-EAST-002',
    machine_name: 'Straight Knife Cutting Machine',
    brand_model: 'Eastman 627X',
    purchase_date: '2020-07-12',
    status: 'broken'
  },
  {
    id: 'm13',
    machine_code: 'EM-PFAFF-001',
    machine_name: 'Embroidery Machine',
    brand_model: 'Pfaff creative 2170',
    purchase_date: '2021-09-15',
    status: 'active'
  },
  {
    id: 'm14',
    machine_code: 'PR-BRIS-001',
    machine_name: 'Steam Press Machine',
    brand_model: 'Brissmann C5',
    purchase_date: '2020-11-20',
    status: 'active'
  },
  {
    id: 'm15',
    machine_code: 'PR-BRIS-002',
    machine_name: 'Steam Press Machine',
    brand_model: 'Brissmann C5',
    purchase_date: '2020-11-20',
    status: 'active'
  },
  {
    id: 'm16',
    machine_code: 'VB-REED-001',
    machine_name: 'Vacuum Ironing Table',
    brand_model: 'Reed VBT-100',
    purchase_date: '2021-01-10',
    status: 'active'
  },
  {
    id: 'm17',
    machine_code: 'SL-JUKI-001',
    machine_name: 'Sleeve Placket Machine',
    brand_model: 'Juki APW-896',
    purchase_date: '2022-03-25',
    status: 'active'
  },
  {
    id: 'm18',
    machine_code: 'PN-SUN-001',
    machine_name: 'Pattern Making Software',
    brand_model: 'Sunrise PDS',
    purchase_date: '2021-07-30',
    status: 'active'
  }
]

// Generate maintenance schedules for next 3 months
const today = new Date()
export const maintenanceSchedules: MaintenanceSchedule[] = []
let scheduleCounter = 1

for (let monthOffset = 0; monthOffset <= 3; monthOffset++) {
  const targetMonth = new Date(today.getFullYear(), today.getMonth() + monthOffset, 1)

  machines.forEach((machine) => {
    // 1-2 schedules per machine per month
    const numSchedules = Math.random() > 0.5 ? 2 : 1

    for (let i = 0; i < numSchedules; i++) {
      const day = 1 + Math.floor(Math.random() * 28)
      const scheduledDate = new Date(targetMonth.getFullYear(), targetMonth.getMonth(), day)

      const typeOptions: MaintenanceSchedule['maintenance_type'][] = ['routine', 'routine', 'routine', 'deep_clean', 'part_replacement']
      const maintenanceType = typeOptions[Math.floor(Math.random() * typeOptions.length)]

      const isPastOrToday = scheduledDate <= today
      const statusOptions = isPastOrToday
        ? ['completed', 'completed', 'completed', 'overdue']
        : ['pending', 'pending', 'pending', 'in_progress']

      const status = statusOptions[Math.floor(Math.random() * statusOptions.length)] as MaintenanceSchedule['status']

      maintenanceSchedules.push({
        id: `ms-${scheduleCounter++}`,
        machine_id: machine.id,
        scheduled_date: scheduledDate.toISOString().split('T')[0],
        maintenance_type: maintenanceType,
        assigned_technician: 'Budi Pratama',
        status,
        machine_name: machine.machine_name
      })
    }
  })
}

// Generate past maintenance logs
export const maintenanceLogs: MaintenanceLog[] = []
let logCounter = 1

for (let monthOffset = -6; monthOffset <= 0; monthOffset++) {
  const targetMonth = new Date(today.getFullYear(), today.getMonth() + monthOffset, 1)

  machines.slice(0, 10).forEach((machine) => {
    const numLogs = 1 + Math.floor(Math.random() * 2)

    for (let i = 0; i < numLogs; i++) {
      const day = 1 + Math.floor(Math.random() * 28)
      const executionDate = new Date(targetMonth.getFullYear(), targetMonth.getMonth(), day)

      const actions = [
        'Routine cleaning and lubrication',
        'Changed needle and checked timing',
        'Replaced bobbin case and cleaned tension discs',
        'Deep cleaning of all moving parts',
        'Replaced worn feed dog',
        'Adjusted tension and checked stitch quality'
      ]

      const parts = ['None', 'Needle', 'Bobbin Case', 'Feed Dog', 'Tension Disc', 'Loopers', 'Knife Blade']

      maintenanceLogs.push({
        id: `ml-${logCounter++}`,
        machine_id: machine.id,
        execution_date: executionDate.toISOString().split('T')[0],
        action_taken: actions[Math.floor(Math.random() * actions.length)],
        replaced_parts: parts[Math.floor(Math.random() * parts.length)],
        cost: 50000 + Math.floor(Math.random() * 500000),
        technician_notes: 'Maintenance completed successfully. Machine operating normally.',
        machine_name: machine.machine_name
      })
    }
  })
}

// Statistics helpers
export const getMachineStats = () => {
  const active = machines.filter(m => m.status === 'active').length
  const underMaintenance = machines.filter(m => m.status === 'under_maintenance').length
  const broken = machines.filter(m => m.status === 'broken').length
  const inactive = machines.filter(m => m.status === 'inactive').length

  const todayStr = today.toISOString().split('T')[0]
  const pending = maintenanceSchedules.filter(ms => ms.status === 'pending' && ms.scheduled_date >= todayStr).length
  const overdue = maintenanceSchedules.filter(ms => ms.status === 'overdue' || (ms.status === 'pending' && ms.scheduled_date < todayStr)).length
  const inProgress = maintenanceSchedules.filter(ms => ms.status === 'in_progress').length

  return {
    total: machines.length,
    active,
    underMaintenance,
    broken,
    inactive,
    pendingSchedules: pending,
    inProgressSchedules: inProgress,
    overdueSchedules: overdue
  }
}
