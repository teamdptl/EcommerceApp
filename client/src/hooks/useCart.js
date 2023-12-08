import {useEffect, useRef, useState} from "react";
import baseUrl from "../config";

const useCart = (requireUpdate= false) => {
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) ?? []);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState();
    const isInit = useRef(true);

    useEffect(() => {
        if (requireUpdate)
            loadCart();
    }, []);

    useEffect(() => {
        if (isInit.current){
            isInit.current = false;
            return;
        }
        storageCart();
    }, [cart]);

    const loadCart = () => {
        if (!cart.length){
            return;
        }
        console.log("Update cart");
        const listId = cart.map(item => item.product.productId);
        let copyCart = [...cart];
        let newCart = [];
        setLoading(true)
        fetch(baseUrl + `/api/v1/product/getList?`+ new URLSearchParams({listId}).toString()).then(res => res.json())
            .then(json => {
                newCart = json;
            })
            .catch((e) => {
                setErrorMsg(e);
                console.log(e);
            })
            .finally(() => {
                setLoading(false);
            })

        copyCart.map(item => {
            const findCart = newCart.find(c => c.productId === item.productId) ?? null;
            if (!findCart) return;
            return {product: filterProduct(cart), buyQuantity: item.buyQuantity };
        })
        setCart(copyCart);
    }

    const storageCart = () => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    const addItemToCart = (product, buyQuantity = 1) => {
        const find = cart.find(item => item.product.productId === product.productId) ?? null;
        if (find) {
            updateQuantity(product.productId, find.buyQuantity + 1)
            return;
        }
        const newData = {
            product: filterProduct(product),
            buyQuantity: buyQuantity
        }
        setCart([...cart, newData]);
    }

    const updateQuantity = (id, buyQuantity ) => {
        const newCart = cart.map(item => {
            if (item.product.productId === id)
                item.buyQuantity = ( buyQuantity >= 1 ? buyQuantity : 1);
            return item;
        })
        setCart(newCart);
    }

    const removeItem = (id) => {
        const newCart = cart.filter(item => item.product.productId !== id)
        setCart(newCart);
    }

    const clearCart = () => {
        setCart([]);
    }

    const getTotalMoney = () => {
        return cart.reduce((temp, item) => {
            return temp + item.buyQuantity * item.product.price;
        }, 0)
    }

    const getTotalItem = () => {
        return cart.reduce((temp) => {
            return temp + 1;
        }, 0)
    }

    // Hàm này dùng loại bỏ bớt dữ liệu mà product nhận được, hiện tại thì lấy hết
    // Lưu ý ít nhất cần thuộc tính productId để phân biệt nha
    const filterProduct = (product) => {
        const {productId, name, price, slugUrl, imageUrl, quantity} = product;
        return {productId, name, price, slugUrl, imageUrl, quantity};
    }

    return {cart, loading, errorMsg, addItemToCart, updateQuantity, removeItem, getTotalMoney, getTotalItem, loadCart, clearCart}
}

export default useCart;