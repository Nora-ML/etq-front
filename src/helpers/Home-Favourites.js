import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { featured } from "../requests/index";
import ProductWrapper from "./ProductWrapper";
import "../styles/landing_favourites.css";

const HomeFavs = ({ classN }) => {
	console.log("HomeFavs.js --- rendered", classN);
	const [products, setProducts] = useState(false);
	const [count, setCount] = useState(0);
	const [numOfFeaturedProducts, setNumberOfFeaturedProduct] = useState(0);
	const [productsCardWidth, setProductsCardWidth] = useState({});
	const [slideAnim, setSlideAnim] = useState();
	let [numberOfItemsInView, setNumberOfItemsInView] = useState(0);
	let [touchStart, setTouchStart] = useState(0);

	const getFeaturedProd = () => {
		featured().then((data, error) => {
			if (error || !data) {
				console.log("HomeFavs.js --- fetFeaturedProd() error", error);
			} else {
				setProducts(data);
				setNumberOfFeaturedProduct(data.length);
			}
		});
	};

	function scrollToIndex(direction) {
		/* console.log(
			"SLIIIIIDEEEEEEEEEEEE. numberOfItemsInView",
			numberOfItemsInView,
			"\n productCardWIdth",
			productsCardWidth,
			"direction",
			direction,
			"count",
			count,
			"numOfFeaturedProducts",
			numOfFeaturedProducts
		); */
		if (
			direction === "plus" &&
			count >= 0 &&
			count < numOfFeaturedProducts - [numberOfItemsInView]
		) {
			console.log("SLIIIIIDEEEEEEEEEEEE. RIGHT ..");
			setSlideAnim(productsCardWidth[count]);
			setCount(count + 1);
		}
		if (
			direction === "minus" &&
			count >= 1 &&
			count <= numOfFeaturedProducts - 1
		) {
			console.log("SLIIIIIDEEEEEEEEEEEE. LEFT ..");
			count === 1
				? setSlideAnim(0)
				: setSlideAnim(productsCardWidth[count - 2]);
			setCount(count - 1);
		}
	}
	const triggerTouch = (e) => {
		let direction =
			touchStart - e.changedTouches[0].screenX > 0 ? "plus" : "minus";
		scrollToIndex(direction);
	};

	useEffect(() => {
		console.log("HomeFavs.js --- useEffect() ");
		getFeaturedProd();
	}, []);

	useEffect(() => {
		console.log("HomeFavs.js 2--- useEffect() - getting Width Data");
		const productCard = document.querySelectorAll(
			".landing-favourites_product-card"
		)[count];

		if (products && productCard) {
			let { offsetWidth, offsetLeft } = productCard;
			let cardWidth = offsetWidth + offsetLeft;

			setProductsCardWidth({ ...productsCardWidth, [count]: -cardWidth });

			if (!numberOfItemsInView && !count) {
				let itemsInView = Math.floor(window.outerWidth / cardWidth);
				setNumberOfItemsInView(itemsInView);
			}
		}
	}, [products, count]);

	return (
		<div className={classN}>
			<div className="landing-favourites_header">
				<h1 className="landing-favourites_header--title">
					Our Favourite Models
				</h1>
				<div className="landing-favourites_arrows">
					<div
						className={
							count === 0
								? "landing-favourites_arrow-wrap faded "
								: "landing-favourites_arrow-wrap"
						}
						onClick={() => scrollToIndex("minus")}>
						<i className="arrow-icon arrow-icon-left fas fa-angle-left"></i>
					</div>
					<div
						className={
							count === 6
								? "landing-favourites_arrow-wrap faded"
								: "landing-favourites_arrow-wrap"
						}
						onClick={() => scrollToIndex("plus")}>
						<i className="arrow-icon arrow-icon-right fas fa-angle-right"></i>
					</div>
				</div>
			</div>
			<div className="landing-favourites_products ">
				<div
					onTouchStart={(e) => setTouchStart(e.changedTouches[0].screenX)}
					onTouchEnd={(e) => triggerTouch(e)}
					className="landing-favourites_products-container"
					style={{ transform: `translateX(${slideAnim}px)` }}>
					{products && <ProductWrapper products={products} classN="featured" />}
				</div>
			</div>
		</div>
	);
};

export default React.memo(HomeFavs);
