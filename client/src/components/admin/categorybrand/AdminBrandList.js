import { Button, Checkbox, Table } from "flowbite-react";
import { MdEdit } from "react-icons/md";
import { HiOutlineTrash } from "react-icons/hi";
import { useState, useEffect } from "react";
import baseUrl from "../../../config";
import AdminConfirmModal from "../AdminConfirmModal";
import AdminEditBrandModal from "./AdminEditBrandModal";

const AdminBrandList = () => {
  const [brand, setBrand] = useState([]);
  const [isId, setId] = useState(null);

  const [confirmModalShow, setConfirmModalShow] = useState(false);
  const [brandModalShow, setBrandModalShow] = useState(false);

  const [editBrand, setEditBrand] = useState({});

  const handleShowEditBrand = (isBrand) => {
    // console.log(isBrand);
    setEditBrand(isBrand);
    setBrandModalShow(true);
  };

  const handleCheckboxChange = (id) => {
    setId(id);
  };

  const handleDeleteBrand = async () => {
    // Sử dụng itemId trong URL hoặc body của yêu cầu DELETE
    if (isId !== null) {
      fetch(baseUrl + `/api/v1/brand/delete/${isId}`, {
        method: "DELETE",
      })
        .then((response) => {
          console.log(response);
          fetchBrand();
          // window.location.reload();
        }) // Chuyển response thành JSON
        .catch((error) => {
          // Xử lý lỗi nếu có
          console.error("Error:", error);
        });
    } else {
      console.warn("Please select an item.");
    }
  };

  const fetchBrand = async () => {
    try {
      const response = await fetch(baseUrl + "/api/v1/brand/get");
      const result = await response.json();
      setBrand(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchBrand();
  }, []);

  return (
    <>
      <Table hoverable>
        <Table.Head className="bg-red-500">
          <Table.HeadCell className="p-4"></Table.HeadCell>
          <Table.HeadCell>ID</Table.HeadCell>
          <Table.HeadCell>Tên hãng</Table.HeadCell>
          <Table.HeadCell>Thao tác</Table.HeadCell>
        </Table.Head>
        {brand ? (
          <Table.Body className="divide-y">
            {brand.map((item) => (
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="p-4"></Table.Cell>
                <Table.Cell>{item.brandId}</Table.Cell>
                <Table.Cell>{item.name}</Table.Cell>
                <Table.Cell className="flex gap-2">
                  <Button
                    color="warning"
                    size="sm"
                    onClick={() => {
                      handleShowEditBrand(item);
                    }}
                  >
                    <MdEdit />
                  </Button>
                  <Button
                    gradientMonochrome="failure"
                    size="sm"
                    onClick={() => {
                      setConfirmModalShow(true);
                      handleCheckboxChange(item.brandId);
                    }}
                  >
                    <HiOutlineTrash />
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        ) : (
          <p>Loading...</p>
        )}
      </Table>
      <AdminConfirmModal
        isShow={confirmModalShow}
        closeModal={() => setConfirmModalShow(false)}
        content="Bạn muốn xóa nó chứ"
        confirmCallback={handleDeleteBrand}
      />
      <AdminEditBrandModal
        isShow={brandModalShow}
        closeModal={() => setBrandModalShow(false)}
        editBrand={editBrand}
        callModalBrand = {fetchBrand}
          />
    </>
  );
};

export default AdminBrandList;
