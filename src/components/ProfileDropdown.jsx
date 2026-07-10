import { useState, useRef, useEffect } from 'react'
import { ChevronDown, User, Settings, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const menuItems = [
  { icon: User,     label: 'My Profile',  path: '/settings' },
  { icon: Settings, label: 'My Trips',    path: '/trips' },
  { icon: LogOut,   label: 'Logout',      path: '/login', danger: true },
]

export default function ProfileDropdown() {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const navigate = useNavigate()

  // Close dropdown if user clicks outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-slate-100 transition-colors duration-150"
        aria-label="Open profile menu"
        aria-expanded={open}
      >
        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
          AM
        </div>
        <div className="hidden sm:block text-left">
          <p className="text-sm font-semibold text-slate-800 leading-none">Arjun Mehta</p>
          <p className="text-xs text-slate-400 mt-0.5">arjun.mehta@example.com</p>
        </div>
        <ChevronDown
          size={14}
          className={`text-slate-400 transition-transform duration-200 hidden sm:block ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-lg py-1 z-50">
          {menuItems.map(({ icon: Icon, label, path, danger }) => (
            <button
              key={label}
              onClick={() => {
                setOpen(false)
                if (path) navigate(path)
              }}
              className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm hover:bg-slate-50 transition-colors duration-100 ${danger ? 'text-red-500 hover:bg-red-50' : 'text-slate-700'}`}
            >
              <Icon size={15} />
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
