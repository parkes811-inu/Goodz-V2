import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const PriceChart = ({ productId }) => {
  const chartRef = useRef(null);
  const charts = useRef({});

  useEffect(() => {
    updateChart('AllTime');
  }, [productId]);

  const fetchPriceHistory = async (period) => {
    try {
      const response = await fetch(`/api/getPriceHistory?period=${period}&pNo=${productId}&size=${selectedSize}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching price history:', error);
      return [];
    }
  };

  const updateChart = async (period) => {
    try {
      const priceHistory = await fetchPriceHistory(period);
      if (!Array.isArray(priceHistory)) {
        throw new Error('Invalid data format: expected an array');
      }

      const labels = priceHistory.map((price) => new Date(price.updatedAt).toLocaleDateString());
      const data = priceHistory.map((price) => price.fluctuatedPrice);

      const chartData = {
        labels: labels,
        datasets: [{
          label: '가격 변동',
          data: data,
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 2,
          fill: false,
        }],
      };

      const ctx = chartRef.current.getContext('2d');
      if (charts.current[period]) {
        charts.current[period].destroy();
      }

      charts.current[period] = new Chart(ctx, {
        type: 'line',
        data: chartData,
        options: {
          responsive: true,
          scales: {
            x: { beginAtZero: false },
            y: { beginAtZero: true },
          },
          plugins: {
            datalabels: {
              display: (context) => context.dataset.data.length === 0,
              anchor: 'center',
              align: 'center',
              font: { weight: 'bold', size: 16 },
              color: 'red',
              formatter: () => '조회한 내역이 없습니다',
            },
          },
        },
        plugins: [ChartDataLabels],
      });
    } catch (error) {
      console.error('Error updating chart:', error);
    }
  };

  return (
    <div className="chart-container">
      <h5 className="text-md-start fw-bold" style={{ paddingRight: 100 }}>시세</h5>
      <ul className="nav nav-tabs" id="priceTab" role="tablist">
        <li className="nav-item">
          <a className="nav-link active" id="all-time-tab" data-bs-toggle="tab" href="#all-time" role="tab" aria-controls="all-time" aria-selected="true">전체</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" id="one-week-tab" data-bs-toggle="tab" href="#one-week" role="tab" aria-controls="one-week" aria-selected="false">1주일</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" id="one-month-tab" data-bs-toggle="tab" href="#one-month" role="tab" aria-controls="one-month" aria-selected="false">1개월</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" id="three-months-tab" data-bs-toggle="tab" href="#three-months" role="tab" aria-controls="three-months" aria-selected="false">3개월</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" id="six-months-tab" data-bs-toggle="tab" href="#six-months" role="tab" aria-controls="six-months" aria-selected="false">6개월</a>
        </li>
      </ul>
      <div className="tab-content">
        <div className="tab-pane fade show active" id="all-time" role="tabpanel" aria-labelledby="all-time-tab">
          <canvas ref={chartRef} id="priceChartAllTime"></canvas>
        </div>
        <div className="tab-pane fade" id="one-week" role="tabpanel" aria-labelledby="one-week-tab">
          <canvas ref={chartRef} id="priceChart1Week"></canvas>
        </div>
        <div className="tab-pane fade" id="one-month" role="tabpanel" aria-labelledby="one-month-tab">
          <canvas ref={chartRef} id="priceChart1Month"></canvas>
        </div>
        <div className="tab-pane fade" id="three-months" role="tabpanel" aria-labelledby="three-months-tab">
          <canvas ref={chartRef} id="priceChart3Months"></canvas>
        </div>
        <div className="tab-pane fade" id="six-months" role="tabpanel" aria-labelledby="six-months-tab">
          <canvas ref={chartRef} id="priceChart6Months"></canvas>
        </div>
      </div>
    </div>
  );
};

export default PriceChart;
