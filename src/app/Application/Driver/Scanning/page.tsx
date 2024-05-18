"use client"

import QrReaderCompo from "@/components/QR/qrReaderComponent";
import { Button } from "@/components/ui/button";
import { useState } from "react";


export default function QrScan() {
    const [key, setKey] = useState(0);

    const refreshQrReader = () => {
      setKey(prevKey => prevKey + 1);
    };

    

    return (
        <div key="1" className="flex flex-col h-screen">

            <main className="flex-1 grid grid-cols-1 md:grid-cols-1 gap-6 p-6 md:p-8">
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 md:p-8 flex flex-col items-center justify-center">
                    <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-4 w-full max-w-2xl">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-bold">Validate Student</h2>
                            <div className="flex items-center space-x-2">
                                <span className="text-gray-500 dark:text-gray-400 ml-auto">
                                    0/29 students validated
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center justify-center">
                            <div className="w-full h-full">
                                <QrReaderCompo key={key} />
                            </div>
                        </div>

                        <Button className="w-full" onClick={refreshQrReader}>
                            <QrCodeIcon className="mr-2 h-5 w-5" />
                            Refresh QR scanner
                        </Button>
                        <div className="mt-4 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-lg px-4 py-2 flex items-center justify-center">
                            <CheckIcon className="mr-2 h-5 w-5" />
                            You are validated to access the bus
                        </div>
                        <div className="mt-4 flex justify-end">
                            <Button className="bg-gray-900 text-white hover:bg-gray-800 focus:ring-gray-950 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus:ring-gray-300">
                                Confirm
                            </Button>
                        </div>
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