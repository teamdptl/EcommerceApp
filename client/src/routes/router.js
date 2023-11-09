import {createBrowserRouter, createRoutesFromElements, Outlet, Route, useNavigate} from "react-router-dom";
import User from "../pages/User";
import Home from "../pages/Home";
import Contact from "../pages/Contact";
import Service from "../pages/Service";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ForgotPassword from "../pages/ForgotPassword";
import ConfirmPassword from "../pages/ConfirmPassword";
import Shop from "../pages/Shop";
import Product from "../pages/Product";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Admin from "../pages/Admin";
import NoPage from "../pages/NoPage";
import {useAuth} from "../context/AuthContext";

function AuthRoute() {
    const { user } = useAuth();
    const navigate = useNavigate();
    return user ? <Outlet/> : navigate('login')
}

function AdminRoute(){
    const { user } = useAuth();
    const navigate = useNavigate();
    return user && user.role === 'admin' ? <Outlet/> : navigate('home')
}

const routes = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route exact path="/" element={<Home/>} />
            <Route path="contact" element={<Contact/>} />
            <Route path="service" element={<Service/>} />
            <Route path="login" element={<Login/>} />
            <Route path="signup" element={<Signup/>} />
            <Route path="forget-password" element={<ForgotPassword />} />
            <Route path="confirm-password" element={<ConfirmPassword/>} />
            <Route path="shop" element={<Shop/>} />
            <Route path="product/:productId" element={<Product/>} />
            <Route path="cart" element={<Cart/>} />
            <Route path="checkout" element={<Checkout/>} />
            <Route element={<AuthRoute/>}>
                <Route path="user" element={<User/>} />
            </Route>
            <Route element={<AdminRoute/>} >
                <Route path="admin" element={<Admin/>} />
            </Route>
            <Route path="*" element={ <NoPage/> }/>
        </>
    )
);
export default routes;