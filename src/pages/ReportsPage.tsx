import { useState } from 'react'
import { Badge, Button } from '@delhivery/tarmac'

const reports = [
  { id: 'RPT-001', name: 'Daily Shipment Summary', type: 'Outbound', frequency: 'Daily', lastGenerated: '12 May 2026, 6:00 AM', status: 'Ready', size: '2.4 MB' },
  { id: 'RPT-002', name: 'Weekly SLA Adherence Report', type: 'Performance', frequency: 'Weekly', lastGenerated: '11 May 2026, 12:00 AM', status: 'Ready', size: '5.1 MB' },
  { id: 'RPT-003', name: 'Inventory Ageing Report', type: 'Inventory', frequency: 'Daily', lastGenerated: '12 May 2026, 6:00 AM', status: 'Ready', size: '1.8 MB' },
  { id: 'RPT-004', name: 'Monthly Warehouse Utilization', type: 'Operations', frequency: 'Monthly', lastGenerated: '01 May 2026, 12:00 AM', status: 'Ready', size: '8.3 MB' },
  { id: 'RPT-005', name: 'Returns & Rejections Summary', type: 'Inventory', frequency: 'Weekly', lastGenerated: '11 May 2026, 12:00 AM', status: 'Ready', size: '3.2 MB' },
  { id: 'RPT-006', name: 'Courier Performance Report', type: 'Outbound', frequency: 'Daily', lastGenerated: '12 May 2026, 6:00 AM', status: 'Processing', size: '—' },
  { id: 'RPT-007', name: 'Facility-wise Dispatch Report', type: 'Outbound', frequency: 'Daily', lastGenerated: '12 May 2026, 6:00 AM', status: 'Ready', size: '4.7 MB' },
  { id: 'RPT-008', name: 'TAT Breach Analysis', type: 'Performance', frequency: 'Weekly', lastGenerated: '11 May 2026, 12:00 AM', status: 'Ready', size: '2.9 MB' },
]

type ReportType = 'all' | 'Outbound' | 'Inventory' | 'Performance' | 'Operations'

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
          size="lg"
          leadingIcon={<span className="material-icons-outlined text-[18px]">add</span>}
        >
          Schedule Report
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        {(['all', 'Outbound', 'Inventory', 'Performance', 'Operations'] as ReportType[]).map(type => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 rounded-full font-sans text-[13px] font-medium transition-colors border
              ${filter === type
                ? 'bg-[#111111] text-white border-[#111111]'
                : 'bg-white text-[#4b5563] border-[#e6e6e6] hover:bg-[#f7f7f7]'}`}
          >
            {type === 'all' ? 'All Reports' : type}
          </button>
        ))}
      </div>

      {/* Reports Table */}
      <div className="bg-white rounded-lg border border-[#e2e2e5] overflow-hidden shadow-sm">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#f5f6f8]">
              <th className="text-left px-4 py-3 font-sans text-[12px] leading-[16px] font-medium text-[#111111] uppercase tracking-[0.6px]">Report Name</th>
              <th className="text-left px-4 py-3 font-sans text-[12px] leading-[16px] font-medium text-[#111111] uppercase tracking-[0.6px]">Type</th>
              <th className="text-left px-4 py-3 font-sans text-[12px] leading-[16px] font-medium text-[#111111] uppercase tracking-[0.6px]">Frequency</th>
              <th className="text-left px-4 py-3 font-sans text-[12px] leading-[16px] font-medium text-[#111111] uppercase tracking-[0.6px]">Last Generated</th>
              <th className="text-left px-4 py-3 font-sans text-[12px] leading-[16px] font-medium text-[#111111] uppercase tracking-[0.6px]">Size</th>
              <th className="text-left px-4 py-3 font-sans text-[12px] leading-[16px] font-medium text-[#111111] uppercase tracking-[0.6px]">Status</th>
              <th className="text-left px-4 py-3 font-sans text-[12px] leading-[16px] font-medium text-[#111111] uppercase tracking-[0.6px]">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((report, i) => (
              <tr key={i} className="border-t border-[#e0e2ea] hover:bg-[#f9fafb] transition-colors">
                <td className="px-4 py-4 font-sans text-[14px] leading-[20px] font-medium text-[#111111]">{report.name}</td>
                <td className="px-4 py-4">
                  <Badge variant={report.type === 'Outbound' ? 'info' : report.type === 'Inventory' ? 'success' : report.type === 'Performance' ? 'warning' : 'coal'} size="sm" badgeType="subtle" text={report.type} />
                </td>
                <td className="px-4 py-4 font-sans text-[14px] leading-[20px] font-normal text-[#666666]">{report.frequency}</td>
                <td className="px-4 py-4 font-sans text-[14px] leading-[20px] font-normal text-[#666666]">{report.lastGenerated}</td>
                <td className="px-4 py-4 font-sans text-[14px] leading-[20px] font-normal text-[#666666]">{report.size}</td>
                <td className="px-4 py-4">
                  <Badge variant={report.status === 'Ready' ? 'success' : 'warning'} size="sm" badgeType="subtle" text={report.status} />
                </td>
                <td className="px-4 py-4">
                  <Button
                    variant="black"
                    buttonStyle="primary"
                    size="sm"
                    disabled={report.status !== 'Ready'}
                    leadingIcon={<span className="material-icons-outlined text-[14px]">download</span>}
                  >
                    Download
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