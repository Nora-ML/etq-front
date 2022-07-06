import React, { useEffect, useState } from "react";
import { adjustfav, retrieveFavs } from "../requests";
import blackFavourites from "../icons/favourites.png";
import greenFavourite from "../icons/favourites-green.png";

const UserCommands = ({ product, user }) => {
	console.log("UserCommands.js ---- rendered ");
	const [favourites, setFavourite] = useState("none");

	const manageFavourites = (id) => {
		console.log("UserCommands.js ---- manageFavourites() ");
		console.log("favourites :", favourites);
		adjustfav({ userId: user._id, prodId: id }).then((data, error) => {
			if (error) {
				console.log("UserCommands.js ---- adjustfavourites() error:", error);
			} else {
				console.log("UserCommands.js ---- adjustfavourites() data:", data);
				setFavourite(data);
			}
		});
	};
	useEffect(() => {
		console.log("UserCommands.js ---- useEffect ,retrieveFavs()");
		setFavourite(retrieveFavs());
		return setFavourite(retrieveFavs());
	}, []);

	return (
		<div key={product._id} className="prodBlock_userCommand">
			<button
				onClick={() => manageFavourites(product._id)}
				className="favourites"
			>
				<img
					src={
						favourites.length > 0 && favourites.includes(product._id)
							? greenFavourite
							: blackFavourites
					}
					alt="favourites"
					width="30"
					height="35"
				/>
			</button>
		</div>
	);
};
export default React.memo(UserCommands);
