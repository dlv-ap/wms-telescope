import { useState } from 'react'

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
    <div className="flex flex-col gap-[15px] p-4 rounded-lg" style={{ background: 'linear-gradient(135deg, #fdf2f8 0%, #ede9fe 50%, #eef2ff 100%)' }}>
      <div className="flex items-center gap-1.5">
        <span className="font-sans text-[12px] leading-[16px] font-bold tracking-[0.3px] text-[#111111]">
          AI Recommendations: Operations
        </span>
      </div>
      <div className="flex gap-4">
        <AICard
          cardGradient="linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 50%, #f5f3ff 100%)"
          iconBg="#ecfdf5"
          iconColor="#059669"
          icon="trending_up"
          title="Contracted capacity hit by thursday"
          subtitle="200 Units to defer or redirect"
        />
        <AICard
          cardGradient="linear-gradient(135deg, #fffbeb 0%, #fef3c7 50%, #fdf2f8 100%)"
          iconBg="#fff6ea"
          iconColor="#f59e0b"
          icon="warning_amber"
          title="Backlog may block today's receiving"
          subtitle="Inbound shipments due today, space at 88%"
        />
        <AICard
          cardGradient="linear-gradient(135deg, #eef2ff 0%, #e0e7ff 50%, #ede9fe 100%)"
          iconBg="#eff4ff"
          iconColor="#5b80f7"
          icon="thumb_up_alt"
          title="Zone C nearly full, not audited yet"
          subtitle="Only 16% of the locations audited this cycle"
        />
      </div>
    </div>
  )
}

function AICard({ cardGradient, iconBg, iconColor, icon, title, subtitle }: {
  cardGradient: string; iconBg: string; iconColor: string; icon: string; title: string; subtitle: string
}) {
  return (
    <div
      className="flex-1 flex items-center p-4 gap-3 rounded-lg"
      style={{ background: cardGradient, border: '1px solid #e2e2e5' }}
    >
      <div
        className="w-7 h-7 rounded flex items-center justify-center shrink-0"
        style={{ backgroundColor: iconBg, border: '1px solid #e2e2e5' }}
      >
        <span className="material-icons-outlined text-[14px]" style={{ color: iconColor }}>{icon}</span>
      </div>
      <div className="flex flex-col gap-1 flex-1">
        <p className="font-sans text-[12px] leading-[18px] font-normal tracking-[0.3px] text-[#111111]">
          {title}<br/>{subtitle}
        </p>
      </div>
      <span className="material-icons-outlined text-[20px] text-text-primary shrink-0">keyboard_arrow_right</span>
    </div>
  )
}

