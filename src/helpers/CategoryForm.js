import React, { useEffect, useState } from "react";
import "../styles/Form.css";
import { addCategory, list } from "../requests";
import { Link } from "react-router-dom";

const AddCategoryForm = () => {
	console.log("## FE => CategoryForm() => rendered");
	const [state, setState] = useState({
		name: " ",
		product_type: " ",
		success: false,
		error: false,
	});
	const { name, product_type, error, success } = state;
	const changeHandler = (n) => (e) => {
		console.log("## FE => CategoryForm()=> changeHandler()");
		setState({ ...state, [n]: e.target.value });
	};
	const submitForm = (e) => {
		e.preventDefault();
		console.log("## FE => CategoryForm()=> submitForm()");
		addCategory({ name }).then((response, error) => {
			if (error || response.error) {
				console.log("## FE => CategoryForm()=> submitForm() => error");
				setState({
					...state,
					success: false,
					error: response.error || error,
				});
			} else {
				console.log("## FE => CategoryForm()=> submitForm() => succes");
				setState({
					name: " ",
					available: false,
					error: false,
					success: "Product Added ",
				});
			}
		});
	};

	const errormessage = () => {
		if (error) {
			return (
				<div className="redAlarm err-succes-message">
					<p>{error}</p>
				</div>
			);
		}
	};
	const successmessage = () => {
		if (success) {
			return (
				<div className="greenAlarm err-succes-message">
					<p>{success}!</p>
				</div>
			);
		}
	};
	const CategoryForm = () => {
		return (
			<div className="form-container">
				<div className="form-item--addproduct">
					<label name="name">Category name :</label>
					<input
						type="text"
						onChange={changeHandler("name")}
						name="name"
						value={name}
					/>
				</div>

				<div className="form-item--addproduct">
					<label name="product_type">Product Type :</label>
					<input
						type="text"
						onChange={changeHandler("product_type")}
						name="product_type"
						value={product_type}
					/>
				</div>

				{errormessage()}
				{successmessage()}

				<div className="submit-button">
					<input type="button" onClick={submitForm} value="Add Category" />
				</div>
			</div>
		);
	};
	return (
		<>
			{CategoryForm()}
			{/* {JSON.stringify(state)} */}
		</>
	);
};
export default AddCategoryForm;
