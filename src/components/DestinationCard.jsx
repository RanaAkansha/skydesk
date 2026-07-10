import { Plane, IndianRupee } from 'lucide-react'

// Destination images from Unsplash (public CDN, no API key required)
const destinationImages = {
  Delhi:     'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400&q=80',
  Mumbai:    'https://images.unsplash.com/photo-1595658658481-d53d3f999875?w=400&q=80',
  Goa:       'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400&q=80',
  Bangalore: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=400&q=80',
  Dubai:     'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&q=80',
  Singapore: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=400&q=80',
}

export default function DestinationCard({ name, flightsToday, avgFare, country }) {
  const image = destinationImages[name] || destinationImages.Dubai

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-md transition-shadow duration-200 group">
      <div className="relative h-36 overflow-hidden">
        <img
          src={image}
          alt={`${name} destination`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-3 left-3">
          <p className="text-white font-bold text-base leading-none">{name}</p>
          {country && <p className="text-white/80 text-xs mt-0.5">{country}</p>}
        </div>
      </div>

      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-slate-600">
          <Plane size={13} className="text-blue-500" />
          <span className="text-xs font-medium">{flightsToday} flights today</span>
        </div>
        <div className="flex items-center gap-0.5 text-slate-700">
          <span className="text-xs text-slate-400">avg</span>
          <span className="text-xs font-semibold text-orange-500 ml-1">
            ₹{avgFare.toLocaleString('en-IN')}
          </span>
        </div>
      </div>
    </div>
  )
}
