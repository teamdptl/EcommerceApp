import {useEffect, useState} from "react";
import baseUrl from "../config";


const useBrandFetch = () => {
    const [brands, setBrands] = useState([]);
    const [errorMsg, setErrorMsg] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetch(baseUrl+'/api/v1/brand')
    }, []);
}