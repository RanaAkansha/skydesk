import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  Plane, Search, Calendar, Users, Briefcase, Award, ArrowRight,
  Clock, MapPin, Bell, CheckCircle2, AlertTriangle, Compass
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import DestinationCard from '../components/DestinationCard.jsx'
import Button from '../components/Button.jsx'

const travelTrendData = [
  { month: 'Jan', miles: 3200 },
  { month: 'Feb', miles: 8000 },
  { month: 'Mar', miles: 9500 },
  { month: 'Apr', miles: 15000 },
  { month: 'May', miles: 17800 },
  { month: 'Jun', miles: 24500 }
]

const popularDestinations = [
  { name: 'Delhi',     country: 'India',     flightsToday: 48, avgFare: 4850 },
  { name: 'Mumbai',    country: 'India',     flightsToday: 62, avgFare: 5200 },
  { name: 'Goa',       country: 'India',     flightsToday: 34, avgFare: 3900 },
  { name: 'Dubai',     country: 'UAE',       flightsToday: 18, avgFare: 22500 },
  { name: 'Singapore', country: 'Singapore', flightsToday: 12, avgFare: 34800 },
  { name: 'Bangalore', country: 'India',     flightsToday: 55, avgFare: 4400 },
]

function ChartTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 shadow-md text-xs font-semibold">
        <p className="text-slate-800">{label}</p>
        <p className="text-blue-600 mt-0.5">{payload[0].value.toLocaleString()} miles accrued</p>
      </div>
    )
  }
  return null
}

