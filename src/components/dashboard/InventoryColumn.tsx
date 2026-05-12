/**
 * Inventory Column (Right) - matches Figma node 919:26759
 * Title: Noto Sans 16px/24px Bold, color #111111
 * Cards: white bg, border 1px #e6e6e6, rounded 8px
 *   Top bar: 6px height, 5% opacity colored fill
 *     Ageing: #3d00b0 at 5% opacity
 *     Rejected: #8e0002 at 5% opacity
 *     Upcoming Expiry: #ff0061 at 5% opacity
 *   Title: Noto Sans 12px/16px SemiBold, color #2b2b2b
 *   Count: Noto Sans 16px/24px SemiBold, color #1f222e
 *   SKU: Noto Sans 12px/16px Regular, color #8f9198
 *   Sub-items: label 12px/16px Regular, info icon 12px #1d7dd1
 */
import InfoIcon from '../ui/InfoIcon'

export default function InventoryColumn() {
  return (
    <div className="w-[301px] shrink-0 flex flex-col gap-3">
      <h2 className="font-sans text-[16px] leading-[24px] font-bold text-[#111111]">INVENTORY</h2>

      {/* Ageing Inventory */}
      <InventoryCard
        barColor="rgba(61, 0, 176, 0.05)"
        title="Ageing Inventory"
        count="3,348"
        sku="32 SKUs"
        subItems={[
          { label: 'Slow Moving', count: '3,000', sku: '24 SKUs', tooltip: 'Items with no sales in the last 90 days' },
          { label: 'Non-Moving', count: '348', sku: '13 SKUs', tooltip: 'Items with no sales in the last 180 days' },
        ]}
      />

      {/* Rejected */}
      <InventoryCard
        barColor="rgba(142, 0, 2, 0.05)"
        title="Rejected"
        count="1,593"
        sku="29 SKUs"
        subItems={[
          { label: 'Damaged Items', count: '1,000', sku: '19 SKUs', tooltip: 'Items rejected due to physical damage during handling' },
          { label: 'Expired Items', count: '593', sku: '12 SKUs', tooltip: 'Items past their expiry date, pending disposal' },
        ]}
      />

      {/* Upcoming Expiry */}
      <InventoryCard
        barColor="rgba(255, 0, 97, 0.05)"
        title="Upcoming Expiry"
        count="1,231"
        sku="47 SKUs"
      />
    </div>
  )
}

interface SubItem {
  label: string
  count: string
  sku: string
  tooltip?: string
}

function InventoryCard({ barColor, title, count, sku, subItems }: {
  barColor: string
  title: string
  count: string
  sku: string
  subItems?: SubItem[]
}) {
  return (
    <div className="bg-surface-white border border-border-default rounded-lg overflow-hidden">
      {/* Top color bar */}
      <div className="h-1.5 w-full" style={{ backgroundColor: barColor }} />

      {/* Content */}
      <div className="py-3 pr-2 pl-4 flex flex-col gap-2">
        {/* Header row */}
        <div className="flex items-center gap-2">
          <span className="font-sans text-[12px] leading-[16px] font-semibold text-[#2b2b2b] flex-1">{title}</span>
          <div className="flex flex-col items-end">
            <span className="font-sans text-[16px] leading-[24px] font-semibold text-[#1f222e]">{count}</span>
            <span className="font-sans text-[12px] leading-[16px] font-normal text-[#8f9198]">{sku}</span>
          </div>
          <span className="material-icons-outlined text-[20px] text-text-primary">keyboard_arrow_right</span>
        </div>

        {/* Sub items */}
        {subItems && subItems.length > 0 && (
          <>
            <div className="h-px bg-border-default -mx-2 -ml-4" style={{ width: 'calc(100% + 24px)' }} />
            <div className="flex flex-col gap-4">
              {subItems.map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <span className="font-sans text-[12px] leading-[16px] font-normal text-[#2b2b2b]">{item.label}</span>
                    <InfoIcon tooltip={item.tooltip || `Details about ${item.label}`} />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex flex-col items-end">
                      <span className="font-sans text-[12px] leading-[16px] font-semibold text-[#111111]">{item.count}</span>
                      <span className="font-sans text-[12px] leading-[16px] font-normal text-[#8f9198]">{item.sku}</span>
                    </div>
                    <span className="material-icons-outlined text-[20px] text-text-primary">keyboard_arrow_right</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}