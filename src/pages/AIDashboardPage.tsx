import { useState } from 'react'
import { Badge } from '@delhivery/tarmac'

const popularQueries = [
  'How many orders are in same status more than 24 hours in last 7 days except Shipped and Cancelled?',
  'Trend of orders created and % orders shipped each day for the last 1 week',
  'How does this week\'s order volume compare to the previous week?',
  'What is the average time from order creation to packed?',
  'What is the trend of cancellations in the last week?',
  'Show top 10 SKUs by order volume this month',
]

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface ResultData {
  title: string
  metric?: { label: string; value: string }
  summary?: string
  table?: { headers: string[]; rows: string[][] }
  notes?: string[]
  insights?: string[]
}

const mockResults: Record<string, ResultData> = {
  'How many orders are in same status more than 24 hours in last 7 days except Shipped and Cancelled?': {
    title: 'Stagnant Orders (>24h same status)',
    metric: { label: 'Order Count', value: '142' },
    summary: '142 orders have been in the same status for more than 24 hours.',
    table: { headers: ['Status', 'Count', '% of Total'], rows: [['Pending', '68', '47.9%'], ['Picked', '34', '23.9%'], ['Packed', '28', '19.7%'], ['Ready to Ship', '12', '8.5%']] },
    notes: ['Client: Havells India LTD', 'FC: BBNFC26', 'Period: May 06 – May 13, 2026'],
    insights: ['Analyze average time orders spend in each status.', 'Identify statuses with highest delays.'],
  },
  'Trend of orders created and % orders shipped each day for the last 1 week': {
    title: 'Daily Order Trend & Shipping %',
    summary: 'Daily order creation and shipping percentage for the last 7 days.',
    table: { headers: ['Date', 'Orders Created', '% Shipped'], rows: [['06 May', '627', '96.3%'], ['07 May', '745', '68.4%'], ['08 May', '775', '89.6%'], ['09 May', '514', '69.9%'], ['10 May', '36', '56.9%'], ['11 May', '648', '89.9%'], ['12 May', '352', '66.5%'], ['13 May', '454', '3.2%']] },
    notes: ['Client: Havells India LTD', 'Period: Last 7 days'],
    insights: ['Which day had the lowest shipping rate?', 'What caused the drop on May 13?'],
  },
  'How does this week\'s order volume compare to the previous week?': {
    title: 'Week-over-Week Order Volume',
    metric: { label: 'Change', value: '-29%' },
    summary: 'This week\'s order volume is 2,981 — less than previous week\'s 4,200.',
    table: { headers: ['Week', 'Order Volume'], rows: [['Previous Week', '4,200'], ['This Week', '2,981']] },
    notes: ['Client: Havells India LTD', 'Period: May 06 – May 13, 2026'],
    insights: ['What is the daily breakdown?', 'Top 5 products this week vs last?'],
  },
  'What is the average time from order creation to packed?': {
    title: 'Avg. Order to Packed Time',
    metric: { label: 'Average Time', value: '4.2 hrs' },
    summary: 'The average time from order creation to packed status is 4.2 hours across all facilities.',
    table: { headers: ['Facility', 'Avg Time (hrs)', 'Orders'], rows: [['DELFC1', '3.8', '450'], ['AMDFC1', '4.1', '320'], ['BLRFC1', '4.9', '280'], ['AMDFC2', '4.5', '190']] },
    notes: ['Period: Last 7 days', 'All facilities'],
    insights: ['Which facility is fastest?', 'Breakdown by product category?'],
  },
  'What is the trend of cancellations in the last week?': {
    title: 'Cancellation Trend (Last 7 Days)',
    metric: { label: 'Total Cancellations', value: '89' },
    summary: 'Cancellations have increased 12% compared to the previous week.',
    table: { headers: ['Date', 'Cancellations', 'Cancel Rate'], rows: [['06 May', '8', '1.3%'], ['07 May', '12', '1.6%'], ['08 May', '15', '1.9%'], ['09 May', '11', '2.1%'], ['10 May', '5', '13.9%'], ['11 May', '18', '2.8%'], ['12 May', '10', '2.8%'], ['13 May', '10', '2.2%']] },
    notes: ['Client: Havells India LTD'],
    insights: ['Top reasons for cancellation?', 'Which SKUs have highest cancel rate?'],
  },
}

