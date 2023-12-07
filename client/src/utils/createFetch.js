// Thay chữ fetch thành createFetch là ok
import {jwtDecode} from "jwt-decode";
import baseUrl from "../config";

const getNewToken = () => {
    let formData = new FormData();
    const refreshToken = localStorage.getItem('refresh_token') ?? null;
    if (refreshToken) {
        formData.append("refreshToken", refreshToken);
        return fetch(baseUrl + '/api/v1/auth/refresh-token', {
            method: "POST",
            body: formData
        });
    }
    return null;
}

const createFetch = (url, init = {}) => {
    const accessToken = localStorage.getItem('accessToken') ?? null;
    const refreshToken = localStorage.getItem('refresh_token') ?? null;
    if (accessToken){
        // const user = jwtDecode(accessToken) ?? null;
        // if (!user || user.exp <= new Date().getTime()/1000){
        //     if (refreshToken){
        //         getNewToken().then(res => {
        //             if (!res.ok){
        //                 localStorage.removeItem('accessToken');
        //                 localStorage.removeItem('refresh_token');
        //                 localStorage.removeItem('cart');
        //                 return null;
        //             }
        //             return res.json();
        //         }).then(data => {
        //             localStorage.setItem('accessToken', data.access_token);
        //             return fetch(url, {
        //                 ...init,
        //                 headers: {
        //                     ...init.headers,
        //                     'Authorization': 'Bearer ' + data.access_token
        //                 }
        //             })
        //         }).catch((err) => console.log(err))
        //     }
        // }
        return fetch(url, {
            ...init,
            headers: {
                ...init.headers,
                'Authorization': 'Bearer ' + accessToken
            }
        })
    }

    return fetch(url, init);
}

export default createFetch;