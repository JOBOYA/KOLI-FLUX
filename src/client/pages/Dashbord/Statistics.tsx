import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Chart from 'chart.js';
import './stats.css'

const X_RapidAPI_Key: string | undefined = process.env.REACT_APP_X_RapidAPI_Key;
const X_RapidAPI_Host: string | undefined = process.env.REACT_APP_X_RapidAPI_Host;

const options = {
  method: 'GET',
  url: 'https://seloger.p.rapidapi.com/properties/list',
  params: { zipCodes: '75000', pageIndex: '1', pageSize: '50', realtyTypes: '1', transactionType: '1', sortBy: '0', includeNewConstructions: 'true' },
  headers: {
    'X-RapidAPI-Key': X_RapidAPI_Key,
    'X-RapidAPI-Host': X_RapidAPI_Host
  }
};

// Charts js  bar chart connected to the seloger Leboncoin
const ChartComponent: React.FC = () => {
  type NewType = {
    Object: {
      city: string;
      price: number;
    };
  };

  const [items, setItems] = useState<NewType[]>([]);
  const [city, setCity] = useState<string>('');
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);
  const [isSearchButtonClicked, setIsSearchButtonClicked] = useState<boolean>(false);

  useEffect(() => {
    axios
      .request(options) 
      .then(function (response) {
        setItems(response.data.result.items);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      const chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: items.map((item) => item.Object.city),
          datasets: [
            {
              label: 'Prix',
              data: items.map((item) => item.Object.price),
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
        },
      });
      chartRef.current = chart;
    }
  }, [items]);

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  const handleSearchButtonClick = () => {
    setIsSearchButtonClicked(true);
  };

  useEffect(() => {
    if (isSearchButtonClicked) {
      const newOptions = {
        ...options,
        params: {
          ...options.params,
          zipCodes: city,

        },
      };

      axios
        .request(newOptions)
        .then(function (response) {
          setItems(response.data.result.items);
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  }, [isSearchButtonClicked, city]);





  return (
    <div>
      <div>
        <label htmlFor="city">Ville :</label>
        <input type="text" id="city" value={city} onChange={handleCityChange} style={{ margin: '10px' , borderRadius: '10px', width: '100px', height: '20px'}} />
        <button className='btn bg-secondary' onClick={handleSearchButtonClick}>Rechercher</button>
      </div>
      <canvas
        id="stats"
        style={{ backgroundColor: 'black', borderRadius: '10px', width: '100vw', height: '100vw' }}
        ref={canvasRef}
      />
    </div>
  );
};

export default ChartComponent;