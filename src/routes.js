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
import CadastroCompeticao from "./pages/CadastroCompeticao";

function ProjetoRoutes() {
  return (
    <BrowserRouter>
      <StoreProvider>
        <Routes>
          <Route path="/" element={<Login />} />
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
            path="/inicio"
            element={
              <RoutesPrivate>
                <TelaInicial />
              </RoutesPrivate>
            }
          />
          <Route
            path="/cadastro-competicao"
            element={
              <RoutesPrivate>
                <CadastroCompeticao />
              </RoutesPrivate>
            }
          />
        </Routes>
      </StoreProvider>
    </BrowserRouter>
  );
}

export default ProjetoRoutes;
