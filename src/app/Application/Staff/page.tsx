"use client"


import React from "react";
import UserGrowthTrend from "@/components/staff/Dashboard/UserGrowthTrend";
import DrivingHoursPerDriver from "@/components/staff//Dashboard/DrivingHoursPerDriver";
import MonthlyBookingPerDay from "@/components/staff/Dashboard/MonthlyBookingPerDay";





export default function Component() {
  return (




    <div className="grid min-h-screen w-full grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-4 lg:p-8">
        
        <DrivingHoursPerDriver />
      
      
        <UserGrowthTrend />
      
      
        <MonthlyBookingPerDay />


        
      
    </div>
  );
}