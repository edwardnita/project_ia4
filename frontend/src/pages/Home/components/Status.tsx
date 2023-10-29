import img3 from '../../../common/assets/calendar.png';
import '../home.css'
import CurrentTime from './CurrentTime';

interface StatusInfoProps {
    index_home: number;

}

export default function Status (props: StatusInfoProps) {
    const { index_home } = props;

    let colorClass = '';
    let text='';

  if (index_home === 4 || index_home  === 5) {
    colorClass = 'bg-gradient-to-l from-green-500 to-green-1000';
    text='EXCELENTA';
  } else if (index_home  === 3) {
    colorClass = 'bg-gradient-to-l from-yellow-500 to-yellow-1000';
    text='MEDIE';
  } else if (index_home  === 1 || index_home === 2) {
    colorClass = 'bg-gradient-to-l from-red-500';
    text='SLABĂ';
  }

    return (
        <div className=" mt-10">
            <div className={`flex result items-center justify-center text-center mt-11 main-gradient p-5   ${colorClass}`}>
            {text}
            </div>

            <div className='flex flex-col mt-12 mb-10'>
                <div className=' text-center justify-center calitate'>
                    <p className=''> Calitatea mediului astăzi</p>
                </div>
                <div className='flex flex-row text-white items-center justify-center text-center'>
                    <img src={img3} className='w-3' alt="mama"></img> 
                    <p className='locatie tracking-wide flex flex-row' >&nbsp; <CurrentTime /></p>

                </div>
            </div>

        </div>

    );

}