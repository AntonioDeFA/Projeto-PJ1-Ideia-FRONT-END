import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import StoreProvider from "./store/provider";
import RoutesPrivate from "./store/routes/private";

import Login from "./pages/Login";
import Equipe from "./pages/Equipe/index";
import LoginToken from "./pages/LoginToken";
import TelaInicial from "./pages/TelaInicial";
import ResetarSenha from "./pages/ResetarSenha/index";
import CadastroEquipe from "./pages/CadastroEquipe/index";
import CadastroUsuario from "./pages/CadastroUsuario";
import DadosCompeticao from "./pages/DadosCompeticao";
import VersoesArtefatos from "./pages/VersoesArtefatos";
import ConvitesAvaliador from "./pages/ConvitesAvaliador";
import ConvitesConsultor from "./pages/ConvitesConsultor";
import CadastroCompeticao from "./pages/CadastroCompeticao";
import FeedbacksLeanCanvas from "./pages/FeedbacksLeanCanvas/index";

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
            path="/cadastro-competicao/"
            element={
              <RoutesPrivate>
                <CadastroCompeticao />
              </RoutesPrivate>
            }
          />
          <Route
            path="/atualizar-competicao/:idCompeticao"
            element={
              <RoutesPrivate>
                <CadastroCompeticao />
              </RoutesPrivate>
            }
          />
          <Route
            path="/dados-competicao/:idCompeticao/:papelUsuario"
            element={
              <RoutesPrivate>
                <DadosCompeticao />
              </RoutesPrivate>
            }
          />
          <Route
            path="/convites-avaliador"
            element={
              <RoutesPrivate>
                <ConvitesAvaliador />
              </RoutesPrivate>
            }
          />
          <Route
            path="/convites-consultor"
            element={
              <RoutesPrivate>
                <ConvitesConsultor />
              </RoutesPrivate>
            }
          />
          <Route
            path="/equipe/:idEquipe/:papelUsuario"
            element={
              <RoutesPrivate>
                <Equipe />
              </RoutesPrivate>
            }
          />
          <Route
            path="/equipe/:idEquipe/:papelUsuario/versoes-artefatos/:tipoArtefato"
            element={
              <RoutesPrivate>
                <VersoesArtefatos />
              </RoutesPrivate>
            }
          />
          <Route
            path="/equipe/:idEquipe/:papelUsuario/feedbacks-lean-canvas/:idLeanCanvas"
            element={
              <RoutesPrivate>
                <FeedbacksLeanCanvas />
              </RoutesPrivate>
            }
          />
        </Routes>
      </StoreProvider>
    </BrowserRouter>
  );
}

export default ProjetoRoutes;
