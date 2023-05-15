import { API } from "../config";
import { addToCart_localStorage } from "../requests";
/*******************    cart   *********************/

const newCartTotal = (prevTotal, newItem) => {
	//console.log("NEW TOTAL ::  newItem:", newItem);
	let newItemValue = newItem.quantity * newItem.price;
	return prevTotal + newItemValue;
};

const cartReducer = (state, action) => {
	console.log("CART REDUCER ", action, "STATE", state);
	const { product } = action.payload;
	const { cartItems, itemCount, total } = state;

	switch (action.type) {
		case "ADD_TO_CART":
			let newCart;
			let itemExists = cartItems.filter(
				(item) => item.productId === product.productId
			)[0];
			if (itemExists) {
				newCart = cartItems.map((item) =>
					item.productId === product.productId
						? { ...item, quantity: item.quantity + 1 }
						: item
				);
			} else {
				newCart = [...cartItems, product];
			}
			let newItemCount = itemCount ? itemCount + 1 : 1;
			let newTotal = newCartTotal(total, product);
			let updatedCartObject = {
				cartItems: newCart,
				itemCount: newItemCount,
				total: newTotal,
			};
			addToCart_localStorage(updatedCartObject);
			return { ...updatedCartObject };
		default:
			console.log("DEFAULT CART REDUCER");
	}
};

export default cartReducer;
