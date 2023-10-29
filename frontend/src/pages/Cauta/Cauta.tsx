import React, { useState, useRef, useEffect } from 'react';
import Page from '../../common/components/Page/Page';
import '../../index.css';
import '../Home/home.css';
import img2 from '../../common/assets/Pinpoint-white.png';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IHome } from '../../common/interfaces/home.interface';
import { postSearch } from '../../common/services/api/cauta';
import Stats from './components/Stats'; 
import { ISearch } from '../../common/interfaces/cauta.interface';

export default function Cauta() {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [buttonClickCount, setButtonClickCount] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isError, setIsError] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const [isMaliciousRequest, setIsMaliciousRequest] = useState(false);

  const [searchInfo, setSearchInfo] = useState<ISearch>({
    message: '',
});

  const handleSubmit = async () => {
    if (input.trim() === '' || isButtonDisabled) {
      return;
    }

    setButtonClickCount(buttonClickCount + 1);
    setMessageSent(true);

    if (buttonClickCount >= 1) {
        setIsMaliciousRequest(true);
        return;
    }

    setIsMaliciousRequest(false);

    try {
      setIsLoading(true);

      // Trimiterea mesajului către server utilizând funcția postSearch
      const response = await postSearch(input);
      setSearchInfo(response.data);

      setIsLoading(false);
      

      // Accesarea răspunsului de la server din response.data (sau o altă cheie specifică)
      const serverResponse = response.data;

      // Aici puteți face ce doriți cu răspunsul de la server
      console.log('Răspuns de la server:', serverResponse);

      // Ștergeți conținutul din input după trimitere
      setInput('');
      setIsError(false);
      
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      console.error(error);
      setInput('');
      // Aici puteți gestiona erorile, dacă este necesar
    }
    
  };

  useEffect(() => {
    console.log(buttonClickCount)
    if (buttonClickCount >= 1) {
        console.log('Butonul a fost apăsat deja o data');
      // setIsButtonDisabled(true);

      // Permiteți din nou apăsarea butonului după 15 secunde
      const timer = setTimeout(() => {
      //  setIsButtonDisabled(false);
      setIsMaliciousRequest(false);
        setButtonClickCount(0);
      }, 30000);

      return () => clearTimeout(timer);
    }
  }, [buttonClickCount]);

  return (
    <Page>
      <div className='flex flex-col mt-7 items-center justify-center'>
        <div className='flex flex-row px-5 mb-11 items-center justify-center text-center'>
          <h1 className='text-2xl  second-title tracking-normal'>
            Vezi poluarea de oriunde
          </h1>
        </div>

        <div className='mt-2 flex justify-center items-center w-5/6'>
          <div className='input-container'>
            <span className='search-icon'>
              <FontAwesomeIcon icon={faSearch} />
            </span>

            <input
              onChange={(e) => setInput(e.target.value)}
              type='text'
              value={input}
              className='flex-1 p-2 rounded-lg text-white norder-none'
              placeholder='Type a message...'
              style={{ outline: 'none' }}
            />
          </div>
          <button
            className='text-white p-2 rounded-r-lg culoare-buton'
            onClick={handleSubmit}
            disabled={isButtonDisabled} // Dezactivați butonul dacă isButtonDisabled este true
          >
            Send
          </button>
        </div>
{messageSent &&
        <div className='flex flex-col w-5/6 mb-20'>
            <div>
                {isError ?( <div>
                    <p className='text-red-500 text-center'>Eroare la trimiterea mesajului</p>
                </div>) :(
                    <div>
                        <p className='text-green-500 text-center'>Mesajul a fost trimis cu succes</p>
                        <Stats />
                    </div>
                    
                )}
            </div>
        </div> }
        {isMaliciousRequest && (<div>incearca din nou in 30 de secunde</div>)}
      </div>
    </Page>
  );
}
