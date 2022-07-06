import React, { useEffect } from "react";
import "../styles/productEdit.css";
import AddProductForm from "../helpers/ProductForm.js";


const ProductEdit = ({ product, coordinate, className }) => {
	console.log("#FE => ProductEdit component => Rendered ...");
	console.log("ProductEdit PROPs ", product, coordinate, className);
	useEffect(() => {
		const target = 750;
		const diff = target - coordinate;
		const currentScroll = window.scrollY;
		const targetScroll = currentScroll - diff;
		if (coordinate) {
			window.scrollTo(0, targetScroll);
		}
	}, [product]);

	return (
		<>
			<div className={"product-form__Shop " + className}>
				<AddProductForm product={product} className={"edit"} />
			</div>
		</>
	);
};
export default ProductEdit;
