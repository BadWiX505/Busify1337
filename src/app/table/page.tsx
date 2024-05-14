"use client"

import QRCodeGenerator from "@/components/QR/qrComponent";

export default function Qrcode(){
    const data = {
        name : "Houssam",
        age : 20
    }
    return(
       <div className="w-90 mx-auto px-7">


         <QRCodeGenerator jsonData={data}/>


         </div>
       
        
    );
}