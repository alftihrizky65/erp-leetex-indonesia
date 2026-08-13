'use client'

import React, { useState, useMemo } from 'react'
import { Calendar, ChevronLeft, ChevronRight, Filter, Plus, CalendarDays, List, Clock } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Modal } from '@/components/ui/Modal'
import { ScheduleForm, ScheduleFormData } from './components/ScheduleForm'

// Mock data - will be replaced with PowerSync queries
const MOCK_EMPLOYEES = [
  { id: '1', name: 'Ahmad Fauzi', department: 'Production' },
  { id: '2', name: 'Budi Santoso', department: 'Production' },
  { id: '3', name: 'Citra Dewi', department: 'Quality Control' },
  { id: '4', name: 'Dedi Kurniawan', department: 'Maintenance' },
  { id: '5', name: 'Eka Pratama', department: 'Production' },
  { id: '6', name: 'Fitri Handayani', department: 'Quality Control' },
  { id: '7', name: 'Gunawan Setiawan', department: 'Maintenance' },
  { id: '8', name: 'Haryono', department: 'Production' },
]

const MOCK_SHIFTS = [
  { id: 's1', name: 'Morning Shift', startTime: '06:00', endTime: '14:00', color: 'bg-green-100 text-green-800' },
  { id: 's2', name: 'Afternoon Shift', startTime: '14:00', endTime: '22:00', color: 'bg-blue-100 text-blue-800' },
  { id: 's3', name: 'Night Shift', startTime: '22:00', endTime: '06:00', color: 'bg-indigo-100 text-indigo-800' },
]

const MOCK_SCHEDULES: ScheduleFormData[] = [
  { id: 'sc1', employeeId: '1', employeeName: 'Ahmad Fauzi', date: '2026-08-12', shiftId: 's1', shiftName: 'Morning Shift', status: 'scheduled' },
  { id: 'sc2', employeeId: '2', employeeName: 'Budi Santoso', date: '2026-08-12', shiftId: 's1', shiftName: 'Morning Shift', status: 'scheduled' },
  { id: 'sc3', employeeId: '3', employeeName: 'Citra Dewi', date: '2026-08-12', shiftId: 's2', shiftName: 'Afternoon Shift', status: 'scheduled' },
  { id: 'sc4', employeeId: '1', employeeName: 'Ahmad Fauzi', date: '2026-08-13', shiftId: 's2', shiftName: 'Afternoon Shift', status: 'scheduled' },
  { id: 'sc5', employeeId: '2', employeeName: 'Budi Santoso', date: '2026-08-13', shiftId: 's1', shiftName: 'Morning Shift', status: 'scheduled' },
  { id: 'sc6', employeeId: '4', employeeName: 'Dedi Kurniawan', date: '2026-08-12', shiftId: 's3', shiftName: 'Night Shift', status: 'scheduled' },
  { id: 'sc7', employeeId: '5', employeeName: 'Eka Pratama', date: '2026-08-12', shiftId: 's1', shiftName: 'Morning Shift', status: 'completed' },
  { id: 'sc8', employeeId: '6', employeeName: 'Fitri Handayani', date: '2026-08-13', shiftId: 's3', shiftName: 'Night Shift', status: 'scheduled' },
]

type ViewMode = 'calendar' | 'list'

