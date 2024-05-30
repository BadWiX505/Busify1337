import { getAlltravelTimes } from "@/app/server/db";

// filter future times only in case of the date is today
export function filterFutureTimes(availaibleTimes) {
    // Get the current hour and minute
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    // Filter the availaibleTimes array to keep only the times in the future
    const futureTimes = availaibleTimes.filter((timeObj) => {
      const [hour, minute] = timeObj.time.split(':').map(Number);

      // Check if the time is in the future compared to the current time
      if (hour > currentHour || (hour === currentHour && minute >= currentMinute)) {
        return true;
      }
      return false;
    });

    return futureTimes;
  }


  export function formatDateToModern(dateString: Date) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}


  export function isDateToday(dateString: string | number | Date) {
    // Parse the date string into a Date object
    const date = new Date(dateString);

    // Get today's date
    const today = new Date();

    // Compare the year, month, and day of the parsed date with today's date
    return (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate()
    );
  }




  export function formatDateTime(isoString : string | number | Date ) {
    const date = new Date(isoString);
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
    return date.toLocaleDateString(undefined, options);
  }



  export function isFutureDateTime(date : string, time:string) {
    // Combine the date and time into a single string and create a Date object
    const dateTimeString = `${date}T${time}:00`;
    const inputDateTime = new Date(dateTimeString);
  
    // Get the current date and time
    const currentDateTime = new Date();
  
    // Compare the input date and time with the current date and time
    return inputDateTime > currentDateTime;
  }


 export  async function isInTravelsTime(time:string) {
    const travelTimes = await getAlltravelTimes();
    return travelTimes.some((travelTime : any) => travelTime.time === time);
}


export function formatShortReadableDate(dateString: string) {
  const date = new Date(dateString);
  const options = { month: 'short', day: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-US', options);

  // Get time in HH:MM format from the date string
  const time = `${date.getHours()}:${(date.getMinutes() < 10 ? '0' : '') + date.getMinutes()}`;

  return `${formattedDate}, ${date.getFullYear()} ${time}`;
}
