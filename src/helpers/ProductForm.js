import React, { useEffect, useState } from "react";
import "../styles/Form.css";
import { addProduct, list, updateProduct } from "../requests";

const AddProductForm = ({ product, className }) => {
	console.log("## FE => ProductForm() => rendered");
	const [state, setState] = useState({
		name: " ",
		product_type: " ",
		//the category i selected
		category: " ",
		promotion: " ",
		description: " ",
		featured: false,
		brand: " ",
		price: 0,
		quantity: 0,
		sold: 0,
		image: { images: "", default_image: " ", featured_image: " " },
		colors: " ",
		sizes: " ",
		available: false,
		success: false,
		error: false,
		//the data and their value saved in form to be parsed in backend
		formData: new FormData(),
	});
	const [categories, setCategories] = useState([]);
	const [promotions, setPromotions] = useState([]);
	const {
		name,
		promotion,
		product_type,
		description,
		featured,
		brand,
		price,
		image,
		quantity,
		colors,
		sizes,
		success,
		category,
		error,
		formData,
	} = state;
	const changeHandler = (n) => (e) => {
		console.log("## FE => ProductForm()=> changeHandler()");
		console.log("value : ", e.target.value);
		if (n === "image") {
			let y = e.target.files;
			let x = e.target.name;
			if (x === "images") {
				for (let i = 0; i < y.length; i++) {
					formData.append(y[i].name, y[i]);
				}
			} else {
				formData.append(x, y[0]);
			}
			setState({ ...state, [n]: { ...image, [x]: y }, success: false });
		} else if (n === "featured") {
			let x = e.target.checked;
			formData.set(n, x);
			setState({ ...state, [n]: x, success: false });
		} else {
			let x = e.target.value;
			formData.set(n, x);
			setState({ ...state, [n]: x, success: false });
		}
	};
	useEffect(() => {
		console.log("## FE => ProductForm()=> UseEffect ...");
		console.log(product);
		if (product) {
			Object.entries(state).forEach(([key, value]) => {
				if (key === "formData") {
					state[key] = new FormData();
				} else if (key === "sucess" && key === "error") {
					state[key] = false;
				} else if (key === "image") {
					state[key]["images"] = product[key];
				
				} else if (key === "category") {
					state[key] = product[key]._id;
				} else {
					state[key] = product[key];
				}
			});
		}
	}, []);

	const submitForm = (e) => {
		e.preventDefault();
		console.log("## FE => ProductForm()=> submitForm()");
		/* setState({ ...state, sucess: false, error: false }); */
		product
			? updateProduct(formData, product._id).then((response, error) =>
					aFunction(response, error)
			  )
			: addProduct(formData).then((response, error) =>
					aFunction(response, error)
			  );
		const aFunction = (response, error) => {
			console.log("## FE => ProductForm() => submitForm() .... ");
			console.log(response);
			if (error || response.error) {
				console.log("## FE => ProductForm()=> submitForm() => error");
				setState({
					...state,
					success: false,
					error: response.error || error,
				});
			} else {
				console.log("## FE => ProductForm()=> submitForm() => succes");
				setState({
					name: " ",
					class: " ",
					category: " ",
					promotions: " ",
					description: " ",
					brand: " ",
					price: 0,
					quantity: 0,
					sold: 0,
					image: { images: "", default_image: " ", featured_image: " " },
					colors: " ",
					sizes: " ",
					available: false,
					error: false,
					formData: new FormData(),
					success: "Product Added ",
				});
			}
		};
	};

	const categoriez = () => {
		console.log("## FE => ProductForm()=> categories()");
		list("category").then((response, error) => {
			if (error || !response) {
				console.log("## FE => ProductForm()=> categories() => error");
			} else {
				console.log("## FE => ProductForm()=> categories() => success");
				/* setState({ ...state,formData: new FormData() }); */
				setCategories(response);
			}
		});
	};
	const promotionz = () => {
		console.log("## FE => ProductForm()=> promotions()");
		list("promotion").then((response, error) => {
			if (error || !response) {
				console.log("## FE => ProductForm()=> promotions() => error");
			} else {
				console.log("## FE => ProductForm()=> promotions() => success");
				/* setState({ ...state,formData: new FormData() }); */
				setPromotions(response);
			}
		});
	};
	useEffect(() => {
		console.log("## FE => ProductForm()=> useEffect ...");
		categoriez();
		promotionz();
	}, []);

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
	const productForm = () => {
		return (
			<div className={"form-container " + className}>
				<div className={"form-item--addproduct name " + className}>
					<label name="name">Product name :</label>
					<input
						type="text"
						onChange={changeHandler("name")}
						name="name"
						value={name}
					/>
				</div>
				<div className={"form-item--addproduct brand " + className}>
					<label name="brand">Brand :</label>
					<input
						type="text"
						onChange={changeHandler("brand")}
						name="brand"
						value={brand}
					/>
				</div>
				<div className={"form-item--addproduct price " + className}>
					<label name="price">Price :</label>
					<input
						type="number"
						onChange={changeHandler("price")}
						name="price"
						value={price}
					/>
				</div>
				<div className={"form-item--addproduct category " + className}>
					<label name="category">Category :</label>
					<select
						onChange={changeHandler("category")}
						name="category"
						value={category}
					>
						<option>Choose category..</option>
						{categories &&
							categories.map((c, i) => (
								<option key={i} value={c._id}>
									{c.name}
								</option>
							))}
					</select>
				</div>
				<div className={"form-item--addproduct promotion " + className}>
					<label name="promotion">promotion :</label>
					<select
						onChange={changeHandler("promotion")}
						name="promotion"
						value={promotion}
					>
						<option>Choose promotion..</option>
						{promotions &&
							promotions.map((c, i) => (
								<option key={i} value={c._id}>
									{c.name}
								</option>
							))}
					</select>
				</div>
				<div className={"form-item--addproduct quantity " + className}>
					<label name="quantity">Quantity :</label>
					<input
						type="number"
						onChange={changeHandler("quantity")}
						name="quantity"
						value={quantity}
					/>
				</div>
				<div className={"form-item--addproduct colors " + className}>
					<label name="colors">Colors :</label>
					<input
						type="text"
						onChange={changeHandler("colors")}
						name="colors"
						value={colors}
					/>
				</div>
				<div className={"form-item--addproduct product_type " + className}>
					<label name="product_type">Product Type :</label>
					<input
						type="text"
						onChange={changeHandler("product_type")}
						name="product_type"
						value={product_type}
					/>
				</div>
				<div className={"form-item--addproduct featured " + className}>
					<input
						type="checkbox"
						name="featured"
						className="checkbox"
						value={featured}
						onChange={changeHandler("featured")}
					/>
					<label className="toggle" name="featured">
						Featured :
					</label>
				</div>
				<div className={"form-item--addproduct sizes " + className}>
					<label name="sizes">Sizes :</label>
					<input
						type="text"
						onChange={changeHandler("sizes")}
						name="sizes"
						value={sizes}
					/>
				</div>
				<div className={"form-item--addproduct description " + className}>
					<label name="description">Description :</label>
					<textarea
						/* rows="5"
						cols="60" */
						type="text-area"
						onChange={changeHandler("description")}
						name="description"
						value={description}
					/>
				</div>
				<div className={"form-item--addproduct image " + className}>
					<label name="image">Image :</label>
					<input
						type="file"
						onChange={changeHandler("image")}
						name="images"
						accept="image/*"
						multiple
					/>
				</div>
				<div className={"form-item--addproduct default_image " + className}>
					<label name="image">Default Image :</label>
					<input
						type="file"
						onChange={changeHandler("image")}
						name="default_image"
						accept="image/*"
					/>
				</div>
				<div className={"form-item--addproduct featured_image " + className}>
					<label name="image">Featured Image :</label>
					<input
						type="file"
						onChange={changeHandler("image")}
						name="featured_image"
						accept="image/*"
					/>
				</div>
				<div className={"form-item--addproduct sold " + className}>
					<label name="sold">Sold :</label>
					<input disabled type="number" name="sold" />
				</div>
				{errormessage()}
				{successmessage()}

				<div className={"submit-button " + className}>
					<input type="button" onClick={submitForm} value="Add Product" />
				</div>
			</div>
		);
	};
	return (
		<>
			{productForm()}
			{/* {JSON.stringify(state)} */}
		</>
	);
};
export default AddProductForm;
