"use client"

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Loader from '@/components/ui/loader';
import { getAddressFromCoordinates } from '@/Repo/Logic';
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { useToast } from '@/components/ui/use-toast';



import {
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog"
import GoogleMapsComponentModal from '@/components/maps/GoogleMapsComponent';

type Address = {
  lat: number | null;
  lng: number | null;
};

  export default function GetStartedUser() {

    
  const [address, setadress] = useState<Address>({ lat: null, lng: null });
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const router = useRouter();
  const { toast } = useToast();
  const [isloading, setIsLoading] = useState(false);
  const [realAdress, setRealAdress] = useState('choose your destination -->');
  const [times , setTimes]  = useState([]);
  



 //////////// handlers /////////////
 

  // Callback function to receive current position from child component
  const handleCurrentPositionChange = (position: Address) => {
    setadress(position);
  };

    // Function to handle the change of selected time
  const handleTimeChange = (value:string | null) => {
    setSelectedTime(value);
  };


  ///////////// handlers END ///////////////////////


  // async functions /////////////
  async function TIMES() {
      const res = await fetch('/api/Student/getTravelTimes');
      const times = await res.json();
      setTimes(times);
  }


  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
     const res = await fetch('/api/Student/updateStudentInfo',{
      method : 'POST',
      body : JSON.stringify({lat :address.lat,lng : address.lng , time : selectedTime})
     });
     const resp = await res.json()
      if(resp.result){
         router.push('/login')
      }
      else{
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: resp.message,
        })

      }
      setIsLoading(false)
  };

  
  const getRealAddress = async () => {
    const realAdressFromGeo = await getAddressFromCoordinates(address.lat, address.lng);
    if (realAdressFromGeo)
      setRealAdress(realAdressFromGeo);
    else
      setRealAdress('Uknown Adress');
  }

//////////////////// end Async functions /////////////////



  ///// useEffects ///////

  useEffect(()=>{
    if (address.lat && address.lng)
      getRealAddress();
  },[address])


  useEffect(()=>{
    TIMES();
  },[]);


  useEffect(()=>{
   console.log(selectedTime)
  },[selectedTime])


  ///////// useEffect ENd   ///////////////////////



    return (
      <section className="w-full py-12 md:py-14 lg:py-22 xl:py-38">
             {isloading &&  <Loader/> }
        <div className="container px-4 md:px-6 grid lg:grid-cols-2 gap-6 lg:gap-12">
          <div className="grid grid-cols-2 gap-4">
            <div className="relative group overflow-hidden rounded-xl">
              <Link className="absolute inset-0 z-10" href="#">
                <span className="sr-only">View</span>
              </Link>
              <img
                alt="Hero Image 2"
                src="/img/image_part_001.jpg"
                className="rounded-xl object-cover w-full h-full transition-transform duration-300 ease-in-out group-hover:-translate-y-2 group-hover:scale-105"
                height="310"
                style={{
                  aspectRatio: "310/310",
                  objectFit: "cover",
                }}
                width="310"
              />
            </div>
            <div className="relative group overflow-hidden rounded-xl">
              <Link className="absolute inset-0 z-10" href="#">
                <span className="sr-only">View</span>
              </Link>
              <img
                alt="Hero Image 1"
                src="/img/image_part_002.jpg"
                className="rounded-xl object-cover w-full h-full transition-transform duration-300 ease-in-out group-hover:-translate-y-2 group-hover:scale-105"
                height="310"
                style={{
                  aspectRatio: "310/310",
                  objectFit: "cover",
                }}
                width="310"
              />
            </div>
          </div>
          <div className="flex flex-col justify-center space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Get Started with <span className="text-[#A7E92F]">Busify</span>
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
              Select a default destination where you usually go to and a default time
              </p>
            </div>
            <form className="w-full max-w-sm space-y-4" onSubmit={submitForm}>
              <div className="space-y-2">
                <Label htmlFor="name">address</Label>
                <Dialog>
                      <DialogTrigger asChild>
                      <Input id="name" placeholder="choose your destination -->" readOnly type="text" className='cursor-pointer' />
                      </DialogTrigger>                  
                        <GoogleMapsComponentModal handleCurrentPositionChange={handleCurrentPositionChange} modalRole='GTstarted' />
                </Dialog>
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Select onValueChange={handleTimeChange} >
                <SelectTrigger>
                  <SelectValue placeholder="Select Time" />
                </SelectTrigger>
                <SelectContent>
                {times.map(item=>(
                  <SelectItem key={item.id} value={item.time}>{item.time}</SelectItem>
                ))}
                </SelectContent>
              </Select>
              </div>
              <Button className="w-full" type="submit">
                Get Started
              </Button>
            </form>
          </div>
        </div>
      </section>
    );
  }