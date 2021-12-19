import React from "react";

import DefaultHeader from "../../components/DefaultHeader";
import AsideFiltragem from '../../components/AsideFiltragem'

function TelaInicialMinhasCompeticoes() {
  return (
    <div id="page-minhas-competicoes">
      <DefaultHeader />
      <AsideFiltragem hasCheckboxes="true" />
    </div>
  );
}

export default TelaInicialMinhasCompeticoes;