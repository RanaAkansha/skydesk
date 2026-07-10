import { useState } from 'react'
import { User, ShieldCheck, Mail, Phone, HeartHandshake, Plus, Trash2, Save } from 'lucide-react'
import Button from '../components/Button.jsx'
import Input from '../components/Input.jsx'

export default function ProfileSettings() {
  const [profile, setProfile] = useState({
    name: 'Arjun Mehta',
    email: 'arjun.mehta@example.com',
    phone: '+91 98765 43210',
    passport: 'T1234567',
    nationality: 'Indian',
    emergencyContact: 'Priya Sharma (+91 98765 43211)'
  })

  const [preferences, setPreferences] = useState({
    seatPref: 'Aisle',
    mealPref: 'Standard Vegetarian',
    cabinPref: 'Economy',
    wheelchair: false
  })

  const [coPassengers, setCoPassengers] = useState([
    { id: 1, name: 'Priya Sharma', relation: 'Spouse', passport: 'Z9876543' },
    { id: 2, name: 'Kunal Mehta', relation: 'Son', passport: 'Y4567890' }
  ])

  const [newCoPassenger, setNewCoPassenger] = useState({ name: '', relation: 'Spouse', passport: '' })
  const [showAddForm, setShowAddForm] = useState(false)

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value })
  }

  const handlePrefChange = (e) => {
    const { name, value, type, checked } = e.target
    setPreferences({ ...preferences, [name]: type === 'checkbox' ? checked : value })
  }

  const handleProfileSubmit = (e) => {
    e.preventDefault()
    alert('Profile details saved successfully!')
  }

  const addCoPassenger = (e) => {
    e.preventDefault()
    if (!newCoPassenger.name || !newCoPassenger.passport) {
      alert('Please fill out all fields')
      return
    }
    const newId = coPassengers.length ? Math.max(...coPassengers.map((c) => c.id)) + 1 : 1
    setCoPassengers([...coPassengers, { id: newId, ...newCoPassenger }])
    setNewCoPassenger({ name: '', relation: 'Spouse', passport: '' })
    setShowAddForm(false)
  }

  const deleteCoPassenger = (id) => {
    setCoPassengers(coPassengers.filter((c) => c.id !== id))
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Settings & Profile</h1>
        <p className="text-sm text-slate-500 mt-0.5">Manage personal information, documentations, preferences, and co-travelers.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Personal Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Info Form */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-800 text-base flex items-center gap-1.5 border-b border-slate-100 pb-2">
              <User size={18} className="text-blue-500" />
              Personal Information
            </h3>
            <form onSubmit={handleProfileSubmit} className="space-y-4">
              <Input
                label="Full Name"
                id="name"
                name="name"
                value={profile.name}
                onChange={handleProfileChange}
                required
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Email Address"
                  id="email"
                  name="email"
                  type="email"
                  value={profile.email}
                  onChange={handleProfileChange}
                  required
                />
                <Input
                  label="Phone Number"
                  id="phone"
                  name="phone"
                  value={profile.phone}
                  onChange={handleProfileChange}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Passport Number"
                  id="passport"
                  name="passport"
                  value={profile.passport}
                  onChange={handleProfileChange}
                  required
                />
                <Input
                  label="Nationality"
                  id="nationality"
                  name="nationality"
                  value={profile.nationality}
                  onChange={handleProfileChange}
                  required
                />
              </div>

              <Input
                label="Emergency Contact Info"
                id="emergencyContact"
                name="emergencyContact"
                value={profile.emergencyContact}
                onChange={handleProfileChange}
                required
              />

              <div className="pt-2">
                <Button type="submit" className="flex items-center gap-1.5 font-semibold">
                  <Save size={16} /> Save Changes
                </Button>
              </div>
            </form>
          </div>

          {/* Preferences Form */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-800 text-base flex items-center gap-1.5 border-b border-slate-100 pb-2">
              <HeartHandshake size={18} className="text-blue-500" />
              Travel Preferences
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-500 uppercase">Seat Preference</label>
                <select
                  name="seatPref"
                  value={preferences.seatPref}
                  onChange={handlePrefChange}
                  className="w-full border border-slate-200 rounded-lg p-2 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Window">Window Seat</option>
                  <option value="Aisle">Aisle Seat</option>
                  <option value="No Preference">No Preference</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-500 uppercase">Meal Preference</label>
                <select
                  name="mealPref"
                  value={preferences.mealPref}
                  onChange={handlePrefChange}
                  className="w-full border border-slate-200 rounded-lg p-2 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Standard Vegetarian">Standard Vegetarian</option>
                  <option value="Asian Vegetarian">Asian Vegetarian</option>
                  <option value="Non-Veg Meal">Standard Non-Veg</option>
                  <option value="Fruit Platter">Fruit Platter</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-500 uppercase">Default Cabin Class</label>
                <select
                  name="cabinPref"
                  value={preferences.cabinPref}
                  onChange={handlePrefChange}
                  className="w-full border border-slate-200 rounded-lg p-2 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Economy">Economy</option>
                  <option value="Premium Economy">Premium Economy</option>
                  <option value="Business">Business</option>
                </select>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <label className="flex items-center gap-2 cursor-pointer text-sm text-slate-700">
                <input
                  type="checkbox"
                  name="wheelchair"
                  checked={preferences.wheelchair}
                  onChange={handlePrefChange}
                  className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <span>I require wheelchair assistance at the airport (WCHR)</span>
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Co-Passengers List */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4 h-fit">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <h3 className="font-bold text-slate-800 text-base">Co-Travelers</h3>
              {!showAddForm && (
                <button
                  onClick={() => setShowAddForm(true)}
                  className="text-blue-600 hover:text-blue-800 p-1 flex items-center gap-0.5 text-xs font-bold"
                >
                  <Plus size={14} /> Add
                </button>
              )}
            </div>

            {/* Add Co-Passenger Form */}
            {showAddForm && (
              <form onSubmit={addCoPassenger} className="p-3 bg-slate-55 bg-slate-50 rounded-xl border border-slate-200/50 space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="text-xs font-bold text-slate-700 uppercase">New Co-Traveler</h4>
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="text-slate-400 hover:text-slate-600"
                  >
                    Cancel
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={newCoPassenger.name}
                  onChange={(e) => setNewCoPassenger({ ...newCoPassenger, name: e.target.value })}
                  className="w-full text-xs p-2 border border-slate-200 rounded bg-white focus:outline-none"
                  required
                />
                <input
                  type="text"
                  placeholder="Passport Number"
                  value={newCoPassenger.passport}
                  onChange={(e) => setNewCoPassenger({ ...newCoPassenger, passport: e.target.value })}
                  className="w-full text-xs p-2 border border-slate-200 rounded bg-white focus:outline-none"
                  required
                />
                <select
                  value={newCoPassenger.relation}
                  onChange={(e) => setNewCoPassenger({ ...newCoPassenger, relation: e.target.value })}
                  className="w-full text-xs p-2 border border-slate-200 rounded bg-white focus:outline-none"
                >
                  <option value="Spouse">Spouse</option>
                  <option value="Child">Child</option>
                  <option value="Sibling">Sibling</option>
                  <option value="Friend">Friend</option>
                  <option value="Colleague">Colleague</option>
                </select>
                <Button type="submit" size="sm" className="w-full">
                  Save Traveler
                </Button>
              </form>
            )}

            {/* Co-Passenger Cards */}
            <div className="space-y-3">
              {coPassengers.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-4">No co-travelers saved yet.</p>
              ) : (
                coPassengers.map((co) => (
                  <div
                    key={co.id}
                    className="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-100"
                  >
                    <div>
                      <p className="font-bold text-slate-800 text-xs truncate max-w-[150px]">{co.name}</p>
                      <p className="text-[10px] text-slate-400 font-medium mt-0.5">{co.relation} • {co.passport}</p>
                    </div>
                    <button
                      onClick={() => deleteCoPassenger(co.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1.5 rounded-lg transition-colors"
                      title="Delete co-passenger"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