function InboundColumn() {
  const [ageFilter, setAgeFilter] = useState<'all' | '8-24' | '24+'>('all')

  const data = {
    all: { totalPending: '43,270', pending: '22,450', received: '20,820', putAway: '12,640', pendingW: '52%', receivedW: '48%', putAwayW: '29%' },
    '8-24': { totalPending: '4,270', pending: '2,358', received: '1,420', putAway: '492', pendingW: '55%', receivedW: '33%', putAwayW: '12%' },
    '24+': { totalPending: '238', pending: '132', received: '110', putAway: '96', pendingW: '55%', receivedW: '46%', putAwayW: '40%' },
  }

  const d = data[ageFilter]

  return (
    <div className="flex-1 flex flex-col gap-3">
      <h2 className="font-sans text-[16px] leading-[24px] font-bold text-[#111111]">INBOUND</h2>

      <div className="bg-surface-white border border-border-default rounded-lg p-5 flex flex-col gap-5">
        {/* Vehicles in Yard */}
        <div className="flex items-center justify-between">
          <span className="font-sans text-[13px] leading-[18px] font-semibold text-[#2b2b2b]">Vehicles in Yard</span>
          <div className="flex items-center gap-2">
            <span className="font-sans text-[14px] leading-[20px] font-bold text-[#1f222e]">312</span>
            <span className="material-icons-outlined text-[18px] text-[#2b2b2b]">keyboard_arrow_right</span>
          </div>
        </div>

        <div className="h-px bg-[#e6e6e6]" />

        {/* Receiving Pipeline */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="font-sans text-[13px] leading-[18px] font-semibold text-[#2b2b2b]">Receiving Pipeline</span>
            <div className="flex items-center gap-2">
              <span className="font-sans text-[14px] leading-[20px] font-bold text-[#1f222e]">47,000 AGNs</span>
              <span className="material-icons-outlined text-[18px] text-[#2b2b2b]">keyboard_arrow_right</span>
            </div>
          </div>

          {/* Ageing filter badges */}
          <AgeingBadges selected={ageFilter} onSelect={setAgeFilter} />
        </div>

        <div className="h-px bg-[#e6e6e6]" />

        {/* Total Units Pending */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="font-sans text-[13px] leading-[18px] font-semibold text-[#2b2b2b]">Total Units Pending</span>
            <div className="flex items-center gap-2">
              <span className="font-sans text-[14px] leading-[20px] font-bold text-[#1f222e]">{d.totalPending}</span>
              <span className="material-icons-outlined text-[18px] text-[#2b2b2b]">keyboard_arrow_up</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <ProgressRow label="Pending" value={d.pending} width={d.pendingW} ageFilter={ageFilter} data824="2,358" data24plus="132" />
            <ProgressRow label="Received" value={d.received} width={d.receivedW} ageFilter={ageFilter} data824="1,420" data24plus="110" />
            <ProgressRow label="Put Away" value={d.putAway} width={d.putAwayW} ageFilter={ageFilter} data824="492" data24plus="96" />
          </div>
        </div>
      </div>
    </div>
  )
}

function OutboundColumn() {
  const [ageFilter, setAgeFilter] = useState<'all' | '8-24' | '24+'>('all')

  const data = {
    all: { openOrders: '1226', allocated: '268', toBePicked: '224', picked: '198', readyToPack: '172', packed: '145', readyToShip: '121', inTransit: '0' },
    '8-24': { openOrders: '120', allocated: '60', toBePicked: '30', picked: '10', readyToPack: '7', packed: '3', readyToShip: '0', inTransit: '0' },
    '24+': { openOrders: '32', allocated: '16', toBePicked: '4', picked: '3', readyToPack: '2', packed: '5', readyToShip: '2', inTransit: '0' },
  }

  const d = data[ageFilter]
  const total = parseInt(d.openOrders.replace(',', ''))

  const getWidth = (val: string) => {
    const n = parseInt(val.replace(',', ''))
    if (total === 0) return '0%'
    return `${Math.max(Math.round((n / total) * 100), n > 0 ? 5 : 0)}%`
  }

  return (
    <div className="flex-1 flex flex-col gap-3">
      <h2 className="font-sans text-[16px] leading-[24px] font-bold text-[#111111]">OUTBOUND</h2>

      <div className="bg-surface-white border border-border-default rounded-lg p-5 flex flex-col gap-5">
        {/* Verified Orders */}
        <div className="flex items-center justify-between">
          <span className="font-sans text-[13px] leading-[18px] font-semibold text-[#2b2b2b]">Verified Orders</span>
          <div className="flex items-center gap-2">
            <span className="font-sans text-[14px] leading-[20px] font-bold text-[#1f222e]">312</span>
            <span className="material-icons-outlined text-[18px] text-[#2b2b2b]">keyboard_arrow_right</span>
          </div>
        </div>

        {/* Ageing filter badges */}
        <AgeingBadges selected={ageFilter} onSelect={setAgeFilter} />

        <div className="h-px bg-[#e6e6e6]" />

        {/* Open Orders */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="font-sans text-[13px] leading-[18px] font-semibold text-[#2b2b2b]">Open Orders</span>
            <div className="flex items-center gap-2">
              <span className="font-sans text-[14px] leading-[20px] font-bold text-[#1f222e]">{d.openOrders}</span>
              <span className="material-icons-outlined text-[18px] text-[#2b2b2b]">keyboard_arrow_up</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <ProgressRow label="Allocated" value={d.allocated} width={getWidth(d.allocated)} ageFilter={ageFilter} data824="60" data24plus="16" />
            <ProgressRow label="To Be Picked" value={d.toBePicked} width={getWidth(d.toBePicked)} ageFilter={ageFilter} data824="30" data24plus="4" />
            <ProgressRow label="Picked" value={d.picked} width={getWidth(d.picked)} ageFilter={ageFilter} data824="10" data24plus="3" />
            <ProgressRow label="Ready To Pack" value={d.readyToPack} width={getWidth(d.readyToPack)} ageFilter={ageFilter} data824="7" data24plus="2" />
            <ProgressRow label="Packed" value={d.packed} width={getWidth(d.packed)} ageFilter={ageFilter} data824="3" data24plus="5" />
            <ProgressRow label="Ready To Ship" value={d.readyToShip} width={getWidth(d.readyToShip)} ageFilter={ageFilter} data824="0" data24plus="2" />
            <ProgressRow label="In-Transit" value={d.inTransit} width={getWidth(d.inTransit)} ageFilter={ageFilter} data824="0" data24plus="0" />
          </div>
        </div>
      </div>
    </div>
  )
}

type AgeFilter = 'all' | '8-24' | '24+'

function AgeingBadges({ selected, onSelect }: { selected: AgeFilter; onSelect: (f: AgeFilter) => void }) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onSelect('all')}
        className={`px-3 py-1 rounded-full font-sans text-[11px] leading-[16px] font-medium transition-colors border
          ${selected === 'all'
            ? 'bg-[#111111] text-white border-[#111111]'
            : 'bg-white text-[#2b2b2b] border-[#e6e6e6] hover:bg-[#f7f7f7]'}`}
      >
        All
      </button>
      <button
        onClick={() => onSelect('8-24')}
        className={`px-3 py-1 rounded-full font-sans text-[11px] leading-[16px] font-medium transition-colors border flex items-center gap-1
          ${selected === '8-24'
            ? 'bg-[#111111] text-white border-[#111111]'
            : 'bg-white text-[#2b2b2b] border-[#e6e6e6] hover:bg-[#f7f7f7]'}`}
      >
        <span className={`w-1.5 h-1.5 rounded-full ${selected === '8-24' ? 'bg-white' : 'bg-[#f59e0b]'}`} />
        Ageing 8-24 Hours
      </button>
      <button
        onClick={() => onSelect('24+')}
        className={`px-3 py-1 rounded-full font-sans text-[11px] leading-[16px] font-medium transition-colors border flex items-center gap-1
          ${selected === '24+'
            ? 'bg-[#111111] text-white border-[#111111]'
            : 'bg-white text-[#2b2b2b] border-[#e6e6e6] hover:bg-[#f7f7f7]'}`}
      >
        <span className={`w-1.5 h-1.5 rounded-full ${selected === '24+' ? 'bg-white' : 'bg-[#ef4444]'}`} />
        Ageing 24+ Hours
      </button>
    </div>
  )
}

