"use client"

import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { PaginationPrevious, PaginationItem, PaginationNext, PaginationContent, Pagination } from "@/components/ui/pagination";
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import Badge from '@/components/ui/Badge2';
import { PencilIcon } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';





function BusIcon(props) {
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
      <path d="M8 6v6" />
      <path d="M15 6v6" />
      <path d="M2 12h19.6" />
      <path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3" />
      <circle cx="7" cy="18" r="2" />
      <path d="M9 18h5" />
      <circle cx="16" cy="18" r="2" />
    </svg>
  )
}


function SignalIcon(props) {
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
      <path d="M2 20h.01" />
      <path d="M7 20v-4" />
      <path d="M12 20v-8" />
      <path d="M17 20V8" />
      <path d="M22 4v16" />
    </svg>
  )
}





function UsersIcon(props) {
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
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}


function CheckIcon(props) {
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
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function UncheckIcon(props) {
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
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}

function ChevronLeftIcon(props) {
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
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon(props) {
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
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

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

function UserIcon(props) {
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
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

interface Bus {
  id_Bus: number;
  image: string;
  bus_Number: number;
  bus_Name: string;
  id_Driver: number;
  bus_Capacity: number;
  bus_Status: string;
}

interface Driver{
  id_User :string;
  full_name : string;
}

export default function Component() {
  const [buses, setBuses] = useState<Bus[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);
  const limit = 4;
  const [hasMoreBuses, setHasMoreBuses] = useState(true);
  const [drivers, setDrivers] = useState<Driver[]>([]); 
  const [selectedDriverId, setSelectedDriverId] = useState<number | null>(null); 
  const [selectedBus, setSelectedBus] = useState<Bus | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false); 
  const [selectedStatus, setSelectedStatus] = useState('');
  // const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  // const [busToDelete, setBusToDelete] = useState(null);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [highestBusId, setHighestBusId] = useState(0);
  const [busToEdit, setBusToEdit] = useState(null);
  const [editedBus, setEditedBus] = useState({
    id_Bus: '',
    bus_Number: '',
    bus_Name: '',
    image: '',
    id_Driver: '',
    bus_Capacity: '',
    bus_Status: ''
  });
  
  
  
  const handleImageChange = (e) => {
    setEditedBus({ ...editedBus, image: e.target.value });
  };
 
  
  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleCardClick = (bus: Bus) => {
    setSelectedBus(bus);
    setIsPopupOpen(true);
  };


  const getDriverName = (driverId) => {
    const driver = drivers.find(driver => driver.id_User === driverId);
    return driver ? driver.full_name : driverId;
  };


  // Form state variables
  const [formData, setFormData] = useState({
    image: '',
    bus_Number: '',
    bus_Name: '',
    id_Driver: '',
    bus_Capacity: '',
    bus_Status: '', // Default status
  });

  // Function to fetch available drivers
  const fetchDrivers = async () => {
    try {
      const response = await fetch('/api/Staff/User/getActiveDrivers');
      if (!response.ok) {
        throw new Error('Failed to fetch drivers');
      }
      const data = await response.json();
      setDrivers(data);
    } catch (error) {
      console.error('Error fetching drivers:', error);
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, []);



  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
  
    // Conditionally parse the value for the bus_Number and bus_Capacity fields
    const parsedValue = (name === 'bus_Number' || name === 'bus_Capacity') ? parseInt(value) || '' : value;
  
    // If the input element is a select element and its name is 'bus_Status', update the selected status
    if (e.target.tagName === 'SELECT' && name === 'bus_Status') {
      setSelectedStatus(value);
    }
  
    // Update the form data
    setFormData(prevState => ({
      ...prevState,
      [name]: parsedValue,
      bus_Status: selectedStatus // Include selected status in formData
    }));
  };
  

  async function handleEditBusSubmit(e) {
    e.preventDefault(); // Prevent the default form submission behavior
  
    try {
      // Make a POST request to the update bus route with the updated bus data
      const response = await fetch('/api/Staff/Bus/updateBus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedBus), // Send the edited bus data in the request body
      });
  
      if (response.ok) {
        // If the request is successful, update the displayed bus data without refreshing
        const updatedBusData = await response.json();
  
        // Update the displayed bus without refreshing the page
        setBuses(prevBuses =>
          prevBuses.map(bus =>
            bus.id_Bus === updatedBusData.id_Bus ? updatedBusData : bus
          )
        );
  
        // Refetch the buses to ensure the data is up to date
        await fetchBuses(offset);
  
        // Close the edit popup after successful update
        setIsEditPopupOpen(false);
  
        // Display success toast message after refreshing and closing the popup
      toast.success('Bus updated successfully', {
        position: 'bottom-right',
      });
      } 
      
      else {
        // If there's an error in the request, handle it here
        console.error('Failed to update bus:', response.statusText);
        // Optionally, you can display an error message to the user or handle the error in another way
        toast.error('Unable to edit the Bus', {
          position: 'bottom-right',
        });
      }
    } catch (error) {
      // Handle any network errors or other exceptions here
      console.error('Error updating bus:', error);
      // Optionally, you can display an error message to the user or handle the error in another way
      toast.error('Error while Updating the Bus', {
        position: 'bottom-right',
      });
    }
  }

  
  
  
  
  
  
  



  // const handleDeleteBus = async (bus) => {
  //   try {
  //     const response = await fetch('/api/Bus/deleteBus', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ id: bus.id_Bus }),
  //     });

  //     if (response.ok) {
  //       setBuses(buses.filter((b) => b.id_Bus !== bus.id_Bus));
  //       toast.success('Bus deleted successfully', {
  //         position: 'bottom-right',
  //       });
  //     } else {
  //       const errorData = await response.json();
  //       toast.error(`Failed to delete bus: ${errorData.error}`, {
  //         position: 'bottom-right',
  //       });
  //     }
  //   } catch (error) {
  //     console.error('Error deleting bus:', error);
  //     toast.error('Failed to delete bus', {
  //       position: 'bottom-right',
  //     });
  //   }
  //   setIsDeletePopupOpen(false);
  // };

  

// Function to handle form submission
// Function to handle form submission
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  try {
    // Increment the highest bus ID by 1 for the new bus
    const newBusId = highestBusId + 1;
    const formDataToSend = {
      ...formData,
      id: newBusId,
      id_Driver: selectedDriverId ? String(selectedDriverId) : null
    };
    const response = await fetch('/api/Staff/Bus/addBus', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formDataToSend)
    });
    if (!response.ok) {
      throw new Error('Failed to add bus');
    }

    // Parse the response data to get the newly added bus
    const newBus = await response.json();

    // Update the list of buses in the state by adding the new bus
    setBuses(prevBuses => [...prevBuses, newBus]);

    // Reset the form data
    setFormData({
      image: '',
      bus_Number: '',
      bus_Name: '',
      id_Driver: '',
      bus_Capacity: '',
      bus_Status: '',
    });
    setSelectedDriverId(null);

    // Show success toast message
    toast.success('Bus added successfully', {
      position: 'bottom-right',
    });
  } catch (error) {
    setError(error.message);

    // Show error toast message
    toast.error('Failed to add bus', {
      position: 'bottom-right',
    });
  }
};



  


