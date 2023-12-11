import {useEffect, useState} from "react";
import baseUrl from "../config";
import createFetch from "../utils/createFetch";


const useBrandFetch = () => {
    const [brands, setBrands] = useState([]);
    const [errorMsg, setErrorMsg] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        createFetch(baseUrl+'/api/v1/brand')
    }, []);
}