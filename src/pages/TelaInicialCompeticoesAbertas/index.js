import React from "react";

import DefaultHeader from "../../components/DefaultHeader";
import AsideFiltragem from "../../components/AsideFiltragem";
import ListaCardsCompeticoesAbertas from "../../components/ListaCardsCompeticoesAbertas";

import "./styles.css";

function TelaInicialCompeticoesAbertas() {
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
          <ListaCardsCompeticoesAbertas />
        </div>
      </div>
    </div>
  );
}

export default TelaInicialCompeticoesAbertas;