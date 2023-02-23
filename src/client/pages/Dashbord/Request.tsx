import React, { useState } from 'react';
import axios from 'axios';
import './button.css'
import ReactTypingEffect from 'react-typing-effect';//typing effect


const X_RapidAPI_Key: string | undefined = process.env.REACT_APP_X_RapidAPI_Key;
const X_RapidAPI_Host: string | undefined = process.env.REACT_APP_X_RapidAPI_Host;

//button
const MyComponent = () => {
  const [data, setData] = useState(null);

  const onClick = async () => {
    try {
      const response = await axios.get(
          'https://seloger.p.rapidapi.com/properties/list?zipCodes=75000&pageIndex=1&pageSize=50&realtyTypes=1&transactionType=1&sortBy=0&includeNewConstructions=true',
          {
              headers: {
                  'X-RapidAPI-Key': X_RapidAPI_Key,
                  'X-RapidAPI-Host': X_RapidAPI_Host,
              },
              
          },
        );
        setData(response.data);
    } catch (error) {
        console.error(error);
      }
    };


  
  return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily : 'V T323', fontWeight: 'bold', fontSize :'1.5em' }}>
          <ReactTypingEffect
              text={["N'hesitez pas à cliquer pour voir la réponse de l'API"]}
              speed={100}
              eraseDelay={700}
              typingDelay={1000}


      />

          <button
              className='request-button'
        onClick={onClick}
            
      >
        Requêtes
      </button>

      
      {data ? (
              <textarea
                  className='request-button'
        rows={7}
        value={JSON.stringify(data, null, 2)}
        readOnly={true}
        style={{
          backgroundColor: 'black',
          color: 'white',
          border: '2px solid lime',
          marginTop: '1rem',
          width: '100%',
          maxWidth: '50rem'
        }}
      />
      
      ) : (
      
        <div style={{ marginTop: '1rem' }}>Pas de données</div>
      )}
    </div>
  );
};


export default MyComponent;
