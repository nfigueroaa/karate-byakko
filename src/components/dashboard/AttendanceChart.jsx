import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const AttendanceChart = ({ data }) => {
    // Si no hay datos, mostrar ejemplo
    const chartData = data || {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
        datasets: [
            {
                label: 'Asistencia Promedio (%)',
                data: [65, 59, 80, 81, 56, 95],
                backgroundColor: 'rgba(211, 47, 47, 0.6)', // Byakko Red
                borderColor: 'rgba(211, 47, 47, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: '#9ca3af' // gray-400
                }
            },
            title: {
                display: true,
                text: 'Resumen de Asistencia Semestral',
                color: '#9ca3af'
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(156, 163, 175, 0.1)'
                },
                ticks: { color: '#9ca3af' }
            },
            x: {
                grid: {
                    display: false
                },
                ticks: { color: '#9ca3af' }
            }
        }
    };

    return <Bar options={options} data={chartData} />;
};
