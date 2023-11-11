import NavAdminHeader from "../components/admin/NavAdminHeader";
import { SidebarAdmin } from "../components/admin/SidebarAdmin";

const Admin = () => {
	return (
		<>
			<NavAdminHeader></NavAdminHeader>
			<div class="flex w-full">
				<div class="w-64 h-full flex-initial">
					<SidebarAdmin></SidebarAdmin>
				</div>
                <div class="flex-1">
                   
                </div>
			</div>
		</>
	);
};

export default Admin;
