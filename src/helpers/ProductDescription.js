import React from "react";

const ProductDescription = ({ product }) => {
	console.log("ProductDescription.js ----  Rendered");

	return (
		<div className="prodBlock__description">
			<p className="green">{product.name}</p>
			<h5>{product.brand}</h5>
			<h5>$ {product.price}</h5>
		</div>
	);
};
export default React.memo(ProductDescription);
