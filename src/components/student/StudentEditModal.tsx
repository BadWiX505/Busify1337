"use client"


import { Button } from "@/components/ui/button"
import { DialogTrigger, DialogTitle, DialogHeader, DialogFooter, DialogContent, Dialog, DialogClose } from "@/components/ui/dialog"
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { SetStateAction, useEffect, useState } from "react"
import { getAddressFromCoordinates } from "@/Repo/Logic";
import GoogleMapsComponentModal from "../maps/GoogleMapsComponent"
import { useToast } from "../ui/use-toast"
import { Skeleton } from "../ui/skeleton"



type Address = {
  lat: number | null;
  lng: number | null;
};

export default function StudentEditModal() {

  const [student, setStudent] = useState(null);
  const [address, setAddress] = useState<Address>({ lat: null, lng: null });
  const [realAddress, setRealAddress] = useState('');
  const [time, setTime] = useState('');
  const { toast } = useToast();
  const [loading, setLoading] = useState(true)




  const handleCurrentPositionChange = (position: Address) => {
    setAddress(position);
  };


  const handleTimeChange = (value: SetStateAction<null>) => {
    setTime(value);
  };

  useEffect(() => {
    async function getDetails() {
      const res = await fetch("/api/getStudentDetails");
      const StudentDetails = await res.json();
      setStudent(StudentDetails);
    }

    getDetails();

    setLoading(false)

  }, [])


  useEffect(() => {

    const getRealAddress = async () => {
      const realAdressFromGeo = await getAddressFromCoordinates(address.lat, address.lng);
      if (realAdressFromGeo)
        setRealAddress(realAdressFromGeo);
      else
        setRealAddress('Uknown Adress');
    }

    if (address.lat && address.lng)
      getRealAddress();

    // setStudent(prevStudent=>({
    //     ...prevStudent,
    //     defaultAddress : address;
    // }))

  }, [address]);


  useEffect(() => {
    if (student && student.finalStudent) {
      setAddress(student.finalStudent.defaultAddress);
      setTime(student.finalStudent.defaultTime)
    }
  }, [student])



  async function handleSaveclick() {
    setLoading(true);
    const updatedData = {
      address: address,
      time: time
    }
    try {
      const res = await fetch("/api/updateStudentInfo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json" // Specify the content type as JSON
        },
        body: JSON.stringify(updatedData) // Convert finalUser to JSON format
      });

      const response = await res.json();
      const finalRes = response.finalRes;
      if (finalRes)
        toast({
          style: { backgroundColor: "green", color: "white" },
          title: "Nice !",
          description: "edited sucessfully",
        })

      else
        throw new Error("something went wrong")
    }

    catch (err) {
      console.log(err);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Try again !",
      })
    } finally {
      setLoading(false)
    }

  }


  return (

    <DialogContent className="sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle>Student Profile</DialogTitle>
      </DialogHeader>


      {loading &&

        <div className="grid grid-cols-[100px_1fr] items-center gap-6 py-4">
          <Skeleton className="h-[100px] w-[100px] rounded-full" />
          <div className="space-y-1">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>

      }



      {!loading &&
        <div className="grid grid-cols-[100px_1fr] items-center gap-6 py-4">
          <Avatar className="h-[100px] w-[100px]">
            <AvatarImage alt="Student Avatar" src={student ? student.finalStudent.Image : "??"} />
            <AvatarFallback>JS</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-xl font-semibold">{student ? student.finalStudent.fullName : "??"}</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">{student ? student.finalStudent.Email : "??"}</p>
          </div>
        </div>
      }




      <Separator />
      <form className="space-y-4 py-4">
        <div className="grid grid-cols-2 items-center gap-4">
          <Label className="text-right" htmlFor="address">
            Default Address
          </Label>

          {loading && <Skeleton className="h-[72px] w-full rounded" />}

          {!loading &&
            <Dialog>
              <DialogTrigger asChild>
                


                  <Textarea value={realAddress} readOnly id="address" rows={3} className="cursor-pointer" />
                
              </DialogTrigger>


              <GoogleMapsComponentModal handleCurrentPositionChange={handleCurrentPositionChange} modalRole='STmain' />



            </Dialog>
          }

        </div>
        <div className="grid grid-cols-2 items-center gap-4">
          <Label className="text-right" htmlFor="time">
            Default Time
          </Label>

          {loading && <Skeleton className="h-[40px] w-full rounded" />}

          {!loading &&
            <Select defaultValue={student ? student.finalStudent.defaultTime : ''} value={time} onValueChange={handleTimeChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select time" />
              </SelectTrigger>
              <SelectContent>
                {student ? student.finalStudent.travelTimes.map(time => <SelectItem value={time.time} key={time.id}>{time.time}</SelectItem>) : "??"}
              </SelectContent>
            </Select>
          }
        </div>
      </form>
      <DialogFooter>
        <Button onClick={handleSaveclick}>Save Changes</Button>
        <DialogClose asChild>
          <div>
            <Button variant="outline">Cancel</Button>
          </div>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  )
}