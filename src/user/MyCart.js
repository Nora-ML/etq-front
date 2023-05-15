import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { getCart_localStorage } from "../requests";
import "../styles/myCart.css";
import { API } from "../config";

const MyCart = () => {
	console.log("MyCart.js --  rendered");
	const { userId } = useParams();
	const [cart, setCart] = useState(getCart_localStorage);

	console.log("MyCart :", cart);
	return (
		<div className="mycart_container">
			<div className="mycart_header flex-row">
				<h3 className="mycart_header_descrip mycart_header_descrip-product">
					Product
				</h3>
				<h3 className="mycart_header_descrip mycart_header_descrip-color">
					Color
				</h3>
				<h3 className="mycart_header_descrip mycart_header_descrip-size">
					Size
				</h3>
				<h3 className="mycart_header_descrip mycart_header_descrip-qty">Qty</h3>
				<h3 className="mycart_header_descrip mycart_header_descrip-price">
					Price
				</h3>
			</div>
			<hr className="blackLine" />
			<div className="mycart_items_container">
				{cart &&
					cart.map((item) => (
						<div className="mycart_peritem_container flex-row">
							<div className="mycart_item_container_property__product flex-row">
								<img
									src={`${API}/products/photo/${item.productId}`}
									alt={item.name}
								/>
								<h4>{item.name}</h4>
							</div>
							<h4 className="mycart_item_container_property__color">
								{item.color}{" "}
							</h4>
							<h4 className="mycart_item_container_property__size">
								{item.size}
							</h4>
							<div className="mycart_item_container_property__qty flex-row">
								<select name="category">
									<option>1</option>
									<option>2</option>
									<option>3</option>
									<option>4</option>
									<option>5</option>
								</select>
								<h4>Delete</h4>
							</div>
							<h4 className="mycart_item_container_property__price">
								$ {item.price}
							</h4>
						</div>
					))}
			</div>
		</div>
	);
};
export default MyCart;
