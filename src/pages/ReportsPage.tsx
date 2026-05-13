import { useState } from 'react'
import { Badge, Button, TabGroup, TabCell, Table } from '@delhivery/tarmac'

const reports = [
  { key: '1', name: 'Daily Shipment Summary', type: 'Outbound', frequency: 'Daily', lastGenerated: '12 May 2026, 6:00 AM', status: 'Ready', size: '2.4 MB' },
  { key: '2', name: 'Weekly SLA Adherence Report', type: 'Performance', frequency: 'Weekly', lastGenerated: '11 May 2026, 12:00 AM', status: 'Ready', size: '5.1 MB' },
  { key: '3', name: 'Inventory Ageing Report', type: 'Inventory', frequency: 'Daily', lastGenerated: '12 May 2026, 6:00 AM', status: 'Ready', size: '1.8 MB' },
  { key: '4', name: 'Monthly Warehouse Utilization', type: 'Operations', frequency: 'Monthly', lastGenerated: '01 May 2026, 12:00 AM', status: 'Ready', size: '8.3 MB' },
  { key: '5', name: 'Returns & Rejections Summary', type: 'Inventory', frequency: 'Weekly', lastGenerated: '11 May 2026, 12:00 AM', status: 'Ready', size: '3.2 MB' },
  { key: '6', name: 'Courier Performance Report', type: 'Outbound', frequency: 'Daily', lastGenerated: '12 May 2026, 6:00 AM', status: 'Processing', size: '—' },
  { key: '7', name: 'Facility-wise Dispatch Report', type: 'Outbound', frequency: 'Daily', lastGenerated: '12 May 2026, 6:00 AM', status: 'Ready', size: '4.7 MB' },
  { key: '8', name: 'TAT Breach Analysis', type: 'Performance', frequency: 'Weekly', lastGenerated: '11 May 2026, 12:00 AM', status: 'Ready', size: '2.9 MB' },
]

type ReportType = 'all' | 'Outbound' | 'Inventory' | 'Performance' | 'Operations'

const typeTabs: { label: string; value: ReportType }[] = [
  { label: 'All Reports', value: 'all' },
  { label: 'Outbound', value: 'Outbound' },
  { label: 'Inventory', value: 'Inventory' },
  { label: 'Performance', value: 'Performance' },
  { label: 'Operations', value: 'Operations' },
]

const typeVariant: Record<string, string> = {
  Outbound: 'info',
  Inventory: 'success',
  Performance: 'warning',
  Operations: 'coal',
}

const columns = [
  { title: 'Report Name', dataIndex: 'name', key: 'name', render: (text: string) => <span className="font-medium text-[#111111]">{text}</span> },
  { title: 'Type', dataIndex: 'type', key: 'type', render: (text: string) => <Badge variant={typeVariant[text] as any || 'coal'} size="md" badgeType="subtle" text={text} /> },
  { title: 'Frequency', dataIndex: 'frequency', key: 'frequency' },
  { title: 'Last Generated', dataIndex: 'lastGenerated', key: 'lastGenerated' },
  { title: 'Size', dataIndex: 'size', key: 'size' },
  { title: 'Status', dataIndex: 'status', key: 'status', render: (text: string) => <Badge variant={text === 'Ready' ? 'success' : 'warning'} size="md" badgeType="subtle" text={text} /> },
  { title: 'Action', key: 'action', render: (_: any, record: any) => (
    <Button
      variant="black"
      buttonStyle="secondary"
      size="sm"
      buttonType="iconButton"
      disabled={record.status !== 'Ready'}
      leadingIcon={<span className="material-icons-outlined text-[16px]">download</span>}
    />
  )},
]

export default function ReportsPage() {
  const [filter, setFilter] = useState<ReportType>('all')

  const filtered = reports.filter(r => filter === 'all' || r.type === filter)

  return (
    <div className="flex flex-col gap-5">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="font-sans text-[20px] leading-[24px] font-bold text-[#1e222d]">Reports</h1>
          <p className="font-sans text-[14px] leading-[24px] font-normal text-[#1e222d]">
            Download and schedule automated reports for your operations
          </p>
        </div>
        <Button
          variant="black"
          buttonStyle="primary"
          size="md"
          leadingIcon={<span className="material-icons-outlined text-[18px]">add</span>}
        >
          Schedule Report
        </Button>
      </div>

      {/* TDS TabGroup for filter - size sm */}
      <TabGroup orientation="horizontal" size="sm" tabType="button">
        {typeTabs.map(tab => (
          <TabCell
            key={tab.value}
            tabType="button"
            tabStyle="black"
            size="sm"
            title={tab.label}
            isSelected={filter === tab.value}
            onClick={() => setFilter(tab.value)}
          />
        ))}
      </TabGroup>

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