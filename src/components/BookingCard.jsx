import { Download, Eye, Plane } from 'lucide-react'

const statusConfig = {
  Confirmed: { bg: 'bg-green-50', text: 'text-green-700', dot: 'bg-green-500', label: 'Confirmed' },
  Completed: { bg: 'bg-slate-50', text: 'text-slate-600', dot: 'bg-slate-400', label: 'Completed' },
  Cancelled: { bg: 'bg-red-50', text: 'text-red-600', dot: 'bg-red-500', label: 'Cancelled' },
  Pending: { bg: 'bg-yellow-50', text: 'text-yellow-700', dot: 'bg-yellow-500', label: 'Pending' },
}

export default function BookingCard({ booking }) {
  const status = statusConfig[booking.status] || statusConfig.Pending

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: 'numeric', month: 'short', year: 'numeric'
    })
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-md transition-all duration-200 group">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
            <Plane size={14} className="text-blue-600" />
          </div>
          <div>
            <p className="font-semibold text-slate-800 text-sm">{booking.flightNumber}</p>
            <p className="text-xs text-slate-400">{booking.bookingId}</p>
          </div>
        </div>
        <span className={`text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 ${status.bg} ${status.text}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
          {status.label}
        </span>
      </div>

      {/* Route */}
      <div className="flex items-center gap-2 mb-3">
        <div>
          <p className="font-extrabold text-slate-900 text-lg leading-none">{booking.fromCode}</p>
          <p className="text-xs text-slate-400">{booking.from}</p>
        </div>
        <div className="flex-1 flex items-center gap-1">
          <div className="flex-1 h-px bg-slate-200" />
          <Plane size={12} className="text-slate-300 fill-slate-300" />
          <div className="flex-1 h-px bg-slate-200" />
        </div>
        <div className="text-right">
          <p className="font-extrabold text-slate-900 text-lg leading-none">{booking.toCode}</p>
          <p className="text-xs text-slate-400">{booking.to}</p>
        </div>
      </div>

      {/* Meta */}
      <div className="flex items-center justify-between text-xs text-slate-500 mb-3 pb-3 border-b border-slate-100">
        <span>{formatDate(booking.date)}</span>
        <span>{booking.class}</span>
        <span className="font-bold text-slate-800 text-sm">₹{booking.price.toLocaleString()}</span>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold text-blue-600 border border-blue-200 rounded-lg py-2 hover:bg-blue-50 transition-colors">
          <Eye size={13} />
          View Details
        </button>
        {booking.status !== 'Cancelled' && (
          <button className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-600 border border-slate-200 rounded-lg py-2 hover:bg-slate-50 transition-colors">
            <Download size={13} />
            Download
          </button>
        )}
      </div>
    </div>
  )
}
