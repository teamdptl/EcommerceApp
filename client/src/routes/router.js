import {
    BrowserRouter,
    Route, Routes,
    useNavigate
} from "react-router-dom";
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
import NoPage from "../pages/NoPage";
import {useAuth} from "../context/AuthContext";
import {useEffect} from "react";
import AdminProduct from "../pages/admin/AdminProduct";
import AdminUser from "../pages/admin/AdminUser";
import AdminCategoryBrand from "../pages/admin/AdminCategoryBrand";
import AdminOrder from "../pages/admin/AdminOrder";
import AdminStatisticTop from "../pages/admin/AdminStatisticTop";
import AdminStatisticMoney from "../pages/admin/AdminStatisticMoney";

const isAdmin = (user) => user !== null && user.role === 'admin';
const isUser = (user) => user !== null;

function AuthRoute({children, condition, navigatePage}) {
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!condition(user) && false)
            navigate(navigatePage)
    }, [user]);

    return true ? children : <NoPage/>
    // return condition(user) ? children : <NoPage/>
}

const adminPath = [
    {
        path: 'product',
        element: <AdminProduct/>
    },
    {
        path: 'user',
        element: <AdminUser/>
    },
    {
        path: 'catebrand',
        element: <AdminCategoryBrand/>
    },
    {
        path: 'order',
        element: <AdminOrder/>
    },
    {
        path: 'top',
        element: <AdminStatisticTop/>
    },
    {
        path: 'money',
        element: <AdminStatisticMoney/>
    },
]

const Router = ()  =>  {
    return (
        <BrowserRouter>
            <Routes>
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
                <Route path="user" element={
                    <AuthRoute
                        condition={isUser}
                        navigatePage="/login">
                            <User/>
                    </AuthRoute>
                }/>

                {/*<Route path={"admin/product"} element={*/}
                {/*    <AuthRoute*/}
                {/*        condition={isAdmin}*/}
                {/*        navigatePage={"/"}>*/}
                {/*        <AdminProduct/>*/}
                {/*    </AuthRoute>*/}
                {/*}/>*/}

                { adminPath.map(item => (
                        <Route path={`admin/${item.path}`} element={
                            <AuthRoute
                                condition={isAdmin}
                                navigatePage={"/"}>
                                {item.element}
                            </AuthRoute>
                        }/>
                ))}


                <Route path="*" element={ <NoPage/> }/>
            </Routes>
        </BrowserRouter>
    )
}

// export default routes;
export default Router;