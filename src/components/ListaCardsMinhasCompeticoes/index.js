import React, { useEffect, useState } from "react";

import '../../assets/styles/global.css';
import api from "../../services/api";
import CardMinhasCompeticoes from "../CardMinhasCompeticoes";
import "./styles.css";

function ListaCardsMinhasCompeticoes() {
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
    <div className="listagem-cards-competicoes">
      <ul>
        {cards.map((card) => {
          identificarPapelUsuario()
          return <li><CardMinhasCompeticoes card={card} userRole={papel} /></li>;
        })}
      </ul>
    </div>
  );
}

export default ListaCardsMinhasCompeticoes;