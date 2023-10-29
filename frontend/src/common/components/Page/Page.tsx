import React from 'react';
import './page.css';
import img1 from '../../assets/header-mobile-green.png';
import { faHamburger, faHome, faMap, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  Route, Link } from 'react-router-dom';
import ImageChanger from './ImageChanger';

interface IPageProps {
  children: JSX.Element;
}

export default function Page({ children }: IPageProps) {

  type Icon = {
    icon: any; // Aici ar trebui să fie tipul corect pentru iconuri
    label: string;
  };
  
  const icons: Icon[] = [
    { icon: faHome, label: 'acasa' },
    { icon: faMap, label: 'harta' },
    { icon: faSearch, label: 'Cauta' },
    { icon: faHamburger, label: 'Stats' }
    
  ];


  return (
    <div className='page flex flex-col  '>
      <div className='flex flex-col sm:flex-col-reverse'>
      
        <div className='flex items-center justify-start text-center pt-8 sm:pt-5  navbar'>
          <div className='flex flex-row sm:pl-5'>
            <h1 className='pl-10 green text-base sm:text-xl'>Green</h1>
            <h1 className='wave text-base sm:text-xl'>Wave</h1>
          </div>
        </div>

        
        <ImageChanger />
      </div>   
      <div className="">{children}</div>





      <div className='sm:flex sm:flex-row sm:justify-center sm:items-center '>
          <div className='flex flex-row w-full h-16 side justify-around items-center w-full sm:w-3/4 lg:w-1/3 sm:rounded-2xl  ' >
            {icons.map((icon: Icon,index:number) => (
              <div className='flex flex-col items-center justify-center' key={index}>
                <Link to={`/${icon.label.toLowerCase()}`}> 
                  <FontAwesomeIcon icon={icon.icon} className='text-white' />
                
                </Link>
              </div>

            ))}
            
          </div>

      </div>
      
      
    </div>
  );
}
