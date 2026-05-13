/**
 * Toolbar Row - uses TDS TabGroup + TabCell + Badge
 */
import { TabGroup, TabCell } from '@delhivery/tarmac'
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
      {/* TDS TabGroup - Button Style */}
      <TabGroup orientation="horizontal" size="sm" tabType="button">
        <TabCell
          tabType="button"
          tabStyle="black"
          size="sm"
          title="Performance"
          isSelected={activeTab === 'performance'}
          onClick={() => onTabChange('performance')}
        />
        <TabCell
          tabType="button"
          tabStyle="black"
          size="sm"
          title="Operations"
          isSelected={activeTab === 'operations'}
          onClick={() => onTabChange('operations')}
        />
      </TabGroup>

      {/* Filter Badges */}
      <div className="flex items-center gap-4 shrink-0">
        <DatePickerDropdown />
        <AllFCsDropdown />
        <TransportationDropdown />
      </div>
    </div>
  )
}