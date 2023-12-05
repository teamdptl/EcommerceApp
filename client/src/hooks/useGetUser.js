import { useState, useCallback } from "react";
import baseUrl from "../config";

/*Mục đích dùng để lấy 1 user */

const useGetUser = () => {
    const [loadingGetUser, setLoading] = useState(false);
    const [dataUser, setDataUser] = useState(null);
    const [errorGetUser, setErrorGetUser] = useState(null);

    const callGetUser = useCallback(async (userId) => {
        setLoading(true);
        fetch(`${baseUrl}/api/v1/users/get/${userId}`)
        .then(res => res.json())
        .then(json => {
            setDataUser(json);
        })
        .catch(setErrorGetUser)
        .finally(() => {
            setLoading(false);
        })

       
    })
    return {loadingGetUser, dataUser, errorGetUser, callGetUser}
}
export default useGetUser;