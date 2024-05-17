import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';

const QrReaderCompo = (props) => {
  const [data, setData] = useState('No result');

  return (
    <>
      <QrReader
       containerStyle={{ width: '200px', height: '200px' , margin : "0px auto" }}
       videoStyle={{ width: '100%', height: '100%' }}
        onResult={(result, error) => {
          if (!!result) {
            setData(result?.text);
          }

          if (!!error) {
            console.info(error);
          }
        }}
        style={{ width: '300px' }}
      />
      <p>{data}</p>
    </>
  );
};


export default QrReaderCompo;