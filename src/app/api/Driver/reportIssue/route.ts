import { reportIssue } from "@/Repo/driverLogic";
import { validateRequest } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req:NextRequest) {
  try {

    const {user} = await validateRequest();
    if(user && user.role==='driver' && user.busId && user.status==='active'){
    const reportPayload = await req.json();

    console.log("Received payload:", reportPayload);

    // Validate required fields
    const { issueType} = reportPayload;
    if (!issueType || !user.idUser) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const issue = await reportIssue(user.idUser,issueType,user.busId);
    if(issue){
    return NextResponse.json(issue, { status: 201 });
    }
    else{
        return NextResponse.json(false, { status: 500 });  
    }
  }

  
  else{
    return NextResponse.json("Unauthorized", { status: 401 });  
  }


  } catch (error) {
    console.error("Error creating report:", error);
    return NextResponse.json("something went wrong",{ status: 500 }
    );
  }

}




// function getDistanceFromLatLonInMeters(lat1, lon1, lat2, lon2) {
//   const R = 6371000; // Radius of the earth in meters
//   const dLat = (lat2 - lat1) * Math.PI / 180;
//   const dLon = (lon2 - lon1) * Math.PI / 180;
//   const a = 
//       Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//       Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
//       Math.sin(dLon / 2) * Math.sin(dLon / 2);
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   const distance = R * c; // Distance in meters
//   return distance;
// }

// function groupCoordinates(coordinates, maxDistance = 50) {
//   const groups = []; // Array to hold groups of coordinates
//   const used = new Array(coordinates.length).fill(false); // Track if a coordinate has been grouped

//   for (let i = 0; i < coordinates.length; i++) {
//       if (used[i]) continue; // Skip if already grouped
//       const group = []; // Array to hold the current group
//       const queue = [i]; // Queue for BFS

//       while (queue.length) {
//           const idx = queue.shift(); // Get the next index from the queue
//           if (used[idx]) continue; // Skip if already processed
//           used[idx] = true; // Mark as processed
//           group.push(coordinates[idx]); // Add to current group

//           for (let j = 0; j < coordinates.length; j++) {
//               if (used[j]) continue; // Skip if already processed
//               const distance = getDistanceFromLatLonInMeters(
//                   coordinates[idx].lat,
//                   coordinates[idx].lng,
//                   coordinates[j].lat,
//                   coordinates[j].lng
//               );
//               if (distance <= maxDistance) {
//                   queue.push(j); // Add to queue if within maxDistance
//               }
//           }
//       }

//       groups.push(group); // Add the current group to groups array
//   }

//   return groups; // Return the grouped coordinates
// }