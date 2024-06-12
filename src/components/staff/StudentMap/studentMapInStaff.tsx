// components/GoogleMap.js
import React, { useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const containerStyle = {
  width: '100%',
  height: '490px'
};

const latitude = 32.88230550345956;
const longitude = -6.897831357684987;

const center = {
  lat: latitude,
  lng: longitude
};

const buffer_distance = 0.05;

const north = Math.min(latitude + buffer_distance, 90);
const south = Math.max(latitude - buffer_distance, -90);
const east = longitude + buffer_distance;
const west = longitude - buffer_distance;

const options = {
  restriction: {
    latLngBounds: {
      north: north,
      south: south,
      west: west,
      east: east
    }
  }
};

const GoogleMapsComponentModal = ({ coordinates }) => {
  const [studentPosition, setStudentPosition] = useState(coordinates);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyAH-j0JYMyTZx3A5m0XXFnal0qnCVmKz9M"
  });

  return isLoaded ? (
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
          center={(studentPosition && studentPosition.lat && studentPosition.lng) ? studentPosition : { lat: 0, lng: 0 }}
          zoom={17}
          options={options}
        >
          {studentPosition && <Marker position={studentPosition} />}
        </GoogleMap>
      </DialogContent>
    </>
  ) : <></>;
};

export default GoogleMapsComponentModal;