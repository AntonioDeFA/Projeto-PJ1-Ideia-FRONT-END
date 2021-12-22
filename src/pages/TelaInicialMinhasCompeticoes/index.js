import React from "react";

import Grid from '@mui/material/Grid';

import DefaultHeader from "../../components/DefaultHeader";
import AsideFiltragem from '../../components/AsideFiltragem';
import CardMinhasCompeticoes from "../../components/CardMinhasCompeticoes";

function TelaInicialMinhasCompeticoes() {
  return (
    <div id="minhas-competicoes">
      <DefaultHeader />

      <Grid container >
        <div>
          <AsideFiltragem
            hasCheckboxes="true"
            isCompeticoesAbertas="false"
          />
          <div className="listagem-cards-competicoes">
            <ul>
              <li>
                <CardMinhasCompeticoes
                  userRole="COMPETIDOR"
                  etapaAtual="AQUECIMENTO"
                />
              </li>
              <li>
                <CardMinhasCompeticoes
                  userRole="ORGANIZADOR"
                  etapaAtual="IMERSÃO"
                />
              </li>
              <li>
                <CardMinhasCompeticoes
                  userRole="COMPETIDOR"
                  etapaAtual="PITCH"
                />
              </li>
              <li>
                <CardMinhasCompeticoes
                  userRole="ORGANIZADOR"
                  etapaAtual="ENCERRADA"
                />
              </li>
              <li>
                <CardMinhasCompeticoes
                  userRole="COMPETIDOR"
                  etapaAtual="AQUECIMENTO"
                />
              </li>
              <li>
                <CardMinhasCompeticoes
                  userRole="ORGANIZADOR"
                  etapaAtual="IMERSÃO"
                />
              </li>
              <li>
                <CardMinhasCompeticoes
                  userRole="COMPETIDOR"
                  etapaAtual="PITCH"
                />
              </li>
              <li>
                <CardMinhasCompeticoes
                  userRole="ORGANIZADOR"
                  etapaAtual="ENCERRADA"
                />
              </li>
              <li>
                <CardMinhasCompeticoes
                  userRole="COMPETIDOR"
                  etapaAtual="AQUECIMENTO"
                />
              </li>
            </ul>
          </div>
        </div>
      </Grid>
    </div>
  );
}

export default TelaInicialMinhasCompeticoes;