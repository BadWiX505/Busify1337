import { useEffect, useState } from 'react';
import { CardContent, Card } from "@/components/ui/card";
import { User } from "@prisma/client";
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import the react-toastify CSS
import { Dialog,DialogTrigger } from '@radix-ui/react-dialog';
import GoogleMapsComponentModal from "@/components/staff/StudentMap/studentMapInStaff"
import { Button } from "@/components/ui/button";
import { MapPinned } from 'lucide-react';



interface UserDetailsModalProps {
  user: User;
  onClose: () => void;
  isOpen: boolean;
}

const UserDetailsModal: React.FC<UserDetailsModalProps> = ({ user: initialUser, onClose, isOpen, onUpdateStatus }) => {
  const [user, setUser] = useState<User | null>(initialUser); // Use a default value of null
  const [status, setStatus] = useState(initialUser?.status || 'inactive'); // Default status to 'inactive'
  const [modalIsOpen, setModalIsOpen] = useState(false); // State to control the Modal visibility


  useEffect(() => {
    // Update state when initialUser changes
    if (initialUser) {
      setUser(initialUser);
      setStatus(initialUser.status);
    }
  }, [initialUser]);

  const openModal = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent default action
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  }; 

  if (!isOpen || !user) return null; // Render nothing if modal is closed or user is null


  const handleStatusChange = async () => {
    const newStatus = status === 'active' ? 'inactive' : 'active';
    try {
      const response = await fetch('/api/Staff/User/updateStudentStatus', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: user.id_User, status: newStatus }),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setStatus(updatedUser.status);
        setUser(updatedUser); // Update the user state with the latest data
        toast.success(`Student status has been updated`, {
          position: "bottom-right"
        });
        onUpdateStatus(updatedUser); // Update status in UserTable component

      } else {
        console.log(newStatus);
        console.error('Failed to update status');
        toast.error('Failed to update user status', {
          position: "bottom-right"
        });
      }
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Error updating user status', {
        position: "bottom-right"
      });
    }
  };

  return (
    <>
      <ToastContainer /> {/* Add the ToastContainer to render the notifications */}
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <Card className="relative w-full max-w-md mx-auto">
          <div className="relative">
            <img
              alt="User Avatar"
              className="aspect-[4/3] w-full object-cover rounded-t-lg"
              height={360}
              src={user.image ? user.image : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAgVBMVEUAAAD////7+/v4+Pjm5ub8/Pzg4ODU1NTMzMz09PTi4uIfHx+/v7/Jycnq6urFxcV5eXna2toUFBSurq5bW1syMjI3NzeGhoZcXFyXl5eNjY24uLhtbW2np6crKyubm5tPT09CQkJxcXEcHBxkZGQMDAxKSkpFRUV9fX0mJiah"}
              width={640}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-t-lg">
              <div className="text-white">
                <div className="font-semibold text-lg">{user.full_name}</div>
                <div className="text-sm">{user.email}</div>
              </div>
            </div>
            <button className="absolute top-4 right-4 rounded-full bg-gray-900/50 text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 dark:bg-gray-50/50 dark:text-gray-900 dark:hover:bg-gray-50 dark:focus:ring-gray-300" onClick={onClose}>
              <XIcon className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </button>
          </div>
          <CardContent className="p-6 grid gap-4">
          <div className="grid gap-1">
            <div className="text-gray-500 dark:text-gray-400 text-sm font-medium">Default Address</div>
            <div>
               
              <div>
              <Dialog>
             <DialogTrigger asChild>
                      <Button
                size="sm"
                variant="outline"
              >
                <MapPinned className="w-4 h-4 mr-2"/>
                <p>View</p>
              </Button> 
               </DialogTrigger>


                      <GoogleMapsComponentModal coordinates={{lat:user.default_Adress_lat,lng:user.default_Adress_lng}} />
                    </Dialog>
              </div>
            </div>
          </div>
            <div className="grid gap-1">
              <div className="text-gray-500 dark:text-gray-400 text-sm font-medium">Default Time</div>
              <div>{user.default_time}</div>
            </div>
            <div className="grid gap-1">
              <div className="text-gray-500 dark:text-gray-400 text-sm font-medium">Role</div>
              <div>{user.role}</div>
            </div>
            <div className="grid gap-1">
              <div className="text-gray-500 dark:text-gray-400 text-sm font-medium">Status</div>
              <div className="flex items-center gap-2">
                <div className={`h-2 w-2 rounded-full ${status === 'active' ? 'bg-green-500' : 'bg-red-500'}`} />
                <div>{status}</div>
                <button
                  onClick={handleStatusChange}
                  className="text-xs rounded-md px-2 py-1 bg-gray-200 text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring focus:ring-gray-300"
                >
                  {status === 'active' ? 'Ban' : 'Deban'}
                </button>

                
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default UserDetailsModal;

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



function setIsHovering(arg0: boolean): void {
  throw new Error('Function not implemented.');
}

function setSelectedUser(user: { id_User: string; full_name: string; image: string | null; email: string; role: import(".prisma/client").$Enums.Role; status: import(".prisma/client").$Enums.status | null; default_Adress_lat: number | null; default_Adress_lng: number | null; createdAt: Date; default_time: string | null; busId: number | null; }) {
  throw new Error('Function not implemented.');
}