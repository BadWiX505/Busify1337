import {checkUserExistance,getUserRole,createUserAndKey,getUserDefaultThings,getAvailableTimes,bookSeatOnNextAvailableBus, getStudentDetails, updateUser, getStudentHistory,getPendingBookingsByUserId, getStudentTicket} from '@/app/server/db';



export function checkUserExistenceInLocalDB(userData) {
       
    return true;  
}

export async function createUserLogic(userInfo){
   const res = await createUserAndKey(userInfo)
   if(res)
      return true;
   else
   return false
}

export async function checkAuth(user){
   if(user){
      const isExsist = await checkUserExistance(user);
      // if(isExsist){
      //    const role = await
      // }
   }
   return false;
}


export async function getRole(userkey){
   const user = await getUserRole(userkey);
   return user;
}



export async function getUserDefault(idUser){
   const defaultUser = await getUserDefaultThings(idUser);
   return defaultUser;
}


// export async function door(){
//    const session = await getServerSession(authOptions);
   
//    if(!session){
//      redirect('/login');
//    }
//    else{
//       // if()
//    }
// }





export async function getAddressFromCoordinates(lat, lng) {
   const apiKey = 'AIzaSyDCzTRvG0nBe5vmD0j74U1Bsz7rvRCeD34'; // Replace with your own API key
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
       return null;
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
   const res = await updateUser(userId,newSt.address.lat,newSt.address.lng,newSt.time)
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