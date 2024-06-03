/**
 * v0 by Vercel.
 * @see https://v0.dev/t/bhYBFxVJEjQ
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "../ui/dialog"

export default function BookingConfirmation({confirmFunction}) {
  return (
      <DialogContent className="max-w-md p-0">
        <div className="relative flex flex-col items-center justify-center gap-4 rounded-lg bg-white p-8 shadow-lg dark:bg-gray-900">
          <div className="absolute -top-12 flex h-24 w-24 items-center justify-center rounded-full bg-blue-500 text-white">
            <CircleCheckIcon className="h-12 w-12" />
          </div>
          <div className="mt-12 space-y-2 text-center">
            <DialogTitle className="text-2xl font-bold">Are you sure?</DialogTitle>
            <DialogDescription className="text-gray-500 dark:text-gray-400">
              This action cannot be undone. This will permanently delete your account and remove your data from our
              servers.
            </DialogDescription>
          </div>
          <div className="mt-6 flex w-full justify-center gap-2">
            <DialogClose>
            <Button variant="outline" className="flex-1" >
              Cancel
            </Button>
            </DialogClose>
            <DialogClose>
            <Button className="flex-1"  onClick={confirmFunction}>
              Confirm
            </Button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
  )
}

function CircleCheckIcon(props) {
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
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}