import { useState } from 'react'
import { Plane, Calendar, CreditCard, ChevronDown, CheckCircle2, ShieldAlert, X, AlertTriangle } from 'lucide-react'
import Button from '../components/Button.jsx'

export default function MyTrips({ bookings, updateBookingStatus, updateBookingSeat }) {
  const [activeTab, setActiveTab] = useState('All') // All, Upcoming, Completed, Cancelled
  const [selectedTrip, setSelectedTrip] = useState(null)
  
  // Modals
  const [checkInModal, setCheckInModal] = useState(null) // holds booking object
  const [seatModal, setSeatModal] = useState(null) // holds booking object
  const [cancelConfirm, setCancelConfirm] = useState(null) // holds booking object
  const [boardingPassModal, setBoardingPassModal] = useState(null) // holds booking object

  // Check-in details
  const [bags, setBags] = useState('0')
  const [declared, setDeclared] = useState(false)

  // Seat details for seat changer
  const [tempSeat, setTempSeat] = useState('')
  const occupiedSeats = ['1A', '1B', '2F', '5C', '8D', '9E', '12B', '14A', '15F', '18C']

  const handleCheckInSubmit = (e) => {
    e.preventDefault()
    if (!declared) {
      alert('You must declare that you are not carrying hazardous materials.')
      return
    }
    // Update status in parent state
    updateBookingStatus(checkInModal.id, 'Checked-In')
    // Open boarding pass for check-in confirmation
    const updatedBooking = { ...checkInModal, status: 'Checked-In' }
    setBoardingPassModal(updatedBooking)
    setCheckInModal(null)
    setDeclared(false)
    setBags('0')
  }

  const handleCancelBooking = () => {
    updateBookingStatus(cancelConfirm.id, 'Cancelled')
    setCancelConfirm(null)
  }

  const openSeatChange = (booking) => {
    setTempSeat(booking.seat || '12A')
    setSeatModal(booking)
  }

  const handleSeatChangeSubmit = () => {
    updateBookingSeat(seatModal.id, tempSeat)
    setSeatModal(null)
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Checked-In':
        return 'bg-blue-100 text-blue-800 font-semibold'
      case 'Confirmed':
        return 'bg-green-100 text-green-800 font-semibold'
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 font-semibold'
      case 'Cancelled':
        return 'bg-red-100 text-red-800 font-semibold'
      case 'Completed':
        return 'bg-slate-100 text-slate-700 font-semibold'
      default:
        return 'bg-slate-100 text-slate-600'
    }
  }

  // Filter bookings based on activeTab and date
  const filteredBookings = bookings.filter((b) => {
    if (activeTab === 'All') return true
    if (activeTab === 'Upcoming') return b.status === 'Confirmed' || b.status === 'Checked-In' || b.status === 'Pending'
    if (activeTab === 'Completed') return b.status === 'Completed'
    if (activeTab === 'Cancelled') return b.status === 'Cancelled'
    return true
  })

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">My Trips</h1>
        <p className="text-sm text-slate-500 mt-0.5">Manage seat preferences, check-in online, and view boarding passes.</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex border-b border-slate-200 gap-6">
        {['All', 'Upcoming', 'Completed', 'Cancelled'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 text-sm font-semibold border-b-2 transition-all duration-150 ${
              activeTab === tab
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Trips list */}
      <div className="space-y-4">
        {filteredBookings.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-xl p-12 text-center text-slate-500 shadow-sm">
            <Plane className="mx-auto text-slate-300 mb-3 rotate-45" size={40} />
            <p className="font-semibold text-slate-800">No trips found</p>
            <p className="text-xs text-slate-400 mt-1">You do not have any trips listed under "{activeTab}".</p>
          </div>
        ) : (
          filteredBookings.map((trip) => {
            const isPast = trip.status === 'Completed' || trip.status === 'Cancelled'
            return (
              <div
                key={trip.id}
                className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-200"
              >
                {/* Header card info */}
                <div className="bg-slate-50 px-5 py-3 border-b border-slate-100 flex flex-wrap justify-between items-center gap-2">
                  <div className="flex items-center gap-3 text-xs text-slate-400 font-medium">
                    <span className="font-mono text-blue-600 font-bold">{trip.id}</span>
                    <span>•</span>
                    <span>Booked on 2026-07-09</span>
                  </div>
                  <span className={`text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider ${getStatusBadge(trip.status)}`}>
                    {trip.status}
                  </span>
                </div>

                {/* Body card info */}
                <div className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  {/* Origin to Destination */}
                  <div className="flex items-center gap-6">
                    <div>
                      <h3 className="text-2xl font-extrabold text-slate-800">{trip.origin.slice(0,3).toUpperCase()}</h3>
                      <p className="text-xs text-slate-500 font-medium">{trip.origin}</p>
                    </div>
                    <div className="flex flex-col items-center min-w-[80px]">
                      <Plane size={15} className="text-blue-600 rotate-90" />
                      <div className="w-full h-px bg-slate-200 border-dashed my-1" />
                      <span className="text-[10px] font-semibold text-slate-400">{trip.airline}</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-extrabold text-slate-800">{trip.destination.slice(0,3).toUpperCase()}</h3>
                      <p className="text-xs text-slate-500 font-medium">{trip.destination}</p>
                    </div>
                  </div>

                  {/* Flight Info Grid */}
                  <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-xs">
                    <div>
                      <p className="text-slate-400 font-medium">Departure Date</p>
                      <p className="font-bold text-slate-800 mt-0.5">{trip.travelDate}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 font-medium">Flight No</p>
                      <p className="font-bold text-slate-800 mt-0.5 font-mono">{trip.flight}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 font-medium">Cabin Class</p>
                      <p className="font-bold text-slate-800 mt-0.5">{trip.class}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 font-medium">Seat</p>
                      <p className="font-bold text-blue-600 mt-0.5">{trip.seat || 'Not selected'}</p>
                    </div>
                  </div>

                  {/* Actions buttons */}
                  {!isPast && (
                    <div className="flex flex-row md:flex-col gap-2 pt-4 md:pt-0 border-t md:border-t-0 border-slate-100 justify-end flex-wrap md:flex-nowrap">
                      {trip.status === 'Confirmed' && (
                        <>
                          <Button onClick={() => setCheckInModal(trip)} size="sm" className="bg-blue-600 text-white font-semibold">
                            Web Check-in
                          </Button>
                          <button
                            onClick={() => openSeatChange(trip)}
                            className="border border-slate-200 text-slate-700 font-semibold px-3 py-1.5 rounded-lg text-xs hover:bg-slate-50"
                          >
                            Change Seat
                          </button>
                          <button
                            onClick={() => setCancelConfirm(trip)}
                            className="text-red-500 hover:text-red-700 font-semibold text-xs py-1"
                          >
                            Cancel Booking
                          </button>
                        </>
                      )}
                      {trip.status === 'Checked-In' && (
                        <Button onClick={() => setBoardingPassModal(trip)} size="sm" className="bg-green-600 hover:bg-green-700 font-semibold">
                          View Boarding Pass
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )
          })
        )}
      </div>

      {/* WEB CHECK-IN MODAL */}
      {checkInModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-md w-full p-6 space-y-4 relative">
            <button
              onClick={() => setCheckInModal(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <X size={20} />
            </button>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Web Check-In</h2>
              <p className="text-xs text-slate-500">Flight {checkInModal.flight} to {checkInModal.destination}</p>
            </div>

            <form onSubmit={handleCheckInSubmit} className="space-y-4">
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 text-xs text-blue-800 space-y-1">
                <p className="font-bold">Passenger: {checkInModal.passenger}</p>
                <p>Assigned Seat: <span className="font-bold text-blue-600">{checkInModal.seat || '14B'}</span></p>
                <p>Class: {checkInModal.class}</p>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-500">Check-in Baggage Count</label>
                <select
                  value={bags}
                  onChange={(e) => setBags(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg p-2 bg-white text-slate-800 text-sm focus:outline-none"
                >
                  <option value="0">0 Bags (Cabin Baggage Only)</option>
                  <option value="1">1 Bag (up to 15 kg)</option>
                  <option value="2">2 Bags (up to 30 kg)</option>
                </select>
              </div>

              <label className="flex items-start gap-2 cursor-pointer pt-2">
                <input
                  type="checkbox"
                  checked={declared}
                  onChange={(e) => setDeclared(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded border-slate-300 text-blue-600"
                  required
                />
                <span className="text-[11px] text-slate-600 leading-tight">
                  I declare that I am not carrying any prohibited or hazardous goods (like explosives, aerosols, compressed gases, flammable liquids) in my checked or hand luggage.
                </span>
              </label>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setCheckInModal(null)}
                  className="flex-1 border border-slate-200 py-2 rounded-lg text-sm text-slate-600 hover:bg-slate-50 font-semibold"
                >
                  Cancel
                </button>
                <Button type="submit" className="flex-1">
                  Complete Check-in
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SEAT CHANGE MODAL */}
      {seatModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-sm w-full p-6 space-y-4 relative">
            <button
              onClick={() => setSeatModal(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <X size={20} />
            </button>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Change Seat</h2>
              <p className="text-xs text-slate-500">Currently: <span className="font-bold text-blue-600">{seatModal.seat}</span></p>
            </div>

            <div className="space-y-4">
              <p className="text-xs text-slate-600">Choose a new seat from the available list below:</p>
              
              <div className="grid grid-cols-4 gap-2 max-h-48 overflow-y-auto p-2 border border-slate-100 rounded-lg">
                {['05A', '08F', '10C', '12E', '14C', '16A', '17B', '19D', '19E', '20B', '20F'].map((seat) => (
                  <button
                    key={seat}
                    onClick={() => setTempSeat(seat)}
                    className={`p-2 rounded text-xs font-semibold border text-center transition-colors ${
                      tempSeat === seat
                        ? 'bg-blue-600 text-white border-blue-700'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    {seat}
                  </button>
                ))}
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setSeatModal(null)}
                  className="flex-1 border border-slate-200 py-2 rounded-lg text-sm text-slate-600 hover:bg-slate-50 font-semibold"
                >
                  Close
                </button>
                <Button onClick={handleSeatChangeSubmit} className="flex-1">
                  Save Seat
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CANCEL CONFIRM MODAL */}
      {cancelConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-sm w-full p-6 text-center space-y-4 relative">
            <div className="mx-auto w-12 h-12 bg-red-50 rounded-full flex items-center justify-center border border-red-200 text-red-600">
              <AlertTriangle size={24} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Cancel Booking?</h2>
              <p className="text-xs text-slate-500 mt-1">Are you sure you want to cancel booking <span className="font-mono text-red-600 font-bold">{cancelConfirm.id}</span>?</p>
              <p className="text-[10px] text-slate-400 mt-2">A refund of ₹{cancelConfirm.amount.toLocaleString('en-IN')} will be credited to your card within 5-7 business days.</p>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setCancelConfirm(null)}
                className="flex-1 border border-slate-200 py-2.5 rounded-lg text-sm text-slate-600 hover:bg-slate-50 font-semibold"
              >
                No, Keep it
              </button>
              <button
                type="button"
                onClick={handleCancelBooking}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-lg text-sm font-semibold transition-colors"
              >
                Yes, Cancel Trip
              </button>
            </div>
          </div>
        </div>
      )}

      {/* BOARDING PASS MODAL */}
      {boardingPassModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-md w-full overflow-hidden relative">
            <button
              onClick={() => setBoardingPassModal(null)}
              className="absolute top-4 right-4 text-white hover:text-white/80 z-20"
            >
              <X size={20} />
            </button>

            {/* Boarding Pass Ticket View */}
            <div className="text-left">
              {/* Card top */}
              <div className="bg-blue-600 text-white p-5 pt-6 flex justify-between items-center relative">
                <div>
                  <p className="text-[10px] text-white/70 uppercase tracking-widest font-bold">Boarding Pass</p>
                  <p className="text-base font-bold mt-0.5">{boardingPassModal.airline}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-white/70 uppercase tracking-widest font-bold">Class</p>
                  <p className="text-base font-bold mt-0.5">{boardingPassModal.class}</p>
                </div>
              </div>

              {/* Card middle */}
              <div className="p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-3xl font-extrabold text-slate-900">{boardingPassModal.origin.slice(0,3).toUpperCase()}</h3>
                    <p className="text-xs text-slate-400 font-medium">{boardingPassModal.origin}</p>
                  </div>
                  <div className="flex flex-col items-center flex-1 px-4">
                    <Plane size={18} className="text-blue-600 rotate-90" />
                    <div className="w-full h-px bg-slate-200 border-dashed my-1.5" />
                    <p className="text-[10px] font-semibold text-slate-400">Scheduled Flight</p>
                  </div>
                  <div className="text-right">
                    <h3 className="text-3xl font-extrabold text-slate-900">{boardingPassModal.destination.slice(0,3).toUpperCase()}</h3>
                    <p className="text-xs text-slate-400 font-medium">{boardingPassModal.destination}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs pt-3 border-t border-slate-100">
                  <div>
                    <p className="text-slate-400">Passenger</p>
                    <p className="font-semibold text-slate-800 mt-0.5 truncate">{boardingPassModal.passenger}</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Flight No.</p>
                    <p className="font-semibold text-slate-800 mt-0.5 font-mono">{boardingPassModal.flight}</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Seat</p>
                    <p className="font-bold text-blue-600 mt-0.5">{boardingPassModal.seat || '12C'}</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Booking PNR</p>
                    <p className="font-semibold text-slate-800 mt-0.5 font-mono">{boardingPassModal.id}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs pt-2">
                  <div>
                    <p className="text-slate-400">Date</p>
                    <p className="font-semibold text-slate-800 mt-0.5">{boardingPassModal.travelDate}</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Dep. Time</p>
                    <p className="font-semibold text-slate-800 mt-0.5">14:20</p>
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
              <div className="bg-slate-50 p-5 flex items-center justify-between border-t border-dashed border-slate-200">
                <div className="space-y-0.5">
                  <p className="text-[9px] text-slate-400 uppercase tracking-widest font-semibold">Verification</p>
                  <p className="text-xs font-bold text-green-600 uppercase flex items-center gap-1">
                    <CheckCircle2 size={14} /> CHECKED IN
                  </p>
                </div>
                <div className="flex flex-col items-end">
                  {/* Mock Barcode */}
                  <div className="flex h-8 items-center bg-white px-2 rounded gap-0.5 border border-slate-200">
                    {Array.from({ length: 28 }).map((_, i) => (
                      <div
                        key={i}
                        className="bg-slate-800 h-full"
                        style={{ width: `${[1, 2, 1, 3, 1, 2, 4, 1, 2][i % 9]}px` }}
                      />
                    ))}
                  </div>
                  <span className="text-[8px] font-mono text-slate-500 mt-1">SKYDESK-{boardingPassModal.id}</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-100 flex gap-2">
              <button
                onClick={() => window.print()}
                className="flex-1 border border-slate-200 hover:bg-slate-50 text-slate-700 py-2 rounded-lg text-xs font-semibold transition-colors"
              >
                Print Ticket
              </button>
              <button
                onClick={() => setBoardingPassModal(null)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-xs font-semibold transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
