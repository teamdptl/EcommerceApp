import {CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip} from "chart.js";
import {Line} from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
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
            text: 'Doanh thu theo khoảng thời gian',
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
            borderColor: 'rgb(94, 191, 149)',
            backgroundColor: 'rgba(94, 191, 149, 0.5)',
        },
    ],
};

const AdminStatisticChart = () => {
    return <>
        <Line options={options} data={data} />
    </>
}

export default AdminStatisticChart;