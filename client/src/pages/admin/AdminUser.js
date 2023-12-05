import {
  Button,
  Checkbox,
  Pagination,
  Table,
  TextInput,
  Label,
  Select,
} from "flowbite-react";
import { HiOutlinePlus, HiSearch } from "react-icons/hi";
import { TbFilter } from "react-icons/tb";
import { BsFillTrash3Fill } from "react-icons/bs";
import AdminUserModal from "../../components/admin/user/AdminUserModal";
import AdminEditUserModal from "../../components/admin/user/AdminEditUserModal";

import { useEffect, useState } from "react";
import ManagerHeader from "../../components/admin/ManagerHeader";
import AdminPage from "../../layouts/AdminPage";
import useUsersFetch from "../../hooks/useUsersFetch";
import useGetUser from "../../hooks/useGetUser";

const AdminUser = () => {
  const [adminUserModalShow, setAdminUserModalShow] = useState(false);
  const [lastModified, setLastModified] = useState(Date.now());

  const [adminEditModalShow, setAdminEditModalShow] = useState(false);

  const [userEditId, setUserEditId] = useState(null);

  {
    /*Hook get List and Pagination*/
  }
  //Data Search
  const [dataSearch, setDataSearch] = useState({
    keyword: "",
    userRole: "",
    isDeleted: ""
  });


  const {
    users,
    errorMsg,
    loading,
    currentPage,
    maxPage,
    totalElements,
    handlePageChange,
  } = useUsersFetch(lastModified, 5, dataSearch);
  const { loadingGetUser, dataUser, errorGetUser, callGetUser } = useGetUser();

  //Filter
  const [showFilter, setShowFilter] = useState(false);


  
  const handleInputChange = (fieldName, value) => {
    setDataSearch((prevUserData) => ({
        ...prevUserData,
        [fieldName]: value,
    }));
};

  const refreshTable = () => {
    setLastModified(Date.now());
  };

  const handleEditClick = (userId) => {
    callGetUser(userId);
    setAdminEditModalShow(true);
    setUserEditId(userId);
  };

  useEffect(() => {
    console.log(dataSearch);
  }, [dataSearch])

  return (
    <AdminPage>
      <div className="col-span-6 bg-white rounded-md border-2 border-zinc-100">
        <ManagerHeader
          title="Quản lý người dùng"
          addTitle="Thêm người dùng"
          removeTitle="Xóa người dùng"
          placeHolder="Tìm kiếm người dùng"
          filterCallback={() => setShowFilter(!showFilter)}
          addCallback={() => setAdminUserModalShow(true)}
          searchCallBack={(searchText) =>
            {
                handleInputChange("keyword", searchText);
                // fetchUsers(dataSearch);
            }
            
          }
        />
        {showFilter && (
          <div className={`flex mb-4 gap-4 mx-4 items-center justify-center`}>
            <Label value="Role" />
            <Select id="role" required  onChange={(e) => handleInputChange("userRole", e.target.value)}>
              <option value="">Tất cả</option>
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
              <option value="MANAGER">Manager</option>
            </Select>
            <Label value="Trạng thái" />
            <Select id="isDeleted" required  onChange={(e) => handleInputChange("isDeleted", e.target.value)}>
            <option value="">Tất cả</option>
              <option value="FALSE">Hoạt động</option>
              <option value="TRUE">Không hoạt động</option>
            </Select>
          </div>
        )}
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell className="p-4">
              <Checkbox />
            </Table.HeadCell>
            <Table.HeadCell>ID</Table.HeadCell>
            <Table.HeadCell>Avatar</Table.HeadCell>
            <Table.HeadCell>Họ tên</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Chức vụ</Table.HeadCell>
            <Table.HeadCell>Hoạt động</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {users &&
              users.map((user, index) => (
                <Table.Row
                  key={user.id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell className="p-4">
                    <Checkbox />
                  </Table.Cell>
                  <Table.Cell>{user.id}</Table.Cell>
                  <Table.Cell>
                    <img
                      className="w-10 aspect-square"
                      src="https://cdn-icons-png.flaticon.com/512/9131/9131529.png"
                    ></img>
                  </Table.Cell>
                  <Table.Cell>{user.fullname}</Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell>{user.role}</Table.Cell>
                  <Table.Cell>
                    {user.isDeleted ? "Không hoạt động" : "Hoạt động"}
                  </Table.Cell>
                  <Table.Cell>
                    <Button onClick={() => handleEditClick(user.id)}>
                      Edit
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>
        </Table>
        {/*Pagination*/}
        {maxPage > 1 && (
          <>
            <p className="text-center my-2">
              Tổng: {totalElements} users, mỗi trang 5
            </p>
            <div className="flex overflow-x-auto sm:justify-center mb-4">
              <Pagination
                currentPage={currentPage + 1}
                totalPages={maxPage}
                showIcons
                onPageChange={(page) => {
                  handlePageChange(page - 1);
                }}
              />
            </div>
          </>
        )}
      </div>
      <AdminUserModal
        isShow={adminUserModalShow}
        closeModal={() => setAdminUserModalShow(false)}
        refreshTable={refreshTable}
      />
      <AdminEditUserModal
        isShow={adminEditModalShow}
        closeModal={() => setAdminEditModalShow(false)}
        refreshTable={refreshTable}
        dataUser={dataUser}
        userEditId={userEditId}
      />
    </AdminPage>
  );
};

export default AdminUser;
