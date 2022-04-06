import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import LoginToken from "./pages/LoginToken";
import TelaInicial from "./pages/TelaInicial";
import CadastroUsuario from "./pages/CadastroUsuario";
import ResetarSenha from "./pages/ResetarSenha/index";

function ProjetoRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TelaInicial />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<CadastroUsuario />} />
        <Route path="/login-token" element={<LoginToken />} />
        <Route path="/resetar-senha" element={<ResetarSenha />} />
      </Routes>
    </BrowserRouter>
  );
}

export default ProjetoRoutes;
