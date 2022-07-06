import React, { useState } from "react";
import { Link } from "react-router-dom";
import { deleteAll, list } from "../requests";

const UserCommands = () => {
	console.log("## FE => UserCommands Component => rendered ");
	const [status, setStatus] = useState({
		message: "",
		success: false,
		error: "",
	});
	const [display, setDisplay] = useState(false);

	const { success, error, message } = status;

	const deleteAll = () => {
		console.log("## FE => UserCommands Component  => deleteAll() ");
		deleteAll("admin").then((error, response) => {
			setDisplay(true);
			if (error || !response) {
				console.log(
					"Front-end => UserCommands Component =>deleteAll()=> error "
				);
				console.log(error);
				setStatus({ success: false, error: error.error, message: "" });
			} else {
				console.log(
					"Front-end => UserCommands Component =>deleteAll()=> success "
				);
				setStatus({
					success: response,
					error: false,
					message: "Delete All users",
				});
			}
		});
	};
	const viewAll = () => {
		console.log("## FE => UserCommands Component  => viewAll() ");
		list("").then((error, response) => {
			setDisplay(true);
			if (error || !response) {
				console.log("## FE => UserCommands Component => ViewAll()=> error ");
				console.log(error);
				setStatus({ success: false, error: error.error, message: "" });
			} else {
				console.log("## FE => UserCommands Component =>ViewAll()=> success ");
				setStatus({
					success: response,
					error: false,
					message: "View All Users",
				});
			}
		});
	};
	/* 	const editUser = () => {
		console.log("front-end => UserCommands Component  => editUser() ");
		if (role === 2) {
			setStatus({ success: false, error: "Access denied " });
		} else {
			setStatus({ success: false, error: false });
			setEditUser({ display: true });
		}
        const getUser = () => {
		if (display) {
			return (
				<div>
					<label>User email :</label>
					<input type="email" name="email" />
				</div>
			);
		}
	};
	}; */
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
	const displayResult = () => {
		if (display === true) {
			return (
				<div className="main-3col-grid--admin_content">
					<h3>{message}</h3>
					{successmessage()}
					{errormessage()}
				</div>
			);
		}
	};

	return (
		<>
			<div className="main-3col-grid--admin_nav2">
				<h3>User Commands</h3>
				<p>
					<Link to="" onClick={deleteAll}>
						Delete all users
					</Link>
				</p>
				<p>
					<Link to="" onClick={viewAll}>
						View all users
					</Link>
				</p>
				<p>
					<Link to="">Edit user</Link>
				</p>
			</div>
			{displayResult()}
		</>
	);
};
export default UserCommands;
