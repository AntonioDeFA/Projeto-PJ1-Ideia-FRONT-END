import React from "react";

import DefaultHeader from "../../components/DefaultHeader";
import AsideFiltragem from '../../components/AsideFiltragem'

function TelaInicialMinhasCompeticoes() {
  return (
    <div id="minhas-competicoes">
      <DefaultHeader />

      <AsideFiltragem
        hasCheckboxes="true"
        isCompeticoesAbertas="false"
      />
    </div>
  );
}

export default TelaInicialMinhasCompeticoes;