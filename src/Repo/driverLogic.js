
import {getBookingCountsByTimeAndDate, getBookingsDetails, getCountsForScanning, confirmDuty, createIssue, getDutyPropertiesFronId, createReport, updateBookingStatus , updateDutyStatusUsingId}   from '@/app/server/db';



export async function getDutiesTimes(userId,date){
   const res = await getBookingCountsByTimeAndDate(userId,date);
   return res;
}


export async function bookingsDetails(busId,time,date,limit,offset,bookingStatus){
    const res = await  getBookingsDetails(busId,time,date,limit,offset,bookingStatus);
    return res;
}


export async function scanningCounts(date,time,busId){
  const counts = await getCountsForScanning(date,time,busId);
  return counts;
}


export async function BookingStatusUpdate(idBooking,newValue,theWHere){
    const res = await updateBookingStatus(idBooking,newValue,theWHere);
    return res;
}



export async function dutyConfirm(idDuty,userId){
  const res = await confirmDuty(idDuty,userId);
  return res;
}


export async function reportIssue(idDriver,issueType,idBus){
    const res = await createIssue(idDriver,issueType,idBus)
    return res;
}



export async function dutyPropsFromId(idDuty){
  try{
    const duty = await getDutyPropertiesFronId(idDuty);
    return duty;
  }
  catch(err){
    return null;
  }
}



export async function reportStudent(reporterId,sudentId,reason,comment,busId){
  try{
    const res = await createReport(reporterId,sudentId,reason,comment,'active',busId);
    return res;
  }
  catch(err){
    return null;
  }

}



export async function completeDuty(idDuty){
  const res = await updateDutyStatusUsingId(idDuty,'Completed');
  return res;
}