import React, { useEffect, useState } from 'react';
import {IHome} from '../../../common/interfaces/home.interface';
import {getHome} from '../../../common/services/api/home';
import './styles.css'
import img1 from '../../../common/assets/Pinpoint-white.png'
import img3 from '../../../common/assets/sun.png'
import img2 from '../../../common/assets/run.png'
import img4 from '../../../common/assets/leaf.png'


interface IStatsProps {
    index: number;
    temperature: number;
    city_name: string;

    // polen_code: number;
}


export default function Stats(props : IStatsProps) {
    const {index,temperature,city_name} = props;
    let colorClass = '';

  if (index === 4 || index === 5) {
    colorClass = 'bg-gradient-to-r from-green-500';
  } else if (index === 3) {
    colorClass = 'bg-gradient-to-r from-yellow-500';
  } else if (index === 1 || index === 2) {
    colorClass = 'bg-gradient-to-r from-red-500';
  }


    return (
        <div className="w-full rounded-lg p-2 flex flex-col ">
                <div className="flex flex-row space-x-4 h-20 mb-4">
                    <div className="w-3/5 bg-green-200 rounded-lg p-2 bg1 flex flex-row justify-center items-center">
                        <img src={img1} className='w-3'></img>
                        <p className='text-white tx1'>&nbsp;{city_name}</p>
                    
                    </div>
                    <div className={`w-2/5 bg-red-200 rounded-lg p-4 text-white  flex flex-col justify-center items-center ${colorClass}`}>
                        {/* {polen_code} */}
                        <p className='tx1'>Calitate</p>
                        <p className='tx2 text-2xl flex flex-row'>{index}/5</p>

                    </div>

                </div>
                <div className="flex flex-row space-x-4 h-20">
                    <div className="w-1/3 flex flex-col justify-center items-center bg-yellow-200 rounded-lg p-4 bg3">
                        <img src={img3} className='w-5 pb-1'></img>
                        <p className='tx2 flex flex-row'>{Math.round(temperature)}°C</p>
                    </div>
                    <div className="w-1/3 flex flex-col justify-center items-center bg-yellow-200 rounded-lg p-4 bg2">
                        <img src={img2} className='w-5 pb-1'></img>
                        <p className='tx2 flex flex-row'>5/5</p>
                    </div>
                    <div className="w-1/3 flex flex-col justify-center items-center bg-yellow-200 rounded-lg p-4 bg2">
                        <img src={img4} className='w-5 pb-1'></img>
                        <p className='tx2 flex flex-row'>5/5</p>
                    </div>
                </div>
                </div>
    );
}