import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  PlaneTakeoff,
  Ticket,
  Users,
  Settings,
  X,
  Plane,
  AlertCircle
} from 'lucide-react'

export default function Sidebar({ open, onClose }) {
  const [toastMessage, setToastMessage] = useState('')

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage('')
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [toastMessage])

  const menuItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard', active: true },
    { label: 'Flights Manager', icon: PlaneTakeoff, path: '#', active: false },
    { label: 'Booking Flow', icon: Ticket, path: '#', active: false },
    { label: 'User Directory', icon: Users, path: '#', active: false },
    { label: 'Settings', icon: Settings, path: '#', active: false }
  ]

  function handleMenuClick(e, item) {
    if (!item.active) {
      e.preventDefault()
      setToastMessage(`"${item.label}" is assigned to another module.`)
    } else {
      onClose()
    }
  }

  return (
    <>
      {/* Toast Notification Container */}
      {toastMessage && (
        <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-slate-900 border border-slate-800 text-slate-100 px-4 py-3 rounded-lg shadow-xl text-xs font-semibold animate-fade-in-up">
          <AlertCircle size={15} className="text-blue-500" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Mobile Backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-slate-950/40 z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar container */}
      <aside
        className={[
          'fixed top-0 left-0 h-full w-64 bg-white border-r border-slate-200 z-50 flex flex-col transition-transform duration-300 ease-in-out',
          'lg:translate-x-0 lg:static lg:z-auto',
          open ? 'translate-x-0' : '-translate-x-full'
        ].join(' ')}
      >
        {/* Header Branding */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-slate-100 flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Plane size={16} className="text-white fill-white" />
            </div>
            <span className="text-lg font-bold text-slate-900">
              Sky<span className="text-blue-600">Desk</span>
            </span>
          </div>

          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 focus:outline-none"
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        </div>

        {/* Sidebar Navigation Links */}
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-7">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2.5">
              Operations Center
            </p>
            <ul className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon
                return (
                  <li key={item.label}>
                    {item.active ? (
                      <NavLink
                        to={item.path}
                        onClick={(e) => handleMenuClick(e, item)}
                        className={({ isActive }) =>
                          [
                            'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors duration-150',
                            isActive
                              ? 'bg-slate-900 text-white'
                              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                          ].join(' ')
                        }
                      >
                        {({ isActive }) => (
                          <>
                            <Icon
                              size={18}
                              className={isActive ? 'text-white' : 'text-slate-400'}
                              strokeWidth={2}
                            />
                            <span>{item.label}</span>
                          </>
                        )}
                      </NavLink>
                    ) : (
                      <a
                        href={item.path}
                        onClick={(e) => handleMenuClick(e, item)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                      >
                        <Icon size={18} className="text-slate-400" strokeWidth={2} />
                        <span>{item.label}</span>
                        <span className="ml-auto text-[9px] bg-slate-100 text-slate-500 font-bold px-1.5 py-0.5 rounded uppercase tracking-wide group-hover:bg-slate-200">
                          External
                        </span>
                      </a>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        </nav>

        {/* User Workspace Info Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 text-[10px] text-slate-400 font-semibold space-y-1">
          <p className="uppercase text-slate-500 font-bold">Workspace Status</p>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
            <span>Node Status: Operational</span>
          </div>
          <p>Version: 1.4.2-staging</p>
        </div>
      </aside>
    </>
  )
}
