import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import LoginToken from "./pages/LoginToken";
import TelaInicial from "./pages/TelaInicial";
import CadastroUsuario from "./pages/CadastroUsuario";
import ResetarSenha from "./pages/ResetarSenha/index";
import CadastroEquipe from "./pages/CadastroEquipe/index";

function ProjetoRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TelaInicial />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login-token" element={<LoginToken />} />
        <Route path="/resetar-senha" element={<ResetarSenha />} />
        <Route path="/cadastro-equipe" element={<CadastroEquipe />} />
        <Route path="/cadastro-usuario" element={<CadastroUsuario />} />
      </Routes>
    </BrowserRouter>
  );
}

export default ProjetoRoutes;
