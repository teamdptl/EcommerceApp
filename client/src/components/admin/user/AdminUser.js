import {Button, Checkbox, Table, TextInput} from "flowbite-react";
import {HiOutlinePlus, HiSearch} from "react-icons/hi";
import {TbFilter} from "react-icons/tb";
import {BsFillTrash3Fill} from "react-icons/bs";
import AdminUserModal from "./AdminUserModal";
import {useState} from "react";
import ManagerHeader from "../ManagerHeader";

const AdminUser = () => {
    const [adminUserModalShow, setAdminUserModalShow] = useState(false);
    return (
        <>
            <div className="col-span-6 bg-white rounded-md border-2 border-zinc-100">
                <ManagerHeader title="Quản lý người dùng"
                               addTitle="Thêm người dùng"
                               removeTitle="Xóa người dùng"
                               placeHolder="Tên, email, sdt, ..."
                               addCallback={() => setAdminUserModalShow(true)}
                               removeCallback={() => console.log('delete')}
                               searchCallBack={() => console.log('search data')}
                />

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
                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell className="p-4">
                                <Checkbox />
                            </Table.Cell>
                            <Table.Cell>1</Table.Cell>
                            <Table.Cell>
                                <img className="w-10 aspect-square" src="https://cdn-icons-png.flaticon.com/512/9131/9131529.png"></img>
                            </Table.Cell>
                            <Table.Cell>Huỳnh Duy</Table.Cell>
                            <Table.Cell>huykhaduy@gmail.com</Table.Cell>
                            <Table.Cell>Admin</Table.Cell>
                            <Table.Cell>Active</Table.Cell>
                            <Table.Cell>
                                <Button>Edit</Button>
                            </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            </div>
            <AdminUserModal isShow={adminUserModalShow} closeModal={() => setAdminUserModalShow(false)}/>
        </>
    )
}

export default AdminUser;