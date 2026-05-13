import { useState } from 'react'
import { TabGroup, TabCell, Badge, Button, Input } from '@delhivery/tarmac'

type OrderStatus = 'all' | 'pending' | 'picked' | 'packed' | 'shipped' | 'cancelled'

const statusBadgeVariant: Record<string, string> = {
  Pending: 'warning',
  Picked: 'success',
  Packed: 'info',
  Shipped: 'success',
  Cancelled: 'error',
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
        <Button
          variant="black"
          buttonStyle="primary"
          size="lg"
          leadingIcon={<span className="material-icons-outlined text-[18px]">add</span>}
        >
          Create Order
        </Button>
      </div>

      {/* TDS TabGroup for Status Tabs */}
      <TabGroup orientation="horizontal" size="lg" tabType="button">
        {statusTabs.map(tab => (
          <TabCell
            key={tab.value}
            tabType="button"
            tabStyle="black"
            size="lg"
            title={tab.label}
            isSelected={activeStatus === tab.value}
            onClick={() => setActiveStatus(tab.value)}
            badge={<Badge variant={activeStatus === tab.value ? 'white' : 'coal'} size="sm" badgeType="subtle" text={String(tab.count)} />}
          />
        ))}
      </TabGroup>

      {/* Search + Filters */}
      <div className="flex items-center gap-3">
        <div className="flex-1 max-w-[400px]">
          <Input
            inputStyle="tarmac-01"
            inputType="regular"
            inputSize="md"
            placeholder="Search by Order ID or Customer..."
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
            leadingIcon={<span className="material-icons-outlined text-[18px]">search</span>}
          />
        </div>
        <Button
          variant="black"
          buttonStyle="secondary"
          size="md"
          leadingIcon={<span className="material-icons-outlined text-[16px]">filter_list</span>}
        >
          Filters
        </Button>
        <Button
          variant="black"
          buttonStyle="secondary"
          size="md"
          leadingIcon={<span className="material-icons-outlined text-[16px]">download</span>}
        >
          Export
        </Button>
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
                  <Badge variant="white" size="sm" badgeType="subtle" text={order.facility} />
                </td>
                <td className="px-4 py-4">
                  <Badge variant={statusBadgeVariant[order.status] as any} size="sm" badgeType="subtle" text={order.status} />
                </td>
                <td className="px-4 py-4 font-sans text-[14px] leading-[20px] font-normal text-[#666666]">{order.date}</td>
                <td className="px-4 py-4 font-sans text-[14px] leading-[20px] font-normal text-[#666666]">{order.sla}</td>
                <td className="px-4 py-4">
                  <Button variant="black" buttonStyle="tertiary" size="sm" buttonType="iconButton">
                    <span className="material-icons-outlined text-[18px]">more_vert</span>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}