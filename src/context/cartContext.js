import { createContext, useState, useReducer } from "react";
import cartReducer from "./cartReducer";
import { getCart_localStorage } from "../requests";

/* const cartItems =
	getCart_localStorage().cart === false ? [] : getCart_localStorage(); */

const { cartItems = [], itemCount = 0, total = 0 } = getCart_localStorage();

const initialCartState = { cartItems, itemCount, total };

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
	const [cart, dispatch] = useReducer(cartReducer, initialCartState);
	const [displayCart, setDisplayCart] = useState(false);

	const addToCart = (product) => {
		dispatch({ type: "ADD_TO_CART", payload: product });
	};

	const passOn = { addToCart, ...cart, displayCart, setDisplayCart };

	return <CartContext.Provider value={passOn}>{children}</CartContext.Provider>;
};

export default CartContextProvider;
