import {Button, Checkbox, Table} from "flowbite-react";
import {MdEdit} from "react-icons/md";
import {HiOutlineTrash} from "react-icons/hi";

const AdminBrandList = () => {
    return (
        <>
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
                        <Table.Cell className="flex gap-2">
                            <Button color="warning" size="sm">
                                <MdEdit/>
                            </Button>
                            <Button gradientMonochrome="failure" size="sm">
                                <HiOutlineTrash />
                            </Button>
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
        </>
    )
}

export default AdminBrandList;