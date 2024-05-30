"use client"


// import QrReaderCompo from '@/components/QR/qrReaderComponent';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default async function Home() {
    const [key, setKey] = useState(0);

   

    return (

        <>
            <Button className='m-5' >refresh Scanner</Button>
            {/* <QrReaderCompo key={key}/> */}
        </>
    )
}
