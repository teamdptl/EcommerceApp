import {Button, Checkbox, Table, TextInput} from "flowbite-react";
import {HiOutlinePlus, HiSearch} from "react-icons/hi";
import {TbFilter} from "react-icons/tb";
import {BsFillTrash3Fill} from "react-icons/bs";
import AdminCategoryModal from "./AdminCategoryModal";
import AdminBrandModal from "./AdminBrandModal";
import AdminConfirmModal from "../AdminConfirmModal";
import {useState} from "react";

const AdminCategoryBrand = () => {
    const [categoryModalShow, setCategoryModalShow] = useState(false);
    const [brandModalShow, setBrandModalShow] = useState(false);
    const [confirmModalShow, setConfirmModalShow] = useState(false);
    return <>
        <div className="col-span-4 bg-white rounded-md border-2 border-zinc-100">
            <div className="p-4 flex justify-between items-center">
                <p className="text-xl font-semibold">Quản lý thể loại</p>
                <div className="flex gap-2">
                    <Button size="sm" gradientMonochrome="success" onClick={() => {
                        setCategoryModalShow(true);
                    }}>
                        <HiOutlinePlus/>
                    </Button>
                    <Button size="sm" gradientMonochrome="failure" onClick={() => {
                        setConfirmModalShow(true);
                    }}>
                        <BsFillTrash3Fill/>
                    </Button>
                </div>
            </div>
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
                <Table.Body className="divide-y">
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell className="p-4">
                            <Checkbox />
                        </Table.Cell>
                        <Table.Cell>Sliver</Table.Cell>
                        <Table.Cell>Sliver</Table.Cell>
                        <Table.Cell>Sliver</Table.Cell>
                        <Table.Cell>
                            <Button color="warning" size="sm">
                                Edit
                            </Button>
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
        </div>

        <div className="col-span-2 bg-white rounded-md border-2 border-zinc-100">
            <div className="p-4 flex justify-between items-center">
                <p className="text-xl font-semibold">Quản lý hãng</p>
                <div className="flex gap-2">
                    <Button size="sm" gradientMonochrome="success" onClick={() => {
                        setBrandModalShow(true);
                    }}>
                        <HiOutlinePlus/>
                    </Button>
                    <Button size="sm" gradientMonochrome="failure" onClick={() => {
                        setConfirmModalShow(true);
                    }}>
                        <BsFillTrash3Fill/>
                    </Button>
                </div>
            </div>
            <Table hoverable>
                <Table.Head className="bg-red-500">
                    <Table.HeadCell className="p-4">
                        <Checkbox />
                    </Table.HeadCell>
                    <Table.HeadCell>ID</Table.HeadCell>
                    <Table.HeadCell>Tên hãng</Table.HeadCell>
                    <Table.HeadCell>Thao tác</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell className="p-4">
                            <Checkbox />
                        </Table.Cell>
                        <Table.Cell>Sliver</Table.Cell>
                        <Table.Cell>Sliver</Table.Cell>
                        <Table.Cell>
                            <Button color="warning" size="sm">
                                Edit
                            </Button>
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
        </div>
        <AdminCategoryModal isShow={categoryModalShow} closeModal={() => setCategoryModalShow(false)}/>
        <AdminBrandModal isShow={brandModalShow} closeModal={() => setBrandModalShow(false)}/>
        <AdminConfirmModal isShow={confirmModalShow} closeModal={() => setConfirmModalShow(false)} content="Bạn muốn xóa nó chứ"/>
    </>
}

export default AdminCategoryBrand;