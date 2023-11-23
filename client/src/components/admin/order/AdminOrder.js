import ManagerHeader from "../ManagerHeader";
import AdminOrderItem from "./AdminOrderItem";
import AdminOrderTitle from "./AdminOrderTitle";
import AdminOrderStatusModal from "./AdminOrderStatusModal";
import React, {useState} from "react";
import AdminOrderInfo from "./AdminOrderInfo";
import AdminOrderConfirmCash from "./AdminOrderConfirmCash";
import DatePickerFromTo from "../statistic_top/DatePickerFromTo";
import {Datepicker, Label, Select} from "flowbite-react";

const AdminOrder = () => {
    // Trạng thái đơn hàng
    const [showOrderStatus, setShowOrderStatus] = useState(false);
    // Thông tin nhận hàng
    const [showOrderInfo, setShowOrderInfo] = useState(false);
    // Xác nhận thu tiền
    const [showConfirm, setShowConfirm] = useState(false);

    //Filter
    const [showFilter, setShowFilter] = useState(false);

    const openOrderStatus = (e, orderId) => {
        e.stopPropagation();
        console.log(orderId);
        // Code here
        setShowOrderStatus(true);
    }

    const openOrderInfo = (e, orderId) => {
        e.stopPropagation();
        // Code here
        setShowOrderInfo(true);
    }

    const openConfirm = (e, orderId) => {
        e.stopPropagation();
        // Code here
        setShowConfirm(true);
    }


    return (
        <>
            <div className="col-span-6 bg-white rounded-md border-2 border-zinc-100">
                <ManagerHeader title="Thông tin đơn hàng"
                               searchCallBack={() => console.log("tim kiem")}
                               placeHolder="Mã đơn, sdt, người mua"
                               filterCallback={() => setShowFilter(!showFilter)}
                               exportCallback={() => console.log("export excel")}
                />
                {showFilter &&
                    <div className={`flex mb-4 gap-4 mx-4 items-center justify-center`}>
                        <Label value="Từ ngày" />
                        <Datepicker language="vi-VN" labelTodayButton="Hôm nay" labelClearButton="Xóa" maxDate={new Date()}/>
                        <Label value="Đến ngày" />
                        <Datepicker language="vi-VN" labelTodayButton="Hôm nay" labelClearButton="Xóa" maxDate={new Date()}/>
                        <Label value="Trạng thái" />
                        <Select id="countries" required>
                            <option>Tất cả</option>
                            <option>Đang tiếp nhận</option>
                            <option>Đang giao hàng</option>
                            <option>Đã hoàn thành</option>
                            <option>Đã hủy</option>
                        </Select>
                    </div>
                }

                <div className="px-4">
                    <AdminOrderTitle/>
                    <AdminOrderItem openInfo={openOrderInfo} openStatus={openOrderStatus} openConfirm={openConfirm}/>
                    <AdminOrderItem openInfo={openOrderInfo} openStatus={openOrderStatus} openConfirm={openConfirm}/>
                </div>
            </div>
            <AdminOrderStatusModal showModal={showOrderStatus} closeModal={() => setShowOrderStatus(false)}/>
            <AdminOrderInfo showModal={showOrderInfo} closeModal={() => setShowOrderInfo(false)}/>
            <AdminOrderConfirmCash showModal={showConfirm} closeModal={() => setShowConfirm(false)}/>
        </>
    )
}

export default AdminOrder;