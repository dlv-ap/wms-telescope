export default function SideNav() {
  return (
    <nav className="w-[60px] h-full bg-surface-white border-r border-border-default flex flex-col items-center py-2 px-2 gap-2 shrink-0">
      {/* Logo */}
      <div className="w-[44px] h-[50px] flex items-center justify-center">
        <div className="w-7 h-7 bg-black rounded flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 28 28" fill="none">
            <path d="M14 5L7 9v10l7 4 7-4V9l-7-4z" fill="#ed1b36"/>
          </svg>
        </div>
      </div>

      {/* Nav Items */}
      <div className="flex flex-col items-center gap-0 flex-1">
        <NavItem icon="menu" />
        <NavItem icon="warehouse" />
        <NavItem icon="local_shipping" />
        <NavItem icon="save_alt" />
        <NavItem icon="help_outline" />
      </div>

      {/* Bottom */}
      <div className="mt-auto">
        <NavItem icon="logout" />
      </div>
    </nav>
  )
}

function NavItem({ icon, active = false }: { icon: string; active?: boolean }) {
  return (
    <button
      className={`w-[44px] h-[36px] rounded-lg flex items-center justify-center cursor-pointer transition-colors
        ${active ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
    >
      <span className="material-icons-outlined text-[20px] text-text-primary">
        {icon}
      </span>
    </button>
  )
}