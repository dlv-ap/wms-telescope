/**
 * AI Recommendations Section - matches Figma node 966:27315
 * Container: white bg, rounded-lg, padding 16px, gap 15px
 * Header: Inter 12px/16px Bold, tracking 0.3px, title case, color #111111
 * Cards: 3 cards with colored backgrounds, border #e2e2e5, rounded-lg
 *   Card 1: bg #ecfdf5 (green), icon color #059669
 *   Card 2: bg #fff6ea (yellow), icon color #f59e0b
 *   Card 3: bg #eff4ff (blue), icon color #5b80f7
 * Card text: Inter 12px/18px Regular, tracking 0.3px, color #111111
 * CTA: Arrow icon at center-right of card
 */

const recommendations = [
  {
    cardGradient: 'linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 50%, #f5f3ff 100%)',
    borderColor: '#e2e2e5',
    iconBg: '#ecfdf5',
    iconBorder: '#e2e2e5',
    iconColor: '#059669',
    icon: 'trending_up',
    title: 'Failing 2 SLA Stages',
    subtitle: 'O2D and S2D are below target',
  },
  {
    cardGradient: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 50%, #fdf2f8 100%)',
    borderColor: '#e2e2e5',
    iconBg: '#fff6ea',
    iconBorder: '#e2e2e5',
    iconColor: '#f59e0b',
    icon: 'warning_amber',
    title: '2-Day TAT Driven by 1 courier',
    subtitle: "80% of this bucket's breaches come from a Single SKU",
  },
  {
    cardGradient: 'linear-gradient(135deg, #eef2ff 0%, #e0e7ff 50%, #ede9fe 100%)',
    borderColor: '#e2e2e5',
    iconBg: '#eff4ff',
    iconBorder: '#e2e2e5',
    iconColor: '#5b80f7',
    icon: 'thumb_up_alt',
    title: 'Havells will breach SLA in 5 Days',
    subtitle: 'S2D at 54% and dropping - review allocation now',
  },
]

export default function AIRecommendations() {
  return (
    <div className="flex flex-col gap-[15px] p-4 rounded-lg" style={{ background: 'linear-gradient(135deg, #fdf2f8 0%, #ede9fe 50%, #eef2ff 100%)' }}>
      {/* Header row */}
      <div className="flex items-center gap-1.5">
        <span className="font-inter text-[12px] leading-[16px] font-bold tracking-[0.3px] text-[#111111] capitalize">
          AI Recommendations: Performance
        </span>
      </div>

      {/* Cards row */}
      <div className="flex gap-4">
        {recommendations.map((rec, i) => (
          <div
            key={i}
            className="flex-1 flex items-center p-4 gap-3 rounded-lg"
            style={{ background: rec.cardGradient, border: `1px solid ${rec.borderColor}` }}
          >
            {/* Icon button */}
            <div
              className="w-7 h-7 rounded flex items-center justify-center shrink-0"
              style={{ backgroundColor: rec.iconBg, border: `1px solid ${rec.iconBorder}` }}
            >
              <span className="material-icons-outlined text-[14px]" style={{ color: rec.iconColor }}>
                {rec.icon}
              </span>
            </div>

            {/* Text content */}
            <div className="flex flex-col gap-1 flex-1">
              <p className="font-inter text-[12px] leading-[18px] font-normal tracking-[0.3px] text-[#111111]">
                {rec.title}
                <br />
                {rec.subtitle}
              </p>
            </div>

            {/* Arrow CTA */}
            <span className="material-icons-outlined text-[20px] text-text-primary shrink-0">
              keyboard_arrow_right
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}