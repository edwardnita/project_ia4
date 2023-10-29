import React from 'react';
import Page from '../../common/components/Page/Page'
import '../../index.css'
import '../Home/home.css'
import img2 from '../../common/assets/Pinpoint-white.png';
// import Map from './Map';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



import { IHome } from '../../common/interfaces/home.interface';


export default function Harta() {

    const homeInfo: IHome = {
        user_name: "Utilizator",
        location_home: "Bucharest, Bd. Unirii",
        index_home: 3,
        cards: [
            {
                name: "Nume 1",
                location: "Locație 1",
                hour: "08:00",
                temperature: 23,
                index: 1,
            },
            {
                name: "Nume 2",
                location: "Locație 2",
                hour: "09:00",
                temperature: 24,
                index: 2,
            },
            {
                name: "Nume 3",
                location: "Locație 3",
                hour: "10:00",
                temperature: 25,
                index: 3,
            },
            {
                name: "Nume 3",
                location: "Locație 3",
                hour: "10:00",
                temperature: 25,
                index: 4,
            },
            {
                name: "Nume 3",
                location: "Locație 3",
                hour: "10:00",
                temperature: 25,
                index: 5,
            }
        ],
    };

    
    let colorClass = '';
    let text='';

  if (homeInfo.index_home === 4 || homeInfo.index_home  === 5) {
    colorClass = 'bg-gradient-to-l from-green-500 to-green-8000';
    text='EXCELENTA';
  } else if (homeInfo.index_home  === 3) {
    colorClass = 'bg-gradient-to-l from-yellow-500';
    text='MEDIE';
  } else if (homeInfo.index_home  === 1 || homeInfo.index_home === 2) {
    colorClass = 'bg-gradient-to-l from-red-500';
    text='SLABĂ';
  }


    return (
    <Page>
        
       <div className='flex flex-col mt-7 items-center justify-center'>
            <div className="flex flex-row px-5 mb-11 items-center justify-center text-center "> 
                
                <h1 className="text-2xl  second-title tracking-normal">
                    Vezi poluarea de oriunde
                </h1>
            </div>

        

       
         
            <div className="mt-2 flex justify-center items-center w-5/6">
                <div className="input-container">
                <span className="search-icon">
                    <FontAwesomeIcon icon={faSearch} />
                </span>

                    <input
                    
                    type="text"
                    className="flex-1 p-2 rounded-lg text-white norder-none"
                    placeholder="Type a message..."
                    style={{ outline: "none" }}
                    />
                </div>
                <button className="text-white p-2 rounded-r-lg culoare-buton">Send</button>
                </div>




        

        <div className='flex flex-col w-5/6 mb-20  '>

            





        </div>
        
        
        </div> 
        
   </Page>
    );

}
