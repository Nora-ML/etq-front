import React, { useEffect, useState, useRef, useContext } from "react";
import { useParams } from "react-router-dom";
import {
	itemsInCategory,
	itemsCount,
	retrieveLocal,
	filter,
	savelocally,
} from "../requests";
import { MiniNavContext } from "../context/miniNavContext";

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
	const { filterSelection, setFilterSelection } = useContext(MiniNavContext);

	const limit = 18;
	const [state, setState] = useState([]);
	const [refetch, setRefetch] = useState(false);

	const [fetchCondition, setFetchCondition] = useState({
		skip: 0,
		fetchCount: 0,
	});
	let trigg = 8 * fetchCondition.fetchCount;
	const [numberOfItemsInCat, setNumberItemsInCat] = useState();

	let { skip, fetchCount } = fetchCondition;

	// Fetching all products in the category specified in the parameter
	const loadingProducts = (condition) => {
		console.log(
			"Category1.js  ----- loadingProducts() ...fetchCount",
			fetchCount,
			"skip",
			skip
		);
		let new_fetch = condition === "reset" ? 0 : fetchCount;
		let skip_new = limit * new_fetch;
		itemsInCategory(categoryName, limit, skip_new)
			.then((data) => {
				new_fetch > 0
					? setState((prevState) => [...prevState, ...data])
					: setState(data);
				setFetchCondition({ skip: skip_new, fetchCount: new_fetch + 1 });
			})
			.catch((error) => console.log("Category1.js  => error fetching "));
	};

	const firstLoad = () => {
		console.log("Category1.js ---- itemsCount()--- First Load()");
		// getting the numbers of items in the category

		itemsCount(categoryName).then((response, error) => {
			if (error) {
				//console.log("Category1.js ---- itemsCount() error:", error);
			} else {
				//console.log("Category1.js ---- itemsCount() response:", response);
				setNumberItemsInCat(response);
			}
		});
		// fetching first batch

		loadingProducts("reset");
	};

	// First To run
	// Retrieves products either from :
	// 1- localStorage (In case of filtered data)
	// 2- fetch from db
	useEffect(() => {
		//console.log("Category1.js ---- useEffect=> loadingProducts()");
		//window.scrollTo(0, 0);
		let result = retrieveLocal("filter" + categoryName);
		// data saved loclly
		if (result.states) {
			//console.log("Category1.js ---- useEffect --- fetching Local data");
			setState(result.data);
		} else {
			//console.log("Category1.js ---- useEffect --- no local state");
			window.scrollTo(0, 0);
			firstLoad();
		}
	}, [categoryName]);

	// Detects if a filter is applied
	// runs on submitting filter selection
	useEffect(() => {
		//console.log("Detects changes in filterSelection. Fetch filter data if true.");

		if (filterSelection) {
			//console.log("Category1.js ---- useEffect ---FilterSelection TRUE");
			window.scrollTo(0, 0);
			filter(filterSelection.toFetch).then((data, error) => {
				if (data) {
					//console.log("Filter.js ----- submitForm()> data: ", data);
					setFetchCondition({ skip: 0, fetchCount: 0 });
					setState(data);
					savelocally({
						...filterSelection.toSaveLocally,
						data: data,
						filterCount: data.length,
					});
				} else {
					//console.log("Filter.js ----- submitForm()> error: ", error);
				}
			});
		}
		if (!filterSelection && refetch) {
			//console.log("Category1.js ---- useEffect ---FilterSelection FALSE");
			window.scrollTo(0, 0);
			firstLoad();
		}
	}, [filterSelection]);

	useEffect(() => {
		//console.log("Category1.js ---- useEffect...listening for elemnt");
		const detectProductIndex = () => {
			if (document.getElementById(trigg) && numberOfItemsInCat > limit + skip) {
				let element = document.getElementById(trigg);
				let eleTop = element.offsetTop;
				let eleHeight = element.getBoundingClientRect().height / 2;
				let scroll = window.scrollY;
				if (
					scroll >= eleTop + eleHeight &&
					scroll <= eleTop + eleHeight * 2 &&
					!refetch
				) {
					//console.log("Category1.js ---- useEffect...HELLOOOOOOOOOOO ..");
					setRefetch(true);
				} else {
					//console.log("Category1.js ---- useEffect...BYYYYYYE");
				}
			} else {
				//console.log("ELEMENT with this ID doesn't exist");
			}
		};

		window.addEventListener("scroll", detectProductIndex);
		return () => window.removeEventListener("scroll", detectProductIndex);
	}, [numberOfItemsInCat]);

	// Detects if a load intersection reached

	useEffect(() => {
		//console.log("Detects changes due to intersection. ");
		if (refetch) {
			//console.log("Category1.js ---- Refetching , fetchCount", fetchCount);
			loadingProducts();
		}
	}, [refetch]);

	//products display view , and calling ProductCard component
	const products = () => {
		//console.log("Category1.js  ----- products()");
		return (
			<div ref={main} className="singleContainer">
				<h4 className="singleContainer__header">
					All {categoryName} :{" "}
					{filterSelection ? state.length : numberOfItemsInCat}
				</h4>
				<div className="productDisplay flex-r--wrap">
					<ProductWrapper products={state} />
				</div>
			</div>
		);
	};

	return (
		<>
			<Overlay trigger="miniNav" />
			<Layout>
				{products()}
				<MiniNav />
				<Filter />
			</Layout>
		</>
	);
};

export default Category1;
