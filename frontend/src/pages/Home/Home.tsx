import React from 'react';
import Page from '../../common/components/Page/Page'
import '../../index.css'
import './home.css'
import img2 from '../../common/assets/Pinpoint-white.png';
import img3 from '../../common/assets/calendar.png';

export default function Home() {
    return (
    <Page>
        
       <div className='flex flex-col mt-7 items-center justify-center'>
            <div className="flex flex-row px-5 mb-11 items-center justify-center text-center "> 
                <h1 className="text-3xl text-white main-title tracking-normal ">
                    Salut,&nbsp; 
                </h1>
                <h1 className="text-3xl text-white second-title tracking-normal">
                    Eduard
                </h1>
            </div>

        <div className='flex flex-col'>
            <div className=' text-center justify-center calitate'>
                <p className=''> Calitatea mediului în</p>
            </div>
            <div className='flex flex-row text-white items-center justify-center text-center'>
                <img src={img2} className='pinpoint' alt="mama"></img> 
                <p className='locatie tracking-wide' >&nbsp; Bucharest, Bd. Iuliu Maniu:</p>

            </div>
        </div>

        <div className='flex result items-center justify-center text-center mt-11 main-gradient'>
            EXCELENTA
        </div>

        <div className='flex flex-col mt-12'>
            <div className=' text-center justify-center calitate'>
                <p className=''> Calitatea mediului astăzi</p>
            </div>
            <div className='flex flex-row text-white items-center justify-center text-center'>
                <img src={img3} className='pinpoint' alt="mama"></img> 
                <p className='locatie tracking-wide' >&nbsp; 28.10.2023</p>

            </div>
        </div>
        
        
        </div> 
        
   </Page>
    );

}
