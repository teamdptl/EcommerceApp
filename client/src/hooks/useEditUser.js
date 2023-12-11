import { useState, useCallback } from "react";
import baseUrl from "../config";
import createFetch from "../utils/createFetch";

const useEditUser = () => {
    const [loadingCreateUser, setLoading] = useState(false);
    const [dataEdit, setData] = useState(null);
    const [errorMsgEditUser, setErrorMsg] = useState(null);

    const callEdit = useCallback(async (userData, userId) => {
        setLoading(true);

        // const refreshToken = localStorage.getItem('refresh_token');

        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${refreshToken}`,
            },
            body: JSON.stringify(userData),
        };

        createFetch(`${baseUrl}/api/v1/users/update/${userId}`, requestOptions)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }else{
                    return res.text();
                }
            })
            .then((data) => {
                if (typeof data === 'string') {
                    setErrorMsg(data);
                } else {
                    setData(data);
                }
            })
            .catch((e) => {
                setErrorMsg(e.message); // Use e.message instead of e
            })
            .finally(() => setLoading(false));
    }, []);

    return { dataEdit, errorMsgEditUser, setErrorMsg ,loadingCreateUser, callEdit };
};

export default useEditUser;
