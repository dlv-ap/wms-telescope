export default function TopNav() {
  return (
    <header className="h-[60px] bg-surface-white border-b border-border-default flex items-center px-5 gap-2 shrink-0">
      {/* Title */}
      <div className="flex-1">
        <h1 className="font-heading text-20 font-bold uppercase text-text-primary">
          My Dashboard
        </h1>
      </div>

      {/* Search Split */}
      <div className="flex items-center h-9">
        <div className="flex items-center px-3 gap-1 bg-surface-white border border-border-default rounded-l h-9 cursor-pointer">
          <span className="text-14 font-medium text-text-primary">Order No.</span>
          <span className="material-icons-outlined text-[20px] text-text-primary">keyboard_arrow_down</span>
        </div>
        <div className="flex items-center px-3 gap-1 bg-surface-white border border-border-default border-l-0 rounded-r h-9 min-w-[200px]">
          <span className="material-icons-outlined text-[20px] text-text-muted">search</span>
          <input
            type="text"
            placeholder="Track Order ID"
            className="border-none outline-none font-sans text-14 font-medium text-text-primary bg-transparent w-full placeholder:text-text-muted"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2">
        <button className="w-9 h-9 rounded border border-border-default bg-surface-white flex items-center justify-center cursor-pointer">
          <span className="material-icons-outlined text-[20px] text-text-primary">notifications_none</span>
        </button>

        {/* Profile */}
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-9 h-9 rounded-full bg-black border border-border-default relative">
            <span className="absolute bottom-0 right-0 w-[10px] h-[10px] bg-[#1ba86e] rounded-full border border-white"></span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-12 font-medium text-text-primary leading-4">Sahil Anand</span>
            <span className="text-10 font-normal text-text-sub leading-3">All FCs Selected</span>
          </div>
          <span className="material-icons-outlined text-[20px] text-text-primary">keyboard_arrow_down</span>
        </div>
      </div>
    </header>
  )
}