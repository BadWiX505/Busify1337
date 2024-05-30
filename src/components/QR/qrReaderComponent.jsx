"use client"
import React, { useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import QrReader with no SSR
const QrReader = dynamic(() => import('react-qr-scanner'), { ssr: false });


const QrReaderCompo = ({key,SCchanged,isPlaying}) => {
  //const [result, setResult] = useState(null);

    
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
      {isPlaying &&
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
      }
      {/* <p>{result}</p> */}
    </div>
  );
};

export default QrReaderCompo;
