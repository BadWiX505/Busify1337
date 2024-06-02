"use client"

import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export default function SelectPage() {
  const [buses , setBuses] = useState([]);

  async function getBuses(){
    const res = await fetch('/api/Driver/getAvailableBuses');
    if(res.ok){
       const buses = await res.json();
       setBuses(buses);  
    }
  }


  useEffect(()=>{
      getBuses();
  },[])
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-12 md:py-16 lg:py-20">
      <div className="grid gap-8 md:gap-12 lg:gap-16">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Choose Your Bus</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-400">
            Select a bus for the available buses below . choose one and start your duties
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
       {
        buses && 
        buses.map(bus=>  
             
          <div className="group relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
            <img
              src={bus.image}
              alt="Bus 1"
              width={600}
              height={400}
              className="w-full h-60 object-cover object-center group-hover:scale-105 transition-transform"
            />
            <div className="p-4 bg-white dark:bg-gray-900">
              <h3 className="text-lg font-semibold">{bus.bus_Name}</h3>
              <p className="mt-2 text-gray-500 dark:text-gray-400">Bus Number: {bus.bus_Number}</p>
              <p className="mt-2 text-gray-500 dark:text-gray-400">Bus Capacity: {bus.bus_Capacity} seats</p>
              <Button size="sm" className="mt-4">
                Select
              </Button>
            </div>
          </div>

        )

        
       }
        
          
        </div>

      </div>
    </div>
  )
}