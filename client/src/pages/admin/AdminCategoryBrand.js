import { Button, Checkbox, Table, TextInput } from "flowbite-react";
import { HiOutlinePlus, HiSearch } from "react-icons/hi";
import { TbFilter } from "react-icons/tb";
import { BsFillTrash3Fill } from "react-icons/bs";
import AdminCategoryModal from "../../components/admin/categorybrand/AdminCategoryModal";
import AdminBrandModal from "../../components/admin/categorybrand/AdminBrandModal";
import AdminConfirmModal from "../../components/admin/AdminConfirmModal";
import { useState } from "react";
import ManagerHeader from "../../components/admin/ManagerHeader";
import AdminPage from "../../layouts/AdminPage";
import AdminBrandList from "../../components/admin/categorybrand/AdminBrandList";
import AdminCategoryList from "../../components/admin/categorybrand/AdminCategoryList";

const AdminCategoryBrand = (isShow, closeModal) => {
//   const [categoryModalShow, setCategoryModalShow] = useState(false);
  const [brandModalShow, setBrandModalShow] = useState(false);
//   const [confirmModalShow, setConfirmModalShow] = useState(false);
  return (
    <AdminPage>
      <div className="col-span-4 bg-white rounded-md border-2 border-zinc-100">
        <ManagerHeader
          title="Quản lý thể loại"
        //   addCallback={() => setCategoryModalShow(true)}
          //    removeCallback={() => setConfirmModalShow(true)}
        />
        <AdminCategoryList />
      </div>

      <div className="col-span-2 bg-white rounded-md border-2 border-zinc-100">
        <ManagerHeader
          title="Quản lý hãng"
          onClose={closeModal}
        //   show={isShow}
          addCallback={() => isShow(true)}
          //    removeCallback={() => setConfirmModalShow(true)}
        />
        <AdminBrandList />
      </div>
      {/* <AdminCategoryModal
        isShow={categoryModalShow}
        closeModal={() => setCategoryModalShow(false)}
      /> */}
      <AdminBrandModal
        isShow={brandModalShow}
        closeModal={() => setBrandModalShow(false)}
      />
      {/* <AdminConfirmModal
        isShow={confirmModalShow}
        closeModal={() => setConfirmModalShow(false)}
        content="Bạn muốn xóa nó chứ"
      /> */}
    </AdminPage>
  );
};

export default AdminCategoryBrand;
