import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Dialog,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function DriverProfileModel({ open, handleCloseProfileModal,driver }) {
  return (
    <Dialog open={open} onOpenChange={handleCloseProfileModal}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>User Profile</DialogTitle>
          <DialogDescription>
            This is your profile information.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage alt="John Doe" src={driver.image} />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h4 className="text-lg font-medium">{driver.fullName}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                {driver.email}
                </p>
              </div>
            </div>
            <Badge className="px-3 py-1 text-xs font-medium" variant="success">
              Active
            </Badge>
          </div>
          <div className="grid grid-cols-2 gap-4 md:gap-6 lg:gap-8">
            <div className="space-y-1">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Total Hours
              </p>
              <p className="text-xl font-medium">{driver.totalWorkingHours} hrs</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Total Earnings
              </p>
              <p className="text-xl font-medium">${driver.totalProfits}</p>
            </div>
          </div>
        </div>
        <DialogFooter>
          <div>
            <Button variant="outline" onClick={handleCloseProfileModal}>
              Close
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
