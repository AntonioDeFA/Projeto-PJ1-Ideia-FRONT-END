import React from "react";

import DefaultHeader from "../../components/DefaultHeader";
import AsideFiltragem from '../../components/AsideFiltragem';
import ListaCardsMinhasCompeticoes from "../../components/CardMinhasCompeticoes";

function TelaInicialMinhasCompeticoes() {
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
          <ListaCardsMinhasCompeticoes />
        </div>
      </div>
    </div>
  );
}

export default TelaInicialMinhasCompeticoes;