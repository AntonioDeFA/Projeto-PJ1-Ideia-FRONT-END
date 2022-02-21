import React, { useState, useEffect } from "react";

import Grid from '@mui/material/Grid';

import DefaultHeader from "../../components/DefaultHeader";
import AsideFiltragem from "../../components/AsideFiltragem";
import CardCompeticao from "../../components/CardCompeticao";

// import { Link } from "react-router-dom";

import api from "../../services/api";

import "./styles.css";

function TelaInicialCompeticoesAbertas() {

  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.get("/competicoes/inscricoes?page=1").then((response) => {
      const { content } = response.data;
      setCards(content);
    });
  }, []);

  return (
    <div>
      <DefaultHeader />
      <div className="row">
        <div className="col-3">
          <AsideFiltragem
            isCompeticoesAbertas="true"
          />
        </div>
        <div className="col p-0">
          <div className="listagem-cards-competicoes">
            <ul>
              {cards.map((card) => {
                return <li><CardCompeticao card={card} /></li>;
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TelaInicialCompeticoesAbertas;