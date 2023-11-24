import {useState} from "react";
import {Button, Label, Modal, TextInput} from "flowbite-react";

const AdminBrandModal = ({isShow, closeModal}) => {
    return <>
        <Modal dismissible show={isShow} onClose={closeModal}>
            <Modal.Header>Thông tin thể loại</Modal.Header>
            <Modal.Body>
                <div className="space-y-6">
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="brandName" value="Tên hãng" />
                        </div>
                        <TextInput id="brandName" type="text" required />
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => closeModal()}>Lưu</Button>
                <Button color="gray" onClick={closeModal}>
                    Hủy
                </Button>
            </Modal.Footer>
        </Modal>
    </>
}

export default AdminBrandModal;