import {Button, Modal, Select} from "flowbite-react";

const AdminOrderInfo = ({showModal, closeModal}) => {
    return <>
        <Modal dismissible show={showModal} onClose={closeModal}>
            <Modal.Header>Thông tin nhận hàng</Modal.Header>
            <Modal.Body>
                <div className="space-y-3">
                    <p>Mã đơn hàng: 01</p>
                    <p>Tên người nhận: Huỳnh Khánh Duy</p>
                    <p>Số điện thoại: 0365336991</p>
                    <p>Địa chỉ: 312/92/3 Au Duong Lan Phuong 3 Quan 8</p>
                </div>
            </Modal.Body>
        </Modal>
    </>
}

export default AdminOrderInfo;