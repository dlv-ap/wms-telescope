/**
 * Middle Column - matches Figma nodes:
 *   919:26642 - OUTBOUND - SLA section
 *   919:26685 - WAREHOUSE OPERATIONS section
 *   919:26728 - NEED HELP? section
 *
 * SLA Card: white bg, border #e6e6e6, rounded 6px, padding 20px
 * Values: Noto Sans 20px/26px SemiBold, color #1f222e (or #b71132 for red)
 * Labels: Noto Sans 12px/16px SemiBold, color #111111
 * Info icon: 12px, color #1d7dd1
 * Dividers: 1px vertical, color #e6e6e6
 */
import InfoIcon from '../ui/InfoIcon'

export default function MiddleColumn() {
  return (
    <div className="flex-1 flex flex-col gap-6">
      {/* Outbound SLA */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center gap-2.5">
          <span className="font-sans text-[16px] leading-[24px] font-bold text-[#111111]">OUTBOUND - SLA</span>
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
          <span className="font-sans text-[16px] leading-[24px] font-bold text-[#111111]">WAREHOUSE OPERATIONS</span>
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
        <span className="font-sans text-[16px] leading-[24px] font-bold text-[#111111]">NEED HELP?</span>
        <div className="bg-surface-white border border-border-default rounded-md p-4 flex flex-col gap-[15px]">
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

/**
 * SLA Card - white bg, border 1px #e6e6e6, rounded 6px, padding 20px
 * 3 items separated by vertical dividers
 */
function SLACard({ items }: { items: { value: string; label: string; isRed: boolean; tooltip: string }[] }) {
  return (
    <div className="flex bg-surface-white border border-border-default rounded-md p-5">
      {items.map((item, i) => (
        <div key={i} className="flex items-start flex-1">
          <div className="flex flex-col gap-2 flex-1">
            <span className={`font-sans text-[20px] leading-[26px] font-semibold ${item.isRed ? 'text-[#b71132]' : 'text-[#1f222e]'}`}>
              {item.value}
            </span>
            <div className="flex items-start gap-1">
              <span className="font-sans text-[12px] leading-[16px] font-semibold text-[#111111]">{item.label}</span>
              <InfoIcon tooltip={item.tooltip} />
            </div>
          </div>
          {i < items.length - 1 && <div className="w-px bg-border-default self-stretch mx-6" />}
        </div>
      ))}
    </div>
  )
}

/**
 * Help Item - Noto Sans 12px/16px Regular, color #111111
 * Arrow: 20px, color #2b2b2b
 */
function HelpItem({ text }: { text: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="font-sans text-[12px] leading-[16px] font-normal text-[#111111]">{text}</span>
      <span className="material-icons-outlined text-[20px] text-text-primary shrink-0">keyboard_arrow_right</span>
    </div>
  )
}