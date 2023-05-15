import React from "react";
import image from "../icons/leather_Small2_400x.png";
import { Link } from "react-router-dom";
import "../styles/landing_info.css";

const HomeInfoSec = ({ classN }) => {
	console.log("HomeInfoSec.js --- rendered", classN);
	return (
		<div className={classN}>
			<div className="sec-2_unit">
				<img
					className="sec-2_img"
					src="https://cdn.shopify.com/s/files/1/0505/9044/9849/articles/ETQ-FitpicsHQ-0855-26-04-22-Packing-Boxes_crob_LR_15_400x.png?v=1672415228"
					alt=""
				/>
				<div className="sec-2_img--det">
					<h4 className="sec-2_img--det-header">Modular Packaging</h4>
					<p className="sec-2_img--det-details">Unboxing like never before</p>
					<Link className="sec-2_img--det-link-Wrapper" to="/">
						<p className="sec-2_img--det-link">Read story</p>
					</Link>
				</div>
			</div>
			<div className="sec-2_unit">
				<img
					className="sec-2_img"
					src="https://cdn.shopify.com/s/files/1/0505/9044/9849/articles/ETQ-FitpicsHQ-0855-26-04-22-Packing-Boxes_crob_LR_17_400x.png?v=1682003114"
					alt=""
				/>
				<div className="sec-2_img--det">
					<h4 className="sec-2_img--det-header">Who we are</h4>
					<p className="sec-2_img--det-details">Our journey explained</p>
					<Link className="line" to="/">
						<p className="sec-2_img--det-link">Read story</p>
					</Link>
				</div>
			</div>
			<div className="sec-2_unit">
				<img className="sec-2_img" src={image} alt="" />
				<div className="sec-2_img--det">
					<h4 className="sec-2_img--det-header">How it's made</h4>
					<p className="sec-2_img--det-details">Sneakers made like shoes</p>
					<Link className="line" to="/">
						<p className="sec-2_img--det-link">Read story</p>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default React.memo(HomeInfoSec);
