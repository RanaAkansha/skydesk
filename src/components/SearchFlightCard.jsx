import { useState } from 'react'
import { ArrowRightLeft, Calendar, Users, ChevronDown, Search, ArrowRight } from 'lucide-react'

const cabinClasses = ['Economy', 'Premium Economy', 'Business', 'First Class']

export default function SearchFlightCard() {
  const [tripType, setTripType] = useState('round')
  const [from, setFrom] = useState('Delhi (DEL)')
  const [to, setTo] = useState('Mumbai (BOM)')
  const [departure, setDeparture] = useState('2026-07-18')
  const [returnDate, setReturnDate] = useState('2026-07-22')
  const [passengers, setPassengers] = useState(1)
  const [cabinClass, setCabinClass] = useState('Economy')
  const [classOpen, setClassOpen] = useState(false)

  const swapCities = () => {
    const temp = from
    setFrom(to)
    setTo(temp)
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
      {/* Trip type tabs */}
      <div className="flex border-b border-slate-100 px-6 pt-5">
        {[
          { id: 'one-way', label: 'One Way' },
          { id: 'round', label: 'Round Trip' },
          { id: 'multi', label: 'Multi-City' },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setTripType(t.id)}
            className={`px-4 py-2 text-sm font-semibold rounded-t-lg mr-1 transition-all border-b-2 pb-3
              ${tripType === t.id
                ? 'text-blue-600 border-blue-600'
                : 'text-slate-400 border-transparent hover:text-slate-600'
              }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="p-6">
        {/* From / To row */}
        <div className="flex flex-col md:flex-row items-stretch gap-3 mb-4 relative">
          {/* From */}
          <div className="flex-1 relative group">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide block mb-1.5">From</label>
            <div className="border-2 border-slate-200 rounded-xl px-4 py-3 focus-within:border-blue-500 transition-colors bg-slate-50 focus-within:bg-white">
              <input
                type="text"
                value={from}
                onChange={e => setFrom(e.target.value)}
                className="w-full bg-transparent text-slate-800 font-semibold text-base focus:outline-none placeholder-slate-300"
                placeholder="City or Airport"
              />
              <p className="text-xs text-slate-400 mt-0.5">Indira Gandhi International</p>
            </div>
          </div>

          {/* Swap button */}
          <div className="flex items-end pb-1 justify-center shrink-0 md:relative md:z-10">
            <button
              onClick={swapCities}
              className="w-10 h-10 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-all shadow-sm"
              aria-label="Swap cities"
            >
              <ArrowRightLeft size={16} />
            </button>
          </div>

          {/* To */}
          <div className="flex-1 relative group">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide block mb-1.5">To</label>
            <div className="border-2 border-slate-200 rounded-xl px-4 py-3 focus-within:border-blue-500 transition-colors bg-slate-50 focus-within:bg-white">
              <input
                type="text"
                value={to}
                onChange={e => setTo(e.target.value)}
                className="w-full bg-transparent text-slate-800 font-semibold text-base focus:outline-none placeholder-slate-300"
                placeholder="City or Airport"
              />
              <p className="text-xs text-slate-400 mt-0.5">Chhatrapati Shivaji International</p>
            </div>
          </div>
        </div>

        {/* Dates / Passengers / Class row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
          {/* Departure */}
          <div>
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide block mb-1.5">
              <Calendar size={11} className="inline mr-1" />Departure
            </label>
            <div className="border-2 border-slate-200 rounded-xl px-4 py-3 focus-within:border-blue-500 transition-colors bg-slate-50 focus-within:bg-white">
              <input
                type="date"
                value={departure}
                onChange={e => setDeparture(e.target.value)}
                className="w-full bg-transparent text-slate-800 font-semibold text-sm focus:outline-none"
              />
            </div>
          </div>

          {/* Return */}
          <div className={tripType === 'one-way' ? 'opacity-40 pointer-events-none' : ''}>
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide block mb-1.5">
              <Calendar size={11} className="inline mr-1" />Return
            </label>
            <div className="border-2 border-slate-200 rounded-xl px-4 py-3 focus-within:border-blue-500 transition-colors bg-slate-50 focus-within:bg-white">
              <input
                type="date"
                value={returnDate}
                onChange={e => setReturnDate(e.target.value)}
                className="w-full bg-transparent text-slate-800 font-semibold text-sm focus:outline-none"
              />
            </div>
          </div>

          {/* Passengers */}
          <div>
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide block mb-1.5">
              <Users size={11} className="inline mr-1" />Travellers
            </label>
            <div className="border-2 border-slate-200 rounded-xl px-4 py-3 focus-within:border-blue-500 transition-colors bg-slate-50 flex items-center gap-2">
              <button onClick={() => setPassengers(Math.max(1, passengers - 1))} className="text-slate-400 hover:text-blue-600 font-bold text-lg leading-none">−</button>
              <span className="flex-1 text-center text-slate-800 font-semibold text-sm">{passengers} Pax</span>
              <button onClick={() => setPassengers(Math.min(9, passengers + 1))} className="text-slate-400 hover:text-blue-600 font-bold text-lg leading-none">+</button>
            </div>
          </div>

          {/* Class */}
          <div className="relative">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide block mb-1.5">
              <ChevronDown size={11} className="inline mr-1" />Class
            </label>
            <button
              onClick={() => setClassOpen(!classOpen)}
              className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 bg-slate-50 hover:bg-white transition-colors text-left flex items-center justify-between"
            >
              <span className="text-slate-800 font-semibold text-sm">{cabinClass}</span>
              <ChevronDown size={14} className="text-slate-400" />
            </button>
            {classOpen && (
              <div className="absolute top-full left-0 mt-1 w-full bg-white border border-slate-200 rounded-xl shadow-lg z-20 overflow-hidden">
                {cabinClasses.map(c => (
                  <button
                    key={c}
                    onClick={() => { setCabinClass(c); setClassOpen(false) }}
                    className={`w-full text-left px-4 py-2.5 text-sm hover:bg-blue-50 transition-colors ${c === cabinClass ? 'text-blue-600 font-semibold bg-blue-50' : 'text-slate-700'}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Search button */}
        <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-4 rounded-xl font-bold text-base flex items-center justify-center gap-3 transition-all shadow-md hover:shadow-lg hover:shadow-blue-200 active:scale-[0.99]">
          <Search size={20} />
          Search Flights
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  )
}
