import React from 'react';
import './index.css';
import reportWebVitals from './reportWebVitals';
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Shop from "./pages/Shop";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import User from "./pages/User";
import Admin from "./pages/Admin";
import ForgotPassword from "./pages/ForgotPassword";
import NoPage from "./pages/NoPage";
import ConfirmPassword from './pages/ConfirmPassword';
import Contact from './pages/Contact';

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "login",
		element: <Login />,
	},
	{
		path: "signup",
		element: <Signup />,
	},
	{
		path: "shop",
		element: <Shop />,
	},
	{
		path: "forget-password",
		element: <ForgotPassword />,
	},
	{
		path: "confirm-password",
		element: <ConfirmPassword />,
	},
	{
		path: "contact",
		element: <Contact />,
	},
	{
		path: "*",
		element: <NoPage />,
	},
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
