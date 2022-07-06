import React, { useEffect, useState } from "react";
import "../styles/Form.css";
import { addPromotion, list } from "../requests";
import { Link } from "react-router-dom";

const AddPromotionForm = () => {
	console.log("## FE => PromotionForm() => rendered");
	const [state, setState] = useState({
		name: "",
		offer_amount: "",
		offer_unit: "",
		details: "",
		success: false,
		error: false,
	});
	const { name, offer_amount, offer_unit, error, success, details } = state;
	const changeHandler = (n) => (e) => {
		console.log("## FE => PromotionForm()=> changeHandler()");
		console.log(n, " : ", e.target.value);

		setState({ ...state, [n]: e.target.value });
	};
	const submitForm = (e) => {
		e.preventDefault();
		console.log("## FE => PromotionForm()=> submitForm()");
		addPromotion({ name, offer_amount, offer_unit }).then((response, error) => {
			if (error || response.error) {
				console.log("## FE => PromotionForm()=> submitForm() => error");
				setState({
					...state,
					success: false,
					error: response.error || error,
				});
			} else {
				console.log("## FE => PromotionForm()=> submitForm() => succes");
				setState({
					name: " ",
					offer_amount: " ",
					offer_unit: " ",
					details: "",
					available: false,
					error: false,
					success: "Promotion Added ",
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
	const PromotionForm = () => {
		return (
			<div className="form-container">
				<div className="form-item--addproduct">
					<label name="name">Promotion name :</label>
					<input
						type="text"
						onChange={changeHandler("name")}
						name="name"
						value={name}
					/>
				</div>

				<div className="form-item--addproduct">
					<label name="offer_amount">Offer :</label>
					<input
						type="number"
						onChange={changeHandler("offer_amount")}
						name="offer_amount"
						value={offer_amount}
					/>
				</div>
				<div className="form-item--addproduct">
					<label name="offer_unit">Unit :</label>
					<select
						type="text"
						onChange={changeHandler("offer_unit")}
						name="offer_unit"
						value={offer_unit}
					>
						<option value="percentage">%</option>
						<option value="dollar">$</option>
					</select>
				</div>
				<div className="form-item--addproduct">
					<label name="offer_amount">Details :</label>
					<textarea
						onChange={changeHandler("details")}
						name="details"
						value={details}
					/>
				</div>

				{errormessage()}
				{successmessage()}

				<div className="submit-button">
					<input type="button" onClick={submitForm} value="Add Promotion" />
				</div>
			</div>
		);
	};
	return (
		<>
			{PromotionForm()}
			{/* {JSON.stringify(state)} */}
		</>
	);
};
export default AddPromotionForm;
