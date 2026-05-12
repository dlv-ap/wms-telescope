import { useState, useRef, useEffect } from 'react'

const facilities = [
  { id: 'all', label: 'All Facilities' },
  { id: 'del-1', label: 'Delhi FC-1' },
  { id: 'del-2', label: 'Delhi FC-2' },
  { id: 'mum-1', label: 'Mumbai FC-1' },
  { id: 'blr-1', label: 'Bangalore FC-1' },
  { id: 'hyd-1', label: 'Hyderabad FC-1' },
  { id: 'chn-1', label: 'Chennai FC-1' },
  { id: 'kol-1', label: 'Kolkata FC-1' },
]

export default function CompareFacilitiesDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState<string[]>(['all'])
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  const handleSelect = (id: string) => {
    if (id === 'all') {
      setSelected(['all'])
    } else {
      let newSelected = selected.filter(s => s !== 'all')
      if (newSelected.includes(id)) {
        newSelected = newSelected.filter(s => s !== id)
      } else {
        newSelected = [...newSelected, id]
      }
      if (newSelected.length === 0) {
        newSelected = ['all']
      }
      setSelected(newSelected)
    }
  }

  const getLabel = () => {
    if (selected.includes('all')) return 'Compare Facilities'
    if (selected.length === 1) {
      return facilities.find(f => f.id === selected[0])?.label || 'Compare Facilities'
    }
    return `${selected.length} Facilities`
  }

  return (
    <div className="relative" ref={ref}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center px-2.5 py-1.5 gap-1.5 bg-surface-white rounded border border-[#e6e6e6] cursor-pointer select-none hover:bg-[#f9f9f9] transition-colors"
      >
        <span className="material-icons-outlined text-[16px] text-text-primary">equalizer</span>
        <span className="font-sans text-[12px] leading-[16px] font-medium text-text-primary">{getLabel()}</span>
        <span className={`material-icons-outlined text-[16px] text-text-primary transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          keyboard_arrow_down
        </span>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-[#e6e6e6] rounded-lg shadow-lg z-50 min-w-[200px] py-1 max-h-[280px] overflow-y-auto">
          {facilities.map((facility) => {
            const isChecked = selected.includes(facility.id) || (facility.id !== 'all' && selected.includes('all'))
            return (
              <div
                key={facility.id}
                onClick={() => handleSelect(facility.id)}
                className="px-3 py-2.5 flex items-center gap-3 cursor-pointer hover:bg-[#f9fafb] transition-colors"
              >
                {/* Checkbox */}
                <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors
                  ${isChecked ? 'bg-[#111111] border-[#111111]' : 'border-[#d1d5db] bg-white'}`}
                >
                  {isChecked && (
                    <span className="material-icons-outlined text-[12px] text-white">check</span>
                  )}
                </div>
                <span className={`font-sans text-[13px] leading-[18px] ${isChecked ? 'font-medium text-[#111111]' : 'text-[#2b2b2b]'}`}>
                  {facility.label}
                </span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}