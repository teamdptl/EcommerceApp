import {createContext, useContext, useEffect, useState} from "react";

const AdminCollapseContext = createContext();
export const useAdminCollapse = () => useContext(AdminCollapseContext);
const AdminCollapseProvider = ({children}) => {
    const [isCollapse, setCollapse] = useState(false);

    return <AdminCollapseContext.Provider value={{isCollapse, setCollapse}}>
        {children}
    </AdminCollapseContext.Provider>
}

export default AdminCollapseProvider;