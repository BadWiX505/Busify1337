"use client"

import { useRouter } from 'next/navigation';
import { use, useEffect, useState } from 'react';



type Address = {
  lng: String;
  lat: String;
};

type UserInfo = {
  full_name: string | null;
  image: string | null;
  role: 'student' | 'teacher' | 'admin';
  status: 'active' | 'inactive';
  default_Address: Address | null; // Updated to use the Address type
  default_time: string | null;
  userName: string | null;
  email: string | null;
};




// Define user information
const userInfo = {
  full_name: 'John Doe',
  image: 'profile.jpg',
  role: 'user',
  status: 'active',
  default_Adress_lnt: "123.456",
  default_Adress_lng: "789.012",
  default_time: '12:00',
  userName: 'johndoe',
  email: 'john@example.com',
};


// Functional component definition
const MyComponent = () => {

 const [address,setadress]  = useState(null);
 const [time,setTime] = useState(null);
 const [user, setUser] = useState<UserInfo>({
  full_name: null,
  image: null,
  role: 'student',
  status: 'active',
  default_Address: null,
  default_time: null,
  userName: null,
  email: null,
});

const router = useRouter();





 async function getUserObjetxt(){
  const intraInfo = {fullName : "StudentFullName" , image : "imageLinkn"};
  if(intraInfo){
   user.full_name= intraInfo.fullName;
   user.image=intraInfo.image;  


  }
  else{
     router.push('/login');
  }
 }











  // Function to populate the select options with times between 21:00 and 6:00 (excluding 4:00)
  const populateDefaultTimes = () => {
    const select = document.getElementById('defaultTime') as HTMLSelectElement | null;
    if (select) { // Check if select is not null
      select.innerHTML = ''; // Clear previous options
  
      // Create options for each hour between 21:00 and 6:00 (excluding 4:00)
      for (let hour = 21; hour <= 30; hour++) {
        const adjustedHour = hour % 24; // Handle wraparound from 24 to 0
        if (adjustedHour !== 4) { // Exclude 4:00
          const option = document.createElement('option');
          option.value = ('0' + adjustedHour).slice(-2) + ':00'; // Format hour as HH:00
          option.textContent = ('0' + adjustedHour).slice(-2) + ':00'; // Format hour as HH:00
          select.appendChild(option);
        }
      }
    }
  };
  // useEffect hook to call the function when the component mounts
  useEffect(() => {
    populateDefaultTimes();
  }, []); // empty dependency array ensures the effect runs only once after initial render

  // JSX structure of the component
  return (
    <>

<div className="min-h-screen flex justify-center items-center">
      <div className="max-w-6xl w-full">
        <div className="grid grid-cols-2 gap-16">
          <div className="space-y-6">

          <div>
              <img src="/img/getStarted.jpg" alt="Unlock Your Journey" className="w-full h-auto" />
          </div>
            
          </div> 

      
          <div className="space-y-16">
  <h2 className="text-4xl font-bold">Let's Get Started!</h2>
  <div className="space-y-9">
   
    <div className="space-y-1 relative">
      <label htmlFor="">Your default location:</label>
      <div className="input-container relative">
        <input className="border rounded-md px-4 py-2 w-full" id="defaultLocation" placeholder='choose your location -->' readOnly />
        <button id="locationButton" className="location-button absolute right-3 top-1/2 transform -translate-y-1/2 bg-transparent border-none p-1 focus:outline-none" type="button">
        <svg
      viewBox="0 0 576 512"
      fill="currentColor"
      height="2em"
      width="2em"
    >
      <path d="M408 120c0 54.6-73.1 151.9-105.2 192-7.7 9.6-22 9.6-29.6 0C241.1 271.9 168 174.6 168 120 168 53.7 221.7 0 288 0s120 53.7 120 120zm8 80.4c3.5-6.9 6.7-13.8 9.6-20.6.5-1.2 1-2.5 1.5-3.7l116-46.4c15.8-6.3 32.9 5.3 32.9 22.3v270.8c0 9.8-6 18.6-15.1 22.3L416 503V200.4zm-278.4-62.1c2.4 14.1 7.2 28.3 12.8 41.5 2.9 6.8 6.1 13.7 9.6 20.6v251.4L32.9 502.7C17.1 509 0 497.4 0 480.4V209.6c0-9.8 6-18.6 15.1-22.3l122.6-49zM327.8 332c13.9-17.4 35.7-45.7 56.2-77v249.3l-192-54.9V255c20.5 31.3 42.3 59.6 56.2 77 20.5 25.6 59.1 25.6 79.6 0zM288 152c22.1 0 40-17.9 40-40s-17.9-40-40-40-40 17.9-40 40 17.9 40 40 40z" />
    </svg>
        </button>
      </div>
    </div>
    
    <div className="space-y-1">
      <label className="text-sm font-semibold" htmlFor="defaultTime">
        Default Time
      </label>
      <select className="border rounded-md px-4 py-2 w-full" id="defaultTime">
        <option value="">Select a time</option>
      </select>
    </div>
  </div>
  <div className="flex justify-end">
    <button className="flex items-center bg-green-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none transition duration-300 ease-in-out hover:bg-green-800" type="button">
      Finish
      <svg className="h-5 w-10" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path clipRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" fillRule="evenodd"></path>
      </svg>
    </button>
  </div>
</div>

        </div>
      </div>
    </div>
    

    
    </>
  );
};

export default MyComponent;
