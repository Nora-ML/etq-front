import React, { useEffect, useState, useContext } from "react";

import { loggedIn, getfav, saveFavs } from "../requests";
import { ScreenSizeContext } from "../context/screenSizeContext";
import MainNavBar from "./MainNavBar";
import MainNavBarSmallScreen from "./MainNavBarSmallScreen";
import Footer from "./Footer";
import Overlay from "./Overlay";

const Layout = ({
	overlayTrigger,
	cart,
	children,
	page,
	specificClass,
	noFooter,
}) => {
	console.log("LAYOUT component page", page);
	const [user, setUser] = useState("");
	const { screenType } = useContext(ScreenSizeContext);

	if (user.role !== 1) {
		setInterval(() => {
			if (user) {
				getfav(user._id).then((response, error) => {
					if (error) {
					} else {
						saveFavs(response);
					}
				});
			}
		}, 60000);
	}

	useEffect(() => {
		if (user === "") {
			let { user } = loggedIn();
			setUser(user);
		}
	}, [user]);

	return (
		<div className={specificClass}>
			<Overlay />
			{screenType === "mobile" ? (
				<MainNavBarSmallScreen
					page={page}
					cartz={cart}
					user={user}
					setuserZ={(use) => setUser(use)}
				/>
			) : (
				<MainNavBar
					page={page}
					cartz={cart}
					user={user}
					setuserZ={(use) => setUser(use)}
				/>
			)}
			{children}
			{!noFooter && <Footer />}
		</div>
	);
};

export default React.memo(Layout);
