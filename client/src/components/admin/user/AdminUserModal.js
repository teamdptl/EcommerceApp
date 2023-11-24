import {Button, Label, Modal, TextInput} from "flowbite-react";
import {useState} from "react";

const AdminUserModal = ({isShow, closeModal}) => {
    return <>
        <Modal dismissible show={isShow} onClose={closeModal}>
            <Modal.Header>Thông tin người dùng</Modal.Header>
            <Modal.Body>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="categoryName" value="Tên người dùng" />
                        </div>
                        <TextInput id="categoryName" type="text" required />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="categoryDescription" value="Email" />
                        </div>
                        <TextInput id="categoryDescription" type="email" required />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="categoryDescription" value="Password" />
                        </div>
                        <TextInput id="categoryDescription" type="password" required />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="categoryDescription" value="Role" />
                        </div>
                        <TextInput id="categoryDescription" type="text" required />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="categoryDescription" value="Hoạt động" />
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

export default AdminUserModal;