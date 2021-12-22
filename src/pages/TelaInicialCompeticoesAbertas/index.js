import React from "react";

import Grid from '@mui/material/Grid';

import DefaultHeader from "../../components/DefaultHeader";
import AsideFiltragem from "../../components/AsideFiltragem";
import CardCompeticao from "../../components/CardCompeticao";

// import { Link } from "react-router-dom";

// import api from "../../services/api";

import "./styles.css";

function TelaInicialCompeticoesAbertas() {
  return (
    <div>
      <DefaultHeader />
      <Grid container >
        <div>
          <AsideFiltragem
            isCompeticoesAbertas="true"
          />
          <div className="listagem-cards-competicoes">
            <ul>
              <li><CardCompeticao /></li>
              <li><CardCompeticao /></li>
              <li><CardCompeticao /></li>
              <li><CardCompeticao /></li>
              <li><CardCompeticao /></li>
              <li><CardCompeticao /></li>
              <li><CardCompeticao /></li>
              <li><CardCompeticao /></li>
              <li><CardCompeticao /></li>
              <li><CardCompeticao /></li>
            </ul>
          </div>
        </div>
      </Grid>
    </div>
  );
}

export default TelaInicialCompeticoesAbertas;