export default function AIDashboardPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [currentResult, setCurrentResult] = useState<ResultData | null>(null)

  const handleSend = (query: string) => {
    if (!query.trim()) return

    const userMsg: Message = { role: 'user', content: query }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setIsLoading(true)

    setTimeout(() => {
      const result = mockResults[query] || {
        title: 'Query Results',
        summary: `Analyzing: "${query}"\n\nNo anomalies detected in the requested timeframe.`,
        notes: ['Client: Havells India LTD', 'Period: Last 7 days'],
        insights: ['Try asking about specific metrics', 'Narrow down by facility'],
      }
      const assistantMsg: Message = { role: 'assistant', content: result.summary || '' }
      setMessages(prev => [...prev, assistantMsg])
      setCurrentResult(result)
      setIsLoading(false)
    }, 1200)
  }

  return (
    <div className="flex h-full -m-5">
      {/* LEFT PANE: Chat */}
      <div className="w-[380px] shrink-0 flex flex-col border-r border-[#e6e6e6] bg-white">
        {/* Chat Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#1e222d] text-white shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-[#fdf0f2] rounded-full flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 28 28" fill="none"><path d="M14 5L7 9v10l7 4 7-4V9l-7-4z" fill="#ed1b36"/></svg>
            </div>
            <div>
              <span className="font-sans text-[13px] font-semibold">Godam Assistant</span>
              <p className="font-sans text-[10px] text-[#9ca3af]">Always here to help</p>
            </div>
          </div>
          <button className="text-[11px] text-white/70 border border-white/30 px-2 py-1 rounded hover:bg-white/10">+ New Chat</button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
          {messages.length === 0 ? (
            <div className="flex flex-col gap-4 mt-4">
              <p className="font-sans text-[12px] text-[#6b7280] text-center">Ask a question or select from popular queries below</p>
              <div className="flex flex-col gap-2">
                {popularQueries.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(q)}
                    className="text-left px-3 py-2 border border-[#e6e6e6] rounded-lg font-sans text-[11px] text-[#4b5563] hover:bg-[#f7f7f7] transition-colors leading-[16px]"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[90%] px-3 py-2 rounded-xl font-sans text-[12px] leading-[18px] ${msg.role === 'user' ? 'bg-[#1e222d] text-white rounded-br-sm' : 'bg-[#f7f7f7] text-[#2b2b2b] rounded-bl-sm'}`}>
                  {msg.content}
                </div>
              </div>
            ))
          )}
          {isLoading && (
            <div className="flex gap-1 py-2 px-3">
              <div className="w-1.5 h-1.5 bg-[#9ca3af] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-1.5 h-1.5 bg-[#9ca3af] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-1.5 h-1.5 bg-[#9ca3af] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          )}
        </div>

        {/* Input */}
        <div className="px-4 py-3 border-t border-[#e6e6e6] shrink-0">
          <div className="flex items-center h-10 px-3 bg-[#f7f7f7] border border-[#e6e6e6] rounded-full gap-2">
            <input
              type="text"
              placeholder="Ask Godam Assistant..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend(input)}
              className="flex-1 border-none outline-none bg-transparent font-sans text-[12px] text-[#111111] placeholder:text-[#9ca3af]"
            />
            <button onClick={() => handleSend(input)} className="w-6 h-6 rounded-full bg-[#e6e6e6] flex items-center justify-center hover:bg-[#d1d5db]">
              <span className="material-icons-outlined text-[14px] text-[#6b7280]">arrow_upward</span>
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT PANE: Results Dashboard */}
      <div className="flex-1 overflow-y-auto bg-[#f7f7f7] p-6">
        {!currentResult ? (
          <div className="flex flex-col items-center justify-center h-full text-center gap-4">
            <div className="w-16 h-16 bg-[#fdf0f2] rounded-full flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M14 5L7 9v10l7 4 7-4V9l-7-4z" fill="#ed1b36"/></svg>
            </div>
            <h2 className="font-sans text-[18px] font-bold text-[#111111]">What can I help you find?</h2>
            <p className="font-sans text-[13px] text-[#6b7280] max-w-[400px]">Ask a question in the chat panel on the left. Results will appear here as a dashboard.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {/* Title */}
            <h2 className="font-sans text-[18px] font-bold text-[#111111]">{currentResult.title}</h2>

            {/* Metric Card */}
            {currentResult.metric && (
              <div className="bg-white rounded-lg border border-[#e6e6e6] p-5 w-fit">
                <span className="font-sans text-[12px] text-[#6b7280]">{currentResult.metric.label}</span>
                <p className="font-sans text-[32px] font-bold text-[#111111] mt-1">{currentResult.metric.value}</p>
              </div>
            )}

            {/* Summary */}
            {currentResult.summary && (
              <p className="font-sans text-[14px] text-[#2b2b2b] leading-[22px]">{currentResult.summary}</p>
            )}

            {/* Table */}
            {currentResult.table && (
              <div className="bg-white rounded-lg border border-[#e6e6e6] overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-[#f5f6f8]">
                      {currentResult.table.headers.map((h, j) => (
                        <th key={j} className="text-left px-4 py-3 font-sans text-[12px] font-medium text-[#6b7280] uppercase tracking-[0.5px]">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {currentResult.table.rows.map((row, j) => (
                      <tr key={j} className="border-t border-[#e6e6e6]">
                        {row.map((cell, k) => (
                          <td key={k} className="px-4 py-3 font-sans text-[13px] text-[#2b2b2b]">{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Notes */}
            {currentResult.notes && (
              <div className="flex flex-wrap gap-2">
                <span className="font-sans text-[11px] font-bold text-[#111111] uppercase mr-2">Note:</span>
                {currentResult.notes.map((note, j) => (
                  <Badge key={j} variant="white" size="sm" badgeType="subtle" text={note} />
                ))}
              </div>
            )}

            {/* Discover More */}
            {currentResult.insights && (
              <div>
                <span className="font-sans text-[11px] font-bold text-[#ed1b36] uppercase">Discover More Insights</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {currentResult.insights.map((insight, j) => (
                    <button
                      key={j}
                      onClick={() => handleSend(insight)}
                      className="px-3 py-1.5 border border-[#fce4ec] bg-[#fdf8f8] rounded-full font-sans text-[11px] text-[#4b5563] hover:bg-[#fce4ec] transition-colors"
                    >
                      {insight} →
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}