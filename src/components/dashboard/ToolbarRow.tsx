/**
 * Toolbar Row - matches Figma node 892:18518
 * TDS Components: TabGroup (Type=Button Style, Style=Black, Size=Large, Count=2 Tabs)
 *                 Badge (Variant=White, Size=Large, Type=Solid)
 */
import type { DashboardTab } from '../../pages/DashboardPage'
import DatePickerDropdown from './DatePickerDropdown'
import AllFCsDropdown from './AllFCsDropdown'
import TransportationDropdown from './TransportationDropdown'

interface ToolbarRowProps {
  activeTab: DashboardTab
  onTabChange: (tab: DashboardTab) => void
}

export default function ToolbarRow({ activeTab, onTabChange }: ToolbarRowProps) {
  return (
    <div className="flex items-center justify-between">
      {/* Tab Group - TDS TabGroup (Type=Button Style, Style=Black, Size=Large) */}
      <div className="flex gap-0">
        <button
          onClick={() => onTabChange('performance')}
          className={`px-5 py-2 font-sans text-[14px] leading-[20px] font-medium rounded-full transition-colors
            ${activeTab === 'performance'
              ? 'bg-[#0c0c0c] text-[#f2f2f2]'
              : 'bg-transparent text-text-primary hover:bg-[#f7f7f7]'}`}
        >
          Performance
        </button>
        <button
          onClick={() => onTabChange('operations')}
          className={`px-5 py-2 font-sans text-[14px] leading-[20px] font-medium rounded-full transition-colors
            ${activeTab === 'operations'
              ? 'bg-[#0c0c0c] text-[#f2f2f2]'
              : 'bg-transparent text-text-primary hover:bg-[#f7f7f7]'}`}
        >
          Operations
        </button>
      </div>

      {/* Badge Chips */}
      <div className="flex items-center gap-4">
        <DatePickerDropdown />
        <AllFCsDropdown />
        <TransportationDropdown />
      </div>
    </div>
  )
}