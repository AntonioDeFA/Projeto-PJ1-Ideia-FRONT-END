import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import CompeticoesAbertas from "./pages/TelaInicialCompeticoesAbertas";
import MinhasCompeticoes from "./pages/TelaInicialMinhasCompeticoes";

function ProjetoRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/minhas_competicoes" element={<MinhasCompeticoes />} />
        <Route exact path="/" element={<CompeticoesAbertas />} />
      </Routes>
    </BrowserRouter>
  );
}

export default ProjetoRoutes;