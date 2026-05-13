import { useState } from 'react'
import { Badge } from '@delhivery/tarmac'

// ─── Types ────────────────────────────────────────────────────────────────────
interface Message { role: 'user' | 'assistant'; content: string }
interface ResultData {
  title: string
  metric?: { label: string; value: string; trend?: string }
  summary?: string
  table?: { headers: string[]; rows: string[][] }
  chart?: { type: 'bar' | 'line'; data: { label: string; value: number; value2?: number }[] }
  notes?: string[]
  insights?: string[]
}

// ─── Mock Data ────────────────────────────────────────────────────────────────
const contextAlerts = [
  { icon: '⚠️', text: '12 orders stuck >6h in Picked — investigate?', query: 'Show orders stuck in Picked status for more than 6 hours' },
  { icon: '📉', text: 'S2D dropped 8% today — show breakdown?', query: 'What is the S2D adherence breakdown by courier today?' },
  { icon: '🔴', text: '3 SKUs expiring in 48h', query: 'Which SKUs are expiring in the next 48 hours?' },
]

const popularQueries = [
  'How many orders are in same status more than 24 hours in last 7 days except Shipped and Cancelled?',
  'Trend of orders created and % orders shipped each day for the last 1 week',
  'How does this week\'s order volume compare to the previous week?',
  'What is the average time from order creation to packed?',
  'What is the trend of cancellations in the last week?',
  'Show top 10 SKUs by order volume this month',
]

