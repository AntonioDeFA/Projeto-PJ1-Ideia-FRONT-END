import React, { useContext, useEffect, useState } from "react";

import api from "../../services/api";
import CardMinhasCompeticoes from "../CardMinhasCompeticoes";

import "./styles.css";
import "../../assets/styles/global.css";

import FiltrosContext from "../../utils/filtrosContext";
import StoreContext from "./../../store/context";

function ListaCardsMinhasCompeticoes() {
  const filtros = useContext(FiltrosContext);

  const [cards, setCards] = useState([]);

  const { token } = useContext(StoreContext);

  useEffect(() => {
    const { nomeCompeticao, mes, ano, etapasSelecionadas } = filtros;

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
    api.get("/competicoes/usuario-logado", { params }).then((response) => {
      const { data } = response;
      let cardsFiltrados = [];

      if (etapasSelecionadas && etapasSelecionadas.length > 0) {
        etapasSelecionadas.forEach((etapa) => {
          data.forEach((card) => {
            if (card.etapaVigente.tipoEtapa === etapa) {
              cardsFiltrados.push(card);
            }
          });
        });
        setCards(cardsFiltrados);
      } else {
        setCards(data);
      }
    });
  }, [filtros, token]);

  return (
    <div className="listagem-cards-competicoes">
      <ul id="lista-minhas-competicoes">
        {cards.map((card) => {
          return (
            <li key={card.id}>
              <CardMinhasCompeticoes card={card} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ListaCardsMinhasCompeticoes;
