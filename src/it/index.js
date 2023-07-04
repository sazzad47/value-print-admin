import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "./theme";
import Layout from "./pages/layout";
import Dashboard from "./pages/dashboard";
import Products from "./pages/products";
import Customers from "./pages/customers";
import Geography from "./pages/geography";
import Overview from "./pages/overview";
import Daily from "./pages/daily";
import Monthly from "./pages/monthly";
import Breakdown from "./pages/breakdown";
import Admin from "./pages/admin";
import Performance from "./pages/performance";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
        <ThemeProvider theme={theme}>
          <CssBaseline />
    <Layout>

    <div className="app">
     
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/approved" element={<Products />} />
              <Route path="/pending" element={<Customers />} />
              <Route path="/geography" element={<Geography />} />
              <Route path="/overview" element={<Overview />} />
              <Route path="/daily" element={<Daily />} />
              <Route path="/monthly" element={<Monthly />} />
              <Route path="/breakdown" element={<Breakdown />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/performance" element={<Performance />} />
            </Route>
          </Routes>
      
    </div>
    </Layout>
        </ThemeProvider>
  );
}

export default App;
