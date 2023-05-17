import React, { useEffect, useState } from "react";
import { API } from "../config";
import { Link, useLocation } from "react-router-dom";
import { viewProductImages } from "../requests";

const ShowImage = ({ product, classN }) => {
	console.log(
		"ShowImage.js ----  Rendered ,product",
		product,
		"classN",
		classN
	);
	let { image, id, image_count } = product;
	let location = useLocation();
	const [allImages, setAllImages] = useState("");
	const [state, setState] = useState(1);

	const slide = async (direction, id) => {
		try {
			await displayImage(id);
			return navigating(direction);
		} catch (error) {
			console.log("Error", error);
		}
	};
	const navigating = async (direction) => {
		console.log("ShowImage.js ---- navigating ...");
		if (allImages && direction === "plus") {
			if (state >= allImages.length - 1) {
				setState(0);
			} else {
				setState(state + 1);
			}
		} else if (direction === "minus") {
			if (state === 0) {
				setState(allImages.length - 1);
			} else {
				setState(state - 1);
			}
		}
	};
	const displayImage = async (id) => {
		console.log("ShowImage.js ---- Fetching Images ...");
		await viewProductImages(id).then((response, error) => {
			if (error) {
				console.log("ShowImage.js -----  displayImage (), error :", error);
				//if we are fetching ALL photo the response will be an "Array" therefore checking by length is easier
			} else if (response.length) {
				console.log("ShowImage.js ---- ALL IMAGES FETCHED", response);
				return setAllImages(response);
			}
		});
	};

	return (
		<>
			<Link key={id} className={classN} to={"/products/" + id}>
				<img
					className={`${classN}_image`}
					src={allImages ? allImages[state].data : image.data}
					alt={allImages ? allImages[state].name : image.name}
				/>
			</Link>

			{location.pathname === "/" ? (
				""
			) : (
				<div
					className={
						image_count > 1 ? `${classN}_arrows` : `${classN}_arrows-hide`
					}>
					<div
						className="shop_arrow-wrap shop_arrow-wrap-left"
						onClick={() => slide("minus", id)}>
						<i className="arrow-wrap__icon arrow-wrap__icon-left fas fa-angle-left"></i>
					</div>

					<div
						className="shop_arrow-wrap shop_arrow-wrap-right"
						onClick={() => slide("plus", id)}>
						<i className="arrow-wrap__icon arrow-wrap__icon-right fas fa-angle-right"></i>
					</div>
				</div>
			)}
		</>
	);
};

export default ShowImage;
