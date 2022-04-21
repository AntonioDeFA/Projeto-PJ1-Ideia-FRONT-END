import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./pages/Login";

import StoreProvider from "./store/provider";
import RoutesPrivate from "./store/routes/private";

import LoginToken from "./pages/LoginToken";
import TelaInicial from "./pages/TelaInicial";
import ResetarSenha from "./pages/ResetarSenha/index";
import CadastroEquipe from "./pages/CadastroEquipe/index";
import CadastroUsuario from "./pages/CadastroUsuario";

function ProjetoRoutes() {
  return (
    <BrowserRouter>
      <StoreProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/login-token" element={<LoginToken />} />
          <Route path="/resetar-senha" element={<ResetarSenha />} />
          <Route path="/cadastro-usuario" element={<CadastroUsuario />} />
          <Route
            path="/cadastro-equipe/:idCompeticao"
            element={
              <RoutesPrivate>
                <CadastroEquipe />
              </RoutesPrivate>
            }
          />
          <Route
            path="/"
            element={
              <RoutesPrivate>
                <TelaInicial />
              </RoutesPrivate>
            }
          />
        </Routes>
      </StoreProvider>
    </BrowserRouter>
  );
}

export default ProjetoRoutes;
