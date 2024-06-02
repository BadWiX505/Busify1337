"use client"

import { Button} from "../ui/button";
import { Dialog, DialogClose, DialogContent } from "../ui/dialog";
import { useToast } from "../ui/use-toast";

export default function ConfirmationDialogForLeavingBus({open,onClose}){

   const {toast} = useToast();

   async function leaveBus(){
      const res = await fetch('/api/Driver/leaveBus');
      if(!res.ok){
        toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "Try again !",
          })
      }
      else{
        location.reload();
      }
   }

  return(
    <Dialog open={open}>

    <DialogContent>
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-gray-900">
                <div className="space-y-4">
                    <h3 className="text-xl font-bold">Confirm Action</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                        Are you sure you want to leave the bus ?
                    </p>
                    <div className="flex justify-end gap-2">
                        <DialogClose>
                        <Button variant="outline" onClick={onClose}>Cancel</Button>
                        </DialogClose>
                        <Button onClick={leaveBus}>Leave bus</Button>
                    </div>
                </div>
            </div>
        </div>
    </DialogContent>

</Dialog>
  )
}