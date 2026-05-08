const recommendations = [
  {
    iconColor: 'text-[#059669]',
    iconBg: 'bg-[#ecfdf5]',
    cardBg: '#ecfdf5',
    borderColor: '#d1fae5',
    icon: 'trending_up',
    title: 'Failing 2 SLA Stages',
    subtitle: 'O2D and S2D are below target',
  },
  {
    iconColor: 'text-[#f59e0b]',
    iconBg: 'bg-[#fff6ea]',
    cardBg: '#fff6ea',
    borderColor: '#fde68a',
    icon: 'warning_amber',
    title: '2-Day TAT Driven by 1 courier',
    subtitle: "80% of this bucket's breaches come from a Single SKU",
  },
  {
    iconColor: 'text-[#5b80f7]',
    iconBg: 'bg-[#eff4ff]',
    cardBg: '#eff4ff',
    borderColor: '#c7d2fe',
    icon: 'thumb_up_alt',
    title: 'Havells will breach SLA in 5 Days',
    subtitle: 'S2D at 54% and dropping - review allocation now',
  },
]

export default function AIRecommendations() {
  return (
    <div className="flex flex-col gap-3 p-4 rounded-lg bg-surface-white border border-border-default">
      {/* Header */}
      <div className="flex items-center gap-1.5">
        <svg width="19" height="24" viewBox="0 0 19 24" fill="none">
          <path d="M9.5 0L0 6v12l9.5 6L19 18V6L9.5 0z" fill="#111"/>
        </svg>
        <span className="font-inter text-12 font-bold tracking-[0.3px] text-text-heading capitalize">
          AI Recommendations: Performance
        </span>
      </div>

      {/* Cards */}
      <div className="flex gap-4">
        {recommendations.map((rec, i) => (
          <div
            key={i}
            className="flex-1 flex items-center p-4 gap-3 rounded-lg"
            style={{ backgroundColor: rec.cardBg, border: `1px solid ${rec.borderColor}` }}
          >
            <div className={`w-7 h-7 rounded flex items-center justify-center shrink-0 ${rec.iconBg}`} style={{ border: `1px solid ${rec.borderColor}` }}>
              <span className={`material-icons-outlined text-[14px] ${rec.iconColor}`}>{rec.icon}</span>
            </div>
            <div className="flex flex-col gap-1 flex-1">
              <p className="font-inter text-12 font-normal leading-[18px] tracking-[0.3px] text-text-heading">
                {rec.title}<br/>{rec.subtitle}
              </p>
            </div>
            <span className="material-icons-outlined text-[20px] text-text-primary shrink-0">keyboard_arrow_right</span>
          </div>
        ))}
      </div>
    </div>
  )
}