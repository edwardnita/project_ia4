import React from 'react';
// import Footer from './Footer';
import './page.css';

interface IPageProps {
  children: JSX.Element;
}

export default function Page({ children }: IPageProps) {
  return (
    <div className='page'>
     
      <div className="">{children}</div>
     
    </div>
  );
}
