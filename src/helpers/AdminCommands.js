import React, { useEffect, useState } from "react";
import { deleteOne } from "../requests";
import ProductEdit from "../admin/ProductEdit";
import Overlay from "../core/Overlay";

const AdminCommands = ({ product }) => {
	console.log("AdminCommand.js---- rendered...");
	const [editStuff, setEditStuff] = useState({
		productz: "",
		coordinates: "",
		activate: false,
		className: "",
	});
	const [class_overlay, setClass_Overlay] = useState("");
	const { productz, coordinates, activate, className } = editStuff;

	const deleteProduct = (id) => {
		console.log("AdminCommand.js---- deleteProduct()...");
		deleteOne("products", id).then((response, error) => {
			if (response && response.message === "Product deleted !") {
				console.log("AdminCommand.js---- deleteProduct(), response:", response);
				window.location.reload();
			} else {
				console.log("AdminCommand.js---- deleteProduct() => Error:", error);
			}
		});
	};
	const getEditForm = (e, product) => {
		console.log("AdminCommand.js---- getEditForm()...");
		const initialPos = e.screenY;
		setEditStuff({
			productz: product,
			coordinates: initialPos,
			activate: true,
			className: "active",
		});
		setClass_Overlay("");
	};
	const deacTivate = (classf) => {
		console.log("AdminCommand.js---- deacTivate()");
		setClass_Overlay(classf);
		setEditStuff({ ...editStuff, className: "hide" });
		const time = setTimeout(() => {
			console.log("AdminCommand.js---- deacTivate(), TimeOut ()");
			setEditStuff({ ...editStuff, activate: false, className: "" });
			setClass_Overlay("");
		}, 2000);
		/* clearTimeout(time); */
	};

	return (
		<>
			{activate && (
				<Overlay
					classN={class_overlay}
					class_Overlay={(classf) => deacTivate(classf)}
				/>
			)}
			<div key={product._id} className="prodBlock__adminCommand flex-r--wrap">
				<button
					onClick={() => deleteProduct(product._id)}
					className="prodBlock__adminCommand--delete"
				>
					Delete
				</button>
				<button
					onClick={(e) => getEditForm(e, product)}
					className="prodBlock__adminCommand--edit"
				>
					Edit
				</button>
			</div>
			{activate && (
				<ProductEdit
					product={productz}
					coordinate={coordinates}
					className={className}
				/>
			)}
		</>
	);
};
export default React.memo(AdminCommands);
