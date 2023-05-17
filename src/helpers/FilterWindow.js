import React, { useEffect, useState, memo } from "react";
import { useParams } from "react-router-dom";
import {
	itemsInCategory,
	filter,
	retrieveLocal,
	removeLocal,
} from "../requests";
import { FilterNavBarContext } from "../context/filterContext";
import { OverlayContext } from "../context/overlayContext";
import { useContext } from "react";
import "../styles/filter_window.css";

const FilterWindow = () => {
	console.log("Filter.js ----- rendered");
	const { exitFilterandOverlay, setFilterSelection, filterWindow } =
		useContext(FilterNavBarContext);
	const { overlayState, setOverlayState } = useContext(OverlayContext);

	const filters = ["brand", "colors", "sizes", "product_type"];
	const { categoryName } = useParams();
	const [trail, setTrail] = useState();
	const [command, setCommand] = useState();
	const [list, setList] = useState({
		sizes_list: "",
		product_type_list: "",
		colors_list: "",
		brand_list: "",
	});
	const [diff, setDiff] = useState({
		sizes_diff: "",
		product_type_diff: "",
		colors_diff: "",
		brand_diff: "",
	});
	const [count, setCount] = useState(0);
	const [origincount, setOriginCount] = useState("");
	const [selected, setSelected] = useState({
		brand: [],
		sizes: [],
		colors: [],
		product_type: [],
		submit: true,
	});

	const { sizes_list, colors_list, brand_list, product_type_list } = list;
	const { sizes_diff, colors_diff, brand_diff, product_type_diff } = diff;
	const { sizes, colors, brand, product_type } = selected;

	const fetchFilteredProducts = (cat, limit) => {
		console.log("Filter.js ----- fetchFilteredProducts () ..");
		itemsInCategory(cat, limit).then((data, error) => {
			//console.log("fetchFilteredProducts () ;", data);
			if (error || !data) {
				console.log("Filter.js ----- fetchFilteredProducts() => error");
			} else {
				console.log("Filter.js ----- fetchFilteredProducts() => success");
				setCount(data.count);
				setOriginCount(data.count);
				setList(data.list);
				clearOut();
			}
		});
	};
	const clearOut = () => {
		console.log("Filter.js ----- clearOut() ");
		let result = retrieveLocal("filter" + categoryName);
		if (result.states) {
			console.log("Filter.js --- clearOut() --- clearing local-filter");
			removeLocal("filter" + categoryName);
			setFilterSelection(false);
		}
		setDiff({
			sizes_diff: "",
			colors_diff: "",
			brand_diff: "",
			product_type_diff: "",
		});
		setSelected({
			brand: [],
			sizes: [],
			colors: [],
			product_type: [],
			submit: true,
		});
		/* if (!headerState) {
			exitFilter();
		} */
	};
	const searchArray = (e, name) => {
		console.log("Filter.js ----- searchArray()...");
		const item = e.target.innerText;
		const numerify = Math.floor(item);
		//iterate through "filter_window_options filter_window_options--selected" object
		Object.entries(selected).forEach(([key, value]) => {
			if (key === name) {
				const index =
					key === "sizes"
						? selected[key].indexOf(numerify)
						: selected[key].indexOf(item);
				//general first choice function
				const action = () => {
					console.log("Filter.js ----- searchArray() action");
					if (!trail) {
						setTrail([key.toString()]);
					} else if (trail && !trail.includes(key)) {
						setTrail((prevState) => prevState.concat(key.toString()));
					}
					setSelected({
						...selected,
						[key]: [...value, key === "sizes" ? numerify : item],
					});
				};
				const resetTrail = (x) => {
					let theIndex = trail.indexOf(key) + 1;
					let newTrail = trail.slice(0, theIndex);
					let newSelection = {};
					filters.forEach((i) => {
						if (!newTrail.includes(i)) {
							newSelection[i] = [];
						} else if (newTrail.includes(i) && i === key) {
							if (x === "remove") {
								console.log("Filter.js - resetTrail - remove -reverse Selec");
								let newArray = value.filter((v) =>
									key === "sizes" ? v !== numerify : v !== item
								);
								if (newArray.length < 1) {
									console.log("Filter.js - resetTrail - remove - pop");
									newTrail.pop();
									newSelection[i] = [];
								} else {
									console.log(
										"Filter.js - resetTrail - remove - newArray",
										newArray
									);
									newSelection[i] = newArray;
								}
							} else {
								console.log("Filter.js - resetTrail - add -reverse Selec");
								newSelection[i] = [...value, key === "sizes" ? numerify : item];
							}
						} else {
							newSelection[i] = selected[i];
						}
					});
					setTrail(newTrail);
					setSelected(newSelection);
				};
				//if item has not already been added , add it and class "filter_window_options filter_window_options--selected"
				if (index === -1) {
					console.log("Filter.js -- searchArray() - NEW");
					//first selection || repeat selection || new selection
					if (
						!trail ||
						trail[trail.length - 1] === key ||
						!trail.includes(key)
					) {
						console.log("Filter.js - searchArray - NEW  -first Selec");
						action();
					} else {
						console.log("Filter.js - searchArray - NEW -reverse Selec");
						resetTrail();
					}
					//if item has already been added , remove it from array and remove class "filter_window_options filter_window_options--selected"
				} else {
					console.log("Filter.js - searchArray() - old ");
					resetTrail("remove");
				}
			}
		});
	};

	useEffect(() => {
		console.log("Filter.js --- useEffect --- fetchingList");
		let result = retrieveLocal("filter" + categoryName);
		if (result.states) {
			setCommand(result.states);
		} else {
			fetchFilteredProducts(categoryName, 1000);
		}
	}, [useParams()]);

	useEffect(() => {
		console.log("Filter.js --- useEffect --- command ");
		if (command) {
			setDiff(command.diff);
			setSelected(command.selected);
			setList(command.list);
			setCount(command.count);
			setTrail(command.trail);
		}
	}, [command, setCommand]);

	useEffect(() => {
		console.log("Filter.js ----- useEffect -- realtime list");
		if (
			!command &&
			brand.length === 0 &&
			colors.length === 0 &&
			product_type.length === 0 &&
			sizes.length === 0
		) {
			console.log("Filter.js ----- useEffect -- clearing");
			setDiff({
				colors_diff: "",
				brand_diff: "",
				sizes_diff: "",
				product_type_diff: "",
			});
			setTrail();
			setCount(origincount);
		} else {
			filter({ categoryName, brand, colors, sizes, product_type, trail }).then(
				(data, error) => {
					console.log("realTimeFilter() data : ", data);
					setCount(data.count);
					let set = {};
					for (let i = 0; i < filters.length; i++) {
						console.log("Filter.js ----- useEffect..--inlOOP -1");
						let diffCon = filters[i] + "_diff";
						let listCon = filters[i] + "_list";

						if (trail && trail[0] === filters[i]) {
							console.log("Filter.js -- useEffect - first included");
							set[diffCon] = "";
						} else if (trail && trail.includes(filters[i])) {
							console.log("Filter.js -- useEffect -included");
							set[diffCon] = diff[diffCon];
						} else {
							console.log("Filter.js -- useEffect -excluded");
							set[diffCon] = data.list[listCon];
						}
					}
					console.log("Filter.js -- useEffect -set", set);
					setDiff(set);
				}
			);
		}
	}, [brand, colors, sizes, product_type, trail, categoryName]);

	const submitForm = (e) => {
		console.log("Filter.js ----- submitForm()...");

		setFilterSelection({
			toFetch: {
				categoryName,
				brand,
				colors,
				sizes,
				product_type,
				submit: true,
			},
			toSaveLocally: {
				name: "filter" + categoryName,
				states: { selected, diff, list, trail, count },
			},
		});

		exitFilterandOverlay();
	};

	return (
		<div
			className={
				!filterWindow
					? "filter_window "
					: "filter_window filter_window--display"
			}>
			<div className="filter_window-type filter_window-type_category">
				<ul className="filter_window_options-wrapper">
					<h4 className="filter_window_header">Category :</h4>
					{product_type_list &&
						product_type_list.map((s) => (
							<li
								key={s}
								onClick={(e) => searchArray(e, "product_type")}
								className={
									product_type_diff && !product_type_diff.includes(s)
										? "filter_window_options filter_window_options--faded"
										: product_type && product_type.includes(s)
										? "filter_window_options filter_window_options--selected"
										: "filter_window_options"
								}>
								{s}
							</li>
						))}
				</ul>
			</div>
			<div className="filter_window-type filter_window-type_brand">
				<ul className="filter_window_options-wrapper">
					<h4 className="filter_window_header">Brands :</h4>
					{brand_list &&
						brand_list.map((s) => (
							<li
								key={s}
								onClick={(e) => searchArray(e, "brand")}
								className={
									brand_diff && !brand_diff.includes(s)
										? "filter_window_options filter_window_options--faded"
										: brand.includes(s)
										? "filter_window_options filter_window_options--selected"
										: "filter_window_options"
								}>
								{s}
							</li>
						))}
				</ul>
			</div>
			<div className="filter_window-type filter_window-type_size">
				<ul className="filter_window_options-wrapper">
					<h4 className="filter_window_header">Size-EU :</h4>
					{sizes_list &&
						sizes_list.map((s) => {
							return (
								<li
									key={s}
									onClick={(e) => searchArray(e, "sizes")}
									className={
										sizes_diff && !sizes_diff.includes(s)
											? "filter_window_options filter_window_options--faded"
											: sizes.includes(s)
											? "filter_window_options filter_window_options--selected"
											: "filter_window_options"
									}>
									{s}
								</li>
							);
						})}
				</ul>
			</div>
			<div className="filter_window-type filter_window-type_color">
				<ul className="filter_window_options-wrapper">
					<h4 className="filter_window_header">Color :</h4>
					{colors_list &&
						colors_list.map((s) => (
							<li
								key={s}
								onClick={(e) => searchArray(e, "colors")}
								className={
									colors_diff && !colors_diff.includes(s)
										? "filter_window_options filter_window_options--faded"
										: colors.includes(s)
										? "filter_window_options filter_window_options--selected"
										: "filter_window_options"
								}>
								{s}
							</li>
						))}
				</ul>
			</div>
			<div className="filter_window-controls">
				<h4 onClick={() => clearOut()}>Reset</h4>
				<h4>Items: {count}</h4>
				<input
					className="filter_window-controls-button"
					type="button"
					onClick={submitForm}
					value="Filter"
				/>
			</div>
		</div>
	);
};
export default memo(FilterWindow);
