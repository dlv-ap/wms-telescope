/**
 * Delivery Performance (Left Column) - matches Figma node 919:26556
 * Title: Noto Sans 16px/24px Bold, color #111111
 * Card: white bg, border 1px #e1e1e1 70% opacity, rounded 6px
 * Header: "Total Orders" Noto Sans 14px/20px SemiBold center, value "2,500" 16px/24px SemiBold
 * Items: border 1px #e6e6e6, rounded 8px, padding 12px 8px 12px 20px
 *   Left color bar: 6px wide, rounded-l
 *   Icon: 20px, colored per status
 *   Label: Noto Sans 12px/16px SemiBold, color #2b2b2b
 *   Count: Noto Sans 12px/16px SemiBold, color #111111
 *   Percent: Noto Sans 12px/16px Regular, color #8f9198
 */

const deliveryItems = [
  { icon: 'phone_android', label: 'Delivered', count: '2,280', percent: '86%', iconColor: '#178c5c', barColor: '#f3faf7' },
  { icon: 'store', label: 'In Warehouse', count: '117', percent: '3.5%', iconColor: '#cca721', barColor: '#fefaec' },
  { icon: 'local_shipping', label: 'In-Transit', count: '285', percent: '8.5%', iconColor: '#cca721', barColor: '#fefaec' },
  { icon: 'keyboard_return', label: 'Return', count: '40', percent: '1.2%', iconColor: '#cca721', barColor: '#fefaec' },
  { icon: 'cancel_schedule_send', label: 'Cancelled', count: '26', percent: '0.8%', iconColor: '#b71132', barColor: '#fdf0f2' },
]

export default function DeliveryPerformance() {
  return (
    <div className="w-[297px] shrink-0 flex flex-col gap-3">
      <h2 className="font-sans text-[16px] leading-[24px] font-bold text-[#111111]">DELIVERY PERFORMANCE</h2>

      <div className="bg-surface-white rounded-md p-4 flex flex-col gap-5" style={{ border: '1px solid rgba(225, 225, 225, 0.7)' }}>
        {/* Header row */}
        <div className="flex items-center justify-between">
          <span className="font-sans text-[14px] leading-[20px] font-semibold text-[#1f222e] text-center">Total Orders </span>
          <div className="flex items-center gap-2">
            <span className="font-sans text-[16px] leading-[24px] font-semibold text-[#1f222e]">2,500</span>
            <span className="material-icons-outlined text-[20px] text-text-primary">keyboard_arrow_right</span>
          </div>
        </div>

        {/* Delivery items list */}
        <div className="flex flex-col gap-3">
          {deliveryItems.map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between py-3 pr-2 pl-5 border border-border-default rounded-lg relative"
            >
              {/* Left color bar */}
              <div
                className="absolute left-0 top-0 bottom-0 w-1.5 rounded-l-lg"
                style={{ backgroundColor: item.barColor }}
              />

              {/* Left: icon + label */}
              <div className="flex items-center gap-3">
                <span className="material-icons-outlined text-[20px]" style={{ color: item.iconColor }}>
                  {item.icon}
                </span>
                <span className="font-sans text-[12px] leading-[16px] font-semibold text-[#2b2b2b]">
                  {item.label}
                </span>
              </div>

              {/* Right: values + arrow */}
              <div className="flex items-center gap-2">
                <div className="flex flex-col items-end">
                  <span className="font-sans text-[12px] leading-[16px] font-semibold text-[#111111]">{item.count}</span>
                  <span className="font-sans text-[12px] leading-[16px] font-normal text-[#8f9198]">{item.percent}</span>
                </div>
                <span className="material-icons-outlined text-[20px] text-text-primary">keyboard_arrow_right</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}