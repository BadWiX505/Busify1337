
import {getDriverInfo,getBookingCountsByTimeAndDate, getBookingsDetails}   from '@/app/server/db';


export async function driverInfo(userId){
  const res = await getDriverInfo(userId);
  return res;
}


export async function getDutiesTimes(userId,date){
   const res = await getBookingCountsByTimeAndDate(userId,date);
   return res;
}


export async function bookingsDetails(userId,time,date,limit,offset){
    const res = await  getBookingsDetails(userId,time,date,limit,offset);
    return res;
}