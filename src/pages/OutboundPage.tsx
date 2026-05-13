import { useState } from 'react'

type OrderStatus = 'all' | 'pending' | 'picked' | 'packed' | 'shipped' | 'cancelled'

const statusColors: Record<string, string> = {
  Pending: 'bg-[#fff6ea] text-[#cf9f02]',
  Picked: 'bg-[#ecfdf5] text-[#059669]',
  Packed: 'bg-[#eff4ff] text-[#5b80f7]',
  Shipped: 'bg-[#ecfdf5] text-[#1ba86e]',
  Cancelled: 'bg-[#fdf0f2] text-[#dc143c]',
}

const orders = [
  { id: 'ORD-2025-001', customer: 'Havells India', items: 12, facility: 'DELFC1', status: 'Pending', date: '12 May 2026', sla: '14 May 2026' },
  { id: 'ORD-2025-002', customer: 'Voltas Ltd', items: 5, facility: 'AMDFC1', status: 'Picked', date: '12 May 2026', sla: '13 May 2026' },
  { id: 'ORD-2025-003', customer: 'BharatPe', items: 200, facility: 'BLRFC1', status: 'Packed', date: '11 May 2026', sla: '13 May 2026' },
  { id: 'ORD-2025-004', customer: 'Apple India', items: 3, facility: 'AMDFC2', status: 'Shipped', date: '10 May 2026', sla: '12 May 2026' },
  { id: 'ORD-2025-005', customer: 'Havells India', items: 45, facility: 'DELFC1', status: 'Pending', date: '12 May 2026', sla: '15 May 2026' },
  { id: 'ORD-2025-006', customer: 'Voltas Ltd', items: 8, facility: 'AMDFC4', status: 'Cancelled', date: '09 May 2026', sla: '11 May 2026' },
  { id: 'ORD-2025-007', customer: 'BharatPe', items: 150, facility: 'BLRFC1', status: 'Picked', date: '11 May 2026', sla: '14 May 2026' },
  { id: 'ORD-2025-008', customer: 'Apple India', items: 1, facility: 'DELFC1', status: 'Packed', date: '12 May 2026', sla: '13 May 2026' },
]

const statusTabs: { label: string; value: OrderStatus; count: number }[] = [
  { label: 'All Orders', value: 'all', count: 1226 },
  { label: 'Pending', value: 'pending', count: 268 },
  { label: 'Picked', value: 'picked', count: 224 },
  { label: 'Packed', value: 'packed', count: 198 },
  { label: 'Shipped', value: 'shipped', count: 415 },
  { label: 'Cancelled', value: 'cancelled', count: 121 },
]

