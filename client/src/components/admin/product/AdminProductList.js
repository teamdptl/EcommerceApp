import {Button, Checkbox, Table} from "flowbite-react";
import product from "../../../pages/Product";
import {MdEdit} from "react-icons/md";

const AdminProductList = ({products, deleteIds, setDeleteIds, editCallback}) => {
    return (
        <>
            <Table hoverable>
                <Table.Head className="bg-red-500">
                    <Table.HeadCell className="p-4">
                        <Checkbox onChange={(e) => {
                            if (!e.target.checked) {
                                setDeleteIds([]);
                            }
                            else {
                                const arr = products.map(item => item.productId)
                                setDeleteIds(arr);
                            }
                        }}/>
                    </Table.HeadCell>
                    <Table.HeadCell>Hình ảnh</Table.HeadCell>
                    <Table.HeadCell>Tên sản phẩm</Table.HeadCell>
                    <Table.HeadCell>Thể loại</Table.HeadCell>
                    <Table.HeadCell>Hãng</Table.HeadCell>
                    <Table.HeadCell>Số lượng</Table.HeadCell>
                    <Table.HeadCell>Giá tiền</Table.HeadCell>
                    <Table.HeadCell>Đã bán</Table.HeadCell>
                    <Table.HeadCell>Đánh giá</Table.HeadCell>
                    <Table.HeadCell>
                        Thao tác
                    </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {
                        products.map(product => (
                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell className="p-4">
                                    <Checkbox checked={deleteIds.includes(product.productId)} onChange={(e) => {
                                        if (e.target.checked) {
                                            setDeleteIds([...deleteIds, product.productId]);
                                        }
                                        else {
                                            const newIds = deleteIds.filter(id => id !== product.productId)
                                            setDeleteIds(newIds);
                                        }
                                    }} />
                                </Table.Cell>
                                <Table.Cell>
                                    <img className="w-16 h-16" src={product.imageUrl} alt={"Ảnh sản phẩm"}></img>
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
                                        <MdEdit/>
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