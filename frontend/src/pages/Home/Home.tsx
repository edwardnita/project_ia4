import React, { useEffect, useState } from 'react';
import Page from '../../common/components/Page/Page'
import '../../index.css'
import './home.css'


import Card from './components/Card';
import { ICard } from '../../common/interfaces/card.interface';
import { IHome } from '../../common/interfaces/home.interface';
import Salut from './components/Salut';
import Status from './components/Status';
import { getHome } from '../../common/services/api/home';


export default function Home() {

    // const homeInfo: IHome = {
    //     user_name: "Andrei",
    //     location_home: "Bd. Iuliu Maniu, Bucharest",
    //     index_home: 1,
    //     cards: [
    //         {
    //             name: "Nume 1",
    //             location: "Locație 1",
    //             hour: "08:00",
    //             temperature: 23,
    //             index: 1,
    //         },
    //         {
    //             name: "Nume 2",
    //             location: "Locație 2",
    //             hour: "09:00",
    //             temperature: 24,
    //             index: 2,
    //         },
    //         {
    //             name: "Nume 3",
    //             location: "Locație 3",
    //             hour: "10:00",
    //             temperature: 25,
    //             index: 3,
    //         },
    //         {
    //             name: "Nume 3",
    //             location: "Locație 3",
    //             hour: "09:00",
    //             temperature: 25,
    //             index: 4,
    //         },
    //         {
    //             name: "Nume 3",
    //             location: "Locație 3",
    //             hour: "18:00",
    //             temperature: 25,
    //             index: 5,
    //         }
    //     ],
    // };

    // const [cards, setCards] = useState<ICard[]>([]);
    const [homeInfo, setHomeInfo] = useState<IHome>({
        user_name: '',
        location_home: '',
        index_home: 0,
        cards: [],
    });

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
  
    useEffect(() => {
      setIsLoading(true);
  
      getHome()
        .then(response => {
          setHomeInfo(response.data);
  
          setIsError(false);
          setIsLoading(false);
        })
        .catch(() => {
          setIsError(true);
          setIsLoading(false);
        });
    }, []);

    let colorClass = '';
    let text='';

  if (homeInfo.index_home === 4 || homeInfo.index_home  === 5) {
    colorClass = 'bg-gradient-to-l from-green-500 to-green-1000';
    text='EXCELENTA';
  } else if (homeInfo.index_home  === 3) {
    colorClass = 'bg-gradient-to-l from-yellow-500 to-yellow-1000';
    text='MEDIE';
  } else if (homeInfo.index_home  === 1 || homeInfo.index_home === 2) {
    colorClass = 'bg-gradient-to-l from-red-500';
    text='SLABĂ';
  }


    return (
    <Page>
        
    <div className='flex flex-col mt-7 items-center justify-center lg:flex-row lg:justify-around  '>
       
       <div className='sm:mb-28'>
            <div className='flex flex-col items-center justify-center'>
                <Salut 
                user_name={homeInfo.user_name}
                location_home={homeInfo.location_home}
                />

            </div>
            
            <div className="w-full  flex flex-col items-center justify-center" >
                <Status 
                index_home={homeInfo.index_home} 
                    />
            </div>

       </div>
            
            
        <div className='flex flex-col w-5/6 sm:w-1/2 mb-20 sm:mb-28 lg:w-1/3 '>

            {!isLoading ? (
            !isError && homeInfo.cards.length !== 0 ? (
              <div >
                {homeInfo.cards.map((home: ICard) => (
                  <Card
                    key={home.index}
                    name={home.name}
                    location={home.location}
                    hour={home.hour}
                    temperature={home.temperature}
                    index={home.index}
                    
                  />
                ))}
              </div>
                ) : (
                  <p>Esti prost</p>
                )
              ) : (
                <p>Bravo</p>
            )}

            

        </div>
        
        
    </div> 
        
   </Page>
    );

}
