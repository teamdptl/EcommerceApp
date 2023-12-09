import NavAdminHeader from "../components/admin/NavAdminHeader";
import {SidebarAdmin} from "../components/admin/SidebarAdmin";
import {useAdminCollapse} from "../context/AdminCollapseContext";
import Header from "./Header";

const AdminPage = ({children}) => {
    const { isCollapse } = useAdminCollapse();
    return <>
        <Header isAdmin={true}/>
        {/*Admin content*/}
        <div className="flex w-full min-h-[calc(100vh-68px)]">
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