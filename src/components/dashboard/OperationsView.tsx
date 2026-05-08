export default function OperationsView() {
  return (
    <div className="flex flex-col gap-5">
      {/* AI Recommendations: Operations */}
      <AIRecommendationsOps />

      {/* 3-Column Grid */}
      <div className="flex gap-5">
        <InboundColumn />
        <OutboundColumn />
        <InventoryOpsColumn />
      </div>
    </div>
  )
}

function AIRecommendationsOps() {
  return (
    <div className="flex flex-col gap-3 p-4 bg-surface-white rounded-lg">
      <div className="flex items-center gap-1.5">
        <svg width="19" height="24" viewBox="0 0 19 24" fill="none">
          <path d="M9.5 0L0 6v12l9.5 6L19 18V6L9.5 0z" fill="#111"/>
        </svg>
        <span className="font-inter text-12 font-bold tracking-[0.3px] text-text-heading capitalize">
          AI Recommendations: Operations
        </span>
      </div>
      <div className="flex gap-4">
        <AICard
          bg="bg-bg-green"
          iconBg="bg-bg-green"
          iconColor="text-accent-green"
          icon="trending_up"
          title="Contracted capacity hit by thursday"
          subtitle="200 Units to defer or redirect"
        />
        <AICard
          bg="bg-bg-yellow"
          iconBg="bg-bg-yellow"
          iconColor="text-accent-yellow"
          icon="warning_amber"
          title="Backlog may block today's receiving"
          subtitle="Inbound shipments due today, space at 88%"
        />
        <AICard
          bg="bg-bg-blue"
          iconBg="bg-bg-blue"
          iconColor="text-accent-blue"
          icon="thumb_up_alt"
          title="Zone C nearly full, not audited yet"
          subtitle="Only 16% of the locations audited this cycle"
        />
      </div>
    </div>
  )
}

function AICard({ bg, iconBg, iconColor, icon, title, subtitle }: {
  bg: string; iconBg: string; iconColor: string; icon: string; title: string; subtitle: string
}) {
  return (
    <div className={`flex-1 flex items-start p-4 gap-3 rounded-lg border border-[#e2e2e5] ${bg}`}>
      <div className={`w-7 h-7 rounded flex items-center justify-center border border-[#e2e2e5] shrink-0 ${iconBg}`}>
        <span className={`material-icons-outlined text-[14px] ${iconColor}`}>{icon}</span>
      </div>
      <div className="flex flex-col gap-2 flex-1">
        <p className="font-inter text-12 font-normal leading-[18px] tracking-[0.3px] text-text-heading">
          {title}<br/>{subtitle}
        </p>
        <a className="flex items-center gap-0.5 text-12 font-semibold text-accent-purple cursor-pointer">
          View Details
          <span className="material-icons-outlined text-[16px] text-accent-purple">keyboard_arrow_right</span>
        </a>
      </div>
    </div>
  )
}

function InboundColumn() {
  return (
    <div className="w-[297px] shrink-0 flex flex-col gap-3">
      <h2 className="font-sans text-16 font-bold text-text-heading">INBOUND</h2>

      <div className="bg-surface-white border border-border-light/70 rounded-md p-4 flex flex-col gap-4">
        {/* Vehicles in Yard */}
        <div className="flex items-center justify-between">
          <span className="text-12 font-semibold text-text-primary">Vehicles in Yard</span>
          <div className="flex items-center gap-2">
            <span className="text-14 font-semibold text-text-dark">312</span>
            <span className="material-icons-outlined text-[20px] text-text-primary">keyboard_arrow_right</span>
          </div>
        </div>

        <div className="h-px bg-border-default" />

        {/* Receiving Pipeline */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-12 font-semibold text-text-primary">Receiving Pipeline</span>
            <div className="flex items-center gap-2">
              <span className="text-14 font-semibold text-text-dark">47,000 AGNs</span>
              <span className="material-icons-outlined text-[20px] text-text-primary">keyboard_arrow_right</span>
            </div>
          </div>
          {/* Tabs */}
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 bg-btn-dark text-btn-darkText text-10 font-medium rounded-full">All</span>
            <span className="text-10 font-normal text-text-description">• Ageing 8-24 Hours</span>
            <span className="text-10 font-normal text-text-description">• Ageing 24+ Hours</span>
          </div>
        </div>

        <div className="h-px bg-border-default" />

        {/* Total Units Pending */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-12 font-semibold text-text-primary">Total Units Pending</span>
            <div className="flex items-center gap-2">
              <span className="text-14 font-semibold text-text-dark">43,270</span>
              <span className="material-icons-outlined text-[20px] text-text-primary">keyboard_arrow_up</span>
            </div>
          </div>

          {/* Progress bars */}
          <div className="flex flex-col gap-2">
            <ProgressRow label="Pending" value="22,450" color="bg-[#f97316]" width="60%" />
            <ProgressRow label="Received" value="20,820" color="bg-[#f97316]" width="50%" />
            <ProgressRow label="Put Away" value="12,640" color="bg-[#ef4444]" width="30%" />
          </div>
        </div>
      </div>
    </div>
  )
}

function ProgressRow({ label, value, color, width }: { label: string; value: string; color: string; width: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-12 font-normal text-text-primary w-[60px]">{label}</span>
      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width }} />
      </div>
      <div className="flex items-center gap-1">
        <span className="text-12 font-semibold text-text-heading">{value}</span>
        <span className="material-icons-outlined text-[16px] text-text-primary">keyboard_arrow_right</span>
      </div>
    </div>
  )
}

