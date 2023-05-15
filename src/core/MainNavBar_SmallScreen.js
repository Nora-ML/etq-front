import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import burgerz from "../icons/5957012_menu_icon.png";
import cross from "../icons/cross-sign.png";
import {
	signOut,
	signOutFront,
	capitalizeFirst,
	list,
	getCart_localStorage,
} from "../requests";
import "../styles/header.css";

import SemiCart from "../helpers/SemiCart.js";
import { MainNavBarContext } from "../context/mainNavBarContext";
import { OverlayContext } from "../context/overlayContext";
import { CartContext } from "../context/cartContext";
import { useContext } from "react";

const MainNavBarSmallScreen = ({ page, user, setuserZ }) => {
	console.log("MainNavBar _ Small Screen => rendered ...");
	const navigate = useNavigate();
	// global states from context
	const { mainNavBar, setMainNavBar, setActiveTab, activeTab } =
		useContext(MainNavBarContext);
	const { setOverlayState, overlayState } = useContext(OverlayContext);
	const { itemCount } = useContext(CartContext);
	// local states
	const [categories, setCategories] = useState([]);
	const [navstate, setnavState] = useState("classic");
	const [burgerMenu, setBurgerMenu] = useState(false);

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
			setOverlayState("mainNav");
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

	const activateBurgerMenu = () => {
		console.log("activateBurgerMenu ");
		if (burgerMenu) {
			setBurgerMenu(false);
			setOverlayState(false);
		} else {
			setBurgerMenu(true);
			setOverlayState("mainNav");
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

	useEffect(() => {
		if (!overlayState && burgerMenu) {
			setBurgerMenu(false);
		}
	}, [overlayState]);

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

	const searchTab = () => {
		return (
			<li className="ele-5-search">
				<Link
					to=""
					onClick={() => activate("search")}
					className="nav-box noline"
					placeholder="Not Active Yet">
					Search
				</Link>

				<div
					className={
						activeTab === "search"
							? "ele-5-search-sub active flex-r"
							: "ele-5-search-sub hide flex-r"
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
			<li className="ele-5-help">
				<Link to="" onClick={() => activate("help")} className="nav-box noline">
					Help
				</Link>

				<div
					className={
						activeTab === "help"
							? "ele-5-help-sub active "
							: "ele-5-help-sub hide "
					}>
					<div className="main-help-sub flex-c">
						<div className="ele-5-help-sub-2 flex-r">
							<h4>Information</h4>
							<ul className="ele-5-help-lists flex-r">
								<li>
									<Link to="/">Shipping Information</Link>
								</li>
								<li>
									<Link to="">Returns & Exchanges</Link>
								</li>
								<li>
									<Link to="">Size guide</Link>
								</li>
								<li>
									<Link to="">Wholesale & Showroom</Link>
								</li>
							</ul>
						</div>

						<div className="ele-5-help-sub-2 flex-r">
							<h4>Frequently asked questions </h4>
							<ul className="ele-5-help-lists flex-r">
								<li>
									<Link to="">Do I need an account to place an order?</Link>
								</li>
								<li>
									<Link to="">How do I return or exchange?</Link>
								</li>
								<li>
									<Link to="">Do you ship to my country?</Link>
								</li>
								<li>
									<Link to="">How much does the delivery cost?</Link>
								</li>
							</ul>
						</div>
						<div className="ele-5-help-sub-2 flex-r">
							<h4>Contact</h4>
							<ul className="ele-5-help-lists flex-r">
								<li>
									<Link to="">Email-us</Link>
								</li>
								<li>
									<Link to="">+31(0)202256153</Link>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</li>
		);
	};
	const userTab_loggedIn = () => {
		return (
			<li className="user ele-5-user">
				<Link
					to=""
					onClick={() => activate("myaccount")}
					className="nav-box noline">
					{capitalizeFirst(user.name)}
				</Link>
				<div
					className={
						activeTab === "myaccount"
							? "ele-5-user-sub active flex-c"
							: "ele-5-user-sub hide flex-c"
					}>
					<div className="main-user-sub flex-c">
						<p>Display your profile or signout.</p>
						<div className="main-user-sub-action flex-r">
							{user.role === 2 && (
								<p>
									<Link
										to=""
										onClick={() => activate("myaccount", `/${user._id}`)}>
										Profile
									</Link>
								</p>
							)}
							{user.role === 1 && (
								<p>
									<Link to="" onClick={() => activate("myaccount", "/admin")}>
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
				</div>
			</li>
		);
	};
	const userTab_notLoggedIn = () => {
		return (
			<li className="user ele-5-user">
				<Link
					to=""
					onClick={() => activate("myaccount")}
					className="nav-box noline">
					My Account
				</Link>

				<div
					className={
						activeTab === "myaccount"
							? "ele-5-user-sub active active flex-c"
							: "ele-5-user-sub hide flex-c"
					}>
					<div className="main-user-sub flex-c">
						<p>
							Create an account or log in to view your orders, return or adjust
							your personal information.
						</p>

						<div className="main-user-sub-action flex-r">
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
								<Link to="" onClick={() => activate("cart", "/")}>
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
			<ul
				className={
					page === "home" && navstate === "classic"
						? "burger part-1 white flex-c"
						: "burger part-1 flex-c"
				}>
				<li className="ele-5">
					<Link
						to=""
						onClick={() => activateBurgerMenu()}
						className="nav-box burger-icon">
						<img
							src={burgerMenu ? cross : burgerz}
							alt="mobileMenu"
							width="35"
							height="35"
						/>
					</Link>
					<div
						className={
							burgerMenu ? "ele-5-cont active coll" : "ele-5-cont coll"
						}>
						<div className="subNav-Container flex-c">
							<ul className="ele-5-subcont flex-c">
								{categories.map((cat) => (
									<li key={cat._id}>
										<Link
											to={`/shop/${cat.name}`}
											className=" noline"
											/* onClick={() => activate("all2")} */
										>
											{capitalizeFirst(cat.name).split(" ")[0]}
										</Link>
									</li>
								))}
								{searchTab()}
								{helpTab()}
								{user ? userTab_loggedIn() : userTab_notLoggedIn()}
							</ul>
							{activeTab && <h4 onClick={() => setActiveTab(false)}>Back</h4>}
						</div>
					</div>
				</li>
			</ul>

			<Link
				to="/"
				className={
					page === "home" && navstate === "classic" ? "logo white " : "logo "
				}>
				ETQ.
			</Link>

			<ul className="part-2 flex-r">{user.role !== 1 && cartTab()}</ul>
		</nav>
	);
};

export default React.memo(MainNavBarSmallScreen);
