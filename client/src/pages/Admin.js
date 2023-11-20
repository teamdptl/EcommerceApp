import NavAdminHeader from "../components/admin/NavAdminHeader";
import { SidebarAdmin } from "../components/admin/SidebarAdmin";
import {useState} from "react";
import AdminProduct from "../components/admin/product/AdminProduct";
import AdminCategoryBrand from "../components/admin/categorybrand/AdminCategoryBrand";
import AdminStatisticTop from "../components/admin/statistic_top/AdminStatisticTop";
import AdminUser from "../components/admin/user/AdminUser";
import AdminOrder from "../components/admin/order/AdminOrder";

const Admin = () => {
	const [isCollapse, setCollapse] = useState(false);
	const [page, setPage] = useState('product');
	return (
		<>
			<NavAdminHeader></NavAdminHeader>
			<div class="flex w-full min-h-[calc(100vh-62px)]">
				<div className={`h-full flex-initial ${isCollapse ? 'w-16' : 'w-64'}`}>
					<SidebarAdmin isCollapse={isCollapse} setCollapse={setCollapse} setPage={setPage}></SidebarAdmin>
				</div>
                <div class="flex-1 bg-zinc-50 grid grid-cols-6 gap-4 p-4">
					{/*{ page === 'product' && <AdminProduct/>}*/}
					{/*{ page === 'product' && <AdminUser/>}*/}
					{ page === 'product' && <AdminOrder/>}
					{ page === 'cateandbrand' && <AdminCategoryBrand/>}
					{ page === 'statistictop' && <AdminStatisticTop/>}
                </div>
			</div>
		</>
	);
};

export default Admin;
