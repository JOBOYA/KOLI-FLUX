import React, { useState, useEffect } from 'react';
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

// Charts js  bar chart connected to the API Leboncoin
const ChartComponent: React.FC = () => {
  type NewType = {
    Object: {
      city: string;
      price: number;
    };
  };

  const [items, setItems] = useState<NewType[]>([]);
 
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const fetchItems = async () => {
     

      try {
        const response = await axios.request(options);
        const items = response.data.items.map((item: any) => ({
          id: item.id,
          Object: {
            city: item.city,
            price: item.price,
          },
        }));
        setItems(items);
      } catch (error) {
        console.log(error);
      }
    };

    fetchItems();
  }, []);

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
       new Chart(ctx, {
      type: 'bar',
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
      }
    }
  }, [items]);

  return (
    <div>
    <canvas
      id="stats"
      style={{  backgroundColor: 'black', borderRadius: '10px' , width: '100vw', height: '100vw'}}
      ref={canvasRef}   
    />
  </div>
  );
};

export default ChartComponent;

