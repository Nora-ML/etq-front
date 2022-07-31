import React, { useEffect, useState } from "react";
import { retrieveCart, saveCarts, removeFromCart, loggedIn } from "../requests";

const RemoveCartItem = ({ proId, updatedCart }) => {
	console.log("RemoveCartItem.js -- rendered");
	const [user, setUser] = useState();

	//remove item from localStorage
	const remove = () => {
		console.log("RemoveCartItem.js -- remove()");
		const prevCart = retrieveCart();
		const newArray = prevCart.filter((f) => f.productId !== proId);
		saveCarts(newArray);
		//assign new updated cart to updateCart to re-render the semiCart
		updatedCart(newArray);
		//Also remove item from database if registered and logged in user
		if (user) {
			console.log("RemoveCartItem.js -- remove() from DB, user:", user);
			removeFromCart(user._id, proId).then((response, error) => {
				console.log("RemoveCartItem.js -- remove(), resoponse:", response);
				console.log("RemoveCartItem.js -- remove(), error:", error);
			});
		}
	};

	useEffect(() => {
		const { user } = loggedIn();
		setUser(user);
	}, []);

	return (
		<p className="product-details product-details_remove" onClick={remove}>
			Remove
		</p>
	);
};

export default RemoveCartItem;
