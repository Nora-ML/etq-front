import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { itemsInCategory } from "../requests";
import "../styles/shop.css";
import Layout from "../core/Layout";
import MiniNav from "../helpers/MiniNav";
import ProductWrapper from "../helpers/ProductWrapper";
import Filter from "../helpers/Filter";
import Overlay from "../core/Overlay";

const Category1 = () => {
	console.log("Category1.js  ----- rendered");
	const { categoryName } = useParams();
	const [state, setState] = useState([]);
	const [display, setDisplay_OvFi] = useState(false);
	const [commandz, setCommand] = useState("");
	const [displayMininav, setDisplayMininav] = useState(false);
	const [limit, setlimit] = useState(18);
	const [skip, setskip] = useState(0);
	const [displayLayout, setDisplayLayout] = useState(false);
	const [class_overlay, setClass_Overlay] = useState(false);
	const [class_filter, setClass_Filter] = useState(false);
	const [submit, setSubmit] = useState("");

	// Fetching all products in the category specified in the parameter
	const loadingProducts = (categoryName, lim, ski) => {
		console.log("Category1.js  ----- loadingProducts() ...");
		itemsInCategory(categoryName, lim, ski)
			.then((data, error) => {
				if (error) {
					console.log("Category1.js  ----- loadingProducts()=>error : ", error);
				} else {
					if (commandz === "continue") {
						console.log(
							"Category1.js  ----- loadingProducts()=>success,continue "
						);
						setState((prevState) => [...prevState, ...data]);
						setCommand("done");
					} else {
						console.log(
							"Category1.js  ----- loadingProducts()=>success,else  "
						);
						setState(data);
						setCommand("");
					}
					setDisplayLayout(true);
					setDisplayMininav(true);
					setskip(ski);
				}
			})

			.catch((error) => console.log("Category1.js  => error fetching "));
	};

	const displayFilteredProducts = (filter) => {
		console.log(
			"Category1.js  ----- displayFilteredProducts().. filter :",
			filter
		);
		window.scrollTo(0, 0);
		let newData = filter;
		setState(newData);
		setSubmit(true);
		setClass_Overlay("hidden");
		setClass_Filter("hidden");
	};

	useEffect(() => {
		console.log(
			"Category1.js ---- useEffect=> loadingProducts(), CatgeoryName:",
			categoryName
		);

		window.scrollTo(0, 0);
		let toSkip = 0;
		loadingProducts(categoryName, limit, toSkip);
	}, [categoryName]);

	useEffect(() => {
		console.log(
			"Category1.js ---- useEffect=> loadingProducts(), commandz :",
			commandz
		);

		if (commandz === "continue") {
			let toSkip = skip + limit;
			loadingProducts(categoryName, limit, toSkip);
		}
	}, [commandz]);

	useEffect(() => {
		console.log("Category1.js ---- useEffect...listening for elemnt");
		const detectProductIndex = () => {
			console.log("Category1.js ---- useEffect...listeninnnnnnnnnnng");
			let element = document.getElementById("8");
			let eleTop = element.offsetTop;
			let eleHeight = element.getBoundingClientRect().height / 2;
			let scroll = window.scrollY;
			if (
				scroll >= eleTop + eleHeight &&
				scroll <= eleTop + eleHeight + 50 &&
				commandz !== "done"
			) {
				console.log("Category1.js ---- useEffect...HELLOOOOOOOOOOO ..");
				setCommand("continue");
			} else {
				console.log("Category1.js ---- useEffect...BYYYYYYE");
			}
		};
		window.addEventListener("scroll", detectProductIndex);
		return () => window.removeEventListener("scroll", detectProductIndex);
	}, []);

	console.log("STATE :", state);

	//products display view , and calling ProductCard component
	const products = () => {
		console.log("Category1.js  ----- products()");
		return (
			<div className="singleContainer">
				<h4 className="singleContainer__header">
					All {categoryName} : {state.length}
				</h4>
				<div className="productDisplay flex-r--wrap">
					<ProductWrapper products={state} />
				</div>
			</div>
		);
	};
	return (
		<>
			{display && (
				<Overlay
					classN={class_overlay}
					submit_Func={(bool) => setSubmit(bool)}
				/>
			)}
			<Layout>
				{products()}
				{displayMininav && (
					<MiniNav
						display={(show) => setDisplay_OvFi(show)}
						class_Overlay={(classO) => setClass_Overlay(classO)}
						classN={class_overlay}
						class_Filter={(classf) => setClass_Filter(classf)}
						submit_Func={(bool) => setSubmit(bool)}
						submit={submit}
					/>
				)}
				{display && (
					<Filter
						filteredProducts={(filter) => displayFilteredProducts(filter)}
						classN={class_filter}
					/>
				)}
			</Layout>
		</>
	);
};

export default Category1;