function OutboundColumn() {
  return (
    <div className="flex-1 flex flex-col gap-3">
      <h2 className="font-sans text-16 font-bold text-text-heading">OUTBOUND</h2>

      <div className="bg-surface-white border border-border-light/70 rounded-md p-4 flex flex-col gap-4">
        {/* Verified Orders */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-12 font-semibold text-text-primary">Verified Orders</span>
            <div className="flex items-center gap-2">
              <span className="text-14 font-semibold text-text-dark">312</span>
              <span className="material-icons-outlined text-[20px] text-text-primary">keyboard_arrow_right</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 bg-btn-dark text-btn-darkText text-10 font-medium rounded-full">All</span>
            <span className="text-10 font-normal text-text-description">• Ageing 8-24 Hours</span>
            <span className="text-10 font-normal text-text-description">• Ageing 24+ Hours</span>
          </div>
        </div>

        <div className="h-px bg-border-default" />

        {/* Open Orders */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-12 font-semibold text-text-primary">Open Orders</span>
            <div className="flex items-center gap-2">
              <span className="text-14 font-semibold text-text-dark">1226</span>
              <span className="material-icons-outlined text-[20px] text-text-primary">keyboard_arrow_right</span>
            </div>
          </div>

          {/* Order stages */}
          <div className="flex flex-col gap-2">
            <OutboundRow label="Allocated" value="268" color="bg-[#f97316]" width="22%" />
            <OutboundRow label="To Be Picked" value="224" color="bg-[#f97316]" width="18%" />
            <OutboundRow label="Picked" value="198" color="bg-[#f97316]" width="16%" />
            <OutboundRow label="Ready To Pack" value="172" color="bg-[#f97316]" width="14%" />
            <OutboundRow label="Packed" value="145" color="bg-[#f97316]" width="12%" />
            <OutboundRow label="Ready To Ship" value="121" color="bg-[#ef4444]" width="10%" />
            <OutboundRow label="In-Transit" value="0" color="bg-[#3b82f6]" width="0%" />
          </div>
        </div>
      </div>
    </div>
  )
}

function OutboundRow({ label, value, color, width }: { label: string; value: string; color: string; width: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-12 font-normal text-text-primary w-[90px] shrink-0">{label}</span>
      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width }} />
      </div>
      <div className="flex items-center gap-1">
        <span className="text-12 font-semibold text-text-heading">{value}</span>
        <span className="material-icons-outlined text-[16px] text-text-primary">keyboard_arrow_right</span>
      </div>
    </div>
  )
}

function InventoryOpsColumn() {
  return (
    <div className="w-[301px] shrink-0 flex flex-col gap-3">
      <h2 className="font-sans text-16 font-bold text-text-heading">INVENTORY</h2>

      {/* Prime Inventory */}
      <div className="bg-surface-white border border-border-default rounded-lg p-3 pl-4">
        <div className="flex items-center gap-2">
          <span className="text-12 font-semibold text-text-primary flex-1">Prime Inventory</span>
          <div className="flex flex-col items-end">
            <span className="text-16 font-semibold text-text-dark">1,09,890</span>
            <span className="text-12 font-normal text-text-description">1,862 SKUs</span>
          </div>
          <span className="material-icons-outlined text-[20px] text-text-primary">keyboard_arrow_right</span>
        </div>
      </div>

      {/* Rejected */}
      <div className="bg-surface-white border border-border-default rounded-lg p-3 pl-4">
        <div className="flex items-center gap-2">
          <span className="text-12 font-semibold text-text-primary flex-1">Rejected</span>
          <div className="flex flex-col items-end">
            <span className="text-16 font-semibold text-text-dark">1,593</span>
            <span className="text-12 font-normal text-text-description">29 SKUs</span>
          </div>
          <span className="material-icons-outlined text-[20px] text-text-primary">keyboard_arrow_right</span>
        </div>
      </div>

      {/* Upcoming Expiry */}
      <div className="bg-surface-white border border-border-default rounded-lg p-3 pl-4">
        <div className="flex items-center gap-2">
          <span className="text-12 font-semibold text-text-primary flex-1">Upcoming Expiry</span>
          <div className="flex flex-col items-end">
            <span className="text-16 font-semibold text-text-dark">1,593</span>
            <span className="text-12 font-normal text-text-description">47 SKUs</span>
          </div>
          <span className="material-icons-outlined text-[20px] text-text-primary">keyboard_arrow_right</span>
        </div>
      </div>
    </div>
  )
}