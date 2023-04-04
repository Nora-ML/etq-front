import React, { useContext } from "react";
import { MiniNavContext } from "../context/miniNavContext";
import "../styles/overlay.css";

const Overlay = ({ trigger }) => {
	const { overlayState, onClickingOnOverlay, headerState } =
		useContext(MiniNavContext);

	console.log("Overlay  ::", overlayState);

	return (
		<div
			onClick={() => onClickingOnOverlay()}
			className={
				!overlayState
					? `active_overlay active_overlay--${
							headerState ? "header" : trigger
					  } hidden `
					: `active_overlay active_overlay--${headerState ? "header" : trigger}`
			}></div>
	);
};
export default Overlay;
