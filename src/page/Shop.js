import React, { useEffect, useState, useRef, useContext } from "react";
import { useParams } from "react-router-dom";
import {
	itemsInCategory,
	itemsCount,
	retrieveLocal,
	filter,
	savelocally,
} from "../requests";
import { FilterNavBarContext } from "../context/filterContext";

import "../styles/shop.css";
import Layout from "../core/Layout";
import FilterNavBar from "../helpers/FilterNavBar";
import FilterWindow from "../helpers/FilterWindow";
import ProductWrapper from "../helpers/ProductWrapper";

const Shop = () => {
	console.log("Shop.js  ----- rendered");
	const { categoryName } = useParams();
	const { main } = useRef(null);
	const { filterSelection } = useContext(FilterNavBarContext);

	const limit = 18;
	const [state, setState] = useState([]);
	const [refetch, setRefetch] = useState(false);
	const [fetchCondition, setFetchCondition] = useState({
		skip: 0,
		fetchCount: 0,
	});
	let { skip, fetchCount } = fetchCondition;
	let trigg = 8 * fetchCondition.fetchCount;
	const [numberOfItemsInCat, setNumberItemsInCat] = useState();

	// Fetching all products in the category specified in the parameter
	const loadingProducts = (condition) => {
		let new_fetch = condition === "reset" ? 0 : fetchCount;
		let skip_new = limit * new_fetch;
		itemsInCategory(categoryName, limit, skip_new)
			.then((data) => {
				new_fetch > 0
					? setState((prevState) => [...prevState, ...data])
					: setState(data);
				setFetchCondition({ skip: skip_new, fetchCount: new_fetch + 1 });
			})
			.catch((error) => console.log("Shop.js  => error fetching "));
	};

	const firstLoad = () => {
		//console.log("Shop.js ---- itemsCount()--- First Load()");
		// getting the numbers of items in the category
		itemsCount(categoryName).then((response, error) => {
			if (error) {
				//console.log("Shop.js ---- itemsCount() error:", error);
			} else {
				//console.log("Shop.js ---- itemsCount() response:", response);
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
		//console.log("Shop.js ---- useEffect=> loadingProducts()");
		//window.scrollTo(0, 0);
		let result = retrieveLocal("filter" + categoryName);
		// data saved loclly
		if (result.states) {
			//console.log("Shop.js ---- useEffect --- fetching Local data");
			setState(result.data);
		} else {
			//console.log("Shop.js ---- useEffect --- no local state");
			window.scrollTo(0, 0);
			firstLoad();
		}
	}, [categoryName]);

	// Detects if a filter is applied
	// runs on submitting filter selection
	useEffect(() => {
		//console.log("Detects changes in filterSelection. Fetch filter data if true.");
		if (filterSelection) {
			//console.log("Shop.js ---- useEffect ---FilterSelection TRUE");
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
			//console.log("Shop.js ---- useEffect ---FilterSelection FALSE");
			window.scrollTo(0, 0);
			firstLoad();
		}
	}, [filterSelection]);

	useEffect(() => {
		//console.log("Shop.js ---- useEffect...listening for elemnt");
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
					setRefetch(true);
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
		if (refetch) {
			loadingProducts();
		}
	}, [refetch]);

	return (
		<Layout>
			<div ref={main} className="shop_main-container">
				<h4 className="shop_header">
					All {categoryName} :{" "}
					{filterSelection ? state.length : numberOfItemsInCat}
				</h4>
				<div className="shop_products-container">
					<ProductWrapper products={state} />
				</div>
			</div>
			<FilterNavBar />
			<FilterWindow />
		</Layout>
	);
};

export default Shop;
