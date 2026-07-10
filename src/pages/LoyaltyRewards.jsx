import { Award, ShieldCheck, Trophy, Sparkles, PlaneTakeoff, Info } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const monthlyMiles = [
  { month: 'Jan', miles: 3200 },
  { month: 'Feb', miles: 4800 },
  { month: 'Mar', miles: 1500 },
  { month: 'Apr', miles: 5500 },
  { month: 'May', miles: 2800 },
  { month: 'Jun', miles: 6700 },
]

function MilesTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 shadow-md text-xs font-semibold text-slate-800">
        <p>{label}</p>
        <p className="text-blue-600 mt-0.5">{payload[0].value.toLocaleString()} miles</p>
      </div>
    )
  }
  return null
}

export default function LoyaltyRewards() {
  const currentMiles = 24500
  const targetMiles = 50000
  const progressPercent = Math.round((currentMiles / targetMiles) * 100)

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Loyalty & Rewards</h1>
        <p className="text-sm text-slate-500 mt-0.5">Track frequent flyer points, tier achievements, and member benefits.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Membership Card Visual */}
        <div className="md:col-span-1 space-y-4">
          <h3 className="font-semibold text-slate-700 text-sm">Membership Card</h3>
          
          <div className="relative h-48 rounded-2xl bg-gradient-to-br from-slate-950 via-blue-950 to-amber-900 text-white p-5 flex flex-col justify-between shadow-lg overflow-hidden border border-slate-800">
            {/* Glossy overlay */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl" />

            <div className="flex justify-between items-start z-10">
              <div>
                <p className="text-[10px] text-white/50 uppercase tracking-widest font-bold">Frequent Flyer</p>
                <p className="text-lg font-extrabold tracking-wide mt-0.5">Sky<span className="text-amber-400">Club</span></p>
              </div>
              <div className="bg-amber-400/20 border border-amber-400/40 px-2 py-0.5 rounded text-[10px] font-bold text-amber-300 uppercase tracking-widest">
                Gold Elite
              </div>
            </div>

            <div className="z-10 space-y-1">
              <p className="text-xs text-white/60 font-semibold tracking-wider">MEMBER ID</p>
              <p className="font-mono text-base font-semibold tracking-widest">SC-90248-AM</p>
            </div>

            <div className="flex justify-between items-end z-10">
              <div>
                <p className="text-[9px] text-white/40 uppercase">Card Holder</p>
                <p className="text-sm font-semibold mt-0.5">Arjun Mehta</p>
              </div>
              <div className="text-right">
                <p className="text-[9px] text-white/40 uppercase">Miles</p>
                <p className="text-base font-extrabold text-amber-300">24,500</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tier Progress */}
        <div className="md:col-span-2 bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <h3 className="font-bold text-slate-800 text-base flex items-center gap-1.5">
              <Trophy className="text-amber-500" size={18} />
              Progress to Platinum Tier
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Earn another <span className="font-bold text-slate-700">25,500 miles</span> by Dec 31, 2026 to achieve Platinum Elite status and unlock complimentary cabin upgrades, free seat choices, and 2.0x miles multipliers.
            </p>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-400 uppercase">Gold Status (Achieved)</span>
              <span className="text-blue-600 font-bold">{progressPercent}% ({currentMiles.toLocaleString()} / {targetMiles.toLocaleString()} miles)</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden border border-slate-200/50">
              <div
                className="bg-gradient-to-r from-blue-600 to-amber-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase pt-1">
              <span>0 miles</span>
              <span>25,000 (Gold)</span>
              <span>50,000 (Platinum)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tier Benefits */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-800 text-base flex items-center gap-1.5 border-b border-slate-100 pb-2">
            <Sparkles className="text-amber-500" size={18} />
            Your Gold Elite Benefits
          </h3>

          <ul className="space-y-3.5">
            {[
              { title: 'Airport Lounge Access', desc: 'Complimentary entrance for cardholder + 1 guest at all SkyDesk partnership lounges.' },
              { title: 'Priority Boarding & Lines', desc: 'Accelerated check-in desks, fast-track security lane, and Zone-1 priority boarding.' },
              { title: 'Extra Baggage Allowance', desc: 'Checked baggage weight limit raised by 15kg on all domestic and international flights.' },
              { title: '1.5x Miles Accumulation', desc: 'Earn 50% more miles on every flight booking compared to standard members.' }
            ].map((b, i) => (
              <li key={i} className="flex gap-3 items-start text-xs">
                <div className="p-1 bg-green-50 rounded-full border border-green-200 text-green-600 mt-0.5">
                  <ShieldCheck size={14} />
                </div>
                <div>
                  <p className="font-bold text-slate-800">{b.title}</p>
                  <p className="text-slate-500 mt-0.5 leading-relaxed">{b.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Miles Accrued Chart */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
          <div>
            <h3 className="font-bold text-slate-800 text-base flex items-center gap-1.5">
              <PlaneTakeoff className="text-blue-500" size={18} />
              Monthly Travel Miles
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Miles accumulated in the last 6 months</p>
          </div>

          <div className="w-full">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={monthlyMiles} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip content={<MilesTooltip />} cursor={{ fill: '#f8fafc' }} />
                <Bar dataKey="miles" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={28} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-blue-50/50 rounded-lg p-2.5 flex items-start gap-2 border border-blue-100/50 text-[10px] text-slate-500">
            <Info size={14} className="text-blue-500 mt-0.5 flex-shrink-0" />
            <p>Miles are updated automatically within 24 hours of landing. Only scheduled passenger bookings qualify for miles accumulation.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
