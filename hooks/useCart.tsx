import { CartProductsInterface } from "@/lib/constants";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { toast } from 'react-hot-toast'

type CartContextType = {
    cartTotalQty: number;
    cartItems: CartProductsInterface[] | null;
    handleAddProductToCart: (product: CartProductsInterface) => void;
    handleRemoveProductFromCart: (product: CartProductsInterface) => void;
    decreaseQuantity: (item: CartProductsInterface) => void; 
    increaseQuantity: (item: CartProductsInterface) => void; 

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

    // Fonction pour diminuer la quantité d'un article dans le panier
    const decreaseQuantity = useCallback((item: CartProductsInterface) => {
        setCartItems((prev) => {
            if (prev === null) {
                return null; // Si prev est null, on retourne null
            }
            const updatedCart = prev.map((cartItem) => {
                if (cartItem.quantity && cartItem.id === item.id && cartItem.quantity > 1) {
                    return { ...cartItem, quantity: cartItem.quantity - 1 };
                }
                return cartItem;
            });

            localStorage.setItem('BubblyShopCartItems', JSON.stringify(updatedCart));
            return updatedCart;
        });
    }, []);

    // Fonction pour augmenter la quantité d'un article dans le panier
    const increaseQuantity = useCallback((item: CartProductsInterface) => {
        setCartItems((prev) => {
            if (prev === null) {
                return null; // Si prev est null, on retourne null
            }
            const updatedCart = prev.map((cartItem) => {
                if (cartItem.id === item.id && cartItem.quantity) {
                    return { ...cartItem, quantity: cartItem.quantity + 1 };
                }
                return cartItem;
            });

            localStorage.setItem('BubblyShopCartItems', JSON.stringify(updatedCart));
            return updatedCart;
        });
    }, []);

    // Fonction pour supprimer un produit du panier
    const handleRemoveProductFromCart = useCallback((product: CartProductsInterface) => {
        
            if (cartItems) {
                const filteredProducts = cartItems.filter((item) =>{
                    return item.id !== product.id
                })
                setCartItems(filteredProducts)
                toast.success('Produit supprimer avec succès')
                localStorage.setItem('BubblyShopCartItems', JSON.stringify(filteredProducts));
            }   
    }, [cartItems]);


    const value = {
        cartTotalQty,
        cartItems,
        handleAddProductToCart,
        decreaseQuantity,
        increaseQuantity,
        handleRemoveProductFromCart,

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