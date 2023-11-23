import {Button, Checkbox, Table, TextInput} from "flowbite-react";
import {BsFillTrash3Fill} from "react-icons/bs";
import {HiOutlinePlus, HiSearch} from "react-icons/hi";
import {TbFilter} from "react-icons/tb";
import {useEffect, useRef, useState} from "react";
import AdminProductSave from "./AdminProductSave";
import useProductsFetch from "../../../hooks/useProductsFetch";
import ManagerHeader from "../ManagerHeader";
import AdminProductList from "./AdminProductList";

const AdminProduct = () => {
    const [displayForm, setDisplayForm] = useState(false);
    const { products, errorMsg, loading, callback} = useProductsFetch();
    const [deleteIds, setDeleteIds] = useState([]);
    const [filter, setFilter] = useState({})
    const form = useRef(null);

    useEffect(() => {
        console.log('fetch data');
        callback();
    }, []);

    useEffect(() => {
     
    }, [displayForm])

    return <>
        <div className="col-span-6 bg-white rounded-md border-2 border-zinc-100">
            <ManagerHeader title="Quản lý sản phẩm" addTitle="Thêm sản phẩm" removeTitle="Xóa sản phẩm"
                           placeHolder="Tìm kiếm sản phẩm"
                           filterCallback={() => console.log('filter form')}
                           addCallback={() => setDisplayForm(true)}
                           removeCallback={() => console.log('delete')}
                           searchCallBack={() => console.log('search data')}
            />
            <AdminProductList products={products}
                              deleteIds={deleteIds}
                              setDeleteIds={setDeleteIds}
                              editCallback={(product) => console.log(product)}
            />
        </div>

        {/*<AdminProductAddModal product={product} openModal={openModal} setOpenModal={setOpenModal}/>*/}
        <AdminProductSave ref={form} show={displayForm} closeForm={() => setDisplayForm(false)}/>
    </>
}

export default AdminProduct;
