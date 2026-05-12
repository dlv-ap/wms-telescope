import { useState, useRef, useEffect } from 'react'

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

type QuickOption = 'today' | 'yesterday' | 'last7' | 'last30' | 'custom'

function getToday() { return new Date(2025, 11, 10) } // 10 Dec 2025 as per design

function addDays(date: Date, days: number) {
  const d = new Date(date)
  d.setDate(d.getDate() + days)
  return d
}

export default function DatePickerDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const [startDate, setStartDate] = useState<Date>(getToday())
  const [endDate, setEndDate] = useState<Date>(getToday())
  const [quickOption, setQuickOption] = useState<QuickOption>('today')
  const [viewMonth, setViewMonth] = useState(11)
  const [viewYear, setViewYear] = useState(2025)
  const [customPickingStart, setCustomPickingStart] = useState(true) // true = picking start, false = picking end
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    if (isOpen) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  const applyQuickOption = (opt: QuickOption) => {
    const today = getToday()
    setQuickOption(opt)
    switch (opt) {
      case 'today':
        setStartDate(today); setEndDate(today); setIsOpen(false); break
      case 'yesterday':
        const y = addDays(today, -1)
        setStartDate(y); setEndDate(y); setIsOpen(false); break
      case 'last7':
        setStartDate(addDays(today, -6)); setEndDate(today); setIsOpen(false); break
      case 'last30':
        setStartDate(addDays(today, -29)); setEndDate(today); setIsOpen(false); break
      case 'custom':
        setCustomPickingStart(true); break
    }
  }

  const handleDayClick = (day: number) => {
    const clicked = new Date(viewYear, viewMonth, day)
    if (quickOption === 'custom') {
      if (customPickingStart) {
        setStartDate(clicked)
        setEndDate(clicked)
        setCustomPickingStart(false)
      } else {
        if (clicked < startDate) {
          setEndDate(startDate)
          setStartDate(clicked)
        } else {
          setEndDate(clicked)
        }
        setCustomPickingStart(true)
      }
    } else {
      setStartDate(clicked)
      setEndDate(clicked)
      setQuickOption('today')
      setIsOpen(false)
    }
  }

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(viewYear - 1) }
    else setViewMonth(viewMonth - 1)
  }

  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(viewYear + 1) }
    else setViewMonth(viewMonth + 1)
  }

  const getDaysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate()
  const getFirstDayOfMonth = (month: number, year: number) => new Date(year, month, 1).getDay()

  const daysInMonth = getDaysInMonth(viewMonth, viewYear)
  const firstDay = getFirstDayOfMonth(viewMonth, viewYear)

  const formatDate = (date: Date) => {
    const d = date.getDate()
    const m = MONTHS[date.getMonth()].slice(0, 3)
    const y = date.getFullYear()
    return `${d} ${m} ${y}`
  }

  const isSameDay = (a: Date, b: Date) =>
    a.getDate() === b.getDate() && a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear()

  const isInRange = (day: number) => {
    const d = new Date(viewYear, viewMonth, day)
    return d > startDate && d < endDate
  }

  const isStart = (day: number) => {
    const d = new Date(viewYear, viewMonth, day)
    return isSameDay(d, startDate)
  }

  const isEnd = (day: number) => {
    const d = new Date(viewYear, viewMonth, day)
    return isSameDay(d, endDate)
  }

  const isRange = !isSameDay(startDate, endDate)

  const getLabel = () => {
    const today = getToday()
    if (isSameDay(startDate, endDate)) {
      if (isSameDay(startDate, today)) return `Today: ${formatDate(startDate)}`
      return formatDate(startDate)
    }
    return `${formatDate(startDate)} - ${formatDate(endDate)}`
  }

  return (
    <div className="relative" ref={ref}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center px-2.5 py-1.5 gap-1.5 bg-surface-white rounded border border-[#e6e6e6] cursor-pointer select-none hover:bg-[#f9f9f9] transition-colors"
      >
        <span className="material-icons-outlined text-[16px] text-text-primary">calendar_today</span>
        <span className="font-sans text-[12px] leading-[16px] font-medium text-text-primary">
          {getLabel()}
        </span>
        <span className={`material-icons-outlined text-[16px] text-text-primary transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          keyboard_arrow_down
        </span>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-[#e6e6e6] rounded-lg shadow-lg z-50 w-[280px] p-4">
          {/* Month/Year header */}
          <div className="flex items-center justify-between mb-3">
            <button onClick={prevMonth} className="w-7 h-7 rounded flex items-center justify-center hover:bg-[#f3f4f6] transition-colors">
              <span className="material-icons-outlined text-[18px] text-[#6b7280]">chevron_left</span>
            </button>
            <span className="font-sans text-[13px] leading-[18px] font-semibold text-[#111111]">
              {MONTHS[viewMonth]} {viewYear}
            </span>
            <button onClick={nextMonth} className="w-7 h-7 rounded flex items-center justify-center hover:bg-[#f3f4f6] transition-colors">
              <span className="material-icons-outlined text-[18px] text-[#6b7280]">chevron_right</span>
            </button>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 mb-1">
            {DAYS.map(day => (
              <div key={day} className="h-8 flex items-center justify-center">
                <span className="font-sans text-[11px] font-medium text-[#9ca3af]">{day}</span>
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7">
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} className="h-8" />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1
              const start = isStart(day)
              const end = isEnd(day)
              const inRange = isRange && isInRange(day)

              return (
                <div
                  key={day}
                  className={`h-8 flex items-center justify-center relative
                    ${inRange ? 'bg-[#f3f4f6]' : ''}
                    ${start && isRange ? 'rounded-l-full bg-[#f3f4f6]' : ''}
                    ${end && isRange ? 'rounded-r-full bg-[#f3f4f6]' : ''}`}
                >
                  <button
                    onClick={() => handleDayClick(day)}
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-sans transition-colors relative z-10
                      ${start || end
                        ? 'bg-[#111111] text-white font-medium'
                        : 'text-[#2b2b2b] hover:bg-[#f9fafb]'
                      }`}
                  >
                    {day}
                  </button>
                </div>
              )
            })}
          </div>

          {/* Quick options */}
          <div className="mt-3 pt-3 border-t border-[#e6e6e6] flex gap-2 flex-wrap">
            {([
              { label: 'Today', value: 'today' as QuickOption },
              { label: 'Yesterday', value: 'yesterday' as QuickOption },
              { label: 'Last 7 Days', value: 'last7' as QuickOption },
              { label: 'Last 30 Days', value: 'last30' as QuickOption },
              { label: 'Custom Range', value: 'custom' as QuickOption },
            ]).map(opt => (
              <button
                key={opt.value}
                onClick={() => applyQuickOption(opt.value)}
                className={`px-2.5 py-1 rounded border font-sans text-[11px] font-medium transition-colors
                  ${quickOption === opt.value
                    ? 'border-[#2b2b2b] bg-[#f3f4f6] text-[#111111]'
                    : 'border-[#e6e6e6] text-[#4b5563] hover:bg-[#f3f4f6]'
                  }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Custom range hint */}
          {quickOption === 'custom' && customPickingStart && (
            <div className="mt-2 font-sans text-[11px] text-[#6b7280]">
              Select start date
            </div>
          )}
          {quickOption === 'custom' && !customPickingStart && (
            <div className="mt-2 font-sans text-[11px] text-[#6b7280]">
              Select end date
            </div>
          )}
        </div>
      )}
    </div>
  )
}