"use client";
import { useState } from "react";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import ReportDialog from "./ReportDialog";
import { useToast } from "@/components/ui/use-toast";


export default function ModelMap({ onClose, destination,removeMarker }) {
  const [showDialog, setShowDialog] = useState(false);
  const [isArrivingConfirmationOpened, setArrivingConfirmationOpened] = useState(false);
  const [selectedStudentToReportWith,setSelectedStudentToReportWith] = useState('');
  const { toast } = useToast();


  async function ConfirmArriving(){
      const resp = await fetch('/api/Driver/confirmStudentsArriving',{
        method : 'POST',
        body : JSON.stringify(destination.users),
      })
      
      if(!resp.ok){
        const message = await resp.json();
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: message,
        });
      }
      else{
        toast({
          variant: "success",
          title: "successfully done",
          description: "Confirmation has been done successfully" ,
        });
        removeMarker();
      }


      setArrivingConfirmationOpened(false);
      onClose();
  }

  function ConfirmArrivingModal({ open }) {
    return (
      <Dialog open={open} >
        <DialogContent className=" sm:w-100 lg:w-[300px] md:w-[300px] xl:w-[500px]">
          <div className="p-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Confirm Arriving
            </h2>
            <p className="text-gray-700">
              Are you sure you want to confirm arriving and delete this marker?
            </p>
          </div>
          <DialogFooter className="gap-4">
            <Button onClick={() => setArrivingConfirmationOpened(false)}>Cancel </Button>
            <Button variant="destructive" onClick={ConfirmArriving}>
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }





  const callDialog = (idStudent : string) => {
    setSelectedStudentToReportWith(idStudent);
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  return (
    <div
      key="1"
      className="container w-fit mx-auto py-8 px-4 shadow-md sm:px-6 lg:px- absolute top-0"
      
    >
      <div className="bg-white rounded-t-lg px-5 py-6">
        <div className="flex justify-end">
          <Button className="ml-auto" variant="icon" onClick={onClose}>
            <XIcon className="w-6 h-6 text-gray-500" />
          </Button>
        </div>
        <div className="flex items-center justify-between gap-5">
          <h1 className="text-2xl font-bold text-gray-900">Field Trip</h1>
          <div className="flex">
            <LocateIcon className="w-6 h-6 text-gray-500" />
            <p className="text-gray-700">123 Main St, Anytown USA</p>
          </div>
        </div>
      </div>
      <div className="bg-white p-6">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Students Attending
          </h2>
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {destination.users.map((user, index) => (

              <li className="py-4 flex items-center justify-between" key={index}>
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <p className="text-gray-900 font-medium">{user.full_name}</p>
                </div>
                <Button
                  className="text-red-500 border-red-500"
                  size="sm"
                  variant="outline"
                  onClick={()=>callDialog(user.id_User)}
                >
                  <FlagIcon className="w-4 h-4 mr-2" />
                  Report
                </Button>

              </li>


            ))}

          </ul>

          <ReportDialog
            open={showDialog}
            handleClose={handleCloseDialog}
            studentId={selectedStudentToReportWith}
          />

          <Button onClick={() => setArrivingConfirmationOpened(true)}>Confirm Arriving</Button>
        </div>
        <ConfirmArrivingModal open={isArrivingConfirmationOpened} />
      </div>
    </div>
  );
}






// Icons
function FlagIcon(props) {
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
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" x2="4" y1="22" y2="15" />
    </svg>
  );
}

function LocateIcon(props) {
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
      <line x1="2" x2="5" y1="12" y2="12" />
      <line x1="19" x2="22" y1="12" y2="12" />
      <line x1="12" x2="12" y1="2" y2="5" />
      <line x1="12" x2="12" y1="19" y2="22" />
      <circle cx="12" cy="12" r="7" />
    </svg>
  );
}

function XIcon(props) {
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
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
