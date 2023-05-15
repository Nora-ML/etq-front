import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut, signOutFront, capitalizeFirst, list } from "../requests";
import SemiCart from "../helpers/SemiCart.js";
import { MainNavBarContext } from "../context/mainNavBarContext";
import { OverlayContext } from "../context/overlayContext";
import { CartContext } from "../context/cartContext";
import { useContext } from "react";

import "../styles/header.css";

const MainNavBar = ({ page, user, setuserZ }) => {
	console.log("MainNavBar.js=> rendered ...");
	const navigate = useNavigate();
	// global states from context
	const { mainNavBar, setMainNavBar, setActiveTab, activeTab } =
		useContext(MainNavBarContext);
	const { setOverlayState } = useContext(OverlayContext);
	const { itemCount } = useContext(CartContext);
	// local states
	const [categories, setCategories] = useState([]);
	const [navstate, setnavState] = useState("classic");

	// Activating/ Deactivating  navBar tabs updating global state onClick
	// toggling the overlay state
	// redirecting if path is available
	const activate = (n, destin) => {
		console.log("header.js=> activate() =>n: ", n);

		if (activeTab === n) {
			console.log("header.js ---- activate() =>1");
			setActiveTab(false);
			setOverlayState(false);
			redirect(destin);
		} else {
			console.log("header.js ---- activate() =>2");
			setActiveTab(n);
			setOverlayState(true);
			setMainNavBar(true);
			redirect(destin);
		}
	};

	const redirect = (destin) => {
		console.log("Redirect", destin);
		if (destin !== "") {
			console.log("... Redirecting", destin);
			setTimeout(() => {
				console.log("Header.js ---- useEffect -- setTimeout");
				navigate(destin);
			}, 350);
		}
	};

	// Hiding and activating Main nav bar on SCROLL
	const scrollUp = (scroll) => {
		console.log("mainNaveBar on ScrollUP", mainNavBar);
		if (mainNavBar === true) {
			setnavState("active");
		} else if (scroll === 0) {
			setnavState("classic");
		} else if (navstate === "hide") {
			setnavState("active");
		}
	};
	const scrollDown = (scroll, inner) => {
		console.log("mainNaveBar on ScrollDown", mainNavBar);
		if (mainNavBar === true) {
			setnavState("active");
		} else if (scroll < inner) {
			setnavState("active");
		} else {
			setnavState("hide");
		}
	};

	// Detects the nav state and returns appropriate classname. Called in the nav element
	const navTrigger = () => {
		console.log("mainNaveBar navTrigger() :", mainNavBar);
		if (mainNavBar) {
			return "main-navigation no-background";
		} else if (navstate === "classic") {
			return "main-navigation";
		} else if (navstate === "hide") {
			return "main-navigation hide";
		} else if (navstate === "active") {
			return "main-navigation active";
		}
	};

	useEffect(() => {
		var prevScroll = 0;
		if (mainNavBar === true) {
			setnavState("active");
		} else {
			window.addEventListener("scroll", () => {
				var newScroll = window.scrollY;
				const innerHeight = window.innerHeight;
				if (prevScroll !== 0 && prevScroll < newScroll) {
					scrollDown(prevScroll, innerHeight);
				} else if (prevScroll > newScroll) {
					scrollUp(newScroll);
				}
				prevScroll = newScroll;
			});
			const timer = setTimeout(() => {
				if (mainNavBar === false) {
					if (navstate === "active" && prevScroll > window.innerHeight) {
						setnavState("hide");
					}
				}
			}, 3000);
			return () => clearTimeout(timer);
		}
	}, [navstate, mainNavBar]);

	// Fetching Product categories to populate Navbar with their name Dynamically
	const categoriez = () => {
		list("category").then((response, error) => {
			if (error || !response) {
			} else {
				setCategories(response);
			}
		});
	};

	useEffect(() => {
		categoriez();
	}, []);

	// SignOut
	const signMeout = () => (e) => {
		signOut().then((response, error) => {
			if (response) {
				signOutFront();
				setuserZ("");
				activate("myaccount", "/");
			}
		});
	};

	// cart window styling based on whether its empty or not
	const cartWindowClassName = () => {
		if (activeTab === "cart" && itemCount > 0) {
			return "ele-4-cont active coll cart-occupied flex-c";
		} else if (activeTab === "cart") {
			return "ele-4-cont active coll flex-c";
		} else {
			return "ele-4-cont coll flex-c";
		}
	};

	//  Nav Bar Tabs markup
	const categoriesTab = () => {
		return categories.map((cat) => (
			<li key={cat._id}>
				<Link to={`/shop/${cat.name}`} className=" noline">
					{capitalizeFirst(cat.name).split(" ")[0]}
				</Link>
			</li>
		));
	};
	const searchTab = () => {
		return (
			<li className="ele-1">
				<h4 onClick={() => activate("search")}>Search</h4>
				<div
					className={
						activeTab === "search"
							? "ele-1-cont coll active flex-r"
							: "ele-1-cont coll flex-r"
					}>
					<input
						type="text"
						placeholder="Start typing what you\'re looking for"
					/>
				</div>
			</li>
		);
	};
	const helpTab = () => {
		return (
			<li className="ele-2">
				<h4 onClick={() => activate("help")}>Help</h4>

				<div
					className={
						activeTab === "help" ? "ele-2-cont active coll" : "ele-2-cont coll"
					}>
					<div className="subNav-Container flex-r">
						<ul className="ele-2-subcont flex-c">
							<h4 className=" noline">Contact</h4>
							<li>
								<Link to="" className=" noline">
									Email-us
								</Link>
							</li>
							<li>
								<Link to="" className=" noline">
									+31(0)202256153
								</Link>
							</li>
						</ul>
						<ul className="ele-2-subcont flex-c">
							<h4 className=" noline">Information</h4>
							<li className="noline">
								<Link to="/">Shipping Information</Link>
							</li>
							<li className="noline">
								<Link to="">Returns & Exchanges</Link>
							</li>
							<li className="noline">
								<Link to="">Size guide</Link>
							</li>
							<li className="noline">
								<Link to="">Wholesale & Showroom</Link>
							</li>
						</ul>
						<ul className="ele-2-subcont flex-c">
							<h4 className=" noline">Frequently asked questions </h4>
							<li>
								<Link to="" className=" noline">
									Do I need an account to place an order?
								</Link>
							</li>
							<li>
								<Link to="" className=" noline">
									How do I return or exchange?
								</Link>
							</li>
							<li>
								<Link to="" className=" noline">
									Do you ship to my country?
								</Link>
							</li>
							<li>
								<Link to="" className=" noline">
									How much does the delivery cost?
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</li>
		);
	};
	const userTab_loggedIn = () => {
		return (
			<li className="user ele-3">
				<h4 onClick={() => activate("myaccount")}>
					{capitalizeFirst(user.name)}
				</h4>
				<div
					className={
						activeTab === "myaccount"
							? "ele-3-cont active coll flex-c"
							: "ele-3-cont coll  flex-c"
					}>
					<p>Display your profile or signout.</p>
					<div className="ele-3-subcont flex-r">
						{user.role === 2 && (
							<p>
								<Link
									to=""
									onClick={() => activate("myaccount", `/${user._id}`)}
									className=" noline">
									Profile
								</Link>
							</p>
						)}
						{user.role === 1 && (
							<p>
								<Link
									to=""
									onClick={() => activate("myaccount", "/admin")}
									className="nav-box noline">
									Admin Board
								</Link>
							</p>
						)}
						<button
							onClick={signMeout()}
							className="black-btn-hr"
							type="submit">
							SignOut
						</button>
					</div>
				</div>
			</li>
		);
	};
	const userTab_notLoggedIn = () => {
		return (
			<li className="user ele-3">
				<h4 onClick={() => activate("myaccount")}>My Account</h4>

				<div
					className={
						activeTab === "myaccount"
							? "ele-3-cont active coll flex-c"
							: "ele-3-cont coll  flex-c"
					}>
					<p>
						Create an account or log in to view your orders, return or adjust
						your personal information.
					</p>
					<div className="ele-3-subcont flex-r">
						<p>
							<Link
								to=""
								onClick={() => activate("myaccount", "/signup")}
								className=" noline">
								Create account
							</Link>
						</p>
						<button
							onClick={() => activate("myaccount", "/signin")}
							className="black-btn-hr"
							type="submit">
							Login
						</button>
					</div>
				</div>
			</li>
		);
	};
	const cartTab = () => {
		return (
			<li className="ele-4">
				<Link to="" onClick={() => activate("cart")} className="the-cart">
					<p>{itemCount ? itemCount : 0}</p>
				</Link>
				<div className={cartWindowClassName()}>
					{itemCount === 0 && (
						<div className="ele-4-subcont flex-c">
							<p>Your bag is currently empty.</p>
							<hr className="thin-grey-line" />
							<button className="nav-cart-btn" type="submit">
								<Link to="" onClick={() => activate("cart", "/women")}>
									Start Shopping !
								</Link>
							</button>
						</div>
					)}
					{itemCount !== 0 && (
						<div className="ele-4-subcont flex-c">
							<SemiCart />
						</div>
					)}
				</div>
			</li>
		);
	};

	return (
		<nav className={navTrigger()}>
			<Link
				to="/"
				className={
					page === "home" && navstate === "classic" ? "logo white " : "logo "
				}>
				ETQ.
			</Link>

			<ul
				className={
					page === "home" && navstate === "classic"
						? "part-1 white flex-r"
						: "part-1 flex-r"
				}>
				{categoriesTab()}
			</ul>
			<ul className="part-2 flex-r">
				{searchTab()}
				{helpTab()}
				{user ? userTab_loggedIn() : userTab_notLoggedIn()}
				{user.role !== 1 && cartTab()}
			</ul>
		</nav>
	);
};

export default React.memo(MainNavBar);
