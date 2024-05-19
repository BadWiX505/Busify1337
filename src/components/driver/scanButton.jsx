
import { Button } from "@/components/ui/button"

export default function ScanButton() {
  return (
    <Button
    className=" text-black-50  bg-[#A7E92F] mx-auto hover:bg-[#A7E92F]"
    variant="primary"
  >
    <ScanIcon className="mr-2 h-4 w-4" />
    Start scanning

  </Button>
  )
}

function ScanIcon(props) {
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
      <path d="M3 7V5a2 2 0 0 1 2-2h2" />
      <path d="M17 3h2a2 2 0 0 1 2 2v2" />
      <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
      <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
    </svg>
  )
}
