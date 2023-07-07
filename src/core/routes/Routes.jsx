import Dashboard from "../pages/dashboard";
import Pendings from "../pages/pendings";
import Transactions from "../pages/transactions";
import Login from "../pages/login";
import ResetPasswordEmail from "../pages/resetPassword";
import ResetPasswordPage from "../pages/resetPassword/ResetPassword";
import Settings from "../pages/settings";
import Reviews from "../pages/reviews";
import Products from "../pages/products";
import Categories from "../pages/products/categories";
import Variants from "../pages/products/variants";


const routes = [
    { path: "/", component: <Dashboard /> },
    { path: "/dashboard", component: <Dashboard /> },
    { path: "/products", component: <Products /> },
    { path: "/products/categories", component: <Categories /> },
    { path: "/products/variants", component: <Variants /> },
    { path: "/orders/pending", component: <Pendings /> },
    { path: "/transactions", component: <Transactions /> },
    { path: "/reviews", component: <Reviews /> },
    { path: "/settings", component: <Settings /> },
]

const publicRoutes = [
    // Authentication Page
    { path: "/login", component: <Login /> },
    { path: "/reset-password-email", component: <ResetPasswordEmail /> },
    { path: "/reset-password/:id/:token", component: <ResetPasswordPage /> },
    { path: "/login", component: <Login /> },
]

export {routes, publicRoutes};