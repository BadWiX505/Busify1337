"use client"

import QrReaderCompo from "@/components/QR/qrReaderComponent";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose } from "@/components/ui/dialog";
import { DialogContent, DialogTrigger } from "@radix-ui/react-dialog";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import Loader from "@/components/ui/loader";



export default function QrScan() {
    const [key, setKey] = useState(0);
    const [studentCounts, setCounts] = useState({ completed: 0, total: 0 })
    const params = useSearchParams();
    const [SCstatus, setSCstatus] = useState("checking");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isRendered, setIsRendered] = useState(false)
    const {toast} = useToast();
    const [loading , setLoading] = useState(false);
    const [readerPlaying, setReaderPlaying] = useState(true)
    const router = useRouter();
    const [readedData , setReadedData] = useState(null);

    const refreshQrReader = () => {
        setKey(prevKey => prevKey + 1);
    };



    // function validateJsonString(jsonString: string) {
    //     // Define the expected structure
    //     const expectedStructure = {
    //         full_name: "string",
    //         image: "string",
    //         bus_Name: "string",
    //         depart_Date: "string",
    //         depart_Time: "string",
    //         idBooking: "number"
    //     };

    //     // Try to parse the JSON string
    //     let obj;
    //     try {
    //         obj = JSON.parse(jsonString);
    //     } catch (e) {
    //         return false; // Invalid JSON string
    //     }

    //     // Check if obj is an object
    //     if (typeof obj !== 'object' || obj === null) {
    //         return false;
    //     }

    //     // Validate the structure
    //     for (let key in expectedStructure) {
    //         if (!obj.hasOwnProperty(key) || typeof obj[key] !== expectedStructure[key]) {
    //             return false;
    //         }
    //     }

    //     return true;
    // }

     useEffect(()=>{
        if(readedData){
        setReaderPlaying(false);
        }
     },[readedData])



    async function checkTicket(ticket) {
        const res = await fetch("/api/Driver/validateStudent?idBooking=" + ticket);
        const resp = await res.json();
        return resp;
    }

    // async function validateCode(code: string) {
    //     if (validateJsonString(code)) {

    //         const ticket = JSON.parse(code);


    //         const res = await checkTicket(ticket);
    //         if (res) {

    //             setSCstatus("validated");

    //             setCounts(prev => ({
    //                 ...prev,
    //                 completed: prev.completed + 1 // Correctly incrementing the completed count
    //             }));

    //         }

    //         else
    //             setSCstatus("danger");

    //     }
    //     else {
    //         setSCstatus("danger");
    //     }
    // }


    function SCchanged(data: any) {
        if(data){
        
        setSCstatus("validating");
        setTimeout(() => {
            setSCstatus("checking")
        }, 3000)
       }
    }

    async function getCounts() {
        const res = await fetch(`/api/Driver/scanningCounts?idDuty=`+(params.get('idDuty') ? params.get('idDuty') : null ));
        const counts = await res.json();
        setCounts(counts);
    }

    useEffect(() => {
        setIsRendered(true);
        getCounts();
    }, [])



    async function confirmDuty(){
        setIsDialogOpen(false);
        setLoading(true);
        try{
      const res  = await fetch('/api/Driver/confirmToDriving?idDuty='+params.get("idDuty"));
      const resp = await res.json();
      if(resp){
        router.push("/Application/Driver");
       
      }
      else {
        console.log("problema");
        toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "try again !",
          })
      }
    }
    catch(err){
        console.log(err);
        toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "try again !",
          })
    }
    }


    return (
        <div key="1" className="flex flex-col h-screen">
               {loading && <Loader/>}
            <main className="flex-1 grid grid-cols-1 md:grid-cols-1 gap-6 p-6 md:p-8">
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 md:p-8 flex flex-col items-center justify-center">
                    <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-4 w-full max-w-2xl">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-bold">Validate Student</h2>
                            <div className="flex items-center space-x-2">
                                <span className="text-gray-500 dark:text-gray-400 ml-auto">
                                    {studentCounts.completed}/{studentCounts.total} students validated
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center justify-center">
                            <div className="w-full h-full">
                                <QrReaderCompo key={key} SCchanged={SCchanged} isPlaying={readerPlaying}/>
                            </div>
                        </div>

                        <Button className="w-full" onClick={refreshQrReader}>
                            <QrCodeIcon className="mr-2 h-5 w-5" />
                            Refresh QR scanner
                        </Button>

                        {SCstatus === "checking" &&
                            <div className="mt-4 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-lg px-4 py-2 flex items-center justify-center animate-pulse">
                                <LoaderIcon className="mr-2 h-5 w-5 animate-spin" />
                                waiting for a code ...
                            </div>

                        }


                        {SCstatus === "validating" &&
                            <div className="mt-4 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-lg px-4 py-2 flex items-center justify-center animate-pulse">
                                <LoaderIcon className="mr-2 h-5 w-5 animate-spin" />
                                validating ...
                            </div>

                        }


                        {SCstatus === "validated" &&

                            <div className="mt-4 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-lg px-4 py-2 flex items-center justify-center">
                                <CheckIcon className="mr-2 h-5 w-5" />
                                Student is validated to access the bus
                            </div>

                        }


                        {SCstatus === "danger" &&

                            <div className="mt-4 rounded-lg bg-red-100 px-4 py-2 text-red-800 dark:bg-red-900 dark:text-red-200 flex items-center justify-center">
                                <XIcon className="mr-2 h-5 w-5" />
                                Ticket is expired or code is invalid

                            </div>

                        }



                  {isRendered && (
                        <div className="mt-4 flex justify-end">
                            <Dialog>

                                <DialogTrigger>
                                    <Button className="bg-gray-900 text-white hover:bg-gray-800 focus:ring-gray-950 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus:ring-gray-300" onClick={()=>setIsDialogOpen(true)}>
                                        Confirm
                                    </Button>
                                </DialogTrigger>
                                {isDialogOpen && (

                                <DialogContent>
                                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                                        <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-gray-900">
                                            <div className="space-y-4">
                                                <h3 className="text-xl font-bold">Confirm Action</h3>
                                                <p className="text-gray-500 dark:text-gray-400">
                                                    Are you sure you want to confirm and start the journey ?
                                                </p>
                                                <div className="flex justify-end gap-2">
                                                    <DialogClose>
                                                    <Button variant="outline" onClick={()=>setIsDialogOpen(false)} >Cancel</Button>
                                                    </DialogClose>
                                                    <Button onClick={confirmDuty}>Confirm</Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </DialogContent>
                                          )}

                            </Dialog>
                        </div>
                          )}
                    </div>
                </div>
            </main>
            <footer className="bg-gray-900 text-white py-4 px-6 md:py-6 md:px-8 flex justify-end" />
        </div>
    );
}

