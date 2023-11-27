import {useEffect, useState} from "react";
import baseUrl from "../config";

const useCart = ({requireUpdate = false}) => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        loadCart();
    }, []);

    useEffect(() => {
        storageCart();
    }, [cart]);

    const loadCart = () => {
        setCart(JSON.parse(localStorage.getItem('cart')));
        if (cart.length){
            const newCart = [];
            cart.forEach(item => {
                fetch(baseUrl + `/api/v1/product/get/${item.product.productId}`).then(res => res.json())
                    .then(json => {
                        newCart.push({product: filterProduct(json), quantity: item.quantity})
                    })
                    .catch((e) => {
                        console.log(e);
                    })
            })
            setCart(newCart);
        }
    }

    const storageCart = () => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    const addItemToCart = (product, quantity) => {
        setCart([...cart, {product: filterProduct(product), quantity: quantity}]);
    }

    const updateQuantity = (id, quantity) => {
        const newCart = cart.map(item => {
            if (item.product.productId === id)
                item.quantity = quantity
            return item;
        })
        setCart(newCart);
    }

    const removeItem = (id) => {
        const newCart = cart.filter(item => item.product.productId !== id)
        setCart(newCart);
    }

    // Hàm này dùng loại bỏ bớt dữ liệu mà product nhận được, hiện tại thì lấy hết
    // Lưu ý ít nhất cần thuộc tính productId để phân biệt nha
    const filterProduct = (product) => {
        return product;
    }
}

export default useCart;