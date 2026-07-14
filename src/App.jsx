import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import SignIn from './pages/SignIn.jsx'
import SignUp from './pages/SignUp.jsx'
import ForgotPassword from './pages/ForgotPassword.jsx'
import Dashboard from './pages/Dashboard.jsx'
import FlightDetails from './pages/FlightDetails.jsx'
import SearchResults from './pages/SearchResults.jsx'
import Bookings from './pages/Bookings.jsx'
import SavedFlights from './pages/SavedFlights.jsx'
import Wishlist from './pages/Wishlist.jsx'
import TravelWallet from './pages/TravelWallet.jsx'
import Offers from './pages/Offers.jsx'
import Support from './pages/Support.jsx'
import ExpenseReport from './pages/ExpenseReport.jsx'
import AddExpense from './pages/AddExpense.jsx'
import TripReport from './pages/TripReport.jsx'
import ExpenseAnalytics from './pages/ExpenseAnalytics.jsx'
import Settings from './pages/Settings.jsx'
import DashboardLayout from './layouts/DashboardLayout.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect from root to Sign In page */}
        <Route path="/" element={<Navigate to="/signin" replace />} />

        {/* Authentication Pages */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Protected Dashboard Pages */}
        <Route
          path="/dashboard"
          element={
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          }
        />

        {/* Flight Details */}
        <Route
          path="/flights/:id"
          element={
            <DashboardLayout>
              <FlightDetails />
            </DashboardLayout>
          }
        />

        {/* Search Results */}
        <Route
          path="/search-results"
          element={
            <DashboardLayout>
              <SearchResults />
            </DashboardLayout>
          }
        />

        {/* Expense Module */}
        <Route
          path="/expenses"
          element={
            <DashboardLayout>
              <ExpenseReport />
            </DashboardLayout>
          }
        />
        <Route
          path="/expenses/new"
          element={
            <DashboardLayout>
              <AddExpense />
            </DashboardLayout>
          }
        />

        {/* My Trips (Trip Report) */}
        <Route
          path="/my-trips"
          element={
            <DashboardLayout>
              <TripReport />
            </DashboardLayout>
          }
        />

        {/* Expense Analytics */}
        <Route
          path="/analytics"
          element={
            <DashboardLayout>
              <ExpenseAnalytics />
            </DashboardLayout>
          }
        />

        {/* Settings */}
        <Route
          path="/settings"
          element={
            <DashboardLayout>
              <Settings />
            </DashboardLayout>
          }
        />

        {/* Bookings */}
        <Route
          path="/bookings"
          element={
            <DashboardLayout>
              <Bookings />
            </DashboardLayout>
          }
        />

        {/* Saved Flights */}
        <Route
          path="/saved-flights"
          element={
            <DashboardLayout>
              <SavedFlights />
            </DashboardLayout>
          }
        />

        {/* Wishlist */}
        <Route
          path="/wishlist"
          element={
            <DashboardLayout>
              <Wishlist />
            </DashboardLayout>
          }
        />

        {/* Travel Wallet */}
        <Route
          path="/wallet"
          element={
            <DashboardLayout>
              <TravelWallet />
            </DashboardLayout>
          }
        />

        {/* Offers */}
        <Route
          path="/offers"
          element={
            <DashboardLayout>
              <Offers />
            </DashboardLayout>
          }
        />

        {/* Support */}
        <Route
          path="/support"
          element={
            <DashboardLayout>
              <Support />
            </DashboardLayout>
          }
        />

        {/* Catch-all fallback redirect */}
        <Route path="*" element={<Navigate to="/signin" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
