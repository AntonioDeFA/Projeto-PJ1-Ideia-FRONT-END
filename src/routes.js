import { Switch } from "@mui/material";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import CompeticoesAbertas from "./pages/TelaInicialCompeticoesAbertas";
import MinhasCompeticoes from "./pages/TelaInicialMinhasCompeticoes";
import StoreProvider from "./store/provider";
import RoutesPrivate from "./store/routes/private";

function ProjetoRoutes() {
  return (
    <BrowserRouter>
      <StoreProvider>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route path="/" 
            element={
              <RoutesPrivate>
                <CompeticoesAbertas />
              </RoutesPrivate>
            } />
          <Route path="/minhasCompeticoes"
            element={
              <RoutesPrivate>
                <MinhasCompeticoes />
              </RoutesPrivate>
            } />
        </Routes>
      </StoreProvider>
    </BrowserRouter>
  );
}

export default ProjetoRoutes;