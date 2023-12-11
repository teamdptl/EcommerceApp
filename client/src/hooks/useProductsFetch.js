import {useState} from "react";
import baseUrl from "../config";
import createFetch from "../utils/createFetch";

const useProductsFetch = () => {
    const [products, setProducts] = useState([]);
    const [errorMsg, setErrorMsg] = useState();
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [maxPage, setMaxPage] = useState(0);
    const [totalElements, setTotalElements] = useState(0);

    const callback = (filterData = {}) => {
        setLoading(true);
        createFetch(baseUrl + '/api/v1/product/search?' + new URLSearchParams({...filterData}).toString())
            .then(res => res.json())
            .then(json => {
                setProducts(json.content)
                setMaxPage(json.totalPages)
                setCurrentPage(json.number)
                setTotalElements(json.totalElements)
            })
            .catch(setErrorMsg)
            .finally(() => {
                setLoading(false);
            })
    }

    return { products, errorMsg, loading, callback, currentPage, maxPage, totalElements }
}

export default useProductsFetch;