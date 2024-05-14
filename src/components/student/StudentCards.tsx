import { useEffect, useState } from "react";
import StudentCard from "./StudentCard";
import StudentCardLoading from "./PendingLoadingCards";


 

export default function StudentCards(){
 
   const [pendingBookings,setPendingBookings] = useState([]);
   const [loading , setLoading] = useState(true);

   useEffect(()=>{
    if(pendingBookings.length>0)
   setLoading(false);
   },[pendingBookings])

   async function getAllPendingBookings(){
      const res = await fetch("/api/getPendingBookings");
      const resp = await res.json();
     setPendingBookings(resp);
   }

   useEffect(()=>{
    getAllPendingBookings();
   },[])
    
    return (
        <section className="bg-white py-12 px-1 md:px-8 lg:px-10">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-8 w-auto">Pending Bookings </h2>
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6">
        {loading && <StudentCardLoading /> }
        {loading &&  <StudentCardLoading/>}
        {loading &&  <StudentCardLoading/>}

         { !loading && pendingBookings.map((cardItem,index) =>  <StudentCard data={cardItem}  key={`studentCard_${index}`}/>)}
        
            </div>
            </div>
            </section>

    )
}