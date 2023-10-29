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



    return (
    <Page>
        
    <div className='flex flex-col mt-7 items-center justify-center lg:flex-row lg:justify-around  '>
       
       <div className='sm:mb-10'>
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
