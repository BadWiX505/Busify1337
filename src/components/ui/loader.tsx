

export default function Loader(){
    return(
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-10 flex justify-center items-center">
            <div className="flex  justify-center items-center opacity-100 bg-opacity-100" style={{width : '100px',height:'100px',backgroundColor:'#ffffff',borderRadius:'10px'}}>
             <div>
                <img src="/img/loader.gif" className="mt-3"></img> <br></br>
             </div>
               
            </div>
        </div>
    )
}