const fetchBuses = async (offset: number) => {
  setLoading(true);
  try {
    const response = await fetch(`/api/Staff/Bus/getBus?limit=${limit}&offset=${offset}`);
    if (!response.ok) {
      throw new Error('Failed to fetch buses');
    }
    const data = await response.json();
    setBuses(data.buses);
    // Store the highest bus ID
    setHighestBusId(data.highestBusId);
    // Check if there are more buses to fetch
    setHasMoreBuses(data.buses.length === limit);
  } catch (error) {
    setError(error.message);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchBuses(offset);
  }, [offset]);

  const handleNext = () => {
    // Check if there are more buses before incrementing offset
    if (hasMoreBuses) {
      setOffset(prevOffset => prevOffset + limit);
    }
  };

  const handlePrevious = () => {
    setOffset(prevOffset => Math.max(0, prevOffset - limit));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
  {buses.map((bus) => (
    <div
      key={bus.id_Bus}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden relative"
      onClick={() => handleCardClick(bus)}
    >
      <div className="relative h-48">
        <img
          alt={`Image of bus`}
          className="w-full h-full object-cover"
          height={300}
          src={bus.image ? bus.image : '/placeholder.svg'}
          style={{
            aspectRatio: "400/300",
            objectFit: "cover",
          }}
          width={400}
        />
        <div className={`absolute bottom-4 right-4 ${bus.bus_Status === 'active' ? 'bg-green-500' : 'bg-red-500'} text-white px-3 py-1 rounded-full text-xs font-medium`}>
          {bus.bus_Status === 'active' ? 'Active' : 'Inactive'}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">{bus.bus_Name}</h3>
        <div className="flex items-center mb-2">
          <UserIcon className="w-5 h-5 mr-2 text-gray-500 dark:text-gray-400" />
          <span className="text-gray-700 dark:text-gray-400">{bus.bus_Capacity}</span>
        </div>
      </div>
      <div className="absolute bottom-2 right-2 flex gap-2">
        <button
          className="rounded-md text-gray-500 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-400 dark:focus:ring-gray-300"
          onClick={(e) => {
            e.stopPropagation();
            setBusToEdit(bus);
            setEditedBus(bus);
            setIsEditPopupOpen(true);
          }}
        >
          <PencilIcon className="w-5 h-5" /> {/* Edit icon */}
        </button>
        
      </div>



    </div>
  ))}
</div>
      <div className="flex justify-center mt-8">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
            <PaginationPrevious href="#" onClick={handlePrevious} disabled={offset === 0} className={offset === 0 ? 'text-gray-500' : ''} />
            </PaginationItem>
            <PaginationItem>
            <PaginationNext href="#" onClick={handleNext} disabled={!hasMoreBuses}  className={!hasMoreBuses ? 'text-gray-500 ' : ''} />      </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>


    



      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Add a Bus</h2>
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input type="text" name="bus_Name" value={formData.bus_Name} onChange={handleInputChange} placeholder="Bus Name" required />
            </div>
            <div>
              <Label htmlFor="bus_number">Bus Number</Label>
              <Input type="number" name="bus_Number" id="bus_number" value={formData.bus_Number} onChange={handleInputChange} placeholder="Bus Number" required />
            </div>




            <div>
              <Label htmlFor="capacity">Capacity</Label>
              <Input type="number" name="bus_Capacity" value={formData.bus_Capacity} onChange={handleInputChange} placeholder="Bus Capacity" required/>
              
              
            </div>



            <div>
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                required
                value={selectedStatus}
                onChange={(e) => {
                  console.log("Selected status:", e.target.value);
                  setSelectedStatus(e.target.value);
                }}
                className="block w-full py-2 px-3 border border-gray-300 bg-white dark:bg-gray-800 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:border-gray-700 dark:focus:ring-gray-500 dark:focus:border-gray-500 focus:border-gray-300"
              >
                <option value="">Select status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>



            </div>



            <div>
        <Label htmlFor="driver">Drivers</Label>
        <Select
          name="id_Driver"
          value={selectedDriverId ? selectedDriverId.toString() : ''}
          onValueChange={(value) => {
            setSelectedDriverId(Number(value));
            setFormData((prevState) => ({
              ...prevState,
              id_Driver: value,
            }));
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select driver" />
          </SelectTrigger>
          <SelectContent>
            {drivers.map((driver) => (
              <SelectItem key={driver.id_User} value={driver.id_User.toString()}>
                {driver.full_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>






            <div>
              <Label htmlFor="image">Image</Label>
              <Input type="text" name='image' value={formData.image} onChange={handleInputChange} placeholder='Image URL' required/>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <Button type="submit">Add Bus</Button>
          </div>
        </form>
      </div>






      {isPopupOpen && selectedBus && (
          <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md relative">
            <button
              className="absolute top-1 right-1 rounded-full bg-gray-900/50 text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 dark:bg-gray-50/50 dark:text-gray-900 dark:hover:bg-gray-50 dark:focus:ring-gray-300"
              onClick={handleClosePopup}
            >
              <XIcon className="h-4 w-4" />
            </button>
            <div className="relative h-48">
              <img
                alt={`Image of ${selectedBus.bus_Name}`}
                className="w-full h-full object-cover"
                height={300}
                src={selectedBus.image ? selectedBus.image : '/placeholder.svg'}
                style={{
                  aspectRatio: "400/300",
                  objectFit: "cover",
                }}
                width={400}
              />
            </div>
            <h2 className="text-xl font-bold mb-4">{selectedBus.bus_Name}</h2>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              <div className="flex items-center gap-2">
                <BusIcon className="w-5 h-5" />
                <span>Bus Number:</span>
              </div>
              <div>{selectedBus ? selectedBus.bus_Number : '-'}</div>

              <div className="flex items-center gap-2">
                <BusIcon className="w-5 h-5" />
                <span>Bus Name:</span>
              </div>
              <div>{selectedBus ? selectedBus.bus_Name : '-'}</div> 

              <div className="flex items-center gap-2">
                <UserIcon className="w-5 h-5" />
                <span>Driver:</span>
              </div>
              <div>{selectedBus ? getDriverName(selectedBus.id_Driver) : '-'}</div>

              <div className="flex items-center gap-2">
                <UsersIcon className="w-5 h-5" />
                <span>Capacity:</span>
              </div>
              <div>{selectedBus ? `${selectedBus.bus_Capacity} passengers` : '-'}</div>

              <div className="flex items-center gap-2">
                <SignalIcon className="w-5 h-5" />
                <span>Status:</span>
              </div>
              <div>
                {selectedBus ? (
                  <Badge variant={selectedBus.bus_Status === 'active' ? 'success' : 'error'}>
                    {selectedBus.bus_Status === 'active' ? 'Active' : 'Inactive'}
                  </Badge>
                ) : '-'}
              </div>

             
            </div>
          </div>
        </div>
        )}



{/* {isDeletePopupOpen && busToDelete && (
  <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md">
      <h2 className="text-xl font-bold mb-4">Delete Bus</h2>
      <p>Are you sure you want to delete "{busToDelete.bus_Name}"?</p>
      <div className="mt-4 flex justify-end gap-2">
        <button
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
          onClick={() => setIsDeletePopupOpen(false)}
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          onClick={() => {
            // Call the actual delete function here
            handleDeleteBus(busToDelete);
            setIsDeletePopupOpen(false);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  </div>
)} */}

<ToastContainer />


{isEditPopupOpen && busToEdit && (
  <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-[400px]">
      <h2 className="text-xl font-bold mb-4">Edit Bus</h2>
      <form onSubmit={(e) => {
        e.preventDefault();
        handleEditBusSubmit(e);
      }}>
        <div className="grid gap-4">
          <div className="grid gap-4">
            <div className="grid grid-cols-1 gap-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Current Image
                </label>
                <img
                  className="mt-1 w-full h-32 object-cover rounded-md"
                  src={editedBus.image}
                  alt={`Current image of ${editedBus.bus_Name}`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  New Image URL
                </label>
                <input
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                  type="text"
                  value={editedBus.image}
                  onChange={handleImageChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2">
                <BusIcon className="w-5 h-5" />
                <span>Bus Number:</span>
              </div>
              <input
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                type="text"
                value={editedBus.bus_Number}
                onChange={(e) => setEditedBus({ ...editedBus, bus_Number: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2">
                <BusIcon className="w-5 h-5" />
                <span>Bus Name:</span>
              </div>
              <input
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                type="text"
                value={editedBus.bus_Name}
                onChange={(e) => setEditedBus({ ...editedBus, bus_Name: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2">
                <UserIcon className="w-5 h-5" />
                <span>Driver :</span>
              </div>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                value={editedBus.id_Driver}
                onChange={(e) => setEditedBus({ ...editedBus, id_Driver: e.target.value })}
              >
                <option value="">{editedBus.id_Driver}</option>
                {drivers.map((driver) => (
                  <option key={driver.id_User} value={driver.id_User}>{driver.full_name}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2">
                <UsersIcon className="w-5 h-5" />
                <span>Capacity:</span>
              </div>
              <input
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                type="number"
                value={editedBus.bus_Capacity}
                onChange={(e) => setEditedBus({ ...editedBus, bus_Capacity: parseInt(e.target.value, 10) })}
              />
            </div>


            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2">
                <SignalIcon className="w-5 h-5" />
                <span>Status:</span>
              </div>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                value={editedBus.bus_Status}
                onChange={(e) => setEditedBus({ ...editedBus, bus_Status: e.target.value })}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                className="px-2 py-1 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 flex items-center text-xs" // Adjusted padding and font size
                onClick={() => setIsEditPopupOpen(false)}
              >
                <XIcon className="w-4 h-4 mr-1" /> Cancel
              </button>
              <button
                type="submit"
                className="px-2 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 flex items-center text-xs" // Adjusted padding and font size
              >
                <CheckIcon className="w-4 h-4 mr-1" /> Save
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
)}

    






    </div>
  );

  
}


