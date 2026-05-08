const deliveryItems = [
  { icon: 'phone_android', label: 'Delivered', count: '2,280', percent: '86%', color: 'text-status-success', barColor: 'bg-bg-greenLight' },
  { icon: 'store', label: 'In Warehouse', count: '117', percent: '3.5%', color: 'text-status-warning', barColor: 'bg-bg-yellowLight' },
  { icon: 'local_shipping', label: 'In-Transit', count: '285', percent: '8.5%', color: 'text-status-warning', barColor: 'bg-bg-yellowLight' },
  { icon: 'keyboard_return', label: 'Return', count: '40', percent: '1.2%', color: 'text-status-warning', barColor: 'bg-bg-yellowLight' },
  { icon: 'cancel_schedule_send', label: 'Cancelled', count: '26', percent: '0.8%', color: 'text-status-error', barColor: 'bg-bg-red' },
]

export default function DeliveryPerformance() {
  return (
    <div className="w-[297px] shrink-0 flex flex-col gap-3">
      <h2 className="font-sans text-16 font-bold text-text-heading">DELIVERY PERFORMANCE</h2>

      <div className="bg-surface-white border border-border-light/70 rounded-md p-4 flex flex-col gap-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <span className="text-14 font-semibold text-text-dark text-center">Total Orders</span>
          <div className="flex items-center gap-2">
            <span className="text-16 font-semibold text-text-dark">2,500</span>
            <span className="material-icons-outlined text-[20px] text-text-primary">keyboard_arrow_right</span>
          </div>
        </div>

        {/* List */}
        <div className="flex flex-col gap-3">
          {deliveryItems.map((item, i) => (
            <div key={i} className="flex items-center justify-between p-3 pl-5 border border-border-default rounded-lg relative">
              {/* Left color bar */}
              <div className={`absolute left-0 top-0 bottom-0 w-1.5 rounded-l-lg ${item.barColor}`} />

              <div className="flex items-center gap-3">
                <span className={`material-icons-outlined text-[20px] ${item.color}`}>{item.icon}</span>
                <span className="text-12 font-semibold text-text-primary">{item.label}</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex flex-col items-end">
                  <span className="text-12 font-semibold text-text-heading">{item.count}</span>
                  <span className="text-12 font-normal text-text-description">{item.percent}</span>
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