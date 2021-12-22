import React, { useState, useEffect } from "react";

import Grid from '@mui/material/Grid';

import DefaultHeader from "../../components/DefaultHeader";
import AsideFiltragem from '../../components/AsideFiltragem';
import CardMinhasCompeticoes from "../../components/CardMinhasCompeticoes";

import api from "../../services/api";

function TelaInicialMinhasCompeticoes() {

  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.get("/competicoes/usuario/2").then((response) => {
      const { data } = response;
      setCards(data);
    });
  }, []);

  let papel = "";
  let cont = 0;

  function papelUsuario() {

    papel = cont % 2 == 0 ? "COMPETIDOR" : "ORGANIZADOR";
    cont ++;
  }

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
              {cards.map((card) => {
                { papelUsuario() }
                return <li><CardMinhasCompeticoes card={card} userRole={papel} /></li>;
              })}
            </ul>
          </div>
        </div>
      </Grid>
    </div>
  );
}

export default TelaInicialMinhasCompeticoes;