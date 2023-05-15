import React, { useEffect } from "react";
import "../styles/filter_navBar.css";
import "../styles/filter_window.css";
import { FilterNavBarContext } from "../context/filterContext";
import { OverlayContext } from "../context/overlayContext";
import { useContext } from "react";

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
					? "mini-nav flex-r"
					: "mini-nav flex-r hide"
			}>
			<h4
				onClick={() => exitFilterandOverlay()}
				className={
					!filterState ? "nav-bar-item shopz current" : "nav-bar-item"
				}>
				Shop
			</h4>
			<h4
				onClick={() => enterFilterandOverlay()}
				className={
					filterState ? "nav-bar-item filterz current" : "nav-bar-item"
				}>
				Filter
			</h4>
		</div>
	);
};
export default FilterNavBar;
