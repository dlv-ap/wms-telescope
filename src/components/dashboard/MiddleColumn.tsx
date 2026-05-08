export default function MiddleColumn() {
  return (
    <div className="flex-1 flex flex-col gap-6">
      {/* Outbound SLA */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center gap-2.5">
          <span className="font-sans text-16 font-bold text-text-heading">OUTBOUND - SLA</span>
          <span className="material-icons-outlined text-[20px] text-text-primary">keyboard_arrow_right</span>
        </div>
        <SLACard items={[
          { value: '92%', label: 'O2D Adherence', isRed: false, tooltip: 'Order to Delivery adherence — % of orders delivered within committed TAT' },
          { value: '72%', label: 'O2S Adherence', isRed: false, tooltip: 'Order to Ship adherence — % of orders shipped within committed time' },
          { value: '54%', label: 'S2D Adherence', isRed: true, tooltip: 'Ship to Delivery adherence — % of shipments delivered after dispatch within TAT' },
        ]} />
      </section>

      {/* Warehouse Operations */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center gap-2.5">
          <span className="font-sans text-16 font-bold text-text-heading">WAREHOUSE OPERATIONS</span>
          <span className="material-icons-outlined text-[20px] text-text-primary">keyboard_arrow_right</span>
        </div>
        <SLACard items={[
          { value: '92%', label: 'Contracted Capacity Used', isRed: false, tooltip: '% of contracted warehouse storage capacity currently in use' },
          { value: '92%', label: 'Dock to Putaway', isRed: false, tooltip: '% of items moved from dock to storage within target time' },
          { value: '42%', label: 'Warehouse Space Used', isRed: true, tooltip: '% of total warehouse floor space currently occupied' },
        ]} />
      </section>

      {/* Need Help */}
      <section className="flex flex-col gap-3">
        <span className="font-sans text-16 font-bold text-text-heading">NEED HELP?</span>
        <div className="bg-surface-white border border-border-default rounded-md p-4 flex flex-col gap-4">
          <HelpItem text="List >48h in-transit shipments" />
          <div className="h-px bg-border-default" />
          <HelpItem text="Give me a CSV of all breached shipments for last week" />
          <div className="h-px bg-border-default" />
          <HelpItem text="Which lanes/centers are worst on TAT breach in the last 7 days?" />
        </div>
      </section>
    </div>
  )
}

import InfoIcon from '../ui/InfoIcon'

function SLACard({ items }: { items: { value: string; label: string; isRed: boolean; tooltip: string }[] }) {
  return (
    <div className="flex bg-surface-white border border-border-default rounded-md p-5 gap-6">
      {items.map((item, i) => (
        <div key={i} className="flex items-start gap-6 flex-1">
          <div className="flex flex-col gap-2 flex-1">
            <span className={`text-20 font-semibold ${item.isRed ? 'text-status-error' : 'text-text-dark'}`}>
              {item.value}
            </span>
            <div className="flex items-start gap-1">
              <span className="text-12 font-semibold text-text-heading">{item.label}</span>
              <InfoIcon tooltip={item.tooltip} />
            </div>
          </div>
          {i < items.length - 1 && <div className="w-px bg-border-default self-stretch" />}
        </div>
      ))}
    </div>
  )
}

function HelpItem({ text }: { text: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-12 font-normal text-text-heading">{text}</span>
      <span className="material-icons-outlined text-[20px] text-text-primary">keyboard_arrow_right</span>
    </div>
  )
}