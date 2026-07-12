import { Copy, Check, Tag } from 'lucide-react'
import { useState } from 'react'

// Map offer id → left border color + icon color
const offerStyles = {
  'offer-1': { border: 'border-l-[#2563EB]', icon: 'text-[#2563EB]', iconBg: 'bg-[#DBEAFE]', badge: 'bg-[#DBEAFE] text-[#2563EB]' },
  'offer-2': { border: 'border-l-[#F97316]', icon: 'text-[#F97316]', iconBg: 'bg-orange-50', badge: 'bg-orange-100 text-orange-600' },
  'offer-3': { border: 'border-l-purple-500', icon: 'text-purple-600', iconBg: 'bg-purple-50', badge: 'bg-purple-100 text-purple-600' },
  'offer-4': { border: 'border-l-teal-500', icon: 'text-teal-600', iconBg: 'bg-teal-50', badge: 'bg-teal-100 text-teal-700' },
}

export default function OfferCard({ offer }) {
  const [copied, setCopied] = useState(false)
  const style = offerStyles[offer.id] || offerStyles['offer-1']

  const handleCopy = () => {
    navigator.clipboard.writeText(offer.code).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={`bg-white border border-[#E2E8F0] border-l-4 ${style.border} rounded-xl p-5 hover:shadow-md transition-all duration-200 group cursor-pointer`}>
      {/* Header: icon + badge + discount */}
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl ${style.iconBg} flex items-center justify-center shrink-0`}>
          <Tag size={18} className={style.icon} />
        </div>
        <div className="text-right">
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${style.badge}`}>{offer.badge}</span>
          <p className="text-xl font-extrabold text-[#0F172A] mt-1">{offer.discount}</p>
        </div>
      </div>

      {/* Title + Description */}
      <h3 className="font-bold text-[#0F172A] text-sm mb-1 leading-snug">{offer.title}</h3>
      <p className="text-[#64748B] text-xs mb-4 leading-relaxed line-clamp-2">{offer.description}</p>

      {/* Coupon code row */}
      <div className="flex items-center gap-2 mb-3">
        <div className="flex-1 flex items-center gap-2 bg-slate-50 border border-dashed border-slate-200 rounded-lg px-3 py-2">
          <span className="text-[#64748B] text-xs">Code:</span>
          <span className="font-mono font-bold text-sm text-[#0F172A] tracking-widest">{offer.code}</span>
        </div>
        <button
          onClick={handleCopy}
          className="p-2 rounded-lg border border-[#E2E8F0] hover:bg-[#DBEAFE] hover:border-[#2563EB] transition-colors shrink-0"
          aria-label="Copy code"
        >
          {copied ? <Check size={14} className="text-green-600" /> : <Copy size={14} className="text-[#64748B]" />}
        </button>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <p className="text-[#64748B] text-xs">Valid until {new Date(offer.validUntil).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
        <button className={`text-xs font-bold ${style.icon} hover:underline`}>View Details →</button>
      </div>
    </div>
  )
}
