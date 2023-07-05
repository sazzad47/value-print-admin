import Dashboard from "../pages/dashboard";
import Pendings from "../pages/pendings";
import Transactions from "../pages/transactions";
import Login from "../pages/login";


const routes = [
    { path: "/", component: <Dashboard /> },
    { path: "/dashboard", component: <Dashboard /> },
    { path: "/orders/pending", component: <Pendings /> },
    { path: "/transactions", component: <Transactions /> },
]

const publicRoutes = [
    // Authentication Page
    { path: "/login", component: <Login /> },
]

export {routes, publicRoutes};