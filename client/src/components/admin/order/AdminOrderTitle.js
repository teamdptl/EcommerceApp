import {Button} from "flowbite-react";

const AdminOrderTitle = () => {
    return <>
        <div className="grid grid-cols-8 cursor-pointer select-none items-center rounded-md mb-3">
            <p className="text-center">Mã đơn hàng</p>
            <p className="text-center">Trạng thái</p>
            <p className="text-center">Người mua</p>
            <p className="text-center">Ngày đặt</p>
            <p className="text-center">Tổng tiền</p>
            <p className="text-center">Thanh toán</p>
            <p className="text-center">Hình thức</p>
            <p className="text-center">Thao tác</p>
        </div>
    </>
}

export default AdminOrderTitle;