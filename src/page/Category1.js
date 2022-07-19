import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { itemsInCategory, itemsCount, retrieveLocal } from "../requests";
import "../styles/shop.css";
import Layout from "../core/Layout";
import MiniNav from "../helpers/MiniNav";
import ProductWrapper from "../helpers/ProductWrapper";
import Filter from "../helpers/Filter";
import Overlay from "../core/Overlay";

const Category1 = () => {
	console.log("Category1.js  ----- rendered");
	const { categoryName } = useParams();
	const { main } = useRef(null);
	const trigg = 8;
	const limit = 18;
	const theID = document.getElementById("#main");
	const [state, setState] = useState([]);
	const [display, setDisplay_OvFi] = useState(false);
	const [filterReset, setfilterReset] = useState(false);
	const [commandz, setCommand] = useState("");
	const [filterC, setfilterC] = useState();
	const [displayMininav, setDisplayMininav] = useState(false);
	const [skip, setskip] = useState(0);
	const [count, setCount] = useState();
	const [displayLayout, setDisplayLayout] = useState(false);
	const [class_overlay, setClass_Overlay] = useState(false);
	const [class_filter, setClass_Filter] = useState(false);
	const [submit, setSubmit] = useState("");

	// Fetching all products in the category specified in the parameter
	const loadingProducts = (categoryName, lim, ski, command) => {
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
					if (command === "getall") {
						console.log(
							"Category1.js  ----- loadingProducts() -- command == getALL  "
						);
						setSubmit(false);
						setClass_Overlay("");
						setClass_Filter("");
						setfilterC();
						setfilterReset(false);
					} else {
						setDisplayLayout(true);
						setDisplayMininav(true);
						setskip(ski);
					}
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
		let newData = filter.data;
		setState(newData);
		setfilterC(filter.filterCount);
		setSubmit(true);
		setClass_Overlay("hidden");
		setClass_Filter("hidden");
	};

	useEffect(() => {
		console.log(
			"Category1.js ---- useEffect=> loadingProducts(), CatgeoryName:",
			categoryName
		);
		//window.scrollTo(0, 0);
		let result = retrieveLocal("filter" + categoryName);
		const theDrill = (c) => {
			let toSkip = 0;
			loadingProducts(categoryName, limit, toSkip, c);
			itemsCount(categoryName).then((response, error) => {
				console.log("Category1.js ---- itemsCount()");
				if (error || !response) {
					console.log("Category1.js ---- itemsCount() error:", error);
				} else {
					console.log("Category1.js ---- itemsCount() response:", response);
					setCount(response);
				}
			});
		};

		console.log(
			"Category1.js ---- useEffect --- fetching filtered data result:",
			result
		);
		if (result.states) {
			console.log("Category1.js ---- useEffect --- fetching Locally STATES");
			setState(result.data);
			setfilterC(result.filterCount);
			setDisplayMininav(true);
			setSubmit(true);
		} else {
			theDrill("");
		}
		if (filterReset) {
			console.log("Category1.js ---- useEffect --- filterReset");
			theDrill("getall");
		}
	}, [categoryName, filterReset]);

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
			if (document.getElementById(trigg)) {
				let element = document.getElementById(trigg);
				let eleTop = element.offsetTop;
				let eleHeight = element.getBoundingClientRect().height / 2;
				let scroll = window.scrollY;
				if (
					scroll >= eleTop + eleHeight &&
					scroll <= eleTop + eleHeight * 2 &&
					commandz !== "done"
				) {
					console.log("Category1.js ---- useEffect...HELLOOOOOOOOOOO ..");
					setCommand("continue");
				} else {
					console.log("Category1.js ---- useEffect...BYYYYYYE");
				}
			} else {
				console.log("ELEMENT with this ID doesn't exist");
			}
		};

		window.addEventListener("scroll", detectProductIndex);
		return () => window.removeEventListener("scroll", detectProductIndex);
	}, []);

	//products display view , and calling ProductCard component
	const products = () => {
		console.log("Category1.js  ----- products()");
		return (
			<div ref={main} className="singleContainer">
				<h4 className="singleContainer__header">
					All {categoryName} : {filterC ? filterC : count}
				</h4>
				<div className="productDisplay flex-r--wrap">
					<ProductWrapper products={state} />
				</div>
			</div>
		);
	};

	//console.log("Category1.js--states-display:", display);
	//console.log("Category1.js--states-commandz:", commandz);
	//console.log("Category1.js--states-filterC:", filterC);
	//console.log("Category1.js--states-displayMininav:", displayMininav);
	//console.log("Category1.js--states-count:", count);
	//console.log("Category1.js--states-displayLayout:", displayLayout);
	//console.log("Category1.js--states-class_overlay:", class_overlay);
	//console.log("Category1.js--states-class_filter", class_filter);
	//console.log("Category1.js--states-submit:", submit);

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
						filterSet={(filter) => setfilterReset(filter)}
					/>
				)}
			</Layout>
		</>
	);
};

export default Category1;
