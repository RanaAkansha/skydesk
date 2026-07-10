import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard, Plane, Briefcase, Calendar,
  Award, Settings, LogOut, X,
} from 'lucide-react'

const navItems = [
  { label: 'Dashboard',         icon: LayoutDashboard, path: '/dashboard' },
  { label: 'Book Flight',       icon: Plane,           path: '/book' },
  { label: 'My Trips',          icon: Briefcase,       path: '/trips' },
  { label: 'Flight Status',     icon: Calendar,        path: '/status' },
  { label: 'Loyalty & Rewards',  icon: Award,           path: '/loyalty' },
  { label: 'Settings & Profile', icon: Settings,        path: '/settings' },
]

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={[
          'fixed top-0 left-0 h-full w-64 bg-white border-r border-slate-200 z-50 flex flex-col transition-transform duration-300 ease-in-out',
          'lg:translate-x-0 lg:static lg:z-auto',
          open ? 'translate-x-0' : '-translate-x-full',
        ].join(' ')}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-slate-100 flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Plane size={16} className="text-white" fill="white" />
            </div>
            <span className="text-lg font-bold text-slate-900">
              Sky<span className="text-blue-600">Desk</span>
            </span>
          </div>
          {/* Close button — mobile only */}
          <button
            onClick={onClose}
            className="lg:hidden p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-3 mb-2">
            Main Menu
          </p>
          <ul className="space-y-0.5">
            {navItems.map(({ label, icon: Icon, path }) => (
              <li key={label}>
                <NavLink
                  to={path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    [
                      'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150',
                      isActive
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
                    ].join(' ')
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        size={18}
                        strokeWidth={isActive ? 2.5 : 1.75}
                        className={isActive ? 'text-blue-600' : 'text-slate-400'}
                      />
                      {label}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-slate-100 flex-shrink-0">
          <NavLink
            to="/login"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 transition-colors duration-150"
          >
            <LogOut size={18} strokeWidth={1.75} />
            Logout
          </NavLink>
        </div>
      </aside>
    </>
  )
}
