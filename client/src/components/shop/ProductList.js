import { useEffect } from "react";
import useProductsFetch from "../../hooks/useProductsFetch";

const ProductList = () => {
    const { products, errorMsg, loading, callback, currentPage, maxPage, totalElements } = useProductsFetch();
    useEffect(() => {
        callback();
    }, [])

    useEffect(() => {
        console.log(products);
    }, [products])

    return <>

    </>

}

export default ProductList;