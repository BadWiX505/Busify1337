"use client"



import { Label } from "../ui/label";
import { Button } from "@/components/ui/button";
// import Modal from "react-modal";
import {
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  PopoverTrigger,
  PopoverContent,
  Popover,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "@radix-ui/react-icons";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import { SetStateAction, useEffect, useState } from "react";
import { LoadScript } from "@react-google-maps/api";
import GoogleMapsComponentModal from "../maps/GoogleMapsComponent";
import { getAddressFromCoordinates } from "@/Repo/Logic";

import {
  format,
  addDays,
  subDays,
  isBefore,
  isAfter,
  startOfDay,
} from "date-fns";
import { useToast } from "@/components/ui/use-toast"
import { Skeleton } from "../ui/skeleton";


type Address = {
  lat: number | null;
  lng: number | null;
};

interface Booking {
  id_User: string | null;
  depart_time: string | null;
  depart_date: string | null;
  adress_lat: number | null;
  adress_lng: number | null;
}


export default function StudentMain() {


  const [selectedDate, setSelectedDate] = useState(new Date());
  const [popoverOpen, setPopoverOpen] = useState(false); // State to manage popover visibility
  const [address, setadress] = useState<Address>({ lat: null, lng: null });
  const [realAdress, setRealAdress] = useState('choose your destination');
  const [availaibleTimes, setAvailaibleTimes] = useState([]);
  const [booking, setBooking] = useState<Booking>({ id_User: null, depart_time: null, depart_date: null, adress_lat: null, adress_lng: null })
  const [selectedTime, setSelectedTime] = useState(null);
  const [defaultTime, setDefaultTime] = useState(null);
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  // Function to handle the change of selected time
  const handleTimeChange = (value: SetStateAction<null>) => {
    setSelectedTime(value);
  };
  // Calculate the range of selectable dates
  const today = new Date();
  const minDate = subDays(today, 1); // Yesterday
  const maxDate = addDays(today, 7); // Today + 7 days

  // Function to check if a date is within the range
  const isSelectable = (date) => {
    return !isBefore(date, minDate) && !isAfter(date, maxDate);
  };

  // Modifier function to disable dates outside the range
  const modifiers = {
    disabled: (date) => !isSelectable(date),
  };






  // update current address using googlemap component by passing this function as a prop 
  const handleCurrentPositionChange = (position: Address) => {
    setadress(position);
  };






  useEffect(() => {
    setBooking(prevBooking => ({
      ...prevBooking,
      depart_time: selectedTime
    }));
  }, [selectedTime]);




  // update available times based on date changes
  useEffect(() => {
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(selectedDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    getAvailaibleTimes(formattedDate);
    setBooking(prevBooking => ({
      ...prevBooking,
      depart_date: formattedDate
    }));
  }, [selectedDate, defaultTime])




  // get Real adress using Geocoding api and update current destination of student 
  useEffect(() => {
    const getRealAddress = async () => {
      const realAdressFromGeo = await getAddressFromCoordinates(address.lat, address.lng);
      if (realAdressFromGeo)
        setRealAdress(realAdressFromGeo);
      else
        setRealAdress('Uknown Adress');
    }
    if (address.lat && address.lng)
      getRealAddress();

    setBooking(prevBooking => ({
      ...prevBooking,
      adress_lat: address.lat,
      adress_lng: address.lng
    }));
  }, [address])






  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setPopoverOpen(false); // Close the popover after selecting a date
  };




  const togglePopover = () => {
    setPopoverOpen(!popoverOpen);
  };



  // compare dates 
  function isDateToday(dateString: string | number | Date) {
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


  // filter future times only in case of the date is today
  function filterFutureTimes(availaibleTimes) {
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

  // getAvailable times according to date 
  async function getAvailaibleTimes(date: String) {

    const res2 = await fetch('/api/getAvailableTimes?date=' + date);
    const timesGroup = await res2.json();
    if (isDateToday(selectedDate)) {
      timesGroup.availaibleTimes = filterFutureTimes(timesGroup.availaibleTimes);
    }
    setAvailaibleTimes(timesGroup.availaibleTimes);
    const isTimeAvailable = timesGroup.availaibleTimes.some(item => item.time == defaultTime);

    if (!isTimeAvailable) {
      setSelectedTime(timesGroup.availaibleTimes[0].time);
    }
    else {
      setSelectedTime(defaultTime);
    }
    setLoading(false);
  }




  // get Student default adress after the page mounts for the first time
  useEffect(() => {

    async function getStudentDefaultTime() {
      // default time
      const res = await fetch('/api/getStudentDefault');
      const DE = await res.json();
      setDefaultTime(DE.defU.default_time);
    }

    getStudentDefaultTime();

  }, [])





  async function handleBookNowClick(e: any) {
    e.preventDefault();
    setLoading(true)
    try {
      const res = await fetch("/api/BookBus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json" // Specify the content type as JSON
        },
        body: JSON.stringify(booking) // Convert finalUser to JSON format
      });

      const response = await res.json();
      if (response.msg.status != 201)
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: response.msg.message,
        })

      else
        toast({
          style: { backgroundColor: "green", color: "white" },
          title: "Congratulations :)",
          description: response.msg.message,
        })
    }
    catch (err) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Try again. If you're still stuck, call the staff. .",
      })
    }finally{
      setLoading(false)
    }
  }



  return (
    <main className="bg-gray-100 py-11 px-0 md:px-8 lg:px-10">
      <div className="container mx-auto px-4">
        <div
          style={{
            backgroundImage:
              "linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)), url('https://img.freepik.com/free-vector/flat-polygonal-background_23-2148919305.jpg?w=826&t=st=1714900403~exp=1714901003~hmac=aca0f56a7bd17076ce6f50cba79a3e1907feb08285779afdc1c9fdb475d2babc')",
          }}
          className="bg-cover bg-no-repeat rounded-lg shadow-md p-8 md:p-12 lg:p-16 "
        >
          <h1 className="text-3xl font-bold mb-4">Book your Seat</h1>
          <p className="text-gray-600 mb-8">
            Search for bus tickets and plan your journey.
          </p>
          <form className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {loading &&

              <div>
                <Skeleton className="h-10 w-full rounded-md" />
              </div>

            }

            {loading &&
              <div>
                <Skeleton className="h-10 w-full rounded-md" />
              </div>
            }

            {loading &&
              <div>
                <Skeleton className="h-10 w-full rounded-md" />
              </div>
            }




            {!loading &&
              <div>
                <Label htmlFor="destination">Destination</Label>
                <div className="w-full">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full text-left flex justify-between overflow-hidden"
                        title={realAdress}
                      >
                        <p>{realAdress}</p>
                        <div></div>
                      </Button>
                    </DialogTrigger>


                    <GoogleMapsComponentModal handleCurrentPositionChange={handleCurrentPositionChange} modalRole='STmain' />



                  </Dialog>


                </div>
              </div>
            }

            {!loading &&
              <div>
                <Label htmlFor="date">Travel Date</Label>
                <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      className="w-full flex items-center justify-between"
                      variant="outline"
                      onClick={togglePopover}
                    >
                      <span>
                        {selectedDate
                          ? format(selectedDate, "PPP")
                          : "Select date"}
                      </span>
                      <CalendarIcon className="w-5 h-5" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0">
                    <Calendar
                      mode="single"
                      onSelect={handleDateSelect}
                      modifiers={modifiers}
                      defaultValue={startOfDay(today)} // Default value should be today
                      minDate={minDate} // Limit selection from yesterday
                      maxDate={maxDate} // Limit selection to today + 7 days
                    />
                  </PopoverContent>
                </Popover>
              </div>
            }

            {!loading &&
              <div>
                <Label htmlFor="time">Departure Time</Label>
                <Select onValueChange={handleTimeChange} value={selectedTime}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {availaibleTimes.map(AVtime => <SelectItem value={AVtime.time} key={AVtime.id} >{AVtime.time}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            }

            {loading &&
              <div>
                <Skeleton className="col-span-1 md:col-span-3" />
              </div>
            }

            {!loading &&
              <Button
                className="col-span-1 md:col-span-3"
                onClick={handleBookNowClick}
              >
                Book now
              </Button>
            }


          </form>
        </div>
      </div>
    </main >

  )
}