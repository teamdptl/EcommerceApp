import { useState } from "react";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import baseUrl from "../../../config";

const AdminBrandModal = ({ isShow, closeModal }) => {
  const [name, setName] = useState("");

  const handleAddBrand = () => {
    const newBrand = {
      name: name,
    };
    console.log(newBrand);
    fetch(baseUrl + "/api/v1/brand/add", {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBrand),
    })
      .then((response) => {
        response.json();
        window.location.reload();
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
              handleAddBrand();
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

export default AdminBrandModal;
