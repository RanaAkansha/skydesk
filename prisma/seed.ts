import { PrismaClient, TravelClass } from '@prisma/client'

const prisma = new PrismaClient()

const frontendFlights = [
  {
    airline: 'IndiGo',
    flightNo: '6E 2291',
    from: 'DEL',
    to: 'BOM',
    depart: '06:15',
    arrive: '08:20',
    duration: '2h 05m',
    stops: 'Non-stop',
    price: 4820,
    cabin: 'Economy',
    seatsLeft: 6,
  },
  {
    airline: 'Air India',
    flightNo: 'AI 3107',
    from: 'DEL',
    to: 'BOM',
    depart: '09:40',
    arrive: '11:55',
    duration: '2h 15m',
    stops: 'Non-stop',
    price: 5640,
    cabin: 'Economy',
    seatsLeft: 12,
  },
  {
    airline: 'Vistara',
    flightNo: 'UK 8842',
    from: 'DEL',
    to: 'BOM',
    depart: '14:05',
    arrive: '16:35',
    duration: '2h 30m',
    stops: '1 stop · BLR',
    price: 4110,
    cabin: 'Economy',
    seatsLeft: 3,
  },
  {
    airline: 'IndiGo',
    flightNo: '6E 1140',
    from: 'DEL',
    to: 'BOM',
    depart: '19:20',
    arrive: '21:25',
    duration: '2h 05m',
    stops: 'Non-stop',
    price: 6215,
    cabin: 'Business',
    seatsLeft: 9,
  },
]

const expenseCategories = [
  {
    name: 'Meals',
    description: 'Food and dining expenses',
  },
  {
    name: 'Transport',
    description: 'Taxis, rideshares, and local transport',
  },
  {
    name: 'Accommodation',
    description: 'Hotel and lodging expenses',
  },
  {
    name: 'Communication',
    description: 'Phone and internet expenses',
  },
  {
    name: 'Other',
    description: 'Miscellaneous travel expenses',
  },
]

const cityMap: Record<string, string> = {
  DEL: 'Delhi',
  BOM: 'Mumbai',
  BLR: 'Bangalore',
}

function toTravelClass(cabin: string): TravelClass {
  switch (cabin.toLowerCase()) {
    case 'business':
      return TravelClass.BUSINESS

    case 'premium economy':
      return TravelClass.PREMIUM_ECONOMY

    case 'first':
    case 'first class':
      return TravelClass.FIRST

    default:
      return TravelClass.ECONOMY
  }
}

async function main() {
  console.log("🌱 Starting database seed...\n")

  for (const flight of frontendFlights) {
    const departureTime = new Date(`2026-07-18T${flight.depart}:00`)
    let arrivalTime = new Date(`2026-07-18T${flight.arrive}:00`)

    if (arrivalTime <= departureTime) {
      arrivalTime.setDate(arrivalTime.getDate() + 1)
    }

    await prisma.flight.upsert({
      where: { flightNumber: flight.flightNo },
      update: {
        airline: flight.airline,
        airlineCode: flight.flightNo.split(' ')[0],
        logo: `/logos/${flight.airline.toLowerCase().replace(/\s+/g, '-')}.png`, 
        fromCity: cityMap[flight.from] ?? flight.from,
        fromCode: flight.from,
        toCity: cityMap[flight.to] ?? flight.to,
        toCode: flight.to,
        departureTime,
        arrivalTime,
        duration: flight.duration,
        terminal: null,
        gate: null,
        travelClass: toTravelClass(flight.cabin),
        basePrice: flight.price,
      },
      create: {
        airline: flight.airline,
        airlineCode: flight.flightNo.split(' ')[0],
        flightNumber: flight.flightNo,
        logo: `/logos/${flight.airline.toLowerCase().replace(/\s+/g, '-')}.png`,
        fromCity: cityMap[flight.from] ?? flight.from,
        fromCode: flight.from,
        toCity: cityMap[flight.to] ?? flight.to,
        toCode: flight.to,
        departureTime,
        arrivalTime,
        duration: flight.duration,
        terminal: null,
        gate: null,
        travelClass: toTravelClass(flight.cabin),
        basePrice: flight.price,
      },
    })
  }

  console.log(`Seeded ${frontendFlights.length} flights.`)

  for (const category of expenseCategories) {
    await prisma.expenseCategory.upsert({
      where: { name: category.name },
      update: {
        description: category.description,
      },
      create: {
        name: category.name,
        description: category.description,
      },
    })
  }

  console.log(`Seeded ${expenseCategories.length} expense categories.`)
  console.log('Prisma seed completed successfully.')
}

main()
  .catch((error) => {
    console.error('Prisma seed failed:', error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
