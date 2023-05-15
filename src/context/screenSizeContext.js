import { useEffect } from "react";
import { useState, createContext } from "react";

export const ScreenSizeContext = createContext();

let getScreenSize = function () {
	console.log("ON FIRST LOAD layout loaded and parsed");
	const innerWidth = window.innerWidth;
	const innerheight = window.innerHeight;
	const ratio = innerWidth / innerheight;
	if (ratio >= 1) {
		return "landscape";
	}
	if (innerWidth <= 1025 && innerWidth >= 769) {
		return "tablet";
	} else if (innerWidth > 1025) {
		return "desktop";
	} else {
		return "mobile";
	}
};

const ScreenSizeContextProvider = ({ children }) => {
	let [screenType, setScreenType] = useState(() => getScreenSize());

	console.log("ScreenTYpe context layout", screenType);

	useEffect(() => {
		let getScreenSize_Set = function () {
			let screenOnResize = getScreenSize();
			setScreenType(screenOnResize);
		};
		window.addEventListener("resize", getScreenSize_Set);

		return () => {
			window.removeEventListener("resize", getScreenSize_Set);
		};
	});

	return (
		<ScreenSizeContext.Provider value={{ screenType }}>
			{children}
		</ScreenSizeContext.Provider>
	);
};
export default ScreenSizeContextProvider;
