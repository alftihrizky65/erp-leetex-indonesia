import { mockEmployees } from './mockEmployees'

export type AttendanceStatus = 'present' | 'late' | 'absent' | 'sick' | 'leave'

export interface Attendance {
  id: string
  employeeId: string
  employeeName: string
  employeeCode: string
  date: string
  checkIn?: string
  checkOut?: string
  status: AttendanceStatus
  notes?: string
  department: string
}

// Helper function to generate attendance records for a specific date
export function generateAttendanceForDate(date: string): Attendance[] {
  return mockEmployees.map((employee) => {
    // Randomly assign status with realistic distribution
    const rand = Math.random()
    let status: AttendanceStatus = 'present'
    let checkIn: string | undefined
    let checkOut: string | undefined
    let notes: string | undefined

    if (rand < 0.75) {
      // 75% present
      status = 'present'
      checkIn = `${String(Math.floor(Math.random() * 2) + 7).padStart(2, '0')}:${String(Math.floor(Math.random() * 30)).padStart(2, '0')}`
      checkOut = `${String(Math.floor(Math.random() * 2) + 16).padStart(2, '0')}:${String(Math.floor(Math.random() * 30) + 30).padStart(2, '0')}`
    } else if (rand < 0.85) {
      // 10% late
      status = 'late'
      checkIn = `${String(Math.floor(Math.random() * 2) + 9).padStart(2, '0')}:${String(Math.floor(Math.random() * 30)).padStart(2, '0')}`
      checkOut = `${String(Math.floor(Math.random() * 2) + 17).padStart(2, '0')}:${String(Math.floor(Math.random() * 30) + 30).padStart(2, '0')}`
      notes = 'Arrived late due to traffic'
    } else if (rand < 0.92) {
      // 7% absent
      status = 'absent'
      notes = 'Unexcused absence'
    } else if (rand < 0.97) {
      // 5% sick
      status = 'sick'
      notes = 'Medical certificate provided'
    } else {
      // 3% leave
      status = 'leave'
      notes = 'Approved leave request'
    }

    return {
      id: `${date}-${employee.id}`,
      employeeId: employee.id,
      employeeName: employee.fullName,
      employeeCode: employee.code,
      date,
      checkIn,
      checkOut,
      status,
      notes,
      department: employee.department,
    }
  })
}

// Generate attendance for today
const today = new Date().toISOString().split('T')[0]
export const mockAttendance: Attendance[] = generateAttendanceForDate(today)

// Generate attendance for the past week
export const mockAttendanceHistory: Attendance[] = []
for (let i = 1; i <= 7; i++) {
  const date = new Date()
  date.setDate(date.getDate() - i)
  const dateStr = date.toISOString().split('T')[0]
  mockAttendanceHistory.push(...generateAttendanceForDate(dateStr))
}

// Status options for filter/select
export const attendanceStatusOptions: AttendanceStatus[] = ['present', 'late', 'absent', 'sick', 'leave']

// Status label mapping
export const statusLabels: Record<AttendanceStatus, string> = {
  present: 'Present',
  late: 'Late',
  absent: 'Absent',
  sick: 'Sick',
  leave: 'On Leave',
}

// Status badge type mapping
export const statusBadgeTypes: Record<AttendanceStatus, 'success' | 'warning' | 'danger' | 'info' | 'processing'> = {
  present: 'success',
  late: 'warning',
  absent: 'danger',
  sick: 'info',
  leave: 'processing',
}
