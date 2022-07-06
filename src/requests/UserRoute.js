import React from "react";
import { loggedIn } from "./index";
import { Navigate } from "react-router-dom";

const UserRoute = ({ children }) => {
	console.log("Front-End => UserRoute rendered");
	if (loggedIn() && loggedIn().user.role === 2) {
		return children;
	} else {
		return <Navigate to="/signin" />;
	}
};
export default UserRoute;
