import React from "react";
import { Link } from "react-router-dom";

const HomeInfoSec = ({ classN }) => {
	console.log("HomeInfoSec.js --- rendered", classN);
	return (
		<div className={classN}>
			<div className="sec-2_unit flex-r">
				<img
					className="sec-2_img"
					src="https://cdn.shopify.com/s/files/1/0505/9044/9849/articles/ETQ-FitpicsHQ-0845-26-04-22-Packing-Boxes-Crob_400x.jpg?v=1652433511"
					alt=""
				/>
				<div className="sec-2_img--det">
					<h4 className="sec-2_img--det-header">Modular Packaging</h4>
					<p className="sec-2_img--det-details">Unboxing like never before</p>
					<Link className="line" to="/">
						<p className="sec-2_img--det-link">Read story</p>
					</Link>
				</div>
			</div>
			<div className="sec-2_unit flex-r">
				<img
					className="sec-2_img"
					src="https://cdn.shopify.com/s/files/1/0505/9044/9849/articles/WhatsApp_Image_2022-04-11_at_3.53.14_PM_400x.jpg?v=1649941950"
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
			<div className="sec-2_unit flex-r">
				<img
					className="sec-2_img"
					src="https://cdn.shopify.com/s/files/1/0505/9044/9849/articles/Journal_HowIt_sMade_Small2_400x.jpg?v=1621353623"
					alt=""
				/>
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
