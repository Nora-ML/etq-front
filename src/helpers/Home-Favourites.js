import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { featured } from "../requests/index";
import ProductWrapper from "./ProductWrapper";

const HomeFavs = ({ classN }) => {
	console.log("HomeFavs.js --- rendered", classN);
	const [products, setProducts] = useState();
	const [count, setCount] = useState(0);
	const [num, setNum] = useState(0);

	const getFeaturedProd = () => {
		console.log("HomeFavs.js --- fetFeaturedProd() ");
		featured().then((data, error) => {
			if (error || !data) {
				console.log("HomeFavs.js --- fetFeaturedProd() error", error);
			} else {
				data.map((p, index) =>
					index < 4
						? (p.classP = "prodBlock__featured--wrapper")
						: (p.classP = "prodBlock__featured--wrapper prod-hidden")
				);
				setProducts(data);
				setNum(data.length);
			}
		});
	};

	const slide = (direction) => {
		console.log("HomeFavs.js --- slide(),direction: ", direction);
		if (direction === "plus" && count < num - 3) {
			console.log("HomeFavs.js --- slide(),plus");
			const newProduct = products.map((p, index) =>
				index === count
					? { ...p, classP: "prodBlock__featured--wrapper prod-hide" }
					: index === count + 1
					? { ...p, classP: "prodBlock__featured--wrapper prod-active" }
					: index === count + 2
					? { ...p, classP: "prodBlock__featured--wrapper prod-active1" }
					: index === count + 3
					? { ...p, classP: "prodBlock__featured--wrapper prod-active2" }
					: index === count + 4
					? { ...p, classP: "prodBlock__featured--wrapper prod-active3" }
					: { ...p, classP: "prodBlock__featured--wrapper prod-hidden" }
			);
			setProducts(newProduct);
			setCount(count + 1);
		} else if (direction === "minus" && count > 0) {
			console.log("HomeFavs.js --- slide(),minus");
			const newProduct = products.map((p, index) =>
				index === count + 3
					? { ...p, classP: "prodBlock__featured--wrapper prod-hide minus" }
					: index === count + 2
					? { ...p, classP: "prodBlock__featured--wrapper prod-active3 minus" }
					: index === count + 1
					? { ...p, classP: "prodBlock__featured--wrapper prod-active2 minus" }
					: index === count
					? { ...p, classP: "prodBlock__featured--wrapper prod-active1 minus" }
					: index === count - 1
					? { ...p, classP: "prodBlock__featured--wrapper prod-active minus" }
					: { ...p, classP: "prodBlock__featured--wrapper prod-hidden" }
			);
			setProducts(newProduct);
			setCount(count - 1);
		}
	};

	console.log("count", count);
	console.log("products", products);

	useEffect(() => {
		console.log("HomeFavs.js --- useEffect() ");
		getFeaturedProd();
	}, []);

	return (
		<div className={classN}>
			<div className="sec-3_header flex-r">
				<h1 className="sec-3_header--title">Our Favourite Models</h1>
				<div
					className={
						count === 0
							? "arrow-wrap arrow-wrap-left arrow-wrap-left--header arrow-faded"
							: "arrow-wrap arrow-wrap-left arrow-wrap-left--header"
					}
					onClick={() => slide("minus")}
				>
					<i className="arrow-wrap__icon arrow-wrap__icon-left fas fa-angle-left"></i>
				</div>
				<div
					className={
						count === 6
							? "arrow-wrap arrow-wrap-right arrow-wrap-right--header arrow-faded "
							: "arrow-wrap arrow-wrap-right arrow-wrap-right--header "
					}
					onClick={() => slide("plus")}
				>
					<i className="arrow-wrap__icon arrow-wrap__icon-right fas fa-angle-right"></i>
				</div>
			</div>
			<div className="productDisplay__featured flex-r">
				{products && <ProductWrapper products={products} classN="featured" />}
			</div>
		</div>
	);
};

export default React.memo(HomeFavs);
