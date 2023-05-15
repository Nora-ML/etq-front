import { useState } from "react";
import {
	signOut,
	signOutFront,
	capitalizeFirst,
	list,
	getCart_localStorage,
} from "../requests";

const useCart = () => {
	// Fetching Product categories to populate Navbar with their name Dynamically
	const categoriez = () => {
		list("category").then((response, error) => {
			if (error || !response) {
			} else {
				setCategories(response);
			}
		});
	};
	// SignOut
	const signMeout = () => (e) => {
		signOut().then((response, error) => {
			if (response) {
				signOutFront();
				setuserZ("");
				activate("myaccount", "/");
			}
		});
	};

	// cart window styling based on content
	const cartWindowClassName = () => {
		if (cart === "active" && itemCount > 0) {
			return "ele-4-cont active coll cart-occupied flex-c";
		} else if (cart === "active") {
			return "ele-4-cont active coll flex-c";
		} else {
			return "ele-4-cont coll flex-c";
		}
	};

	return { signMeout, cartWindowClassName, activate };
};
export default useCart;
