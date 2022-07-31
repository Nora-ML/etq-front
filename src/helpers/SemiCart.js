import React, { useEffect, useState } from "react";
import { API } from "../config";
import RemoveCartItem from "../helpers/RemoveCartItem.js";

const SemiCart = ({ activeState, carts, itemCount }) => {
	console.log("SemiCart.js ----  Rendered carts :", carts);
	const [carty, setCarty] = useState();
	const [state, setState] = useState();

	const updates = (c) => {
		console.log("SemiCart.js ---- updates");
		setCarty(c);
		subTotal(c);
		itemCount(c.length);
	};
	const subTotal = (car) => {
		console.log("SemiCart.js ---- subtotal(), car:", car);
		let subto = 0;
		car.map((cart) => {
			console.log(
				" price :",
				cart.price,
				" :",
				typeof cart.price,
				" subto: ",
				subto
			);
			return (subto += cart.price);
		});
		setState(subto);
	};

	useEffect(() => {
		console.log("SemiCart.js ---- useEffect");
		setCarty(carts);
		subTotal(carts);
	}, [carts]);

	return (
		<>
			<div className="cart-items-nav">
				{activeState === "active" &&
					carty &&
					carty
						.slice()
						.reverse()
						.map((cart) => (
							<div className="product-wrap flex-r">
								<div className="product-details product-details_img">
									<img
										src={`${API}/products/photo/${cart.productId}`}
										alt={cart.name}
										width="120"
										height="120"
									/>
								</div>
								<div className="product-details product-details_name">
									<p className="green">{cart.name}</p>
									<p>Brand: {cart.brand}</p>
									<p>Color: {cart.color}</p>
									<p>Size: {cart.size}</p>
								</div>
								<div className="product-details product-details_price">
									<p>$ {cart.price}</p>
								</div>

								<RemoveCartItem
									proId={cart.productId}
									updatedCart={(c) => {
										updates(c);
									}}
								/>
							</div>
						))}
			</div>
			<div className="the-subtotal flex-r">
				<p>Subtotal</p>
				<h4 className="subtotal-number">$ {state}</h4>
			</div>
			<button className="nav-cart-btn" type="submit">
				Checkout
			</button>
		</>
	);
};
export default React.memo(SemiCart);
