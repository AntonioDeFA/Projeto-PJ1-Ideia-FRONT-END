import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Competicoes from "./pages/Competicoes";

function ProjetoRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route exact path="/" element={<Competicoes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default ProjetoRoutes;