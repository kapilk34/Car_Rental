import React, { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Bot, User, Car } from 'lucide-react'
import { useAppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const suggestCars = (message, cars) => {
  const msg = message.toLowerCase()
  let filtered = cars.filter(c => c.isAvaliable || c.isAvailable)
  let exactMatch = true

  const applyRequiredFilter = (filterFn) => {
    const matches = filtered.filter(filterFn)
    if (matches.length > 0) {
      filtered = matches
    } else {
      exactMatch = false
    }
  }

  const budgetMatch = msg.match(/under\s*\$?(\d+)|less\s*than\s*\$?(\d+)|below\s*\$?(\d+)|max\s*\$?(\d+)|upto?\s*\$?(\d+)/)
  if (budgetMatch) {
    const budget = parseInt(budgetMatch[1] || budgetMatch[2] || budgetMatch[3] || budgetMatch[4] || budgetMatch[5])
    applyRequiredFilter(c => c.pricePerDay <= budget)
  }

  if (/cheap|budget|affordable|low.?cost|inexpensive/.test(msg)) {
    filtered = [...filtered].sort((a, b) => a.pricePerDay - b.pricePerDay)
  }
  if (/luxury|premium|expensive|high.?end|top.?class/.test(msg)) {
    applyRequiredFilter(c =>
      c.category?.toLowerCase().includes('luxury') || c.pricePerDay > 100
    )
  }

  const categories = ['suv', 'sedan', 'hatchback', 'luxury', 'truck', 'van', 'convertible', 'coupe', 'minivan', 'pickup', 'crossover', 'sports']
  categories.forEach(cat => {
    if (msg.includes(cat)) {
      applyRequiredFilter(c => c.category?.toLowerCase().includes(cat))
    }
  })

  if (/\belectric\b|ev\b/.test(msg)) {
    applyRequiredFilter(c => c.fuel_type?.toLowerCase().includes('electric'))
  }
  if (/\bdiesel\b/.test(msg)) {
    applyRequiredFilter(c => c.fuel_type?.toLowerCase().includes('diesel'))
  }
  if (/\bpetrol\b|\bgasoline\b|\bgas\b/.test(msg)) {
    applyRequiredFilter(c => /petrol|gasoline|gas/.test(c.fuel_type?.toLowerCase()))
  }
  if (/\bhybrid\b/.test(msg)) {
    applyRequiredFilter(c => c.fuel_type?.toLowerCase().includes('hybrid'))
  }

  if (/automatic|auto\b/.test(msg)) {
    applyRequiredFilter(c => c.transmission?.toLowerCase().includes('automatic'))
  }
  if (/\bmanual\b/.test(msg)) {
    applyRequiredFilter(c => c.transmission?.toLowerCase().includes('manual'))
  }

  const seatMatch = msg.match(/(\d+)\s*(seat|person|people|passenger|member)/)
  if (seatMatch) {
    const seats = parseInt(seatMatch[1])
    applyRequiredFilter(c => c.seating_capacity >= seats)
  }
  if (/family|spacious|large group|group/.test(msg)) {
    applyRequiredFilter(c => c.seating_capacity >= 5)
  }

  const brands = ['toyota', 'honda', 'bmw', 'mercedes', 'ford', 'hyundai', 'kia', 'audi', 'tesla', 'nissan', 'chevrolet', 'volkswagen', 'mazda', 'subaru', 'jeep', 'lexus']
  brands.forEach(brand => {
    if (msg.includes(brand)) {
      applyRequiredFilter(c => c.brand?.toLowerCase().includes(brand))
    }
  })

  if (/new|latest|recent|2024|2025/.test(msg)) {
    filtered = [...filtered].sort((a, b) => b.year - a.year)
  }

  return { cars: filtered.slice(0, 3), exactMatch }
}


const getBotReply = (message, cars, currency) => {
  const msg = message.toLowerCase()

  if (/^(hi|hello|hey|howdy|good\s*(morning|evening|afternoon|day))/.test(msg)) {
    return {
      text: "Find Your Perfect Ride! \n\nTell me your budget, preferred car type, fuel option, or number of seats — and I'll suggest the best cars for you in seconds.",
      cars: []
    }
  }
  if (/thank|thanks|thank you/.test(msg)) {
    return { text: "You're welcome! Feel free to ask if you need help finding another car.", cars: [] }
  }
  if (/bye|goodbye|see you|cya/.test(msg)) {
    return { text: "Goodbye! Have a great trip!", cars: [] }
  }
  if (/what can you do|help|how does this work|how do i use/.test(msg)) {
    return {
      text: "I can suggest cars based on your needs! Try asking things like:\n• \"SUV under $60/day\"\n• \"Automatic electric car for 5 people\"\n• \"Cheap family car\"\n• \"Luxury sedan\"\n• \"Toyota with manual transmission\"",
      cars: []
    }
  }

  const { cars: suggested, exactMatch } = suggestCars(message, cars)

  if (!exactMatch || suggested.length === 0) {
    const available = cars.filter(c => c.isAvaliable || c.isAvailable)
    const fallback = [...available].sort((a, b) => a.pricePerDay - b.pricePerDay).slice(0, 3)
    return {
      text: "Sorry, I couldn't find a car that satisfies your exact need.\n\nHere are some available recommendations for you:",
      cars: fallback
    }
  }

  const intro = suggested.length === 1
    ? "Here's the best match for you:"
    : `Here are ${suggested.length} cars that match your needs:`

  return { text: intro, cars: suggested }
}

const MessageBubble = ({ msg, currency, onCarClick }) => (
  <div className={`flex flex-col gap-2 ${msg.from === 'user' ? 'items-end' : 'items-start'}`}>
    <div className="flex items-end gap-1.5">
      {msg.from === 'bot' && (
        <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, #2563EB, #4F46E5)' }}>
          <Bot size={13} color="#fff" />
        </div>
      )}
      <div
        className="text-xs px-3 py-2 rounded-2xl max-w-[210px] whitespace-pre-line leading-relaxed"
        style={msg.from === 'user'
          ? { background: 'linear-gradient(135deg, #2563EB, #4F46E5)', color: '#fff', borderBottomRightRadius: 4 }
          : { backgroundColor: '#1C1C2E', color: '#E2E8F0', borderBottomLeftRadius: 4, border: '1px solid rgba(79,70,229,0.2)' }
        }
      >
        {msg.text}
      </div>
      {msg.from === 'user' && (
        <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: '#2F2F2F' }}>
          <User size={13} color="#94A3B8" />
        </div>
      )}
    </div>

    {msg.cars?.length > 0 && (
      <div className="w-full space-y-2 pl-7">
        {msg.cars.map(car => (
          <div
            key={car._id}
            onClick={() => onCarClick(car._id)}
            className="flex items-center gap-2 p-2 rounded-xl cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            style={{ backgroundColor: '#1C1C2E', border: '1px solid rgba(79,70,229,0.35)' }}
          >
            <img
              src={car.image}
              alt={`${car.brand} ${car.model}`}
              className="w-16 h-11 object-cover rounded-lg flex-shrink-0"
              onError={e => { e.target.style.display = 'none' }}
            />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate">{car.brand} {car.model}</p>
              <p className="text-xs truncate" style={{ color: '#94A3B8' }}>
                {car.category} · {car.seating_capacity} seats · {car.fuel_type}
              </p>
              <p className="text-xs font-bold mt-0.5" style={{ color: '#818CF8' }}>
                {currency}{car.pricePerDay}<span style={{ color: '#64748B', fontWeight: 400 }}>/day</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
)

const ChatBot = () => {
  const { cars, currency } = useAppContext()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [messages, setMessages] = useState([
    {
      from: 'bot',
      text: "Hi! I'm your car rental assistant.\n\nDescribe what you need — budget, car type, seats, fuel type — and I'll suggest the best cars for you!",
      cars: []
    }
  ])
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [messages, open])

  const handleCarClick = (carId) => {
    navigate(`/car-details/${carId}`)
    setOpen(false)
  }

  const send = () => {
    const trimmed = input.trim()
    if (!trimmed) return

    setMessages(prev => [...prev, { from: 'user', text: trimmed, cars: [] }])
    setInput('')
    setIsTyping(true)

    setTimeout(() => {
      const reply = getBotReply(trimmed, cars, currency)
      setMessages(prev => [...prev, { from: 'bot', ...reply }])
      setIsTyping(false)
    }, 600)
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(o => !o)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
        style={{
          background: 'linear-gradient(135deg, #2563EB, #4F46E5)',
          boxShadow: open ? '0 4px 20px rgba(79,70,229,0.6)' : '0 4px 20px rgba(37,99,235,0.5)',
        }}
        aria-label={open ? 'Close chat' : 'Open car assistant'}
      >
        {open
          ? <X size={22} color="#fff" />
          : <MessageCircle size={22} color="#fff" />
        }
      </button>

      {open && (
        <div
          className="fixed bottom-24 right-6 z-50 flex flex-col rounded-2xl overflow-hidden"
          style={{
            width: 320,
            height: 500,
            backgroundColor: '#0F0F0F',
            border: '1px solid rgba(79,70,229,0.3)',
            boxShadow: '0 24px 64px rgba(0,0,0,0.7)',
          }}
        >

          <div
            className="flex items-center gap-3 px-4 py-3 flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #2563EB 0%, #4F46E5 100%)' }}
          >
            <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
              <Car size={18} color="#fff" />
            </div>
            <div>
              <p className="text-white text-sm font-semibold leading-tight">Car Assistant</p>
              <p className="text-blue-200 text-xs">Powered by your car listings</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="ml-auto w-7 h-7 rounded-full flex items-center justify-center transition-all hover:bg-white/20"
            >
              <X size={15} color="#fff" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-3" style={{ scrollbarWidth: 'thin', scrollbarColor: '#2F2F2F transparent' }}>
            {messages.map((msg, i) => (
              <MessageBubble
                key={i}
                msg={msg}
                currency={currency}
                onCarClick={handleCarClick}
              />
            ))}

            {isTyping && (
              <div className="flex items-end gap-1.5">
                <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #2563EB, #4F46E5)' }}>
                  <Bot size={13} color="#fff" />
                </div>
                <div className="px-3 py-2 rounded-2xl flex items-center gap-1"
                  style={{ backgroundColor: '#1C1C2E', border: '1px solid rgba(79,70,229,0.2)', borderBottomLeftRadius: 4 }}>
                  {[0, 1, 2].map(i => (
                    <span
                      key={i}
                      className="w-1.5 h-1.5 rounded-full"
                      style={{
                        backgroundColor: '#818CF8',
                        animation: 'bounce 1.2s infinite',
                        animationDelay: `${i * 0.2}s`
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div
            className="flex items-center gap-2 p-3 flex-shrink-0"
            style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
          >
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="e.g. SUV under $60, automatic..."
              className="flex-1 text-xs px-3 py-2.5 rounded-xl outline-none transition-all"
              style={{
                backgroundColor: '#1C1C2E',
                color: '#E2E8F0',
                border: '1px solid rgba(79,70,229,0.25)',
              }}
              onFocus={e => e.target.style.borderColor = 'rgba(79,70,229,0.6)'}
              onBlur={e => e.target.style.borderColor = 'rgba(79,70,229,0.25)'}
            />
            <button
              onClick={send}
              disabled={!input.trim()}
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200 hover:scale-110 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
              style={{ background: 'linear-gradient(135deg, #2563EB, #4F46E5)', color: '#fff' }}
            >
              <Send size={14} />
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-4px); }
        }
      `}</style>
    </>
  )
}

export default ChatBot
