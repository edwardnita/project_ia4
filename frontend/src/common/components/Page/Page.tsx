import React from 'react';
import './page.css';
import img1 from '../../assets/header-mobile-green.png';
import { faHamburger, faHome, faMap, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface IPageProps {
  children: JSX.Element;
}

export default function Page({ children }: IPageProps) {

  type Icon = {
    icon: any; // Aici ar trebui să fie tipul corect pentru iconuri
    label: string;
  };
  
  const icons: Icon[] = [
    { icon: faHome, label: 'Acasa' },
    { icon: faMap, label: 'Harta' },
    { icon: faSearch, label: 'Cauta' },
    { icon: faHamburger, label: 'Stats' }
    
  ];


  return (
    <div className='page flex flex-col '>
      <div className='flex items-center justify-start text-center pt-8'>
        <div className='flex flex-row'>
          <h1 className='pl-10 green'>Green</h1>
          <h1 className='wave '>Wave</h1>
        </div>
      </div>

      <img src={img1} className='mt-[-25px]' alt='mama' /> 
      
      <div className="scroll">{children}</div>

      <div className='flex flex-row w-full h-16 side justify-around items-center  ' >
        {icons.map((icon: Icon) => (
          <div className='flex flex-col items-center justify-center'>
            <FontAwesomeIcon icon={icon.icon} className='text-white' />
            <p className='text-white'>{icon.label}</p>
          </div>
        ))}
        
      </div>
    </div>
  );
}
