import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'chart.js';
import './stats.css'

const X_RapidAPI_Key: string | undefined = process.env.REACT_APP_X_RapidAPI_Key;
const X_RapidAPI_Host: string | undefined = process.env.REACT_APP_X_RapidAPI_Host;

const options = {
  method: 'GET',
  url: 'https://immobilier-leboncoin.p.rapidapi.com/api/v1/annonces',
  params: {department: '75', type: 'vente', limit: '100'},


  
  headers: {
    'X-RapidAPI-Key': X_RapidAPI_Key,
    'X-RapidAPI-Host': X_RapidAPI_Host
  }
};

// Charts js  bar chart connected to the API Leboncoin
const ChartComponent: React.FC = () => {
  type NewType = {
    city: string;
    original_ad: {
      price: number[];
    };
  };

  const [ads, setAds] =  useState<NewType[]>([]);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    axios.request(options).then(function (response) {
      setAds(response.data.ads);
    }).catch(function (error) {
      console.error(error);
    });
  }, []);

  
  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
       new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ads.map((ad) => ad.city),
            datasets: [{
              label: 'Prix moyen',
        
              data: ads.map((ad) => ad.original_ad.price[0]),
              
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1
            }]
          },
         options: {
           tooltips: {
             callbacks: {
               label: function (tooltipItem) {
                 return tooltipItem.yLabel + ' €';
               }
             }
            },
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          }
        });
      }
    }
  }, [ads]);

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

