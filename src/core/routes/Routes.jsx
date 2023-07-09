import Dashboard from "../pages/dashboard";
import Pendings from "../pages/pendings";
import Transactions from "../pages/transactions";
import Login from "../pages/login";
import ResetPasswordEmail from "../pages/resetPassword";
import ResetPasswordPage from "../pages/resetPassword/ResetPassword";
import Settings from "../pages/settings";
import Reviews from "../pages/reviews";
import Categories from "../pages/products/categories";
import CreateCategory from "../pages/products/categories/Create";
import EditCategory from "../pages/products/categories/Edit";
import ProductList from "../pages/products/list";
import CreateProduct from "../pages/products/list/Create";
import EditProduct from "../pages/products/list/Edit";
import ViewProduct from "../pages/products/list/preview";


const routes = [
    { path: "/", component: <Dashboard /> },
    { path: "/dashboard", component: <Dashboard /> },
    { path: "/products/categories", component: <Categories /> },
    { path: "/products/categories/create", component: <CreateCategory /> },
    { path: "/products/categories/:id/edit", component: <EditCategory /> },
    { path: "/products/list", component: <ProductList /> },
    { path: "/products/list/create", component: <CreateProduct /> },
    { path: "/products/list/:id/edit", component: <EditProduct /> },
    { path: "/products/list/:id/preview", component: <ViewProduct /> },
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