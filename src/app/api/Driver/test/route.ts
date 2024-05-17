import { getBookingCountsByTimeAndDate } from "@/app/server/db";


export async function GET(){
      //  const userId = 26;
      //  const res = await getBookingCountsByTimeAndDate(userId,"2024-05-17");
      //  console.log(res)

      function isCurrentMomentWithinTenMinutes(date, time) {
        // Parse date and time strings into Date objects
        const dateTimeString = `${date}T${time}`;
        const targetTime = new Date(dateTimeString);
        
        // Subtract 10 minutes from the target time
        const tenMinutesAgo = new Date(targetTime.getTime() - 10 * 60000); // 10 minutes in milliseconds
        
        // Get the current time
        const currentTime = new Date();
    
        // Compare current time with 10 minutes ago
        return currentTime >= tenMinutesAgo;
    }

    let res = isCurrentMomentWithinTenMinutes("2024-05-16","17:16");
     return Response.json(res);
}