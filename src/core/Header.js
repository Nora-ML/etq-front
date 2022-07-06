import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
	signOut,
	signOutFront,
	capitalizeFirst,
	list,
	retrieveCart,
	signup,
} from "../requests";
import "../styles/header.css";
import SemiCart from "../helpers/SemiCart.js";

const Header = ({ page, cartz, user, setuserZ }) => {
	console.log("header.js=> rendered ...");
	const navigate = useNavigate();
	const [categories, setCategories] = useState([]);
	const [itemActive, setItemActive] = useState(false);
	const [navstate, setnavState] = useState("classic");
	const [localCart, setLocalCart] = useState(0);
	const [active, setActive] = useState({
		search: "",
		help: "",
		myaccount: "",
		cart: "",
		overlay: false,
		redirect: "",
	});
	/* 	const [state, setState] = useState(); */
	const [itemCount, setItemCount] = useState(0);

	//destructuring state
	const { search, help, myaccount, cart, overlay, redirect } = active;

	/**************          Activating navBar ITEMS on click       ************************/
	/*********    setting overlay to true to later trigger the overlay effect   ********************/

	const activate = (n, destin) => {
		console.log("header.js=> activate() =>n: ", n);

		if (active[n] === "active") {
			//console.log("header.js ---- activate() =>2");
			setActive({ ...active, [n]: "", overlay: false, redirect: destin });
			setItemActive(false);
		} else {
			// console.log("header.js ---- activate() =>3");
			Object.keys(active).forEach((key) => {
				active[key] = "";
			});
			setActive({
				...active,
				[n]: "active",
				overlay: true,
				redirect: "",
			});

			setItemActive(true);
		}
		//console.log(`Header.js=> ${n} Activated`);
	};

	useEffect(() => {
		console.log("Header.js ---- useEffect -- navigate,redirect", redirect);
		if (redirect !== "") {
			setTimeout(() => {
				console.log("Header.js ---- useEffect -- setTimeout");
				navigate(redirect);
			}, 350);
		}
	}, [redirect]);

	useEffect(() => {
		console.log("Header.js ---- 1st useEffect ...");

		function nonActiveArea(e) {
			/*	console.log("Header.js ---- 1st useEffect => nonActiveArea() ");*/
			console.log("Header.js ----useEffect -- e", e);
			e.path.find((p) => {
				if (p.className === "part-1 flex-r") {
					exitActive();
				}
				return p.className === "part-2 flex-r";
			})
				? console.log("Don't exit")
				: exitActive();
		}
		function exitActive() {
			console.log("Header.js ----useEffect =>  exitActive() ");
			Object.keys(active).forEach((key) => {
				if (key !== "overlay") {
					active[key] = "";
				}
			});
			setActive({
				...active,
				overlay: false,
			});
			setItemActive(false);
		}
		window.addEventListener("click", nonActiveArea);

		//cleanup useEffect
		return () => window.removeEventListener("click", nonActiveArea);
	}, [active]);

	/**********************      Hiding and activating Main nav bar on SCROLL   *********************/
	function scrollUp(scroll) {
		console.log("header.js ---- scrollUp(), itemActive:", itemActive);
		if (itemActive === true) {
			setnavState("active");
		} else if (scroll === 0) {
			setnavState("classic");
		} else if (navstate === "hide") {
			setnavState("active");
		}
	}
	function scrollDown(scroll, inner) {
		console.log("header.js ---- ScrollDown()itemActive:", itemActive);
		if (itemActive === true) {
			setnavState("active");
		} else if (scroll < inner) {
			setnavState("active");
		} else {
			setnavState("hide");
		}
	}
	/**Detects the nav state and returns appropriate classname. Called in the nav element  ***/
	const navTrigger = () => {
		/*	console.log("header.js ---- navTrigger()");*/
		if (itemActive) {
			return "main-navigation no-background flex-r";
		} else if (navstate === "classic") {
			return "main-navigation flex-r";
		} else if (navstate === "hide") {
			return "main-navigation hide flex-r";
		} else if (navstate === "active") {
			return "main-navigation active flex-r";
		}
	};

	useEffect(() => {
		console.log("Header.js ---- 2nd useEffect..");
		var prevScroll = 0;
		if (itemActive === true) {
			setnavState("active");
		} else {
			window.addEventListener("scroll", () => {
				var newScroll = window.scrollY;
				const innerHeight = window.innerHeight;
				/* console.log("prevScroll :", prevScroll + "-- newScroll :", newScroll); */

				if (prevScroll !== 0 && prevScroll < newScroll) {
					//scrolling down
					/*	console.log("Scrolling DOOOWN ... ");*/
					scrollDown(prevScroll, innerHeight);
				} else if (prevScroll > newScroll) {
					//scrolling up
					/*	console.log("Scrolling UUUP ... ");*/
					scrollUp(newScroll);
				}
				prevScroll = newScroll;
			});
			const timer = setTimeout(() => {
				if (itemActive === false) {
					if (navstate === "active" && prevScroll > window.innerHeight) {
						setnavState("hide");
						/* console.log("This will run after no scroll"); */
					}
				}
			}, 3000);
			return () => clearTimeout(timer);
		}
	}, [navstate, itemActive]);

	/***********    Fetching Product categories to populate Navbar with their name Dynamically & fetch initial items in cart   ***************/
	const categoriez = () => {
		console.log("Header.js ---- categoriez()");
		list("category").then((response, error) => {
			if (error || !response) {
				/* console.log("Header.js ---- categoriez() => error"); */
			} else {
				console.log("Header.js ---- categoriez() => success");
				setCategories(response);
			}
		});
	};

	useEffect(() => {
		console.log("Header.js ----3rd useEffect , categoriez, ");
		categoriez();
	}, []);

	useEffect(() => {
		console.log(
			"Header.js ---4th useEffect , cartz :",
			cartz,
			"local Cart :",
			localCart
		);
		if (cartz === false || cartz === undefined || cartz === 0) {
			const localC = retrieveCart();
			console.log("Header.js ---4th useEffect , localC :", localC);
			if (localC.cart !== false) {
				console.log(
					"Header.js ---3rd useEffect , cartz :",
					cartz,
					"local Cart :",
					localCart,
					"local C :",
					localC
				);
				setLocalCart(localC);
				setItemCount(localC.length);
				/* subTotal(localC); */
			} else {
				setLocalCart(0);
			}
		} else if (cartz === "activate") {
			console.log("Header.js ---4th useEffect , cartz :", cartz);
			const localC = retrieveCart();
			setLocalCart(localC);
			setItemCount(localC.length);
			/* subTotal(localC); */
			activate("cart");
		} else {
			console.log("Header.js ---4th useEffect , cartz :", cartz);
			setLocalCart(cartz);
			setItemCount(cartz.length);
			activate("cart");
			/* subTotal(cartz); */
		}
	}, [cartz]);

	/***********    Fetching Product categories to populate Navbar with their name Dynamically    ***************/
	const signMeout = () => (e) => {
		console.log("Header.js --- signmeout - event.target ", e);
		signOut().then((response, error) => {
			console.log("Header.js --- signMeOut , error:", error);
			console.log("Header.js --- signMeOut , response:", response);
			if (response) {
				console.log("Header.js --- signMeOut , signoutFront()");
				signOutFront();
				setuserZ("");
				activate("myaccount", "/");
			}
		});
	};

	const cartOrNoCart = () => {
		console.log("Header.js --- cartOrNoCart ");
		if (cart === "active" && itemCount > 0) {
			return "ele-4-cont active coll cart-occupied flex-c";
		} else if (cart === "active") {
			return "ele-4-cont active coll flex-c";
		} else {
			return "ele-4-cont coll flex-c";
		}
	};
	return (
		<>
			<div
				className={
					overlay
						? "active_overlay active_overlay--nav"
						: "active_overlay hidden active_overlay--nav"
				}
			></div>
			<nav className={navTrigger()}>
				<ul
					className={
						page === "home" && navstate === "classic"
							? "part-1 white flex-r"
							: "part-1 flex-r"
					}
				>
					<li>
						<Link to="/" className="logo">
							ETQ.
						</Link>
					</li>

					{categories.map((cat) => (
						<li key={cat._id}>
							<Link to={`/shop/${cat.name}`} className=" noline">
								{capitalizeFirst(cat.name).split(" ")[0]}
							</Link>
						</li>
					))}
				</ul>
				<ul className="part-2 flex-r">
					<li className="ele-1">
						<Link
							to=""
							onClick={() => activate("search")}
							className="nav-box noline"
						>
							Search
						</Link>

						<div
							className={
								search === "active"
									? "ele-1-cont coll active flex-r"
									: "ele-1-cont coll flex-r"
							}
						>
							<input
								type="text"
								placeholder="Start typing what you\'re looking for"
							/>
						</div>
					</li>
					<li className="ele-2">
						<Link
							to=""
							onClick={() => activate("help")}
							className="nav-box noline"
						>
							Help
						</Link>

						<div
							className={
								help === "active" ? "ele-2-cont active coll" : "ele-2-cont coll"
							}
						>
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
					<li className="user ele-3">
						{!user && (
							<>
								<Link
									to=""
									onClick={() => activate("myaccount")}
									className="nav-box noline"
								>
									My Account
								</Link>

								<div
									className={
										myaccount === "active"
											? "ele-3-cont active coll flex-c"
											: "ele-3-cont coll  flex-c"
									}
								>
									<p>
										Create an account or log in to view your orders, return or
										adjust your personal information.
									</p>
									<div className="ele-3-subcont flex-r">
										<p>
											<Link
												to=""
												onClick={() => activate("myaccount", "/signup")}
												className=" noline"
											>
												Create account
											</Link>
										</p>
										<button
											onClick={() => activate("myaccount", "/signin")}
											className="black-btn-hr"
											type="submit"
										>
											Login
										</button>
									</div>
								</div>
							</>
						)}
						{user && (
							<>
								<Link
									to=""
									onClick={() => activate("myaccount")}
									className="nav-box noline"
								>
									{capitalizeFirst(user.name)}
								</Link>
								<div
									className={
										myaccount === "active"
											? "ele-3-cont active coll flex-c"
											: "ele-3-cont coll  flex-c"
									}
								>
									<p>Display your profile or signout.</p>
									<div className="ele-3-subcont flex-r">
										{user.role === 2 && (
											<p>
												<Link
													to=""
													onClick={() => activate("myaccount", `/${user._id}`)}
													className=" noline"
												>
													Profile
												</Link>
											</p>
										)}
										{user.role === 1 && (
											<p>
												<Link
													to=""
													onClick={() => activate("myaccount", "/admin")}
													className="nav-box noline"
												>
													Admin Board
												</Link>
											</p>
										)}
										<button
											onClick={signMeout()}
											className="black-btn-hr"
											type="submit"
										>
											SignOut
										</button>
									</div>
								</div>
							</>
						)}
					</li>
					{user.role !== 1 && (
						<li className="ele-4">
							<Link to="" onClick={() => activate("cart")} className="the-cart">
								<p>{itemCount ? itemCount : 0}</p>
							</Link>
							<div className={cartOrNoCart()}>
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
										<SemiCart
											activeState={cart}
											carts={localCart}
											itemCount={(r) => setItemCount(r)}
										/>
									</div>
								)}
							</div>
						</li>
					)}
				</ul>
			</nav>
		</>
	);
};

export default React.memo(Header);
