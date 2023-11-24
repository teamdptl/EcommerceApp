import {useState} from "react";
import baseUrl from "../config";

const useProductsFetch = () => {
    const [products, setProducts] = useState([]);
    const [errorMsg, setErrorMsg] = useState();
    const [loading, setLoading] = useState(false);

    const callback = (filterData = {}) => {
        setLoading(true);
        fetch(baseUrl + '/api/v1/product/search?' + new URLSearchParams({...filterData}).toString())
            .then(res => res.json())
            .then(json => {
                console.log(json);
                setProducts(json.content)
            })
            .catch(setErrorMsg)
            .finally(() => {
                setLoading(false);
                console.log(errorMsg);
            })
    }

    return { products, errorMsg, loading, callback }
}

export default useProductsFetch;