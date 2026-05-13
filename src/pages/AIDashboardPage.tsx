import { useState } from 'react'
import { Button, Badge } from '@delhivery/tarmac'

const popularQueries = [
  'How many orders are in same status more than 24 hours in last 7 days except Shipped and Cancelled?',
  'Trend of orders created and % orders shipped each day for the last 1 week',
  'How does this week\'s order volume compare to the previous week?',
  'What is the average time from order creation to packed?',
  'What is the trend of cancellations in the last week?',
  'Show top 10 SKUs by order volume this month',
  'Which routes have the highest delivery success rate?',
  'What is the average delivery time by warehouse?',
]

const categories = [
  { icon: 'trending_up', label: 'Order Trends' },
  { icon: 'inventory_2', label: 'Inventory' },
]

interface Message {
  role: 'user' | 'assistant'
  content: string
  data?: any
}

// Mock responses
const mockResponses: Record<string, any> = {
  'How many orders are in same status more than 24 hours in last 7 days except Shipped and Cancelled?': {
    text: '**142 orders** have been in the same status for more than 24 hours.',
    metric: { label: 'Order Count', value: '142' },
    notes: ['Client: Havells India LTD', 'FC: BBNFC26', 'Period: Last 7 days (May 06 – May 13, 2026)', 'Found 1 results.'],
    insights: ['Analyze the average time orders spend in each status.', 'Identify the statuses with the highest number of delayed orders.', 'Investigate the reasons for delays in these orders.'],
  },
  'How does this week\'s order volume compare to the previous week?': {
    text: 'This week\'s order volume is **2981**, which is **less** than the previous week\'s volume of **4200**.',
    table: { headers: ['Week', 'Order Volume'], rows: [['Previous Week', '4200'], ['This Week', '2981']] },
    notes: ['Client: Havells India LTD', 'Period: Last 7 days (May 06 – May 13, 2026)', 'Found 2 results.'],
    insights: ['What is the daily order volume for the last two weeks?', 'What is the percentage change in order volume between this week and last week?', 'What are the top 5 products ordered this week compared to last week?'],
  },
  'Trend of orders created and % orders shipped each day for the last 1 week': {
    text: 'Daily order creation and shipping percentage for the last 7 days:',
    table: { headers: ['Date', 'Orders Created', 'Percentage Orders Shipped'], rows: [['06 May 2026', '627', '96.27'], ['07 May 2026', '745', '68.37'], ['08 May 2026', '775', '89.61'], ['09 May 2026', '514', '69.86'], ['10 May 2026', '36', '56.86'], ['11 May 2026', '648', '89.86'], ['12 May 2026', '352', '66.52'], ['13 May 2026', '454', '3.2']] },
    notes: ['Client: Havells India LTD', 'Period: Last 7 days'],
    insights: ['Which day had the lowest shipping rate?', 'What caused the drop on May 13?'],
  },
}

