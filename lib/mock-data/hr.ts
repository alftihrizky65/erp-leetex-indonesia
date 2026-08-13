/**
 * Mock Data for HR Module
 * Realistic data for garment manufacturing company
 */

export interface Employee {
  id: string
  user_id?: string
  employee_code: string
  full_name: string
  phone: string
  address: string
  department: string
  position: string
  join_date: string
  status: 'permanent' | 'contract' | 'intern'
  avatar?: string
}

export interface EmployeeShift {
  id: string
  shift_name: string
  start_time: string
  end_time: string
  is_night_shift: boolean
}

export interface WorkSchedule {
  id: string
  employee_id: string
  employee_shift_id: string
  schedule_date: string
  employee_name?: string
  shift_name?: string
}

export interface Attendance {
  id: string
  employee_id: string
  schedule_date: string
  check_in?: string
  check_out?: string
  status: 'present' | 'late' | 'absent' | 'sick' | 'leave'
  notes?: string
  employee_name?: string
}

// Employees
export const employees: Employee[] = [
  {
    id: '1',
    user_id: 'u1',
    employee_code: 'EMP-202401-0001',
    full_name: 'Ahmad Suryadi',
    phone: '081234567890',
    address: 'Jl. Merdeka No. 10, Bandung',
    department: 'Production',
    position: 'Production Supervisor',
    join_date: '2020-03-15',
    status: 'permanent'
  },
  {
    id: '2',
    user_id: 'u2',
    employee_code: 'EMP-202401-0002',
    full_name: 'Siti Rahayu',
    phone: '081234567891',
    address: 'Jl. Ahmad Yani No. 25, Bandung',
    department: 'Quality Control',
    position: 'QC Inspector',
    join_date: '2021-06-01',
    status: 'permanent'
  },
  {
    id: '3',
    user_id: 'u3',
    employee_code: 'EMP-202402-0003',
    full_name: 'Budi Pratama',
    phone: '081234567892',
    address: 'Jl. Gatot Subroto No. 15, Bandung',
    department: 'Maintenance',
    position: 'Maintenance Technician',
    join_date: '2022-01-10',
    status: 'permanent'
  },
  {
    id: '4',
    employee_code: 'EMP-202402-0004',
    full_name: 'Dewi Lestari',
    phone: '081234567893',
    address: 'Jl. Asia Afrika No. 30, Bandung',
    department: 'Warehouse',
    position: 'Warehouse Staff',
    join_date: '2023-02-15',
    status: 'permanent'
  },
  {
    id: '5',
    employee_code: 'EMP-202403-0005',
    full_name: 'Rudi Hartono',
    phone: '081234567894',
    address: 'Jl. Pahlawan No. 5, Bandung',
    department: 'Production',
    position: 'Sewing Machine Operator',
    join_date: '2023-03-01',
    status: 'permanent'
  },
  {
    id: '6',
    employee_code: 'EMP-202403-0006',
    full_name: 'Maya Sari',
    phone: '081234567895',
    address: 'Jl. Dipati Ukur No. 20, Bandung',
    department: 'Finance',
    position: 'Accountant',
    join_date: '2021-09-01',
    status: 'permanent'
  },
  {
    id: '7',
    employee_code: 'EMP-202404-0007',
    full_name: 'Indra Wijaya',
    phone: '081234567896',
    address: 'Jl. Cikapundung No. 12, Bandung',
    department: 'Production',
    position: 'Cutting Operator',
    join_date: '2023-04-10',
    status: 'contract'
  },
  {
    id: '8',
    employee_code: 'EMP-202404-0008',
    full_name: 'Rina Melati',
    phone: '081234567897',
    address: 'Jl. Braga No. 18, Bandung',
    department: 'Production',
    position: 'Finishing Operator',
    join_date: '2023-05-01',
    status: 'contract'
  },
  {
    id: '9',
    employee_code: 'EMP-202405-0009',
    full_name: 'Fajar Nugraha',
    phone: '081234567898',
    address: 'Jl. Sudirman No. 40, Bandung',
    department: 'HR',
    position: 'HR Staff',
    join_date: '2022-08-15',
    status: 'permanent'
  },
  {
    id: '10',
    employee_code: 'EMP-202405-0010',
    full_name: 'Linda Kusuma',
    phone: '081234567899',
    address: 'Jl. Setiabudi No. 22, Bandung',
    department: 'Production',
    position: 'Embroidery Operator',
    join_date: '2023-06-01',
    status: 'permanent'
  },
  {
    id: '11',
    employee_code: 'EMP-202406-0011',
    full_name: 'Dedi Setiawan',
    phone: '081234567900',
    address: 'Jl. Riau No. 15, Bandung',
    department: 'Warehouse',
    position: 'Inventory Controller',
    join_date: '2022-11-01',
    status: 'permanent'
  },
  {
    id: '12',
    employee_code: 'EMP-202406-0012',
    full_name: 'Wulan Ayu',
    phone: '081234567901',
    address: 'Jl. Tamblong No. 8, Bandung',
    department: 'Production',
    position: 'Pattern Maker',
    join_date: '2021-04-15',
    status: 'permanent'
  },
  {
    id: '13',
    employee_code: 'EMP-202407-0013',
    full_name: 'Rizky Pratama',
    phone: '081234567902',
    address: 'Jl. Sumatra No. 35, Bandung',
    department: 'Maintenance',
    position: 'Electrician',
    join_date: '2023-07-01',
    status: 'contract'
  },
  {
    id: '14',
    employee_code: 'EMP-202407-0014',
    full_name: 'Ani Susanti',
    phone: '081234567903',
    address: 'Jl. Aceh No. 10, Bandung',
    department: 'Production',
    position: 'Sewing Machine Operator',
    join_date: '2023-07-15',
    status: 'permanent'
  },
  {
    id: '15',
    employee_code: 'EMP-202408-0015',
    full_name: 'Bayu Sanjaya',
    phone: '081234567904',
    address: 'Jl. Lembong No. 12, Bandung',
    department: 'Production',
    position: 'Pressing Operator',
    join_date: '2024-01-10',
    status: 'intern'
  },
  {
    id: '16',
    employee_code: 'EMP-202408-0016',
    full_name: 'Citra Putri',
    phone: '081234567905',
    address: 'Jl. Burangrang No. 5, Bandung',
    department: 'Quality Control',
    position: 'QC Trainee',
    join_date: '2024-02-01',
    status: 'intern'
  },
  {
    id: '17',
    employee_code: 'EMP-202408-0017',
    full_name: 'Hendra Gunawan',
    phone: '081234567906',
    address: 'Jl. Wira Angun-Angun No. 3, Bandung',
    department: 'Warehouse',
    position: 'Forklift Operator',
    join_date: '2022-05-15',
    status: 'permanent'
  },
  {
    id: '18',
    employee_code: 'EMP-202409-0018',
    full_name: 'Ratna Dewi',
    phone: '081234567907',
    address: 'Jl. Pelajar Pejuang No. 20, Bandung',
    department: 'Admin',
    position: 'Admin Staff',
    join_date: '2023-08-01',
    status: 'permanent'
  }
]

