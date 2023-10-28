import React from 'react';
import './page.css';
import img1 from '../../assets/header-mobile-green.png';

interface IPageProps {
  children: JSX.Element;
}

export default function Page({ children }: IPageProps) {
  return (
    <div className='page flex flex-col '>
      <div className='flex items-center justify-start text-center pt-8'>
        <div className='flex flex-row'>
          <h1 className='pl-10 green'>Green</h1>
          <h1 className='wave '>Wave</h1>
        </div>
      </div>

      <img src={img1} className='mt-[-25px]' alt='mama' /> 
      
      <div className="">{children}</div>
    </div>
  );
}
