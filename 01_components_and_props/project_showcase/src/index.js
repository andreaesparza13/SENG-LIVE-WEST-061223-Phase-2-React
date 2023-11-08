import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import { BrowserRouter as Router } from 'react-router-dom'
import "./index.css";

// ^ Rewrote this below to be consistent with newest version of React
// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById("root")
// );

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
	<React.StrictMode>
		<Router>
			<App />
		</Router>
	</React.StrictMode>  
)