import { useEffect, useState } from "react";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import baseUrl from "../../../config";

const AdminEditBrandModal = ({ isShow, closeModal, editBrand }) => {
  const [name, setName] = useState("");

  useEffect(() => {
    if (editBrand) {
      setName(editBrand.name || ""); // Set initial value based on editBrand
    }
  }, [editBrand]);

  const handleEditBrand = () => {
    const newBrand = {
      name: name,
    };
    console.log(newBrand);
    fetch(baseUrl + `/api/v1/brand/update/${editBrand.brandId}`, {
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
    </>
  );
};

export default AdminEditBrandModal;
