import { Button, Checkbox, Table } from "flowbite-react";
import { MdEdit } from "react-icons/md";
import { HiOutlineTrash } from "react-icons/hi";
import { useState, useEffect } from "react";
import baseUrl from "../../../config";

const AdminCategoryList = () => {
  const [data, setData] = useState([]);
  const [isChecked, setChecked] = useState(false);
  const [isId, setId] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(baseUrl + "/api/v1/category/get");
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCheckboxChange = (id) => {
    setChecked(!isChecked);
    setId(id);
  };

  const handleDelete = async () => {
    // Sử dụng itemId trong URL hoặc body của yêu cầu DELETE
    if (isId !== null) {
      fetch(baseUrl + `/api/v1/category/delete/${isId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json()) // Chuyển response thành JSON
        .catch((error) => {
          // Xử lý lỗi nếu có
          console.error("Error:", error);
        });
    } else {
      console.warn("Please select an item.");
    }
  };

  return (
    <>
      <Table hoverable>
        <Table.Head className="bg-red-500">
          <Table.HeadCell className="p-4">
            <Checkbox />
          </Table.HeadCell>
          <Table.HeadCell>ID</Table.HeadCell>
          <Table.HeadCell>Tên thể loại</Table.HeadCell>
          <Table.HeadCell>Mô tả thể loại</Table.HeadCell>
          <Table.HeadCell>Thao tác</Table.HeadCell>
        </Table.Head>
        {data ? (
          <Table.Body className="divide-y">
            {data.map((item) => (
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <>
                  <Table.Cell className="p-4">
                    <Checkbox
                      value={isChecked}
                      onChange={() => handleCheckboxChange(item.categoryId)}
                    />
                  </Table.Cell>
                  <Table.Cell>{item.categoryId}</Table.Cell>
                  <Table.Cell>{item.name}</Table.Cell>
                  <Table.Cell>{item.description}</Table.Cell>
                  <Table.Cell className="flex gap-2">
                    <Button color="warning" size="sm">
                      <MdEdit />
                    </Button>
                    <Button
                      gradientMonochrome="failure"
                      size="sm"
                      onClick={handleDelete}
                    >
                      <HiOutlineTrash />
                    </Button>
                  </Table.Cell>
                </>
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

export default AdminCategoryList;
