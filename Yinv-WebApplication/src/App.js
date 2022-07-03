import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./components/Auth/ProtectedRoutes";
import PublicRoutes from "./components/Auth/PublicRoutes";

import Authentification from "./pages/Authentification";
import Gestion from "./pages/Gestion";
import Home from "./pages/Home";
import NewProduct from "./pages/NewProduct";
import Product from "./pages/Product";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ProtectedRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/newProduct" element={<NewProduct />} />
          <Route path="/gestion" element={<Gestion />} />
        </Route>

        <Route path="/authentification" element={<PublicRoutes />}>
          <Route path="/authentification" element={<Authentification />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
