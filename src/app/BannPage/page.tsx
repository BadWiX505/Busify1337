
import { Button } from "@/components/ui/button"

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
      <a href="/api/destroySession">
        <Button className="flex items-center gap-2 bg-red-500 hover:bg-red-700 mt-5">
          <LogOutIcon className="h-4 w-4" />
          Logout
        </Button>
      </a>
    </div>
  )
}



function LogOutIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" x2="9" y1="12" y2="12" />
    </svg>
  )
}