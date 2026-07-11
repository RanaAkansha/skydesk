import { FileText, CloudRain, Luggage, MapPin } from 'lucide-react'

const iconMap = {
  FileText,
  CloudRain,
  Luggage,
  MapPin,
}

const colorConfig = {
  blue: { bg: 'bg-blue-50', icon: 'text-blue-600', tag: 'bg-blue-100 text-blue-700', border: 'border-blue-100' },
  cyan: { bg: 'bg-cyan-50', icon: 'text-cyan-600', tag: 'bg-cyan-100 text-cyan-700', border: 'border-cyan-100' },
  purple: { bg: 'bg-purple-50', icon: 'text-purple-600', tag: 'bg-purple-100 text-purple-700', border: 'border-purple-100' },
  orange: { bg: 'bg-orange-50', icon: 'text-orange-600', tag: 'bg-orange-100 text-orange-700', border: 'border-orange-100' },
}

export default function TravelTipCard({ tip }) {
  const Icon = iconMap[tip.icon] || FileText
  const colors = colorConfig[tip.color] || colorConfig.blue

  return (
    <div className={`${colors.bg} border ${colors.border} rounded-xl p-4 hover:shadow-sm transition-all cursor-pointer`}>
      <div className="flex items-start gap-3">
        <div className={`w-9 h-9 rounded-lg bg-white flex items-center justify-center shrink-0 shadow-sm`}>
          <Icon size={17} className={colors.icon} />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-semibold text-slate-800 text-sm">{tip.title}</h4>
            <span className={`text-xs font-bold px-1.5 py-0.5 rounded-md ${colors.tag}`}>{tip.tag}</span>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">{tip.description}</p>
        </div>
      </div>
    </div>
  )
}
