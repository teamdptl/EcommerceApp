import {Button, Checkbox, Table, TextInput} from "flowbite-react";
import {BsFillTrash3Fill} from "react-icons/bs";
import {HiOutlinePlus, HiSearch} from "react-icons/hi";
import {TbFilter} from "react-icons/tb";
import {useEffect, useState} from "react";
import AdminProductSave from "./AdminProductSave";
import useProductsFetch from "../../../hooks/useProductsFetch";

const AdminProduct = () => {
    // const [products, errorMsg, loading, callback] = useProductsFetch();
    const [displayForm, setDisplayForm] = useState(false);

    useEffect(() => {
        // callback();
        console.log('init');
        return () => {
            console.log('remove')
        }
    }, []);

    return <>
        <div className="col-span-6 bg-white rounded-md border-2 border-zinc-100">
            <div class="p-4 flex justify-between items-center">
                <div class="flex gap-6 items-center">
                    <p className="text-xl font-semibold">Quản lý sản phẩm</p>
                    <div class="flex gap-2">
                        <TextInput type="text" icon={HiSearch } placeholder="Tên sản phẩm" sizing="md" />
                        <Button color="gray" pill>
                            <TbFilter />
                        </Button>
                        <Button>
                            Tìm kiếm
                        </Button>
                    </div>
                </div>
                <div class="flex gap-2">
                    <Button size="sm" gradientMonochrome="success" onClick={() => {
                        setDisplayForm(true);
                    }}>
                        <HiOutlinePlus className="mr-2"/> Thêm sản phẩm
                    </Button>
                    <Button size="sm" gradientMonochrome="failure">
                        <BsFillTrash3Fill className="mr-2"/> Xóa sản phẩm
                    </Button>
                </div>
            </div>
            <Table hoverable>
                <Table.Head className="bg-red-500">
                    <Table.HeadCell className="p-4">
                        <Checkbox />
                    </Table.HeadCell>
                    <Table.HeadCell>Tên sản phẩm</Table.HeadCell>
                    <Table.HeadCell>Thể loại</Table.HeadCell>
                    <Table.HeadCell>Hãng</Table.HeadCell>
                    <Table.HeadCell>Số lượng</Table.HeadCell>
                    <Table.HeadCell>Giá tiền</Table.HeadCell>
                    <Table.HeadCell>
                        <span className="sr-only">Edit</span>
                    </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell className="p-4">
                            <Checkbox />
                        </Table.Cell>
                        <Table.Cell className="whitespace-normal font-medium text-gray-900 dark:text-white">
                            {'Apple MacBook Pro 17"'}
                        </Table.Cell>
                        <Table.Cell>Sliver</Table.Cell>
                        <Table.Cell>Sliver</Table.Cell>
                        <Table.Cell>Laptop</Table.Cell>
                        <Table.Cell>$2999</Table.Cell>
                        <Table.Cell>
                            <Button color="warning" size="sm">
                                Edit
                            </Button>
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
        </div>

        {/*<AdminProductAddModal product={product} openModal={openModal} setOpenModal={setOpenModal}/>*/}
        {displayForm && <AdminProductSave closeForm={() => setDisplayForm(false)}/>}
    </>
}

export default AdminProduct;
