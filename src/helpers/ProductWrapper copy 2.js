import React, { useState, useEffect } from "react";
import ProductDescription from "../helpers/ProductDescription.js";
import ShowImage from "../helpers/ShowImage";
import AdminCommands from "../helpers/AdminCommands.js";
import UserCommands from "../helpers/UserCommands.js";
import { loggedIn } from "../requests";

const ProductWrapper = ({ products, classN }) => {
	console.log(
		"ProductWrapper.js  => rendered ..,products: ",
		products,
		"classN",
		classN
	);
	const [userz, setUser] = useState("");
	const [images, setImages] = useState(false);

	// Setting a pattern for product Card sizes and passing className accordingly
	let count = 1;
	let start = 8;
	const productDisplay = (index) => {
		//console.log("ProductWrapper.js  => productDisplay(), index: ", index);
		const length = products.length;
		let cycle = Math.ceil((length - 7) / 14);
		let interva_BIG = 8;
		let interval_Reg = 6;
		let secondInterval = start + interval_Reg;
		let end = interva_BIG + secondInterval - 1;
		if (index <= 7) {
			return "prodBlock prodBlock_wrapper--medium flex-c";
		}
		if (count <= cycle && index <= end) {
			if (index >= start && index < secondInterval) {
				return "prodBlock prodBlock_wrapper--Big flex-c";
			} else if (index >= secondInterval && index < end) {
				return "prodBlock prodBlock_wrapper--medium flex-c";
			} else if (index === end) {
				count++;
				start = end + 1;
				return "prodBlock prodBlock_wrapper--medium flex-c";
			}
		}
	};

	useEffect(() => {
		//console.log("ProductWrapper.js --- useEffect => getting User info");
		if (userz === "") {
			console.log("ProductWrapper.js --- useEffect => loggedIn():", userz);
			const { user } = loggedIn();
			setUser(user);
			setTimeout(() => {
				setImages(true);
			}, 200);
		}
	}, [userz]);

	return products.map((product, index) => (
		<div
			key={product._id}
			id={index}
			className={
				classN === "featured"
					? `landing-favourites_product-card`
					: productDisplay(index)
			}>
			{images && (
				<ShowImage
					product={product}
					classN={
						classN === "featured"
							? "landing-favourites_product-card_image-container"
							: "flex-r--wrap prodBlock__anchor-img--taller"
					}
				/>
			)}
			<ProductDescription
				product={product}
				classN={
					classN === "featured"
						? "landing-favourites_product-card_details"
						: "flex-r--wrap prodBlock__anchor-img--taller"
				}
			/>
			{userz && userz.role !== 1 && (
				/* location.includes("pillow") && */ <UserCommands
					product={product}
					user={userz}
				/>
			)}
			{userz && userz.role === 1 && !classN && (
				<AdminCommands product={product} />
			)}
		</div>
	));
};
export default React.memo(ProductWrapper);
