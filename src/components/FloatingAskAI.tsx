/**
 * FloatingAskAI - Uses TDS FloatingButton pattern
 * Fallback to manual implementation due to React type mismatch with TDS package
 */
export default function FloatingAskAI() {
  return (
    <button className="fixed bottom-6 right-6 flex items-center gap-3 px-4 py-3 bg-[#0c0c0c] rounded-lg cursor-pointer z-50 hover:bg-[#222] transition-colors shadow-lg">
      <svg width="15" height="18" viewBox="0 0 15 18" fill="none">
        <path d="M7.5 0L0 4.5v9L7.5 18l7.5-4.5v-9L7.5 0z" fill="#fff"/>
      </svg>
      <span className="font-sans text-[12px] font-medium text-[#f2f2f2]">Ask AI</span>
    </button>
  )
}