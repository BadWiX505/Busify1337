import { CardContent, Card } from "@/components/ui/card";
import { User } from "@prisma/client";

interface UserDetailsModalProps {
  user: User;
  onClose: () => void;
  isOpen: boolean; // State to control visibility
}

const UserDetailsModal: React.FC<UserDetailsModalProps> = ({ user, onClose, isOpen }) => {
  if (!isOpen) return null; // Render nothing if modal is closed

  return (
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
            <div>{`${user.default_Adress_lat}, ${user.default_Adress_lng}`}</div>
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
              <div className={`h-2 w-2 rounded-full ${user.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`} />
              <div>{user.status}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
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
  )
}


















// import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
// import { CardHeader, CardContent, Card } from "@/components/ui/card";
// import { User } from "@prisma/client";

// interface UserDetailsModalProps {
//   user: User;
//   onClose: () => void;
//   isOpen: boolean; // State to control visibility
// }

// const UserDetailsModal: React.FC<UserDetailsModalProps> = ({ user, onClose, isOpen }) => {
//   if (!isOpen) return null; // Render nothing if modal is closed

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//       <Card className="relative w-full max-w-md mx-auto rounded-md"> {/* Added relative class here */}
//         <div className="absolute top-0 right-0 m-3"> {/* Added absolute positioning here */}
//           <button className="text-gray-500 hover:text-gray-700" onClick={onClose}>
//             <svg
//               className="w-6 h-6"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M6 18L18 6M6 6l12 12"
//               />
//             </svg>
//           </button>
//         </div>
//         <CardHeader className="bg-gray-100 dark:bg-gray-800 p-6 flex items-center gap-4">
//           <Avatar className="h-16 w-16">
//             {user.image ? (
//               <AvatarImage alt="User Avatar" src={user.image} />
//             ) : (
//               <AvatarFallback>{user.full_name.charAt(0)}</AvatarFallback>
//             )}
//           </Avatar>
//           <div className="flex-1 grid gap-1">
//             <div className="font-semibold text-lg">{user.full_name}</div>
//             <div className="text-gray-500 dark:text-gray-400 text-sm">{user.email}</div>
//           </div>
//         </CardHeader>
//         <CardContent className="p-6 grid gap-4">
//           <div className="grid gap-1">
//             <div className="text-gray-500 dark:text-gray-400 text-sm font-medium">Default Address</div>
//             <div>{`${user.default_Adress_lat}, ${user.default_Adress_lng}`}</div>
//           </div>
//           <div className="grid gap-1">
//             <div className="text-gray-500 dark:text-gray-400 text-sm font-medium">Default Time</div>
//             <div>{user.default_time}</div>
//           </div>
//           <div className="grid gap-1">
//             <div className="text-gray-500 dark:text-gray-400 text-sm font-medium">Role</div>
//             <div>{user.role}</div>
//           </div>
//           <div className="grid gap-1">
//             <div className="text-gray-500 dark:text-gray-400 text-sm font-medium">Status</div>
//             <div className="flex items-center gap-2">
//               <div className={`h-2 w-2 rounded-full ${user.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`} />
//               <div>{user.status}</div>
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default UserDetailsModal;
