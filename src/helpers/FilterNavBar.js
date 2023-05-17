import React, { useEffect } from "react";
import { FilterNavBarContext } from "../context/filterContext";
import { OverlayContext } from "../context/overlayContext";
import { useContext } from "react";
import "../styles/filter_navBar.css";

const FilterNavBar = () => {
	const {
		exitFilter,
		exitFilterandOverlay,
		enterFilter,
		filterNavBar,
		setFilterNavBar,
		filterState,
	} = useContext(FilterNavBarContext);
	const { overlayState, setOverlayState } = useContext(OverlayContext);

	// Hide FilterNavBar when i get closer to the footer
	useEffect(() => {
		const hideFilterNavBar = () => {
			var all_height = document.documentElement.scrollHeight;
			var scrollbar = document.documentElement.scrollTop;
			var intViewportHeight = window.innerHeight * 1.4;
			if (scrollbar <= all_height - intViewportHeight) {
				setFilterNavBar(true);
			} else {
				exitFilterandOverlay();
				setTimeout(() => {
					setFilterNavBar(false);
				}, 400);
			}
		};

		window.addEventListener("scroll", hideFilterNavBar);

		return () => window.removeEventListener("scroll", hideFilterNavBar);
	}, []);

	const enterFilterandOverlay = () => {
		enterFilter();
		setTimeout(() => {
			setOverlayState("filterNav");
		}, 50);
	};
	return (
		<div
			className={
				filterNavBar /* && !headerState */
					? `filter-navbar filter-navbar--${filterState ? "on" : ""}`
					: "filter-navbar filter-navbar--hide"
			}>
			<div onClick={() => exitFilterandOverlay()} className="filter-navbar_tag">
				Shop
			</div>
			<div
				onClick={() => enterFilterandOverlay()}
				className="filter-navbar_tag">
				Filter
			</div>
		</div>
	);
};
export default FilterNavBar;
