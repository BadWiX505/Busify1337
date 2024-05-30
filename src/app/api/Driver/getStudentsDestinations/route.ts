import { bookingsDetails, dutyPropsFromId } from "@/Repo/driverLogic";
import { validateRequest } from "@/lib/auth";
import { NextRequest } from "next/server";


export async function GET(request : NextRequest){
  
  

     const {user}  = await validateRequest();
     try{
      if(user && user.role==='driver' && user.busId){
      const  params = request.nextUrl.searchParams;

        if(params && params.get("idDuty")){
            const idDuty = parseInt(params.get("idDuty"));
            const dutyProperties = await dutyPropsFromId(idDuty);
            if(dutyProperties && dutyProperties.duty_Status ==='Driving'){
                const  usersAndCoordinates= await bookingsDetails(user.busId,dutyProperties.duty_Time,dutyProperties.duty_Date,2000,0,'Checked');
                console.log(usersAndCoordinates)
                if(usersAndCoordinates){
                  const groupedUserandCoordinates = groupCoordinates(usersAndCoordinates);
                 return Response.json(groupedUserandCoordinates)
                }
            }
            else{
               return  Response.json('there is no duties with this ID',{status : 500});
            }
        }
        else{
            return Response.json('request needs prameters', {status : 500})
        }
      }
      else{
        return Response.json('Unauthorized', {status : 401})
      }
    }
    catch(err){
      return Response.json('a problem occuered',{status : 500});
    }
 
}


function getDistanceFromLatLonInMeters(lat1, lon1, lat2, lon2) {
  const R = 6371000; // Radius of the earth in meters
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in meters
  return distance;
}


function groupCoordinates(coordinates, maxDistance = 50) {
    const groups = []; // Array to hold groups of coordinates
    const used = new Array(coordinates.length).fill(false); // Track if a coordinate has been grouped
  
    for (let i = 0; i < coordinates.length; i++) {
        if (used[i]) continue; // Skip if already grouped
        const group = { users: [], Adress_lnt: null, Adress_lng: null }; // Initialize group
        const queue = [i]; // Queue for BFS
        let coordAdded = false; // Flag to ensure we add the coordinate only once
  
        while (queue.length) {
            const idx = queue.shift(); // Get the next index from the queue
            if (used[idx]) continue; // Skip if already processed
            used[idx] = true; // Mark as processed
  
            // Ensure users is an array before pushing
            if (coordinates[idx].user) {
                group.users.push({
                  ...coordinates[idx].user,
                  id_Booking: coordinates[idx].id_Booking // Include booking ID with user
                });
            } else {
                console.error(`Invalid user data at index ${idx}`);
            }
  
            // Add the coordinate if not already added
            if (!coordAdded) {
                group.Adress_lnt = coordinates[idx].Adress_lnt;
                group.Adress_lng = coordinates[idx].Adress_lng;
                coordAdded = true;
            }
  
            // Check nearby coordinates
            for (let j = 0; j < coordinates.length; j++) {
                if (used[j]) continue; // Skip if already processed
                const distance = getDistanceFromLatLonInMeters(
                    coordinates[idx].Adress_lnt,
                    coordinates[idx].Adress_lng,
                    coordinates[j].Adress_lnt,
                    coordinates[j].Adress_lng
                );
                if (distance <= maxDistance) {
                    queue.push(j); // Add to queue if within maxDistance
                }
            }
        }
  
        groups.push(group); // Add the current group to groups array
    }
  
    return groups; // Return the grouped coordinates
  }