export default function AIDashboardPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSend = (query: string) => {
    if (!query.trim()) return
    
    const userMsg: Message = { role: 'user', content: query }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const response = mockResponses[query] || {
        text: `Based on your query, here's what I found:\n\nAnalyzing "${query}"...\n\nThe data shows normal patterns across your facilities. No anomalies detected in the requested timeframe.`,
        notes: ['Client: Havells India LTD', 'Period: Last 7 days'],
        insights: ['Try asking about specific metrics', 'Narrow down by facility or date range'],
      }
      const assistantMsg: Message = { role: 'assistant', content: response.text, data: response }
      setMessages(prev => [...prev, assistantMsg])
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="flex flex-col h-full -m-5">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 bg-[#1e222d] text-white shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#fdf0f2] rounded-full flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 28 28" fill="none"><path d="M14 5L7 9v10l7 4 7-4V9l-7-4z" fill="#ed1b36"/></svg>
          </div>
          <div>
            <span className="font-sans text-[14px] font-semibold">Godam Assistant</span>
            <p className="font-sans text-[11px] text-[#9ca3af]">Always here to help</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="white" buttonStyle="secondary" size="sm" leadingIcon={<span className="material-icons-outlined text-[14px]">add</span>}>
            New Chat
          </Button>
          <button className="text-white/60 hover:text-white">
            <span className="material-icons-outlined text-[20px]">close</span>
          </button>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        {messages.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center h-full gap-6">
            <div className="w-12 h-12 bg-[#fdf0f2] rounded-full flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 28 28" fill="none"><path d="M14 5L7 9v10l7 4 7-4V9l-7-4z" fill="#ed1b36"/></svg>
            </div>
            <div className="text-center">
              <h2 className="font-sans text-[20px] font-bold text-[#111111]">What can I help you find?</h2>
              <p className="font-sans text-[14px] text-[#6b7280] mt-1">Ask questions about your warehouse data — orders, inventory, shipments, and more.</p>
            </div>

            {/* Input */}
            <div className="w-full max-w-[600px] flex items-center h-12 px-4 bg-[#f7f7f7] border border-[#e6e6e6] rounded-full gap-2">
              <input
                type="text"
                placeholder="Ask Godam Assistant..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend(input)}
                className="flex-1 border-none outline-none bg-transparent font-sans text-[14px] text-[#111111] placeholder:text-[#9ca3af]"
              />
              <button onClick={() => handleSend(input)} className="w-8 h-8 rounded-full bg-[#e6e6e6] flex items-center justify-center hover:bg-[#d1d5db] transition-colors">
                <span className="material-icons-outlined text-[16px] text-[#6b7280]">arrow_upward</span>
              </button>
            </div>

            {/* Categories */}
            <div className="flex gap-3">
              {categories.map((cat, i) => (
                <div key={i} className="flex items-center gap-2 px-4 py-2 border border-[#e6e6e6] rounded-lg cursor-pointer hover:bg-[#f7f7f7] transition-colors">
                  <span className="material-icons-outlined text-[18px] text-[#6b7280]">{cat.icon}</span>
                  <span className="font-sans text-[13px] text-[#2b2b2b]">{cat.label}</span>
                </div>
              ))}
            </div>

            {/* Popular Queries */}
            <div className="w-full max-w-[700px]">
              <h3 className="font-sans text-[13px] font-semibold text-[#111111] mb-3">Popular Queries</h3>
              <div className="grid grid-cols-2 gap-2">
                {popularQueries.slice(0, 6).map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(q)}
                    className="text-left px-3 py-2.5 border border-[#e6e6e6] rounded-lg font-sans text-[12px] text-[#4b5563] hover:bg-[#f7f7f7] hover:border-[#d1d5db] transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Messages */
          <div className="flex flex-col gap-6 max-w-[800px] mx-auto">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start gap-3'}`}>
                {msg.role === 'assistant' && (
                  <div className="w-7 h-7 bg-[#fdf0f2] rounded-full flex items-center justify-center shrink-0 mt-1">
                    <svg width="12" height="12" viewBox="0 0 28 28" fill="none"><path d="M14 5L7 9v10l7 4 7-4V9l-7-4z" fill="#ed1b36"/></svg>
                  </div>
                )}
                <div className={`max-w-[85%] ${msg.role === 'user' ? 'bg-[#1e222d] text-white px-4 py-2.5 rounded-2xl rounded-br-sm' : ''}`}>
                  {msg.role === 'user' ? (
                    <span className="font-sans text-[13px]">{msg.content}</span>
                  ) : (
                    <div className="flex flex-col gap-3">
                      {/* Metric card */}
                      {msg.data?.metric && (
                        <div className="border border-[#e6e6e6] rounded-lg p-4">
                          <span className="font-sans text-[12px] text-[#6b7280]">{msg.data.metric.label}</span>
                          <p className="font-sans text-[24px] font-bold text-[#111111]">{msg.data.metric.value}</p>
                        </div>
                      )}

                      {/* Text */}
                      <p className="font-sans text-[13px] text-[#2b2b2b] leading-[20px]" dangerouslySetInnerHTML={{ __html: msg.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />

                      {/* Table */}
                      {msg.data?.table && (
                        <div className="border border-[#e6e6e6] rounded-lg overflow-hidden">
                          <table className="w-full">
                            <thead>
                              <tr className="bg-[#f5f6f8]">
                                {msg.data.table.headers.map((h: string, j: number) => (
                                  <th key={j} className="text-left px-4 py-2 font-sans text-[12px] font-medium text-[#6b7280]">{h}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {msg.data.table.rows.map((row: string[], j: number) => (
                                <tr key={j} className="border-t border-[#e6e6e6]">
                                  {row.map((cell: string, k: number) => (
                                    <td key={k} className="px-4 py-2 font-sans text-[13px] text-[#2b2b2b]">{cell}</td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}

                      {/* Notes */}
                      {msg.data?.notes && (
                        <div className="border-l-2 border-[#e6e6e6] pl-3 py-1">
                          <span className="font-sans text-[11px] font-bold text-[#111111] uppercase">Note</span>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {msg.data.notes.map((note: string, j: number) => (
                              <Badge key={j} variant="white" size="sm" badgeType="subtle" text={note} />
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Discover More Insights */}
                      {msg.data?.insights && (
                        <div>
                          <span className="font-sans text-[11px] font-bold text-[#ed1b36] uppercase">Discover More Insights</span>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {msg.data.insights.map((insight: string, j: number) => (
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

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-3">
                          <span className="font-sans text-[11px] text-[#9ca3af] cursor-pointer hover:text-[#6b7280]">↻ View Query</span>
                          <span className="material-icons-outlined text-[14px] text-[#9ca3af] cursor-pointer hover:text-[#6b7280]">thumb_up_off_alt</span>
                          <span className="material-icons-outlined text-[14px] text-[#9ca3af] cursor-pointer hover:text-[#6b7280]">thumb_down_off_alt</span>
                          <span className="material-icons-outlined text-[14px] text-[#9ca3af] cursor-pointer hover:text-[#6b7280]">content_copy</span>
                        </div>
                        <span className="font-sans text-[11px] text-[#9ca3af]">Elapsed Time: 9s · 0.8581 credits</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3">
                <div className="w-7 h-7 bg-[#fdf0f2] rounded-full flex items-center justify-center shrink-0">
                  <svg width="12" height="12" viewBox="0 0 28 28" fill="none"><path d="M14 5L7 9v10l7 4 7-4V9l-7-4z" fill="#ed1b36"/></svg>
                </div>
                <div className="flex items-center gap-1 py-2">
                  <div className="w-2 h-2 bg-[#9ca3af] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-[#9ca3af] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-[#9ca3af] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Input Bar (when messages exist) */}
      {messages.length > 0 && (
        <div className="px-6 py-4 border-t border-[#e6e6e6] shrink-0">
          <div className="flex items-center h-12 px-4 bg-[#f7f7f7] border border-[#e6e6e6] rounded-full gap-2 max-w-[800px] mx-auto">
            <input
              type="text"
              placeholder="Ask Godam Assistant..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend(input)}
              className="flex-1 border-none outline-none bg-transparent font-sans text-[14px] text-[#111111] placeholder:text-[#9ca3af]"
            />
            <button onClick={() => handleSend(input)} className="w-8 h-8 rounded-full bg-[#e6e6e6] flex items-center justify-center hover:bg-[#d1d5db] transition-colors">
              <span className="material-icons-outlined text-[16px] text-[#6b7280]">arrow_upward</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}