import { useState, useRef } from 'react'

interface TooltipProps {
  content: string
  children: React.ReactNode
}

export default function Tooltip({ content, children }: TooltipProps) {
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
      {children}
      {visible && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 pointer-events-none">
          <div className="bg-btn-dark text-btn-darkText text-10 font-normal px-3 py-2 rounded-md shadow-lg w-[200px] text-center leading-[14px] whitespace-normal">
            {content}
          </div>
          {/* Arrow */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-btn-dark" />
        </div>
      )}
    </div>
  )
}