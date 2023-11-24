import NavAdminHeader from "../components/admin/NavAdminHeader";
import {SidebarAdmin} from "../components/admin/SidebarAdmin";
import {useAdminCollapse} from "../components/admin/AdminCollapseProvider";

const AdminPage = ({children}) => {
    const { isCollapse } = useAdminCollapse();
    return <>
        <NavAdminHeader/>
        {/*Admin content*/}
        <div className="flex w-full min-h-[calc(100vh-62px)]">
            <div className={`h-full flex-initial ${isCollapse ? 'w-16' : 'w-64'}`}>
                <SidebarAdmin></SidebarAdmin>
            </div>
            <div className="flex-1 bg-zinc-50 grid grid-cols-6 gap-4 p-4">
                { children }
            </div>
        </div>
    </>
}

export default AdminPage;