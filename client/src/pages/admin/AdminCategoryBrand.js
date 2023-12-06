import { Button, Checkbox, Table, TextInput } from "flowbite-react";
import { HiOutlinePlus, HiSearch } from "react-icons/hi";
import { TbFilter } from "react-icons/tb";
import { BsFillTrash3Fill } from "react-icons/bs";
import AdminCategoryModal from "../../components/admin/categorybrand/AdminCategoryModal";
import AdminBrandModal from "../../components/admin/categorybrand/AdminBrandModal";
import AdminConfirmModal from "../../components/admin/AdminConfirmModal";
import { useEffect, useState } from "react";
import ManagerHeader from "../../components/admin/ManagerHeader";
import AdminPage from "../../layouts/AdminPage";
import AdminBrandList from "../../components/admin/categorybrand/AdminBrandList";
import AdminCategoryList from "../../components/admin/categorybrand/AdminCategoryList";
import baseUrl from "../../config";

const AdminCategoryBrand = () => {
  const [brand, setBrand] = useState([]);
  const [data, setData] = useState([]);
  const [categoryModalShow, setCategoryModalShow] = useState(false);
  const [brandModalShow, setBrandModalShow] = useState(false);
 
  const fetchData = async () => {
    try {
      const response = await fetch(baseUrl + "/api/v1/category/get");
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchBrand = async () => {
    try {
      const response = await fetch(baseUrl + "/api/v1/brand/get");
      const result = await response.json();
      setBrand(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(()=>{
    fetchData();
    fetchBrand();
  },[]);

  return (
    <AdminPage>
      <div className="col-span-4 bg-white rounded-md border-2 border-zinc-100">
        <ManagerHeader
          title="Quản lý thể loại"
          addCallback={() => setCategoryModalShow(true)}
          //    removeCallback={() => setConfirmModalShow(true)}
        />
        <AdminCategoryList dataFetch = {data} callApi={() => fetchData()} />
      </div>

      <div className="col-span-2 bg-white rounded-md border-2 border-zinc-100">
        <ManagerHeader
          title="Quản lý hãng"
          addCallback={() => setBrandModalShow(true)}
          //    removeCallback={() => setConfirmModalShow(true)}
        />
        <AdminBrandList dataFetchBrand = {brand} callApiBrand={() => fetchBrand()} />
      </div>
      <AdminCategoryModal
        isShow={categoryModalShow}
        closeModal={() => setCategoryModalShow(false)}
        callCategoryModal={() => fetchData()}
      />
      <AdminBrandModal
        isShow={brandModalShow}
        closeModal={() => setBrandModalShow(false)}
        callModalBrand={() => fetchBrand()}
      />
    </AdminPage>
  );
};

export default AdminCategoryBrand;
