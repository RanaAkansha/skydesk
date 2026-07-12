import { PlaneTakeoff, ArrowRight, Search, Phone, Shield, FileText, Info, HelpCircle } from 'lucide-react'
import SearchFlightCard from '../components/SearchFlightCard.jsx'
import UpcomingTripCard from '../components/UpcomingTripCard.jsx'
import BookingCard from '../components/BookingCard.jsx'
import DestinationCard from '../components/DestinationCard.jsx'
import OfferCard from '../components/OfferCard.jsx'
import TravelTipCard from '../components/TravelTipCard.jsx'
import QuickActions from '../components/QuickActions.jsx'

import bookings from '../data/bookings.json'
import offers from '../data/offers.json'
import destinations from '../data/destinations.json'
import recentSearches from '../data/recentSearches.json'
import travelTips from '../data/travelTips.json'
import profile from '../data/profile.json'

export default function Dashboard() {
  const today = new Date().toLocaleDateString('en-IN', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  })

  const upcomingBooking = bookings.find(b => b.upcoming)
  const recentBookings = bookings.filter(b => !b.upcoming).slice(0, 4)

  return (
    <div className="space-y-8">

      {/* ── Welcome Section ─────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#0F172A]">
            Hello, {profile.firstName}! 👋
          </h1>
          <p className="text-[#64748B] mt-1">Ready for your next journey?</p>
          <p className="text-[#64748B] text-sm mt-0.5">{today}</p>
        </div>
        <button className="inline-flex items-center gap-2 bg-[#F97316] hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl shadow-md hover:shadow-lg hover:shadow-orange-200 transition-all active:scale-95 shrink-0">
          <PlaneTakeoff size={18} />
          Book Flight
          <ArrowRight size={16} />
        </button>
      </div>

      {/* ── Search Card ─────────────────────────────────────── */}
      <SearchFlightCard />

      {/* ── Main layout ──────────────────────────────────────── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Left column (2/3 wide) */}
        <div className="xl:col-span-2 space-y-8">

          {/* Upcoming Trip */}
          {upcomingBooking && (
            <section>
              <SectionHeader title="Upcoming Trip" link="View all trips" />
              <UpcomingTripCard booking={upcomingBooking} />
            </section>
          )}

          {/* Recent Searches */}
          <section>
            <SectionHeader title="Recent Searches" link="Clear all" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {recentSearches.map(s => (
                <div key={s.id} className="bg-white border border-[#E2E8F0] rounded-xl p-4 hover:shadow-md hover:border-[#2563EB]/30 transition-all cursor-pointer group">
                  <div className="flex items-center gap-2 mb-2">
                    <Search size={14} className="text-[#64748B] group-hover:text-[#2563EB] transition-colors" />
                    <span className="text-xs text-[#64748B]">{new Date(s.searchedOn).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-extrabold text-[#0F172A] text-base">{s.fromCode}</span>
                    <ArrowRight size={14} className="text-[#64748B]" />
                    <span className="font-extrabold text-[#0F172A] text-base">{s.toCode}</span>
                  </div>
                  <p className="text-xs text-[#64748B] mb-3">{s.from} → {s.to}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#64748B]">{s.passengers} Pax · {s.class}</span>
                    <button className="text-xs font-bold text-[#2563EB] border border-[#DBEAFE] px-2.5 py-1 rounded-lg hover:bg-[#DBEAFE] transition-colors">
                      Search Again
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* My Bookings */}
          <section>
            <SectionHeader title="My Bookings" link="View all" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {recentBookings.map(b => (
                <BookingCard key={b.id} booking={b} />
              ))}
            </div>
          </section>

          {/* Popular Destinations */}
          <section>
            <SectionHeader title="Popular Destinations" link="See all" />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {destinations.map(d => (
                <DestinationCard key={d.id} destination={d} />
              ))}
            </div>
          </section>

          {/* Special Offers */}
          <section>
            <SectionHeader title="Special Offers" link="View all offers" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {offers.map(o => (
                <OfferCard key={o.id} offer={o} />
              ))}
            </div>
          </section>

          {/* Travel Tips */}
          <section>
            <SectionHeader title="Travel Tips & Alerts" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {travelTips.map(t => (
                <TravelTipCard key={t.id} tip={t} />
              ))}
            </div>
          </section>

        </div>

        {/* Right column (1/3 wide) */}
        <div className="xl:col-span-1 space-y-6">
          <QuickActions />
        </div>
      </div>

      {/* ── Footer ──────────────────────────────────────────── */}
      <footer className="border-t border-[#E2E8F0] pt-6 mt-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex flex-wrap items-center gap-5">
            <a href="#" className="flex items-center gap-1.5 text-xs text-[#64748B] hover:text-[#2563EB] font-medium transition-colors">
              <HelpCircle size={13} />
              Need Help?
            </a>
            <a href="#" className="flex items-center gap-1.5 text-xs text-[#64748B] hover:text-[#2563EB] font-medium transition-colors">
              <Phone size={13} />
              Customer Support
            </a>
            <a href="#" className="flex items-center gap-1.5 text-xs text-[#64748B] hover:text-[#2563EB] font-medium transition-colors">
              <Shield size={13} />
              Privacy Policy
            </a>
            <a href="#" className="flex items-center gap-1.5 text-xs text-[#64748B] hover:text-[#2563EB] font-medium transition-colors">
              <FileText size={13} />
              Terms
            </a>
            <a href="#" className="flex items-center gap-1.5 text-xs text-[#64748B] hover:text-[#2563EB] font-medium transition-colors">
              <Info size={13} />
              About Us
            </a>
          </div>
          <p className="text-xs text-[#64748B]">© 2026 SkyDesk. All rights reserved.</p>
        </div>
      </footer>

    </div>
  )
}

function SectionHeader({ title, link }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-lg font-bold text-[#0F172A]">{title}</h2>
      {link && (
        <button className="text-sm text-[#2563EB] font-semibold hover:underline flex items-center gap-1">
          {link}
          <ArrowRight size={14} />
        </button>
      )}
    </div>
  )
}
