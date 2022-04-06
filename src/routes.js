import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import TelaInicial from "./pages/TelaInicial";
import CadastroUsuario from "./pages/CadastroUsuario";
import LoginToken from "./pages/LoginToken";

function ProjetoRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<TelaInicial />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<CadastroUsuario />} />
        <Route path="/login-token" element={<LoginToken />} />
      </Routes>
    </BrowserRouter>
  );
}

export default ProjetoRoutes;
