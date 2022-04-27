import React, { useContext, useEffect, useState } from "react";

import api from "../../services/api";
import CardCompeticao from "../CardCompeticao";

import "./styles.css";
import "../../assets/styles/global.css";

import FiltrosContext from "../../utils/filtrosContext";
import StoreContext from "../../store/context";

function ListaCardsCompeticoesAbertas() {
  const filtros = useContext(FiltrosContext);

  const [cards, setCards] = useState([]);

  const { token } = useContext(StoreContext);

  useEffect(() => {
    const { nomeCompeticao, mes, ano } = filtros;

    const params = {};
    if (nomeCompeticao !== "") {
      params.nomeCompeticao = nomeCompeticao;
    }
    if (mes !== 0 && mes !== "") {
      params.mes = mes;
    }
    if (ano !== 0 && ano !== "") {
      params.ano = ano;
    }
    api.defaults.headers.get["Authorization"] = `Bearer ${token}`;
    api.get("/competicoes/inscricoes", { params: filtros }).then((response) => {
      const { data } = response;
      setCards(data);
    });
  }, [filtros, token]);

  return (
    <div className="listagem-cards-competicoes">
      <ul id="lista-inscricoes-abertas">
        {cards.map((card) => {
          return (
            <li key={card.id}>
              <CardCompeticao card={card} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ListaCardsCompeticoesAbertas;
