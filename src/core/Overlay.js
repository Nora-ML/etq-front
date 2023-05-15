import React, { useContext } from "react";
import { OverlayContext } from "../context/overlayContext";
import { MainNavBarContext } from "../context/mainNavBarContext";
import { FilterNavBarContext } from "../context/filterContext";

import "../styles/overlay.css";

const Overlay = ({ trigger }) => {
	const { overlayState, setOverlayState } = useContext(OverlayContext);
	const { filterState, exitFilterandOverlay } = useContext(FilterNavBarContext);
	const { activeTab, setActiveTab } = useContext(MainNavBarContext);

	const exitOverlay = () => {
		if (activeTab) {
			setOverlayState(false);
			setActiveTab(false);
		}
		exitFilterandOverlay(false);
	};

	return (
		<div
			onClick={() => exitOverlay()}
			className={
				!overlayState
					? "active_overlay hidden"
					: `active_overlay active_overlay--${overlayState}`
			}></div>
	);
};
export default Overlay;
