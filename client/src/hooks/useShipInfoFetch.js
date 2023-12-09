import {useCallback, useState} from "react";
import createFetch from "../utils/createFetch";
import baseUrl from "../config";

const UseShipInfoFetch = () => {
    const [listInfo, setListInfo] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState();

    const getInfoList = useCallback(() => {
        if (!localStorage.getItem('accessToken')) return;
        setLoading(true);
        createFetch(baseUrl + '/api/v1/user/shipInfo/get').then(res => res.json())
            .then(setListInfo)
            .catch(setErrorMsg)
            .finally(() => setLoading(false))
    }, [])
    return { listInfo, loading, errorMsg, getInfoList }
}

export default UseShipInfoFetch;