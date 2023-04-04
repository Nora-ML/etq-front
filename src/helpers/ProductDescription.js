import React from "react";

const ProductDescription = ({ product }) => {
	//console.log("ProductDescription.js ----  Rendered");

	return (
		<div className="prodBlock__description">
			<p className="prodBlock__description--green">{product.name}</p>
			<h5 className="prodBlock__description--brand">{product.brand}</h5>
			<h5 className="prodBlock__description--price">$ {product.price}</h5>
		</div>
	);
};
export default React.memo(ProductDescription);
