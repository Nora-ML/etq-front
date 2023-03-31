import React, { useEffect, useState } from "react";
import Layout from "../core/Layout";
import { Link, useParams } from "react-router-dom";
import "../styles/adminBoard.css";
import "../styles/userBoard.css";
import { loggedIn } from "../requests";
import MyCart from "./MyCart";
import MyFav from "./MyFav";

const UserBoard = () => {
	console.log("UserBoard.js -- => rendered");

	const { userId } = useParams();
	console.log("UserBoard.js -- user ID :", userId);

	//  my states
	const [state, setState] = useState({
		contactInfo: "",
		orders: "",
		favourites: "",
		title: "",
		bag: "",
	});
	const [status, setStatus] = useState({
		success: false,
		error: false,
	});

	const [operation, setOperation] = useState(false);

	//  destructuring states
	const { contactInfo, orders, title, favourites, bag } = state;
	const { success, error } = status;

	const activate = (n) => (e) => {
		console.log("UserBoard.js --  activate()");
		if (state[n] === "active") {
			setState({ ...state, [n]: "" });
		} else {
			Object.keys(state).forEach((key) => {
				state[key] = "";
			});
			setState({
				...state,
				[n]: "active",
				title: `${e.target.innerText} Commands`,
			});
		}
		console.log(state);
	};
	const errormessage = () => {
		if (error) {
			return (
				<div className="redAlarm">
					<h4>{error} </h4>
				</div>
			);
		}
	};
	const successmessage = () => {
		if (success) {
			return (
				<div className="greenAlarm">
					<h4>{success}</h4>
				</div>
			);
		}
	};

	return (
		<Layout>
			<div className="main-3col-grid main-3col-grid--admin user">
				<div className="main-3col-grid--admin_nav ">
					<h3>My account</h3>
					<p className="noline">
						<Link to="" onClick={activate("contactInfo")}>
							Contact Information
						</Link>
					</p>
					<p className="noline">
						<Link to="#prod" onClick={activate("favourites")}>
							Favourites
						</Link>
					</p>
					<p className="noline">
						<Link to="#prod" onClick={activate("bag")}>
							Cart
						</Link>
					</p>
					<p className="noline">
						<Link to="" onClick={activate("orders")}>
							Orders
						</Link>
					</p>
				</div>
				<div className="main-3col-grid--admin_nav2 user">
					{orders === "active" && (
						<>
							<h3>{title}</h3>
							<p>
								<Link to="">Pending Orders</Link>
							</p>
							<p>
								<Link to="">Previous orders</Link>
							</p>
							<p>
								<Link to="">Returns</Link>
							</p>
							<p>
								<Link to="">Complaints</Link>
							</p>
						</>
					)}
				</div>
				<div className="main-3col-grid--admin_content">
					{favourites === "active" && <MyFav command="favourites" />}
					{bag === "active" && <MyCart />}
					{successmessage()}
					{errormessage()}
				</div>
			</div>
		</Layout>
	);
};
export default UserBoard;
