import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/footer.css";

const Footer = () => {
	const [screen, setScreen] = useState(() =>
		window.innerWidth <= 920 ? true : false
	);
	const [hide, setHide] = useState();
	const [active, setActive] = useState({
		about: "",
		info: "",
		address: "",
		followUs: "",
	});

	const { about, info, address, followUs } = active;

	const activate = (n) => {
		console.log("Footer.js=> activate() =>n: ", n);
		if (active[n] && active[n] === "active") {
			console.log("Footer.js ---- activate() =>2");
			Object.keys(active).forEach((key) => {
				active[key] = "";
			});
			setActive({
				...active,
			});
		} else {
			console.log("Footer.js ---- activate() =>4");
			Object.keys(active).forEach((key) => {
				active[key] = "";
			});
			setActive({
				...active,
				[n]: "active",
			});
		}
	};
	useEffect(() => {
		window.addEventListener("resize", () => {
			const innerWidth = window.innerWidth;
			if (innerWidth <= 1140) {
				setScreen(true);
			} else {
				setScreen(false);
			}
		});
	}, []);

	console.log("Fotter - window.innerwidth:", window.innerWidth);

	return (
		<>
			{screen && (
				<div className="footer sec-5">
					<div className="sec-5-unit a">
						<h4 onClick={() => activate("about")}>About</h4>
						<p className={about ? "display-subFooter" : "hide-subFooter"}>
							Founded in 2010 in Amsterdam, ETQ derived under the mindset of
							eliminating over-accessorized branding and focusing primarily on
							letting the quality of the product speak for itself{" "}
							<Link to=""> Read more</Link>{" "}
						</p>
					</div>
					<div className="sec-5-unit b">
						<h4 onClick={() => activate("address")}>Address</h4>
						<p className={address ? "display-subFooter" : "hide-subFooter"}>
							Singel 465
							<br /> 1012 WP Amsterdam
							<br /> The Netherlands
						</p>
					</div>
					<div className="sec-5-unit d">
						<h4 onClick={() => activate("info")}>Info</h4>
						<ul className={info ? "display-subFooter" : "hide-subFooter"}>
							<li className="noline">Shipping info</li>
							<li className="noline">Careers</li>
							<li className="noline">Wholesale</li>
							<li className="noline">Returns</li>
							<li className="noline">Term of Service</li>
						</ul>
					</div>
					<div className="sec-5-unit e">
						<h4 onClick={() => activate("followUs")}>Follow Us</h4>
						<ul className={followUs ? "display-subFooter" : "hide-subFooter"}>
							<li>
								<Link to="" className="noline">
									Instagram
								</Link>
							</li>
							<li>
								<Link to="" className="noline">
									Facebook
								</Link>
							</li>
							<li>
								<Link to="" className="noline">
									Pinterest
								</Link>
							</li>
							<li>
								<Link to="" className="noline">
									Tiktok
								</Link>
							</li>
						</ul>
					</div>
					<div className="sec-5-unit c">
						<h4 className="noline">Email us</h4>
						<p className="noline">+31 (0) 20 225 61 53</p>
					</div>

					<div className="sec-5-unit i">
						<p>
							Terms & conditions
							<br /> Privacy statement
						</p>
					</div>
				</div>
			)}
			{!screen && (
				<div className="footer sec-5">
					<div className="sec-5-unit a">
						<h4>About</h4>
						<p>
							Founded in 2010 in Amsterdam, ETQ derived under the mindset of
							eliminating over-accessorized branding and focusing primarily on
							letting the quality of the product speak for itself{" "}
							<Link to=""> Read more</Link>{" "}
						</p>
					</div>
					<div className="sec-5-unit b">
						<h4>Address</h4>
						<p>
							Singel 465
							<br /> 1012 WP Amsterdam
							<br /> The Netherlands
						</p>
					</div>
					<div className="sec-5-unit c">
						<h4>Contact</h4>
						<ul>
							<li className="noline">Email us</li>
							<li className="noline">+31 (0) 20 225 61 53</li>
						</ul>
					</div>
					<div className="sec-5-unit d">
						<h4>Info</h4>
						<ul>
							<li className="noline">Shipping info</li>
							<li className="noline">Careers</li>
							<li className="noline">Wholesale</li>
							<li className="noline">Returns</li>
							<li className="noline">Term of Service</li>
						</ul>
					</div>
					<div className="sec-5-unit e">
						<h4>Follow Us</h4>
						<ul>
							<li>
								<Link to="" className="noline">
									Instagram
								</Link>
							</li>
							<li>
								<Link to="" className="noline">
									Facebook
								</Link>
							</li>
							<li>
								<Link to="" className="noline">
									Pinterest
								</Link>
							</li>
							<li>
								<Link to="" className="noline">
									Tiktok
								</Link>
							</li>
						</ul>
					</div>
					<div className="sec-5-unit f">
						<p>Newsletter</p>
					</div>
					<div className="sec-5-unit g">
						<p>Submit</p>
					</div>
					<div className="sec-5-unit h">
						<p>various icons *** *+5+64</p>
					</div>
					<div className="sec-5-unit i">
						<p>
							Terms & conditions
							<br /> Privacy statement
						</p>
					</div>
				</div>
			)}
		</>
	);
};

export default Footer;
