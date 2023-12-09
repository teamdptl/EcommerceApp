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

const AdminStatisticChart = ({chartData}) => {
    const labels = chartData.map(item => item.dateLabel);
    const data = {
        labels,
        datasets: [
            {
                label: 'Số tiền',
                data: chartData.map(item => item.totalMoney),
                borderColor: 'rgb(94, 191, 149)',
                backgroundColor: 'rgba(94, 191, 149, 0.5)',
            },
            {
                label: 'Số đơn hàng',
                data: chartData.map(item => item.totalOrder),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
                label: 'Số sản phẩm',
                data: chartData.map(item => item.totalQuantity),
                borderColor: 'rgb(239,211,70)',
                backgroundColor: 'rgba(239,211,70, 0.5)',
            },
        ],
    };

    return <>
        <div className={"mb-8"}>
            <Line options={options} data={data} />
        </div>
    </>
}

export default AdminStatisticChart;