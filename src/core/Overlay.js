import React, { useEffect, useState } from "react";
import "../styles/overlay.css";

const Overlay = ({ classN, submit_Func }) => {
	console.log("Overlay.js ---- rendered classN:", classN);
	const [state, setState] = useState(classN);

	useEffect(() => {
		setState(classN);
	}, [classN]);

	console.log("Overlay state :", state);

	useEffect(() => {
		function exitActive() {
			console.log("Overlay.js ----  exitActive() ");
			submit_Func(true);
		}

		function nonActiveArea(e) {
			console.log("Overlay.js ----  nonActiveArea()=> e ==", e);
			e.path.find((p) => {
				return (
					p.className === "mini-nav flex-r " ||
					p.className === "filter_page" ||
					p.className === "form-container edit"
				);
			})
				? console.log("Don't exit")
				: exitActive();
		}
		window.addEventListener("click", nonActiveArea);

		//cleanup useEffect
		return () => window.removeEventListener("click", nonActiveArea);
	}, []);

	return (
		<div
			className={
				state === "hidden"
					? "active_overlay active_overlay--miniNav hidden"
					: "active_overlay active_overlay--miniNav"
			}
		></div>
	);
};
export default Overlay;
