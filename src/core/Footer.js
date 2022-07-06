import React from "react";
import { Link } from "react-router-dom";
import "../styles/footer.css";

const Footer = () => {
	return (
		<>
			<div className="footer sec-5">
				<div className="sec-5-unit a">
					<h5>About</h5>
					<p>
						Founded in 2010 in Amsterdam, ETQ derived under the mindset of
						eliminating over-accessorized branding and focusing primarily on
						letting the quality of the product speak for itself{" "}
						<Link to=""> Read more</Link>{" "}
					</p>
				</div>
				<div className="sec-5-unit b">
					<h5>Address</h5>
					<p>
						Singel 465
						<br /> 1012 WP Amsterdam
						<br /> The Netherlands
					</p>
				</div>
				<div className="sec-5-unit c">
					<h5>Contact</h5>
					<ul>
						<li className="noline">Email us</li>
						<li className="noline">+31 (0) 20 225 61 53</li>
					</ul>
				</div>
				<div className="sec-5-unit d">
					<h5>Info</h5>
					<ul>
						<li className="noline">Shipping info</li>
						<li className="noline">Careers</li>
						<li className="noline">Wholesale</li>
						<li className="noline">Returns</li>
						<li className="noline">Term of Service</li>
					</ul>
				</div>
				<div className="sec-5-unit e">
					<h5>Follow Us</h5>
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
		</>
	);
};

export default Footer;
