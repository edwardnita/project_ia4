import img2 from '../../../common/assets/Pinpoint-white.png';

interface HomeInfoProps {
    user_name: string;
    location_home: string;
 
    }


export default function Salut(props: HomeInfoProps) {
    const { user_name, location_home } = props;
  return (
    <div className="">
        <div className="flex flex-row px-5 mb-11 sm:mb-20 items-center justify-center text-center "> 
            <h1 className="text-3xl sm:text-5xl text-white main-title tracking-normal ">
                Salut,&nbsp; 
            </h1>
            <h1 className="text-3xl sm:text-5xl second-title tracking-normal titlu-turbat ">
                {user_name}
            </h1>
        </div>

        <div className='flex flex-col'>
            <div className=' text-center justify-center calitate'>
                <p className=''> Calitatea mediului în</p>
            </div>
            <div className='flex flex-row text-white items-center justify-center text-center'>
                <img src={img2} className='w-3' alt="mama"></img> 
                <p className='locatie tracking-wide' >&nbsp;Locație: {location_home}</p>

            </div>
        </div>

    </div>
  );
}