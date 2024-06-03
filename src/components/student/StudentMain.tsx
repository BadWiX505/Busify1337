"use client";

import { Label } from "../ui/label";
import { Button } from "@/components/ui/button";
// import Modal from "react-modal";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

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
  SelectGroup,
  SelectLabel,
  SelectSeparator,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
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
import { useToast } from "@/components/ui/use-toast";
import { Skeleton } from "../ui/skeleton";
import { filterFutureTimes, isDateToday } from "@/utils/dateUtils";
import { Card, CardContent } from "../ui/card";
import BookingConfirmation from "./bookingConfirmation";

type Address = {
  lat: number | null;
  lng: number | null;
};

interface Booking {
  depart_time: string | null;
  depart_date: string | null;
  adress_lat: number | null;
  adress_lng: number | null;
}

export default function StudentMain() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [popoverOpen, setPopoverOpen] = useState(false); // State to manage popover visibility
  const [address, setadress] = useState<Address>({ lat: null, lng: null });
  const [realAdress, setRealAdress] = useState("choose your destination");
  const [availaibleTimes, setAvailaibleTimes] = useState([]);
  const [booking, setBooking] = useState<Booking>({
    depart_time: null,
    depart_date: null,
    adress_lat: null,
    adress_lng: null,
  });
  const [selectedTime, setSelectedTime] = useState(null);
  const [defaultTime, setDefaultTime] = useState(null);
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);

  //////// handlers /////////////

  // Function to handle the change of selected time
  const handleTimeChange = (value: string | null) => {
    setSelectedTime(value);
  };

  // update current address using googlemap component by passing this function as a prop
  const handleCurrentPositionChange = (position: Address) => {
    setadress(position);
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setPopoverOpen(false); // Close the popover after selecting a date
  };

  /////////////  End Heandlers ///////////////

  //// date settings //////////
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

  ///////////// END date Settings //////////

  /////// useEffects ///////////////////

  useEffect(() => {
    setBooking((prevBooking) => ({
      ...prevBooking,
      depart_time: selectedTime,
    }));
  }, [selectedTime]);

  // update available times based on date changes
  useEffect(() => {
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(selectedDate.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    getAvailaibleTimes(formattedDate);
    setBooking((prevBooking) => ({
      ...prevBooking,
      depart_date: formattedDate,
    }));
  }, [selectedDate, defaultTime]);

  // get Real adress using Geocoding api and update current destination of student
  useEffect(() => {
    if (address.lat && address.lng) getRealAddress();

    setBooking((prevBooking) => ({
      ...prevBooking,
      adress_lat: address.lat,
      adress_lng: address.lng,
    }));
  }, [address]);

  // get Student default adress after the page mounts for the first time
  useEffect(() => {
    async function getStudentDefaultTime() {
      // default time
      const res = await fetch("/api/Student/getStudentDefault");
      const DE = await res.json();
      setDefaultTime(DE.defU.default_time);
    }

    getStudentDefaultTime();
  }, []);

  ////// END useEffect ////////////

  //// asyncs ////////////////

  const getRealAddress = async () => {
    const realAdressFromGeo = await getAddressFromCoordinates(
      address.lat,
      address.lng
    );
    if (realAdressFromGeo) setRealAdress(realAdressFromGeo);
    else setRealAdress("Uknown Adress");
  };

  // getAvailable times according to date
  async function getAvailaibleTimes(date: String) {
    const res2 = await fetch("/api/Student/getAvailableTimes?date=" + date);
    const timesGroup = await res2.json();
    if (isDateToday(selectedDate)) {
      timesGroup.availaibleTimes = filterFutureTimes(
        timesGroup.availaibleTimes
      );
    }
    setAvailaibleTimes(timesGroup.availaibleTimes);
    const isDefaultTimeAvailable = timesGroup.availaibleTimes.some(
      (item) => item.time == defaultTime
    );

    if (!isDefaultTimeAvailable) {
      if (timesGroup.availaibleTimes.length > 0)
        setSelectedTime(timesGroup.availaibleTimes[0].time);
    } else {
      setSelectedTime(defaultTime);
    }
    setLoading(false);
  }

  async function handleBookNowClick(e: any) {
    e.preventDefault();
  }


  async function book(){
    setLoading(true);
    try {
      const res = await fetch("/api/Student/BookBus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Specify the content type as JSON
        },
        body: JSON.stringify(booking), // Convert finalUser to JSON format
      });

      const response = await res.json();
      if (response.msg.status != 201)
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: response.msg.message,
        });
      else
        toast({
          variant: "success",
          title: "Successfully booking",
          description: response.msg.message,
        });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Try again. If you're still stuck, call the staff. .",
      });
    } finally {
      setLoading(false);
    }
  }
  /////////// end of asyncs//////////////

  ///// other functions //////////////
  const togglePopover = () => {
    setPopoverOpen(!popoverOpen);
  };

  ////////////////////// End other functions //////////

  return (
    <>
      <section className="w-full h-[800px] lg:h-[490px] md:h-[650px] sm:h-[700px] relative z-2">
        {/* py-12 md:pt-24 lg:pt-32 */}
        <div className="container px-4 md:px-6 mt-16">
          <div className="flex flex-col lg:flex-row justify-around items-top ">
            <div className="w-full lg:text-left lg:w-[50%] mb-8 lg:mb-0 md:text-center sm:text-center">
              <h1 className="text-4xl lg:text-6xl mb-4 text-[#333] mt-10 font-bold leading-normal ">
                A Convenient Ride, Just a Tap Away with{" "}
                <span className="text-green-500">Busify</span>
              </h1>
              <p className="text-sm lg:text-base text-[#555] font-normal font-sans md:text-center sm:text-center lg:text-left ">
                Book your seat hassle-free. Enjoy a comfortable journey every
                time, tailored to your schedule and preferences.
              </p>
              {/* <p className="lg:text-base   text-[#3dff64] font-bold font-sans">
                1337
              </p> */}
            </div>
            <Card className="relative w-full lg:w-[40%] lg:mb-48 max-w-[700px] bg-url[/img/big]">
              <CardContent className="p-6 space-y-4">
                <form className="grid gap-4">
                  <h1 className="text-center font-bold border-b-2 border-gray-100 pb-2">
                    BOOK YOUR SEAT
                  </h1>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="destination">Time</Label>
                      {loading && (
                        <div>
                          <Skeleton className="h-10 w-full rounded-md" />
                        </div>
                      )}

                      {!loading && (
                        <Select
                          onValueChange={handleTimeChange}
                          value={selectedTime}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                          <SelectContent>
                            {availaibleTimes.map((AVtime) => (
                              <SelectItem value={AVtime.time} key={AVtime.id}>
                                {AVtime.time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="date">Date</Label>

                      {loading && (
                        <div>
                          <Skeleton className="h-10 w-full rounded-md" />
                        </div>
                      )}

                      {!loading && (
                        <Popover
                          open={popoverOpen}
                          onOpenChange={setPopoverOpen}
                        >
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
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Destination</Label>
                    {loading && (
                      <div>
                        <Skeleton className="h-10 w-full rounded-md" />
                      </div>
                    )}

                    {!loading && (
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

                        <GoogleMapsComponentModal
                          handleCurrentPositionChange={
                            handleCurrentPositionChange
                          }
                          modalRole="STmain"
                        />
                      </Dialog>
                    )}
                  </div>

                  {loading && (
                    <div>
                      <Skeleton className="h-10 w-full rounded-md" />
                    </div>
                  )}

                  {!loading && (
                    <Dialog>
                      <DialogTrigger>
                    <Button
                      className="w-full"
                      type="submit"
                      onClick={handleBookNowClick}
                    >
                      Book Now
                    </Button>
                    </DialogTrigger>
                    <BookingConfirmation  confirmFunction={book}/>
                    </Dialog>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <div>
        <svg
          className="block w-full fill-color-static-white-canvas"
          style={{ height: "min(48px, 3.3333333333333335vw)" }}
          viewBox="0 0 1440 72"
          fill="none"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 59.6698V72H1440L1379.96 61.8656C1319.92 51.7312 1199.83 31.4624 1079.75 19.3011C959.666 7.13978 839.583 3.08601 719.5 1.05913C599.416 -0.967751 479.333 -0.967751 359.249 9.16666C239.166 19.3011 119.083 39.5699 59.041 49.7043L0 59.6698Z"></path>
        </svg>
      </div>
    </>
  );
}

function CalendarDaysIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 18h.01" />
      <path d="M12 18h.01" />
      <path d="M16 18h.01" />
    </svg>
  );
}

/*


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
import { useEffect, useState } from "react";
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
import { filterFutureTimes, isDateToday } from "@/utils/dateUtils";


type Address = {
  lat: number | null;
  lng: number | null;
};

interface Booking {
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
  const [booking, setBooking] = useState<Booking>({depart_time: null, depart_date: null, adress_lat: null, adress_lng: null })
  const [selectedTime, setSelectedTime] = useState(null);
  const [defaultTime, setDefaultTime] = useState(null);
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);


  //////// handlers /////////////

  // Function to handle the change of selected time
  const handleTimeChange = (value: string | null) => {
    setSelectedTime(value);
  };

   // update current address using googlemap component by passing this function as a prop 
   const handleCurrentPositionChange = (position: Address) => {
    setadress(position);
  };


  
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setPopoverOpen(false); // Close the popover after selecting a date
  };


/////////////  End Heandlers ///////////////


//// date settings //////////
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


  ///////////// END date Settings //////////





/////// useEffects ///////////////////



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
    if (address.lat && address.lng)
      getRealAddress();

    setBooking(prevBooking => ({
      ...prevBooking,
      adress_lat: address.lat,
      adress_lng: address.lng
    }));
  }, [address])




   // get Student default adress after the page mounts for the first time
   useEffect(() => {

    async function getStudentDefaultTime() {
      // default time
      const res = await fetch('/api/Student/getStudentDefault');
      const DE = await res.json();
      setDefaultTime(DE.defU.default_time);
    }

    getStudentDefaultTime();

  }, [])







////// END useEffect ////////////




//// asyncs ////////////////

const getRealAddress = async () => {
  const realAdressFromGeo = await getAddressFromCoordinates(address.lat, address.lng);
  if (realAdressFromGeo)
    setRealAdress(realAdressFromGeo);
  else
    setRealAdress('Uknown Adress');
}



// getAvailable times according to date 
async function getAvailaibleTimes(date: String) {

  const res2 = await fetch('/api/Student/getAvailableTimes?date=' + date);
  const timesGroup = await res2.json();
  if (isDateToday(selectedDate)) {
    timesGroup.availaibleTimes = filterFutureTimes(timesGroup.availaibleTimes);
  }
  setAvailaibleTimes(timesGroup.availaibleTimes);
  const isDefaultTimeAvailable = timesGroup.availaibleTimes.some(item => item.time == defaultTime);

  if (!isDefaultTimeAvailable) {
    if(timesGroup.availaibleTimes.length>0)
    setSelectedTime(timesGroup.availaibleTimes[0].time);
  }
  else {
    setSelectedTime(defaultTime);
  }
  setLoading(false);
}




  
async function handleBookNowClick(e: any) {
  e.preventDefault();
  setLoading(true)
  try {
    const res = await fetch("/api/Student/BookBus", {
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
        variant : "success",
        title: "Successfully booking",
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









/////////// end of asyncs//////////////

 














///// other functions //////////////
  const togglePopover = () => {
    setPopoverOpen(!popoverOpen);
  };


  ////////////////////// End other functions //////////

  

  




  return (
    <main className="py-11 px-0 md:px-8 lg:px-10">
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


*/
