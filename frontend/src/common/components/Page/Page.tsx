import React from 'react';
import './page.css';
import img1 from '../../assets/header-mobile-green.png';
import { faHamburger, faHome, faMap, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  Route, Link } from 'react-router-dom';

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
    <div className='page flex flex-col '>
      <div className='back'>



      
        <div className='flex items-center justify-start text-center pt-8 navbar'>
          <div className='flex flex-row'>
            <h1 className='pl-10 green'>Green</h1>
            <h1 className='wave '>Wave</h1>
          </div>
        </div>

        <img src={img1} className='mt-[-25px]' alt='mama' /> 
      </div>   
      <div className="">{children}</div>

      <div className='flex flex-row w-full h-16 side justify-around items-center  ' >
        {icons.map((icon: Icon,index:number) => (
          <div className='flex flex-col items-center justify-center' key={index}>
            <Link to={`/${icon.label.toLowerCase()}`}> 
              <FontAwesomeIcon icon={icon.icon} className='text-white' />
             
            </Link>
          </div>

        ))}
        
      </div>
      
    </div>
  );
}
