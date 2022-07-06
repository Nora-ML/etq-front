import React, { useState } from "react";
import { Link } from "react-router-dom";
import { addProduct, deleteAll, list } from "../requests";
import AddProductForm from "../helpers/ProductForm";
import "../styles/productCard.css";

const ProductCommands = () => {
	console.log("## FE => ProductCommands Component => rendered ");
	const [status, setStatus] = useState({
		message: "",
		success: false,
		error: "",
	});
	const [display, setDisplay] = useState(false);
	const [products, setProducts] = useState([]);

	const { success, error, message } = status;

	const deleteAll = () => {
		console.log("## FE => ProductCommands Component  => deleteAll() ");
		deleteAll("products").then((response, error) => {
			console.log(response);
			console.log(error);
			setDisplay(true);
			if (error || !response) {
				console.log(
					"Front-end => ProductCommands Component =>deleteAll()=> error"
				);
				setStatus({ success: false, error: error.error, message: "" });
			} else {
				console.log(
					"Front-end => ProductCommands Component =>deleteAll()=> success"
				);
				setStatus({
					success: response.Succmessage,
					error: false,
					message: "Delete All Products",
				});
			}
		});
	};
	const viewAll = () => {
		console.log("## FE => ProductCommands Component  => viewAll() ");
		list("products", 30).then((response, error) => {
			setDisplay(true);
			if (error || !response) {
				console.log("## FE => ProductCommands Component => ViewAll()=> error ");
				setStatus({ success: false, error: error.error, message: "" });
			} else {
				console.log(
					"## FE => ProductCommands Component =>ViewAll()=> success ",
					response
				);
				setStatus({
					success: false,
					error: false,
					message: "View All Products",
				});
				setProducts(response);
			}
		});
	};
	const addProduct = () => {
		setProducts([]);
		setStatus({
			error: false,
			success: false,
			message: "Add Product Form :",
		});
		setDisplay(true);
	};
	const errormessage = () => {
		if (error) {
			return (
				<div className="redAlarm err-succes-message">
					<h4>{error} </h4>
				</div>
			);
		}
	};
	const successmessage = () => {
		if (success) {
			return (
				<div className="greenAlarm err-succes-message">
					<h4>{success}</h4>
				</div>
			);
		}
	};
	const displayResult = () => {
		console.log("## FE => ProductCommands component => displayResult()");
		if (error !== false || success !== false) {
			return (
				<>
					{successmessage()}
					{errormessage()}
				</>
			);
		}
		if (products.length > 0) {
			return (
				<>
					<h3>{message}</h3>
					<div className="flex-r-wrap">
						{products.map((product) => (
							<div key={product._id} className="prodBlock--shop__Small flex-c">
								{/* <ProductCard product={product} /> */}
							</div>
						))}
					</div>
				</>
			);
		}
		if (message === "Add Product Form :") {
			return (
				<>
					<h3>{message}</h3>
					<AddProductForm />
				</>
			);
		}
	};

	return (
		<>
			<div className="main-3col-grid--admin_nav2">
				<h3>Product Commands</h3>
				<p>
					<Link to="" onClick={addProduct}>
						Add a Product
					</Link>
				</p>

				<p>
					<Link to="">Edit a Product</Link>
				</p>
				<p>
					<Link to="" onClick={viewAll}>
						Bulk Edits
					</Link>
				</p>
				<p>
					<Link to="" onClick={deleteAll}>
						Delete all Products
					</Link>
				</p>
			</div>
			{display && (
				<div className="main-3col-grid--admin_content">{displayResult()}</div>
			)}
		</>
	);
};
export default ProductCommands;
