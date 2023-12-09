import {Button, Modal, Select} from "flowbite-react";
import { useEffect } from "react";
import {useState} from "react"
import baseUrl from "../../../config";

const AdminOrderStatusModal = ({showModal, closeModal, order, saveStatus}) => {
    const [status, setStatus] = useState(0);
    useEffect(() => {
        setStatus(order.orderStatus)
    }, [order, showModal])        

    return <>
        <Modal dismissible show={showModal} onClose={closeModal}>
            <Modal.Header>Thay đổi trạng thái đơn hàng</Modal.Header>
            <Modal.Body>
                <div className="space-y-3">
                    <div className="flex justify-between">
                        <p>
                            Mã đơn hàng: {order ? order.orderId : ""}
                        </p>
                        <p>
                            Khách hàng: {order ? order.shipInfoFullname : ""}
                        </p>
                    </div>

                    <p>
                        Trạng thái:
                    </p>
                    <Select id="countries" value={status} onChange={e => setStatus(e.target.value)} required>
                        <option value={1}>Đang tiếp nhận</option>
                        <option value={2}>Đang giao hàng</option>
                        <option value={3}>Đã hoàn thành</option>
                        <option value={4}>Đã hủy</option>
                    </Select>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => saveStatus(order.orderId, status)}>Lưu</Button>
                <Button color="gray" onClick={closeModal}>
                    Hủy
                </Button>
            </Modal.Footer>
        </Modal>
    </>
}

export default AdminOrderStatusModal;