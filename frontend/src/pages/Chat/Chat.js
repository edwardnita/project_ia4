import React, { useState, useRef, useEffect } from 'react';
import Page from '../../common/components/Page/Page';
import '../../index.css';
import '../Home/home.css';
import img2 from '../../common/assets/Pinpoint-white.png';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IHome } from '../../common/interfaces/home.interface';
import { postSearch } from '../../common/services/api/cauta';
// import Stats from './components/Stats'; 
import { ISearch } from '../../common/interfaces/cauta.interface';
import { IGetData } from '../../common/interfaces/getData.interface';
import '../Cauta/components/styles.css'
import { chatRequest } from '../../common/services/api/chattext';
import { IChatRequest } from '../../common/interfaces/chattext.interface';

export default function Chat() {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you today?", isUser: false },
  ]);

  const [input, setInput] = useState('');
  const messageContainerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    // Create a new message object for the user's input
    const newMessage = { text: input, isUser: true };
    setMessages([...messages, newMessage]);
    setInput('');
    try {
      // Send the message to the server and await the response
      setIsLoading(true);
    const response = await chatRequest({"subject": newMessage.text});
    console.log(response.data);
      setIsLoading(false);  
      let newMessageFromDB = "";
      if(response.data["keyword"] === "cioaca"){
        newMessageFromDB = "Nu exista in calendar";
      } else {
        newMessageFromDB = "Bazat pe predictiile mele, conform indicelui de puritate de " + response.data["index"] + "/5, cea mai buna ora pentru " + response.data["keyword"] + " este " + response.data["time"];
      }
      // Update the UI with the user's message and the server's response
      setMessages([...messages, newMessage, { text: newMessageFromDB, isUser: false }]);

    } catch (e) {
      // Handle any errors that occur during the server request
      console.error(e);

      // Show an error message using Swal or other notification library
      
    }
    console.log(messages);
  };


  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages]); 


  return (
    <Page>
      <div className='flex flex-col mt-15 lg:mt-10 items-center justify-center'>
        <div className='flex flex-row px-5 mb-6 items-center justify-center text-center'>
          <h1 className='text-2xl  second-title tracking-normal'>
            Intreaba asistentul tau
          </h1>
        </div>

        <div className='mt-2 mb-10 flex justify-center items-center w-5/6'>
          <div className='input-container'>
            <span className='search-icon'>
              <FontAwesomeIcon icon={faSearch} />
            </span>

            <input
              onChange={handleInputChange}
              type='text'
              value={input}
              className='flex-1 p-2 rounded-lg text-white norder-none'
              placeholder='Type a message...'
              style={{ outline: 'none' }}
            />
          </div>
          <button
            className='text-white p-2 rounded-r-lg culoare-buton'
            onClick={handleSendMessage}
            
          >
            Send
          </button>
        </div>

        <div>
      <div
        ref={messageContainerRef}
        className="h-96 border border-black-500 p-2 rounded-lg overflow-y-auto "
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-2 ${message.isUser ? 'text-right' : 'text-left'}`}
          >
            
            <div
              className={`py-2 px-4  d-flex row rounded-lg inline-block ${
                message.isUser ? 'message_color text-white' : 'response_color text-black'
              }`}
            >
             
              {message.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flicker-animation">
            <div key="31431" className="mb-2 text-left">
              
              <span
                className="py-2 px-4 rounded-lg inline-block response_color"
              >
                <div className=" ">...</div>
              </span>
            </div>
          </div>
        )}
      </div>
      
    </div>





        {/* {isMaliciousRequest && (<div>incearca din nou in 30 de secunde</div>)} */}
      </div>
    </Page>
  );
}
