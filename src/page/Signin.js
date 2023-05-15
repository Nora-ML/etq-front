import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../core/Layout";
import {
	signin,
	saveToken,
	getfav,
	loggedIn,
	saveFavs,
	getCart_DB,
	addToCart_localStorage,
} from "../requests";

const Signup = () => {
	console.log("Signin.js => rendered");
	const navigate = useNavigate();
	const [cart, setCart] = useState(0);
	const [state, setState] = useState({
		email: "",
		password: "",
		error: false,
		success: false,
		redirect: "",
	});

	const { email, password, error, success, redirect } = state;
	const { user } = loggedIn();

	const changeHandler = (name) => (e) => {
		//console.log("Signin.js => changeHandler()");
		setState({ ...state, [name]: e.target.value });
	};
	const submitForm = (e) => {
		//console.log("Signin.js => submitForm()");
		e.preventDefault();
		/* 		setState({ ...state, error: false, success: false }); */
		signin({
			email,
			password,
			success,
		})
			.then((response) => {
				//console.log("Signin.js -- submitForm(), response:", response);
				if (response.error) {
					//console.log("Signin.js --- submitForm() - error ");
					setState({ ...state, error: response.error, success: false });
				} else {
					//console.log("Signin.js --- submitForm()- response :", response);

					saveToken(response);
					gettingCart(response.user._id);
					gettingFavourites(response.user._id);
				}
			})
			.catch((err) => {
				//console.log("## FE =>SignIN Component - 2 - catch error");
				//console.log(err);
			});
	};

	const gettingFavourites = (id) => {
		getfav(id).then((response, error) => {
			if (error) {
				//console.log("Signin.js - gettingFavourites()- error ");
			} else {
				//console.log("Signin.js - gettingFavourites()- success ");
				saveFavs(response);
			}
		});
	};
	const gettingCart = (id) => {
		getCart_DB(id).then((response, error) => {
			if (error) {
				//console.log("Signin.js - gettingCart()- error ");
			} else {
				//console.log("Signin.js - gettingCart()- success ");
				addToCart_localStorage(response);
				/* setCart(response); */
				setState({
					email: "",
					password: "",
					error: false,
					success: true,
					redirect: true,
				});
			}
		});
	};
	/* 	useEffect(() => {
		//console.log("Signin.js - useEffect -- render on cart change ");
	}, [cart]); */

	const errormessage = () => {
		if (error) {
			return (
				<div className="redAlarm">
					<h3>error:{error}</h3>
				</div>
			);
		}
	};

	const redirection = () => {
		if (user && user.role === 1) {
			return navigate("/admin");
		} else if (user && user.role === 2) {
			return navigate("/");
		} else {
			//console.log("##FE => SignIn component => redirection ()");
		}
	};

	const form = () => {
		return (
			<form className="signup-form flex-r--wrap">
				<div className="form-item flex-c">
					<label htmlFor="email">Email</label>
					<input
						type="email"
						onBlur={changeHandler("email")}
						//onChange={changeHandler("email")}
						// value={email}
						name="email"
					/>
				</div>
				<div className="form-item flex-c">
					<label htmlFor="password">Password</label>
					<input
						type="password"
						onBlur={changeHandler("password")}
						//onChange={changeHandler("password")}
						//value={password}
						name="password"
					/>
				</div>

				<div className="form-item flex-c">
					<hr className="button-line" />
					{/* <Link to="">
						<h3>Lost your password?</h3>
					</Link> */}
				</div>
				<div className="form-item">
					<button
						className="black-btn-signIN"
						onClick={submitForm}
						type="submit">
						Log In
					</button>
				</div>
			</form>
		);
	};

	return (
		<Layout>
			{/* {JSON.stringify(state)} */}
			<div className="main-doublegrid main-doublegrid--account">
				<div className="filter filter--account flex-c">
					<h4>My Account</h4>
					<p className="noline">
						<Link to="/signup">Create an account</Link>
					</p>
				</div>
				<div className="content content--account">
					<h4 className="header--account">Login</h4>
					{errormessage()}
					{form()}
					{redirection()}
				</div>
			</div>
		</Layout>
	);
};

export default Signup;
