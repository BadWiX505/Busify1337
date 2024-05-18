"use client"


// import QrReaderCompo from '@/components/QR/qrReaderComponent';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default async function Home() {
    const [key, setKey] = useState(0);

    const refreshQrReader = () => {
        setKey(prevKey => prevKey + 1);
    };

    return (

        <>
            <Button className='m-5' onClick={refreshQrReader}>refresh Scanner</Button>
            {/* <QrReaderCompo key={key}/> */}
        </>
    )
}
