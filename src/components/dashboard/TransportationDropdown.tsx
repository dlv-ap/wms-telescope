import { useState, useRef, useEffect } from 'react'

const transportOptions = [
  { id: 'all', label: 'All Transportation' },
  { id: 'surface', label: 'Surface' },
  { id: 'express', label: 'Express' },
  { id: 'freight', label: 'Freight' },
  { id: 'part-load', label: 'Part Load' },
  { id: 'full-load', label: 'Full Truck Load' },
  { id: 'air', label: 'Air Cargo' },
]

export default function TransportationDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState<string[]>(['all'])
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
      if (newSelected.length === 0) newSelected = ['all']
      setSelected(newSelected)
    }
  }

  const getLabel = () => {
    if (selected.includes('all')) return 'All Transportation'
    if (selected.length === 1) return transportOptions.find(o => o.id === selected[0])?.label || 'All Transportation'
    return `${selected.length} Modes`
  }

  return (
    <div className="relative" ref={ref}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center px-2.5 py-1.5 gap-1.5 bg-surface-white rounded border border-[#e6e6e6] cursor-pointer select-none hover:bg-[#f9f9f9] transition-colors"
      >
        <span className="material-icons-outlined text-[16px] text-text-primary">commute</span>
        <span className="font-sans text-[12px] leading-[16px] font-medium text-text-primary">{getLabel()}</span>
        <span className={`material-icons-outlined text-[16px] text-text-primary transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          keyboard_arrow_down
        </span>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-[#e6e6e6] rounded-lg shadow-lg z-50 min-w-[200px] py-1 max-h-[280px] overflow-y-auto">
          {transportOptions.map((option) => {
            const isChecked = selected.includes(option.id) || (option.id !== 'all' && selected.includes('all'))
            return (
              <div
                key={option.id}
                onClick={() => handleSelect(option.id)}
                className="px-3 py-2.5 flex items-center gap-3 cursor-pointer hover:bg-[#f9fafb] transition-colors"
              >
                <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors
                  ${isChecked ? 'bg-[#111111] border-[#111111]' : 'border-[#d1d5db] bg-white'}`}>
                  {isChecked && <span className="material-icons-outlined text-[12px] text-white">check</span>}
                </div>
                <span className={`font-sans text-[13px] leading-[18px] ${isChecked ? 'font-medium text-[#111111]' : 'text-[#2b2b2b]'}`}>
                  {option.label}
                </span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}