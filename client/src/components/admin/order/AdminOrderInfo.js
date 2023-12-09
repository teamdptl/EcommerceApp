import {Button, Modal, Select} from "flowbite-react";

const AdminOrderInfo = ({showModal, closeModal, order}) => {
    return <>
        <Modal dismissible show={showModal} onClose={closeModal}>
            <Modal.Header>Thông tin nhận hàng</Modal.Header>
            <Modal.Body>
                <div className="space-y-3">
                    <p>Mã đơn hàng: {order.orderId}</p>
                    <p>Tên người nhận: {order.shipInfoFullname}</p>
                    <p>Số điện thoại: {order.shipInfoPhone}</p>
                    <p>Địa chỉ: {order.shipInfoAddress}</p>
                </div>
            </Modal.Body>
        </Modal>
    </>
}

export default AdminOrderInfo;