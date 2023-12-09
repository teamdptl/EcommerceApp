import {Button, Modal} from "flowbite-react";
import {HiOutlineExclamationCircle} from "react-icons/hi";
import {useState} from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { IoCloseCircleOutline } from "react-icons/io5";
import { TiWarning } from "react-icons/ti";

const AdminConfirmModal = ({isShow, closeModal, content, confirmCallback, type}) => {
    const closeAndCallback = () => {
        closeModal()
        confirmCallback()
    }
    return <>
        <Modal dismissible show={isShow} size="md" onClose={closeModal} popup>
            <Modal.Header />
            <Modal.Body>
                <div className="text-center">
                    {
                        (type === "success") ? <FaCircleCheck className="mx-auto mb-4 h-14 w-14 text-green-600 dark:text-gray-200" /> :
                        (type === "fail") ? <IoCloseCircleOutline className="mx-auto mb-4 h-14 w-14 text-red-700 dark:text-gray-200" /> : <TiWarning className="mx-auto mb-4 h-14 w-14 text-yellow-400 dark:text-gray-200"/>
                    }
                    {/* <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" /> */}
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                        {content}
                    </h3>
                    <div className="flex justify-center gap-4">
                        {
                            (type === "success") ? <Button color="success" onClick={closeModal}>Ok</Button> :
                            (type === "fail") ? <Button color="failure" onClick={closeModal}>Ok</Button> : 
                            (<><Button color="warning" onClick={() => closeAndCallback()}>
                                Xác nhận
                            </Button>
                            <Button color="gray" onClick={closeModal}>
                                Không
                            </Button></>)
                        }
                        
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    </>
}

export default AdminConfirmModal;