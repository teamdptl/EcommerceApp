import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import baseUrl from "../../../config";

const AdminCategoryModal = ({ isShow, callInModal, closeModal, editCategory}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  useEffect(() => {
    if (editCategory) {
      setName(editCategory.name);
      setDescription(editCategory.description);
    }
  }, [editCategory]);

  useEffect(() => {
    console.log(closeModal);
    console.log(callInModal);
  })

  const handleAddCategory = () => {
    // Tạo một đối tượng chứa dữ liệu để gửi lên server
    const newData = {
      name: name,
      description: description,
    };
    // Gửi request đến API
    fetch(baseUrl + "/api/v1/category/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData), // Chuyển đối tượng thành chuỗi JSON
    })
      .then((response) => response.json()) // Chuyển response thành JSON
      .then((data) => {
        // Xử lý dữ liệu từ server nếu cần
        console.log("Success:", data);
      })
      .catch((error) => {
        // Xử lý lỗi nếu có
        console.error("Error:", error);
      });
  };

  const handleEditCategory = () => {
    // Tạo một đối tượng chứa dữ liệu để gửi lên server
    const updateData = {
      name: name,
      description: description,
    };
    // console.log(updateData);
    // Gửi request đến API
    fetch(baseUrl + `/api/v1/category/update/${editCategory.categoryId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData), // Chuyển đối tượng thành chuỗi JSON
    })
      .then((response) => response.json()) // Chuyển response thành JSON
      .then((data) => {
        // Xử lý dữ liệu từ server nếu cần
        console.log("Success:", data);
      })
      .catch((error) => {
        // Xử lý lỗi nếu có
        console.error("Error:", error);
      });
  };

  return (
    <>
      <Modal dismissible show={isShow} onClose={closeModal}>
        <Modal.Header>Thông tin thể loại</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="categoryName" value="Tên thể loại" />
              </div>
              <TextInput
                id="categoryName"
                type="text"
                placeholder="Name"
                value={name}
                onChange={(text) => setName(text.target.value)}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="categoryDescription" value="Mô tả thể loại" />
              </div>
              <TextInput
                id="categoryDescription"
                type="text"
                placeholder="Mô tả"
                value={description}
                onChange={(text) => setDescription(text.target.value)}
                required
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              closeModal();
              if (editCategory && editCategory.categoryId) {
                handleEditCategory();
              }else {
              handleAddCategory();}
            }}
          >
            Lưu
          </Button>
          <Button color="gray" onClick={closeModal}>
            Hủy
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AdminCategoryModal;
