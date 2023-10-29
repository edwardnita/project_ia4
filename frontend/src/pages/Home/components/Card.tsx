import React from 'react';
import img2 from '../../../common/assets/Pinpoint-white.png';
import '../../Home/home.css';

interface PartenerItemProps {
  name: string;
  location: string;
  hour: string;
  temperature: number;
  index: number;
}

export default function Card(props: PartenerItemProps) {
  const { name, location, hour, temperature, index } = props;

  // Definim o variabilă pentru a stoca clasa CSS în funcție de index
  let colorClass = '';

  if (index === 4 || index === 5) {
    colorClass = 'bg-gradient-to-r from-green-500';
  } else if (index === 3) {
    colorClass = 'bg-gradient-to-r from-yellow-500';
  } else if (index === 1 || index === 2) {
    colorClass = 'bg-gradient-to-r from-red-500';
  }

  return (
    <div className={`flex flex-row justify-between div-gri text-white rounded-2xl mb-5 `}>
      <div className='flex flex-row items-center justify-center'>
        <p className='text-lg ora'>{hour}</p>
      </div>

      <div className='flex flex-col justify-center'>
        <p className='text-left activitate'>&nbsp;{name}</p>
        <div className='flex flex-row items-center justify-center'>
          <img src={img2} className='opac' />
          <p className='event-locatie'>&nbsp;{location}</p>
        </div>
      </div>

      <div className='flex flex-row items-center justify-center'>
        <p className='grade'>{temperature}°C</p>
      </div>

      <div className={`flex flex-row items-center justify-center rating rounded-2xl ${colorClass}`}>
        {index}/5
      </div>
    </div>
  );
}