function ProgressRow({ label, value, width, ageFilter, data824, data24plus }: { 
  label: string; value: string; width: string; 
  ageFilter?: 'all' | '8-24' | '24+';
  data824?: string;
  data24plus?: string;
}) {
  if (ageFilter === 'all' && data824 && data24plus) {
    // Show stacked bar with two colors for ageing segments
    const total = parseInt(value.replace(',', ''))
    const val824 = parseInt(data824.replace(',', ''))
    const val24plus = parseInt(data24plus.replace(',', ''))
    const w824 = total > 0 ? `${Math.round((val824 / total) * 100)}%` : '0%'
    const w24plus = total > 0 ? `${Math.round((val24plus / total) * 100)}%` : '0%'

    return (
      <div className="flex items-center gap-3">
        <span className="font-sans text-[12px] leading-[16px] font-normal text-[#2b2b2b] w-[90px] shrink-0">{label}</span>
        <div className="flex-1 h-[6px] bg-[#f3f4f6] rounded-full overflow-hidden flex">
          <div className="h-full bg-[#f97316]" style={{ width: w824, transition: 'width 0.3s ease' }} />
          <div className="h-full bg-[#ef4444]" style={{ width: w24plus, transition: 'width 0.3s ease' }} />
        </div>
        <div className="flex items-center gap-1">
          <span className="font-sans text-[12px] leading-[16px] font-semibold text-[#1f222e]">{value}</span>
          <span className="material-icons-outlined text-[16px] text-[#2b2b2b]">keyboard_arrow_right</span>
        </div>
      </div>
    )
  }

  // Single color bar for filtered view
  const pct = parseInt(width)
  const color = ageFilter === '8-24' ? 'bg-[#f97316]' : ageFilter === '24+' ? 'bg-[#ef4444]' : pct > 0 ? 'bg-[#f97316]' : 'bg-[#94a3b8]'

  return (
    <div className="flex items-center gap-3">
      <span className="font-sans text-[12px] leading-[16px] font-normal text-[#2b2b2b] w-[90px] shrink-0">{label}</span>
      <div className="flex-1 h-[6px] bg-[#f3f4f6] rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width, transition: 'width 0.3s ease' }} />
      </div>
      <div className="flex items-center gap-1">
        <span className="font-sans text-[12px] leading-[16px] font-semibold text-[#1f222e]">{value}</span>
        <span className="material-icons-outlined text-[16px] text-[#2b2b2b]">keyboard_arrow_right</span>
      </div>
    </div>
  )
}

function InventoryOpsColumn() {
  return (
    <div className="flex-1 flex flex-col gap-3">
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