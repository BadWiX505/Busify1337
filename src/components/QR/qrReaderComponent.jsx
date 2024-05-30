"use client"
import React, { useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import QrReader with no SSR
const QrReader = dynamic(() => import('react-qr-scanner'), { ssr: false });


const QrReaderCompo = ({key,SCchanged,isPlaying}) => {
  //const [result, setResult] = useState(null);

    console.log(isPlaying)
  const handleScan = (data) => {
    if (data) {
      SCchanged(data.text);
    }
  };

  const handleError = (err) => {
    console.error(err);
    
  };

  const previewStyle = {
    height: 220,
    width: 320,
    margin : '20px auto'
  };

  

  return (
    <div>
      <QrReader
      key={key}
        delay={2000}
        style={previewStyle}
        onError={handleError}
        onScan={handleScan}
        constraints={{
          audio: false,
          video: { facingMode: "environment" }
        }}      
        />
      
    </div>
  );
};

export default QrReaderCompo;
