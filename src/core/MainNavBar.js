import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { signOut, signOutFront, capitalizeFirst, list } from "../requests";
import SemiCart from "../helpers/SemiCart.js";
import { MainNavBarContext } from "../context/mainNavBarContext";
import { OverlayContext } from "../context/overlayContext";
import { CartContext } from "../context/cartContext";
import { useContext } from "react";
import "../styles/main_navBar.css";

const MainNavBar = ({ page, user, setuserZ }) => {
	console.log("MAIN NAV BAR PAGE", page);
	const navigate = useNavigate();
	const location = useLocation();
	// global states from context
	const { setActiveTab, activeTab } = useContext(MainNavBarContext);
	const { setOverlayState } = useContext(OverlayContext);
	const { itemCount } = useContext(CartContext);
	// local states
	const [categories, setCategories] = useState([]);
	const [navstate, setnavState] = useState("transparent");

	// Activating/ Deactivating  navBar tabs updating global state onClick
	// toggling the overlay state
	// redirecting if path is available
	const activate = (n, destin) => {
		console.log("header.js=> activate() =>n: ", n);
		if (n === "") {
			setOverlayState(false);
			setActiveTab(false);
			redirect(destin);
		} else if (activeTab === n) {
			console.log("header.js ---- activate() =>1");
			setActiveTab(false);
			setOverlayState(false);
			redirect(destin);
		} else {
			console.log("header.js ---- activate() =>2");
			setActiveTab(n);
			setOverlayState("mainNav");
			redirect(destin);
		}
	};

	const redirect = (destin) => {
		console.log("Redirect", destin);
		if (destin !== "" && location.pathname !== destin) {
			console.log("... Redirecting", destin);
			setTimeout(() => {
				console.log("Header.js ---- useEffect -- setTimeout");
				navigate(destin);
			}, 350);
		}
	};

	// Hiding and activating Main nav bar on SCROLL
	const scrollUp = (scroll) => {
		console.log("mainNaveBar on ScrollUP");
		if (scroll > 0) {
			setnavState("");
		} else if (scroll === 0) {
			setnavState("transparent");
		}
	};
	const scrollDown = (scroll, inner) => {
		console.log("mainNaveBar on ScrollDown");
		if (scroll < inner) {
			setnavState("");
		} else if (scroll > inner) {
			setnavState("");
		}
	};

	useEffect(() => {
		var prevScroll = 0;

		if (activeTab) {
			setnavState("");
		} else {
			window.addEventListener("scroll", () => {
				let newScroll = window.scrollY;
				const innerHeight = window.innerHeight;
				if (prevScroll !== 0 && prevScroll < newScroll) {
					scrollDown(prevScroll, innerHeight);
				} else if (prevScroll > newScroll) {
					scrollUp(newScroll);
				}
				prevScroll = newScroll;
			});

			let timer = setTimeout(() => {
				console.log("SET TIME OUT");
				if (window.scrollY === 0) {
					setnavState("transparent");
				} else {
					setnavState("hidden");
				}
			}, 2500);
			return () => clearTimeout(timer);
		}
	}, [navstate, activeTab]);

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
			<div
				onClick={() => activate("", `/shop/${cat.name}`)}
				className="main-navigation_categorytab">
				<h4>{capitalizeFirst(cat.name).split(" ")[0]}</h4>
			</div>
		));
	};
	const searchTab = () => {
		return (
			<div className="main-navigation_searchtab">
				<h4 onClick={() => activate("search")}>Search</h4>
				<div
					className={`main-navigation_tab-contents main-navigation_searchtab-content ${
						activeTab === "search" ? "searchtab--active" : ""
					}`}>
					<input
						className="main-navigation_searchtab-data"
						type="text"
						placeholder="Start typing what you\'re looking for"
					/>
				</div>
			</div>
		);
	};
	const helpTab = () => {
		return (
			<div className="main-navigation_helptab">
				<h4 onClick={() => activate("help")}>Help</h4>
				<div
					className={`main-navigation_tab-contents main-navigation_helptab-content ${
						activeTab === "help" ? "helptab--active" : ""
					}`}>
					<div className="main-navigation_helptab-data">
						<h4 className=" noline">Contact</h4>
						<Link to="" className=" noline">
							Email-us
						</Link>
						<Link to="" className=" noline">
							+31(0)202256153
						</Link>
					</div>
					<div className="main-navigation_helptab-data">
						<h4 className=" noline">Information</h4>
						<Link to="/">Shipping Information</Link>
						<Link to="">Returns & Exchanges</Link>
						<Link to="">Size guide</Link>
						<Link to="">Wholesale & Showroom</Link>
					</div>
					<div className="main-navigation_helptab-data">
						<h4 className=" noline">Frequently asked questions </h4>
						<Link to="" className=" noline">
							Do I need an account to place an order?
						</Link>
						<Link to="" className=" noline">
							How do I return or exchange?
						</Link>
						<Link to="" className=" noline">
							Do you ship to my country?
						</Link>
						<Link to="" className=" noline">
							How much does the delivery cost?
						</Link>
					</div>
				</div>
			</div>
		);
	};
	const userTab_loggedIn = () => {
		return (
			<div
				className={`main-navigation_usertab${
					activeTab === "myaccount" ? "--active" : ""
				}`}>
				<h4 onClick={() => activate("myaccount")}>
					{capitalizeFirst(user.name)}
				</h4>
				<div className="main-navigation_usertab--content">
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
			</div>
		);
	};
	const userTab_notLoggedIn = () => {
		return (
			<div className="main-navigation_usertab">
				<h4 onClick={() => activate("myaccount")}>My Account</h4>

				<div
					className={`main-navigation_tab-contents main-navigation_usertab-content ${
						activeTab === "myaccount" ? "usertab--active" : ""
					}`}>
					<p>
						Create an account or log in to view your orders, return or adjust
						your personal information.
					</p>
					<p>
						<Link to="" onClick={() => activate("myaccount", "/signup")}>
							Create account
						</Link>
					</p>
					<button
						onClick={() => activate("myaccount", "/signin")}
						type="submit">
						Login
					</button>
				</div>
			</div>
		);
	};
	const cartTab = () => {
		return (
			<div className="main-navigation_carttab">
				<h4
					onClick={() => activate("cart")}
					className="main-navigation_cart_items-icon">
					{itemCount ? itemCount : 0}
				</h4>

				<div
					className={`main-navigation_tab-contents main-navigation_carttab-content ${
						activeTab === "cart" ? "carttab--active" : ""
					}`}>
					{itemCount === 0 ? (
						<>
							<p>Your bag is currently empty.</p>
							<button
								className="nav-cart-btn"
								type="submit"
								onClick={() => activate("cart", "/women")}>
								Start Shopping !
							</button>
						</>
					) : (
						<div className="ele-4-subcont flex-c">
							<SemiCart />
						</div>
					)}
				</div>
			</div>
		);
	};

	return (
		<nav
			className={`main-navigation main-navigation${
				navstate ? "--" + navstate : ""
			}`}>
			<h4
				onClick={() => activate("", "/")}
				className={`main-navigation_logo main-navigation${
					"--" + navstate
				}_logo--${page !== "home" ? "other" : "home"}`}>
				ETQ.
			</h4>

			<div
				className={`main-navigation_categories main-navigation${
					"--" + navstate
				}_categories--${page !== "home" ? "other" : "home"}`}>
				{categoriesTab()}
			</div>

			<div
				className={`main-navigation_othertabs main-navigation${
					"--" + navstate
				}_othertabs--${page !== "home" ? "other" : "home"}`}>
				{searchTab()}
				{helpTab()}
				{user ? userTab_loggedIn() : userTab_notLoggedIn()}
				{user.role !== 1 && cartTab()}
			</div>
		</nav>
	);
};

export default React.memo(MainNavBar);
