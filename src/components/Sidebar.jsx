import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard, MapPin, Ticket, Heart, Bookmark,
  Wallet, Tag, HeadphonesIcon, User, Settings, LogOut,
  ChevronRight, Plane
} from 'lucide-react'
import profile from '../data/profile.json'

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { label: 'My Trips', icon: MapPin, path: '/my-trips' },
  { label: 'Bookings', icon: Ticket, path: '/bookings' },
  { label: 'Saved Flights', icon: Bookmark, path: '/saved-flights' },
  { label: 'Wishlist', icon: Heart, path: '/wishlist' },
  { label: 'Travel Wallet', icon: Wallet, path: '/wallet' },
  { label: 'Offers', icon: Tag, path: '/offers' },
]

const bottomItems = [
  { label: 'Support', icon: HeadphonesIcon, path: '/support' },
  { label: 'Profile', icon: User, path: '/profile' },
  { label: 'Settings', icon: Settings, path: '/settings' },
]

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-16 left-0 bottom-0 z-40 w-64 bg-white border-r border-slate-100 flex flex-col
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>

        {/* User mini-profile */}
        <div className="px-4 py-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-sm font-bold shrink-0">
              {profile.initials}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-slate-800 truncate">{profile.name}</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-xs bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded-full font-medium">
                  ⭐ {profile.membership}
                </span>
                <span className="text-xs text-slate-400">{profile.loyaltyPoints.toLocaleString()} pts</span>
              </div>
            </div>
          </div>
        </div>

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto py-3 px-3">
          <div className="space-y-0.5">
            {navItems.map(({ label, icon: Icon, path }) => (
              <NavLink
                key={path}
                to={path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group
                  ${isActive
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-200'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon size={18} className={isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-600'} />
                    <span className="flex-1">{label}</span>
                    {isActive && <ChevronRight size={14} />}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 space-y-0.5">
            {bottomItems.map(({ label, icon: Icon, path }) => (
              <NavLink
                key={path}
                to={path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group
                  ${isActive
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-200'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon size={18} className={isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-600'} />
                    <span>{label}</span>
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-slate-100">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors">
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  )
}
