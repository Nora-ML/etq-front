import React from "react";
import "../styles/landing_hero.css";

const Cover = () => {
	return (
		<div className="landing-hero">
			<div
				className="landing-hero_img"
				style={{
					backgroundImage:
						"url(https://cdn.shopify.com/s/files/1/0505/9044/9849/files/Frame_168_1_1080x.png?v=1649326168)",
				}}></div>

			<div className="landing-hero_intro">
				<h4 className="landing-hero_intro-preHeader">Set in stone</h4>
				<h2 className="landing-hero_intro-header">
					Easygoing Styles that are a testament to quality
				</h2>
				<p className="landing-hero_intro-details">
					Everything we do is meant to last. Our designs last. Our products
					last.It's all about consistency. We design future-proof footwear:
					minimal design with maximum impact
				</p>
			</div>
		</div>
	);
};

export default Cover;
