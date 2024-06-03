

export default function BannPage() {
  return (
    <div className="flex h-[100vh] w-full flex-col items-center justify-center bg-gray-950 px-4 text-center">
      <div className="max-w-md space-y-6">
        <h1 className="text-5xl font-bold tracking-tighter text-red-500 sm:text-6xl md:text-7xl">YOU ARE BANNED</h1>
        <p className="text-lg font-medium text-gray-300">
          Your account has been banned for violating our Bus system laws and guidelines.
        </p>
        <div className="space-y-2">
          <p className="text-sm text-gray-400">
            If you believe this ban was made in error, please contact the staff to solve the problem
           
          </p>
          <p className="text-sm text-gray-400">
            We take our booking system guidelines seriously and do not tolerate any violations or careless actions.
          </p>
        </div>
      </div>
    </div>
  )
}