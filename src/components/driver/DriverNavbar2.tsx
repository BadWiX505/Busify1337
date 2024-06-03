"use client";
import { useState } from "react";
import {
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  PopoverTrigger,
  PopoverContent,
  Popover,
} from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";
import DriverProfileModel from "@/components/driver/DriverProfile";
import { useRouter } from "next/navigation";
import ConfirmationDialogForLeavingBus from "./confirmationDialog";

export default function DriverNavbar2({driverInfo}) {
  const { toast } = useToast();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
   const [leavingBusConfirmation, setLeavingBusConf] = useState(false); 

  
  const router = useRouter();

  async function destroySession() {
      const resp = await fetch('/api/destroySession');
      const res = await resp.json();
      if(res)
        router.push('/login')
    }


  function handleAccount() {
    setProfileModalOpen(true);
  }

  function handleCloseProfileModal() {
    setProfileModalOpen(false);
  }

  async function handleReport(event, issueType) {
    event.preventDefault();
    setDropdownOpen(false);
    const reportPayload = {issueType};

    try {
      const response = await fetch("/api/Driver/reportIssue", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reportPayload),
      });

      if (!response.ok) {
        const errorMessage = `Error: ${response.status} ${response.statusText}`;
        console.error(errorMessage);
        throw new Error(errorMessage);
      }
      const data = await response.json();

      toast({
        variant: "success",
        title: "Report Submitted",
        description: "The report has been submitted successfully.",
      });

    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }
  }

  
  return (
    <header className="w-full bg-white shadow-md dark:bg-gray-900 dark:text-white">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="hidden md:inline-flex items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-full">
              <DollarSignIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </div>
            <div>
              <p className="font-semibold">$234.56</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Total Earnings
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-full">
              <ClockIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </div>
            <div>
              <p className="font-semibold">20 hrs</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Total Hours Worked
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {driverInfo.busId &&
          <DropdownMenu open={isDropdownOpen} onOpenChange={setDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <Button
                className="flex items-center gap-2 bg-red-600 hover:bg-red-900"
                variant="outline"
              >
                <AccidentIcon color="white" className="h-4 w-4 mr-2 " />
                <span className="text-white">Report an issue</span>
                <ChevronDownIcon color="white" className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-55 p-2">
              <DropdownMenuItem>
                <div
                  onClick={(event) => handleReport(event, "accident")}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <AccidentIcon color="red" className="h-4 w-4" />
                  <div>
                    <p className="font-medium">Accident</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Collisions, rollovers, and other accidents
                    </p>
                  </div>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div
                  onClick={(event) => handleReport(event, "breakdown")}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <WrenchIcon color="orange" className="h-5 w-5" />
                  <div>
                    <p className="font-medium">Mechanical Failures</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Engine problems, tire blowouts, and other mechanical
                      issues
                    </p>
                  </div>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
             }

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="hidden md:inline-flex items-center gap-2"
                variant="outline"
              >
                <UserIcon className="h-4 w-4 mr-2" />
                <span>Profile</span>
                <ChevronDownIcon className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 p-2">
              <DropdownMenuItem
                onClick={handleAccount}
                className="flex items-center gap-2"
              >
                <WrenchIcon className="h-4 w-4" />
                <span>Account</span>
              </DropdownMenuItem>

              {driverInfo.busId &&
              <DropdownMenuItem
                className="flex items-center gap-2 text-red-600 "
                onClick={()=>setLeavingBusConf(true)}
              >
                <BusIcon className="h-4 w-4 " />
                <span>Leave bus</span>
              </DropdownMenuItem>

              }
              
              <DropdownMenuItem className="flex items-center gap-2" onClick={destroySession}>
                <SignOutIcon className="h-4 w-4" />
                <span>Sign out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button className="md:hidden" size="icon" variant="ghost">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-4 w-64 bg-white shadow-lg dark:bg-gray-900">
            <div className="grid gap-4">
              <div
                onClick={handleAccount}
                className="flex items-center gap-2 cursor-pointer"
              >
                <WrenchIcon className="h-4 w-4" />
                <span>Account</span>
              </div>

              <div
                onClick={()=>setLeavingBusConf(true)}
                className="flex items-center gap-2 cursor-pointer text-red-600"
              >
                 <BusIcon className="h-4 w-4 " />
                <span>Leave bus</span>
              </div>



              <div className="flex items-center gap-2" onClick={destroySession}>
                <SignOutIcon className="h-4 w-5" />
                <span>Sign out</span>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      {isProfileModalOpen && (
        <DriverProfileModel
          open={isProfileModalOpen}
          handleCloseProfileModal={handleCloseProfileModal}
          driver={driverInfo}
        />
      )}

      {
        leavingBusConfirmation && (
          <ConfirmationDialogForLeavingBus 
           open={leavingBusConfirmation}
           onClose={()=>setLeavingBusConf(false)}
          />
        )
      }
    </header>
  );
}

// Icons




function BusIcon(props) {
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
      <path d="M8 6v6" />
      <path d="M15 6v6" />
      <path d="M2 12h19.6" />
      <path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3" />
      <circle cx="7" cy="18" r="2" />
      <path d="M9 18h5" />
      <circle cx="16" cy="18" r="2" />
    </svg>
  )
}


function AccidentIcon(props) {
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
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"></path>
      <line x1="12" y1="9" x2="12" y2="13"></line>
      <line x1="12" y1="17" x2="12.01" y2="17"></line>
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
      <line x1="16" x2="8" y1="13" y2="13" />
      <line x1="16" x2="8" y1="17" y2="17" />
      <line x1="10" x2="8" y1="9" y2="9" />
    </svg>
  );
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
  );
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
  );
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
  );
}

function WrenchIcon(props) {
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
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  );
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

function DollarSignIcon(props) {
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
      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

function SignOutIcon(props) {
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
