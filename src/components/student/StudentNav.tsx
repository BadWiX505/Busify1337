"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { SVGProps, useContext } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Dialog, DialogTrigger } from "../ui/dialog";
import StudentEditModal from "./StudentEditModal";
import StudentHistory from "./StudentHistory";
import { useRouter } from "next/navigation";
import ReportModal from "./reportModal";
import { StudentContext } from "./StudentProvider";

export default function StudentNav() {
  const router = useRouter();
  const user = useContext(StudentContext);
  async function destroySession() {
    const resp = await fetch("/api/destroySession");
    const res = await resp.json();
    if (res) router.push("/login");
  }

  return (
    <header className="text-black py-4 px-6 md:px-8 lg:px-10  z-2 relative">
      <div className=" flex items-center justify-between">
        <Link
          className="text-[1.1rem] font-bold text-black lg:text-[1.5rem] md:text-[1.1rem] sm:text-[1.1rem] busify-link"
          href="#"
          // style={{ color: "#A7E92F" }}
        >
          .Busify
        </Link>

        <div className="flex justify-between items-center">
          <div className="mr-7">
          <Dialog>

            <DialogTrigger asChild>
            <Button size="icon" variant="ghost">
             Report
            </Button>
            </DialogTrigger>
            <ReportModal />
            </Dialog>
          </div>
          <div>
            <Dialog key="1">
              <DialogTrigger asChild>
                <Button size="icon" variant="ghost">
                  {/* <ClockIcon className="h-6 w-6" /> */}
                  History
                </Button>
              </DialogTrigger>
              <StudentHistory />
            </Dialog>
          </div>
        </div>
        <div className="flex items-center justify-center space-x-1 md:space-x-6 text-black">
          {/* <Toggle aria-label="Toggle dark mode">
            <MoonIcon className="h-6 w-6" />
          </Toggle> */}

          <Dialog key="">
            <DialogTrigger asChild>
              <Button size="icon" variant="ghost">
                <UserIcon className="h-6 w-6" />
              </Button>
            </DialogTrigger>
            <StudentEditModal />
          </Dialog>

          {/* <Button size="icon" variant="ghost">
            <FileIcon className="h-6 w-6" />
          </Button> */}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="h-8 w-8 cursor-pointer">
                <AvatarImage src={user.image} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">

            <Link 
              href='/Application/Student/busifyLaws'
            > 


            
            
            <DropdownMenuItem className="cursor-pointer">
                <ScaleIcon className="mr-2 h-4 w-4" />
                <p>
                  Busify rules
                </p>
              </DropdownMenuItem>

              </Link>


              <DropdownMenuItem className="text-red-600 cursor-pointer">
                <LogOutIcon className="mr-2 h-4 w-4 text-red-600" />
                <p className="text-red-600" onClick={destroySession}>
                  Log Out
                </p>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}



function ScaleIcon(props) {
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
      <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
      <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
      <path d="M7 21h10" />
      <path d="M12 3v18" />
      <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
    </svg>
  )
}

function ClockIcon(props) {
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
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
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
  );
}

function BellIcon(props: SVGProps<SVGSVGElement>) {
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
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}

function LogOutIcon(props: SVGProps<SVGSVGElement>) {
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
  );
}

function UserIcon(props: SVGProps<SVGSVGElement>) {
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
  );
}
