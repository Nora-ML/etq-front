import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import FilterNavBarProvider from "./context/filterContext";
import OverlayContextProvider from "./context/overlayContext";
import MainNavBarContextProvider from "./context/mainNavBarContext";
import ScreenSizeContextProvider from "./context/screenSizeContext";
import CartContextProvider from "./context/cartContext";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
	<ScreenSizeContextProvider>
		<OverlayContextProvider>
			<MainNavBarContextProvider>
				<CartContextProvider>
					<FilterNavBarProvider>
						<App />
					</FilterNavBarProvider>
				</CartContextProvider>
			</MainNavBarContextProvider>
		</OverlayContextProvider>
	</ScreenSizeContextProvider>
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