// Shifts
export const shifts: EmployeeShift[] = [
  {
    id: 's1',
    shift_name: 'Shift 1 (Pagi)',
    start_time: '08:00',
    end_time: '17:00',
    is_night_shift: false
  },
  {
    id: 's2',
    shift_name: 'Shift 2 (Siang)',
    start_time: '14:00',
    end_time: '23:00',
    is_night_shift: false
  },
  {
    id: 's3',
    shift_name: 'Shift 3 (Malam)',
    start_time: '23:00',
    end_time: '08:00',
    is_night_shift: true
  },
  {
    id: 's4',
    shift_name: 'Non-Shift (Office)',
    start_time: '08:00',
    end_time: '17:00',
    is_night_shift: false
  }
]

// Generate work schedules for current week
const today = new Date()
export const workSchedules: WorkSchedule[] = []

for (let i = -3; i <= 3; i++) {
  const date = new Date(today)
  date.setDate(today.getDate() + i)
  const dateStr = date.toISOString().split('T')[0]

  employees.slice(0, 10).forEach((emp, idx) => {
    const shiftIdx = idx % 4
    workSchedules.push({
      id: `ws-${dateStr}-${emp.id}`,
      employee_id: emp.id,
      employee_shift_id: shifts[shiftIdx].id,
      schedule_date: dateStr,
      employee_name: emp.full_name,
      shift_name: shifts[shiftIdx].shift_name
    })
  })
}

// Generate attendance records for current month
export const attendances: Attendance[] = []

const currentMonth = today.getMonth()
const currentYear = today.getFullYear()

for (let day = 1; day <= today.getDate(); day++) {
  const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`

  employees.slice(0, 15).forEach((emp) => {
    const statusOptions: Attendance['status'][] = ['present', 'present', 'present', 'present', 'late', 'absent', 'sick', 'leave']
    const status = statusOptions[Math.floor(Math.random() * statusOptions.length)]

    const attendance: Attendance = {
      id: `att-${dateStr}-${emp.id}`,
      employee_id: emp.id,
      schedule_date: dateStr,
      status,
      employee_name: emp.full_name
    }

    if (status === 'present' || status === 'late') {
      const checkInHour = 7 + Math.floor(Math.random() * 2)
      const checkInMin = Math.floor(Math.random() * 59)
      attendance.check_in = `${dateStr}T${String(checkInHour).padStart(2, '0')}:${String(checkInMin).padStart(2, '0')}:00`

      if (status !== 'late') {
        const checkOutHour = 16 + Math.floor(Math.random() * 2)
        const checkOutMin = Math.floor(Math.random() * 59)
        attendance.check_out = `${dateStr}T${String(checkOutHour).padStart(2, '0')}:${String(checkOutMin).padStart(2, '0')}:00`
      }
    }

    if (status === 'late') {
      attendance.notes = 'Traffic jam'
    }

    attendances.push(attendance)
  })
}

// Statistics helpers
export const getAttendanceStats = (date: string = new Date().toISOString().split('T')[0]) => {
  const dayAttendances = attendances.filter(a => a.schedule_date === date)
  return {
    present: dayAttendances.filter(a => a.status === 'present').length,
    late: dayAttendances.filter(a => a.status === 'late').length,
    absent: dayAttendances.filter(a => a.status === 'absent').length,
    sick: dayAttendances.filter(a => a.status === 'sick').length,
    leave: dayAttendances.filter(a => a.status === 'leave').length
  }
}

export const getEmployeeStats = () => {
  return {
    total: employees.length,
    permanent: employees.filter(e => e.status === 'permanent').length,
    contract: employees.filter(e => e.status === 'contract').length,
    intern: employees.filter(e => e.status === 'intern').length
  }
}
