import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import MiniContextProvider from "./context/miniNavContext";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
	<StrictMode>
		<MiniContextProvider>
			<App />
		</MiniContextProvider>
	</StrictMode>
);
/* import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import MiniContextProvider from "./context/miniNavContext";

ReactDOM.render(
	<StrictMode>
		<MiniContextProvider>
			<App />
		</MiniContextProvider>
	</StrictMode>,
	document.getElementById("root")
);
 */
