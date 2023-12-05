import { Button, Label, Modal, TextInput, Spinner, Select } from "flowbite-react";
import { useEffect, useState } from "react";
import useEditUser from "../../../hooks/useEditUser";
import useGetUser from "../../../hooks/useGetUser";


const AdminEditUserModal = ({ isShow, closeModal, refreshTable, dataUser, userEditId  }) => {
    const { dataEdit, errorMsgEditUser, setErrorMsg,loadingCreateUser, callEdit } = useEditUser();

    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        role: "USER",
        isDeleted: "FALSE"
    });

    const handleInputChange = (fieldName, value) => {
        setFormData((prevUserData) => ({
            ...prevUserData,
            [fieldName]: value,
        }));
        if (fieldName === 'email' && errorMsgEditUser === 'Email đã tồn tại trong hệ thống') {
            setErrorMsg(null);
        }
    };

    const isValidFullname = (fullname) => {
        return fullname.length >= 3;
    };

    const isValidEmail = (email) => {
        // Simple email validation using regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isEmailError = errorMsgEditUser === "Email đã tồn tại trong hệ thống";

        return emailRegex.test(email) && !isEmailError;
    };

    const isSaveDisabled = () => {
        return (
            !isValidFullname(formData.fullname) ||
            !isValidEmail(formData.email)
        );
    };

    useEffect(() => {
        console.log(dataUser);
        if (dataUser) {
            setFormData({
                fullname: dataUser.fullname || "",
                email: dataUser.email || "",
                role: dataUser.role ,
                isDeleted: dataUser.isDeleted 
            });
        }

    },[dataUser])

    const handleSubmit = () => {
        // console.log(formData);
        callEdit(formData, userEditId);
        // closeModal();
    };

    const isFieldValid = (value) => {
        return value !== "" && value !== undefined && value !== null;
    };

    useEffect(() => {
        console.log("Data:", dataEdit);
        refreshTable();
        closeModal();
    }, [dataEdit]);

    useEffect(() => {
        console.log("Err:", errorMsgEditUser);
    }, [errorMsgEditUser]);

    return (
        <>
            <Modal dismissible show={isShow} onClose={closeModal}>
                <Modal.Header>Thông tin người dùng: {userEditId}</Modal.Header>
                <Modal.Body>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="categoryName" value="Tên người dùng" />
                            </div>
                            <TextInput
                                id="categoryName"
                                type="text"
                                value={formData.fullname}
                                placeholder="VD: Nguyễn Văn A"
                                onChange={(e) => handleInputChange("fullname", e.target.value)}
                                required
                                color={isFieldValid(formData.fullname) ? "success" : null}
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="categoryDescription" value="Email" />
                            </div>
                            <TextInput
                                id="categoryDescription"
                                value={formData.email}
                                placeholder="VD: nguyenvana@gmail.com"
                                onChange={(e) => handleInputChange("email", e.target.value)}
                                type="email"
                                required
                                color={isFieldValid(formData.email) ? "success" : null}
                            />
                            {errorMsgEditUser === "Email đã tồn tại trong hệ thống" && (
                                <label className="text-red-500 text-xs">{errorMsgEditUser}</label>
                            )}
                        </div>
                    
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="categoryDescription" value="Role" />
                            </div>
                            <Select id="role" required value={formData.role}  onChange={(e) => handleInputChange("role", e.target.value)}>
                                <option value="USER">User</option>
                                <option value="ADMIN">Admin</option>
                                <option value="MANAGER">Manager</option>
                            </Select>
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="categoryDescription" value="Hoạt động" />
                            </div>
                            <Select id="isDeleted" required value={formData.isDeleted}  onChange={(e) => handleInputChange("isDeleted", e.target.value)}>
                            <option value="False">Hoạt động</option>
                                <option value="True">Không hoạt động</option>
                            </Select>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    {loadingCreateUser ? (
                        <Button disabled>
                            <Spinner aria-label="Spinner button example" size="sm" />
                            <span className="pl-3">Loading...</span>
                        </Button>
                    ) : (
                        <Button onClick={handleSubmit} disabled={isSaveDisabled()}>
                            Edit
                        </Button>
                    )}
                    <Button color="gray" onClick={closeModal}>
                        Hủy
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    );
};

export default AdminEditUserModal;
