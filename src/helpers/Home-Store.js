import React from "react";
import { Link } from "react-router-dom";

const HomeStore = ({ classN }) => {
	console.log("HomeStore.js --- rendered", classN);
	return (
		<div className={classN}>
			<div className="sec-4-unit flex-c">
				<img
					src="https://cdn.shopify.com/s/files/1/0505/9044/9849/files/Laundry_Store_Homepage-image_750x.jpg?v=1631259918"
					alt=""
				/>
				<div className="sec-4-img-det">
					<p className="noline">
						<Link to="/">ETQ laundry stores</Link>
					</p>
					<p>Let us clean your shoes</p>
				</div>
			</div>
			<div className="sec-4-unit flex-c">
				<img
					src="https://cdn.shopify.com/s/files/1/0505/9044/9849/files/ETQ-Store-New-Wall_0ebac655-98b3-41ef-9df9-5a1ec474b90a_750x.jpg?v=1621592281"
					alt=""
				/>
				<div className="sec-4-img-det">
					<p className="noline">
						<Link to="/">Amsterdam flagship store</Link>
					</p>
					<p>Find us at singel 465</p>
				</div>
			</div>
		</div>
	);
};

export default React.memo(HomeStore);
