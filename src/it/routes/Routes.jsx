import Dashboard from "../pages/dashboard";
import Pendings from "../pages/pendings";
import Transactions from "../pages/transactions";


const routes = [
    { path: "/", component: <Dashboard /> },
    { path: "/dashboard", component: <Dashboard /> },
    { path: "/orders/pending", component: <Pendings /> },
    { path: "/transactions", component: <Transactions /> },
]

export {routes};