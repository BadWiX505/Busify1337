

export default function Rules() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="bg-gray-900 py-12 text-center text-white">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">Rules and Regulations</h1>
          <p className="mt-6 text-lg leading-8">Explore the necessary rules of our 1337 busify comunity.</p>
        </div>
      </header>
      <main className="flex-1">
        <div className="container mx-auto py-16 px-4 md:px-6">
          <section id="privacy" className="mb-16">
            <h2 className="mb-4 text-2xl font-bold">Rules</h2>
            <p className="mb-6 text-gray-500 dark:text-gray-400">
              Understand the rules and regulations that protect you from banning and punishement.
            </p>
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950">
              <h3 className="mb-4 text-xl font-bold">Make sure before any booking</h3>
              <p className="mb-4 text-gray-500 dark:text-gray-400">
              After making a booking, you cannot cancel it, so make sure before doing so.
              </p>
              <h3 className="mb-4 text-xl font-bold">Respect your booking calendar</h3>
              <p className="mb-4 text-gray-500 dark:text-gray-400">
              Attend before the departure time by 10 minutes. If you miss the bus, this booking will be considered as missed. Three missed bookings === bann.
              </p>

              <h3 className="mb-4 text-xl font-bold">Respect bus and driver</h3>
              <p className="mb-4 text-gray-500 dark:text-gray-400">
              Be kind to all bus components, including students, the driver, and bus materials, as the driver may report you.
              </p>
            </div>
          </section>
        </div>
      </main>
      <footer className="bg-gray-900 py-6 text-center text-gray-400">
        <div className="container mx-auto px-4 md:px-6">
          <p>&copy; 2024 busify. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}