const mockResults: Record<string, ResultData> = {
  'How many orders are in same status more than 24 hours in last 7 days except Shipped and Cancelled?': {
    title: 'Stagnant Orders (>24h same status)',
    metric: { label: 'Order Count', value: '142', trend: '+12%' },
    summary: '142 orders have been in the same status for more than 24 hours.',
    table: { headers: ['Status', 'Count', '% of Total'], rows: [['Pending', '68', '47.9%'], ['Picked', '34', '23.9%'], ['Packed', '28', '19.7%'], ['Ready to Ship', '12', '8.5%']] },
    chart: { type: 'bar', data: [{ label: 'Pending', value: 68 }, { label: 'Picked', value: 34 }, { label: 'Packed', value: 28 }, { label: 'Ready to Ship', value: 12 }] },
    notes: ['Client: Havells India LTD', 'Period: May 06 – May 13, 2026'],
    insights: ['Analyze average time in each status.', 'Which facility has most delays?'],
  },
  'Trend of orders created and % orders shipped each day for the last 1 week': {
    title: 'Daily Order Trend & Shipping %',
    summary: 'Daily order creation and shipping percentage for the last 7 days.',
    table: { headers: ['Date', 'Orders Created', '% Shipped'], rows: [['06 May', '627', '96.3%'], ['07 May', '745', '68.4%'], ['08 May', '775', '89.6%'], ['09 May', '514', '69.9%'], ['10 May', '36', '56.9%'], ['11 May', '648', '89.9%'], ['12 May', '352', '66.5%'], ['13 May', '454', '3.2%']] },
    chart: { type: 'line', data: [{ label: '06', value: 627, value2: 96 }, { label: '07', value: 745, value2: 68 }, { label: '08', value: 775, value2: 90 }, { label: '09', value: 514, value2: 70 }, { label: '10', value: 36, value2: 57 }, { label: '11', value: 648, value2: 90 }, { label: '12', value: 352, value2: 67 }, { label: '13', value: 454, value2: 3 }] },
    notes: ['Period: Last 7 days'],
    insights: ['What caused the drop on May 13?', 'Which courier had lowest rate?'],
  },
  'How does this week\'s order volume compare to the previous week?': {
    title: 'Week-over-Week Comparison',
    metric: { label: 'Change', value: '-29%', trend: '↓' },
    summary: 'This week: 2,981 orders vs Previous week: 4,200 orders.',
    table: { headers: ['Week', 'Volume'], rows: [['Previous', '4,200'], ['Current', '2,981']] },
    chart: { type: 'bar', data: [{ label: 'Previous Week', value: 4200 }, { label: 'This Week', value: 2981 }] },
    notes: ['Client: Havells India LTD'],
    insights: ['Daily breakdown?', 'Top products this week vs last?'],
  },
  'What is the average time from order creation to packed?': {
    title: 'Avg. Order → Packed Time',
    metric: { label: 'Average', value: '4.2 hrs' },
    summary: 'Average time from creation to packed across all facilities.',
    table: { headers: ['Facility', 'Avg (hrs)', 'Orders'], rows: [['DELFC1', '3.8', '450'], ['AMDFC1', '4.1', '320'], ['BLRFC1', '4.9', '280'], ['AMDFC2', '4.5', '190']] },
    chart: { type: 'bar', data: [{ label: 'DELFC1', value: 3.8 }, { label: 'AMDFC1', value: 4.1 }, { label: 'BLRFC1', value: 4.9 }, { label: 'AMDFC2', value: 4.5 }] },
    notes: ['Period: Last 7 days'],
    insights: ['Breakdown by product category?', 'Which step takes longest?'],
  },
  'What is the trend of cancellations in the last week?': {
    title: 'Cancellation Trend',
    metric: { label: 'Total', value: '89', trend: '+12%' },
    summary: 'Cancellations increased 12% vs previous week.',
    table: { headers: ['Date', 'Cancellations', 'Rate'], rows: [['06 May', '8', '1.3%'], ['07 May', '12', '1.6%'], ['08 May', '15', '1.9%'], ['09 May', '11', '2.1%'], ['10 May', '5', '13.9%'], ['11 May', '18', '2.8%'], ['12 May', '10', '2.8%'], ['13 May', '10', '2.2%']] },
    chart: { type: 'line', data: [{ label: '06', value: 8 }, { label: '07', value: 12 }, { label: '08', value: 15 }, { label: '09', value: 11 }, { label: '10', value: 5 }, { label: '11', value: 18 }, { label: '12', value: 10 }, { label: '13', value: 10 }] },
    notes: ['Client: Havells India LTD'],
    insights: ['Top cancellation reasons?', 'Which SKUs cancel most?'],
  },
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function AIDashboardPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [currentResult, setCurrentResult] = useState<ResultData | null>(null)

  const handleSend = (query: string) => {
    if (!query.trim()) return
    setMessages(prev => [...prev, { role: 'user', content: query }])
    setInput('')
    setIsLoading(true)
    setTimeout(() => {
      const result = mockResults[query] || { title: 'Query Results', summary: `Analyzing: "${query}"...`, notes: ['Period: Last 7 days'], insights: ['Try a more specific query'] }
      setMessages(prev => [...prev, { role: 'assistant', content: result.summary || '' }])
      setCurrentResult(result)
      setIsLoading(false)
    }, 1200)
  }

  return (
    <div className="flex h-full -m-5">
      {/* LEFT: Chat */}
      <div className="w-[360px] shrink-0 flex flex-col border-r border-[#e6e6e6] bg-white">
        <div className="flex items-center justify-between px-4 py-3 bg-[#1e222d] text-white shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#fdf0f2] rounded-full flex items-center justify-center">
              <svg width="10" height="10" viewBox="0 0 28 28" fill="none"><path d="M14 5L7 9v10l7 4 7-4V9l-7-4z" fill="#ed1b36"/></svg>
            </div>
            <span className="font-sans text-[12px] font-semibold">Godam Assistant</span>
          </div>
          <button className="text-[10px] text-white/70 border border-white/30 px-2 py-0.5 rounded hover:bg-white/10">+ New</button>
        </div>

        {/* Context Alerts */}
        <div className="px-3 py-2 border-b border-[#e6e6e6] flex flex-col gap-1.5">
          {contextAlerts.map((alert, i) => (
            <button key={i} onClick={() => handleSend(alert.query)} className="flex items-center gap-2 px-2 py-1.5 rounded-md text-left hover:bg-[#fdf8f8] transition-colors border border-transparent hover:border-[#fce4ec]">
              <span className="text-[12px]">{alert.icon}</span>
              <span className="font-sans text-[11px] text-[#4b5563] leading-[14px]">{alert.text}</span>
            </button>
          ))}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-3 py-3 flex flex-col gap-2">
          {messages.length === 0 ? (
            <div className="flex flex-col gap-2 mt-2">
              <p className="font-sans text-[10px] text-[#9ca3af] uppercase font-semibold px-1">Popular Queries</p>
              {popularQueries.map((q, i) => (
                <button key={i} onClick={() => handleSend(q)} className="text-left px-2.5 py-2 border border-[#e6e6e6] rounded-lg font-sans text-[11px] text-[#4b5563] hover:bg-[#f7f7f7] transition-colors leading-[15px]">
                  {q}
                </button>
              ))}
            </div>
          ) : (
            messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[90%] px-2.5 py-1.5 rounded-xl font-sans text-[11px] leading-[16px] ${msg.role === 'user' ? 'bg-[#1e222d] text-white rounded-br-sm' : 'bg-[#f3f4f6] text-[#2b2b2b] rounded-bl-sm'}`}>
                  {msg.content}
                </div>
              </div>
            ))
          )}
          {isLoading && (
            <div className="flex gap-1 py-1 px-2">
              <div className="w-1.5 h-1.5 bg-[#9ca3af] rounded-full animate-bounce" />
              <div className="w-1.5 h-1.5 bg-[#9ca3af] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-1.5 h-1.5 bg-[#9ca3af] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          )}
        </div>

        {/* Input */}
        <div className="px-3 py-2 border-t border-[#e6e6e6] shrink-0">
          <div className="flex items-center h-9 px-3 bg-[#f7f7f7] border border-[#e6e6e6] rounded-full gap-2">
            <input type="text" placeholder="Ask anything..." value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend(input)} className="flex-1 border-none outline-none bg-transparent font-sans text-[11px] text-[#111] placeholder:text-[#9ca3af]" />
            {/* Popular queries popover */}
            <div className="relative group">
              <button className="w-5 h-5 rounded-full bg-white border border-[#e6e6e6] flex items-center justify-center hover:bg-[#f3f4f6]">
                <span className="material-icons-outlined text-[12px] text-[#6b7280]">lightbulb</span>
              </button>
              <div className="hidden group-hover:flex absolute bottom-7 right-0 w-[280px] bg-white border border-[#e6e6e6] rounded-lg shadow-lg p-2 flex-col gap-1 z-50">
                <span className="font-sans text-[9px] text-[#9ca3af] uppercase font-semibold px-2 py-1">Suggested Queries</span>
                {popularQueries.slice(0, 5).map((q, i) => (
                  <button key={i} onClick={() => handleSend(q)} className="text-left px-2 py-1.5 rounded font-sans text-[10px] text-[#4b5563] hover:bg-[#f7f7f7] transition-colors leading-[14px]">
                    {q}
                  </button>
                ))}
              </div>
            </div>
            <button onClick={() => handleSend(input)} className="w-5 h-5 rounded-full bg-[#1e222d] flex items-center justify-center">
              <span className="material-icons-outlined text-[12px] text-white">arrow_upward</span>
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT: Dashboard */}
      <div className="flex-1 overflow-y-auto bg-[#f7f7f7] p-5">
        {/* Fixed Dashboard Section */}
        <div className="flex flex-col gap-5">
          {/* Health Score + Pipeline */}
          <div className="grid grid-cols-4 gap-4">
            <HealthCard label="Health Score" value="78" color="#1ba86e" />
            <HealthCard label="SLA Adherence" value="72%" color="#5b80f7" />
            <HealthCard label="Orders Today" value="454" color="#1e222d" />
            <HealthCard label="Cancellation Rate" value="2.2%" color="#dc143c" />
          </div>

          {/* Pipeline Funnel */}
          <div className="bg-white rounded-lg border border-[#e6e6e6] p-4">
            <h3 className="font-sans text-[12px] font-semibold text-[#111] mb-3">Orders Pipeline (Today)</h3>
            <div className="flex items-center gap-1">
              {[{ label: 'Pending', value: 268, color: '#f59e0b' }, { label: 'Picked', value: 224, color: '#5b80f7' }, { label: 'Packed', value: 198, color: '#8b5cf6' }, { label: 'Shipped', value: 415, color: '#1ba86e' }, { label: 'Cancelled', value: 121, color: '#dc143c' }].map((step, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full h-8 rounded flex items-center justify-center" style={{ backgroundColor: step.color + '15' }}>
                    <span className="font-sans text-[12px] font-bold" style={{ color: step.color }}>{step.value}</span>
                  </div>
                  <span className="font-sans text-[9px] text-[#6b7280]">{step.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 7-Day Sparkline */}
          <div className="bg-white rounded-lg border border-[#e6e6e6] p-4">
            <h3 className="font-sans text-[12px] font-semibold text-[#111] mb-3">7-Day Order Volume</h3>
            <div className="flex items-end gap-2 h-16">
              {[627, 745, 775, 514, 36, 648, 352].map((v, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full rounded-t" style={{ height: `${(v / 800) * 100}%`, backgroundColor: '#5b80f7', minHeight: 4 }} />
                  <span className="font-sans text-[8px] text-[#9ca3af]">{['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* AI Results Section */}
          {currentResult && (
            <>
              <div className="h-px bg-[#e6e6e6]" />
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-sans text-[16px] font-bold text-[#111]">{currentResult.title}</h2>
                  <div className="flex gap-2">
                    <button className="px-2 py-1 border border-[#e6e6e6] rounded text-[10px] font-sans text-[#4b5563] hover:bg-[#f3f4f6]">📥 Export</button>
                    <button className="px-2 py-1 border border-[#e6e6e6] rounded text-[10px] font-sans text-[#4b5563] hover:bg-[#f3f4f6]">📌 Pin</button>
                    <button className="px-2 py-1 border border-[#e6e6e6] rounded text-[10px] font-sans text-[#4b5563] hover:bg-[#f3f4f6]">🔗 Share</button>
                  </div>
                </div>

                {/* Metric */}
                {currentResult.metric && (
                  <div className="bg-white rounded-lg border border-[#e6e6e6] p-4 w-fit">
                    <span className="font-sans text-[11px] text-[#6b7280]">{currentResult.metric.label}</span>
                    <div className="flex items-baseline gap-2">
                      <span className="font-sans text-[28px] font-bold text-[#111]">{currentResult.metric.value}</span>
                      {currentResult.metric.trend && <span className="font-sans text-[12px] text-[#dc143c]">{currentResult.metric.trend}</span>}
                    </div>
                  </div>
                )}

                {/* Summary */}
                {currentResult.summary && <p className="font-sans text-[13px] text-[#2b2b2b]">{currentResult.summary}</p>}

                {/* Chart */}
                {currentResult.chart && (
                  <div className="bg-white rounded-lg border border-[#e6e6e6] p-4">
                    {currentResult.chart.type === 'bar' ? (
                      <div className="flex items-end gap-3 h-32">
                        {currentResult.chart.data.map((d, i) => {
                          const max = Math.max(...currentResult.chart!.data.map(x => x.value))
                          return (
                            <div key={i} className="flex-1 flex flex-col items-center gap-1">
                              <span className="font-sans text-[10px] text-[#6b7280]">{d.value}</span>
                              <div className="w-full rounded-t bg-[#5b80f7]/80" style={{ height: `${(d.value / max) * 100}%`, minHeight: 4 }} />
                              <span className="font-sans text-[9px] text-[#6b7280] text-center">{d.label}</span>
                            </div>
                          )
                        })}
                      </div>
                    ) : (
                      <div className="flex items-end gap-2 h-32 relative">
                        {currentResult.chart.data.map((d, i) => {
                          const max = Math.max(...currentResult.chart!.data.map(x => x.value))
                          return (
                            <div key={i} className="flex-1 flex flex-col items-center gap-1">
                              <span className="font-sans text-[9px] text-[#6b7280]">{d.value}</span>
                              <div className="w-full rounded-t bg-[#fce4ec]" style={{ height: `${(d.value / max) * 100}%`, minHeight: 4 }} />
                              <span className="font-sans text-[8px] text-[#9ca3af]">{d.label}</span>
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )}

                {/* Table */}
                {currentResult.table && (
                  <div className="bg-white rounded-lg border border-[#e6e6e6] overflow-hidden">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-[#f5f6f8]">
                          {currentResult.table.headers.map((h, j) => (
                            <th key={j} className="text-left px-3 py-2 font-sans text-[11px] font-medium text-[#6b7280] uppercase">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {currentResult.table.rows.map((row, j) => (
                          <tr key={j} className="border-t border-[#e6e6e6]">
                            {row.map((cell, k) => (
                              <td key={k} className="px-3 py-2 font-sans text-[12px] text-[#2b2b2b]">{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Notes */}
                {currentResult.notes && (
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-sans text-[10px] font-bold text-[#111] uppercase">Note:</span>
                    {currentResult.notes.map((n, j) => <Badge key={j} variant="white" size="sm" badgeType="subtle" text={n} />)}
                  </div>
                )}

                {/* Insights */}
                {currentResult.insights && (
                  <div>
                    <span className="font-sans text-[10px] font-bold text-[#ed1b36] uppercase">Discover More</span>
                    <div className="flex flex-wrap gap-2 mt-1.5">
                      {currentResult.insights.map((ins, j) => (
                        <button key={j} onClick={() => handleSend(ins)} className="px-2.5 py-1 border border-[#fce4ec] bg-[#fdf8f8] rounded-full font-sans text-[10px] text-[#4b5563] hover:bg-[#fce4ec] transition-colors">
                          {ins} →
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

function HealthCard({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="bg-white rounded-lg border border-[#e6e6e6] p-3">
      <span className="font-sans text-[10px] text-[#6b7280]">{label}</span>
      <p className="font-sans text-[22px] font-bold mt-0.5" style={{ color }}>{value}</p>
    </div>
  )
}