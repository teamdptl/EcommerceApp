import {useState, createContext, useContext, useEffect} from "react";
import baseUrl from "../config";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const autoLogin = async () => {
        const token = (localStorage.getItem("accessToken"));
        if(token !== undefined && token !== null){
            const url = baseUrl + '/api/token/user' + '?token=' + token;
            console.log("Url: ", url)
            return await fetch(url).then(res => res.json())
                    .then(json => {
                        return json
                    })
                    .catch(err => {return null})
        } return null
        
    }
    return (
        <>
            <AuthContext.Provider value={{ user, setUser, autoLogin }}>
                { children }
            </AuthContext.Provider>
        </>
    )

};
