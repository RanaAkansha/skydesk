import { Plane } from 'lucide-react'

export default function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Left panel - Branding (Visible on desktop/large screens) */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-7/12 relative bg-slate-900 text-white p-16 flex-col justify-between overflow-hidden">
        {/* Background Image with flat opacity overlay */}
        <img
          src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&q=80"
          alt="SkyDesk Premium Airline Flight"
          className="absolute inset-0 w-full h-full object-cover opacity-35"
        />
        {/* Safe text contrast overlay */}
        <div className="absolute inset-0 bg-slate-950/40 pointer-events-none" />

        <div className="relative z-10 flex items-center gap-2">
          <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
            <Plane size={18} className="text-white fill-white" />
          </div>
          <span className="text-2xl font-bold tracking-tight">SkyDesk</span>
        </div>

        <div className="relative z-10 space-y-6 max-w-xl">
          <h1 className="text-4xl font-extrabold leading-tight text-white tracking-tight">
            Enterprise Flight Operations Dashboard.
          </h1>
          <p className="text-slate-300 text-base leading-relaxed">
            Monitor real-time bookings, track global flight paths, analyze operational revenue streams, and manage user accounts securely.
          </p>
          <div className="flex items-center gap-12 pt-6 border-t border-slate-800">
            <div>
              <p className="text-2xl font-bold text-white">12.8k+</p>
              <p className="text-slate-400 text-xs mt-1 uppercase tracking-wider">Bookings Processed</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">148</p>
              <p className="text-slate-400 text-xs mt-1 uppercase tracking-wider">Active Routes</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">99.2%</p>
              <p className="text-slate-400 text-xs mt-1 uppercase tracking-wider">System Uptime</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-xs text-slate-500">
          © {new Date().getFullYear()} SkyDesk Inc. All rights reserved. Confidential Internal Platform.
        </div>
      </div>

      {/* Right panel - Form container */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="mx-auto w-full max-w-md bg-white border border-slate-200 rounded-xl p-8 shadow-sm">
          {/* Logo showing on mobile only */}
          <div className="flex items-center gap-2 mb-6 lg:hidden justify-center">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Plane size={15} className="text-white fill-white" />
            </div>
            <span className="text-xl font-bold text-slate-900">
              Sky<span className="text-blue-600">Desk</span>
            </span>
          </div>

          <div className="text-center lg:text-left mb-6">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">{title}</h2>
            {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
          </div>

          {children}
        </div>
      </div>
    </div>
  )
}
