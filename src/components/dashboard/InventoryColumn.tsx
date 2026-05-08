import InfoIcon from '../ui/InfoIcon'

export default function InventoryColumn() {
  return (
    <div className="w-[301px] shrink-0 flex flex-col gap-3">
      <h2 className="font-sans text-16 font-bold text-text-heading">INVENTORY</h2>

      {/* Ageing Inventory */}
      <InventoryCard
        barColor="bg-[#3d00b0]/5"
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
        barColor="bg-[#8e0002]/5"
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
        barColor="bg-[#ff0061]/5"
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
      <div className={`h-1.5 w-full ${barColor}`} />

      <div className="p-3 pl-4 flex flex-col gap-2">
        {/* Header row */}
        <div className="flex items-center gap-2">
          <span className="text-12 font-semibold text-text-primary flex-1">{title}</span>
          <div className="flex flex-col items-end">
            <span className="text-16 font-semibold text-text-dark">{count}</span>
            <span className="text-12 font-normal text-text-description">{sku}</span>
          </div>
          <span className="material-icons-outlined text-[20px] text-text-primary">keyboard_arrow_right</span>
        </div>

        {/* Sub items */}
        {subItems && subItems.length > 0 && (
          <>
            <div className="h-px bg-border-default -mx-4 -ml-4" />
            <div className="flex flex-col gap-4">
              {subItems.map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <span className="text-12 font-normal text-text-primary">{item.label}</span>
                    <InfoIcon tooltip={item.tooltip || `Details about ${item.label}`} />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex flex-col items-end">
                      <span className="text-12 font-semibold text-text-heading">{item.count}</span>
                      <span className="text-12 font-normal text-text-description">{item.sku}</span>
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