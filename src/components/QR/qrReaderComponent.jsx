"use client"
import React, { useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import QrReader with no SSR
const QrReader = dynamic(() => import('react-qr-scanner'), { ssr: false });


const App = () => {
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
  };

  const scannerOptions = {
    facingMode: "environment", // Use the back camera
  };

  return (
    <div>
      <h1>QR Code Scanner</h1>
      <QrReader
        delay={300}
        style={previewStyle}
        onError={handleError}
        onScan={handleScan}
        facingMode={"environment"} // For compatibility with some browsers
        constraints={scannerOptions} // Pass options to the scanner component
      />
      <p>{result}</p>
    </div>
  );
};

export default App;
