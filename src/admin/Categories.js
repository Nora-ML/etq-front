import React, { useState } from "react";
import { Link } from "react-router-dom";
import { deleteAll, list, capitalizeFirst, editCategory } from "../requests";
import AddCategoryForm from "../helpers/CategoryForm";
import AddPromotionForm from "../helpers/PromotionForm";

const CategoryCommands = () => {
	console.log("## FE => CategoryCommands Component => rendered ");
	const [status, setStatus] = useState({
		message: "",
		success: false,
		error: "",
	});
	const [display, setDisplay] = useState(false);
	const [category, setCategories] = useState([]);
	const [catName, setNewName] = useState({
		oldN: "NONE",
		newN: "",
	});

	const { success, error, message } = status;
	const { oldN, newN } = catName;

	const deleteAllCateg = () => {
		console.log("## FE => CategoryCommands Component  => deleteAll() ");
		deleteAll("category").then((response, error) => {
			//console.log(response);
			//console.log(error);
			setDisplay(true);
			if (error || !response) {
				console.log(
					"Front-end => CategoryCommands Component =>deleteAll()=> error"
				);
				setStatus({ success: false, error: error.error, message: "" });
			} else {
				console.log(
					"Front-end => CategoryCommands Component =>deleteAll()=> success"
				);
				setStatus({
					success: response.count,
					error: false,
					message: "Delete All Categories",
				});
			}
		});
	};
	const viewAll = () => {
		console.log("## FE => CategoryCommands Component  => viewAll() ");
		list("category").then((response, error) => {
			//console.log(response);
			//console.log(error);
			setDisplay(true);
			if (error || !response) {
				console.log(
					"## FE => CategoryCommands Component => ViewAll()=> error "
				);
				setStatus({ success: false, error: error.error, message: "" });
			} else {
				console.log(
					"## FE => CategoryCommands Component =>ViewAll()=> success ",
					response
				);
				if (response.length > 0) {
					setStatus({
						success: false,
						error: false,
						message: "View All Categories :",
					});
					setCategories(response);
				} else {
					setStatus({
						success: false,
						error: "No categories saved in database",
						message: " ",
					});
				}
			}
		});
	};
	const changeHandler = (e, n) => {
		console.log("Admin CategoryCommands=> changeHandler --e ", e);
		setNewName({ ...catName, newN: e.target.value });
	};

	const reqEdit = () => {
		console.log("Admin CategoryCommands=> reqEdit ");
		editCategory(catName).then((response, error) => {
			if (error || !response) {
				console.log("Admin CategoryCommands=> editCat -- error", error);
			} else {
				console.log("Admin CategoryCommands=> editCat -- response", response);
				window.location.reload();
			}
		});
	};
	const editCat = () => {
		console.log("Admin CategoryCommands=> editCat() ");
		return (
			<div className="flex-r">
				<label name="name">Category name :</label>
				<input
					type="text"
					onChange={(e) => changeHandler(e)}
					name="name"
					placeholder={oldN}
					value={newN}
				/>
				<p onClick={() => reqEdit()}>Submit</p>
			</div>
		);
	};

	const add = (what) => {
		setStatus({
			error: false,
			success: false,
			message: `Add ${what} Form :`,
		});
		setDisplay(true);
	};
	const errormessage = () => {
		if (error) {
			return (
				<div className="redAlarm err-succes-message mgn-top">
					<h4>{error} </h4>
				</div>
			);
		}
	};
	const successmessage = () => {
		if (success) {
			return (
				<div className="greenAlarm err-succes-message mgn-top">
					<h4>{success}</h4>
				</div>
			);
		}
	};

	const displayResult = () => {
		console.log("## FE => CategoryCommands component => displayResult()");
		if (error !== false || success !== false) {
			return (
				<>
					{successmessage()}
					{errormessage()}
				</>
			);
		}
		if (message === "Add Category Form :") {
			return (
				<>
					<h3>{message}</h3>
					<AddCategoryForm />
				</>
			);
		}
		if (message === "Add Promotion Form :") {
			return (
				<>
					<h3>{message}</h3>
					<AddPromotionForm />
				</>
			);
		}
		if (message === "View All Categories :") {
			return (
				<>
					<h3>{message}</h3>
					{category.map((cat) => (
						<div className="flex-r">
							<h5 key={cat._id}>{capitalizeFirst(cat.name)}</h5>
							<p
								style={{ marginLeft: "10px", fontSize: "10px", color: "blue" }}
								onClick={() => setNewName({ newN: "", oldN: cat.name })}
							>
								Edit
							</p>
						</div>
					))}
					{oldN !== "NONE" && editCat()}
				</>
			);
		}
	};

	return (
		<>
			<div className="main-3col-grid--admin_nav2">
				<h3>Category Commands</h3>
				<p>
					<Link to="" onClick={() => add("Category")}>
						Add a Category
					</Link>
				</p>
				<p>
					<Link to="" onClick={() => add("Promotion")}>
						Add Promotion
					</Link>
				</p>
				<p>
					<Link to="" onClick={viewAll}>
						All Categories
					</Link>
				</p>
				<p>
					<Link to="" onClick={deleteAllCateg}>
						Delete all Categories
					</Link>
				</p>
			</div>
			{display && (
				<div className="main-3col-grid--admin_content">{displayResult()}</div>
			)}
		</>
	);
};
export default CategoryCommands;
