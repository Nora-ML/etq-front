import React from "react";

const ProductDescription = ({ product, classN }) => {
	//console.log("ProductDescription.js ----  Rendered");

	return (
		<div className={classN}>
			<p className={`${classN}-name`}>{product.name}</p>
			<h5 className={`${classN}-brand`}>{product.brand}</h5>
			<h5 className={`${classN}-price`}>$ {product.price}</h5>
		</div>
	);
};
export default React.memo(ProductDescription);