export default function OutboundPage() {
  const [activeStatus, setActiveStatus] = useState<OrderStatus>('all')
  const [search, setSearch] = useState('')

  const filtered = orders.filter(o => {
    const matchStatus = activeStatus === 'all' || o.status.toLowerCase() === activeStatus
    const matchSearch = !search || o.id.toLowerCase().includes(search.toLowerCase()) || o.customer.toLowerCase().includes(search.toLowerCase())
    return matchStatus && matchSearch
  })

  return (
    <div className="flex flex-col gap-5">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="font-sans text-[20px] leading-[24px] font-bold text-[#1e222d]">Shipments</h1>
          <p className="font-sans text-[14px] leading-[24px] font-normal text-[#1e222d]">
            Manage outbound orders, picking, packing and dispatch
          </p>
        </div>
        <button className="h-12 px-5 bg-[#000000] text-white rounded-md flex items-center gap-2 font-sans text-[14px] font-medium cursor-pointer hover:bg-[#222] transition-colors">
          <span className="material-icons-outlined text-[18px]">add</span>
          Create Order
        </button>
      </div>

      {/* Status Tabs */}
      <div className="flex items-center gap-2 bg-white p-1 rounded-lg border border-[#e6e6e6]">
        {statusTabs.map(tab => (
          <button
            key={tab.value}
            onClick={() => setActiveStatus(tab.value)}
            className={`px-4 py-2 rounded-md font-sans text-[13px] font-medium transition-colors flex items-center gap-2
              ${activeStatus === tab.value
                ? 'bg-[#111111] text-white'
                : 'text-[#4b5563] hover:bg-[#f7f7f7]'}`}
          >
            {tab.label}
            <span className={`text-[11px] px-1.5 py-0.5 rounded-full ${activeStatus === tab.value ? 'bg-white/20 text-white' : 'bg-[#f3f4f6] text-[#6b7280]'}`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Search + Filters */}
      <div className="flex items-center gap-3">
        <div className="flex items-center h-10 px-3 gap-2 bg-white border border-[#e6e6e6] rounded-lg flex-1 max-w-[400px]">
          <span className="material-icons-outlined text-[18px] text-[#9ca3af]">search</span>
          <input
            type="text"
            placeholder="Search by Order ID or Customer..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border-none outline-none bg-transparent font-sans text-[13px] text-[#111111] w-full placeholder:text-[#9ca3af]"
          />
        </div>
        <button className="h-10 px-3 bg-white border border-[#e6e6e6] rounded-lg flex items-center gap-2 font-sans text-[13px] text-[#4b5563] hover:bg-[#f7f7f7] transition-colors">
          <span className="material-icons-outlined text-[16px]">filter_list</span>
          Filters
        </button>
        <button className="h-10 px-3 bg-white border border-[#e6e6e6] rounded-lg flex items-center gap-2 font-sans text-[13px] text-[#4b5563] hover:bg-[#f7f7f7] transition-colors">
          <span className="material-icons-outlined text-[16px]">download</span>
          Export
        </button>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg border border-[#e2e2e5] overflow-hidden shadow-sm">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#f5f6f8]">
              <th className="text-left px-4 py-3 font-sans text-[12px] leading-[16px] font-medium text-[#111111] uppercase tracking-[0.6px]">Order ID</th>
              <th className="text-left px-4 py-3 font-sans text-[12px] leading-[16px] font-medium text-[#111111] uppercase tracking-[0.6px]">Customer</th>
              <th className="text-left px-4 py-3 font-sans text-[12px] leading-[16px] font-medium text-[#111111] uppercase tracking-[0.6px]">Items</th>
              <th className="text-left px-4 py-3 font-sans text-[12px] leading-[16px] font-medium text-[#111111] uppercase tracking-[0.6px]">Facility</th>
              <th className="text-left px-4 py-3 font-sans text-[12px] leading-[16px] font-medium text-[#111111] uppercase tracking-[0.6px]">Status</th>
              <th className="text-left px-4 py-3 font-sans text-[12px] leading-[16px] font-medium text-[#111111] uppercase tracking-[0.6px]">Order Date</th>
              <th className="text-left px-4 py-3 font-sans text-[12px] leading-[16px] font-medium text-[#111111] uppercase tracking-[0.6px]">SLA Date</th>
              <th className="text-left px-4 py-3 font-sans text-[12px] leading-[16px] font-medium text-[#111111] uppercase tracking-[0.6px]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((order, i) => (
              <tr key={i} className="border-t border-[#e0e2ea] hover:bg-[#f9fafb] transition-colors">
                <td className="px-4 py-4 font-sans text-[14px] leading-[20px] font-semibold text-[#5b80f7]">{order.id}</td>
                <td className="px-4 py-4 font-sans text-[14px] leading-[20px] font-normal text-[#111111]">{order.customer}</td>
                <td className="px-4 py-4 font-sans text-[14px] leading-[20px] font-normal text-[#666666]">{order.items}</td>
                <td className="px-4 py-4">
                  <span className="px-2.5 py-0.5 bg-[#f7f7f7] rounded-[10px] font-sans text-[12px] leading-[16px] font-medium text-[#111111]">
                    {order.facility}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span className={`px-2.5 py-1 rounded-[10px] font-sans text-[12px] leading-[16px] font-medium ${statusColors[order.status]}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-4 py-4 font-sans text-[14px] leading-[20px] font-normal text-[#666666]">{order.date}</td>
                <td className="px-4 py-4 font-sans text-[14px] leading-[20px] font-normal text-[#666666]">{order.sla}</td>
                <td className="px-4 py-4">
                  <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-[#f3f4f6] transition-colors">
                    <span className="material-icons-outlined text-[18px] text-[#6b7280]">more_vert</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}