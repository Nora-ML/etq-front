import { API } from "../config.js";

/************************  USER operations *****************************/
export const signup = async (user) => {
	console.log("Index.js ---- signup() ");
	try {
		const response = await fetch(`${API}/signup`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify(user),
		});
		return await response.json();
	} catch (error) {
		console.log("Index.js ---- signup()=> error");
		console.log(error);
	}
};
export const signin = async (credentials) => {
	console.log("Index.js ---- signin() ");
	try {
		const response = await fetch(`${API}/signin`, {
			method: "POST",
			headers: {
				"content-type": "application/json",
				Accept: "application-json",
			},
			body: JSON.stringify(credentials),
		});
		return await response.json();
	} catch (error) {
		console.log("Index.js ---- signin() => error :", error);
	}
};

export const saveToken = (user) => {
	console.log("Index.js ---- saveToken()");
	if (typeof window !== "undefined") {
		localStorage.setItem("jwt", JSON.stringify(user));
	}
};
export const savelocally = (info) => {
	const { name } = info;
	console.log("Index.js ---- savelocally() info:", info);
	if (typeof window !== "undefined") {
		console.log("Index.js ---- retrieveLocal() adding to local");
		localStorage.setItem(name, JSON.stringify(info));
	}
};
export const retrieveLocal = (name) => {
	console.log("Index.js ---- retrieveLocal() name:", name);
	if (localStorage.getItem(name)) {
		console.log("Index.js ---- retrieveLocal() exist");
		return JSON.parse(localStorage.getItem(name));
	} else {
		return { name: false };
	}
};
export const removeLocal = (name) => {
	console.log("Index.js ---- removeLocal() name:", name);
	localStorage.removeItem(name);
};

export const signOut = async () => {
	console.log("Index.js ---- signOut()");
	try {
		const response = await fetch(`${API}/user/signout`, {
			method: "GET",
		});
		return await response.json();
	} catch (error) {
		console.log("Index.js ---- signOut() => error :", error);
	}
};
export const signOutFront = (next) => {
	console.log("Index.js ---- signOutFront()");
	if (typeof window !== "undefined") {
		localStorage.removeItem("jwt");
		localStorage.removeItem("Favourites");
		localStorage.removeItem("Cart");
		/* next(); */
	} else {
		console.log("Index.js ---- signOut()=> error");
	}
};

export const loggedIn = () => {
	console.log("Index.js ----loggedin() ");
	if (localStorage.getItem("jwt")) {
		return JSON.parse(localStorage.getItem("jwt"));
	} else {
		return { user: false };
	}
};

