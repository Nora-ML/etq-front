import React, { StrictMode } from "react";
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
