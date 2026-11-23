import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Line } from 'react-chartjs-2';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

import { PrimaryColor } from './stockAnalysisDashboard';

function LineChartContent({priceHistory}:{priceHistory: any}) {
    const lineChartData = {
    labels: priceHistory.date,
    datasets: [
        {
        label: priceHistory.date,
        data: priceHistory.price,
        borderColor: PrimaryColor,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        pointRadius: 0
        }
    ],
    };

    const options = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
            position: 'top' as const,
            },
            title: {
            display: true,
            text: 'Historical Price Chart',
            },
        },
    };
    
    return (
        <Line options={options} data={lineChartData} />
    );
}

export default LineChartContent