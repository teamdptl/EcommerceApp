import {useState, createContext, useContext, useEffect} from "react";
import baseUrl from "../config";
import createFetch from "../utils/createFetch";
import {jwtDecode} from "jwt-decode";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const storageData = localStorage.getItem('accessToken');
    const userData = storageData ? jwtDecode(storageData) : null;
    const [user, setUser] = useState(userData);
    const getUserData = async () => {
        const token = localStorage.getItem("accessToken") ?? null;
        if (token) {
            return await createFetch(baseUrl + '/api/v1/token/user').then(res => {
                if (!res.ok){
                    alert("Không thể lấy được thông tin");
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refresh_token');
                }
                return res.json()
            })
                .then(json => {
                    return json;
                })
                .catch(err => {
                    console.log(err);
                })
        }
        return null
    }

    const isAdmin = () => {
        return user?.role?.toLowerCase() === 'admin';
    }

    const isUser = () => {
        return user?.role?.toLowerCase() === 'user';
    }

    useEffect(() => {
        getUserData().then(data => {
            if (data === null)
                setUser(null);
            else
                setUser(
                    {
                        username: data?.username,
                        fullname: data?.fullname,
                        role: data?.role
                    })
        })
    }, []);

    return (
        <>
            <AuthContext.Provider value={{ user, setUser, isAdmin, isUser }}>
                { children }
            </AuthContext.Provider>
        </>
    )

};
