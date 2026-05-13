import { useState, useRef } from 'react'

interface InfoIconProps {
  tooltip: string
}

export default function InfoIcon({ tooltip }: InfoIconProps) {
  const [visible, setVisible] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const show = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setVisible(true)
  }

  const hide = () => {
    timeoutRef.current = setTimeout(() => setVisible(false), 150)
  }

  return (
    <div className="relative inline-flex" onMouseEnter={show} onMouseLeave={hide}>
      <span className="material-icons-outlined text-[12px] text-[#1d7dd1] pt-[3px] cursor-help">
        info
      </span>
      {visible && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 pointer-events-none">
          <div className="bg-[#0c0c0c] text-[#f2f2f2] text-[10px] font-normal px-3 py-2 rounded-md shadow-lg w-[200px] text-center leading-[14px] whitespace-normal font-sans">
            {tooltip}
          </div>
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-[#0c0c0c]" />
        </div>
      )}
    </div>
  )
}