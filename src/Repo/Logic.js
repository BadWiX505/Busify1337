import {getUserDefaultThings,getAvailableTimes,bookSeatOnNextAvailableBus, getStudentDetails, updateUser, getStudentHistory,getPendingBookingsByUserId, getStudentTicket, createStudentProblem, getStudentsReportsHistory} from '@/app/server/db';




export async function getUserDefault(idUser){
   const defaultUser = await getUserDefaultThings(idUser);
   return defaultUser;
}




export async function getAddressFromCoordinates(lat, lng) {
   const apiKey = 'AIzaSyAH-j0JYMyTZx3A5m0XXFnal0qnCVmKz9M'; // Replace with your own API key
   const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;

   try {
       const response = await fetch(apiUrl);
       const data = await response.json();

       if (data.status === 'OK') {
           // Extracting the formatted address from the response
           const address = data.results[0].formatted_address;
           return address;
       } else {
           throw new Error('Geocoding failed');
       }
   } catch (error) {
       console.error('Error fetching data:', error);
       return 'problem occured';
    }
}



export async function availableTimes(date){
  const AT = await getAvailableTimes(date);
  return AT;
}




export async function bookBus(booking){
   const res = await bookSeatOnNextAvailableBus(booking.depart_date, booking.depart_time, booking.id_User, booking.adress_lat, booking.adress_lng);

   return res;
}



export async function getStudentDetailsforStudent(userId){
   const Student = await getStudentDetails(userId);
   return Student;
}


export async function UpdateStudent(userId,newSt){
   const res = await updateUser(userId,newSt.lat,newSt.lng,newSt.time)
   return res;
}


export async function StudentBookingHistory(userId , offset , limit ){
   const historyData = await getStudentHistory(userId, offset, limit)
   return historyData;
}


export async function StudentBookingPending(userId){
    const historyPending = await  getPendingBookingsByUserId(userId);
  return historyPending;
}



export  async function StudentTicket(bookingId){
    const ticket = await getStudentTicket(bookingId);
    return ticket;
}


export async function newStudentProblem(idS,msg){
  const res = await createStudentProblem(idS,msg)
  return res;
}


export async function studentReportsHistory(idS){
  return await getStudentsReportsHistory(idS);
}