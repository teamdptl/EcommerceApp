import {Button, Modal, Select} from "flowbite-react";

const AdminOrderStatusModal = ({showModal, closeModal}) => {
    return <>
        <Modal dismissible show={showModal} onClose={closeModal}>
            <Modal.Header>Thay đổi trạng thái đơn hàng</Modal.Header>
            <Modal.Body>
                <div className="space-y-3">
                    <div className="flex justify-between">
                        <p>
                            Mã đơn hàng: 05
                        </p>
                        <p>
                            Khách hàng: Huỳnh Khánh Duy
                        </p>
                    </div>

                    <p>
                        Trạng thái:
                    </p>
                    <Select id="countries" required>
                        <option>Đang tiếp nhận</option>
                        <option>Đang giao hàng</option>
                        <option>Đã hoàn thành</option>
                        <option>Đã hủy</option>
                    </Select>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={closeModal}>Lưu</Button>
                <Button color="gray" onClick={closeModal}>
                    Hủy
                </Button>
            </Modal.Footer>
        </Modal>
    </>
}

export default AdminOrderStatusModal;