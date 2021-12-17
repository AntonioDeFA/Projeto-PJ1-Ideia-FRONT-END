import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import CompeticoesAbertas from "./pages/TelaInicialCompeticoesAbertas";
import MinhasCompeticoes from "./pages/TelaInicialMinhasCompeticoes";

function ProjetoRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<CompeticoesAbertas />} />
        <Route path="/login" element={<Login />} />
        <Route path="/minhasCompeticoes" element={<MinhasCompeticoes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default ProjetoRoutes;