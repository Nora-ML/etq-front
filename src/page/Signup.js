import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../core/Layout";
import { signup } from "../requests";

const Signup = () => {
	console.log("SignUp component => rendered");
	const [state, setState] = useState({
		name: "",
		email: "",
		password: "",
		birthday: "",
		gender: "",
		error: false,
		success: false,
	});
	const [subscribe, setSubscribe] = useState(false);

	const { name, email, password, error, birthday, gender, success } = state;

	const changeHandler = (name) => (e) => {
		name === "subscribe"
			? setSubscribe(!subscribe)
			: setState({ ...state, [name]: e.target.value });
	};
	const submitForm = (e) => {
		e.preventDefault();
		/* 		setState({ ...state, error: false, success: false }); */
		signup({
			name,
			email,
			password,
			birthday,
			gender,
			success,
			subscribe,
		})
			.then((response) => {
				//console.log("Front-End > signup Component - 1 - response fetched");
				//response is blank object
				//console.log(response);
				if (response.error) {
					//console.log("Front-End > signup Component - 3 - response - error ");
					setState({ ...state, error: response.error, success: false });
				} else {
					//console.log("Front-End > signup Component - 4 - response - success ");
					setState({
						name: "",
						email: "",
						password: "",
						birthday: "",
						gender: "",
						error: false,
						success: true,
					});
					setSubscribe(false);
				}
			})
			.catch((err) => {
				//console.log("Front-End > signup Component - 2 - catch error");
				//console.log(err);
			});
	};
	const errormessage = () => {
		if (error) {
			return (
				<div className="redAlarm">
					<h3>error:{error}</h3>
				</div>
			);
		}
	};
	const successmessage = () => {
		if (success) {
			return (
				<div className="greenAlarm">
					<h3>
						Welcome !! Please
						<Link to="/signin">
							<h3> sign in.</h3>
						</Link>
					</h3>
				</div>
			);
		}
	};

	const form = () => {
		return (
			<form className="signup-form flex-r--wrap">
				<div className="form-item flex-c">
					<label htmlFor="name">Name</label>
					<input
						type="text"
						onChange={changeHandler("name")}
						value={name}
						name="name"
					/>
				</div>
				<div className="form-item flex-c">
					<label htmlFor="birthday">Birthday</label>
					<input
						type="date"
						onChange={changeHandler("birthday")}
						value={birthday}
						name="birthday"
					/>
				</div>
				<div className="form-item ">
					<label htmlFor="gender">Gender</label>
					<div className="gender">
						<input
							type="radio"
							onChange={changeHandler("gender")}
							value="female"
							name="gender"
						/>
						<label>Female</label>
					</div>
					<div>
						<input
							type="radio"
							onChange={changeHandler("gender")}
							value="male"
							name="gender"
						/>
						<label>Male</label>
					</div>
					<div>
						<input
							type="radio"
							onChange={changeHandler("gender")}
							value="neutral"
							name="gender"
						/>
						<label>Neutral</label>
					</div>
				</div>
				<div className="form-item flex-c">
					<label htmlFor="email">Email</label>
					<input
						type="email"
						onChange={changeHandler("email")}
						value={email}
						name="email"
					/>
				</div>
				<div className="form-item flex-c">
					<label htmlFor="password">Password</label>
					<input
						type="password"
						value={password}
						onChange={changeHandler("password")}
						name="password"
					/>
				</div>

				<div className="form-item flex-r">
					{/* <input
						type="checkbox"
						value={subscribe}
						onChange={changeHandler("subscribe")}
						name="subscribe"
					/>
					<label htmlFor="subscribe">Subscribe to newsletter</label> */}
				</div>

				<div className="form-item">
					<hr className="button-line" />
					<button
						className="black-btn-signUp"
						onClick={submitForm}
						type="submit">
						Create Account
					</button>
				</div>
			</form>
		);
	};
	return (
		<Layout overlayTrigger="header">
			<div className="main-doublegrid main-doublegrid--account">
				<div className="filter filter--account flex-c">
					<h4>My Account</h4>
					<p className="noline">
						<Link to="/signin">I already have an account</Link>
					</p>
				</div>
				<div className="content content--account">
					<h4 className="header--account">Create Account</h4>
					{errormessage()}
					{successmessage()}
					{form()}
					{/* {JSON.stringify(state)}
					<br />
					{"subscribe: " + JSON.stringify(subscribe)} */}
				</div>
			</div>
		</Layout>
	);
};

export default Signup;
