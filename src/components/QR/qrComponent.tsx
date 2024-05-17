// components/QRCodeGenerator.js

import React from 'react';
import QRCode from 'qrcode.react';

const QRCodeGenerator = ({ jsonData }) => {
  return (
    <div>
      <h2>Booking QR Code</h2>
      {/* Assuming jsonData is a JSON object */}
      <QRCode value={JSON.stringify(jsonData)} />
    </div>
  );
};

export default QRCodeGenerator;
