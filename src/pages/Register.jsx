import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User, Mail, Phone, Globe, Lock, Plane } from 'lucide-react'
import Input from '../components/Input.jsx'
import Button from '../components/Button.jsx'

const countries = [
  'India', 'United Arab Emirates', 'Singapore', 'United Kingdom',
  'United States', 'Australia', 'Canada', 'Germany',
]

export default function Register() {
  const [form, setForm] = useState({
    fullName: '', email: '', phone: '', country: '',
    password: '', confirmPassword: '', terms: false,
  })
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  function validate() {
    const e = {}
    if (!form.fullName.trim()) e.fullName = 'Full name is required'
    if (!form.email.includes('@')) e.email = 'Enter a valid email'
    if (form.phone.length < 10) e.phone = 'Enter a valid phone number'
    if (!form.password || form.password.length < 8) e.password = 'Min 8 characters'
    if (form.password !== form.confirmPassword) e.confirmPassword = 'Passwords do not match'
    if (!form.terms) e.terms = 'Please accept the terms'
    return e
  }

  function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Plane size={15} className="text-white" fill="white" />
          </div>
          <span className="text-xl font-bold text-slate-900">
            Sky<span className="text-blue-600">Desk</span>
          </span>
        </div>

        <h1 className="text-2xl font-bold text-slate-900">Create your account</h1>
        <p className="text-slate-500 text-sm mt-1 mb-6">Join SkyDesk and start booking flights, tracking status, and earning rewards.</p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <Input
                label="Full Name"
                id="fullName"
                name="fullName"
                placeholder="Arjun Mehta"
                value={form.fullName}
                onChange={handleChange}
                icon={User}
                error={errors.fullName}
                required
              />
            </div>

            <Input
              label="Email Address"
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              icon={Mail}
              error={errors.email}
              required
              autoComplete="email"
            />

            <Input
              label="Phone Number"
              id="phone"
              name="phone"
              type="tel"
              placeholder="+91 98765 43210"
              value={form.phone}
              onChange={handleChange}
              icon={Phone}
              error={errors.phone}
              required
            />

            {/* Country select */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="country" className="text-sm font-medium text-slate-700">
                Country <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Globe size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <select
                  id="country"
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  className="w-full pl-9 pr-3 py-2.5 text-sm rounded-lg border border-slate-200 hover:border-slate-300 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-150 appearance-none"
                >
                  <option value="">Select country</option>
                  {countries.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="hidden sm:block" />

            <Input
              label="Password"
              id="password"
              name="password"
              type="password"
              placeholder="Min 8 characters"
              value={form.password}
              onChange={handleChange}
              icon={Lock}
              error={errors.password}
              required
              autoComplete="new-password"
            />

            <Input
              label="Confirm Password"
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Repeat your password"
              value={form.confirmPassword}
              onChange={handleChange}
              icon={Lock}
              error={errors.confirmPassword}
              required
              autoComplete="new-password"
            />
          </div>

          {/* Terms */}
          <div className="mt-4">
            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="terms"
                checked={form.terms}
                onChange={handleChange}
                className="mt-0.5 w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 flex-shrink-0"
              />
              <span className="text-sm text-slate-600">
                I agree to the{' '}
                <span className="text-blue-600 font-medium cursor-pointer hover:underline">Terms of Service</span>
                {' '}and{' '}
                <span className="text-blue-600 font-medium cursor-pointer hover:underline">Privacy Policy</span>
              </span>
            </label>
            {errors.terms && <p className="text-xs text-red-500 mt-1">{errors.terms}</p>}
          </div>

          <div className="mt-6">
            <Button type="submit" fullWidth size="lg">
              Create Account
            </Button>
          </div>
        </form>

        <p className="text-center text-sm text-slate-500 mt-5">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 font-medium hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  )
}
