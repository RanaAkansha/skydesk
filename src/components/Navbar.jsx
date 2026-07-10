import { useState, useRef, useEffect } from 'react'
import { Search, Bell, Menu } from 'lucide-react'
import ProfileDropdown from './ProfileDropdown.jsx'
import notifications from '../data/notifications.json'

const unreadCount = notifications.filter((n) => !n.read).length

export default function Navbar({ onMenuClick }) {
  const [notifOpen, setNotifOpen] = useState(false)
  const notifRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center px-4 md:px-6 gap-4 sticky top-0 z-30">
      {/* Hamburger — visible on mobile only */}
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors duration-150"
        aria-label="Toggle sidebar"
      >
        <Menu size={20} />
      </button>

      {/* Search bar */}
      <div className="flex-1 max-w-md relative">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        <input
          type="search"
          placeholder="Search flights, destinations..."
          className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-colors duration-150"
        />
      </div>

      <div className="flex items-center gap-1 ml-auto">
        {/* Notification bell */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setNotifOpen((o) => !o)}
            className="relative p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors duration-150"
            aria-label="Notifications"
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-100">
                <p className="font-semibold text-slate-900 text-sm">Notifications</p>
                <p className="text-xs text-slate-400">{unreadCount} unread</p>
              </div>
              <ul className="max-h-72 overflow-y-auto divide-y divide-slate-50">
                {notifications.slice(0, 5).map((n) => (
                  <li key={n.id} className={`px-4 py-3 text-sm hover:bg-slate-50 ${!n.read ? 'bg-blue-50/30' : ''}`}>
                    <p className="font-medium text-slate-800">{n.title}</p>
                    <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{n.message}</p>
                  </li>
                ))}
              </ul>
              <div className="px-4 py-2.5 border-t border-slate-100">
                <button className="text-sm text-blue-600 font-medium hover:underline w-full text-center">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <ProfileDropdown />
      </div>
    </header>
  )
}
