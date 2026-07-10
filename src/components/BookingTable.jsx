import bookings from '../data/bookings.json'

const statusConfig = {
  Confirmed: 'bg-green-100 text-green-700',
  Pending:   'bg-yellow-100 text-yellow-700',
  Cancelled: 'bg-red-100 text-red-700',
}

function StatusBadge({ status }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusConfig[status] || 'bg-slate-100 text-slate-600'}`}>
      {status}
    </span>
  )
}

export default function BookingTable() {
  return (
    <div className="bg-white rounded-xl border border-slate-200">
      <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-slate-900">Recent Bookings</h2>
          <p className="text-xs text-slate-400 mt-0.5">Latest 15 booking transactions</p>
        </div>
        <button className="text-sm text-blue-600 font-medium hover:underline">View All</button>
      </div>

      {/* Horizontal scroll wrapper so table doesn't break on small screens */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left min-w-[760px]">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              {['Booking ID', 'Passenger', 'Flight', 'Destination', 'Travel Date', 'Status', 'Amount'].map((h) => (
                <th key={h} className="px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {bookings.map((b) => (
              <tr key={b.id} className="hover:bg-slate-50 transition-colors duration-100">
                <td className="px-4 py-3 font-mono text-xs font-medium text-blue-600">{b.id}</td>
                <td className="px-4 py-3">
                  <div className="font-medium text-slate-800">{b.passenger}</div>
                  <div className="text-xs text-slate-400">{b.airline}</div>
                </td>
                <td className="px-4 py-3 font-medium text-slate-700">{b.flight}</td>
                <td className="px-4 py-3">
                  <div className="text-slate-800">{b.destination}</div>
                  <div className="text-xs text-slate-400">from {b.origin}</div>
                </td>
                <td className="px-4 py-3 text-slate-600 whitespace-nowrap">
                  {new Date(b.travelDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={b.status} />
                </td>
                <td className="px-4 py-3 font-semibold text-slate-800 whitespace-nowrap">
                  ₹{b.amount.toLocaleString('en-IN')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
