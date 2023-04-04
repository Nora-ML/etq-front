import React, { useEffect, useState, useRef } from "react";
import "../styles/mininav.css";
import "../styles/filter.css";
import { MiniNavContext } from "../context/miniNavContext";
import { useContext } from "react";

const MiniNav = () => {
	const {
		miniNavState,
		setMiniNavState,
		filterState,
		headerState,
		enterFilter,
		exitFilter,
	} = useContext(MiniNavContext);

	console.log("MiniNAV ::", miniNavState);

	// Hide miniNav when i get closer to the footer
	useEffect(() => {
		console.log("MiniNav.js -- useEffect()=> Hide MinBar at trigger point");

		const hideMiniBar = () => {
			var all_height = document.documentElement.scrollHeight;
			var scrollbar = document.documentElement.scrollTop;
			var intViewportHeight = window.innerHeight * 1.5;
			if (scrollbar <= all_height - intViewportHeight) {
				setMiniNavState(true);
			} else {
				exitFilter();
				setTimeout(() => {
					setMiniNavState(false);
				}, 400);
			}
		};

		window.addEventListener("scroll", hideMiniBar);

		return () => window.removeEventListener("scroll", hideMiniBar);
	}, []);

	return (
		<>
			<div
				className={
					miniNavState && !headerState
						? "mini-nav flex-r"
						: "mini-nav flex-r hide"
				}>
				<h4
					onClick={() => exitFilter()}
					className={
						!filterState ? "nav-bar-item shopz current" : "nav-bar-item"
					}>
					Shop
				</h4>
				<h4
					onClick={() => enterFilter()}
					className={
						filterState ? "nav-bar-item filterz current" : "nav-bar-item"
					}>
					Filter
				</h4>
			</div>
		</>
	);
};
export default MiniNav;
