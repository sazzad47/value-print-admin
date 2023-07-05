import React from "react";
import { Routes, Route,  } from "react-router-dom";

// Layout
import Layout from "../pages/layout";

// routes
import { routes } from "./Routes";

const Index = () => {
  return (
    <>
      <Routes>
        <Route>
          {routes.map((route, idx) => (
            <Route
              path={route.path}
              element={<Layout>{route.component}</Layout>}
              key={idx}
            />
          ))}
        </Route>
      </Routes>
    </>
  );
};

export default Index;
