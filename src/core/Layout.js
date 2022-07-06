import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { loggedIn, getfav, saveFavs } from "../requests";

const Layout = ({ cart, children, page }) => {
	console.log("** Layout Component rendered");
	
	const [userz, setUser] = useState("");

	setInterval(() => {
		console.log("Layout.js --updateFavs in local Storage--- TIMER ");
		if (userz) {
			getfav(userz._id).then((response, error) => {
				if (error) {
					console.log("Layout.js -- SetInterval to save Favs- error ");
				} else {
					console.log("Layout.js -- SetInterval to save Favs- success ");
					saveFavs(response);
				}
			});
		}
	}, 480000);

	useEffect(() => {
		console.log("Layout.js -- --- useEffect");
		if (userz === "") {
			const { user } = loggedIn();
			setUser(user);
		}
	}, [userz]);

	return (
		<>
			<Header
				page={page}
				cartz={cart}
				user={userz}
				setuserZ={(use) => setUser(use)}
			/>
			{children}
			<Footer />
		</>
	);
};

export default React.memo(Layout);
