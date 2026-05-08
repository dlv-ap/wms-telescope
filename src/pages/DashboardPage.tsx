import { useState } from 'react'
import ToolbarRow from '../components/dashboard/ToolbarRow'
import AIRecommendations from '../components/dashboard/AIRecommendations'
import DeliveryPerformance from '../components/dashboard/DeliveryPerformance'
import MiddleColumn from '../components/dashboard/MiddleColumn'
import InventoryColumn from '../components/dashboard/InventoryColumn'
import OperationsView from '../components/dashboard/OperationsView'
import FloatingAskAI from '../components/FloatingAskAI'

export type DashboardTab = 'performance' | 'operations'

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<DashboardTab>('performance')

  return (
    <div className="flex flex-col gap-5">
      <ToolbarRow activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="w-full h-px bg-border-default" />

      {activeTab === 'performance' ? (
        <>
          <AIRecommendations />
          <div className="flex gap-5">
            <DeliveryPerformance />
            <MiddleColumn />
            <InventoryColumn />
          </div>
        </>
      ) : (
        <OperationsView />
      )}

      <FloatingAskAI />
    </div>
  )
}