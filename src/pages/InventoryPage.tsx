import { useState } from 'react'

const inventoryData = [
  { sku: '5200030901', name: 'BharatPe NFC 3 scan Speaker Airtel Kit', total: '12,000', sellable: '11,500', damaged: '200', expired: '100', processing: '200', facility: 'DELFC1' },
  { sku: '5200030902', name: 'iPhone 15 Pro, 256 GB', total: '8,500', sellable: '8,200', damaged: '100', expired: '50', processing: '150', facility: 'AMDFC1' },
  { sku: '5200030903', name: 'Voltas 0.8 Ton 5 Star Inverter AC', total: '450', sellable: '440', damaged: '5', expired: '0', processing: '5', facility: 'AMDFC2' },
  { sku: '5200030904', name: 'Voltas 1.8 Ton 3 Star Inverter AC', total: '25,000', sellable: '24,500', damaged: '300', expired: '0', processing: '200', facility: 'AMDFC2' },
  { sku: '5200030905', name: 'Voltas 2 Ton 5 Star Inverter AC', total: '3,200', sellable: '3,100', damaged: '50', expired: '0', processing: '50', facility: 'AMDFC4' },
  { sku: '5200030906', name: 'Havells Air-Oven Avanza', total: '15,000', sellable: '14,000', damaged: '500', expired: '0', processing: '500', facility: 'BLRFC1' },
  { sku: '5200030907', name: 'Havells Active Water Purifier', total: '2,000', sellable: '0', damaged: '0', expired: '2,000', processing: '0', facility: 'BLRFC1' },
  { sku: '5200030908', name: 'Havells Carlo 3 Litre Instant Water Heater', total: '890', sellable: '870', damaged: '10', expired: '0', processing: '10', facility: 'BLRFC1' },
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
      <div className="flex items-end gap-4 bg-white p-6 rounded-lg">
        {/* Product SKU / Name */}
        <div className="flex flex-col gap-1 flex-1">
          <label className="font-sans text-[14px] leading-[20px] font-medium text-[#111111]">Product SKU / Name</label>
          <div className="flex items-center h-12 px-3 gap-2 bg-[#f7f7f7] border border-[#e6e6e6] rounded-lg">
            <span className="material-icons-outlined text-[20px] text-[#4f5360]">search</span>
            <input
              type="text"
              placeholder="Search by SKU or product name ..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="border-none outline-none bg-transparent font-sans text-[16px] leading-[24px] text-[#111111] w-full placeholder:text-[#bfbebe]"
            />
            {search && (
              <button onClick={() => setSearch('')} className="border-none bg-transparent cursor-pointer">
                <span className="material-icons-outlined text-[16px] text-[#4f5360]">close</span>
              </button>
            )}
          </div>
        </div>

        {/* Facility */}
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

        {/* Search Button */}
        <button className="h-12 px-4 bg-[#000000] text-white rounded flex items-center gap-2 font-sans text-[16px] font-medium cursor-pointer hover:bg-[#222] transition-colors">
          <span className="material-icons-outlined text-[20px]">search</span>
          Search
        </button>
      </div>

      {/* Results */}
      <div className="bg-white rounded-lg p-6 flex flex-col gap-4">
        <span className="font-sans text-[14px] leading-[24px] font-normal text-[#1e222d]">
          Shows {filtered.length} Result{filtered.length !== 1 ? 's' : ''}
        </span>

        {/* Table */}
        <div className="border border-[#e2e2e5] rounded-lg overflow-hidden shadow-sm">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#f5f6f8]">
                <th className="text-left px-4 py-3 font-sans text-[12px] leading-[16px] font-medium text-[#111111] uppercase tracking-[0.6px] border-b border-[#e0e2ea]">Product SKU</th>
                <th className="text-left px-4 py-3 font-sans text-[12px] leading-[16px] font-medium text-[#111111] uppercase tracking-[0.6px] border-b border-[#e0e2ea]">Product Name</th>
                <th className="text-left px-4 py-3 font-sans text-[12px] leading-[16px] font-medium text-[#111111] uppercase tracking-[0.6px] border-b border-[#e0e2ea]">Total</th>
                <th className="text-left px-4 py-3 font-sans text-[12px] leading-[16px] font-medium text-[#111111] uppercase tracking-[0.6px] border-b border-[#e0e2ea]">Sellable</th>
                <th className="text-left px-4 py-3 font-sans text-[12px] leading-[16px] font-medium text-[#111111] uppercase tracking-[0.6px] border-b border-[#e0e2ea]">Damaged</th>
                <th className="text-left px-4 py-3 font-sans text-[12px] leading-[16px] font-medium text-[#111111] uppercase tracking-[0.6px] border-b border-[#e0e2ea]">Expired</th>
                <th className="text-left px-4 py-3 font-sans text-[12px] leading-[16px] font-medium text-[#111111] uppercase tracking-[0.6px] border-b border-[#e0e2ea]">Processing</th>
                <th className="text-left px-4 py-3 font-sans text-[12px] leading-[16px] font-medium text-[#111111] uppercase tracking-[0.6px] border-b border-[#e0e2ea]">Facility</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item, i) => (
                <tr key={i} className="border-b border-[#e0e2ea] hover:bg-[#f9fafb] transition-colors">
                  <td className="px-4 py-4 font-sans text-[14px] leading-[20px] font-semibold text-[#5b80f7]">{item.sku}</td>
                  <td className="px-4 py-4 font-sans text-[14px] leading-[20px] font-normal text-[#666666]">{item.name}</td>
                  <td className="px-4 py-4 font-sans text-[14px] leading-[20px] font-normal text-[#666666]">{item.total}</td>
                  <td className="px-4 py-4 font-sans text-[14px] leading-[20px] font-medium text-[#1ba86e]">{item.sellable}</td>
                  <td className="px-4 py-4 font-sans text-[14px] leading-[20px] font-medium text-[#cf9f02]">{item.damaged}</td>
                  <td className="px-4 py-4 font-sans text-[14px] leading-[20px] font-medium text-[#dc143c]">{item.expired}</td>
                  <td className="px-4 py-4 font-sans text-[14px] leading-[20px] font-normal text-[#666666]">{item.processing}</td>
                  <td className="px-4 py-4">
                    <span className="px-2.5 py-0.5 bg-[#f7f7f7] rounded-[10px] font-sans text-[12px] leading-[16px] font-medium text-[#111111]">
                      {item.facility}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between pt-2">
          <span className="font-sans text-[14px] text-[#666666]">Showing <strong className="text-[#111111]">20</strong> Results</span>
          <div className="flex items-center gap-2">
            <button className="w-6 h-6 flex items-center justify-center rounded hover:bg-[#f3f4f6]">
              <span className="material-icons-outlined text-[16px] text-[#666666]">arrow_back</span>
            </button>
            {[1, 2, '...', 14, 15, 16, '...', 19, 20].map((page, i) => (
              <button
                key={i}
                className={`w-6 h-6 flex items-center justify-center rounded font-sans text-[14px] font-medium
                  ${page === 15 ? 'bg-black text-white' : 'text-[#666666] hover:bg-[#f3f4f6]'}`}
              >
                {page}
              </button>
            ))}
            <button className="w-6 h-6 flex items-center justify-center rounded hover:bg-[#f3f4f6]">
              <span className="material-icons-outlined text-[16px] text-[#666666]">arrow_forward</span>
            </button>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-sans text-[14px] text-[#666666]">Go to Page</span>
            <input type="text" placeholder="x" className="w-8 h-8 border border-[#f7f7f7] rounded-md text-center font-sans text-[14px] outline-none" />
            <button className="w-6 h-6 flex items-center justify-center rounded-full bg-[#f7f7f7]">
              <span className="material-icons-outlined text-[14px] text-[#666666]">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}