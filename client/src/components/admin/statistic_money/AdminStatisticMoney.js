import ManagerHeader from "../ManagerHeader";
import {Button, Datepicker, Label} from "flowbite-react";
import React from "react";
import AdminStatisticChart from "./AdminStatisticChart";
import AdminStatisticWeekChart from "./AdminStatisticWeekChart";

const AdminStatisticMoney = () => {
    return <>
        <div className="col-span-6 bg-white rounded-md border-2 border-zinc-100">
            <ManagerHeader title={"Thống kê doanh thu"}/>
            <div className={`flex mb-4 gap-4 mx-4 items-center justify-center`}>
                <Label value="Từ ngày" />
                <Datepicker language="vi-VN" labelTodayButton="Hôm nay" labelClearButton="Xóa" maxDate={new Date()}/>
                <Label value="Đến ngày" />
                <Datepicker language="vi-VN" labelTodayButton="Hôm nay" labelClearButton="Xóa" maxDate={new Date()}/>
                <Button>Tra cứu</Button>
            </div>
            <div class="flex">
                <div class="border border-cyan-300">
                    <p>
                        Tổng sản phẩm bán
                    </p>
                    <p>
                        50
                    </p>
                </div>
            </div>
            <AdminStatisticChart/>
            <AdminStatisticWeekChart/>
        </div>
    </>
}

export default AdminStatisticMoney;