import React, { useEffect, useRef, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Layout from "../core/Layout";
import { HashLink as Link } from "react-router-hash-link";
import { capitalizeFirst, viewProduct, loggedIn } from "../requests";
import { API } from "../config";
import { CartContext } from "../context/cartContext";
import { ScreenSizeContext } from "../context/screenSizeContext";
import { OverlayContext } from "../context/overlayContext";
import { MainNavBarContext } from "../context/mainNavBarContext";
import Footer from "../core/Footer";
import "../styles/product_page.css";

const ProductDetail = () => {
	const { productId } = useParams();

	const { addToCart } = useContext(CartContext);
	const { screenType } = useContext(ScreenSizeContext);
	const { setOverlayState } = useContext(OverlayContext);
	const { setActiveTab } = useContext(MainNavBarContext);

	console.log("ProductDetail.js--- rendered, screenType", screenType);

	const filterRef = useRef(null);
	const containerRef = useRef(null);
	const [navState, setNavState] = useState("");
	const [drawer, setDrawer] = useState(false);
	const [product, setProduct] = useState({
		name: "",
		price: "",
		brand: "",
		image_count: "",
		images: [],
	});
	const [value, setValue] = useState({ size: "", color: "" });
	const [allOptions, setAllOptions] = useState({ colors: [], sizes: [] });
	const [filterFix, setFilter] = useState("");
	const [cart, setCart] = useState(0);
	const [active, setActive] = useState();
	const { sizes, colors } = allOptions;

	const { size, color } = value;
	const { name, brand, price, image_count, images } = product;

	const getProduct = (ID) => {
		console.log("productDetail.js---product() ...");
		viewProduct(ID).then((response, error) => {
			console.log("productDetail.js---product()", response[0]);
			if (error || !response) {
				console.log("productDetail.js---product()=>error");
			} else {
				const data = response;
				console.log("productDetail.js---product()=>success data:", data);
				setAllOptions({
					colors: data.colors,
					sizes: data.sizes,
				});
				//setting initial value for color and size
				setValue({ color: data.colors[0], size: data.sizes[0] });
				setProduct({
					price: data.price,
					brand: data.brand,
					name: data.name,
					images: data.image.images,
					image_count: data.image_count ? data.image_count : 0,
				});
			}
		});
	};

	const stylez = {
		position: filterFix ? "sticky" : "",
		/* backgroundColor: filterFix ? "rgb(243, 241, 241)" : "rgb(255, 255, 255)", */
		top: filterFix,
	};

	const activate = (x) => {
		//console.log("productDetail.js--- activate() ");
		if (x === active) {
			setActive();
		} else {
			setActive(x);
		}
	};
	const mainDropDown = (e, x) => {
		let initialValue = e.target.innerText;
		let numeric = Number(initialValue) ? Number(initialValue) : initialValue;
		setValue({ ...value, [x]: numeric });
	};

	const submit = () => {
		//console.log("productDetail.js--- submit()");
		let product = { color, size, productId, price, brand, name, quantity: 1 };
		addToCart({ product });
		setActiveTab("cart");
		setOverlayState(true);
	};

	useEffect(() => {
		//console.log("productDetail.js---useEffect ...");
		getProduct(productId);
		window.scrollTo(0, 0);
	}, [useParams()]);

	useEffect(() => {
		const scrollability = () => {
			let innerHeight = window.innerHeight;
			let scroll = window.scrollY;
			let scrollHeight = document.documentElement.scrollHeight;
			let filter_height = filterRef.current.clientHeight;
			let container_height = containerRef.current.clientHeight;
			let triggerPoint = innerHeight - filter_height;
			let halved = innerHeight / 2;
			let quart = innerHeight / 4;
			if (scroll >= triggerPoint && scroll > 1) {
				//console.log("Triggered !!!!!");
				setFilter(triggerPoint);
			} else {
				setFilter("");
			}
			if (
				scroll >= container_height - quart &&
				scroll <= scrollHeight - innerHeight - quart
			) {
				setNavState("visible");
			} else {
				setNavState("");
			}
		};
		window.addEventListener("scroll", scrollability);
		return function cleanUP() {
			window.removeEventListener("scroll", scrollability);
		};
	}, []);

	const drawerTrigger = (e) => {
		let dontexit = e.target.className.includes("dontexit");
		if (!dontexit) {
			setActive(false);
			setTimeout(() => {
				setDrawer(!drawer);
			}, 50);
		}
	};

	const images_section = () => {
		return (
			<div className="product-detail-page_images-container">
				{name &&
					images.map((image, i) => (
						<div className="product-detail-page_image-wrap">
							<img
								key={i}
								className="product-detail-page_image"
								src={image.data}
								alt={image.name}
							/>
						</div>
					))}
			</div>
		);
	};

	const product_details = () => {
		return (
			<div
				className="product-detail-page_details"
				style={stylez}
				ref={filterRef}>
				<div className="product-detail-page_product-data">
					<h2 className="product-detail-page_product-name">{product.name}</h2>
					<h3 className="product-detail-page_product-color">{colors[0]}</h3>
					<h4 className="product-detail-page_product-price">
						$ {product.price}
					</h4>
				</div>
				<div className="dontexit product-detail-page_product-info">
					<p>
						Everything we do is meant to last. Our designs last. Our products
						last. This collection of wardrobe essentials comes in six tim...
						<Link to="#info">More information</Link>
					</p>
				</div>
				<div className="product-detail-page_product-options">
					<div className="dropdown-container" onClick={() => activate("color")}>
						<div
							className={
								active === "color" && colors.length > 1
									? "dropdown-list active"
									: "dropdown-list"
							}
							onClick={() => activate("color")}>
							{colors &&
								colors.map((col, index) => (
									<div
										key={index}
										className={`dontexit dropdown-item ${
											color === col ? "selected" : ""
										}`}
										onClick={(e) => mainDropDown(e, "color")}>
										{col}
									</div>
								))}
						</div>
					</div>
					<div className="dropdown-container" onClick={() => activate("size")}>
						<div
							className={
								active === "size" && sizes.length > 1
									? "dropdown-list active"
									: "dropdown-list"
							}>
							{sizes &&
								sizes.length > 1 &&
								sizes.map((col, index) => (
									<div
										key={index}
										className={`dontexit dropdown-item ${
											size === col ? "selected" : ""
										}`}
										onClick={(e) => mainDropDown(e, "size")}>
										{col}
									</div>
								))}
						</div>
					</div>
				</div>
				<button
					className={`dontexit product-detail-page_add-btn ${
						drawer || screenType === "landscape" ? "order-normal" : ""
					}`}
					type="submit"
					onClick={submit}>
					Add to Bag
				</button>

				<div className="product-detail-page_general-info">
					<ul>
						<li>Pay with iDeal, Apple Pay, Mastercard, Visa, PayPal, Klarna</li>
						<li>Order with free European standard shipping</li>
						<li>
							Orders placed between today and December 25 enjoy an extended
							return period of 45 days.
						</li>
						<li>Replenishment service: free new laces upon request</li>
					</ul>
				</div>
			</div>
		);
	};

	const product_description = () => {
		return (
			<div className="even-sub prod-description">
				<h3>Description</h3>
				<p>
					Everything we do is meant to last. Our designs last. Our products
					last. Nubuck sneakers are wardrobe essentials that fit any season and
					every occasion. This classic low-top was designed to stand the test of
					time and match your personal style. A go-to style to wear all year in
					a taupe colorway.
				</p>

				<ul className="prod-description_list">
					<li>Handmade in Portugal</li>
					<li>Metal-free tanned nubuck upper</li>
					<li>Durable TPU outsoles</li>
					<li>
						Ultra-absorbent and abrasion resistant onSteam® microfiber lining
						(OEKO-TEX® certified)
					</li>
					<li>Tonal metal eyelets and nylon laces </li>
					<li>Branded with our signature square heel pin</li>
					<li>
						ETQ design – removable memory foam insoles with moisture management
					</li>
					<li>The Strobel construction technique offers extreme flexibility</li>
					<li>
						Comes with a multifunctional dust bag made from recycled PET bottles
					</li>
					<li>
						Delivered in a recycled cardboard shoe-and-shipping box
						(FSC-certified)
					</li>
				</ul>
			</div>
		);
	};

	const product_information = () => {
		return (
			<div className="even-sub prod-information">
				<h3>Information</h3>
				<h4>Shipping</h4>
				<p>
					We ship worldwide and offer free shipping on all orders above €150 in
					Europe and the UK. Same day shipment applies on all orders placed
					before 4pm on working days More info
				</p>
				<h4>Sizing</h4>
				<p>
					Fits true to size. If you're looking for a half size, we recommend to
					take one size up. Size advice Return & exchange We offer free returns
					for customers based in The Netherlands, Luxembourg, Belgium, Germany,
					and France. Orders can be returned within a period of 30 days,
					starting from the moment you receive your order. More info{" "}
				</p>
				<h4>Help</h4>
				<p>
					Need some help? Call us on +31 (0) 20 225 61 53 or contact our
					customer care by email.
				</p>
			</div>
		);
	};

	/* const floating_nav = () => {
		return (
			<nav className={navState === "visible" ? "product-nav" : "notDisplayed"}>
				<ul className="product-nav-both product-nav-1"></ul>
				<ul className="product-nav-both product-nav-2">
					<h4>{product.name + " " + color + "   $" + product.price}</h4>
					<div className="dropdown nav" onClick={() => activate("colorNav")}>
						<p>{color !== "" ? color : colors[0]}</p>
						<div
							className={
								active === "colorNav" && colors.length > 1
									? "dropdown-content--nav active"
									: "dropdown-content--nav"
							}>
							{colors &&
								colors.map((col, index) => (
									<div key={index} className="dropDown-item">
										<p onClick={(e) => choiceB(e, "color")}>{col}</p>
									</div>
								))}
						</div>
					</div>

					<div className="dropdown nav" onClick={() => activate("sizeNav")}>
						<p>{size !== "" ? size : sizes[0]}</p>
						<div
							className={
								active === "sizeNav" && sizes.length > 1
									? "dropdown-content--nav active"
									: "dropdown-content--nav"
							}>
							{sizes &&
								sizes.map((col, index) => (
									<div key={index} className="dropDown-item">
										<p onClick={(e) => choiceB(e, "size")}>{col}</p>
									</div>
								))}
						</div>
					</div>

					<button className="black-btn nav" type="submit" onClick={submit}>
						Add to Bag
					</button>
				</ul>
			</nav>
		);
	}; */

	const mobile_format = () => {
		return (
			<div className="product-detail-page_main-container">
				{images_section()}
				{product_description()}
				<div
					className={`product-detail-page_drawer ${
						drawer ? "drawer-active" : ""
					}`}
					onClick={(e) => drawerTrigger(e)}>
					{product_details()}
					<Footer />
				</div>
			</div>
		);
	};

	const landscape_format = () => {
		return (
			<div className="product-detail-page_main-container">
				{images_section()}
				{product_description()}
				{product_details()}
				<Footer />
			</div>
		);
	};
	return (
		<Layout
			style={{
				height: "100vh",
				overflow: "hidden",
				position: "fixed",
				top: `-${window.scrollY}px`,
			}}
			noFooter>
			{screenType === "landscape" ? landscape_format() : mobile_format()}
		</Layout>
	);
};
export default ProductDetail;
