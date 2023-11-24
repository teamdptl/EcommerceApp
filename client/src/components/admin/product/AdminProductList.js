import {Button, Checkbox, Table} from "flowbite-react";
import product from "../../../pages/Product";

const AdminProductList = ({products, deleteIds, setDeleteIds, editCallback}) => {
    return (
        <>
            <Table hoverable>
                <Table.Head className="bg-red-500">
                    <Table.HeadCell className="p-4">
                        <Checkbox/>
                    </Table.HeadCell>
                    <Table.HeadCell>Tên sản phẩm</Table.HeadCell>
                    <Table.HeadCell>Thể loại</Table.HeadCell>
                    <Table.HeadCell>Hãng</Table.HeadCell>
                    <Table.HeadCell>Số lượng</Table.HeadCell>
                    <Table.HeadCell>Giá tiền</Table.HeadCell>
                    <Table.HeadCell>Đã bán</Table.HeadCell>
                    <Table.HeadCell>Đánh giá</Table.HeadCell>
                    <Table.HeadCell>
                        <span className="sr-only">Edit</span>
                    </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {
                        products.map(product => (
                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell className="p-4">
                                    <Checkbox value={deleteIds.includes(product.productId)} onChange={(value) => console.log(value)} />
                                </Table.Cell>
                                <Table.Cell className="whitespace-normal font-medium text-gray-900 dark:text-white">
                                    {product.name}
                                </Table.Cell>
                                <Table.Cell>{product.categoryName}</Table.Cell>
                                <Table.Cell>{product.brandName}</Table.Cell>
                                <Table.Cell>{product.quantity}</Table.Cell>
                                <Table.Cell>{product.price}</Table.Cell>
                                <Table.Cell>{product.orderCount}</Table.Cell>
                                <Table.Cell>{product.rating}</Table.Cell>
                                <Table.Cell>
                                    <Button color="warning" size="sm" onClick={() => editCallback(product)}>
                                        Edit
                                    </Button>
                                </Table.Cell>
                            </Table.Row>
                        ))
                    }
                </Table.Body>
            </Table>
        </>
    )
}

export default AdminProductList;