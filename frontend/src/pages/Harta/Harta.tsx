import React from 'react';
import Page from '../../common/components/Page/Page'
import '../../index.css'
import '../Home/home.css'
import img2 from '../../common/assets/Pinpoint-white.png';
// import Map from './Map';
import img5 from '../../common/assets/poluare.png'
// import Map from './Map';



import { IHome } from '../../common/interfaces/home.interface';
import IframeComponent from './Iframe';

export default function Harta() {

    


    return (
    <Page>
        
        <div className='flex flex-col mt-7 items-center justify-center'>
            
            <div className="flex flex-row px-5 mb-11 items-center justify-center text-center "> 
                
                <h1 className="text-2xl  second-title tracking-normal">
                    Poluarea în zona ta
                </h1>
            </div>

            <div className='flex flex-col'>
                
                <div className='flex flex-row text-white items-center justify-center text-center'>
                    <img src={img2} className='w-3' alt="mama"></img> 
                    <p className='locatie tracking-wide' >&nbsp;Bd. Iuliu Maniu</p>

                </div>
            </div>
            <div>
                <div className={`items-center justify-center  mt-11 mb-10  `}>
                    {/* <img src={img5} className='flex flex-row'></img> */}
                    <IframeComponent />
                    {/* <Map /> */}
                    
                </div>

                <div className='flex flex-col mt-12 mb-10'>
                    <div className=' text-center justify-center calitate2'>
                        <p className=''> Cum estimăm că va evolua poluarea</p>
                    </div>
                    
                </div>

            </div>

            

            {/* <div className='flex flex-col w-5/6 mb-20  '>

                


            </div> */}
        
        
        </div> 
        
   </Page>
    );

}
