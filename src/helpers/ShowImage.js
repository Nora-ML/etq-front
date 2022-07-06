import React, { useEffect, useState } from "react";
import { API } from "../config";
import { Link } from "react-router-dom";
import { viewImage } from "../requests";
window.Buffer = window.Buffer || require("buffer").Buffer;

const ShowImage = ({ product, classN }) => {
	console.log("ShowImage.js ----  Rendered");

	const [allImages, setAllImages] = useState("");
	const [state, setState] = useState(1);
	const [productID, setProductID] = useState("");

	const slide = (direction, id) => {
		console.log("ShowImage.js ---- slide()=> arrow clicked");
		//onclick will send a request to back end to fetch all the product images
		//will check first if this has not been run before so to prvent running it on every click
		if (productID !== id) {
			setProductID(id);
			displayImage(id, "allphoto");
		}
		navigating(direction);
	};
	const navigating = (direction) => {
		console.log("ShowImage.js ---- navigating ()");
		if (allImages && direction === "plus") {
			/*console.log(" PLUS ");*/
			if (state >= allImages.length - 1) {
				setState(0);
			} else {
				setState(state + 1);
			}
		} else if (direction === "minus") {
			/*console.log(" Minus");*/
			if (state === 0) {
				setState(allImages.length - 1);
			} else {
				setState(state - 1);
			}
		}
	};
	const displayImage = (id, url) => {
		console.log("ShowImage.js ----- displayImage () => fetching Images");
		viewImage(id, url).then((response, error) => {
			if (error) {
				console.log("ShowImage.js -----  displayImage (), error :", error);
				//if we are fetching ALL photo the response will be an "Array" therefore checking by length is easier
			} else if (response.length) {
				//console.log("SetAllImages...");
				setAllImages(response);
			}
		});
	};
	const getSRC = (content, data) => {
		//console.log("ShowImage.js ----  Getting Image source");
		//console.log("Data Type to be Buffered : ", typeof data);
		var b64 = Buffer.from(data).toString("base64");
		// console.log("Buffered Image =>>>", "data:" + content + ";base64," + b64);
		return "data:" + content + ";base64," + b64;
	};

	return (
		<>
			<Link
				key={product._id}
				className={classN}
				to={"/products/" + product._id}
			>
				{allImages && (
					<img
						className="prodBlock__img--DELETE-LATER"
						src={getSRC(allImages[state].contentType, allImages[state].data)}
						alt={product.name}
					/>
				)}
				{!allImages && (
					<img
						className={
							classN.includes("featured")
								? "prodBlock__featured--img"
								: "prodBlock__img"
						}
						src={`${API}/products/photo/${product._id}`}
						alt={product.name}
					/>
				)}
			</Link>

			<div
				className={
					product.image_count > 1
						? "prodBlock__icons"
						: "prodBlock__icons--hide"
				}
			>
				<div
					className="arrow-wrap arrow-wrap-left"
					onClick={() => slide("minus", product._id)}
				>
					<i className="arrow-wrap__icon arrow-wrap__icon-left fas fa-angle-left"></i>
				</div>

				<div
					className="arrow-wrap arrow-wrap-right"
					onClick={() => slide("plus", product._id)}
				>
					<i className="arrow-wrap__icon arrow-wrap__icon-right fas fa-angle-right"></i>
				</div>
			</div>
		</>
	);
};

export default ShowImage;
