import React, { useEffect, useState, useRef } from "react";
import Layout from "../core/Layout";
import { Link } from "react-router-dom";
import UserCommands from "../admin/User";
import "../styles/adminBoard.css";
import { loggedIn } from "../requests";
import ProductCommands from "../admin/Product";
import CategoryCommands from "../admin/Categories";

const { name, role } = loggedIn().user;

const AdminBoard = () => {
	console.log("ADMIN component => rendered");
	const adminRef = useRef(null);
	//  my states
	const [state, setState] = useState({
		products: "",
		categories: "",
		users: "",
		title: "",
	});
	const [filterFix, setFilter] = useState("");

	//  destructuring states
	const { products, categories, title, users } = state;

	const activate = (n) => (e) => {
		//console.log("Front-end => Admin component => activate()");
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
		/* console.log(state); */
	};
	const scrollability = (innerHeight, scroll) => {
		if (scroll >= 50) {
			setFilter(scroll);
		} else {
			setFilter("");
		}
	};
	useEffect(() => {
		window.addEventListener("scroll", () => {
			scrollability(window.innerHeight, window.scrollY);
		});
	}, []);
	const stylez = {
		position: filterFix ? "sticky" : "",
		top: filterFix,
	};
	return (
		<Layout>
			<div className="main-3col-grid main-3col-grid--admin">
				<div
					className="main-3col-grid--admin_nav "
					style={stylez}
					ref={adminRef}>
					<h3>Schemas</h3>
					<p className="noline">
						<Link to="" onClick={activate("users")}>
							Users
						</Link>
					</p>
					<p className="noline">
						<Link to="" onClick={activate("categories")}>
							Category
						</Link>
					</p>
					<p className="noline">
						<Link to="#prod" onClick={activate("products")}>
							Products
						</Link>
					</p>
				</div>
				{users === "active" && <UserCommands />}
				{categories === "active" && <CategoryCommands />}
				{products === "active" && <ProductCommands />}
			</div>
		</Layout>
	);
};
export default AdminBoard;
