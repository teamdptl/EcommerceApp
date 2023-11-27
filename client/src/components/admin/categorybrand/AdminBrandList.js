import { Button, Checkbox, Table } from "flowbite-react";
import { MdEdit } from "react-icons/md";
import { HiOutlineTrash } from "react-icons/hi";
import { useState, useEffect } from "react";
import baseUrl from "../../../config";

const AdminBrandList = () => {
  const [brand, setBrand] = useState([]);
  const [isChecked, setChecked] = useState(false);
  const [isId, setId] = useState(null);

  const handleCheckboxChange = (id) => {
    setChecked(!isChecked);
    setId(id);
  };

  const handleDeleteBrand = async () => {
    // Sử dụng itemId trong URL hoặc body của yêu cầu DELETE
    if (isId !== null) {
      fetch(baseUrl + `/api/v1/brand/delete/${isId}`, {
        method: "DELETE",
      })
        .then((response) => console.log(response)) // Chuyển response thành JSON
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
                <Table.Cell className="p-4">
                  <Checkbox
                    value={isChecked}
                    onChange={() => handleCheckboxChange(item.brandId)}
                  />
                </Table.Cell>
                <Table.Cell>{item.brandId}</Table.Cell>
                <Table.Cell>{item.name}</Table.Cell>
                <Table.Cell className="flex gap-2">
                  <Button color="warning" size="sm">
                    <MdEdit />
                  </Button>
                  <Button gradientMonochrome="failure" size="sm" onClick={handleDeleteBrand}>
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
    </>
  );
};

export default AdminBrandList;
