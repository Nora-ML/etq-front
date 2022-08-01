import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../core/Layout";
import Cover from "../helpers/Home-Cover";
import HomeInfoSec from "../helpers/Home-Info";
import HomeFavs from "../helpers/Home-Favourites";
import HomeStore from "../helpers/Home-Store";
import "../styles/home.css";

const Home = () => {
	console.log("Home.js --- rendered");
	const [animate, setAnimate] = useState(localStorage.getItem("HomeAnimate"));


	window.onload = () => {
		if (localStorage.getItem("HomeAnimate")) {
			localStorage.removeItem("HomeAnimate");
		}
	};
	//This Function will be called from useEffect on scroll Event with arguments scrollY and innerheight
	//We set 3 points  that will trigger an animation when scrolled to.
	function scrollTrigger(scroll, innerheight) {
		console.log("Home.js --- scrollTrigger() ,animate :", animate);
		const half = innerheight / 2;
		const quarter = innerheight / 4;

		let local = localStorage.getItem("HomeAnimate");
		console.log("LOOOOCAL ", local);

		if (scroll >= quarter && local === null) {
			console.log("**** FIRST animation ");
			if (typeof window !== "undefined") {
				localStorage.setItem("HomeAnimate", "first");
				setAnimate("first");
			}
		} else if (scroll >= innerheight - quarter && local === "first") {
			console.log("**** SECOND animation :", !local.includes("second"));
			saveTolocalStorage("second");
		} else if (scroll >= innerheight + half && !local.includes("third")) {
			console.log("**** THIRD animation");
			saveTolocalStorage("third");
		}
	}

	const saveTolocalStorage = (section) => {
		let local = localStorage.getItem("HomeAnimate");
		console.log("Home.js --- saveTolocalStorage() ,local :", local);
		let update = local + section;
		localStorage.setItem("HomeAnimate", update);
		setAnimate(update);
	};
	useEffect(() => {
		console.log("Home.js --- useEffect ...animate :", animate);
		const scrollFunction = () => {
			const scroll = window.scrollY;
			const innerheight = window.innerHeight;
			scrollTrigger(scroll, innerheight);
		};

		let local = localStorage.getItem("HomeAnimate");

		if (local === null || !local.includes("third")) {
			console.log("Home.js --- useEffect, eventlistener ONN");
			window.addEventListener("scroll", scrollFunction);
		} else {
			console.log("Home.js --- useEffect, eventlistener OFF");
			window.removeEventListener("scroll", scrollFunction);
		}
		return () => window.removeEventListener("scroll", scrollFunction);
	});

	const content = () => {
		return (
			<>
				<div className="main-grid">
					<Cover />

					{animate && animate.includes("first") ? (
						<HomeInfoSec classN="sec-2" />
					) : (
						<HomeInfoSec classN="notDisplayed" />
					)}
					{animate && animate.includes("second") ? (
						<HomeFavs classN="sec-3 flex-c" />
					) : (
						<HomeFavs classN="notDisplayed" />
					)}
					{animate && animate.includes("third") ? (
						<HomeStore classN="sec-4" />
					) : (
						<HomeStore classN="notDisplayed" />
					)}
				</div>
			</>
		);
	};
	return <Layout page="home">{content()}</Layout>;
};

export default Home;
