import { useState, createContext } from "react";

export const MiniNavContext = createContext();

const MiniContextProvider = ({ children }) => {
	// true if toggled to display filter , false otherwise
	const [miniNavState, setMiniNavState] = useState(false);
	const [filterState, setFilterState] = useState(false);
	const [overlayState, setOverlayState] = useState(false);
	const [headerState, setHeaderState] = useState(false);
	const [filterSelection, setFilterSelection] = useState(false);

	// Cases:
	// 1- when hiding miniNav bar onScroll
	// 2- when submitting filterForm
	const exitFilter = () => {
		setOverlayState(false);
		setTimeout(() => {
			setFilterState(false);
		}, 100);
	};

	const enterFilter = () => {
		setOverlayState(true);
		setTimeout(() => {
			setFilterState(true);
		}, 100);
	};

	const onClickingOnOverlay = () => {
		setOverlayState(false);
		setFilterState(false);
		// add any other pop-up that should be closed as well
		//ex ) navigation and edit commands
	};

	const passOn = {
		onClickingOnOverlay,
		headerState,
		setHeaderState,
		miniNavState,
		overlayState,
		exitFilter,
		enterFilter,
		setOverlayState,
		setMiniNavState,
		filterState,
		filterSelection,
		setFilterSelection,
		setFilterState,
	};

	return (
		<MiniNavContext.Provider value={passOn}>{children}</MiniNavContext.Provider>
	);
};

export default MiniContextProvider;
