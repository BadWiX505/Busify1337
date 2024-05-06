"use client"

import { useEffect } from 'react';

// Functional component definition
const GetStarted = () => {
  // Function to populate the select options with times between 21:00 and 6:00 (excluding 4:00)
  const populateDefaultTimes = () => {
    const select = document.getElementById('defaultTime');
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
              <img src="/bookinjpg.png" alt="Unlock Your Journey" className="w-full h-auto" />
          </div>
            
          </div> 

      
    <div className="space-y-16">
      <h2 className="text-4xl font-bold">Let's Get Started!</h2>
      <div className="space-y-9">
        <div className="space-y-1">
          <button className="bg-green-900 text-white font-semibold py-4 px-4 rounded-md w-full" id="defaultLocation">
            Choose Default Location
          </button>
        </div>
        <div className="space-y-1 relative">
          <label htmlFor="">Your default location:</label>
                <input className="border rounded-md px-4 py-2 w-full" id="defaultLocation" value="" readOnly />
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
      <button  className="flex items-center bg-green-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none transition duration-300 ease-in-out hover:bg-green-800" type="button">
      Finish
      <svg className="h-5 w-10" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path clipRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" fillRule="evenodd" />
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

export default  GetStarted;
