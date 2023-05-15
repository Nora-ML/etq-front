import { useState, createContext } from "react";

export const MainNavBarContext = createContext();

const MainNavBarContextProvider = ({ children }) => {
	const [mainNavBar, setMainNavBar] = useState(false);
	const [activeTab, setActiveTab] = useState(false);

	const passOn = {
		mainNavBar,
		setMainNavBar,
		activeTab,
		setActiveTab,
	};

	return (
		<MainNavBarContext.Provider value={passOn}>
			{children}
		</MainNavBarContext.Provider>
	);
};

export default MainNavBarContextProvider;
