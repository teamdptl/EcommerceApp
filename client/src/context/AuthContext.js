import { useState, createContext, useContext } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({});
    return (
        <>
            <AuthContext.Provider value={{ user, setUser }}>
                { children }
            </AuthContext.Provider>
        </>
    )

};
