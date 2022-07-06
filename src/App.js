import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../src/page/Home";
import Signin from "../src/page/Signin";
import Signup from "../src/page/Signup";
import Category1 from "../src/page/Category1";
import AdminRoute from "./requests/AdminRoute";
import UserRoute from "./requests/UserRoute";
import AdminBoard from "./page/Admin";
import UserBoard from "./user/UserBoard";
import ProductDetail from "./page/ProductDetail";
import Filter from "./helpers/Filter";

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" exact element={<Home />} />
				<Route exact path="/signin" element={<Signin />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/filter" element={<Filter />} />
				<Route exact path="/shop/:categoryName" element={<Category1 />} />

				<Route exact path="/products/:productId" element={<ProductDetail />} />

				<Route
					path="/admin"
					element={
						<AdminRoute>
							<AdminBoard />
						</AdminRoute>
					}
				/>
				<Route
					path="/:userId"
					element={
						<UserRoute>
							<UserBoard />
						</UserRoute>
					}
				/>
			</Routes>
		</BrowserRouter>
	);
};

export default App;
