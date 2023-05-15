import { useState, createContext } from "react";

export const OverlayContext = createContext();

const OverlayContextProvider = ({ children }) => {
	const [overlayState, setOverlayState] = useState(false);

	const passOn = {
		overlayState,
		setOverlayState,
	};

	return (
		<OverlayContext.Provider value={passOn}>{children}</OverlayContext.Provider>
	);
};

export default OverlayContextProvider;
