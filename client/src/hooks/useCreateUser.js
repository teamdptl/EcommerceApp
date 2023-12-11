import { useState, useCallback } from "react";
import baseUrl from "../config";
import createFetch from "../utils/createFetch";

const useCreateUser = () => {
    const [loadingCreateUser, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [errorMsgCreateUser, setErrorMsg] = useState(null);

    const call = useCallback(async (userData) => {
        setLoading(true);

        console.log(JSON.stringify(userData));

        // const refreshToken = localStorage.getItem('refresh_token');

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${refreshToken}`,
            },
            body: JSON.stringify(userData),
        };

        createFetch(`${baseUrl}/api/v1/users/add`, requestOptions)
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

    return { data, errorMsgCreateUser, setErrorMsg ,loadingCreateUser, call };
};

export default useCreateUser;