function CheckIcon(props) {
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
            <path d="M20 6 9 17l-5-5" />
        </svg>
    );
}


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

function XIcon(props) {
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
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
        </svg>
    )
}

function LoaderIcon(props) {
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
            <line x1="12" x2="12" y1="2" y2="6" />
            <line x1="12" x2="12" y1="18" y2="22" />
            <line x1="4.93" x2="7.76" y1="4.93" y2="7.76" />
            <line x1="16.24" x2="19.07" y1="16.24" y2="19.07" />
            <line x1="2" x2="6" y1="12" y2="12" />
            <line x1="18" x2="22" y1="12" y2="12" />
            <line x1="4.93" x2="7.76" y1="19.07" y2="16.24" />
            <line x1="16.24" x2="19.07" y1="7.76" y2="4.93" />
        </svg>
    )
}

function QrCodeIcon(props) {
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
            <rect width="5" height="5" x="3" y="3" rx="1" />
            <rect width="5" height="5" x="16" y="3" rx="1" />
            <rect width="5" height="5" x="3" y="16" rx="1" />
            <path d="M21 16h-3a2 2 0 0 0-2 2v3" />
            <path d="M21 21v.01" />
            <path d="M12 7v3a2 2 0 0 1-2 2H7" />
            <path d="M3 12h.01" />
            <path d="M12 3h.01" />
            <path d="M12 16v.01" />
            <path d="M16 12h1" />
            <path d="M21 12v.01" />
            <path d="M12 21v-1" />
        </svg>
    );
}