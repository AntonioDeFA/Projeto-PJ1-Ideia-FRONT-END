import React, { useContext, useEffect, useState } from "react";

import api from "../../services/api";
import CardCompeticao from "../CardCompeticao";

import "./styles.css";
import '../../assets/styles/global.css';

import FiltrosContext from "../../utils/filtrosContext";

function ListaCardsCompeticoesAbertas() {
  const filtros = useContext(FiltrosContext);

  const [cards, setCards] = useState([]);
  
  useEffect(() => {
    const { nomeCompeticao, mes, ano } = filtros;

    const params = {}
    if(nomeCompeticao !== '') {
      params.nomeCompeticao = nomeCompeticao;
    }
    if(mes !== 0 && mes !== '') {
      params.mes = mes;
    }
    if(ano !== 0 && ano !== '') {
      params.ano = ano;
    }

    api.get("/competicoes/inscricoes", {params, }).then((response) => {
      const { data } = response;
      setCards(data);
    });
  }, [filtros]);

  return (
    <div className="listagem-cards-competicoes">
      <ul>
        {cards.map((card) => {
          return <li key={card.id}><CardCompeticao card={card} /></li>;
        })}
      </ul>
    </div>
  );
}

export default ListaCardsCompeticoesAbertas;