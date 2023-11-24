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

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Doanh thu theo thứ trong tuần',
        },
    },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
    labels,
    datasets: [
        {
            label: 'Số sản phẩm',
            data: labels.map(() => 3),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: 'Số đơn hàng',
            data: labels.map(() => 5),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
        {
            label: 'Số tiền',
            data: labels.map(() => 5),
            borderColor: 'rgb(294, 191, 149)',
            backgroundColor: 'rgba(94, 191, 149, 0.5)',
        },
    ],
};

const AdminStatisticWeekChart = () => {
    return <>
        <Bar options={options} data={data} />
    </>
}

export default AdminStatisticWeekChart;