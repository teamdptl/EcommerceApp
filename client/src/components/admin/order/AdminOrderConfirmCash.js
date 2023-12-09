import {Button, Modal} from "flowbite-react";
import {FaRegCircleCheck} from "react-icons/fa6";

const AdminOrderConfirmCash = ({showModal, closeModal, order, handleConfirm}) => {
    
    return <>
        <Modal dismissible show={showModal} size="md" onClose={closeModal} popup>
            <Modal.Header />
            <Modal.Body>
                <div className="text-center">
                    <FaRegCircleCheck className="mx-auto mb-4 h-14 w-14 text-green-400"/>
                    {order.paymentStatus ? <>
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Đã thu tiền
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button color="success" onClick={closeModal}>
                                OK
                            </Button>
                            {/* <Button color="gray" onClick={closeModal}>
                                Chưa thu
                            </Button> */}
                        </div>
                    </> : 
                    <>
                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                Bạn xác nhận đã thu tiền đơn hàng này ?
                            </h3>
                            <div className="flex justify-center gap-4">
                                <Button color="success" onClick={() => handleConfirm(order.orderId)}>
                                    Đã thu tiền
                                </Button>
                                {/* <Button color="gray" onClick={closeModal}>
                                    Chưa thu
                                </Button> */}
                            </div>
                        </>
                    }
                </div>
            </Modal.Body>
        </Modal>
    </>
}

export default AdminOrderConfirmCash;