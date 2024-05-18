"use client"
import React, { useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import QrReader with no SSR
const QrReader = dynamic(() => import('react-qr-scanner'), { ssr: false });


const QrReaderCompo = ({key}) => {
  const [result, setResult] = useState(null);

  const handleScan = (data) => {
    if (data) {
      setResult(data.text);
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
        delay={300}
        style={previewStyle}
        onError={handleError}
        onScan={handleScan}
        constraints={{
          audio: false,
          video: { facingMode: "environment" }
        }}      
        />
      <p>{result}</p>
    </div>
  );
};

export default QrReaderCompo;
