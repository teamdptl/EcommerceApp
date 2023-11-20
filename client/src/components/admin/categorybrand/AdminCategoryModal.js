import {Button, Label, Modal, TextInput} from "flowbite-react";
import {useState} from "react";

const AdminCategoryModal = ({isShow, closeModal}) => {
    return <>
        <Modal dismissible show={isShow} onClose={closeModal}>
            <Modal.Header>Thông tin thể loại</Modal.Header>
            <Modal.Body>
                <div className="space-y-6">
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="categoryName" value="Tên thể loại" />
                        </div>
                        <TextInput id="categoryName" type="text" required />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="categoryDescription" value="Mô tả thể loại" />
                        </div>
                        <TextInput id="categoryDescription" type="text" required />
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

export default AdminCategoryModal;