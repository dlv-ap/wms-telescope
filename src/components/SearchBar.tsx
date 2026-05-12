import { useState, useRef, useEffect } from 'react'

const dropdownOptions = [
  'Order No.',
  'AWB No.',
  'LR No.',
  'Invoice No.',
  'Customer Name',
]

export default function SearchBar() {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState('Order No.')
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  const handleSelect = (option: string) => {
    setSelected(option)
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="flex items-center h-9">
        {/* Dropdown trigger */}
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center px-3 gap-1 bg-white border border-[#e6e6e6] rounded-l h-9 cursor-pointer select-none hover:bg-[#f9f9f9] transition-colors"
        >
          <span className="font-sans text-[13px] leading-[20px] font-medium text-[#2b2b2b]">{selected}</span>
          <span className={`material-icons-outlined text-[18px] text-[#2b2b2b] transition-transform ${isOpen ? 'rotate-180' : ''}`}>
            keyboard_arrow_down
          </span>
        </div>
        {/* Search field */}
        <div className="flex items-center px-3 gap-2 bg-white border border-[#e6e6e6] border-l-0 rounded-r h-9 w-[180px]">
          <span className="material-icons-outlined text-[18px] text-[#9ca3af]">search</span>
          <input
            type="text"
            placeholder="Track Order ID"
            className="border-none outline-none font-sans text-[13px] leading-[20px] font-medium text-[#2b2b2b] bg-transparent w-full placeholder:text-[#9ca3af]"
          />
        </div>
      </div>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-white border border-[#e6e6e6] rounded-md shadow-lg z-50 min-w-[160px] py-1">
          {dropdownOptions.map((option) => (
            <div
              key={option}
              onClick={() => handleSelect(option)}
              className={`px-3 py-2 font-sans text-[13px] leading-[18px] cursor-pointer transition-colors
                ${option === selected
                  ? 'bg-[#f3f4f6] font-medium text-[#111111]'
                  : 'text-[#2b2b2b] hover:bg-[#f9fafb]'
                }`}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}