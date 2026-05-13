import { useState } from 'react'
import { Badge, Button, Input, Table } from '@delhivery/tarmac'

const inventoryData = [
  { key: '1', sku: '5200030901', name: 'BharatPe NFC 3 scan Speaker Airtel Kit', total: '12,000', sellable: '11,500', damaged: '200', expired: '100', processing: '200', facility: 'DELFC1' },
  { key: '2', sku: '5200030902', name: 'iPhone 15 Pro, 256 GB', total: '8,500', sellable: '8,200', damaged: '100', expired: '50', processing: '150', facility: 'AMDFC1' },
  { key: '3', sku: '5200030903', name: 'Voltas 0.8 Ton 5 Star Inverter AC', total: '450', sellable: '440', damaged: '5', expired: '0', processing: '5', facility: 'AMDFC2' },
  { key: '4', sku: '5200030904', name: 'Voltas 1.8 Ton 3 Star Inverter AC', total: '25,000', sellable: '24,500', damaged: '300', expired: '0', processing: '200', facility: 'AMDFC2' },
  { key: '5', sku: '5200030905', name: 'Voltas 2 Ton 5 Star Inverter AC', total: '3,200', sellable: '3,100', damaged: '50', expired: '0', processing: '50', facility: 'AMDFC4' },
  { key: '6', sku: '5200030906', name: 'Havells Air-Oven Avanza', total: '15,000', sellable: '14,000', damaged: '500', expired: '0', processing: '500', facility: 'BLRFC1' },
  { key: '7', sku: '5200030907', name: 'Havells Active Water Purifier', total: '2,000', sellable: '0', damaged: '0', expired: '2,000', processing: '0', facility: 'BLRFC1' },
  { key: '8', sku: '5200030908', name: 'Havells Carlo 3 Litre Instant Water Heater', total: '890', sellable: '870', damaged: '10', expired: '0', processing: '10', facility: 'BLRFC1' },
]

const columns = [
  { title: 'Product SKU', dataIndex: 'sku', key: 'sku', render: (text: string) => <span className="font-semibold text-[#5b80f7]">{text}</span> },
  { title: 'Product Name', dataIndex: 'name', key: 'name' },
  { title: 'Total', dataIndex: 'total', key: 'total' },
  { title: 'Sellable', dataIndex: 'sellable', key: 'sellable', render: (text: string) => <span className="font-medium text-[#1ba86e]">{text}</span> },
  { title: 'Damaged', dataIndex: 'damaged', key: 'damaged', render: (text: string) => <span className="font-medium text-[#cf9f02]">{text}</span> },
  { title: 'Expired', dataIndex: 'expired', key: 'expired', render: (text: string) => <span className="font-medium text-[#dc143c]">{text}</span> },
  { title: 'Processing', dataIndex: 'processing', key: 'processing' },
  { title: 'Facility', dataIndex: 'facility', key: 'facility', render: (text: string) => <Badge variant="success" size="md" badgeType="subtle" text={text} /> },
]

export default function InventoryPage() {
  const [search, setSearch] = useState('')
  const [facility, setFacility] = useState('')

  const filtered = inventoryData.filter(item => {
    const matchSearch = !search || item.sku.includes(search) || item.name.toLowerCase().includes(search.toLowerCase())
    const matchFacility = !facility || item.facility === facility
    return matchSearch && matchFacility
  })

  return (
    <div className="flex flex-col gap-5">
      {/* Page Header */}
      <div className="flex flex-col gap-1">
        <h1 className="font-sans text-[20px] leading-[24px] font-bold text-[#1e222d]">Inventory</h1>
        <p className="font-sans text-[14px] leading-[24px] font-normal text-[#1e222d]">
          View and manage your warehouse inventory across all facilities
        </p>
      </div>

      {/* Search Section */}
      <div className="flex items-end gap-4">
        <div className="flex flex-col gap-1 flex-1">
          <Input
            inputStyle="tarmac-01"
            inputType="regular"
            inputSize="md"
            label="Product SKU / Name"
            placeholder="Search by SKU or product name ..."
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
            leadingIcon={<span className="material-icons-outlined text-[18px]">search</span>}
          />
        </div>

        <div className="flex flex-col gap-1 w-[200px]">
          <label className="font-sans text-[14px] leading-[20px] font-medium text-[#111111]">Facility</label>
          <div className="flex items-center h-12 px-3 gap-2 bg-[#f7f7f7] border border-[#e6e6e6] rounded-lg">
            <span className="material-icons-outlined text-[20px] text-[#4f5360]">qr_code_scanner</span>
            <select
              value={facility}
              onChange={e => setFacility(e.target.value)}
              className="border-none outline-none bg-transparent font-sans text-[16px] leading-[24px] text-[#111111] w-full appearance-none cursor-pointer"
            >
              <option value="">Select Facility</option>
              <option value="DELFC1">DELFC1</option>
              <option value="AMDFC1">AMDFC1</option>
              <option value="AMDFC2">AMDFC2</option>
              <option value="AMDFC4">AMDFC4</option>
              <option value="BLRFC1">BLRFC1</option>
            </select>
          </div>
        </div>

        <Button
          variant="black"
          buttonStyle="primary"
          size="lg"
          leadingIcon={<span className="material-icons-outlined text-[20px]">search</span>}
        >
          Search
        </Button>
      </div>

      {/* Results with TDS Table */}
      <div className="flex flex-col gap-4">
        <span className="font-sans text-[14px] leading-[24px] font-normal text-[#1e222d]">
          Shows {filtered.length} Result{filtered.length !== 1 ? 's' : ''}
        </span>

        <Table
          columns={columns as any}
          dataSource={filtered}
          size="medium"
          bordered
          hoverable
          pagination={{ pageSize: 20, total: filtered.length }}
        />
      </div>
    </div>
  )
}