export default function SchedulesPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('calendar')
  const [currentDate, setCurrentDate] = useState(new Date(2026, 7, 12)) // August 2026
  const [schedules, setSchedules] = useState<ScheduleFormData[]>(MOCK_SCHEDULES)

  // Modal states
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false)
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Filter states
  const [filterEmployee, setFilterEmployee] = useState('')
  const [filterStartDate, setFilterStartDate] = useState('')
  const [filterEndDate, setFilterEndDate] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  // Calculate calendar days
  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()

    const firstDayOfMonth = new Date(year, month, 1)
    const lastDayOfMonth = new Date(year, month + 1, 0)
    const startDay = firstDayOfMonth.getDay() // 0 = Sunday
    const totalDays = lastDayOfMonth.getDate()

    const days: Date[] = []

    // Add days from previous month to fill first week
    const prevMonthLastDay = new Date(year, month, 0).getDate()
    for (let i = startDay - 1; i >= 0; i--) {
      days.push(new Date(year, month - 1, prevMonthLastDay - i))
    }

    // Add days of current month
    for (let i = 1; i <= totalDays; i++) {
      days.push(new Date(year, month, i))
    }

    // Add days from next month to fill last week
    const remainingDays = 42 - days.length // 6 weeks = 42 days
    for (let i = 1; i <= remainingDays; i++) {
      days.push(new Date(year, month + 1, i))
    }

    return days
  }, [currentDate])

  // Filtered schedules
  const filteredSchedules = useMemo(() => {
    return schedules.filter(schedule => {
      const matchesEmployee = !filterEmployee || schedule.employeeId === filterEmployee
      const matchesStartDate = !filterStartDate || schedule.date >= filterStartDate
      const matchesEndDate = !filterEndDate || schedule.date <= filterEndDate
      return matchesEmployee && matchesStartDate && matchesEndDate
    })
  }, [schedules, filterEmployee, filterStartDate, filterEndDate])

  // Get schedules for a specific date
  const getSchedulesForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0]
    return filteredSchedules.filter(s => s.date === dateStr)
  }

  // Get schedules for list view (grouped by date)
  const schedulesByDate = useMemo(() => {
    const grouped = new Map<string, ScheduleFormData[]>()

    filteredSchedules.forEach(schedule => {
      if (!grouped.has(schedule.date)) {
        grouped.set(schedule.date, [])
      }
      grouped.get(schedule.date)!.push(schedule)
    })

    return Array.from(grouped.entries())
      .sort((a, b) => a[0].localeCompare(b[0]))
  }, [filteredSchedules])

  // Navigation functions
  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev)
      if (direction === 'prev') {
        newDate.setMonth(newDate.getMonth() - 1)
      } else {
        newDate.setMonth(newDate.getMonth() + 1)
      }
      return newDate
    })
  }

  const goToToday = () => {
    setCurrentDate(new Date())
  }

  // Form submission handlers
  const handleScheduleSubmit = (data: ScheduleFormData & { _bulk?: ScheduleFormData[] }) => {
    setIsLoading(true)

    setTimeout(() => {
      if (data._bulk) {
        // Bulk assignment
        setSchedules(prev => [...prev, ...data._bulk!])
        setIsBulkModalOpen(false)
      } else {
        // Single assignment
        if (data.id) {
          // Update existing
          setSchedules(prev => prev.map(s => s.id === data.id ? data : s))
        } else {
          // Create new
          setSchedules(prev => [...prev, { ...data, id: `sc${Date.now()}` }])
        }
        setIsAssignModalOpen(false)
      }
      setIsLoading(false)
    }, 500)
  }

  const handleDeleteSchedule = (scheduleId: string) => {
    if (confirm('Are you sure you want to delete this schedule?')) {
      setSchedules(prev => prev.filter(s => s.id !== scheduleId))
    }
  }

  // Get shift color
  const getShiftColor = (shiftId: string) => {
    return MOCK_SHIFTS.find(s => s.id === shiftId)?.color || 'bg-gray-100 text-gray-800'
  }

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Schedule Management</h1>
          <p className="text-sm text-gray-500 mt-1">Manage employee work schedules and shift assignments</p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="md"
            icon={<Plus className="w-5 h-5" />}
            onClick={() => setIsAssignModalOpen(true)}
          >
            Assign Schedule
          </Button>
          <Button
            variant="primary"
            size="md"
            icon={<CalendarDays className="w-5 h-5" />}
            onClick={() => setIsBulkModalOpen(true)}
          >
            Bulk Assign
          </Button>
        </div>
      </div>

      {/* Controls Bar */}
      <Card className="!p-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* View Toggle & Date Navigation */}
          <div className="flex items-center gap-3">
            {/* View Toggle */}
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('calendar')}
                className={`p-2 transition-colors ${viewMode === 'calendar' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                aria-label="Calendar view"
              >
                <Calendar className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 transition-colors ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                aria-label="List view"
              >
                <List className="w-5 h-5" />
              </button>
            </div>

            {/* Date Navigation */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigateMonth('prev')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Previous month"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="font-semibold text-gray-900 min-w-[150px] text-center">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </span>
              <button
                onClick={() => navigateMonth('next')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Next month"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <button
                onClick={goToToday}
                className="px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                Today
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                showFilters ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Employee</label>
                <select
                  value={filterEmployee}
                  onChange={(e) => setFilterEmployee(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Employees</option>
                  {MOCK_EMPLOYEES.map(emp => (
                    <option key={emp.id} value={emp.id}>{emp.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <input
                  type="date"
                  value={filterStartDate}
                  onChange={(e) => setFilterStartDate(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                <input
                  type="date"
                  value={filterEndDate}
                  onChange={(e) => setFilterEndDate(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="mt-3 flex items-center justify-end gap-2">
              <button
                onClick={() => {
                  setFilterEmployee('')
                  setFilterStartDate('')
                  setFilterEndDate('')
                }}
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}
      </Card>

      {/* Calendar View */}
      {viewMode === 'calendar' && (
        <Card>
          {/* Calendar Header */}
          <div className="grid grid-cols-7 border-b border-gray-200">
            {dayNames.map(day => (
              <div key={day} className="p-3 text-center text-sm font-semibold text-gray-700 bg-gray-50">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 auto-rows-fr">
            {calendarDays.map((date, index) => {
              const isCurrentMonth = date.getMonth() === currentDate.getMonth()
              const isToday = date.toDateString() === new Date().toDateString()
              const dateSchedules = getSchedulesForDate(date)
              const dateStr = date.toISOString().split('T')[0]

              return (
                <div
                  key={index}
                  className={`min-h-24 p-2 border-r border-b border-gray-200 ${
                    !isCurrentMonth ? 'bg-gray-50' : ''
                  }`}
                >
                  <div className={`text-sm font-medium mb-2 ${
                    !isCurrentMonth ? 'text-gray-400' : 'text-gray-700'
                  } ${isToday ? 'bg-blue-600 text-white w-7 h-7 rounded-full flex items-center justify-center' : ''}`}>
                    {date.getDate()}
                  </div>

                  <div className="space-y-1">
                    {dateSchedules.slice(0, 3).map(schedule => (
                      <div
                        key={schedule.id}
                        className={`text-xs px-2 py-1 rounded truncate cursor-pointer hover:opacity-80 ${getShiftColor(schedule.shiftId)}`}
                        title={`${schedule.employeeName} - ${schedule.shiftName}`}
                      >
                        {schedule.employeeName}
                      </div>
                    ))}
                    {dateSchedules.length > 3 && (
                      <div className="text-xs text-gray-500 px-2">
                        +{dateSchedules.length - 3} more
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </Card>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <Card>
          <div className="space-y-4">
            {schedulesByDate.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600">No schedules found</p>
                <p className="text-sm text-gray-500 mt-1">Try adjusting your filters or assign new schedules</p>
              </div>
            ) : (
              schedulesByDate.map(([date, daySchedules]) => (
                <div key={date} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-4 py-2 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-600" />
                    <span className="font-semibold text-gray-700">
                      {new Date(date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                    <span className="text-sm text-gray-500">({daySchedules.length} schedules)</span>
                  </div>

                  <div className="divide-y divide-gray-200">
                    {daySchedules.map(schedule => {
                      const shift = MOCK_SHIFTS.find(s => s.id === schedule.shiftId)
                      return (
                        <div key={schedule.id} className="px-4 py-3 flex items-center justify-between hover:bg-gray-50">
                          <div className="flex-1">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-semibold">
                                {schedule.employeeName?.charAt(0) || '?'}
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">{schedule.employeeName}</p>
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                  <Clock className="w-3.5 h-3.5" />
                                  <span>{shift?.startTime} - {shift?.endTime}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className={`px-3 py-1 text-xs font-medium rounded-full ${shift?.color || 'bg-gray-100 text-gray-800'}`}>
                              {shift?.name || 'Unknown Shift'}
                            </span>
                            <button
                              onClick={() => handleDeleteSchedule(schedule.id!)}
                              className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                              aria-label="Delete schedule"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      )}

      {/* Assign Schedule Modal */}
      <Modal
        isOpen={isAssignModalOpen}
        onClose={() => setIsAssignModalOpen(false)}
        title="Assign Schedule"
        size="md"
      >
        <ScheduleForm
          employees={MOCK_EMPLOYEES}
          shifts={MOCK_SHIFTS}
          onSubmit={handleScheduleSubmit}
          onCancel={() => setIsAssignModalOpen(false)}
          isLoading={isLoading}
          mode="single"
        />
      </Modal>

      {/* Bulk Assign Modal */}
      <Modal
        isOpen={isBulkModalOpen}
        onClose={() => setIsBulkModalOpen(false)}
        title="Bulk Schedule Assignment"
        size="lg"
      >
        <ScheduleForm
          employees={MOCK_EMPLOYEES}
          shifts={MOCK_SHIFTS}
          onSubmit={handleScheduleSubmit}
          onCancel={() => setIsBulkModalOpen(false)}
          isLoading={isLoading}
          mode="bulk"
        />
      </Modal>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="!p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Schedules</p>
              <p className="text-2xl font-bold text-gray-900">{schedules.length}</p>
            </div>
          </div>
        </Card>

        <Card className="!p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">Completed</p>
              <p className="text-2xl font-bold text-gray-900">
                {schedules.filter(s => s.status === 'completed').length}
              </p>
            </div>
          </div>
        </Card>

        <Card className="!p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Pending</p>
              <p className="text-2xl font-bold text-gray-900">
                {schedules.filter(s => s.status === 'scheduled').length}
              </p>
            </div>
          </div>
        </Card>

        <Card className="!p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">Employees</p>
              <p className="text-2xl font-bold text-gray-900">{MOCK_EMPLOYEES.length}</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
