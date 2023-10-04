import React, { useEffect, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chartjs-adapter-moment';
// import moment from 'moment';
import './LeafChart.scss';
import { Chart } from 'chart.js';
import 'chart.js/auto';

// Chart.register(Bar);

export const LeafChart = () => {
  //   const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    // console.log('useEffect is running');
    // if (chartRef.current) {
    //   console.log('Chart ID', chartRef.current.id);
    // } else {
    //   console.log('chartRef.current is not available');
    // }
    if (canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      chartInstance.current = new Chart(context, {
        type: 'bar',
        data: data,
        options: options,
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);
  // 日本のGreenwich Mean Time(GMT)は+9
  const months = [
    { x: Date.parse('2023-01-01 00:00:00 GMT+0900'), y: 4 },
    { x: Date.parse('2023-02-01 00:00:00 GMT+0900'), y: 3 },
    { x: Date.parse('2023-03-01 00:00:00 GMT+0900'), y: 3 },
    { x: Date.parse('2023-04-01 00:00:00 GMT+0900'), y: 3 },
    { x: Date.parse('2023-05-01 00:00:00 GMT+0900'), y: 4 },
    { x: Date.parse('2023-06-01 00:00:00 GMT+0900'), y: 7 },
    { x: Date.parse('2023-07-01 00:00:00 GMT+0900'), y: 9 },
    { x: Date.parse('2023-08-01 00:00:00 GMT+0900'), y: 13 },
    { x: Date.parse('2023-09-01 00:00:00 GMT+0900'), y: 15 },
    { x: Date.parse('2023-10-01 00:00:00 GMT+0900'), y: 16 },
    { x: Date.parse('2023-11-01 00:00:00 GMT+0900'), y: 9 },
    { x: Date.parse('2023-12-01 00:00:00 GMT+0900'), y: 24 },
  ];

  const data = {
    labels: [],
    datasets: [
      {
        label: 'Leaves 🥬',
        data: months,
        backgroundColor: 'springGreen',
        borderColor: 'springGreen',
        borderWidth: 1,
        borderRadius: 10, // 棒グラフの先端に丸みをだす
      },
    ],
  };

  const options = {
    // type: 'bar',
    // data: data,
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'month',
          displayFormats: {
            month: 'MMM', // 月表記を指定('M'～'MMMMM'の4パターン)
          },
        },
        ticks: {
          font: {
            size: 9,
          },
        },
        grid: {
          display: false, // x軸のgrid線
        },
      },
      y: {
        type: 'linear',
        beginAtZero: true,
        ticks: {
          font: {
            size: 10,
          },
        },
        grid: {
          display: true, // y軸のgrid線
        },
      },
    },
    plugins: {
      legend: {
        display: true, // グラフのタイトル
      },
    },
  };

  return (
    <div className="leafChartCard">
      <div className="leafChartBox">
        <Bar data={data} options={options} ref={canvasRef} />
        {/* <div className="ml-8 border border-black-500 py-2 pr-12 rounded-md">
          <span className="text-xs">Total Watering</span>
          <p className="flex">
            <span>
              <BiSolidCheckbox
                className="icon"
                style={{ color: 'rgba(61, 129, 228, 1)' }}
              />
            </span>
            :8
          </p>
          <p className="flex">
            <span>
              <BiSolidCheckbox
                className="icon"
                style={{ color: 'rgba(84, 214, 228, 1)' }}
              />
            </span>
            :12
          </p>
        </div> */}
      </div>
    </div>
  );
};
