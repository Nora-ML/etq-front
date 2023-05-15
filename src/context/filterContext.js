import { useState, createContext, useContext } from "react";
import { OverlayContext } from "./overlayContext";
export const FilterNavBarContext = createContext();

const FilterNavBarProvider = ({ children }) => {
	const { setOverlayState } = useContext(OverlayContext);

	const [filterNavBar, setFilterNavBar] = useState(false);
	const [filterWindow, setFilterWindow] = useState(false);
	const [filterState, setFilterState] = useState(false);
	const [filterSelection, setFilterSelection] = useState(false);

	const exitFilter = () => {
		setFilterState(false);
		setTimeout(() => {
			setFilterWindow(false);
		}, 50);
	};
	const exitFilterandOverlay = () => {
		exitFilter();
		setTimeout(() => {
			setOverlayState(false);
		}, 50);
	};
	const enterFilter = () => {
		setFilterState(true);
		setTimeout(() => {
			setFilterWindow(true);
		}, 100);
	};

	const passOn = {
		exitFilter,
		exitFilterandOverlay,
		enterFilter,
		filterNavBar,
		setFilterNavBar,
		filterSelection,
		setFilterSelection,
		filterWindow,
		setFilterWindow,
		filterState,
		setFilterState,
	};

	return (
		<FilterNavBarContext.Provider value={passOn}>
			{children}
		</FilterNavBarContext.Provider>
	);
};

export default FilterNavBarProvider;
