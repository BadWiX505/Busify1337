import {checkUserExistance,getUserRole,createUserAndKey} from '@/app/server/db';



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
   const role = await getUserRole(userkey);
   return role;
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