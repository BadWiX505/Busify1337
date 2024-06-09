import { useState, useEffect } from "react";
import { CardContent, Card } from "@/components/ui/card";
import { User } from "@prisma/client";

interface DriverDetailsProps {
  driver: User | null; // Allow driver to be null initially
  onClose: () => void;
  isOpen: boolean;
  onStatusChange: (id: string, newStatus: string) => void;
}

const DriverDetails: React.FC<DriverDetailsProps> = ({
  driver: initialDriver,
  onClose,
  isOpen,
  onStatusChange,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [driver, setDriver] = useState<User | null>(initialDriver);

  useEffect(() => {
    if (initialDriver) {
      setDriver(initialDriver);
    }
  }, [initialDriver]);

  const toggleStatus = async () => {
    if (!driver) return;

    setIsLoading(true);
    const newStatus = driver.status === "active" ? "inactive" : "active";
    try {
      // Simulate loading state for 1 second
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Update status on server
      await onStatusChange(driver.id_User, newStatus);
      // Update local driver object with new status
      const updatedDriver = { ...driver, status: newStatus };
      setDriver(updatedDriver);
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen || !driver) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <Card className="relative w-full max-w-md mx-auto">
        <div className="relative">
          <img
            alt="Driver Avatar"
            className="aspect-[4/3] w-full object-cover rounded-t-lg"
            height={360}
            src={driver.image ? driver.image : "/placeholder.svg"}
            width={640}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-t-lg">
            <div className="text-white">
              <div className="font-semibold text-lg">{driver.full_name}</div>
              <div className="text-sm">{driver.email}</div>
            </div>
          </div>
          <button
            className="absolute top-4 right-4 rounded-full bg-gray-900/50 text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 dark:bg-gray-50/50 dark:text-gray-900 dark:hover:bg-gray-50 dark:focus:ring-gray-300"
            onClick={onClose}
          >
            <XIcon className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        </div>
        <CardContent className="p-6 grid gap-4">
          <div className="grid gap-1">
            <div className="text-gray-500 dark:text-gray-400 text-sm font-medium">
              Role
            </div>
            <div>{driver.role}</div>
          </div>

          <div className="grid gap-1">
            <div className="text-gray-500 dark:text-gray-400 text-sm font-medium">
              Salary
            </div>
            <div>{driver.salary_per_hour}$ / hour</div>
          </div>

          <div className="grid gap-1">
            <div className="text-gray-500 dark:text-gray-400 text-sm font-medium">
              Total driving hours
            </div>
             {driver.total_working_hours} hours 
          </div>

          <div className="grid gap-1">
            <div className="text-gray-500 dark:text-gray-400 text-sm font-medium">
              Status
            </div>
            <div className="flex items-center gap-2">
              <div
                className={`h-2 w-2 rounded-full ${
                  driver.status === "active" ? "bg-green-500" : "bg-red-500"
                }`}
              />
              <div>{driver.status}</div>
              <button
                className="text-xs rounded-md px-2 py-1 bg-gray-200 text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring focus:ring-gray-300"
                onClick={toggleStatus}
                disabled={isLoading}
              >
                {isLoading
                  ? "Loading..."
                  : driver.status === "active"
                  ? "Deactivate"
                  : "Activate"}
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DriverDetails;

function XIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M18 6L6 18" />
      <path d="M6 6L18 18" />
    </svg>
  );
}
