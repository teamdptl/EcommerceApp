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


const AdminStatisticWeekChart = ({weekData}) => {
    const labels = weekData.map(item => {
        if (item.dayOfWeek === 0)
            return "Thứ 2"
        if (item.dayOfWeek === 1)
            return "Thứ 3"
        if (item.dayOfWeek === 2)
            return "Thứ 4"
        if (item.dayOfWeek === 3)
            return "Thứ 5"
        if (item.dayOfWeek === 4)
            return "Thứ 6"
        if (item.dayOfWeek === 5)
            return "Thứ 7"
        if (item.dayOfWeek === 6)
            return "Chủ nhật"
        return ""
    });

    const data = {
        labels,
        datasets: [
            {
                label: 'Số tiền',
                data: weekData.map(item => item.totalMoney),
                borderColor: 'rgb(294, 191, 149)',
                backgroundColor: 'rgba(94, 191, 149, 0.5)',
            },
            {
                label: 'Số đơn hàng',
                data: weekData.map(item => item.totalOrder),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
                label: 'Số sản phẩm',
                data: weekData.map(item => item.totalQuantity),
                borderColor: 'rgb(239,211,70)',
                backgroundColor: 'rgba(239,211,70, 0.5)',
            },
        ],
    };

    return <>
        <Bar options={options} data={data} />
    </>
}

export default AdminStatisticWeekChart;