import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { itemsInCategory, filter } from "../requests";
import "../styles/filter.css";

const Filter = ({ filteredProducts, classN }) => {
	console.log("Filter.js ----- rendered");
	const { categoryName } = useParams();
	const [list, setList] = useState({
		sizes_list: "",
		colors_list: "",
		brands_list: "",
	});
	const [diff, setDiff] = useState({
		phase: "",
		sizes_diff: "",
		colors_diff: "",
		brands_diff: "",
	});
	const [count, setCount] = useState(0);
	const [origincount, setOriginCount] = useState("");
	const [selected, setSelected] = useState({
		brand: [],
		sizes: [],
		colors: [],

		submit: true,
	});

	const { sizes_list, colors_list, brands_list } = list;
	const { sizes_diff, colors_diff, brands_diff, phase } = diff;
	const { sizes, colors, brand, submit } = selected;

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
		setDiff({ sizes_diff: "", colors_diff: "", brands_diff: "" });
		setSelected({ brand: [], sizes: [], colors: [], submit: true });
	};

	useEffect(() => {
		console.log("Filter.js ----- useEffect ..");
		fetchFilteredProducts(categoryName, 1000);
	}, [useParams()]);

	const searchArray = (e, name) => {
		console.log("Filter.js ----- searchArray()...");
		const item = e.target.innerText;
		const numerify = Math.floor(item);
		Object.entries(selected).forEach(([key, value]) => {
			console.log("Filter.js -----searchArray()=> mapping");
			if (key === name) {
				const index =
					key === "sizes"
						? selected[key].indexOf(numerify)
						: selected[key].indexOf(item);
				//if item has not already been added , add it and class "selected"
				if (index === -1) {
					console.log(
						"Filter.js ----- searchArray() 1=> item was NOT prev added"
					);

					if (key === "sizes") {
						if (
							key === "sizes" &&
							(phase === "sizes-brands" || phase === "sizes-colors")
						) {
							setSelected({
								...selected,
								[key]: [...value, numerify],
								brand: [],
								colors: [],
							});
							setDiff({ ...diff, colors_diff: "", brands_diff: "" });
						} else {
							setSelected({
								...selected,
								[key]: [...value, numerify],
							});
						}
					} else if (key === "colors") {
						console.log("Filter.js -----searchArray()=> selecting COLORS");
						if (key === "colors" && phase === "colors-sizes") {
							console.log("Filter.js -----searchArray()=> selecting COLORS--A");
							setSelected({ ...selected, [key]: [...value, item], sizes: [] });
						} else if (key === "colors" && phase === "colors-brands") {
							console.log("Filter.js -----searchArray()=> selecting COLORS--B");
							setSelected({ ...selected, [key]: [...value, item], brand: [] });
						} else {
							console.log("Filter.js -----searchArray()=> selecting COLORS--C");
							setSelected({
								...selected,
								[key]: [...value, item],
							});
						}
					} else if (key === "brand") {
						console.log("Filter.js -----searchArray()=> selecting BRAND");
						if (key === "brand" && phase === "brands-colors") {
							setSelected({ ...selected, [key]: [...value, item], colors: [] });
						} else if (key === "brand" && phase === "brands-sizes") {
							setSelected({ ...selected, [key]: [...value, item], sizes: [] });
						} else {
							setSelected({
								...selected,
								[key]: [...value, item],
							});
						}
					} else {
						console.log("Filter.js -----searchArray()=> LAST OPTION ");
						setSelected({ ...selected, [key]: [...value, item] });
					}
				} else {
					//if item has already been added , remove it from array and remove class "selected"
					console.log("Filter.js ----- searchArray() 1=> item WAS prev added");
					if (key === "sizes") {
						let newArray = value.filter((v) => v !== numerify);
						console.log(
							"Filter.js ----- searchArray() 1=> item WAS prev added -- 1"
						);
						setSelected({ brand: [], colors: [], [key]: newArray });
					} else {
						let newArray = value.filter((v) => v !== item);
						console.log(
							"Filter.js ----- searchArray() 1=> item WAS prev added -- 2"
						);

						setSelected({ ...selected, [key]: newArray });
					}
				}
			}
		});
	};

	useEffect(() => {
		console.log("Filter.js ----- useEffect.. => selected :\n", selected);
		if (
			selected.brand.length < 1 &&
			selected.colors.length < 1 &&
			selected.sizes.length < 1
		) {
			setDiff({ colors_diff: "", brands_diff: "", sizes_diff: "", phase: "" });
			setCount(origincount);
		} else {
			filter({ categoryName, brand, colors, sizes }).then((data, error) => {
				console.log("realTimeFilter() data : ", data);
				setCount(data.count);
				if (
					selected.brand.length > 0 &&
					(phase === "" ||
						phase === "brands" ||
						phase === "brands-colors" ||
						phase === "brands-sizes")
				) {
					console.log("Filter.js ----- useEffect.. => BRAAANDS");
					setDiff({
						phase: "brands",
						colors_diff: data.list.colors_list,
						sizes_diff: data.list.sizes_list,
					});
					if (selected.colors.length > 0) {
						console.log("Filter.js ----- useEffect.. => BRAAANDS + Color");
						setDiff({
							...diff,
							phase: "brands-colors",
							sizes_diff: data.list.sizes_list,
						});
					}
					if (selected.sizes.length > 0) {
						console.log("Filter.js ----- useEffect.. => BRAAANDS + sizes");
						setDiff({
							...diff,
							phase: "brands-sizes",
							colors_diff: data.list.colors_list,
						});
					}
				} else if (
					selected.colors.length > 0 &&
					(phase === "" ||
						phase === "colors" ||
						phase === "colors-brands" ||
						phase === "colors-sizes")
				) {
					console.log("Filter.js ----- useEffect.. => COLORSS");
					setDiff({
						phase: "colors",
						brands_diff: data.list.brands_list,
						sizes_diff: data.list.sizes_list,
					});
					if (selected.brand.length > 0) {
						console.log("Filter.js ----- useEffect.. => Colors Then Brands");
						setDiff({
							...diff,
							phase: "colors-brands",
							sizes_diff: data.list.sizes_list,
						});
					}
					if (selected.sizes.length > 0) {
						console.log("Filter.js ----- useEffect.. => Colors Then Sizes");
						setDiff({
							...diff,
							phase: "colors-sizes",
							brands_diff: data.list.brands_list,
						});
					}
				} else if (
					selected.sizes.length > 0 &&
					(phase === "" ||
						phase === "sizes" ||
						phase === "sizes-colors" ||
						phase === "sizes-brands")
				) {
					console.log("Filter.js ----- useEffect.. =>SIZES");
					setDiff({
						phase: "sizes",
						brands_diff: data.list.brands_list,
						colors_diff: data.list.colors_list,
					});
					if (selected.colors.length > 0) {
						console.log("Filter.js ----- useEffect.. => SIZES + Color");
						if (phase === "sizes-brands") {
							setDiff({
								...diff,
								phase: "sizes-brands",
							});
						} else {
							setDiff({
								...diff,
								phase: "sizes-colors",
								brands_diff: data.list.brands_list,
							});
						}
					} else if (selected.brand.length > 0) {
						console.log("Filter.js ----- useEffect.. => SIZES + brands");
						setDiff({
							...diff,
							phase: "sizes-brands",
							colors_diff: data.list.colors_list,
						});
					}
				}
			});
		}
	}, [brand, brands_list, colors, selected, sizes, categoryName]);

	const submitForm = (e) => {
		console.log("Filter.js ----- submitForm()...");
		filter({ categoryName, brand, colors, sizes, submit: true }).then(
			(data, error) => {
				if (data) {
					console.log("Filter.js ----- submitForm()> data: ", data);
					filteredProducts(data);
				} else {
					console.log("Filter.js ----- submitForm()> error: ", error);
				}
			}
		);
	};
	console.log("Filter.js ----- diff", diff);
	console.log("Filter.js ----- selected", selected);
	console.log("Filter.js ----- list", list);

	console.log(
		"Filter.js ----- SIZE selected",
		selected.sizes[0],
		typeof sizes[0]
	);
	console.log("Filter.js ----- SIZE list", sizes_list[0], typeof sizes_list[0]);

	return (
		<>
			<div
				className={classN === "hidden" ? "filter_page hidden" : "filter_page"}
			>
				<div className="brand">
					<div className="header">
						<h4>Brands</h4>
					</div>

					<ul className="brand-img flex-r flex-r--wrap">
						{brands_list &&
							brands_list.map((s) => (
								<li
									key={s}
									onClick={(e) => searchArray(e, "brand")}
									className={
										brands_diff && !brands_diff.includes(s)
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
						<h4>
							<Link to="/">Size Guide</Link>
						</h4>
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
						<h4>
							<Link to="/">Color Name</Link>
						</h4>
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
