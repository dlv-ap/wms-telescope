import { useState } from 'react'
import { TabGroup, TabCell, Badge, Button, Input, Table } from '@delhivery/tarmac'

type OrderStatus = 'all' | 'pending' | 'picked' | 'packed' | 'shipped' | 'cancelled'

const orders = [
  { key: '1', id: 'ORD-2025-001', customer: 'Havells India', items: 12, facility: 'DELFC1', status: 'Pending', date: '12 May 2026', sla: '14 May 2026' },
  { key: '2', id: 'ORD-2025-002', customer: 'Voltas Ltd', items: 5, facility: 'AMDFC1', status: 'Picked', date: '12 May 2026', sla: '13 May 2026' },
  { key: '3', id: 'ORD-2025-003', customer: 'BharatPe', items: 200, facility: 'BLRFC1', status: 'Packed', date: '11 May 2026', sla: '13 May 2026' },
  { key: '4', id: 'ORD-2025-004', customer: 'Apple India', items: 3, facility: 'AMDFC2', status: 'Shipped', date: '10 May 2026', sla: '12 May 2026' },
  { key: '5', id: 'ORD-2025-005', customer: 'Havells India', items: 45, facility: 'DELFC1', status: 'Pending', date: '12 May 2026', sla: '15 May 2026' },
  { key: '6', id: 'ORD-2025-006', customer: 'Voltas Ltd', items: 8, facility: 'AMDFC4', status: 'Cancelled', date: '09 May 2026', sla: '11 May 2026' },
  { key: '7', id: 'ORD-2025-007', customer: 'BharatPe', items: 150, facility: 'BLRFC1', status: 'Picked', date: '11 May 2026', sla: '14 May 2026' },
  { key: '8', id: 'ORD-2025-008', customer: 'Apple India', items: 1, facility: 'DELFC1', status: 'Packed', date: '12 May 2026', sla: '13 May 2026' },
]

const columns = [
  { title: 'Order ID', dataIndex: 'id', key: 'id', render: (text: string) => <span className="font-semibold text-[#5b80f7]">{text}</span> },
  { title: 'Customer', dataIndex: 'customer', key: 'customer' },
  { title: 'Items', dataIndex: 'items', key: 'items' },
  { title: 'Facility', dataIndex: 'facility', key: 'facility', render: (text: string) => <Badge variant="white" size="md" badgeType="subtle" text={text} /> },
  { title: 'Status', dataIndex: 'status', key: 'status', render: (text: string) => <Badge variant="white" size="md" badgeType="subtle" text={text} /> },
  { title: 'Order Date', dataIndex: 'date', key: 'date' },
  { title: 'SLA Date', dataIndex: 'sla', key: 'sla' },
  { title: 'Actions', key: 'actions', render: () => <Button variant="black" buttonStyle="secondary" size="sm" buttonType="iconButton"><span className="material-icons-outlined text-[18px]">more_vert</span></Button> },
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
          size="md"
          leadingIcon={<span className="material-icons-outlined text-[18px]">add</span>}
        >
          Create Order
        </Button>
      </div>

      {/* TDS TabGroup for Status Tabs - size sm */}
      <TabGroup orientation="horizontal" size="sm" tabType="button">
        {statusTabs.map(tab => (
          <TabCell
            key={tab.value}
            tabType="button"
            tabStyle="black"
            size="sm"
            title={tab.label}
            isSelected={activeStatus === tab.value}
            onClick={() => setActiveStatus(tab.value)}
            pill={
              <span className={`inline-flex items-center justify-center px-2 h-5 rounded-full text-[11px] font-semibold leading-none ${activeStatus === tab.value ? 'bg-white/20 text-white' : 'bg-[#f3f4f6] text-[#2b2b2b]'}`}>
                {tab.count}
              </span>
            }
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
          size="sm"
          leadingIcon={<span className="material-icons-outlined text-[16px]">filter_list</span>}
        >
          Filters
        </Button>
        <Button
          variant="black"
          buttonStyle="secondary"
          size="sm"
          leadingIcon={<span className="material-icons-outlined text-[16px]">download</span>}
        >
          Export
        </Button>
      </div>

      {/* TDS Table */}
      <Table
        columns={columns as any}
        dataSource={filtered}
        size="medium"
        bordered
        hoverable
        pagination={{ pageSize: 10, total: filtered.length }}
      />
    </div>
  )
}