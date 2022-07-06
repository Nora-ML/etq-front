import React, { useEffect, useState, useRef } from "react";
import "../styles/mininav.css";
import "../styles/filter.css";

const MiniNav = ({
	display,
	class_Overlay,
	class_Filter,
	submit_Func,
	submit,
}) => {
	console.log("MiniNav.js ----  rendered ");
	const [miniNavState, setMiniNavState] = useState("");
	const [istoggled, setToggle] = useState(false);

	useEffect(() => {
		console.log("MiniNav.js ---- useEffect()=> rendered");

		// This will listen to the scroll event and hide the miniNav when i get closer to the footer */
		window.addEventListener("scroll", () => {
			var all_height = document.documentElement.scrollHeight;
			var scrollbar = document.documentElement.scrollTop;
			var intViewportHeight = window.innerHeight * 1.5;
			if (scrollbar <= all_height - intViewportHeight) {
				setMiniNavState("");
			} else {
				setMiniNavState("hide");
			}
		});

		function exitActive() {
			console.log("MiniNav.js ----  exitActive() ");
			setToggle(false);
			class_Filter("hidden");
			class_Overlay("hidden");
			submit_Func(false);
		}
		function activate() {
			console.log("MiniNav.js ----  activate() ");
			class_Filter("");
			class_Overlay("");
			display(true);
		}
		if (submit === true) {
			console.log("MiniNav.js ---- useEffect()=> submit =", submit);
			exitActive();
		} else if (istoggled) {
			console.log("MiniNav.js ---- useEffect()=> isToggled =", istoggled);
			activate();
		} else if (!istoggled) {
			console.log("MiniNav.js ---- useEffect()=> isToggled =", istoggled);
			exitActive();
		}
	}, [istoggled, submit, submit_Func, display, class_Filter, class_Overlay]);

	return (
		<>
			<div className={"mini-nav flex-r " + miniNavState}>
				<h4
					onClick={() => setToggle(false)}
					className={!istoggled ? "nav-bar-item shopz current" : "nav-bar-item"}
				>
					Shop
				</h4>
				<h4
					onClick={() => setToggle(true)}
					className={
						istoggled ? "nav-bar-item filterz current" : "nav-bar-item"
					}
				>
					Filter
				</h4>
			</div>
		</>
	);
};
export default MiniNav;
