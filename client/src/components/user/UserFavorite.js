import ProductItem from "../shop/ProductItem";
import createFetch from "../../utils/createFetch";
import baseUrl from "../../config";
import {useEffect, useState} from "react";

const UserFavorite = () => {
    const [products, setProducts] = useState([]);
    const favoriteFetch = () => {
        createFetch(baseUrl + '/api/v1/product/favorite').then(res => res.json())
            .then(setProducts)
            .catch(console.log)
    }

    useEffect(() => {
        favoriteFetch();
    }, [])
    return <>
        <p className="text-xl font-semibold my-3 mb-6">Các sản phẩm đã thích</p>
        <div className={"grid grid-cols-1 gap-x-4 gap-y-4 md:grid-cols-2 lg:grid-cols-4 xl:gap-x-3"}>
            {products.map(product => (
                <ProductItem key={product.productId} product={product} isEnable={false} isEnableRating={false}/>
            ))}
        </div>
    </>
}

export default UserFavorite;