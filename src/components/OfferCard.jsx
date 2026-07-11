import { Copy, Check } from 'lucide-react'
import { useState } from 'react'

const gradients = {
  'from-blue-600 to-blue-800': 'from-blue-600 to-blue-800',
  'from-orange-500 to-red-500': 'from-orange-500 to-red-500',
  'from-purple-500 to-indigo-600': 'from-purple-500 to-indigo-600',
  'from-teal-500 to-cyan-600': 'from-teal-500 to-cyan-600',
}

export default function OfferCard({ offer }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(offer.code).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const gradient = gradients[offer.gradient] || 'from-blue-600 to-blue-800'

  return (
    <div className={`bg-gradient-to-br ${gradient} rounded-2xl p-5 text-white relative overflow-hidden group cursor-pointer`}>
      {/* Background decoration */}
      <div className="absolute -top-6 -right-6 w-28 h-28 bg-white/10 rounded-full pointer-events-none" />
      <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-white/10 rounded-full pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-3">
          <span className="text-xs font-bold bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-full">
            {offer.badge}
          </span>
          <span className="text-2xl font-extrabold text-white/90">{offer.discount}</span>
        </div>

        <h3 className="font-bold text-base mb-1.5 leading-snug">{offer.title}</h3>
        <p className="text-white/70 text-xs mb-4 leading-relaxed line-clamp-2">{offer.description}</p>

        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 bg-black/20 rounded-lg px-3 py-1.5 flex-1">
            <span className="text-white/60 text-xs">Code:</span>
            <span className="font-mono font-bold text-sm text-white tracking-wide">{offer.code}</span>
          </div>
          <button
            onClick={handleCopy}
            className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors shrink-0"
            aria-label="Copy code"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
          </button>
        </div>

        <p className="text-white/50 text-xs mt-2">Valid until {new Date(offer.validUntil).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
      </div>
    </div>
  )
}