/********************    ADDing Operation   *******************/
export const addProduct = async (product) => {
	console.log("Index.js ---- addProduct()");
	try {
		const response = await fetch(`${API}/admin/products`, {
			method: "POST",
			headers: {
				//Content will not be application/json as we will be sending photo data therfore its formdata
				/* "content-type": "Application/json", */
				Accept: "application/json",
			},
			//includes imgaes hence we will not stringify it
			/* body: JSON.stringify(product), */
			body: product,
		});
		return await response.json();
	} catch (error) {
		console.log("Index.js ----addProduct() => error");
	}
};
export const addCategory = async (name) => {
	console.log("Index.js ---- addCategory()");
	try {
		const response = await fetch(`${API}/admin/category`, {
			method: "POST",
			headers: {
				"content-type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify(name),
		});
		return await response.json();
	} catch (error) {
		console.log("Index.js ---- addCategory() => error");
	}
};
export const addPromotion = async (offer) => {
	console.log("Index.js ---- addpromotion()");
	try {
		const response = await fetch(`${API}/admin/promotion`, {
			method: "POST",
			headers: {
				"content-type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify(offer),
		});
		return await response.json();
	} catch (error) {
		console.log("Index.js ---- addpromotion()=> error");
	}
};

/********************    Deleting  Operation   *******************/
export const deleteAll = async (name) => {
	console.log("Index.js ---- deleteUsers() ");
	try {
		const response = await fetch(`${API}/admin/${name}`, {
			method: "DELETE",
		});
		return await response.json();
	} catch (error) {
		console.log("Index.js ---- deleteUsers() => error :", error);
	}
};
export const deleteOne = async (name, id) => {
	console.log("Index.js ---- delete One(),name", name, "id :", id);
	try {
		const response = await fetch(`${API}/admin/${name}/${id}`, {
			method: "DELETE",
		});
		return await response.json();
	} catch (error) {
		console.log("Index.js ---- delete One()=> error :", error);
	}
};

/********************    Viewing  Operation   *******************/
export const list = async (thing, limit) => {
	console.log("Index.js ---- list()");
	try {
		const response = await fetch(`${API}/admin/${thing}?limit=${limit}`, {
			method: "GET",
		});
		return await response.json();
	} catch (error) {
		console.log("Index.js ---- list() => error :", error);
		return error;
	}
};

export const fetchUser = async (email) => {
	console.log("Index.js ---- fetchUser()");
	try {
		const response = await fetch(`${API}/admin`, {
			method: "GET",
		});
		return response.json();
	} catch (error) {
		console.log("Index.js ---- fetchUser() => error :", error);
		return { error: error };
	}
};

export const itemsInCategory = async (categoryName, limit, skip) => {
	console.log("Index.js ---- itemsInCategory() limit:", limit, "Skip :", skip);
	try {
		const response = await fetch(
			`${API}/shop/${categoryName}?limit=${limit}&skip=${skip}`,
			{
				method: "GET",
			}
		);
		return await response.json();
	} catch (error) {
		console.log("Index.js ---- itemsInCategory() => error :", error);
	}
};
export const itemsCount = async (cat) => {
	console.log("Index.js ---- itemsCount()");
	try {
		const response = await fetch(`${API}//shop/count/${cat}`, {
			method: "GET",
		});
		return await response.json();
	} catch (error) {
		console.log("Index.js ---- itemsCount() => error :", error);
	}
};

export const editCategory = async (v) => {
	console.log("Index.js ---- editCategory() v:", v);
	const { oldN, newN } = v;
	try {
		const response = await fetch(`${API}/shop/${oldN}`, {
			method: "PUT",
			headers: {
				"content-type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify({ newN }),
		});
		return await response.json();
	} catch (error) {
		console.log("Index.js ---- editCategory() error:", error);
	}
};

export const capitalizeFirst = (word) => {
	console.log("Index.js ---- Capitalizedfirst()");
	let capitalized;
	if (word) {
		capitalized = word.slice(0, 1).toUpperCase() + word.slice(1).toLowerCase();
	} else {
		capitalized = "";
	}
	return capitalized;
};

export const viewProduct = async (productId) => {
	console.log("Index.js ----viewProduct() ProductId:", productId);
	try {
		const response = await fetch(`${API}/products/${productId}`, {
			method: "GET",
		});
		return await response.json();
	} catch (error) {
		console.log("Index.js ----viewProduct() => error :", error);
	}
};

export const viewImage = async (productId, url) => {
	console.log("Index.js ---- viewImage()");
	try {
		const response = await fetch(`${API}/products/${url}/${productId}`, {
			method: "GET",
			headers: {
				Accept: "image/jpeg",
			},
		});
		return await response.json();
	} catch (error) {
		console.log("Index.js ---- viewImage() => error :", error);
	}
};

/********************    Updating  Operation   *******************/
export const updateProduct = async (formData, id) => {
	console.log("Index.js ---- addProduct() ");
	try {
		const response = await fetch(`${API}/admin/products/${id}`, {
			method: "PUT",
			headers: {
				Accept: "application/json",
			},
			body: formData,
		});
		return await response.json();
	} catch (error) {
		console.log("Index.js ---- addProduct() => error :", error);
	}
};

/*******************    Filter  *********************/
export const filtered = async (category) => {
	console.log("Index.js ---- filtered() ");
	try {
		const response = await fetch(`${API}/products/filter?limit=1000`, {
			method: "GET",
		});
		return await response.json();
	} catch (error) {
		console.log("Index.js ---- filtered() ", error);
	}
};

export const filter = async (selection) => {
	console.log("Index.js ---- filter() ", selection);
	try {
		const response = await fetch(`${API}/products/filter`, {
			method: "POST",
			headers: {
				"content-type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify(selection),
		});
		return await response.json();
	} catch (error) {
		console.log("Index.js ---- filter() ", error);
	}
};
/*******************    favourites   *********************/
export const adjustfav = async (data) => {
	const { userId } = data;
	console.log("Index.js ---- adjustfav() user", userId, "produ data", data);
	try {
		const response = await fetch(`${API}/${userId}/favourites`, {
			method: "POST",
			headers: {
				"content-type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify(data),
		});
		return await response.json();
	} catch (error) {
		console.log("Index.js ---- adjustfav() error", error);
	}
};
export const getfav = async (id) => {
	console.log("Index.js ---- getFav() id", id);
	try {
		const response = await fetch(`${API}/${id}/favourites`, {
			method: "GET",
		});
		return await response.json();
	} catch (error) {
		console.log("Index.js ---- getFav() error", error);
	}
};
export const saveFavs = (favs) => {
	console.log("Index.js ---- saveFavs()");
	if (typeof window !== "undefined") {
		localStorage.setItem("Favourites", JSON.stringify(favs));
	}
};
export const retrieveFavs = () => {
	console.log("Index.js ----retrieveFavs() ");
	if (localStorage.getItem("Favourites")) {
		return JSON.parse(localStorage.getItem("Favourites"));
	} else {
		return { Favs: false };
	}
};
/*******************    featured  products  *********************/
export const featured = async () => {
	console.log("Index.js ---- featured() ");
	try {
		const response = await fetch(`${API}/products/featured`, {
			method: "GET",
		});
		return await response.json();
	} catch (error) {
		console.log("Index.js ---- featured() error", error);
	}
};

/*******************    cart   *********************/
export const addToCart = async (user, data) => {
	console.log("Index.js ---- addToCart() user", user, "produ data", data);
	try {
		const response = await fetch(`${API}/${user}/cart`, {
			method: "POST",
			headers: {
				"content-type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify(data),
		});
		return await response.json();
	} catch (error) {
		console.log("Index.js ---- addToCart() error", error);
	}
};

export const getCart = async (id) => {
	console.log("Index.js ---- getCart() id", id);
	try {
		const response = await fetch(`${API}/${id}/cart`, {
			method: "GET",
		});
		return await response.json();
	} catch (error) {
		console.log("Index.js ---- getCart() error", error);
	}
};
export const saveCarts = (cart) => {
	console.log("Index.js ---- saveCarts()");
	if (typeof window !== "undefined") {
		localStorage.setItem("Cart", JSON.stringify(cart));
	}
};
export const retrieveCart = () => {
	console.log("Index.js ----retrieveCart() ");
	if (localStorage.getItem("Cart")) {
		console.log("Index.js ----retrieveCart() --success");
		return JSON.parse(localStorage.getItem("Cart"));
	} else {
		console.log("Index.js ----retrieveCart() --error");
		return { cart: false };
	}
};

export const removeFromCart = async (user, proId) => {
	console.log("Index.js ---- removeFromCart() userid", user, "proId", proId);
	try {
		const response = await fetch(`${API}/${user}/${proId}`, {
			method: "DELETE",
			body: JSON.stringify(proId),
		});
		return await response.json();
	} catch (error) {
		console.log("Index.js ---- removeFromCart() error", error);
	}
};