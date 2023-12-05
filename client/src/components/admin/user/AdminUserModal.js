import { Button, Label, Modal, TextInput, Spinner, Select  } from "flowbite-react";
import { useEffect, useState } from "react";
import useCreateUser from "../../../hooks/useCreateUser";

const AdminUserModal = ({ isShow, closeModal, refreshTable  }) => {
    const { data, errorMsgCreateUser, setErrorMsg,loadingCreateUser, call } = useCreateUser();
    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        password: "",
        role: "USER",
        isDeleted: "FALSE"
    });

    const handleInputChange = (fieldName, value) => {
        setFormData((prevUserData) => ({
            ...prevUserData,
            [fieldName]: value,
        }));
        if (fieldName === 'email' && errorMsgCreateUser === 'Email đã được tạo') {
            setErrorMsg(null);
        }
    };

    const isSaveDisabled = () => {
        return (
            !isValidFullname(formData.fullname) ||
            !isValidEmail(formData.email) ||
            !isValidPassword(formData.password)
        );
    };

    const isValidFullname = (fullname) => {
        return fullname.length >= 3;
    };

    const isValidEmail = (email) => {
        // Simple email validation using regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isEmailError = errorMsgCreateUser === "Email đã được tạo";

        return emailRegex.test(email) && !isEmailError;
    };

    const isValidPassword = (password) => {
        return password.length >= 8;
    };


    const handleSubmit = () => {
        console.log(formData);
        call(formData);
        // closeModal();
    };

    const isFieldValid = (value) => {
        return value !== "" && value !== undefined && value !== null;
    };

    useEffect(() => {
        // console.log("Data:", data);
        refreshTable();
        closeModal();
    }, [data]);

    useEffect(() => {
        // console.log("Err:", errorMsgCreateUser);
    }, [errorMsgCreateUser]);

    return (
        <>
            <Modal dismissible show={isShow} onClose={closeModal}>
                <Modal.Header>Thông tin người dùng</Modal.Header>
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
                            {errorMsgCreateUser === "Email đã được tạo" && (
                                <label className="text-red-500 text-xs">{errorMsgCreateUser}</label>
                            )}
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="categoryDescription" value="Password" />
                            </div>
                            <TextInput
                                id="categoryDescription"
                                value={formData.password}
                                placeholder="Ít nhất 8 kí tự"
                                onChange={(e) => handleInputChange("password", e.target.value)}
                                type="text"
                                required
                                color={isFieldValid(formData.password) ? "success" : null}
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="categoryDescription" value="Role" />
                            </div>
                            <Select id="role" required value={formData.role}  onChange={(e) => handleInputChange("role", e.target.value)}>
                                <option>User</option>
                                <option>Admin</option>
                                <option>Manager</option>
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
                            Lưu
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

export default AdminUserModal;
