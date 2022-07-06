import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getfav } from "../requests";

const MySelection = ({ command }) => {
	console.log("MySelection.js --  rendered");
	const { userId } = useParams();
	const [favourites, setFavourites] = useState();

	const grapFavs = (id) => {
		console.log("MySelection.js -- grapFavs..");
		getfav(id).then((response, error) => {
			if (error || !response) {
				console.log("MySelection.js --  grapFavs , error");
			} else {
				console.log("MySelection.js --  grapFavs , response:", response);
				setFavourites(response);
			}
		});
	};

	useEffect(() => {
		// eslint-disable-next-line no-unused-expressions
		if (command === "favourites") {
			grapFavs(userId);
		} else if (command === "bag") {
		}
	}, []);

	return (
		<div className="selection-table">
			<div className="selection_sub-container">
				<h3 className="table-header_item tb-product">Product</h3>
				<h3 className="table-header_item tb-color">Color</h3>
				<h3 className="table-header_item tb-size">Size</h3>
				<h3 className="table-header_item tb-qty">Qty</h3>
				<h3 className="table-header_item tb-price">Price</h3>
			</div>
			<hr className="blackLine" />
			{favourites &&
				favourites.map((fav) => (
					<div className="selection_sub-container">
						<div className="product-rows_items flex-r">
							<img src="" alt="" />
							<h4>Product NAME </h4>
						</div>
						<h4 className="product-rows_items">Product Color </h4>
						<h4 className="product-rows_items">Product size </h4>
						<div className="product-rows_items flex-r">
							<input type="" />
							<h4>Delete Action </h4>
						</div>
						<h4 className="product-rows_items">Product Price </h4>
					</div>
				))}
		</div>
	);
};
export default MySelection;
