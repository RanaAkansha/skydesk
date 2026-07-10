import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts'
import dashboardData from '../data/dashboard.json'

function RevenueTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-200 rounded-lg px-3 py-2 shadow-lg text-sm">
        <p className="font-semibold text-slate-800">{label}</p>
        <p className="text-orange-500 font-medium">
          ₹{(payload[0].value / 100000).toFixed(1)}L
        </p>
      </div>
    )
  }
  return null
}

export default function RevenueChart() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5">
      <div className="mb-4">
        <h2 className="text-base font-semibold text-slate-900">Revenue Overview</h2>
        <p className="text-xs text-slate-400 mt-0.5">Monthly revenue (Jan – Jul)</p>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={dashboardData.revenueData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: '#94a3b8' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 12, fill: '#94a3b8' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`}
          />
          <Tooltip content={<RevenueTooltip />} />
          <Bar dataKey="revenue" fill="#f97316" radius={[4, 4, 0, 0]} maxBarSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
