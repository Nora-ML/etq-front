import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API } from "../config";
import { getfav, viewProduct } from "../requests";

const MyFav = ({ command }) => {
	console.log("MyFav.js --  rendered");
	const { userId } = useParams();
	const [favourites, setFavourites] = useState();
	const [products, setProducts] = useState();
	const [trigger, setTrigger] = useState("");

	const grapFavs = (id) => {
		console.log("MyFav.js -- grapFavs..");
		getfav(id).then((response, error) => {
			if (error || !response) {
				console.log("MyFav.js --  grapFavs , error");
			} else {
				console.log("MyFav.js --  grapFavs , response:", response);
				setFavourites(response);
				setTrigger("first");
			}
		});
	};

	const getProd = (favs) => {
		console.log("MyFav.js -- getProd..");
		let newArray = [];
		favs.forEach((r, index) =>
			viewProduct(r)
				.then((response, error) => {
					if (error || !response) {
						console.log("MyFav.js --  getProd,viewProduct , error");
					} else {
						console.log(
							"MyFav.js --  getProd ,viewProduct, response:",
							response
						);
						newArray.push(response);
					}
				})
				.then(() => {
					console.log("MyFav.js --  then 1");
					setProducts(newArray);
					setTrigger("Hello" + index);
				})
		);
	};

	useEffect(() => {
		console.log("MyFav.js --  useEffect ..");
		if (command === "favourites") {
			grapFavs(userId);
		}
	}, []);
	useEffect(() => {
		console.log("MyFav.js --  useEffect .. trigger.");
		if (trigger === "first") {
			getProd(favourites);
		}
		let leng;
		let lenH;
		if (favourites) {
			leng = favourites.length - 1;
			lenH = "Hello" + leng;
		}
		if (trigger === lenH) {
			console.log("MyFav.js --  useEffect .. trigger.. Hello");
			setProducts([...products]);
		}
	}, [trigger]);
	/* 	useEffect(() => {
		console.log("MyFav.js --  useEffect . RenderAttempt..");
		if (trigger === "Hello") {
			console.log("MyFav.js --  useEffect . RenderAttempt. success.");
		}
	}, [trigger]); */

	console.log("trigger ", trigger);
	console.log("products ", products);
	return (
		<div className="selection-table">
			<h3>My Favourites</h3>
			<div className="selection-inner-table flex-r-wrap">
				{products &&
					products.map((fav) => (
						<div key={fav._id} className="favs-container flex-r">
							<div className="product-rows_items ">
								<img
									src={`${API}/products/photo/${fav._id}`}
									alt={fav.name}
									width="200"
									height="300"
								/>
							</div>
							<div>
								<h4>{fav.name} </h4>
								<h4>{fav.brand}</h4>
								<h4 className="product-rows_items">{fav.colors[0]} </h4>

								<h4>Delete Action </h4>

								<h4 className="product-rows_items">$ {fav.price} </h4>
							</div>
						</div>
					))}
			</div>
		</div>
	);
};
export default MyFav;
