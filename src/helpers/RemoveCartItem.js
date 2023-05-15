import React, { useEffect, useState } from "react";
import {
	getCart_localStorage,
	addToCart_localStorage,
	removeFromCart_DB,
	loggedIn,
} from "../requests";

const RemoveCartItem = ({ proId, updatedCart }) => {
	console.log("RemoveCartItem.js -- rendered");
	const [user, setUser] = useState();

	//remove item from localStorage
	const remove = () => {
		console.log("RemoveCartItem.js -- remove()");
		const prevCart = getCart_localStorage();
		const newArray = prevCart.filter((f) => f.productId !== proId);
		addToCart_localStorage(newArray);
		//assign new updated cart to updateCart to re-render the semiCart
		updatedCart(newArray);
		//Also remove item from database if registered and logged in user
		if (user) {
			console.log("RemoveCartItem.js -- remove() from DB, user:", user);
			removeFromCart_DB(user._id, proId).then((response, error) => {
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
