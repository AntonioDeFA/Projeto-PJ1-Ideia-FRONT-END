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
    api.get("/competicoes/usuario-logado", { params }).then((response) => {
      const { data } = response;
      setCards(data);
    });
  }, [filtros, token]);

  let papel = "";
  let cont = 0;

  function identificarPapelUsuario() {
    papel = cont % 2 === 0 ? "COMPETIDOR" : "ORGANIZADOR";
    cont++;
  }

  return (
    <div className="listagem-cards-competicoes">
      <ul>
        {cards.map((card) => {
          identificarPapelUsuario();
          return (
            <li>
              <CardMinhasCompeticoes card={card} userRole={papel} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ListaCardsMinhasCompeticoes;
