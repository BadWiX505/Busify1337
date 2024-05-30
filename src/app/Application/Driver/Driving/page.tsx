"use client";
import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";
import ModelMap from "@/components/driver/model-map";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { haversineDistance } from "@/utils/mapUtils";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { toast, useToast } from "@/components/ui/use-toast";
const containerStyle = {
  width: "100%",
  height: "100vh",
};
//map center
const center = {
  lat: 32.88230550345956,
  lng: -6.897831357684987,
};


const latitude = 32.88230550345956;
const longitude = -6.897831357684987;


const buffer_distance = 0.05;

const north = Math.min(latitude + buffer_distance, 90);
const south = Math.max(latitude - buffer_distance, -90);
const east = longitude + buffer_distance;
const west = longitude - buffer_distance;


const options = {
  fullscreenControl: false, // Disables the fullscreen control
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



const khouribgaBounds = {
  north: 32.895,
  south: 32.86,
  east: -6.9,
  west: -6.937
};


const GoogleMapsComponentModal = () => {

  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAH-j0JYMyTZx3A5m0XXFnal0qnCVmKz9M",
  });



  const [direction, setDirection] = useState();
  const [currentPosition, setCurrentPosition] = useState(null);
  const [destinations , setDestinations] = useState(null)
  const [selectedDestination, setSelectedDestination] = useState(0);
  const [isCurrentPostionSetted , setIsCurrentPostionSetted] = useState(false)
  const [showModel, setShowModel] = useState(false);
  const [jobFinished,setjobIsFinished]  = useState(false);
  const params = useSearchParams();
  const router = useRouter();
  const mapRef = useRef(null);

  const {toast} = useToast();
  //the Delete marker confirmation POPUP

   async function getStudentsDestinations(){
      const resp = await fetch('/api/Driver/getStudentsDestinations?idDuty='+(params.get("idDuty") ? params.get("idDuty") : null ));
      if(!resp.ok){
         router.push('/login');  
      }
      else{
        const studentsAndCoordinates = await resp.json();
        if(studentsAndCoordinates){
          setDestinations(studentsAndCoordinates);
        }
      }
     }


     async function completeDuty(){
      const resp = await fetch('/api/Driver/completeDuty?idDuty='+(params.get("idDuty") ? params.get("idDuty") : null ));
      if(!resp.ok){
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: 'try again or refresh the page',
        });
      }
      else{
        setjobIsFinished(true);
      }
     }



     /// get colsest coordinates

     function findClosestCoordinate(destinations) {
      if (!destinations.length && !currentPosition) {
        return null;
      }
    
      let closestCoord = {lat : destinations[0].Adress_lnt ,lng : destinations[0].Adress_lng} ;
      let minDistance = haversineDistance(currentPosition, closestCoord);
    
      for (let i = 1; i < destinations.length; i++) {
        const currentCoord = {lat : destinations[i].Adress_lnt ,lng : destinations[i].Adress_lng};
        const currentDistance = haversineDistance(currentPosition, currentCoord);
    
        if (currentDistance < minDistance) {
          closestCoord = currentCoord;
          minDistance = currentDistance;
        }
      }
    
      return closestCoord;
    }

    

  useEffect(()=>{
   if(!isCurrentPostionSetted && currentPosition){
      setIsCurrentPostionSetted(true);
   }
  },[currentPosition])



    useEffect(()=>{
     if(isCurrentPostionSetted)
     getStudentsDestinations();

    },[isCurrentPostionSetted])

    useEffect(()=>{
      if(destinations){
        if(destinations.length===0){
           // here you have to generate path to home
           completeDuty();
           drawRoute(currentPosition,center); 
        }
        else{
          const closestDestination = findClosestCoordinate(destinations)
          drawRoute(currentPosition,closestDestination)
        }
      }
    },[destinations])


   function filterDestinations(){
       const newDestinations = destinations.filter((detsination,index)=> index !== selectedDestination);
       setDestinations(newDestinations);
   }
  

  const handleShowModel = (destinationId : number) => {
    setSelectedDestination(destinationId);
    setShowModel(true);
  };

  const handleCloseModel = () => {
    setShowModel(false);
  };



  useEffect(() => {
    if (isLoaded && !loadError) {
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition((position) => {
          setCurrentPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        });
      }
    }
  }, [isLoaded, loadError]);

  // useEffect(() => {
  //   if (currentPosition && markers.length > 0) {
  //     const closestMarker = markers.reduce((closest, marker) => {
  //       const closestDistance =
  //         window.google.maps.geometry.spherical.computeDistanceBetween(
  //           new window.google.maps.LatLng(
  //             currentPosition.lat,
  //             currentPosition.lng
  //           ),
  //           new window.google.maps.LatLng(
  //             closest.position.lat,
  //             closest.position.lng
  //           )
  //         );
  //       const markerDistance =
  //         window.google.maps.geometry.spherical.computeDistanceBetween(
  //           new window.google.maps.LatLng(
  //             currentPosition.lat,
  //             currentPosition.lng
  //           ),
  //           new window.google.maps.LatLng(
  //             marker.position.lat,
  //             marker.position.lng
  //           )
  //         );
  //       return markerDistance < closestDistance ? marker : closest;
  //     }, markers[0]);

  //     setDirections([]);
  //     calculateAndDrawRoute(currentPosition, closestMarker.position);
  //   }
  // }, [currentPosition, markers]);

  const drawRoute = (origin, destination) => {
    const directionsService = new window.google.maps.DirectionsService();

    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirection(result);
        } else {
          console.error(`Error fetching directions: ${status}`);
        }
      }
    );
  };


  const rotateMap = (amount) => {
    const currentHeading = mapRef.current.getHeading() || 0; // Get the current heading, default to 0 if not available
    const newHeading = currentHeading + amount; // Calculate the new heading by adding the amount
    mapRef.current.setHeading(newHeading); // Set the new heading to rotate the map
  };

  const tiltMap = (amount) => {
    const currentTilt = mapRef.current.getTilt() || 0; // Get the current tilt, default to 0 if not available
    const newTilt = currentTilt + amount; // Calculate the new tilt by adding the amount
    mapRef.current.setTilt(newTilt); // Set the new tilt to adjust the map tilt
  };


  if (loadError) return <div>Error loading Google Maps</div>;
  return isLoaded ? (
    <div className="relative">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentPosition  ? currentPosition :center}
        zoom={17}
        options={options}
        onLoad={map => mapRef.current = map}
      >
        {currentPosition && (
          <Marker
            position={currentPosition}
            icon={{
              // url: 'https://cdn-icons-png.flaticon.com/512/6213/6213694.png',
              url : '/img/gps.png',
              scaledSize: new window.google.maps.Size(40, 40), // Adjust the size as needed
            }}
          />
        )}

        {destinations && destinations.map((destination,index)=>
          <Marker key={index} position={{lat : destination.Adress_lnt , lng : destination.Adress_lng }} onClick={()=>handleShowModel(index)}/>
        )}
        
        {direction && <DirectionsRenderer directions={direction} />}

      </GoogleMap>
      <div className="map-controls absolute top-[50px] left-[10px]">
        <button onClick={() => rotateMap(-20)}>Rotate Left</button>
        <button onClick={() => rotateMap(20)}>Rotate Right</button>
        <button onClick={() => tiltMap(20)}>Tilt Down</button>
        <button onClick={() => tiltMap(-20)}>Tilt Up</button>
      </div>

      {showModel && (
        <ModelMap  
                  onClose={handleCloseModel}
                  destination = {destinations[selectedDestination]}
                  removeMarker = {filterDestinations} 
        />
      )}


   {jobFinished &&
   <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
     <Card className="w-full max-w-md">
        <CardHeader className="flex items-center justify-between">
          <CardTitle>Your mission has finished</CardTitle>
          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <BuildingIcon className="h-4 w-4" />
            <span className="hover:underline">
              Back Home
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-500 dark:text-gray-400">
            Congratulations on completing your mission! You have successfully accomplished your objectives and can now
            return to your base.
          </p>
          <div className="flex items-center justify-between">
            <Button className="bg-red-500 hover:bg-red-600 text-white" variant="destructive" onClick={()=>router.push('/Application/Driver')}>
              End Job
            </Button>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white" variant="destructive" 
            onClick={()=>setjobIsFinished(false)}
             >

              Back Home
            </Button>
          </div>
        </CardContent>
      </Card>
 </div>
    
   }

    </div>
  ) : null;
};

export default GoogleMapsComponentModal;



function BuildingIcon(props) {
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
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M12 6h.01" />
      <path d="M12 10h.01" />
      <path d="M12 14h.01" />
      <path d="M16 10h.01" />
      <path d="M16 14h.01" />
      <path d="M8 10h.01" />
      <path d="M8 14h.01" />
    </svg>
  )
}