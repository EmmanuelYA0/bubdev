import { CartProductsInterface } from "@/lib/constants";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { toast } from 'react-hot-toast'

type CartContextType = {
    cartTotalQty: number;
    cartItems: CartProductsInterface[] | null;
    handleAddProductToCart: (product: CartProductsInterface) => void;
}

export const CartContext = createContext<CartContextType | null>(null)

interface Props {
    [propName: string]: any
}


export const CartContextProvider = (props: Props) => {
    const [cartTotalQty, setCartTotalQty] = useState(0);
    const [cartItems, setCartItems] = useState<CartProductsInterface[] | null>(null);

    useEffect(() => {
        const cItems: any = localStorage.getItem('BubblyShopCartItems');
        const cProducts: CartProductsInterface[] | null = JSON.parse(cItems);

        setCartItems(cProducts);
    }, []);
   

    const handleAddProductToCart = useCallback((product: CartProductsInterface) => {
        setCartItems((prev) => {
            let updatedCart;

            if (prev) {
                updatedCart = [...prev, product]
            } else {
                updatedCart = [product]
            }
            // toast.success('Produit ajouté au panier avec succès',{
            //     className:'bg-transparent',
            // })
            localStorage.setItem('BubblyShopCartItems', JSON.stringify(updatedCart));
            return updatedCart;
        })
    }, []);


    const value = {
        cartTotalQty,
        cartItems,
        handleAddProductToCart,

    }

    return (
        <CartContext.Provider value={value} {...props} />
    )
}

export const useCart = () => {
    const context = useContext(CartContext)

    if (context == null) {
        throw new Error("useCart must be used within a CartContextProvider")
    }

    return context;
}