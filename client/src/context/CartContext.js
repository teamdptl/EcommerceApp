import {createContext, useContext} from "react";
import useCart from "../hooks/useCart";

export const CartContext = createContext(null);

export const useCartContext = () => useContext(CartContext);

export default function CartContextProvider({children}){
    return <>
        <CartContext.Provider value={useCart(true)}>
            {children}
        </CartContext.Provider>
    </>
}