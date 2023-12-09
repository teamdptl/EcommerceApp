import ManagerHeader from "../../components/admin/ManagerHeader";
import {Button, Datepicker, Label} from "flowbite-react";
import React, {useEffect, useState} from "react";
import AdminStatisticChart from "../../components/admin/statistic_money/AdminStatisticChart";
import AdminStatisticWeekChart from "../../components/admin/statistic_money/AdminStatisticWeekChart";
import AdminPage from "../../layouts/AdminPage";
import {FaMoneyBillTrendUp} from "react-icons/fa6";
import {IoCart} from "react-icons/io5";
import {FaBoxOpen} from "react-icons/fa";
import createFetch from "../../utils/createFetch";
import baseUrl from "../../config";
import formatMoney from "../../utils/currency";

const AdminStatisticMoney = () => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);
    const previousMonth = new Date();
    previousMonth.setMonth(previousMonth.getMonth() - 1);

    const [chartData, setChartData] = useState([]);
    const [weekData, setWeekData] = useState([]);
    const [dateFrom, setDateFrom] = useState(new Date(previousMonth.toDateString()));
    const [dateTo, setDateTo] = useState(new Date(currentDate.toDateString()));

    const loadChartData = () => {
        createFetch(baseUrl + `/api/v1/statistic/chart?fromDate=${dateFrom.getTime()}&toDate=${dateTo.getTime()}`)
            .then(res => res.json())
            .then(data => setChartData(data))
            .catch(err => console.log(err))
    }

    const loadWeekData = () => {
        createFetch(baseUrl + `/api/v1/statistic/weekly?fromDate=${dateFrom.getTime()}&toDate=${dateTo.getTime()}`)
            .then(res => res.json())
            .then(data => setWeekData(data))
            .catch(err => console.log(err))
    }

    const onSearch = () => {
        loadChartData();
        loadWeekData();
    }

    useEffect(() => {
        onSearch();
    }, []);

    const getTotalOrders = () => {
        let sum = 0;
        if (chartData && chartData.length > 0){
            sum = chartData.reduce((s, item) => s + item.totalOrder, 0)
        }
        return sum;
    }

    const getTotalMoney = () => {
        let sum = 0;
        if (chartData && chartData.length > 0){
            sum = chartData.reduce((s, item) => s + item.totalMoney, 0)
        }
        return sum;
    }

    const getTotalQuantity = () => {
        let sum = 0;
        if (chartData && chartData.length > 0){
            sum = chartData.reduce((s, item) => s + item.totalQuantity, 0)
        }
        return sum;
    }

    return <AdminPage>
        <div className="col-span-6 bg-white rounded-md border-2 border-zinc-100">
            <ManagerHeader title={"Thống kê doanh thu"}/>
            <div className={`flex mb-4 gap-4 mx-4 items-center justify-center`}>
                <Label value="Từ ngày" />
                <Datepicker language="vi-VN" labelTodayButton="Hôm nay" labelClearButton="Xóa" value={dateFrom.toLocaleDateString("vi-VN")} onSelectedDateChanged={setDateFrom}  maxDate={currentDate}/>
                <Label value="Đến ngày" />
                <Datepicker language="vi-VN" labelTodayButton="Hôm nay" labelClearButton="Xóa" value={dateTo.toLocaleDateString("vi-VN")} onSelectedDateChanged={setDateTo} maxDate={currentDate}/>
                <Button onClick={() => onSearch()}>Tra cứu</Button>
            </div>
            <div class="flex justify-center gap-6 my-8">
                <div className="shadow-md rounded-md flex items-center w-64 h-24 p-4">
                    <div className={"mr-4 w-16 h-16 rounded-full bg-green-500 flex justify-center items-center"}>
                        <FaMoneyBillTrendUp color={"white"} size={25}/>
                    </div>
                    <div>
                        <p className={"text-slate-800 text-lg font-semibold"}>Doanh thu</p>
                        <p className={"text-gray-600"}>{formatMoney(getTotalMoney())}</p>
                    </div>
                </div>
                <div className="shadow-md rounded-md flex items-center w-64 h-24 p-4">
                    <div className={"mr-4 w-16 h-16 rounded-full bg-blue-500 flex justify-center items-center"}>
                        <IoCart color={"white"} size={25}/>
                    </div>
                    <div>
                        <p className={"text-slate-800 text-lg font-semibold"}>Số đơn hàng</p>
                        <p className={"text-gray-600"}>{getTotalOrders()} đơn hàng</p>
                    </div>
                </div>
                <div className="shadow-md rounded-md flex items-center w-64 h-24 p-4">
                    <div className={"mr-4 w-16 h-16 rounded-full bg-yellow-400 flex justify-center items-center"}>
                        <FaBoxOpen color={"white"} size={25}/>
                    </div>
                    <div>
                        <p className={"text-slate-800 text-lg font-semibold"}>Số sản phẩm</p>
                        <p className={"text-gray-600"}>{getTotalQuantity()} sản phẩm</p>
                    </div>
                </div>
            </div>
            <div className={"mx-8"}>
                <AdminStatisticChart chartData={chartData}/>
                <AdminStatisticWeekChart weekData={weekData}/>
            </div>

        </div>
    </AdminPage>
}

export default AdminStatisticMoney;