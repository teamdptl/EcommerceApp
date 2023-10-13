import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Shop from "../pages/Shop";
import Product from "../pages/Product";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import User from "../pages/User";
import Admin from "../pages/Admin";
import ForgotPassword from "../pages/ForgotPassword";
import NoPage from "../pages/NoPage";
import ConfirmPassword from "../pages/ConfirmPassword";
import Contact from "../pages/Contact";
import Service from "../pages/Service";

const routes = [
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
		path: "forget-password",
		element: <ForgotPassword />,
	},
	{
		path: "confirm-password",
		element: <ConfirmPassword />,
	},
	{
		path: "shop",
		element: <Shop />,
	},
	{
		path: "product/:productId",
		element: <Product />,
	},
	{
		path: "cart",
		element: <Cart />,
	},
	{
		path: "checkout",
		element: <Checkout />,
	},
	{
		path: "user",
		element: <User />,
	},
	{
		path: "admin",
		element: <Admin />,
	},
	{
		path: "contact",
		element: <Contact />,
	},
	{
		path: "service",
		element: <Service />,
	},
	{
		path: "*",
		element: <NoPage />,
	},
];

export default routes;