import { useState } from 'react'
import { Search, Plane, Clock, MapPin, Navigation, Info, AlertTriangle } from 'lucide-react'
import flightsData from '../data/flights.json'
import Button from '../components/Button.jsx'

export default function FlightStatus() {
  const [searchType, setSearchType] = useState('number') // number or route
  const [flightNumber, setFlightNumber] = useState('')
  const [route, setRoute] = useState({ origin: 'Delhi', destination: 'Mumbai' })
  const [searchedFlights, setSearchedFlights] = useState([])
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = (e) => {
    e.preventDefault()
    setHasSearched(true)
    if (searchType === 'number') {
      const match = flightsData.filter(
        (f) => f.flight.toLowerCase().replace('-', '') === flightNumber.toLowerCase().replace('-', '')
      )
      setSearchedFlights(match)
    } else {
      const match = flightsData.filter(
        (f) =>
          f.origin.toLowerCase() === route.origin.toLowerCase() &&
          f.destination.toLowerCase() === route.destination.toLowerCase()
      )
      setSearchedFlights(match)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'On Time':
        return 'text-green-600 bg-green-50 border-green-200'
      case 'Delayed':
        return 'text-orange-600 bg-orange-50 border-orange-200'
      case 'Cancelled':
        return 'text-red-600 bg-red-50 border-red-200'
      default:
        return 'text-slate-600 bg-slate-50 border-slate-200'
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Flight Status</h1>
        <p className="text-sm text-slate-500 mt-0.5">Track real-time flight schedules, gates, and statuses.</p>
      </div>

      {/* Search Widget Card */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
        {/* Toggle tabs */}
        <div className="flex gap-4 border-b border-slate-100 pb-3">
          <button
            onClick={() => {
              setSearchType('number')
              setHasSearched(false)
              setSearchedFlights([])
            }}
            className={`text-sm font-semibold pb-1 border-b-2 transition-colors duration-150 ${
              searchType === 'number' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400'
            }`}
          >
            Search by Flight Number
          </button>
          <button
            onClick={() => {
              setSearchType('route')
              setHasSearched(false)
              setSearchedFlights([])
            }}
            className={`text-sm font-semibold pb-1 border-b-2 transition-colors duration-150 ${
              searchType === 'route' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400'
            }`}
          >
            Search by Route
          </button>
        </div>

        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-end gap-4">
          {searchType === 'number' ? (
            <div className="flex-1 space-y-1.5 w-full">
              <label className="text-xs font-semibold text-slate-500 uppercase">Flight Number</label>
              <div className="relative">
                <Plane className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input
                  type="text"
                  placeholder="e.g. AI-204 or 6E-512"
                  value={flightNumber}
                  onChange={(e) => setFlightNumber(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 space-y-1.5 w-full">
                <label className="text-xs font-semibold text-slate-500 uppercase">From</label>
                <select
                  value={route.origin}
                  onChange={(e) => setRoute({ ...route, origin: e.target.value })}
                  className="w-full border border-slate-200 rounded-lg p-2 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Delhi">Delhi (DEL)</option>
                  <option value="Mumbai">Mumbai (BOM)</option>
                  <option value="Bangalore">Bangalore (BLR)</option>
                  <option value="Hyderabad">Hyderabad (HYD)</option>
                  <option value="Kolkata">Kolkata (CCU)</option>
                </select>
              </div>

              <div className="flex-1 space-y-1.5 w-full">
                <label className="text-xs font-semibold text-slate-500 uppercase">To</label>
                <select
                  value={route.destination}
                  onChange={(e) => setRoute({ ...route, destination: e.target.value })}
                  className="w-full border border-slate-200 rounded-lg p-2 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Mumbai">Mumbai (BOM)</option>
                  <option value="Delhi">Delhi (DEL)</option>
                  <option value="Goa">Goa (GOI)</option>
                  <option value="Dubai">Dubai (DXB)</option>
                  <option value="Singapore">Singapore (SIN)</option>
                  <option value="Chennai">Chennai (MAA)</option>
                </select>
              </div>
            </>
          )}

          <Button type="submit" className="w-full sm:w-auto flex items-center justify-center gap-1.5">
            <Search size={15} /> Check Status
          </Button>
        </form>
      </div>

      {/* Search Results */}
      {hasSearched && (
        <div className="space-y-4">
          <h3 className="font-semibold text-slate-800 text-sm">Search Results</h3>

          {searchedFlights.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-xl p-8 text-center text-slate-500 shadow-sm">
              <AlertTriangle className="mx-auto text-slate-300 mb-3" size={32} />
              <p className="font-semibold text-slate-800">No active flights found</p>
              <p className="text-xs text-slate-400 mt-1">Please double-check the flight number or route selections.</p>
            </div>
          ) : (
            searchedFlights.map((flight) => (
              <div
                key={flight.id}
                className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm"
              >
                {/* Top Header */}
                <div className="px-5 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 font-mono text-base">{flight.flight}</span>
                    <span className="text-xs text-slate-400">•</span>
                    <span className="text-xs font-semibold text-slate-600">{flight.airline}</span>
                  </div>
                  <span className={`text-xs px-2.5 py-0.5 rounded-full border font-semibold ${getStatusColor(flight.status)}`}>
                    {flight.status}
                  </span>
                </div>

                {/* Main Schedule Row */}
                <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Origin City */}
                  <div className="flex gap-3 items-start">
                    <div className="p-2.5 bg-blue-50 border border-blue-100 rounded-lg text-blue-600 flex-shrink-0">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Origin</p>
                      <h4 className="text-lg font-extrabold text-slate-800 mt-0.5">{flight.origin} (DEL)</h4>
                      <p className="text-xs text-slate-500 mt-1">Scheduled Dep: <span className="font-semibold text-slate-700">{flight.departure}</span></p>
                      <p className="text-[10px] text-slate-400">Terminal: T3 • Gate G14</p>
                    </div>
                  </div>

                  {/* Flight Progress Visualizer */}
                  <div className="flex flex-col justify-center items-center py-2">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
                      <Clock size={13} />
                      <span>Duration: {flight.duration}</span>
                    </div>
                    <div className="w-full flex items-center justify-center gap-1 my-1 px-4">
                      <span className="w-2 h-2 rounded-full bg-blue-600" />
                      <div className="flex-1 h-0.5 bg-blue-600 relative">
                        {flight.status === 'On Time' && (
                          <div className="absolute top-1/2 left-2/3 -translate-y-1/2 bg-white border border-blue-600 rounded-full p-0.5 z-10 shadow">
                            <Plane size={11} className="text-blue-600 rotate-90" />
                          </div>
                        )}
                      </div>
                      <span className="w-2 h-2 rounded-full bg-slate-300" />
                    </div>
                    <span className="text-[10px] text-slate-400 font-semibold mt-1">
                      {flight.status === 'Cancelled' ? 'Flight Cancelled' : flight.status === 'Delayed' ? 'Delayed Departure' : 'En-route'}
                    </span>
                  </div>

                  {/* Destination City */}
                  <div className="flex gap-3 items-start">
                    <div className="p-2.5 bg-blue-50 border border-blue-100 rounded-lg text-blue-600 flex-shrink-0">
                      <Navigation size={18} />
                    </div>
                    <div>
                      <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Destination</p>
                      <h4 className="text-lg font-extrabold text-slate-800 mt-0.5">{flight.destination} ({flight.destination.slice(0,3).toUpperCase()})</h4>
                      <p className="text-xs text-slate-500 mt-1">Scheduled Arr: <span className="font-semibold text-slate-700">{flight.arrival}</span></p>
                      <p className="text-[10px] text-slate-400">Terminal: T2 • Gate B04</p>
                    </div>
                  </div>
                </div>

                {/* Additional Info Footer */}
                <div className="bg-slate-50 border-t border-slate-100 px-5 py-3.5 flex gap-2 items-center text-xs text-slate-500">
                  <Info size={14} className="text-slate-400 flex-shrink-0" />
                  <p>
                    Aircraft: <span className="font-semibold text-slate-700">{flight.aircraft}</span>. All times are displayed in local airport time. Gate changes, if any, will be announced at the departure terminal.
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}
