import React from 'react';
import { Line } from 'react-chartjs-2';
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
import { StatisticIncome } from '@/types/finance-income';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const a = '2024-12'
const b = '2024-11'
const compareMonthYear = (a: string, b: string) => {
    const [aYear, aMonth] = a.split('-').map(Number);
    const [bYear, bMonth] = b.split('-').map(Number);

    if (aYear === bYear) {
        return aMonth - bMonth;
    }

    return aYear - bYear;

}

const IncomeChart = ({ data }: { data: StatisticIncome[] }) => {
    const sortedData = [...data].sort((a, b) => compareMonthYear(a.month_year, b.month_year));
    const labels = sortedData.map(item => item.month_year);
    const incomeData = sortedData.map(item => parseFloat(item.total_income));

    const chartData = {
        labels,
        datasets: [
            {
                label: 'Total Income',
                data: incomeData,
                fill: false,
                borderColor: 'rgba(75,192,192,1)',
                tension: 0.1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
            },
            title: {
                display: true,
                text: 'Monthly Income Statistics',
            },
        },
    };

    return <Line data={chartData} options={options} />;
};

export default IncomeChart;
