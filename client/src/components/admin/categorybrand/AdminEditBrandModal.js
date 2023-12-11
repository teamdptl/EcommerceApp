import { useEffect, useState } from "react";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import baseUrl from "../../../config";
import AdminConfirmModal from "../AdminConfirmModal";
import createFetch from "../../../utils/createFetch";

const AdminEditBrandModal = ({ isShow, closeModal, editBrand, callModalBrand, type}) => {
  const [name, setName] = useState("");
  const [confirmModalShow, setConfirmModalShow] = useState(false);

  useEffect(() => {

    if (editBrand) {
      setName(editBrand.name || ""); // Set initial value based on editBrand
    }
  }, [editBrand]);

  const handleEditBrand = () => {
    setConfirmModalShow(true);
    const newBrand = {
      name: name,
    };
    console.log(newBrand);
    createFetch(baseUrl + `/api/v1/brand/update/${editBrand.brandId}`, {
      method: "PUT",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBrand),
    })
      .then((response) => {
        response.json();
      })
      .then((data) => {
        // Xử lý dữ liệu từ server nếu cần
        console.log("Success:", data);
        callModalBrand();
      })

      .catch((error) => {
        console.error(error);
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
                <Label htmlFor="brandName" value="Tên hãng" />
              </div>
              <TextInput
                id="brandName"
                type="text"
                placeholder="Tên hãng"
                value={name}
                onChange={(text) => setName(text.target.value)}
                required
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              closeModal();
              handleEditBrand();
            }}
          >
            Lưu
          </Button>
          <Button color="gray" onClick={closeModal}>
            Hủy
          </Button>
        </Modal.Footer>
      </Modal>
      <AdminConfirmModal
        isShow={confirmModalShow}
        closeModal={() => setConfirmModalShow(false)}
        content="Success!"
        type={'success'}
      />
    </>
  );
};

export default AdminEditBrandModal;
