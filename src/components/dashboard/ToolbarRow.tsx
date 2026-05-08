import type { DashboardTab } from '../../pages/DashboardPage'

interface ToolbarRowProps {
  activeTab: DashboardTab
  onTabChange: (tab: DashboardTab) => void
}

export default function ToolbarRow({ activeTab, onTabChange }: ToolbarRowProps) {
  return (
    <div className="flex items-center justify-between">
      {/* Tab Group */}
      <div className="flex">
        <button
          onClick={() => onTabChange('performance')}
          className={`px-5 py-2 text-14 font-medium rounded-full transition-colors
            ${activeTab === 'performance' ? 'bg-btn-dark text-btn-darkText' : 'text-text-primary hover:bg-gray-50'}`}
        >
          Performance
        </button>
        <button
          onClick={() => onTabChange('operations')}
          className={`px-5 py-2 text-14 font-medium rounded-full transition-colors
            ${activeTab === 'operations' ? 'bg-btn-dark text-btn-darkText' : 'text-text-primary hover:bg-gray-50'}`}
        >
          Operations
        </button>
      </div>

      {/* Badge Chips */}
      <div className="flex items-center gap-4">
        <BadgeChip icon="calendar_today" label="Today: 10 Dec 2025" hasArrow />
        <BadgeChip icon="equalizer" label="Compare Facilities" />
        <BadgeChip icon="widgets" label="All FCs" hasArrow />
        <BadgeChip icon="commute" label="All Transportation" />
      </div>
    </div>
  )
}

function BadgeChip({ icon, label, hasArrow = false }: { icon: string; label: string; hasArrow?: boolean }) {
  return (
    <div className="flex items-center px-2 py-1.5 gap-1 bg-surface-white rounded cursor-pointer text-12 font-medium text-text-primary">
      <span className="material-icons-outlined text-[16px]">{icon}</span>
      <span>{label}</span>
      {hasArrow && <span className="material-icons-outlined text-[16px]">keyboard_arrow_down</span>}
    </div>
  )
}