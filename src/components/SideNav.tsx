import { useState } from 'react'

/**
 * Side Navigation - Expandable JARVIS-style
 * Collapsed: 56px, icons only
 * Expanded: 220px, icons + labels (on hover or click)
 * Icons stay in same position when expanded
 * Profile avatar at bottom
 */

const navItems = [
  { icon: 'menu', label: 'Menu' },
  { icon: 'warehouse', label: 'Warehouse' },
  { icon: 'local_shipping', label: 'Shipments' },
  { icon: 'save_alt', label: 'Reports' },
  { icon: 'help_outline', label: 'Help' },
]

export default function SideNav() {
  const [expanded, setExpanded] = useState(false)

  return (
    <nav
      className={`h-full bg-[#f7f7f7] flex flex-col items-start pt-3 pb-3 px-2 shrink-0 transition-all duration-200 ease-in-out overflow-hidden
        ${expanded ? 'w-[220px]' : 'w-[56px]'}`}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-[6px] mb-6 h-8">
        <div className="w-8 h-8 bg-black rounded flex items-center justify-center shrink-0">
          <svg width="18" height="18" viewBox="0 0 28 28" fill="none">
            <path d="M14 5L7 9v10l7 4 7-4V9l-7-4z" fill="#ed1b36"/>
          </svg>
        </div>
        {expanded && (
          <span className="font-heading text-[14px] font-bold text-[#111111] whitespace-nowrap">
            TELESCOPE
          </span>
        )}
      </div>

      {/* Nav Items */}
      <div className="flex flex-col gap-1 flex-1 w-full">
        {navItems.map((item, i) => (
          <NavCell key={i} icon={item.icon} label={item.label} active={i === 0} expanded={expanded} />
        ))}
      </div>

      {/* Bottom: Profile Avatar */}
      <div className="mt-auto flex items-center gap-3 px-[6px] w-full">
        <div className="w-9 h-9 rounded-full overflow-hidden cursor-pointer shrink-0">
          <img
            src="https://i.pravatar.cc/36?u=sahil"
            alt="Sahil Anand"
            className="w-full h-full object-cover"
          />
        </div>
        {expanded && (
          <div className="flex flex-col">
            <span className="font-sans text-[12px] leading-[16px] font-medium text-[#2b2b2b] whitespace-nowrap">Sahil Anand</span>
            <span className="font-sans text-[10px] leading-[14px] font-normal text-[#6b7280] whitespace-nowrap">Havells India</span>
          </div>
        )}
      </div>
    </nav>
  )
}

function NavCell({ icon, label, active = false, expanded }: { icon: string; label: string; active?: boolean; expanded: boolean }) {
  return (
    <button
      className={`w-full h-10 rounded-lg flex items-center gap-3 px-[6px] cursor-pointer transition-colors border-none outline-none
        ${active ? 'bg-white shadow-sm' : 'bg-transparent hover:bg-white/60'}`}
    >
      <div className="w-[28px] h-[28px] flex items-center justify-center shrink-0">
        <span className={`material-icons-outlined text-[22px] ${active ? 'text-[#111111]' : 'text-[#6b7280]'}`}>
          {icon}
        </span>
      </div>
      {expanded && (
        <span className={`font-sans text-[13px] leading-[18px] whitespace-nowrap ${active ? 'font-medium text-[#111111]' : 'font-normal text-[#4b5563]'}`}>
          {label}
        </span>
      )}
    </button>
  )
}