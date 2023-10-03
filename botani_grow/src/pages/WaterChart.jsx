import React, { useMemo, useEffect, useRef } from 'react';
// import { Line } from 'react-chartjs-2';
import 'chartjs-chart-matrix';

import 'chartjs-plugin-datalabels';
import 'chartjs-adapter-moment';
import 'chart.js/auto';

import { Chart as ChartComponent } from 'react-chartjs-2';
import { MatrixController, MatrixElement } from 'chartjs-chart-matrix';

// ↑component外、↓component内

{
  /* <ChartComponent
    type="matrix"
    data={data}
    options={options}
/> */
}
import {
  Chart,
  TimeScale,
  LineController,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';
import moment from 'moment';
import './WaterChart.scss';

Chart.register(
  TimeScale,
  LineController,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  MatrixController,
  MatrixElement
);

export const WaterChart = () => {
  const chartRef = useRef(null); // チャートのインスタンスを保持するためのref
  const canvasRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      chartInstance.current = new Chart(context, {
        type: 'matrix',
        data: data,
        options: options,
      });
    }
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy(); // コンポ―ネントのクリーンアップ時にチャートを消去する
      }
    };
  }, []);
  // 以前のコードからデータ生成ロジックを利用
  const eventDays = ['2023-09-05', '2023-09-09', '2023-09-10'];
  // date settings
  function getWaterAmount() {
    const amounts = ['large', 'medium', 'small'];
    const randomIndex = Math.floor(Math.random() * amounts.length);
    return amounts[randomIndex]; // large, medium, smallをランダムで出力
  }

  function isoDayOfWeek(dt) {
    let wd = dt.getDay(); // 0-6(日-土)を取得し、wdに代入
    wd = ((wd + 6) % 7) + 1; // 1-7(月-日)に変換
    return '' + wd; // wd(数値)を文字列として返すために ''と連結する
  }
  const data = useMemo(() => {
    // generateData や他のデータ生成ロジック
    function generateData() {
      const d = new Date(); // 現在の日付と時刻を生成
      console.log(d);
      const today = new Date( // 現在の年,月,日,時間,分,秒,ミリ秒の情報を取得 (時間,分,秒,ミリ秒は0で設定)
        d.getFullYear(),
        d.getMonth(),
        d.getDate(),
        0,
        0,
        0,
        0
      );
      const data2 = [];
      const end = today;
      let dt = new Date(new Date().setDate(end.getDate() - 365)); // 現在の日付から365日前(1年前)の日付を求めている
      while (dt <= end) {
        const iso = dt.toISOString().slice(0, 10); //　dtの最初の10文字(年,月,日)を文字列で取得
        // console.log(iso);
        data2.push({
          x: iso,
          y: isoDayOfWeek(dt), // 月～日
          d: iso,
          v: Math.random() * 50, // 最大50。この数値が大きいほど、ヒートマップの色が暗くなる
        });
        dt = new Date(dt.setDate(dt.getDate() + 1)); // stを1日進めて、次の日付に移動
      }
      console.log(data2);
      return data2;
    }
    return {
      datasets: [
        // ...以前のコードからdatasetの設定をコピー
        {
          label: 'Heat Map',
          data: generateData(), // ヒートマップデータを生成する関数、generateData() の結果を使用
          backgroundColor(c) {
            if (!c.dataset || !c.dataset.data || !c.dataset.data[c.dataIndex])
              return 'rgba(255, 255, 255, 1)'; // デフォルトの色を返す

            const value = c.dataset.data[c.dataIndex].d; // セルの日付を取得

            const isEventDay = eventDays.includes(value); // イベントが行われた日かどうか判定

            let color = 'rgba(255, 255, 255, 1)'; // デフォルトの色

            if (isEventDay) {
              const waterSize = getWaterAmount(); // 上げた水の量(large, medium, smallのいずれか)を取得
              if (waterSize === 'large') {
                color = `rgba(61, 129, 228, 1)`; // largeのセルは濃い青
              } else if (waterSize === 'medium') {
                color = `rgba(84, 214, 228, 1)`; // mediumのセルはやや薄い青
              } else if (waterSize === 'small') {
                color = `rgba(187, 224, 228, 1)`; // smallのセルはさらに薄い青
              }
              return color; // イベント日のセルの色をリターンする
            } else {
              return `rgba(255, 255, 255, 1)`; // イベント日でないセルは白色
            }
          },

          borderColor: 'gray', // セルの枠線の色
          borderRadius: 1, // 境界線の丸角度
          borderWidth: 1, // 境界線の幅
          hoverBackgroundColor: 'rgba(255, 26, 104, 0.2)', //　ホバー時の背景色 (赤色)
          hoverBorderColor: 'rgba(255, 26, 104, 0.2)', // ホバー時の境界の色(赤色)
          width(c) {
            console.log('width method called');
            console.log(c.chart);
            const a = c.chart.chartArea || {};
            console.log(a);
            return (a.right - a.left) / 53 - 1; // ヒートマップのセルの幅を計算 (53: 1年あたりの週数)
          },
          height(c) {
            console.log('height method called');
            console.log(c.chart);
            const a = c.chart.chartArea || {};
            console.log(a);
            return (a.bottom - a.top) / 7 - 1; // ヒートマップのセルの高さを計算。 (7: 1週間あたりの日数)
          },
        },
      ],
    };
  }, []); // useMemoの依存配列

  const scales = {
    y: {
      type: 'time',
      offset: true,
      time: {
        unit: 'day',
        round: 'day',
        isoWeek: 1,
        parser: 'i',
        parser: 'YYYY-MM-DD',
        displayFormats: {
          day: 'dd',
        },
      },
      reverse: true,
      position: 'right',
      ticks: {
        maxRotation: 0,
        autoSkip: true,
        padding: 1,
        font: {
          size: 7, // y軸のフォントサイズ
        },
      },
      grid: {
        display: false, // grid横線が消える
        drawBorder: false, // 軸線
        tickLength: 0, // 目盛線の長さ
      },
    },
    x: {
      type: 'time',
      position: 'bottom',
      offset: true,
      time: {
        unit: 'week',
        round: 'week',
        isoWeekDay: 1,
        displayFormats: {
          month: 'MMM',
        },
      },
      ticks: {
        maxRotation: 0,
        autoSkip: true,
        font: {
          size: 9, // x軸のフォントサイズ
        },
      },
      grid: {
        display: false, // x軸のgrid線
        drawBorder: false,
        tickLength: 0,
      },
    },
  };

  const options = {
    type: 'matrix',
    data,
    animation: false, // アニメーションを無効にする
    maintainAspectRatio: false /* ← chartの形状を保つために追加したコード */,
    // responsive: true,
    scales: scales,
    plugins: {
      legend: {
        display: false, // 表題の表示をオフ
      },
      tooltip: {
        enabled: true,
        titleFont: {
          size: 10, // タイトルのフォントサイズ
        },
        bodyFont: {
          size: 10, // 本文のフォントサイズ
        },
        callbacks: {
          title(context) {
            // ホバー時の表示設定
            // console.log(context);
            const value = context[0].raw.d; // セルの日付を取得
            const isEventDay = eventDays.includes(value);
            if (isEventDay) {
              return `1 watered on ${moment(value).format(
                'dddd, MMMM D YYYY'
              )} `; // 水をあげた日の場合
            } else {
              return `No watering on ${moment(value).format(
                'dddd, MMMM D YYYY'
              )} `; // 水をあげていない日の場合
            }
          },
          label() {
            return ''; // ラベルを空にすることで日付のみ表示
          },
        },
      },
    },
  };

  return (
    <div className="waterChartContainer">
      <div className="waterChartMenu">
        <span>"x" waterings in the last year.</span>
      </div>
      <div className="waterChartCard">
        <div className="waterChartBox">
          <ChartComponent
            type="matrix"
            data={data}
            options={options}
            ref={canvasRef}
          />
        </div>
      </div>
    </div>
  );
};