export default function Dashboard({ bookings }) {
  const navigate = useNavigate()
  
  // Search Widget State
  const [search, setSearch] = useState({
    origin: 'Delhi',
    destination: 'Mumbai',
    date: '2026-07-14',
    cabinClass: 'Economy'
  })

  // Filter out upcoming active bookings for Arjun
  const activeTrips = bookings.filter((b) => b.status === 'Confirmed' || b.status === 'Checked-In')
  const nextTrip = activeTrips.find((b) => b.id === 'BK-10421') || activeTrips[0]

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    // Redirect to /book with search criteria prefilled
    navigate('/book', { state: search })
  }

  // Calculate countdown days
  const getDaysCountdown = (dateStr) => {
    const diff = new Date(dateStr).getTime() - Date.now()
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24))
    return days > 0 ? `${days} days left` : 'Today!'
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Welcome, Arjun!</h1>
          <p className="text-sm text-slate-500 mt-0.5">Where is your next adventure taking you?</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-700 bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-full">
            <Award size={13} className="text-amber-500" />
            Gold Elite Member
          </span>
        </div>
      </div>

      {/* Main Grid: Search & Next Flight Countdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Search Widget */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Compass size={18} className="text-blue-600" />
            Quick Flight Search
          </h2>
          <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-end">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-500 uppercase">From</label>
              <select
                value={search.origin}
                onChange={(e) => setSearch({ ...search, origin: e.target.value })}
                className="w-full border border-slate-200 rounded-lg p-2.5 bg-white text-slate-800 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="Delhi">Delhi (DEL)</option>
                <option value="Mumbai">Mumbai (BOM)</option>
                <option value="Bangalore">Bangalore (BLR)</option>
                <option value="Hyderabad">Hyderabad (HYD)</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-500 uppercase">To</label>
              <select
                value={search.destination}
                onChange={(e) => setSearch({ ...search, destination: e.target.value })}
                className="w-full border border-slate-200 rounded-lg p-2.5 bg-white text-slate-800 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="Mumbai">Mumbai (BOM)</option>
                <option value="Delhi">Delhi (DEL)</option>
                <option value="Goa">Goa (GOI)</option>
                <option value="Dubai">Dubai (DXB)</option>
                <option value="Singapore">Singapore (SIN)</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-500 uppercase">Departure</label>
              <input
                type="date"
                value={search.date}
                onChange={(e) => setSearch({ ...search, date: e.target.value })}
                className="w-full border border-slate-200 rounded-lg p-2 bg-white text-slate-800 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <Button type="submit" size="md" className="w-full flex items-center justify-center gap-1.5 font-semibold">
              <Search size={14} /> Search Flights
            </Button>
          </form>
        </div>

        {/* Next Flight Countdown Card */}
        <div className="lg:col-span-1 bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-between">
          <div className="bg-blue-600 px-4 py-2.5 flex justify-between items-center text-white">
            <span className="text-[10px] font-bold uppercase tracking-wider">Next Departure</span>
            {nextTrip && (
              <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded font-bold">
                {getDaysCountdown(nextTrip.travelDate)}
              </span>
            )}
          </div>
          
          {nextTrip ? (
            <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-black text-slate-900">{nextTrip.origin.slice(0,3).toUpperCase()}</h3>
                  <p className="text-[10px] text-slate-400 font-medium">{nextTrip.origin}</p>
                </div>
                <div className="flex flex-col items-center flex-1 px-4">
                  <Plane size={14} className="text-blue-600 rotate-90" />
                  <div className="w-full h-px bg-slate-200 border-dashed my-1" />
                  <span className="text-[9px] font-semibold text-slate-400">{nextTrip.flight}</span>
                </div>
                <div className="text-right">
                  <h3 className="text-2xl font-black text-slate-900">{nextTrip.destination.slice(0,3).toUpperCase()}</h3>
                  <p className="text-[10px] text-slate-400 font-medium">{nextTrip.destination}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs pt-2 border-t border-slate-100">
                <div>
                  <span className="text-slate-400 font-medium block">Date</span>
                  <span className="font-bold text-slate-800">{nextTrip.travelDate}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-medium block">Boarding</span>
                  <span className="font-bold text-slate-800">05:15 AM</span>
                </div>
                <div>
                  <span className="text-slate-400 font-medium block">Gate</span>
                  <span className="font-bold text-slate-800">T3 - G12</span>
                </div>
                <div>
                  <span className="text-slate-400 font-medium block">Seat</span>
                  <span className="font-bold text-blue-600">{nextTrip.seat || '12C'}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6 text-center text-slate-500 flex-1 flex flex-col justify-center items-center">
              <Compass size={28} className="text-slate-300 mb-2" />
              <p className="font-semibold text-sm">No upcoming flights</p>
              <p className="text-xs text-slate-400">Search above to book your next trip.</p>
            </div>
          )}
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { title: 'Frequent Flyer Miles', value: '24,500 miles', icon: Award, color: 'text-amber-500 bg-amber-50 border-amber-100', desc: 'Gold Elite Status' },
          { title: 'Total Flights Booked', value: `${bookings.length} Trips`, icon: Briefcase, color: 'text-blue-600 bg-blue-50 border-blue-100', desc: 'Active & past travels' },
          { title: 'Saved Travelers', value: '2 Passengers', icon: Users, color: 'text-green-600 bg-green-50 border-green-100', desc: 'Wife & Son profiles' }
        ].map((stat, i) => {
          const Icon = stat.icon
          return (
            <div key={i} className="bg-white border border-slate-200 rounded-xl p-5 flex items-center justify-between shadow-sm hover:shadow transition-shadow">
              <div className="space-y-1">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{stat.title}</p>
                <p className="text-xl font-bold text-slate-800">{stat.value}</p>
                <p className="text-xs text-slate-500 font-medium">{stat.desc}</p>
              </div>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${stat.color}`}>
                <Icon size={22} />
              </div>
            </div>
          )
        })}
      </div>

      {/* Chart & Upcoming Trips */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Travel Trend Chart */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
          <div>
            <h3 className="font-bold text-slate-800 text-base">Travel Miles Progress</h3>
            <p className="text-xs text-slate-400 mt-0.5">Accrued SkyClub miles over the last 6 months</p>
          </div>
          <div className="w-full">
            <ResponsiveContainer width="100%" height={210}>
              <LineChart data={travelTrendData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip content={<ChartTooltip />} />
                <Line type="monotone" dataKey="miles" stroke="#2563eb" strokeWidth={2.5} dot={{ r: 4, fill: '#2563eb', strokeWidth: 0 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Passenger Notifications Panel */}
        <div className="lg:col-span-1 bg-white border border-slate-200 rounded-xl shadow-sm h-fit">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-slate-800 text-base">Travel Notifications</h3>
            <span className="text-[10px] bg-red-100 text-red-800 font-bold px-2 py-0.5 rounded-full">2 Alert</span>
          </div>
          
          <ul className="divide-y divide-slate-50 text-xs">
            <li className="p-4 flex gap-3 hover:bg-slate-50 transition-colors">
              <div className="p-2 bg-green-50 rounded-full text-green-600 h-fit border border-green-100">
                <CheckCircle2 size={15} />
              </div>
              <div className="space-y-0.5">
                <p className="font-bold text-slate-800">Check-in Open</p>
                <p className="text-slate-500">Online web check-in is now open for your flight AI-204 to Mumbai.</p>
                <span className="text-[10px] text-slate-400 block pt-1">3 hours ago</span>
              </div>
            </li>
            <li className="p-4 flex gap-3 hover:bg-slate-50 transition-colors">
              <div className="p-2 bg-orange-50 rounded-full text-orange-600 h-fit border border-orange-100">
                <AlertTriangle size={15} />
              </div>
              <div className="space-y-0.5">
                <p className="font-bold text-slate-800">Delayed: Flight SG-801</p>
                <p className="text-slate-500">SpiceJet SG-801 to Chennai is delayed by 45 minutes due to air traffic.</p>
                <span className="text-[10px] text-slate-400 block pt-1">5 hours ago</span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Popular Destinations */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-slate-800 flex items-center gap-1.5">
            <Compass size={18} className="text-blue-500" />
            Popular Flight Deals
          </h2>
          <Link to="/book" className="text-xs text-blue-600 font-semibold hover:underline flex items-center gap-0.5">
            View All Deals <ArrowRight size={13} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-4">
          {popularDestinations.map((dest) => (
            <DestinationCard key={dest.name} {...dest} />
          ))}
        </div>
      </div>
    </div>
  )
}
