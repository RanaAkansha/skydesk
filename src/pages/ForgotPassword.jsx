import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, Plane, ArrowLeft, CheckCircle } from 'lucide-react'
import Input from '../components/Input.jsx'
import Button from '../components/Button.jsx'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    if (email) setSent(true)
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Plane size={15} className="text-white" fill="white" />
          </div>
          <span className="text-xl font-bold text-slate-900">
            Sky<span className="text-blue-600">Desk</span>
          </span>
        </div>

        {sent ? (
          // Success state
          <div className="text-center py-4">
            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={28} className="text-green-600" />
            </div>
            <h1 className="text-xl font-bold text-slate-900 mb-2">Check your inbox</h1>
            <p className="text-slate-500 text-sm mb-6">
              We've sent a password reset link to{' '}
              <span className="font-medium text-slate-700">{email}</span>
            </p>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-sm text-blue-600 font-medium hover:underline"
            >
              <ArrowLeft size={14} />
              Back to Sign In
            </Link>
          </div>
        ) : (
          // Form state
          <>
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-slate-900">Reset your password</h1>
              <p className="text-slate-500 text-sm mt-2">
                Enter the email address associated with your account and we'll send you a link to reset your password.
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <Input
                label="Email Address"
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={Mail}
                required
                autoComplete="email"
              />

              <Button type="submit" fullWidth size="lg" disabled={!email}>
                Send Reset Link
              </Button>
            </form>

            <div className="flex justify-center mt-5">
              <Link
                to="/login"
                className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-blue-600 font-medium transition-colors duration-150"
              >
                <ArrowLeft size={14} />
                Back to Sign In
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
