import React from "react";
import image from "../icons/leather_Small2_400x.png";
import { Link } from "react-router-dom";
import "../styles/landing_info.css";

const HomeInfoSec = ({ classN }) => {
	console.log("HomeInfoSec.js --- rendered", classN);
	return (
		<div className={classN}>
			<div className="landing-info_card main-card">
				<div
					style={{
						backgroundImage:
							"url(https://cdn.shopify.com/s/files/1/0505/9044/9849/articles/ETQ-FitpicsHQ-0855-26-04-22-Packing-Boxes_crob_LR_15_400x.png?v=1672415228)",
					}}
					className="landing-info_img"
				/>
				<div className="landing-info_img--det">
					<h4 className="landing-info_img--det-header">Modular Packaging</h4>
					<p className="landing-info_img--det-details">
						Unboxing like never before
					</p>
					<Link className="landing-info_img--det-link" to="/">
						Read story...
					</Link>
				</div>
			</div>
			<div className="landing-info_card">
				<div
					style={{
						backgroundImage:
							"url(https://cdn.shopify.com/s/files/1/0505/9044/9849/articles/ETQ-FitpicsHQ-0855-26-04-22-Packing-Boxes_crob_LR_17_400x.png?v=1682003114)",
					}}
					className="landing-info_img"
				/>
				<div className="landing-info_img--det">
					<h4 className="landing-info_img--det-header">Who we are</h4>
					<p className="landing-info_img--det-details">Our journey explained</p>
					<Link className="landing-info_img--det-link" to="/">
						Read story...
					</Link>
				</div>
			</div>
			<div className="landing-info_card">
				<div
					className="landing-info_img"
					style={{
						backgroundImage:
							"url(https://cdn.shopify.com/s/files/1/0505/9044/9849/files/ETQ-Januari23-0464_1200x.jpg?v=1679598214)",
					}}
				/>
				<div className="landing-info_img--det">
					<h4 className="landing-info_img--det-header">How it's made</h4>
					<p className="landing-info_img--det-details">
						Sneakers made like shoes
					</p>
					<Link className="landing-info_img--det-link" to="/">
						Read story...
					</Link>
				</div>
			</div>
		</div>
	);
};

export default React.memo(HomeInfoSec);
