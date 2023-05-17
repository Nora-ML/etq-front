import { useState, createContext } from "react";

export const MainNavBarContext = createContext();

const MainNavBarContextProvider = ({ children }) => {
	const [burgerMenu, setBurgerMenu] = useState(false);
	const [activeTab, setActiveTab] = useState(false);

	const passOn = {
		burgerMenu,
		setBurgerMenu,
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
