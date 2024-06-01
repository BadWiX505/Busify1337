// components/GoogleMap.js
"use client"

import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
const containerStyle = {
  width: '100%',
  height: '490px'

};
//(32.88230550345956, -6.897831357684987)
//{lat: 32.88217306834647, lng: -6.897836923599243}
const latitude = 32.88230550345956;
const longitude = -6.897831357684987;
const center = {
  lat: latitude,
  lng: longitude
};
//(32.879101, -6.911180)

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// Smaller buffer distance for narrower east-west search
const buffer_distance = 0.05;

const north = Math.min(latitude + buffer_distance, 90);
const south = Math.max(latitude - buffer_distance, -90);
const east = longitude + buffer_distance;
const west = longitude - buffer_distance;

const options = {
  gestureHandling: "greedy",
  restriction: {
    latLngBounds: {
      north: north,
      south: south,
      west: west,
      east: east
    }
  }
};


type Address = {
  lat: number | null;
  lng: number | null;
};


const khouribgaBounds = {
  north: 32.895,
  south: 32.86,
  east: -6.9,
  west: -6.937
};




// interface Props {
//   onAddressChange: (address: Address) => void;
// }
const GoogleMapsComponentModal = ({handleCurrentPositionChange , modalRole}) => {
  const [currentPosition, setCurrentPosition] = useState({ lat: null, lng: null });


  function handleclickOnMap(e: google.maps.MapMouseEvent) {
    // if (e.latLng) {
    //   if (isInBounds({
    //     lat: e.latLng.lat(),
    //     lng: e.latLng.lng(),
    //   })) {

    //     setCurrentPosition({
    //       lat: e.latLng.lat(),
    //       lng: e.latLng.lng(),
    //       // content: '<div><h3>Marker Title</h3><p>Additional information here</p></div>'
    //     });

    //   } else {
    //     alert("wa khouribga a weld l9a7ba");
    //   }


      // onAddressChange({ lat: e.latLng.lat(), lng: e.latLng.lng() });
      if (e.latLng) {
           setCurrentPosition({
          lat: e.latLng.lat(),
          lng: e.latLng.lng(),
          // content: '<div><h3>Marker Title</h3><p>Additional information here</p></div>'
        });
      }
    }
  

     useEffect(()=>{
      handleCurrentPositionChange(currentPosition)
     },[currentPosition])


     useEffect(()=>{
       
      async function getStudentDefaultAddress(){
        const res = await fetch('/api/Student/getStudentDefault');
        const DE = await res.json();
       setCurrentPosition({lat : DE.defU.default_Adress_lat , lng :DE.defU.default_Adress_lng})
      }


      if(modalRole==='STmain'){
      getStudentDefaultAddress();
     }

    }
    ,[])


  // function isInBounds(position) {
  //   return (
  //     position.lat >= khouribgaBounds.south &&
  //     position.lat <= khouribgaBounds.north &&
  //     position.lng >= khouribgaBounds.west &&
  //     position.lng <= khouribgaBounds.east
  //   );
  // }

  // const handleDirections = (result, status) => {
  //   if (status === 'OK') {
  //     console.log(result)
  //     setDirections(result);
  //   } else {
  //     console.error(Directions request failed due to ${status});
  //   }
  // };  


  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyAH-j0JYMyTZx3A5m0XXFnal0qnCVmKz9M"
  })

  

 
  return isLoaded ?(
    <>
      <DialogContent
        className=""
        style={{
          width: "100% !important",
          height: "100%",
        }}
      >

        <DialogHeader>
          <DialogTitle>Khouribga Map</DialogTitle>

        </DialogHeader>

        <GoogleMap
          mapContainerStyle={containerStyle}
          center={(currentPosition && currentPosition.lat && currentPosition.lng) ? currentPosition : center}
          zoom={17}
          options={options}
          onClick={(e) => handleclickOnMap(e)}  
        >
          {currentPosition && <Marker position={currentPosition}>

          </Marker>}

        </GoogleMap>
      </DialogContent>
    </>
  ):<></>
};

export default GoogleMapsComponentModal;