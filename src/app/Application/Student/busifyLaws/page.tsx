
import Link from "next/link"

export default function Component() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="bg-gray-900 py-12 text-center text-white">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">Laws and Regulations</h1>
          <p className="mt-6 text-lg leading-8">Explore the latest laws and regulations that govern our society.</p>
        </div>
      </header>
      <main className="flex-1">
        <div className="container mx-auto py-16 px-4 md:px-6">
          <section id="privacy" className="mb-16">
            <h2 className="mb-4 text-2xl font-bold">Privacy</h2>
            <p className="mb-6 text-gray-500 dark:text-gray-400">
              Understand the laws and regulations that protect your personal information and privacy rights.
            </p>
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950">
              <h3 className="mb-4 text-xl font-bold">General Data Protection Regulation (GDPR)</h3>
              <p className="mb-4 text-gray-500 dark:text-gray-400">
                The GDPR is a comprehensive data privacy law that regulates how companies collect, use, and protect the
                personal data of individuals within the European Union.
              </p>
              <h3 className="mb-4 text-xl font-bold">California Consumer Privacy Act (CCPA)</h3>
              <p className="mb-4 text-gray-500 dark:text-gray-400">
                The CCPA is a data privacy law that gives California residents more control over the personal
                information that businesses collect about them.
              </p>
            </div>
          </section>
          <section id="security" className="mb-16">
            <h2 className="mb-4 text-2xl font-bold">Security</h2>
            <p className="mb-6 text-gray-500 dark:text-gray-400">
              Explore the laws and regulations that govern cybersecurity and data protection.
            </p>
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950">
              <h3 className="mb-4 text-xl font-bold">Health Insurance Portability and Accountability Act (HIPAA)</h3>
              <p className="mb-4 text-gray-500 dark:text-gray-400">
                HIPAA is a federal law that sets standards for the protection of sensitive patient health information.
              </p>
              <h3 className="mb-4 text-xl font-bold">Payment Card Industry Data Security Standard (PCI DSS)</h3>
              <p className="mb-4 text-gray-500 dark:text-gray-400">
                PCI DSS is a set of security standards designed to ensure that all companies that accept, process, store
                or transmit credit card information maintain a secure environment.
              </p>
            </div>
          </section>
          <section id="consumer-protection" className="mb-16">
            <h2 className="mb-4 text-2xl font-bold">Consumer Protection</h2>
            <p className="mb-6 text-gray-500 dark:text-gray-400">
              Learn about the laws and regulations that protect consumers from unfair or deceptive practices.
            </p>
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950">
              <h3 className="mb-4 text-xl font-bold">Federal Trade Commission Act (FTC Act)</h3>
              <p className="mb-4 text-gray-500 dark:text-gray-400">
                The FTC Act prohibits unfair or deceptive acts or practices in or affecting commerce.
              </p>
              <h3 className="mb-4 text-xl font-bold">Magnuson-Moss Warranty Act</h3>
              <p className="mb-4 text-gray-500 dark:text-gray-400">
                The Magnuson-Moss Warranty Act is a federal law that regulates warranties on consumer products.
              </p>
            </div>
          </section>
          <section id="environmental-regulations" className="mb-16">
            <h2 className="mb-4 text-2xl font-bold">Environmental Regulations</h2>
            <p className="mb-6 text-gray-500 dark:text-gray-400">
              Explore the laws and regulations that protect the environment and promote sustainability.
            </p>
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950">
              <h3 className="mb-4 text-xl font-bold">Clean Air Act</h3>
              <p className="mb-4 text-gray-500 dark:text-gray-400">
                The Clean Air Act is a federal law that regulates air emissions from stationary and mobile sources, with
                the goal of protecting public health and the environment.
              </p>
              <h3 className="mb-4 text-xl font-bold">Clean Water Act</h3>
              <p className="mb-4 text-gray-500 dark:text-gray-400">
                The Clean Water Act is a federal law that regulates the discharge of pollutants into
                surface waters, including lakes, rivers, streams, and coastal areas.
              </p>
            </div>
          </section>
        </div>
      </main>
      <footer className="bg-gray-900 py-6 text-center text-gray-400">
        <div className="container mx-auto px-4 md:px-6">
          <p>&copy; 2024 Acme Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}