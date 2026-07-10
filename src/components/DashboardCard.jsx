import {
  Plane, CalendarCheck, IndianRupee, XCircle, Clock, Building2,
  TrendingUp, TrendingDown,
} from 'lucide-react'

const iconMap = {
  Plane, CalendarCheck, IndianRupee, XCircle, Clock, Building2,
}

const colorMap = {
  blue:   { bg: 'bg-blue-50',   icon: 'text-blue-600',   badge: 'bg-blue-100 text-blue-700' },
  orange: { bg: 'bg-orange-50', icon: 'text-orange-500', badge: 'bg-orange-100 text-orange-700' },
  green:  { bg: 'bg-green-50',  icon: 'text-green-600',  badge: 'bg-green-100 text-green-700' },
  red:    { bg: 'bg-red-50',    icon: 'text-red-500',    badge: 'bg-red-100 text-red-700' },
  yellow: { bg: 'bg-yellow-50', icon: 'text-yellow-500', badge: 'bg-yellow-100 text-yellow-700' },
  purple: { bg: 'bg-purple-50', icon: 'text-purple-600', badge: 'bg-purple-100 text-purple-700' },
}

export default function DashboardCard({ title, value, icon, trend, trendType, color = 'blue', description }) {
  const Icon = iconMap[icon] || Plane
  const colors = colorMap[color] || colorMap.blue
  const TrendIcon = trendType === 'up' ? TrendingUp : TrendingDown
  const trendColor = trendType === 'up' ? 'text-green-600' : 'text-red-500'

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col gap-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
        </div>
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${colors.bg}`}>
          <Icon size={22} className={colors.icon} strokeWidth={2} />
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        <TrendIcon size={14} className={trendColor} />
        <span className={`text-xs font-semibold ${trendColor}`}>{trend}</span>
        {description && (
          <span className="text-xs text-slate-400">{description}</span>
        )}
      </div>
    </div>
  )
}
