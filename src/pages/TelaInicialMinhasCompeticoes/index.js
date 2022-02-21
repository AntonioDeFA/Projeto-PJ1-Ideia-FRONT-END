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

  function identificarPapelUsuario() {
    papel = cont % 2 === 0 ? "COMPETIDOR" : "ORGANIZADOR";
    cont ++;
  }

  return (
    <div id="minhas-competicoes">
      <DefaultHeader />
      <div className="row">
        <div className="col-3">
          <AsideFiltragem
            hasCheckboxes="true"
            isCompeticoesAbertas="false"
          />
        </div>
        <div className="col p-0">
          <div className="listagem-cards-competicoes">
            <ul>
              {cards.map((card) => {
                identificarPapelUsuario()
                return <li><CardMinhasCompeticoes card={card} userRole={papel} /></li>;
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TelaInicialMinhasCompeticoes;