import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { loggedIn, getfav, saveFavs } from "../requests";

const Layout = ({ cart, children, page }) => {

	const [userz, setUser] = useState("");

	if (userz.role !== 1) {
		setInterval(() => {
			if (userz) {
				getfav(userz._id).then((response, error) => {
					if (error) {
					} else {
						saveFavs(response);
					}
				});
			}
		}, 60000);
	}

	useEffect(() => {
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
};;

export default React.memo(Layout);
