import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import ForgotPassword from './pages/ForgotPassword.jsx'
import Dashboard from './pages/Dashboard.jsx'
import BookFlight from './pages/BookFlight.jsx'
import MyTrips from './pages/MyTrips.jsx'
import FlightStatus from './pages/FlightStatus.jsx'
import LoyaltyRewards from './pages/LoyaltyRewards.jsx'
import ProfileSettings from './pages/ProfileSettings.jsx'
import MainLayout from './layouts/MainLayout.jsx'

export default function App() {
  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem('skydesk_bookings')
    if (saved) return JSON.parse(saved)
    return [
      {
        id: "BK-10421",
        passenger: "Arjun Mehta",
        flight: "AI-204",
        airline: "Air India",
        origin: "Delhi",
        destination: "Mumbai",
        travelDate: "2026-07-14",
        status: "Confirmed",
        amount: 8450,
        class: "Economy",
        seat: "14B"
      },
      {
        id: "BK-10390",
        passenger: "Arjun Mehta",
        flight: "6E-512",
        airline: "IndiGo",
        origin: "Bangalore",
        destination: "Goa",
        travelDate: "2026-05-10",
        status: "Completed",
        amount: 3200,
        class: "Economy",
        seat: "08C"
      },
      {
        id: "BK-10444",
        passenger: "Arjun Mehta",
        flight: "UK-838",
        airline: "Vistara",
        origin: "Mumbai",
        destination: "Dubai",
        travelDate: "2026-08-22",
        status: "Confirmed",
        amount: 18500,
        class: "Business",
        seat: "03A"
      }
    ]
  })

  useEffect(() => {
    localStorage.setItem('skydesk_bookings', JSON.stringify(bookings))
  }, [bookings])

  const addBooking = (newBooking) => {
    setBookings((prev) => [newBooking, ...prev])
  }

  const updateBookingStatus = (id, status) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status } : b))
    )
  }

  const updateBookingSeat = (id, seat) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, seat } : b))
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        <Route
          path="/dashboard"
          element={
            <MainLayout>
              <Dashboard bookings={bookings} />
            </MainLayout>
          }
        />
        
        <Route
          path="/book"
          element={
            <MainLayout>
              <BookFlight addBooking={addBooking} />
            </MainLayout>
          }
        />

        <Route
          path="/trips"
          element={
            <MainLayout>
              <MyTrips
                bookings={bookings}
                updateBookingStatus={updateBookingStatus}
                updateBookingSeat={updateBookingSeat}
              />
            </MainLayout>
          }
        />

        <Route
          path="/status"
          element={
            <MainLayout>
              <FlightStatus />
            </MainLayout>
          }
        />

        <Route
          path="/loyalty"
          element={
            <MainLayout>
              <LoyaltyRewards />
            </MainLayout>
          }
        />

        <Route
          path="/settings"
          element={
            <MainLayout>
              <ProfileSettings />
            </MainLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
