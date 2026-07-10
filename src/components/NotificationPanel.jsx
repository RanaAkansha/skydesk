import { CheckCircle, AlertTriangle, XCircle, RefreshCw, Bell, Clock, IndianRupee } from 'lucide-react'
import notifications from '../data/notifications.json'

const iconMap = {
  CheckCircle,
  AlertTriangle,
  XCircle,
  RefreshCw,
  Bell,
  Clock,
  IndianRupee,
}

const typeStyles = {
  success: { dot: 'bg-green-500', bg: 'bg-green-50', icon: 'text-green-600' },
  warning: { dot: 'bg-yellow-500', bg: 'bg-yellow-50', icon: 'text-yellow-600' },
  danger:  { dot: 'bg-red-500',   bg: 'bg-red-50',   icon: 'text-red-500' },
  info:    { dot: 'bg-blue-500',  bg: 'bg-blue-50',  icon: 'text-blue-600' },
}

function timeAgo(isoString) {
  const diff = Math.floor((Date.now() - new Date(isoString).getTime()) / 1000)
  if (diff < 60) return `${diff}s ago`
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  return `${Math.floor(diff / 86400)}d ago`
}

export default function NotificationPanel() {
  return (
    <div className="bg-white rounded-xl border border-slate-200">
      <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-slate-900">Notifications</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            {notifications.filter((n) => !n.read).length} unread
          </p>
        </div>
        <button className="text-sm text-blue-600 font-medium hover:underline">Mark all read</button>
      </div>

      <ul className="divide-y divide-slate-50 max-h-[480px] overflow-y-auto">
        {notifications.map((n) => {
          const Icon = iconMap[n.icon] || Bell
          const style = typeStyles[n.type] || typeStyles.info
          return (
            <li
              key={n.id}
              className={`flex gap-3 px-5 py-3.5 hover:bg-slate-50 transition-colors duration-100 ${!n.read ? 'bg-blue-50/30' : ''}`}
            >
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-0.5 ${style.bg}`}>
                <Icon size={15} className={style.icon} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-semibold text-slate-800 leading-snug">{n.title}</p>
                  <span className="text-xs text-slate-400 whitespace-nowrap flex-shrink-0">{timeAgo(n.timestamp)}</span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{n.message}</p>
              </div>
              {!n.read && (
                <div className={`w-2 h-2 rounded-full flex-shrink-0 mt-2 ${style.dot}`} />
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
