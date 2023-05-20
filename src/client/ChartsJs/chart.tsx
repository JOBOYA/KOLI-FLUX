import React from 'react';
import Chart from 'chart.js';
import './chart.css';



const ChartJs: React.FC = () => {
    const chartRef = React.useRef<HTMLCanvasElement>(null);

    React.useEffect(() => {
        const myChartRef: CanvasRenderingContext2D | null | undefined = chartRef.current?.getContext("2d");

        // @ts-ignore


        new Chart(myChartRef, {
            type: "line",
            data: {
                //Bring in data
                labels: ["Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin", "Juillet"],
                datasets: [
                 
                    {
                        label: "Ventes immobilières 2023",
                        data: [2100, 2150, 2300, 2362, 2500, 2700, 2903],
                        fill: false,
                        backgroundColor: "rgb(255, 99, 132)",
                        borderColor: "rgba(255, 99, 132, 0.2)",
                    },
                ],

            },
            options: {
                //Custom chart options
               
              
            },
        });
    }, []);

    return (
        <div>
            <canvas
                id="myChart"
                ref={chartRef}
            />  

        </div>
    );
};

export default ChartJs;
/**
 * --------------------------------------------------------
 * This demo was created using amCharts V4 preview release.
 * 
 * V4 is the latest installement in amCharts data viz
 * library family, to be released in the first half of
 * 2018.
 *
 * For more information and documentation visit:
 * https://www.amcharts.com/docs/v4/
 * --------------------------------------------------------
 */



