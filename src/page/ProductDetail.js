import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Layout from "../core/Layout";
import {
	capitalizeFirst,
	addToCart,
	viewProduct,
	loggedIn,
	saveCarts,
	retrieveCart,
} from "../requests";
import { API } from "../config";
import "../styles/product.css";

const ProductDetail = () => {
	console.log("productDetail.js--- rendered");

	const { productId } = useParams();
	const filterRef = useRef(null);
	const containerRef = useRef(null);
	const [navState, setNavState] = useState("");
	const [user, setUser] = useState("");
	const [product, setProduct] = useState({
		name: "",
		price: "",
		brand: "",
		image_count: "",
	});
	const [value, setValue] = useState({ size: "", color: "" });
	const [allImages, setAllImages] = useState();
	const [allOptions, setAllOptions] = useState({ colors: [], sizes: [] });
	const [filterFix, setFilter] = useState("");
	const [cart, setCart] = useState(0);
	const [zoom, setZoom] = useState(false);
	const { sizes, colors } = allOptions;

	const { size, color } = value;
	const { name, brand, price, image_count } = product;

	const getProduct = (ID) => {
		console.log("productDetail.js---product() ...");
		viewProduct(ID).then((response, error) => {
			console.log(response[0]);
			console.log(error);
			if (error || !response) {
				console.log("productDetail.js---product()=>error");
			} else {
				const data = response;
				console.log("productDetail.js---product()=>success data:", data);
				/* const imagesArray = [];
				data.image.images.forEach((img) => {
					var b64 = Buffer.from(img.data).toString("base64");
					imagesArray.push("data:" + img.contentType + ";base64," + b64);
				}); */
				setAllOptions({
					colors: data.colors,
					sizes: data.sizes,
				});
				//setting initial value for color and size
				setValue({ color: data.colors[0], size: data.sizes[0] });
				//setAllImages(imagesArray);
				setProduct({
					price: data.price,
					brand: data.brand,
					name: data.name,
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

	const choice = (x) => (e) => {
		console.log("productDetail.js--- choice()");
		setValue({ ...value, [x]: e.target.value });
	};

	const submit = () => {
		console.log("productDetail.js--- submit()");
		//If user is has no account or is not logged in, save cart items locally
		if (user === undefined) {
			console.log("productDetail.js--- user ==undefined");
			const { cart } = retrieveCart();
			//if NO items has previously been added
			if (cart === false) {
				console.log("productDetail.js--- cart == false");
				saveCarts([{ color, size, productId, price, brand, name }]);
				setCart("activate");
			} else {
				console.log(
					"productDetail.js---cart has previoulsy been saved locally"
				);
				const prevCart = retrieveCart();
				prevCart.push({
					color,
					size,
					productId,
					price,
					brand,
					name,
				});
				console.log("newCart", prevCart);
				setCart(prevCart);
				saveCarts(prevCart);
			}
			//user has an account and is logged in. Cart item saved to his account
		} else {
			addToCart(user, { color, size, productId, price, brand, name }).then(
				(response, error) => {
					if (error || !response) {
						console.log("productDetail.js--- submit(), error:", error);
					} else {
						console.log("productDetail.js--- submit(), response:", response);
						setCart(response);
						saveCarts(response);
					}
				}
			);
		}
	};

	useEffect(() => {
		console.log("productDetail.js---useEffect ...");
		getProduct(productId);
		const { user } = loggedIn();
		setUser(user._id);
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
				console.log("Triggered !!!!!");
				setFilter(triggerPoint);
			} else {
				setFilter("");
			}
			if (
				scroll >= container_height - quart &&
				scroll <= scrollHeight - innerHeight - halved
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

	const zoomIn = (e) => {
		console.log("zooooom ", e);
		e.target.classList.toggle("zoomIn");
	};

	const format = () => {
		return (
			<>
				<div
					className="main-grid--collection main-grid--collection--prod"
					ref={containerRef}
				>
					<div className="product-content flex-r flex-r--wrap">
						{name &&
							[...Array(image_count)].map((e, i) => (
								<Link
									key={i}
									className="product-content__anchor-img"
									to=""
									onClick={(e) => zoomIn(e)}
								>
									<img
										className="product-content__img"
										src={`${API}/products/photo/${productId}?count=${i}`}
										alt={name}
									/>
								</Link>
							))}
					</div>

					<div
						className="filter product-detail flex-c"
						style={stylez}
						ref={filterRef}
					>
						<h2>{capitalizeFirst(product.name)}</h2>
						<h3>{capitalizeFirst(colors[0])}</h3>
						<h4>$ {product.price}</h4>
						<p>
							Everything we do is meant to last. Our designs last. Our products
							last. This collection of wardrobe essentials comes in six tim...
						</p>
						<Link to="">More information</Link>
						<div className="dropdown">
							<select
								className="dropbtn"
								name="color"
								value={color}
								onChange={choice("color")}
							>
								{colors &&
									colors.map((col) => (
										<option className="dropdown-content active">{col}</option>
									))}
							</select>
						</div>
						<div className="dropdown">
							<select
								className="dropbtn"
								name="size"
								value={size}
								onChange={choice("size")}
							>
								{sizes &&
									sizes.map((siz) => (
										<option className="dropdown-content active">{siz}</option>
									))}
							</select>
						</div>
						<button className="black-btn" type="submit" onClick={submit}>
							Add to Bag
						</button>
						<Link className="size-guide line" to="">
							Size guide
						</Link>
						<ul className="check-list">
							<li>
								Pay with iDeal, Apple Pay, Mastercard, Visa, PayPal, Klarna
							</li>
							<li>Order with free European standard shipping</li>
							<li>
								Orders placed between today and December 25 enjoy an extended
								return period of 45 days.
							</li>
							<li>Replenishment service: free new laces upon request</li>
						</ul>
					</div>
				</div>
				<div className="even-container">
					<div className="prod-description">
						<h3>Description</h3>
						<p>
							Everything we do is meant to last. Our designs last. Our products
							last. Nubuck sneakers are wardrobe essentials that fit any season
							and every occasion. This classic low-top was designed to stand the
							test of time and match your personal style. A go-to style to wear
							all year in a taupe colorway.
						</p>

						<ul className="prod-description_list">
							<li>Handmade in Portugal</li>
							<li>Metal-free tanned nubuck upper</li>
							<li>Durable TPU outsoles</li>
							<li>
								Ultra-absorbent and abrasion resistant onSteam® microfiber
								lining (OEKO-TEX® certified)
							</li>
							<li>Tonal metal eyelets and nylon laces </li>
							<li>Branded with our signature square heel pin</li>
							<li>
								ETQ design – removable memory foam insoles with moisture
								management
							</li>
							<li>
								The Strobel construction technique offers extreme flexibility
							</li>
							<li>
								Comes with a multifunctional dust bag made from recycled PET
								bottles
							</li>
							<li>
								Delivered in a recycled cardboard shoe-and-shipping box
								(FSC-certified)
							</li>
						</ul>
					</div>
					<div className="prod-information">
						<h3>Information</h3>
						<h4>Shipping</h4>
						<p>
							We ship worldwide and offer free shipping on all orders above €150
							in Europe and the UK. Same day shipment applies on all orders
							placed before 4pm on working days More info
						</p>
						<h4>Sizing</h4>
						<p>
							Fits true to size. If you're looking for a half size, we recommend
							to take one size up. Size advice Return & exchange We offer free
							returns for customers based in The Netherlands, Luxembourg,
							Belgium, Germany, and France. Orders can be returned within a
							period of 30 days, starting from the moment you receive your
							order. More info{" "}
						</p>
						<h4>Help</h4>
						<p>
							Need some help? Call us on +31 (0) 20 225 61 53 or contact our
							customer care by email.
						</p>
					</div>
				</div>
				<nav
					className={navState === "visible" ? "product-nav" : "notDisplayed"}
				>
					<ul className="product-nav-both product-nav-1"></ul>
					<ul className="product-nav-both product-nav-2">
						<h4>{product.name + " " + color + "   $" + product.price}</h4>
						<div className="dropdown nav">
							<select
								className="dropbtn"
								name="color"
								value={color}
								onChange={choice("color")}
							>
								{colors &&
									colors.map((col) => (
										<option className="dropdown-content--nav active">
											{col}
										</option>
									))}
							</select>
						</div>

						<div className="dropdown nav">
							<select
								className="dropbtn"
								name="size"
								value={size}
								onChange={choice("size")}
							>
								{sizes &&
									sizes.map((siz) => (
										<option className="dropdown-content--nav active">
											{siz}
										</option>
									))}
							</select>
						</div>

						<button className="black-btn nav" type="submit" onClick={submit}>
							Add to Bag
						</button>
					</ul>
				</nav>
			</>
		);
	};
	return <Layout cart={cart}>{format()}</Layout>;
};
export default ProductDetail;
