import SearchBar from './SearchBar'

/**
 * Top Navigation - JARVIS-style
 * Logo on left, divider, breadcrumb, then search + actions on right
 * No profile name here (profile is on sidebar bottom)
 */
export default function TopNav() {
  return (
    <header className="h-[56px] bg-[#f7f7f7] flex items-center px-5 gap-4 shrink-0">
      {/* Left: Logo text + divider + breadcrumb */}
      <div className="flex items-center gap-4">
        <span className="font-sans text-[16px] leading-[20px] font-bold text-[#111111] tracking-tight">TELESCOPE</span>
        <div className="w-px h-5 bg-[#d1d5db]" />
        <div className="flex items-center gap-1.5">
          <span className="font-sans text-[13px] leading-[16px] font-normal text-[#6b7280] cursor-pointer hover:text-[#2b2b2b]">Dashboard</span>
          <span className="font-sans text-[13px] leading-[16px] text-[#6b7280]">›</span>
          <span className="font-sans text-[13px] leading-[16px] font-medium text-[#2b2b2b]">Performance</span>
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Right: Search + Actions */}
      <div className="flex items-center gap-3">
        <SearchBar />

        {/* Notification */}
        <button className="w-9 h-9 rounded-md border border-[#e6e6e6] bg-white flex items-center justify-center cursor-pointer hover:bg-[#f9f9f9] transition-colors">
          <span className="material-icons-outlined text-[20px] text-[#2b2b2b]">notifications_none</span>
        </button>
      </div>
    </header>
  )
}