import { Pagination } from "flowbite-react";
import {useEffect, useRef, useState} from "react";
import AdminProductSave from "../../components/admin/product/AdminProductSave";
import useProductsFetch from "../../hooks/useProductsFetch";
import ManagerHeader from "../../components/admin/ManagerHeader";
import AdminProductList from "../../components/admin/product/AdminProductList";
import AdminPage from "../../layouts/AdminPage";
import FilterBar from "../../components/shop/FilterBar";
import baseUrl from "../../config";
import AdminConfirmModal from "../../components/admin/AdminConfirmModal";
import {useNavigate} from "react-router-dom";

const AdminProduct = () => {
    const [displayForm, setDisplayForm] = useState(false);
    const [boxConfirm, setBoxConfirm] = useState({content: '', isShow: false});

    const { products, errorMsg, loading, callback, currentPage, maxPage, totalElements} = useProductsFetch();
    const [deleteIds, setDeleteIds] = useState([]);
    const [filter, setFilter] = useState({})
    const [editProductId, setEditProductId] = useState({});
    const [isEdit, setIsEdit] = useState(false);
    const navigate = useNavigate();
    const [isShowFilter, setShowFilter] = useState(false);

    useEffect(() => {
        callback();
    }, []);

    useEffect(() => {
        if (displayForm)
            document.getElementById("productSave").scrollIntoView();
    }, [displayForm])

    useEffect(() => {
        console.log(deleteIds)
    }, [deleteIds]);

    const removeProduct = async () => {
        const promises = deleteIds.map(id => {
            return fetch(baseUrl + `/api/v1/product/delete/${id}`, {
                method: 'DELETE',
            }).then(res => res.json())
        })
        await Promise.all(promises)
        navigate(0);
    }

    return (
        <AdminPage>
            <div className="col-span-6 bg-white rounded-md border-2 border-zinc-100">
                <ManagerHeader title="Quản lý sản phẩm" addTitle="Thêm sản phẩm" removeTitle="Xóa sản phẩm"
                               placeHolder="Tìm kiếm sản phẩm"
                               filterCallback={() => setShowFilter(!isShowFilter)}
                               addCallback={() => {
                                   setIsEdit(false);
                                   setEditProductId(0);
                                   setDisplayForm(true);
                               }}
                               removeCallback={() => {
                                   if (deleteIds.length) setBoxConfirm({content: 'Bạn có muốn xóa sản phẩm đã chọn ?', isShow: true });
                               }}
                               searchCallBack={(text) => {
                                   callback({...filter, title: text})
                               }}
                />

                <div className={`mx-4 mt-2 mb-8 ${isShowFilter ? '' : 'hidden'}`}>
                    <FilterBar onChange={(data) => {
                        callback({...filter, ...data})
                        setFilter({...filter, ...data})
                    }}/>
                </div>

                <AdminProductList products={products}
                                  deleteIds={deleteIds}
                                  setDeleteIds={setDeleteIds}
                                  editCallback={(product) => {
                                      setEditProductId(product.productId)
                                      setIsEdit(true);
                                      setDisplayForm(true);
                                  }}
                />

                {/*Pagination*/}
                { maxPage > 1 &&
                    <>
                        <p className="text-center my-2">Tổng: {totalElements} sản phẩm, mỗi trang 10</p>
                        <div className="flex overflow-x-auto sm:justify-center mb-4">
                            <Pagination currentPage={currentPage + 1} totalPages={maxPage} showIcons onPageChange={(page) => {
                                callback({...filter, page: page - 1});
                            }} />
                        </div>
                    </>
                }
            </div>
            <AdminConfirmModal isShow={boxConfirm.isShow} content={boxConfirm.content} closeModal={() => setBoxConfirm({...boxConfirm, isShow: false})}
                               confirmCallback={removeProduct}/>
            <AdminProductSave productId={editProductId} isEdit={isEdit} show={displayForm} closeForm={() => setDisplayForm(false)}/>
        </AdminPage>
    )
}

export default AdminProduct;
