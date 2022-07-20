import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
	itemsInCategory,
	filter,
	savelocally,
	retrieveLocal,
	removeLocal,
} from "../requests";
import "../styles/filter.css";

const Filter = ({ filteredProducts, classN, filterSet }) => {
	console.log("Filter.js ----- rendered");
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
			//console.log(error);
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
		console.log("Filter.js --- clearOut() --- result:", result);
		if (result.states) {
			console.log("Filter.js --- clearOut() --- clearing local-filter");
			removeLocal("filter" + categoryName);
			filterSet(true);
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
	};
	const searchArray = (e, name) => {
		console.log("Filter.js ----- searchArray()...");
		const item = e.target.innerText;
		const numerify = Math.floor(item);
		//iterate through "selected" object
		Object.entries(selected).forEach(([key, value]) => {
			// console.log("Filter.js- searchArray() - mapping.. Key:",	key,"name:",name);
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
				//if item has not already been added , add it and class "selected"
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
					//if item has already been added , remove it from array and remove class "selected"
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
		console.log("Filter.js --- useEffect --- fetchingList result:", result);
		if (result.states) {
			console.log(
				"Filter.js --- useEffect --- fetching Locally result.states:",
				result.states
			);
			setCommand(result.states);
		} else {
			fetchFilteredProducts(categoryName, 1000);
		}
	}, [useParams()]);
	useEffect(() => {
		console.log("Filter.js --- useEffect --- command ");
		if (command) {
			console.log(
				"Filter.js ---settingUpData() - fetchingList command:",
				command
			);
			setDiff(command.diff);
			setSelected(command.selected);
			setList(command.list);
			setCount(command.count);
			setTrail(command.trail);
		}
	}, [command, setCommand]);

	useEffect(() => {
		console.log(
			"Filter.js ----- useEffect -- realtime list:",
			list,
			"diff:",
			diff,
			"selected:",
			selected
		);
		console.log("brand.length :", brand.length, "command:", command);
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
		filter({
			categoryName,
			brand,
			colors,
			sizes,
			product_type,
			submit: true,
		}).then((data, error) => {
			if (data) {
				console.log("Filter.js ----- submitForm()> data: ", data);
				filteredProducts({ data: data, filterCount: data.length });
				savelocally({
					name: "filter" + categoryName,
					states: { selected, diff, list, trail, count },
					data: data,
					filterCount: data.length,
				});
			} else {
				console.log("Filter.js ----- submitForm()> error: ", error);
			}
		});
	};
	console.log("Filter.js ----- diff", diff);
	console.log("Filter.js ----- selected", selected);
	console.log("Filter.js ----- list", list);
	console.log("Filter.js ----- trail", trail);

	return (
		<>
			<div
				className={classN === "hidden" ? "filter_page hidden" : "filter_page"}
			>
				<div className="proType">
					<div className="header">
						<h4>Category</h4>
					</div>

					<ul className="proType-img flex-r flex-r--wrap">
						{product_type_list &&
							product_type_list.map((s) => (
								<li
									key={s}
									onClick={(e) => searchArray(e, "product_type")}
									className={
										product_type_diff && !product_type_diff.includes(s)
											? "fadedOption"
											: product_type && product_type.includes(s)
											? "selected"
											: ""
									}
								>
									{s}
								</li>
							))}
					</ul>
				</div>
				<div className="brand">
					<div className="header">
						<h4>Brands</h4>
					</div>

					<ul className="brand-img flex-r flex-r--wrap">
						{brand_list &&
							brand_list.map((s) => (
								<li
									key={s}
									onClick={(e) => searchArray(e, "brand")}
									className={
										brand_diff && !brand_diff.includes(s)
											? "fadedOption"
											: brand.includes(s)
											? "selected"
											: ""
									}
								>
									{s}
								</li>
							))}
					</ul>
				</div>
				<div className="size">
					<div className="header flex-r flex-r--wrap">
						<h4>Size-EU</h4>
					</div>

					<ul className="size-list flex-r flex-r--wrap">
						{sizes_list &&
							sizes_list.map((s) => {
								return (
									<li
										key={s}
										onClick={(e) => searchArray(e, "sizes")}
										className={
											sizes_diff && !sizes_diff.includes(s)
												? "fadedOption"
												: sizes.includes(s)
												? "selected"
												: ""
										}
									>
										{s}
									</li>
								);
							})}
					</ul>
				</div>
				<div className="color">
					<div className="header flex-r">
						<h4>Color</h4>
					</div>
					<ul className="color-list flex-r flex-r--wrap">
						{colors_list &&
							colors_list.map((s) => (
								<li
									key={s}
									onClick={(e) => searchArray(e, "colors")}
									className={
										colors_diff && !colors_diff.includes(s)
											? "fadedOption"
											: colors.includes(s)
											? "selected"
											: ""
									}
								>
									{s}
								</li>
							))}
					</ul>
				</div>
				<div className="reset">
					<div className="header">
						<h4 onClick={() => clearOut()}>Reset Filters</h4>
					</div>
				</div>
				<div className="count">
					<div className="header">
						<h4>Number of items:</h4>
						<p>{count}</p>
					</div>
				</div>
				<div className="submit-button filter-button">
					<input type="button" onClick={submitForm} value="Filter" />
				</div>
			</div>
		</>
	);
};
export default Filter;
