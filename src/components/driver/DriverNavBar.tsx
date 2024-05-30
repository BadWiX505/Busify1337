"use client"


import Link from "next/link"
import { DropdownMenuTrigger, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { PopoverTrigger, PopoverContent, Popover } from "@/components/ui/popover"
import { useRouter } from "next/navigation"

export default function DruverNavBar(){

    const router = useRouter();
    async function destroySession() {
        const resp = await fetch('/api/destroySession');
        const res = await resp.json();
        if(res)
          router.push('/login')
      }

  return(
    <header className="w-full bg-white shadow-md dark:bg-gray-900 dark:text-white">
    <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
            <Link href="#">
                <MountainIcon className="h-6 w-6" />
                <span className="sr-only">Acme Inc</span>
            </Link>
        </div>
        <div className="flex items-center gap-4">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button className="flex items-center gap-2" variant="outline">
                        <UserIcon className="h-4 w-4 mr-2" />
                        <span>Profile</span>
                        <ChevronDownIcon className="h-4 w-4 ml-2" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48 p-2">
                    <DropdownMenuItem className="flex items-center gap-2">
                        <FileIcon className="h-4 w-4 mr-2" />
                        <span>Report</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2">
                        <UserIcon className="h-4 w-4 mr-2" />
                        <span>Account</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <Button className="hidden md:inline-flex" onClick={destroySession}>Sign Out</Button>
            <Popover>
                <PopoverTrigger asChild>
                    <Button className="md:hidden" size="icon" variant="ghost">
                        <MenuIcon className="h-6 w-6" />
                        <span className="sr-only">Toggle menu</span>
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="p-4 w-64 bg-white shadow-lg dark:bg-gray-900">
                    <div className="grid gap-4">
                        <div className="flex flex-col gap-2 mt-4">
                            <Button onClick={destroySession}>Sign Out</Button>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    </div>
</header>
  )
}


function FileIcon(props) {
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
            <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
            <path d="M14 2v4a2 2 0 0 0 2 2h4" />
        </svg>
    )
}


function MenuIcon(props) {
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
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
        </svg>
    )
}


function MountainIcon(props) {
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
            <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
        </svg>
    )
}


function UserIcon(props) {
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
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
        </svg>
    )
}


function ChevronDownIcon(props) {
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
            <path d="m6 9 6 6 6-6" />
        </svg>
    )
}


