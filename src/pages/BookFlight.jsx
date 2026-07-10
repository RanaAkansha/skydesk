import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Search, Plane, ShieldCheck, CreditCard, CheckCircle2, User,
  Calendar, Users, ArrowRight, Filter, Compass, AlertCircle
} from 'lucide-react'
import flightsData from '../data/flights.json'
import Button from '../components/Button.jsx'
import Input from '../components/Input.jsx'

export default function BookFlight({ addBooking }) {
  const navigate = useNavigate()
  const [step, setStep] = useState(1) // 1: Search, 2: Select, 3: Details, 4: Seats, 5: Pay, 6: Confirm

  // Search state
  const [search, setSearch] = useState({
    origin: 'Delhi',
    destination: 'Mumbai',
    date: '2026-07-14',
    passengers: '1',
    cabinClass: 'Economy'
  })

  // Available flights filtered by search
  const [availableFlights, setAvailableFlights] = useState([])
  const [selectedFlight, setSelectedFlight] = useState(null)

  // Passenger details
  const [passenger, setPassenger] = useState({
    name: 'Arjun Mehta',
    email: 'arjun.mehta@example.com',
    phone: '+91 98765 43210',
    passport: 'T1234567',
    mealPref: 'Standard Vegetarian'
  })

  // Seat state
  const [selectedSeat, setSelectedSeat] = useState('')
  const extraLegroomRows = [1, 2, 12, 13]
  const occupiedSeats = ['1A', '1B', '2F', '5C', '8D', '9E', '12B', '14A', '15F', '18C']

  // Payment state
  const [payment, setPayment] = useState({
    cardName: 'Arjun Mehta',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: ''
  })

  // Filters
  const [filterAirline, setFilterAirline] = useState('All')
  const [filterPrice, setFilterPrice] = useState(35000)

  // New Booking generated details
  const [confirmedBooking, setConfirmedBooking] = useState(null)

  const handleSearchChange = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value })
  }

  const handlePassengerChange = (e) => {
    setPassenger({ ...passenger, [e.target.name]: e.target.value })
  }

  const handlePaymentChange = (e) => {
    let { name, value } = e.target
    if (name === 'cardNumber') {
      value = value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim().substring(0, 19)
    } else if (name === 'cardExpiry') {
      value = value.replace(/\/?/g, '').replace(/(\d{2})/g, '$1/').trim().substring(0, 5)
      if (value.endsWith('/')) value = value.slice(0, -1)
    } else if (name === 'cardCvv') {
      value = value.replace(/\D/g, '').substring(0, 3)
    }
    setPayment({ ...payment, [name]: value })
  }

  const runSearch = (e) => {
    e.preventDefault()
    // Find flights matching origin & destination
    const matched = flightsData.filter(
      (f) =>
        f.origin.toLowerCase() === search.origin.toLowerCase() &&
        f.destination.toLowerCase() === search.destination.toLowerCase()
    )
    // If no exact match, show a couple of options as fallback
    if (matched.length === 0) {
      setAvailableFlights(flightsData.slice(0, 4))
    } else {
      setAvailableFlights(matched)
    }
    setStep(2)
  }

  const selectFlight = (flight) => {
    setSelectedFlight(flight)
    setStep(3)
  }

  const submitPassengerDetails = (e) => {
    e.preventDefault()
    setStep(4)
  }

  const handleSeatClick = (seatCode) => {
    if (occupiedSeats.includes(seatCode)) return
    setSelectedSeat(seatCode)
  }

  const submitSeats = () => {
    if (!selectedSeat) {
      alert('Please select a seat to continue')
      return
    }
    setStep(5)
  }

  const processPayment = (e) => {
    e.preventDefault()
    if (!payment.cardNumber || !payment.cardExpiry || !payment.cardCvv) {
      alert('Please fill in card details')
      return
    }

    const bookingId = `BK-${Math.floor(10000 + Math.random() * 90000)}`
    const flightClass = search.cabinClass
    const taxAmt = Math.round(selectedFlight.price * 0.18)
    const seatSurcharge = extraLegroomRows.includes(parseInt(selectedSeat)) ? 1500 : 0
    const totalAmount = selectedFlight.price + taxAmt + seatSurcharge

    const newBooking = {
      id: bookingId,
      passenger: passenger.name,
      flight: selectedFlight.flight,
      airline: selectedFlight.airline,
      origin: selectedFlight.origin,
      destination: selectedFlight.destination,
      travelDate: search.date,
      status: 'Confirmed',
      amount: totalAmount,
      class: flightClass,
      seat: selectedSeat
    }

    // Call state update
    addBooking(newBooking)
    setConfirmedBooking(newBooking)
    setStep(6)
  }

  // Generate A320 seat layout (20 rows, columns A-F)
  const renderSeatMap = () => {
    const cols = ['A', 'B', 'C', 'D', 'E', 'F']
    const rows = Array.from({ length: 20 }, (_, i) => i + 1)

    return (
      <div className="space-y-2 select-none max-h-[400px] overflow-y-auto pr-2 border-r border-slate-200">
        {/* Seat Key */}
        <div className="flex flex-wrap gap-4 text-xs font-medium justify-center pb-4 border-b border-slate-100">
          <div className="flex items-center gap-1.5">
            <span className="w-4 h-4 bg-slate-100 border border-slate-300 rounded" />
            <span>Available</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-4 h-4 bg-green-100 border border-green-300 rounded" />
            <span>Extra Legroom (+₹1,500)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-4 h-4 bg-blue-600 rounded text-white" />
            <span>Selected</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-4 h-4 bg-slate-300 rounded cursor-not-allowed" />
            <span>Occupied</span>
          </div>
        </div>

        {/* Rows */}
        {rows.map((row) => (
          <div key={row} className="flex items-center justify-center gap-2">
            <span className="w-5 text-xs text-slate-400 font-bold text-center">{row}</span>
            
            {/* Left side seats (A, B, C) */}
            {cols.slice(0, 3).map((col) => {
              const seatCode = `${row}${col}`
              const isOccupied = occupiedSeats.includes(seatCode)
              const isSelected = selectedSeat === seatCode
              const isExtraLegroom = extraLegroomRows.includes(row)

              let seatClass = 'bg-slate-50 border border-slate-200 hover:border-blue-500 hover:bg-blue-50 cursor-pointer'
              if (isExtraLegroom) seatClass = 'bg-green-50 border border-green-200 hover:bg-green-100 cursor-pointer'
              if (isOccupied) seatClass = 'bg-slate-200 border border-slate-300 cursor-not-allowed opacity-60 text-slate-400'
              if (isSelected) seatClass = 'bg-blue-600 border border-blue-700 text-white font-semibold'

              return (
                <button
                  key={seatCode}
                  onClick={() => handleSeatClick(seatCode)}
                  disabled={isOccupied}
                  type="button"
                  className={`w-9 h-9 rounded-lg flex items-center justify-center text-xs transition-colors duration-150 ${seatClass}`}
                >
                  {col}
                </button>
              )
            })}

            {/* Aisle */}
            <div className="w-6" />

            {/* Right side seats (D, E, F) */}
            {cols.slice(3, 6).map((col) => {
              const seatCode = `${row}${col}`
              const isOccupied = occupiedSeats.includes(seatCode)
              const isSelected = selectedSeat === seatCode
              const isExtraLegroom = extraLegroomRows.includes(row)

              let seatClass = 'bg-slate-50 border border-slate-200 hover:border-blue-500 hover:bg-blue-50 cursor-pointer'
              if (isExtraLegroom) seatClass = 'bg-green-50 border border-green-200 hover:bg-green-100 cursor-pointer'
              if (isOccupied) seatClass = 'bg-slate-200 border border-slate-300 cursor-not-allowed opacity-60 text-slate-400'
              if (isSelected) seatClass = 'bg-blue-600 border border-blue-700 text-white font-semibold'

              return (
                <button
                  key={seatCode}
                  onClick={() => handleSeatClick(seatCode)}
                  disabled={isOccupied}
                  type="button"
                  className={`w-9 h-9 rounded-lg flex items-center justify-center text-xs transition-colors duration-150 ${seatClass}`}
                >
                  {col}
                </button>
              )
            })}
          </div>
        ))}
      </div>
    )
  }

  // Unique airlines for search filters
  const airlines = ['All', ...new Set(availableFlights.map((f) => f.airline))]
  const filteredFlights = availableFlights.filter((f) => {
    const matchAirline = filterAirline === 'All' || f.airline === filterAirline
    const matchPrice = f.price <= filterPrice
    return matchAirline && matchPrice
  })

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Book a Flight</h1>
          <p className="text-sm text-slate-500 mt-0.5">Quickly secure your seats on any route</p>
        </div>
      </div>

      {/* Progress Steps */}
      {step < 6 && (
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {[
              { id: 1, label: 'Search' },
              { id: 2, label: 'Flights' },
              { id: 3, label: 'Details' },
              { id: 4, label: 'Seats' },
              { id: 5, label: 'Payment' }
            ].map((s) => (
              <div key={s.id} className="flex items-center flex-1 last:flex-none">
                <button
                  disabled={step < s.id}
                  onClick={() => setStep(s.id)}
                  className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-semibold border-2 transition-colors duration-150 ${
                    step >= s.id
                      ? 'border-blue-600 bg-blue-600 text-white'
                      : 'border-slate-200 text-slate-400 bg-white'
                  }`}
                >
                  {s.id}
                </button>
                <span className="hidden sm:inline text-xs font-medium text-slate-700 ml-2">{s.label}</span>
                {s.id < 5 && <div className={`flex-1 h-0.5 mx-4 ${step > s.id ? 'bg-blue-500' : 'bg-slate-100'}`} />}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STEP 1: Search Form */}
      {step === 1 && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Compass className="text-blue-500" size={20} />
            Search Flights
          </h2>
          <form onSubmit={runSearch} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-700">Origin City</label>
                <select
                  name="origin"
                  value={search.origin}
                  onChange={handleSearchChange}
                  className="w-full border border-slate-200 rounded-lg p-2.5 bg-white text-slate-800 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="Delhi">Delhi (DEL)</option>
                  <option value="Mumbai">Mumbai (BOM)</option>
                  <option value="Bangalore">Bangalore (BLR)</option>
                  <option value="Hyderabad">Hyderabad (HYD)</option>
                  <option value="Kolkata">Kolkata (CCU)</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-700">Destination City</label>
                <select
                  name="destination"
                  value={search.destination}
                  onChange={handleSearchChange}
                  className="w-full border border-slate-200 rounded-lg p-2.5 bg-white text-slate-800 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="Mumbai">Mumbai (BOM)</option>
                  <option value="Delhi">Delhi (DEL)</option>
                  <option value="Goa">Goa (GOI)</option>
                  <option value="Dubai">Dubai (DXB)</option>
                  <option value="Singapore">Singapore (SIN)</option>
                  <option value="Chennai">Chennai (MAA)</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-700">Departure Date</label>
                <input
                  type="date"
                  name="date"
                  value={search.date}
                  onChange={handleSearchChange}
                  className="w-full border border-slate-200 rounded-lg p-2.5 bg-white text-slate-800 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-slate-700">Passengers</label>
                  <select
                    name="passengers"
                    value={search.passengers}
                    onChange={handleSearchChange}
                    className="w-full border border-slate-200 rounded-lg p-2.5 bg-white text-slate-800 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="1">1 Adult</option>
                    <option value="2">2 Adults</option>
                    <option value="3">3 Adults</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-slate-700">Class</label>
                  <select
                    name="cabinClass"
                    value={search.cabinClass}
                    onChange={handleSearchChange}
                    className="w-full border border-slate-200 rounded-lg p-2.5 bg-white text-slate-800 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="Economy">Economy</option>
                    <option value="Premium Economy">Premium Economy</option>
                    <option value="Business">Business</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Button type="submit" fullWidth size="lg" className="flex items-center justify-center gap-2">
                <Search size={16} /> Search Flights
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* STEP 2: Flight Results */}
      {step === 2 && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Column */}
          <div className="lg:col-span-1 bg-white border border-slate-200 rounded-xl p-5 h-fit space-y-5">
            <h3 className="font-semibold text-slate-900 flex items-center gap-2">
              <Filter size={16} className="text-slate-500" />
              Filter Flights
            </h3>
            
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Airline</label>
              <select
                value={filterAirline}
                onChange={(e) => setFilterAirline(e.target.value)}
                className="w-full border border-slate-200 rounded-lg p-2 text-sm bg-white focus:outline-none"
              >
                {airlines.map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold text-slate-400 uppercase tracking-wide">
                <span>Max Price</span>
                <span className="text-blue-600 font-bold">₹{filterPrice.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min="2000"
                max="40000"
                step="500"
                value={filterPrice}
                onChange={(e) => setFilterPrice(Number(e.target.value))}
                className="w-full h-1 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>
          </div>

          {/* Flights list column */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-500 font-medium">
                {filteredFlights.length} flights found from <span className="text-slate-800 font-semibold">{search.origin}</span> to <span className="text-slate-800 font-semibold">{search.destination}</span>
              </p>
              <button onClick={() => setStep(1)} className="text-xs text-blue-600 font-semibold hover:underline">
                Modify Search
              </button>
            </div>

            {filteredFlights.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-xl p-8 text-center text-slate-500">
                <AlertCircle className="mx-auto text-slate-300 mb-3" size={36} />
                <p className="font-semibold text-slate-800">No flights found matching filters</p>
                <p className="text-xs text-slate-400 mt-1">Try expanding your price range or switching airlines.</p>
              </div>
            ) : (
              filteredFlights.map((flight) => (
                <div
                  key={flight.id}
                  className="bg-white border border-slate-200 rounded-xl p-5 hover:border-blue-500 transition-colors duration-150 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center text-slate-700">
                      <Plane size={20} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{flight.airline}</p>
                      <p className="text-xs text-slate-400 font-mono">{flight.flight} • {flight.aircraft}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 justify-between md:justify-start">
                    <div className="text-center md:text-left">
                      <p className="font-bold text-slate-800 text-base">{flight.departure}</p>
                      <p className="text-xs text-slate-400">{flight.origin}</p>
                    </div>
                    <div className="flex flex-col items-center min-w-[70px]">
                      <span className="text-[10px] text-slate-400 font-medium">{flight.duration}</span>
                      <div className="w-full flex items-center justify-center gap-1 my-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                        <span className="flex-1 h-0.5 bg-slate-200 border-dashed" />
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                      </div>
                      <span className="text-[9px] text-green-600 bg-green-50 px-1.5 py-0.5 rounded font-bold">Non-stop</span>
                    </div>
                    <div className="text-center md:text-left">
                      <p className="font-bold text-slate-800 text-base">{flight.arrival}</p>
                      <p className="text-xs text-slate-400">{flight.destination}</p>
                    </div>
                  </div>

                  <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-2 border-t md:border-t-0 pt-3 md:pt-0 border-slate-100">
                    <div>
                      <p className="text-xs text-slate-400 text-right">Fare</p>
                      <p className="font-extrabold text-orange-500 text-lg">₹{flight.price.toLocaleString('en-IN')}</p>
                    </div>
                    <Button onClick={() => selectFlight(flight)} size="sm">
                      Select
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* STEP 3: Passenger Details */}
      {step === 3 && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 max-w-xl mx-auto shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <User className="text-blue-500" size={20} />
            Passenger Information
          </h2>
          <form onSubmit={submitPassengerDetails} className="space-y-4">
            <Input
              label="Full Name (as in Passport/ID)"
              id="name"
              name="name"
              value={passenger.name}
              onChange={handlePassengerChange}
              required
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Email Address"
                id="email"
                name="email"
                type="email"
                value={passenger.email}
                onChange={handlePassengerChange}
                required
              />
              <Input
                label="Phone Number"
                id="phone"
                name="phone"
                type="tel"
                value={passenger.phone}
                onChange={handlePassengerChange}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Passport / ID Number"
                id="passport"
                name="passport"
                value={passenger.passport}
                onChange={handlePassengerChange}
                required
              />

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-700">Meal Preference</label>
                <select
                  name="mealPref"
                  value={passenger.mealPref}
                  onChange={handlePassengerChange}
                  className="w-full border border-slate-200 rounded-lg p-2.5 bg-white text-slate-800 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="Standard Vegetarian">Standard Vegetarian (VGML)</option>
                  <option value="Asian Vegetarian">Asian Vegetarian (AVML)</option>
                  <option value="Non-Vegetarian Meal">Standard Non-Veg Meal</option>
                  <option value="Fruit Platter">Fruit Platter (FPML)</option>
                  <option value="No Meal">No Meal Preference</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="flex-1 border border-slate-200 rounded-lg py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Back to flights
              </button>
              <Button type="submit" className="flex-1">
                Continue to Seats
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* STEP 4: Seat Selection */}
      {step === 4 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Plane className="text-blue-500" size={20} />
              Select Seat ({search.cabinClass})
            </h2>
            {renderSeatMap()}
          </div>

          <div className="lg:col-span-1 bg-white border border-slate-200 rounded-xl p-5 shadow-sm h-fit space-y-4">
            <h3 className="font-bold text-slate-900 pb-3 border-b border-slate-100">Booking Summary</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Flight</span>
                <span className="font-semibold text-slate-800">{selectedFlight.airline} {selectedFlight.flight}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Route</span>
                <span className="font-semibold text-slate-800">{selectedFlight.origin} → {selectedFlight.destination}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Date</span>
                <span className="font-semibold text-slate-800">{search.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Class</span>
                <span className="font-semibold text-slate-800">{search.cabinClass}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Selected Seat</span>
                <span className={`font-bold ${selectedSeat ? 'text-blue-600' : 'text-red-500'}`}>
                  {selectedSeat || 'Not Chosen'}
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Base Fare</span>
                <span className="font-medium text-slate-800">₹{selectedFlight.price.toLocaleString('en-IN')}</span>
              </div>
              {selectedSeat && extraLegroomRows.includes(parseInt(selectedSeat)) && (
                <div className="flex justify-between text-sm">
                  <span className="text-green-600 font-medium">Extra Legroom Fee</span>
                  <span className="font-medium text-slate-800">₹1,500</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">GST & Airport Fees (18%)</span>
                <span className="font-medium text-slate-800">₹{Math.round(selectedFlight.price * 0.18).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-base font-bold pt-2 border-t border-slate-100">
                <span className="text-slate-900">Total Price</span>
                <span className="text-orange-500 font-extrabold">
                  ₹{(
                    selectedFlight.price +
                    Math.round(selectedFlight.price * 0.18) +
                    (selectedSeat && extraLegroomRows.includes(parseInt(selectedSeat)) ? 1500 : 0)
                  ).toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <div className="pt-4 flex gap-2">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="flex-1 border border-slate-200 rounded-lg py-2 text-xs font-semibold text-slate-500 hover:bg-slate-50 transition-colors"
              >
                Back
              </button>
              <Button onClick={submitSeats} className="flex-1 text-xs">
                Proceed to Pay
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 5: Payment Form */}
      {step === 5 && (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <div className="md:col-span-3 bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <CreditCard className="text-blue-500" size={20} />
              Secure Payment Checkout
            </h2>
            <form onSubmit={processPayment} className="space-y-4">
              <Input
                label="Cardholder Name"
                id="cardName"
                name="cardName"
                value={payment.cardName}
                onChange={handlePaymentChange}
                required
              />

              <Input
                label="Card Number"
                id="cardNumber"
                name="cardNumber"
                placeholder="4111 2222 3333 4444"
                value={payment.cardNumber}
                onChange={handlePaymentChange}
                required
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Expiration Date"
                  id="cardExpiry"
                  name="cardExpiry"
                  placeholder="MM/YY"
                  value={payment.cardExpiry}
                  onChange={handlePaymentChange}
                  required
                />
                <Input
                  label="CVV / CVC"
                  id="cardCvv"
                  name="cardCvv"
                  placeholder="123"
                  type="password"
                  value={payment.cardCvv}
                  onChange={handlePaymentChange}
                  required
                />
              </div>

              <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl flex gap-2 items-start text-xs text-blue-800 mt-2">
                <ShieldCheck className="flex-shrink-0 mt-0.5" size={16} />
                <p>Your payment details are protected by 256-bit bank-grade SSL encryption. Cancel anytime before check-in for a full refund.</p>
              </div>

              <div className="flex gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="flex-1 border border-slate-200 rounded-lg py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  Back
                </button>
                <Button type="submit" className="flex-1">
                  Pay Now
                </Button>
              </div>
            </form>
          </div>

          {/* Pricing Summary Column */}
          <div className="md:col-span-2 bg-white border border-slate-200 rounded-xl p-5 shadow-sm h-fit space-y-4">
            <h3 className="font-bold text-slate-900 pb-3 border-b border-slate-100">Review Fare</h3>
            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Passenger</span>
                <span className="font-semibold text-slate-800">{passenger.name}</span>
              </div>
              <div className="flex justify-between">
                <span>Seat Selected</span>
                <span className="font-semibold text-slate-800">{selectedSeat}</span>
              </div>
              <div className="flex justify-between">
                <span>Flight Class</span>
                <span className="font-semibold text-slate-800">{search.cabinClass}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
              <div className="flex justify-between">
                <span>Base Fare</span>
                <span>₹{selectedFlight.price.toLocaleString('en-IN')}</span>
              </div>
              {extraLegroomRows.includes(parseInt(selectedSeat)) && (
                <div className="flex justify-between text-green-600">
                  <span>Extra Legroom</span>
                  <span>₹1,500</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Taxes & Fees</span>
                <span>₹{Math.round(selectedFlight.price * 0.18).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-sm font-bold pt-2 border-t border-slate-100">
                <span className="text-slate-900">Total Price</span>
                <span className="text-orange-500">
                  ₹{(
                    selectedFlight.price +
                    Math.round(selectedFlight.price * 0.18) +
                    (extraLegroomRows.includes(parseInt(selectedSeat)) ? 1500 : 0)
                  ).toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 6: Booking Confirmed */}
      {step === 6 && confirmedBooking && (
        <div className="max-w-xl mx-auto space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 text-center shadow-md space-y-4">
            <div className="mx-auto w-12 h-12 bg-green-50 rounded-full flex items-center justify-center border border-green-200">
              <CheckCircle2 size={24} className="text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Booking Confirmed!</h2>
              <p className="text-xs text-slate-500 mt-1">Your e-ticket has been sent to {passenger.email}</p>
            </div>

            {/* Boarding Pass Ticket View */}
            <div className="border border-dashed border-slate-200 rounded-2xl overflow-hidden bg-slate-50 text-left">
              {/* Card top */}
              <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
                <div>
                  <p className="text-[10px] text-white/70 uppercase tracking-widest font-bold">Boarding Pass</p>
                  <p className="text-sm font-bold mt-0.5">{confirmedBooking.airline}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-white/70 uppercase tracking-widest font-bold">Class</p>
                  <p className="text-sm font-bold mt-0.5">{confirmedBooking.class}</p>
                </div>
              </div>

              {/* Card middle */}
              <div className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-extrabold text-slate-900">{confirmedBooking.origin.slice(0,3).toUpperCase()}</h3>
                    <p className="text-[10px] text-slate-400 font-medium">{confirmedBooking.origin}</p>
                  </div>
                  <div className="flex flex-col items-center flex-1 px-4">
                    <Plane size={16} className="text-blue-600 rotate-90" />
                    <div className="w-full h-px bg-slate-200 border-dashed my-1" />
                    <p className="text-[10px] font-semibold text-slate-400">{selectedFlight.duration}</p>
                  </div>
                  <div className="text-right">
                    <h3 className="text-2xl font-extrabold text-slate-900">{confirmedBooking.destination.slice(0,3).toUpperCase()}</h3>
                    <p className="text-[10px] text-slate-400 font-medium">{confirmedBooking.destination}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs pt-3 border-t border-slate-100">
                  <div>
                    <p className="text-slate-400">Passenger</p>
                    <p className="font-semibold text-slate-800 mt-0.5 truncate">{confirmedBooking.passenger}</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Flight No.</p>
                    <p className="font-semibold text-slate-800 mt-0.5 font-mono">{confirmedBooking.flight}</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Seat</p>
                    <p className="font-bold text-blue-600 mt-0.5">{confirmedBooking.seat}</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Booking PNR</p>
                    <p className="font-semibold text-slate-800 mt-0.5 font-mono">{confirmedBooking.id}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs pt-2">
                  <div>
                    <p className="text-slate-400">Date</p>
                    <p className="font-semibold text-slate-800 mt-0.5">{confirmedBooking.travelDate}</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Dep. Time</p>
                    <p className="font-semibold text-slate-800 mt-0.5">{selectedFlight.departure}</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Gate</p>
                    <p className="font-semibold text-slate-800 mt-0.5">T3 - G12</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Boarding</p>
                    <p className="font-semibold text-slate-800 mt-0.5">45m before dep</p>
                  </div>
                </div>
              </div>

              {/* Barcode bottom */}
              <div className="bg-slate-100 p-4 flex items-center justify-between border-t border-slate-200">
                <div className="space-y-0.5">
                  <p className="text-[9px] text-slate-400 uppercase tracking-widest font-semibold">Payment Status</p>
                  <p className="text-xs font-bold text-green-600 uppercase flex items-center gap-1">
                    <ShieldCheck size={14} /> PAID ₹{confirmedBooking.amount.toLocaleString('en-IN')}
                  </p>
                </div>
                <div className="flex flex-col items-end">
                  {/* Mock Barcode */}
                  <div className="flex h-7 items-center bg-white px-2 rounded gap-0.5 border border-slate-200">
                    {Array.from({ length: 24 }).map((_, i) => (
                      <div
                        key={i}
                        className="bg-slate-800 h-full"
                        style={{ width: `${[1, 2, 1, 3, 1, 2, 4, 1, 2][i % 9]}px` }}
                      />
                    ))}
                  </div>
                  <span className="text-[8px] font-mono text-slate-500 mt-1">SKYDESK-{confirmedBooking.id}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => navigate('/trips')}
                className="flex-1 border border-slate-200 hover:bg-slate-50 text-slate-700 py-2.5 rounded-lg text-sm font-semibold transition-colors"
              >
                Go to My Trips
              </button>
              <button
                onClick={() => {
                  setStep(1)
                  setSelectedFlight(null)
                  setSelectedSeat('')
                }}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-1"
              >
                Book Another Flight <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
