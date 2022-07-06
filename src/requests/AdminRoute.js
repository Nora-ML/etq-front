import React from "react";
import { loggedIn } from "./index";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
	console.log("Front-End => AdminRoute rendered");
	if (loggedIn() && loggedIn().user.role === 1) {
		return children;
	} else {
		return <Navigate to="/signin" />;
	}
};
export default AdminRoute;
