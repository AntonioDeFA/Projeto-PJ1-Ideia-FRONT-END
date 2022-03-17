import React, { useEffect, useState } from "react";

import '../../assets/styles/global.css';
import api from "../../services/api";
import CardCompeticao from "../CardCompeticao";
import "./styles.css";

function ListaCardsCompeticoesAbertas() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.get("/competicoes/inscricoes?page=1").then((response) => {
      const { content } = response.data;
      setCards(content);
    });
  }, []);

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