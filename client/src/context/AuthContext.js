import {useState, createContext, useContext, useEffect} from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        console.log('hello world')
    }, [])
    return (
        <>
            <AuthContext.Provider value={{ user, setUser }}>
                { children }
            </AuthContext.Provider>
        </>
    )

};
