import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const PriceChart = ({ period, data }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy(); // 기존 차트 파괴
    }

    console.log('PriceChart data:', data); // 데이터 확인을 위한 로그 추가

    if (!Array.isArray(data) || data.length === 0) {
      console.error('Data is not an array or is empty:', data);
      return;
    }

    const ctx = chartRef.current.getContext('2d');
    chartInstanceRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.map(item => new Date(item.updatedAt).toLocaleDateString()), // 날짜 형식 변경
        datasets: [
          {
            label: 'Price',
            data: data.map(item => item.fluctuatedPrice), // 정확한 필드명 사용
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 2,
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          x: { beginAtZero: false },
          y: { beginAtZero: true }
        },
        plugins: {
          datalabels: {
            display: context => context.dataset.data.length === 0,
            anchor: 'center',
            align: 'center',
            font: {
              weight: 'bold',
              size: 16
            },
            color: 'red',
            formatter: () => '조회한 내역이 없습니다'
          }
        }
      },
      plugins: [ChartDataLabels]
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy(); // 컴포넌트가 언마운트될 때 차트 파괴
      }
    };
  }, [data, period]);

  return <canvas ref={chartRef} id={`priceChart${period}`} />;
};

export default PriceChart;
